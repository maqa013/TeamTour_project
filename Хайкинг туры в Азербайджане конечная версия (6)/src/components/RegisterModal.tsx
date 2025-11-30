import { useState } from 'react';
import { X, UserPlus } from 'lucide-react';
import { User } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface RegisterModalProps {
  onClose: () => void;
  onRegister: (user: User) => void;
  onSwitchToLogin: () => void;
}

export function RegisterModal({ onClose, onRegister, onSwitchToLogin }: RegisterModalProps) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    fullName: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError(t.passwordMismatch || 'Пароли не совпадают');
      return;
    }

    if (formData.password.length < 6) {
      setError(t.minPassword);
      return;
    }

    // Get existing users
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    // Check if username or email already exists
    const existingUser = users.find((u: User & { password: string }) => 
      u.username === formData.username || u.email === formData.email
    );

    if (existingUser) {
      setError(t.userExists || 'Пользователь с таким именем или email уже существует');
      return;
    }

    // Create new user
    const newUser: User & { password: string } = {
      id: Date.now().toString(),
      username: formData.username,
      email: formData.email,
      fullName: formData.fullName,
      password: formData.password,
      createdAt: new Date().toISOString()
    };

    // Save to localStorage
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    // Remove password before returning
    const { password: _, ...userWithoutPassword } = newUser;
    onRegister(userWithoutPassword);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#2275d4]/10 rounded-full flex items-center justify-center">
              <UserPlus className="w-5 h-5 text-[#2275d4]" />
            </div>
            <h2 className="text-2xl text-slate-900 dark:text-white">
              {t.registerTitle}
            </h2>
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
              <label htmlFor="username" className="block text-sm mb-2 text-slate-700 dark:text-slate-300">
                {t.username} *
              </label>
              <input
                type="text"
                id="username"
                name="username"
                required
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2275d4]"
                placeholder="username"
              />
            </div>

            <div>
              <label htmlFor="fullName" className="block text-sm mb-2 text-slate-700 dark:text-slate-300">
                {t.fullName} *
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2275d4]"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm mb-2 text-slate-700 dark:text-slate-300">
                {t.email} *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2275d4]"
                placeholder="email@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm mb-2 text-slate-700 dark:text-slate-300">
                {t.password} *
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2275d4]"
                placeholder="••••••••"
              />
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{t.minPassword}</p>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm mb-2 text-slate-700 dark:text-slate-300">
                {t.confirmPassword} *
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2275d4]"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#2275d4] text-white py-3 rounded-lg hover:bg-[#1a5fb0] transition-colors mb-4"
          >
            {t.register}
          </button>

          <div className="text-center">
            <span className="text-slate-600 dark:text-slate-400 text-sm">{t.haveAccount} </span>
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="text-[#2275d4] hover:text-[#1a5fb0] text-sm"
            >
              {t.login}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
