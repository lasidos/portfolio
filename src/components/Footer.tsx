import { useLanguage } from '../i18n';
import './Footer.css';

const BASE = import.meta.env.BASE_URL;

const DOCS = [
  { key: 'career' as const, file: '경력기술서_유지혁.pdf' },
  { key: 'portfolio' as const, file: '포트폴리오_유지혁.pdf' },
  { key: 'skill' as const, file: '스킬인벤토리_유지혁.pdf' },
];

export function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();
  const email = t.profile.email;
  const github = t.profile.github;
  const portfolioPdf = `${BASE}${encodeURIComponent('포트폴리오_유지혁.pdf')}`;

  const links = [
    { label: 'GitHub', value: '@lasidos', href: github },
    { label: 'Email', value: email, href: `mailto:${email}` },
    { label: 'Portfolio', value: 'lasidos.github.io', href: `${BASE}` },
  ];

  return (
    <footer className="contact" id="contact">
      <div className="contact-inner">
        <h2 className="contact-title">{t.footer.contactTitle}</h2>
        <p className="contact-subtitle">{t.footer.contactSubtitle}</p>

        <div className="contact-cta">
          <a href={`mailto:${email}`} className="contact-btn contact-btn--primary">
            {t.footer.emailCta}
          </a>
          <a href={portfolioPdf} download className="contact-btn contact-btn--ghost">
            {t.footer.resumeCta}
          </a>
        </div>

        <div className="contact-links">
          {links.map((l) => (
            <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className="contact-link">
              <span className="contact-link-label">{l.label}</span>
              <span className="contact-link-value">{l.value}</span>
            </a>
          ))}
        </div>

        <div className="contact-downloads">
          <span className="contact-downloads-title">{t.footer.downloadTitle}</span>
          <div className="contact-downloads-list">
            {DOCS.map((doc) => (
              <a
                key={doc.key}
                className="contact-download"
                href={`${BASE}${encodeURIComponent(doc.file)}`}
                download={doc.file}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span aria-hidden>↓</span>
                {t.footer[doc.key]}
              </a>
            ))}
          </div>
        </div>

        <p className="contact-copy">© {year}. {t.profile.name} {t.footer.copyright}</p>
      </div>
    </footer>
  );
}
