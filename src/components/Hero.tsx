import { useEffect, useState } from 'react';
import './Hero.css';

const TITLE = 'YOO JIHYEOK';

export function Hero() {
  const [display, setDisplay] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index >= TITLE.length) return;
    const t = setTimeout(() => {
      setDisplay((prev) => prev + TITLE[index]);
      setIndex((i) => i + 1);
    }, 120);
    return () => clearTimeout(t);
  }, [index]);

  return (
    <section className="hero" id="hero">
      <div className="hero-inner">
        <h1 className="hero-title">
          <span className="hero-title-text">{display}</span>
          <span className="hero-caret">|</span>
        </h1>
        <p className="hero-sub">Full Stack Developer</p>
      </div>
    </section>
  );
}
