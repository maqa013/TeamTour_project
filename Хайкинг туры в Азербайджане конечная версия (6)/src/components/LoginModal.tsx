import { useState } from 'react';
import { X, LogIn } from 'lucide-react';
import { User } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface LoginModalProps {
  onClose: () => void;
  onLogin: (user: User) => void;
  onSwitchToRegister: () => void;
}

export function LoginModal({ onClose, onLogin, onSwitchToRegister }: LoginModalProps) {
  const { t } = useLanguage();
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate empty fields
    if (!usernameOrEmail.trim()) {
      setError(t.usernameOrEmail + ' ' + (t.language === 'ru' ? 'не может быть пустым' : t.language === 'en' ? 'cannot be empty' : 'boş ola bilməz'));
      return;
    }

    if (!password.trim()) {
      setError(t.password + ' ' + (t.language === 'ru' ? 'не может быть пустым' : t.language === 'en' ? 'cannot be empty' : 'boş ola bilməz'));
      return;
    }

    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Find user by username or email
    const user = users.find((u: User & { password: string }) => 
      (u.username === usernameOrEmail || u.email === usernameOrEmail) && 
      u.password === password
    );

    if (user) {
      // Remove password from user object before storing
      const { password: _, ...userWithoutPassword } = user;
      onLogin(userWithoutPassword);
    } else {
      setError(t.language === 'ru' ? 'Неверное имя пользователя/email или пароль' : t.language === 'en' ? 'Invalid username/email or password' : 'Yanlış istifadəçi adı/e-poçt və ya şifrə');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-md w-full">
        <div className="border-b border-slate-200 dark:border-slate-700 p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#2275d4]/10 rounded-full flex items-center justify-center">
              <LogIn className="w-5 h-5 text-[#2275d4]" />
            </div>
            <h2 className="text-2xl text-slate-900 dark:text-white">{t.loginTitle}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors text-slate-900 dark:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-300 text-sm">
              {error}
            </div>
          )}

          <div className="space-y-4 mb-6">
            <div>
              <label htmlFor="usernameOrEmail" className="block text-sm mb-2 text-slate-700 dark:text-slate-300">
                {t.usernameOrEmail}
              </label>
              <input
                type="text"
                id="usernameOrEmail"
                value={usernameOrEmail}
                onChange={(e) => setUsernameOrEmail(e.target.value)}
                className="w-full px-4 py-3 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2275d4]"
                placeholder={t.language === 'ru' ? 'username или email@example.com' : t.language === 'en' ? 'username or email@example.com' : 'istifadəçi adı və ya email@example.com'}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm mb-2 text-slate-700 dark:text-slate-300">
                {t.password}
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2275d4]"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#2275d4] text-white py-3 rounded-lg hover:bg-[#1a5fb0] transition-colors mb-4"
          >
            {t.login}
          </button>

          <div className="text-center">
            <span className="text-slate-600 dark:text-slate-400 text-sm">{t.noAccount} </span>
            <button
              type="button"
              onClick={onSwitchToRegister}
              className="text-[#2275d4] hover:text-[#1a5fb0] text-sm"
            >
              {t.register}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
