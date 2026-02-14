import { introduce } from '../data';
import './Introduce.css';

export function Introduce() {
  return (
    <section className="introduce-section" id="introduce">
      <div className="container">
        <h2 className="section-title black">{introduce.title}</h2>
        <div className="introduce-content">
          {introduce.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          <p className="introduce-summary">{introduce.summary}</p>
        </div>
      </div>
    </section>
  );
}
