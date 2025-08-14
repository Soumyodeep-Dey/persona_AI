import { useEffect, useState } from 'react';

export default function DarkModeToggle({ isDark, toggle }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <span className="w-12 h-6 rounded-full bg-gray-300 dark:bg-gray-700 inline-block" />;

  return (
    <button
      onClick={toggle}
      aria-pressed={isDark}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className="relative w-12 h-6 focus:outline-none"
    >
      <span className={`absolute inset-0 rounded-full transition-colors duration-300 ${isDark ? 'bg-gray-700' : 'bg-yellow-100'}`} />
      <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full shadow-md flex items-center justify-center text-xs transition-transform duration-300 ${isDark ? 'translate-x-6 bg-indigo-600 text-yellow-200' : 'translate-x-0 bg-white text-yellow-500'}`}>
        {isDark ? '🌙' : '☀️'}
      </span>
    </button>
  );
}