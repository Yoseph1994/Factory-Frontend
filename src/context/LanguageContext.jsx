import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../i18n/translations';

const LanguageContext = createContext();

export const AVAILABLE_LANGUAGES = [
  { code: 'en', label: 'English', native: 'English', flag: '🇬🇧' },
  { code: 'om', label: 'Oromoo', native: 'Afaan Oromoo', flag: '🇪🇹' },
  { code: 'am', label: 'Amharic', native: 'አማርኛ', flag: '🇪🇹' }
];

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    try {
      return localStorage.getItem('plastix_lang') || 'en';
    } catch {
      return 'en';
    }
  });

  const setLanguage = (langCode) => {
    if (translations[langCode]) {
      setLanguageState(langCode);
      try {
        localStorage.setItem('plastix_lang', langCode);
      } catch {}
    }
  };

  // Safe nested translation lookup: t('dashboard.title', 'Fallback')
  const t = (path, fallback = '') => {
    if (!path) return fallback;
    const parts = path.split('.');
    let current = translations[language];

    for (const part of parts) {
      if (current && typeof current === 'object' && part in current) {
        current = current[part];
      } else {
        // Fallback to English if translation is missing in chosen language
        let enCurrent = translations['en'];
        for (const enPart of parts) {
          if (enCurrent && typeof enCurrent === 'object' && enPart in enCurrent) {
            enCurrent = enCurrent[enPart];
          } else {
            return fallback || path;
          }
        }
        return typeof enCurrent === 'string' ? enCurrent : (fallback || path);
      }
    }

    return typeof current === 'string' ? current : (fallback || path);
  };

  // Format Ethiopian Birr
  const formatCurrency = (amount) => {
    const num = Number(amount) || 0;
    const formatted = num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    if (language === 'am') {
      return `${formatted} ብር`;
    }
    return `Br ${formatted}`;
  };

  return (
    <LanguageContext.Provider value={{
      language,
      setLanguage,
      t,
      formatCurrency,
      languages: AVAILABLE_LANGUAGES
    }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
