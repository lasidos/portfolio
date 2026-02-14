import { useLanguage } from '../i18n';
import './Footer.css';

export function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container">
        <p>© {year}. {t.profile.name} {t.footer.copyright}</p>
      </div>
    </footer>
  );
}
