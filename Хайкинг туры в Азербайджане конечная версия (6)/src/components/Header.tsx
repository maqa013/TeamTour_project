import { useState } from 'react';
import { Mountain, User as UserIcon, LogOut, Map, Globe, Compass, Info, MessageSquare, Briefcase, Star } from 'lucide-react';
import { User } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { ThemeToggle } from './ThemeToggle';
import type { Language } from '../locales/translations';

interface HeaderProps {
  onLogoClick: () => void;
  currentUser: User | null;
  onLoginClick: () => void;
  onProfileClick: () => void;
  onLogout: () => void;
  onRoutesClick: () => void;
  onContactClick: () => void;
  onAboutClick: () => void;
  onReviewsClick?: () => void;
  currentPage: string;
}

export function Header({ 
  onLogoClick, 
  currentUser, 
  onLoginClick, 
  onProfileClick, 
  onLogout,
  onRoutesClick,
  onContactClick,
  onAboutClick,
  onReviewsClick,
  currentPage
}: HeaderProps) {
  const { language, setLanguage, t } = useLanguage();
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);

  const languages: { code: Language; name: string; flag: string }[] = [
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'az', name: 'Azərbaycanca', flag: '🇦🇿' },
  ];

  return (
    <header className="bg-slate-900 shadow-sm sticky top-0 z-50 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <button 
            onClick={onLogoClick}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            {/* Updated detailed mountain logo */}
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 4L6 24H26L16 4Z" fill="#2275d4" fillOpacity="0.3"/>
              <path d="M16 4L11 14L6 24H26L21 14L16 4Z" stroke="#2275d4" strokeWidth="1.5" strokeLinejoin="round"/>
              <path d="M11 14L8 20H14L11 14Z" fill="#2275d4" fillOpacity="0.5"/>
              <path d="M21 14L18 20H24L21 14Z" fill="#2275d4" fillOpacity="0.5"/>
              <circle cx="16" cy="8" r="1.5" fill="#2275d4"/>
              <path d="M13 18L16 12L19 18" stroke="#2275d4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <div className="flex flex-col items-start">
              <span className="text-slate-900 dark:text-white">{t.companyName}</span>
              <span className="text-xs text-slate-500 dark:text-slate-400">{t.companySlogan}</span>
            </div>
          </button>
          
          <nav className="hidden md:flex items-center gap-8">
            <button 
              onClick={onLogoClick}
              className={`flex items-center gap-2 transition-colors ${
                currentPage === 'home' 
                  ? 'text-[#2275d4]' 
                  : 'text-slate-700 dark:text-slate-300 hover:text-[#2275d4]'
              }`}
            >
              <Compass className="w-4 h-4" />
              {t.tours}
            </button>
            <button 
              onClick={onRoutesClick}
              className={`flex items-center gap-2 transition-colors ${
                currentPage === 'routes' 
                  ? 'text-[#2275d4]' 
                  : 'text-slate-700 dark:text-slate-300 hover:text-[#2275d4]'
              }`}
            >
              <Map className="w-4 h-4" />
              {t.routes}
            </button>
            {onReviewsClick && (
              <button 
                onClick={onReviewsClick}
                className={`flex items-center gap-2 transition-colors ${
                  currentPage === 'reviews' 
                    ? 'text-[#2275d4]' 
                    : 'text-slate-700 dark:text-slate-300 hover:text-[#2275d4]'
                }`}
              >
                <Star className="w-4 h-4" />
                {t.reviews}
              </button>
            )}
            <button
              onClick={onAboutClick}
              className={`flex items-center gap-2 transition-colors ${
                currentPage === 'about' 
                  ? 'text-[#2275d4]' 
                  : 'text-slate-700 dark:text-slate-300 hover:text-[#2275d4]'
              }`}
            >
              <Info className="w-4 h-4" />
              {t.about}
            </button>
            <button 
              onClick={onContactClick}
              className={`flex items-center gap-2 transition-colors ${
                currentPage === 'contact' 
                  ? 'text-[#2275d4]' 
                  : 'text-slate-700 dark:text-slate-300 hover:text-[#2275d4]'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              {t.contact}
            </button>
          </nav>

          <div className="flex items-center gap-4">
            <a href="tel:+994508507919" className="hidden sm:block text-slate-700 dark:text-slate-300 hover:text-[#2275d4] transition-colors">
              +994 50 850 79 19
            </a>

            <ThemeToggle />

            <div className="relative">
              <button
                onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <Globe className="w-4 h-4 text-slate-700 dark:text-slate-300" />
                <span className="text-sm text-slate-700 dark:text-slate-300">
                  {languages.find(l => l.code === language)?.flag}
                </span>
              </button>

              {showLanguageMenu && (
                <>
                  <div 
                    className="fixed inset-0 z-10" 
                    onClick={() => setShowLanguageMenu(false)}
                  />
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 py-2 z-20">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code);
                          setShowLanguageMenu(false);
                        }}
                        className={`w-full px-4 py-2 text-left hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center gap-3 ${
                          language === lang.code ? 'bg-[#2275d4]/10 text-[#2275d4]' : 'text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <span className="text-xl">{lang.flag}</span>
                        <span className="text-sm">{lang.name}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
            
            {currentUser ? (
              <div className="flex items-center gap-3">
                <button
                  onClick={onProfileClick}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    currentPage === 'profile'
                      ? 'bg-[#2275d4] text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  <UserIcon className="w-4 h-4" />
                  <span className="hidden sm:inline">{currentUser.username}</span>
                </button>
                <button
                  onClick={onLogout}
                  className="p-2 text-slate-700 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                  title={t.logout}
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <button
                onClick={onLoginClick}
                className="bg-[#2275d4] text-white px-6 py-2 rounded-lg hover:bg-[#1a5fb0] transition-colors"
              >
                {t.login}
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
