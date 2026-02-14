import { useState } from 'react';
import './Nav.css';

const LINKS = [
  { id: 'hero', label: 'Home' },
  { id: 'profile', label: 'Profile' },
  { id: 'introduce', label: 'Introduce' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Project' },
  { id: 'career', label: 'Career' },
] as const;

export function Nav() {
  const [open, setOpen] = useState(false);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  };

  return (
    <nav className={`nav ${open ? 'nav-open' : ''}`}>
      <button
        type="button"
        className="nav-toggle"
        aria-label="메뉴"
        onClick={() => setOpen(!open)}
      >
        <span />
        <span />
        <span />
      </button>
      <ul className="nav-list">
        {LINKS.map(({ id, label }) => (
          <li key={id}>
            <button type="button" onClick={() => scrollTo(id)}>
              {label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
