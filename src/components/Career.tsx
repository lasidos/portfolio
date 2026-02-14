import { careers, certificates, hope } from '../data';
import './Career.css';

export function Career() {
  return (
    <section className="career-section" id="career">
      <div className="container">
        <h2 className="section-title black">CAREER</h2>
        <div className="career-timeline">
          {careers.map((c, i) => (
            <div key={i} className="career-item">
              <div className="career-meta">
                <span className="career-company">{c.company}</span>
                <span className="career-period">{c.period}</span>
                <span className="career-duration">{c.duration}</span>
              </div>
              <p className="career-role">{c.role}</p>
              <p className="career-desc">{c.description}</p>
              <p className="career-stack">{c.stack}</p>
            </div>
          ))}
        </div>
        <div className="certificates-block">
          <h3>자격증</h3>
          <ul>
            {certificates.map((cert, i) => (
              <li key={i}>
                <strong>{cert.name}</strong> · {cert.issuer} ({cert.date})
              </li>
            ))}
          </ul>
        </div>
        <div className="hope-block">
          <h3>희망 근무 조건</h3>
          <ul>
            <li><span>고용형태</span> {hope.employment}</li>
            <li><span>희망근무지</span> {hope.location}</li>
            <li><span>희망연봉</span> {hope.salary}</li>
            <li><span>지원분야</span> {hope.position}</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
