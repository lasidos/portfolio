import { projects } from '../data';
import './Projects.css';

export function Projects() {
  return (
    <section className="projects-section" id="projects">
      <div className="container">
        <h2 className="section-title black">PROJECT</h2>
        <div className="projects-list">
          {projects.map((project, i) => (
            <article key={i} className="project-item">
              <div className="project-left">
                <div className="project-header">
                  <h3>{project.title}</h3>
                  <span className="project-period">{project.period}</span>
                </div>
                <p className="project-type">{project.type}</p>
                <p className="project-desc">{project.description}</p>
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                  >
                    Github →
                  </a>
                )}
              </div>
              <div className="project-right">
                <div className="project-block">
                  <p className="block-label">What I did</p>
                  <ul>
                    {project.achievements.map((a, j) => (
                      <li key={j}>{a}</li>
                    ))}
                  </ul>
                </div>
                <div className="project-block">
                  <p className="block-label">Stack</p>
                  <p className="stack-text">{project.stack}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
