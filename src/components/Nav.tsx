import { useState } from 'react';
import { useLanguage } from '../i18n';
import './Nav.css';

const SECTION_IDS = ['hero', 'profile', 'introduce', 'skills', 'projects', 'career'] as const;

const LANG_OPTIONS: { loc: 'ko' | 'en' | 'ja'; flag: string; label: string }[] = [
  { loc: 'ko', flag: '🇰🇷', label: 'KO' },
  { loc: 'en', flag: '🇺🇸', label: 'EN' },
  { loc: 'ja', flag: '🇯🇵', label: 'JA' },
];

export function Nav() {
  const { locale, setLocale, t } = useLanguage();
  const [open, setOpen] = useState(false);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  };

  const navLabels = [t.nav.home, t.nav.profile, t.nav.introduce, t.nav.skills, t.nav.project, t.nav.career];

  return (
    <nav className={`nav ${open ? 'nav-open' : ''}`}>
      <div className="nav-bar">
        <div className="nav-inner">
          <ul className="nav-list">
            {SECTION_IDS.map((id, i) => (
              <li key={id}>
                <button type="button" onClick={() => scrollTo(id)}>
                  {navLabels[i]}
                </button>
              </li>
            ))}
          </ul>
          <div className="nav-lang">
            {LANG_OPTIONS.map(({ loc, flag, label }) => (
              <button
                key={loc}
                type="button"
                className={`nav-lang-btn ${locale === loc ? 'active' : ''}`}
                onClick={() => setLocale(loc)}
                aria-label={loc === 'ko' ? '한국어' : loc === 'en' ? 'English' : '日本語'}
                title={loc === 'ko' ? '한국어' : loc === 'en' ? 'English' : '日本語'}
              >
                <span className="nav-lang-flag" aria-hidden>{flag}</span>
                <span className="nav-lang-label">{label}</span>
              </button>
            ))}
          </div>
        </div>
        <button
          type="button"
          className="nav-toggle"
          aria-label={t.nav.menu}
          onClick={() => setOpen(!open)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
      <div className="nav-dropdown">
        <ul className="nav-list nav-list--dropdown">
          {SECTION_IDS.map((id, i) => (
            <li key={id}>
              <button type="button" onClick={() => scrollTo(id)}>
                {navLabels[i]}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
