import { useState } from 'react';
import { useLanguage } from '../i18n';
import { OfferModal } from './OfferModal';
import './OfferFab.css';

const RESUME_FILENAME = '이력서_20260214.pdf';
const PORTFOLIO_FILENAME = 'portfolio.pdf';

export function OfferFab() {
  const { t } = useLanguage();
  const p = t.profile;
  const [offerOpen, setOfferOpen] = useState(false);
  const base = import.meta.env.BASE_URL ?? '/';
  const resumeUrl = `${base}${RESUME_FILENAME}`;
  const portfolioUrl = `${base}${PORTFOLIO_FILENAME}`;

  return (
    <>
      <div className="offer-fab-group">
        <a
          href={portfolioUrl}
          download={PORTFOLIO_FILENAME}
          className="offer-fab offer-fab-resume"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={p.portfolioDownload}
        >
          <span className="offer-fab-text">{p.portfolioDownload}</span>
          <span className="offer-fab-icon" aria-hidden>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <line x1="10" y1="9" x2="8" y2="9" />
            </svg>
          </span>
        </a>
        <a
          href={resumeUrl}
          download={RESUME_FILENAME}
          className="offer-fab offer-fab-resume"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={p.resumeDownload}
        >
          <span className="offer-fab-text">{p.resumeDownload}</span>
          <span className="offer-fab-icon" aria-hidden>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
          </span>
        </a>
        <button
          type="button"
          className="offer-fab"
          onClick={() => setOfferOpen(true)}
          aria-label={p.offerButton}
        >
          <span className="offer-fab-text">{p.offerButton}</span>
          <span className="offer-fab-icon" aria-hidden>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <path d="m22 6-10 7L2 6" />
            </svg>
          </span>
        </button>
      </div>
      <OfferModal open={offerOpen} onClose={() => setOfferOpen(false)} email={p.email} t={p} />
    </>
  );
}
