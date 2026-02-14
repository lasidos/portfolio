import { useEffect, useState } from 'react';
import { useLanguage } from '../i18n';
import './Hero.css';

const TITLE = 'YU JIHYEOK';

export function Hero() {
  const { t } = useLanguage();
  const [display, setDisplay] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index >= TITLE.length) return;
    const timeout = setTimeout(() => {
      setDisplay((prev) => prev + TITLE[index]);
      setIndex((i) => i + 1);
    }, 120);
    return () => clearTimeout(timeout);
  }, [index]);

  return (
    <section className="hero" id="hero">
      <div className="hero-inner">
        <h1 className="hero-title">
          <span className="hero-title-text">{display}</span>
          <span className="hero-caret">|</span>
        </h1>
        <p className="hero-sub">{t.hero.sub}</p>
      </div>
    </section>
  );
}
