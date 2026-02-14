import { createContext, useContext, useCallback, useState, useMemo, useEffect, type ReactNode } from 'react';
import type { Locale, Translation } from './types';
import { ko } from './translations/ko';
import { en } from './translations/en';
import { ja } from './translations/ja';

const translationsMap: Record<Locale, Translation> = { ko, en, ja };

const STORAGE_KEY = 'portfolio-locale';

function getInitialLocale(): Locale {
  if (typeof window === 'undefined') return 'ko';
  const stored = localStorage.getItem(STORAGE_KEY) as Locale | null;
  if (stored && (stored === 'ko' || stored === 'en' || stored === 'ja')) return stored;
  const lang = navigator.language.toLowerCase();
  if (lang.startsWith('ja')) return 'ja';
  if (lang.startsWith('en')) return 'en';
  return 'ko';
}

interface LanguageContextValue {
  locale: Locale;
  setLocale: (next: Locale) => void;
  t: Translation;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(getInitialLocale);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    localStorage.setItem(STORAGE_KEY, next);
    if (typeof document !== 'undefined') {
      document.documentElement.lang = next === 'ja' ? 'ja' : next === 'en' ? 'en' : 'ko';
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale === 'ja' ? 'ja' : locale === 'en' ? 'en' : 'ko';
  }, [locale]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      locale,
      setLocale,
      t: translationsMap[locale],
    }),
    [locale, setLocale]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
