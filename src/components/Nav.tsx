import { useState } from 'react';
import { useLanguage } from '../i18n';
import './Nav.css';

const LINKS = [
  { id: 'projects', key: 'project' },
  { id: 'introduce', key: 'introduce' },
  { id: 'skills', key: 'skills' },
  { id: 'career', key: 'career' },
] as const;

const LANG_OPTIONS: { loc: 'ko' | 'en' | 'ja'; label: string }[] = [
  { loc: 'ko', label: 'KO' },
  { loc: 'en', label: 'EN' },
  { loc: 'ja', label: 'JA' },
];

export function Nav() {
  const { locale, setLocale, t } = useLanguage();
  const [open, setOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  };

  return (
    <header className="nav">
      <div className="nav-inner">
        <button type="button" className="nav-brand" onClick={() => scrollTo('hero')}>
          {t.profile.name}
        </button>

        <nav className="nav-links">
          {LINKS.map((l) => (
            <button key={l.id} type="button" className="nav-link" onClick={() => scrollTo(l.id)}>
              {t.nav[l.key]}
            </button>
          ))}
        </nav>

        <div className="nav-right">
          <div className="nav-lang">
            {LANG_OPTIONS.map(({ loc, label }) => (
              <button
                key={loc}
                type="button"
                className={`nav-lang-btn ${locale === loc ? 'active' : ''}`}
                onClick={() => setLocale(loc)}
              >
                {label}
              </button>
            ))}
          </div>
          <button type="button" className="nav-cta" onClick={() => scrollTo('contact')}>
            {t.nav.contact}
          </button>
          <button
            type="button"
            className="nav-toggle"
            aria-label={t.nav.menu}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      {open && (
        <div className="nav-dropdown">
          {LINKS.map((l) => (
            <button key={l.id} type="button" onClick={() => scrollTo(l.id)}>
              {t.nav[l.key]}
            </button>
          ))}
          <button type="button" className="nav-dropdown-cta" onClick={() => scrollTo('contact')}>
            {t.nav.contact}
          </button>
        </div>
      )}
    </header>
  );
}
