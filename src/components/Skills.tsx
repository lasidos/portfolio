import { skills } from '../data';
import './Skills.css';

export function Skills() {
  return (
    <section className="skills-section" id="skills">
      <div className="container">
        <h2 className="section-title black">SKILLS</h2>
        <div className="skills-grid">
          <div className="skill-group">
            <h3>Familiar</h3>
            <ul>
              {skills.familiar.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
          <div className="skill-group">
            <h3>Tried</h3>
            <ul>
              {skills.tried.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
          <div className="skill-group">
            <h3>Language</h3>
            <ul>
              {skills.language.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
