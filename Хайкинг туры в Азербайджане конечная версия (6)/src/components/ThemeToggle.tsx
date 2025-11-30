import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex h-10 w-20 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 bg-gradient-to-r from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800"
      aria-label="Toggle theme"
    >
      <span
        className={`${
          theme === 'dark' ? 'translate-x-11' : 'translate-x-1'
        } inline-flex h-8 w-8 transform items-center justify-center rounded-full bg-white dark:bg-slate-900 shadow-lg transition-transform duration-300 ease-in-out`}
      >
        {theme === 'dark' ? (
          <Moon className="h-4 w-4 text-amber-400" />
        ) : (
          <Sun className="h-4 w-4 text-amber-500" />
        )}
      </span>
      <span className={`absolute left-2 transition-opacity ${theme === 'light' ? 'opacity-0' : 'opacity-100'}`}>
        <Sun className="h-4 w-4 text-amber-400" />
      </span>
      <span className={`absolute right-2 transition-opacity ${theme === 'dark' ? 'opacity-0' : 'opacity-100'}`}>
        <Moon className="h-4 w-4 text-slate-500" />
      </span>
    </button>
  );
}
