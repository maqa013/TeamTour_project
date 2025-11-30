import { Hono } from 'npm:hono@4';
import { cors } from 'npm:hono/cors';
import { logger } from 'npm:hono/logger';

const app = new Hono();

// Enable CORS
app.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}));

// Enable logging
app.use('*', logger(console.log));

// Store verification codes temporarily (in production, use Redis or database)
const verificationCodes = new Map<string, { code: string; email: string; expiresAt: number }>();

// Generate 6-digit code
function generateCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Send verification email
app.post('/make-server-60dcde59/send-verification-code', async (c) => {
  try {
    const { email } = await c.req.json();

    if (!email) {
      return c.json({ success: false, error: 'Email is required' }, 400);
    }

    // Generate code
    const code = generateCode();
    
    // Store code with 10 minute expiration
    const expiresAt = Date.now() + 10 * 60 * 1000;
    verificationCodes.set(email, { code, email, expiresAt });

    // Send email using Resend (you need to add RESEND_API_KEY to env variables)
    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    
    if (!resendApiKey) {
      console.log(`Verification code for ${email}: ${code}`);
      // In development, just return success and log the code
      return c.json({ 
        success: true, 
        message: 'Code sent (check console)', 
        devCode: code // Only for development
      });
    }

    // Send real email
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: 'HikeAzerbaijan <onboarding@resend.dev>',
        to: email,
        subject: 'Email Verification Code - HikeAzerbaijan',
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #059669 0%, #10b981 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
                .code { background: white; border: 2px solid #059669; padding: 20px; text-align: center; font-size: 32px; letter-spacing: 8px; margin: 20px 0; border-radius: 8px; font-weight: bold; color: #059669; }
                .footer { text-align: center; color: #6b7280; font-size: 14px; margin-top: 20px; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>🏔️ HikeAzerbaijan</h1>
                  <p>Email Verification</p>
                </div>
                <div class="content">
                  <h2>Verify Your Email Address</h2>
                  <p>Thank you for registering with HikeAzerbaijan! Please use the verification code below to complete your registration:</p>
                  <div class="code">${code}</div>
                  <p><strong>This code will expire in 10 minutes.</strong></p>
                  <p>If you didn't request this code, please ignore this email.</p>
                </div>
                <div class="footer">
                  <p>© 2024 HikeAzerbaijan. All rights reserved.</p>
                </div>
              </div>
            </body>
          </html>
        `,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Email sending failed:', error);
      // Fallback: still return success but log error
      return c.json({ success: true, message: 'Code generated', devCode: code });
    }

    return c.json({ success: true, message: 'Verification code sent' });
  } catch (error) {
    console.error('Error sending verification code:', error);
    return c.json({ success: false, error: 'Failed to send verification code' }, 500);
  }
});

// Verify code
app.post('/make-server-60dcde59/verify-code', async (c) => {
  try {
    const { email, code } = await c.req.json();

    if (!email || !code) {
      return c.json({ success: false, error: 'Email and code are required' }, 400);
    }

    const stored = verificationCodes.get(email);

    if (!stored) {
      return c.json({ success: false, error: 'No verification code found for this email' }, 404);
    }

    if (Date.now() > stored.expiresAt) {
      verificationCodes.delete(email);
      return c.json({ success: false, error: 'Verification code has expired' }, 400);
    }

    if (stored.code !== code) {
      return c.json({ success: false, error: 'Invalid verification code' }, 400);
    }

    // Code is valid, remove it
    verificationCodes.delete(email);

    return c.json({ success: true, message: 'Email verified successfully' });
  } catch (error) {
    console.error('Error verifying code:', error);
    return c.json({ success: false, error: 'Failed to verify code' }, 500);
  }
});

// Health check
app.get('/make-server-60dcde59/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() });
});

Deno.serve(app.fetch);
