import React, { useState, useRef, useEffect } from 'react';
import { getStoredLanguage, applyTranslations, type SupportedLang } from '../../lib/i18n';

export default function LanguageSwitcher() {
  const [currentLang, setCurrentLang] = useState<SupportedLang>('EN');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Sync with localStorage on mount & listen to external language change events
  useEffect(() => {
    const saved = getStoredLanguage();
    setCurrentLang(saved);

    const handleLangChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ lang: SupportedLang }>;
      if (customEvent.detail?.lang) {
        setCurrentLang(customEvent.detail.lang);
      }
    };

    window.addEventListener('languageChange', handleLangChange);

    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('languageChange', handleLangChange);
    };
  }, []);

  const handleSelectLang = (lang: SupportedLang) => {
    if (lang === currentLang) {
      setIsOpen(false);
      return;
    }
    setCurrentLang(lang);
    setIsOpen(false);
    applyTranslations(lang);
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-mono font-semibold text-secondary hover:text-dark transition-colors rounded-sm border border-border bg-white hover:border-dark shadow-2xs"
        aria-expanded={isOpen}
        aria-label="Pilih bahasa / Select language"
      >
        <svg className="w-3.5 h-3.5 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" strokeWidth="2" />
          <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" strokeWidth="2" />
        </svg>
        <span className="font-bold text-dark">{currentLang}</span>
        <svg
          className={`w-3 h-3 transition-transform duration-200 text-secondary ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1.5 w-36 origin-top-right rounded-sm bg-white shadow-card-hover border border-border py-1 z-50 focus:outline-none">
          <button
            type="button"
            onClick={() => handleSelectLang('EN')}
            className={`w-full flex items-center justify-between px-3 py-2 text-xs font-mono text-left transition-colors ${
              currentLang === 'EN' ? 'bg-brand-50 text-brand-700 font-bold' : 'text-dark hover:bg-[#F7F7F5]'
            }`}
          >
            <span>English (EN)</span>
            {currentLang === 'EN' && (
              <svg className="w-3.5 h-3.5 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            )}
          </button>
          <button
            type="button"
            onClick={() => handleSelectLang('ID')}
            className={`w-full flex items-center justify-between px-3 py-2 text-xs font-mono text-left transition-colors ${
              currentLang === 'ID' ? 'bg-brand-50 text-brand-700 font-bold' : 'text-dark hover:bg-[#F7F7F5]'
            }`}
          >
            <span>Indonesia (ID)</span>
            {currentLang === 'ID' && (
              <svg className="w-3.5 h-3.5 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
