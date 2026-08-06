import { useLanguage } from '../i18n';
import './Hero.css';

const BASE = import.meta.env.BASE_URL;
const RESUME = `${BASE}${encodeURIComponent('경력기술서_유지혁.pdf')}`;

export function Hero() {
  const { t } = useLanguage();
  const { badge, headline, subtitle, ctaPrimary, ctaSecondary, stats } = t.hero;

  // headline: "... {강조} ..." → split accent
  const parts = headline.split(/\{([^}]+)\}/);

  return (
    <section className="hero" id="hero">
      <div className="hero-inner">
        <div className="hero-badge">
          <span className="hero-badge-dot" aria-hidden />
          {badge}
        </div>

        <h1 className="hero-title">
          {parts.map((p, i) =>
            i % 2 === 1 ? (
              <span key={i} className="hero-title-accent">{p}</span>
            ) : (
              <span key={i}>{p}</span>
            )
          )}
        </h1>

        <p className="hero-subtitle">{subtitle}</p>

        <div className="hero-cta">
          <a href="#projects" className="hero-btn hero-btn--primary">{ctaPrimary}</a>
          <a href={RESUME} download className="hero-btn hero-btn--secondary">{ctaSecondary}</a>
        </div>

        <div className="hero-stats">
          {stats.map((s, i) => (
            <div className="hero-stat" key={i}>
              <div className="hero-stat-value">{s.value}</div>
              <div className="hero-stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
