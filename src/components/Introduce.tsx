import { useLanguage } from '../i18n';
import './Introduce.css';

export function Introduce() {
  const { t } = useLanguage();
  const { title, paragraphs, summary } = t.introduce;
  return (
    <section className="introduce-section" id="introduce">
      <div className="container">
        <p className="section-eyebrow">About</p>
        <h2 className="section-title">{title}</h2>
        <div className="introduce-content">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          <p className="introduce-summary">{summary}</p>
        </div>
      </div>
    </section>
  );
}
