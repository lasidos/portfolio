import { profile } from '../data';
import './Footer.css';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container">
        <p>© {year}. {profile.name} All rights reserved.</p>
      </div>
    </footer>
  );
}
