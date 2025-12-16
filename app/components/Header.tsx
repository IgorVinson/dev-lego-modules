'use client';

import Link from 'next/link';
import { useTheme } from './ThemeProvider';

export default function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/70 dark:bg-black/40 backdrop-blur border-b border-white/40 dark:border-white/5">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 text-sm font-semibold tracking-wide uppercase">
          <span className="h-2 w-2 rounded-full bg-indigo-500" />
          Dev Lego Modules
        </Link>
        <button
          type="button"
          onClick={toggleTheme}
          className="inline-flex items-center gap-2 rounded-full border border-zinc-200 dark:border-white/20 bg-white/80 dark:bg-white/5 px-4 py-2 text-sm font-medium text-zinc-700 dark:text-white transition hover:shadow-md"
        >
          {theme === 'dark' ? (
            <>
              <SunIcon />
              Light mode
            </>
          ) : (
            <>
              <MoonIcon />
              Dark mode
            </>
          )}
        </button>
      </div>
    </header>
  );
}

function SunIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2m0 16v2m10-10h-2M4 12H2m16.95 7.05-1.414-1.414M6.464 6.464 5.05 5.05m0 13.9 1.414-1.414M19.95 5.05l-1.414 1.414" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M21 14.5A8.5 8.5 0 0 1 11.5 5a8.5 8.5 0 1 0 9.5 9.5Z" />
    </svg>
  );
}
