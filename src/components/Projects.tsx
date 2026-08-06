import { useState } from 'react';
import { useLanguage } from '../i18n';
import './Projects.css';

const PERSONAL_PERIODS = ['개인 프로젝트', 'Personal Project', '個人プロジェクト'];

export function Projects() {
  const { t } = useLanguage();
  const {
    sectionTitle,
    whatIdid,
    stack,
    github,
    periodLabel,
    expandProject,
    collapseProject,
    tabWork,
    tabPersonal,
    items,
  } = t.projects;

  const workItems = items.filter((p) => !PERSONAL_PERIODS.includes(p.period));
  const personalItems = items.filter((p) => PERSONAL_PERIODS.includes(p.period));

  const [tab, setTab] = useState<'work' | 'personal'>('work');
  const [expandedKey, setExpandedKey] = useState<string | null>(null);

  const list = tab === 'work' ? workItems : personalItems;

  const selectTab = (next: 'work' | 'personal') => {
    setTab(next);
    setExpandedKey(null);
  };

  const toggle = (key: string) => {
    setExpandedKey((prev) => (prev === key ? null : key));
  };

  const tabs: { id: 'work' | 'personal'; label: string; count: number }[] = [
    { id: 'work', label: tabWork, count: workItems.length },
    { id: 'personal', label: tabPersonal, count: personalItems.length },
  ];

  return (
    <section className="projects-section" id="projects">
      <div className="container">
        <p className="section-eyebrow">Selected Work</p>
        <h2 className="section-title">{sectionTitle}</h2>
        <div className="projects-layout">
          <div className="projects-tabs" role="tablist" aria-orientation="vertical" aria-label={sectionTitle}>
            {tabs.map((tb) => (
              <button
                key={tb.id}
                type="button"
                role="tab"
                aria-selected={tab === tb.id}
                className="projects-tab"
                data-active={tab === tb.id}
                onClick={() => selectTab(tb.id)}
              >
                <span className="projects-tab-label">{tb.label}</span>
                <span className="projects-tab-count">{tb.count}</span>
              </button>
            ))}
          </div>

          <div className="projects-list" role="tabpanel">
            {list.map((project) => {
              const key = project.title;
              const isExpanded = expandedKey === key;
              return (
                <article key={key} className="project-item" data-expanded={isExpanded}>
                  <div className="project-item-header">
                    <div className="project-left">
                      <h3 className="project-title">{project.title}</h3>
                      <div className="project-meta">
                        <span className="project-meta-item">
                          <span className="project-meta-label">{periodLabel}</span>
                          <span className="project-period">{project.period}</span>
                        </span>
                        {project.type && <span className="project-type">{project.type}</span>}
                      </div>
                    </div>
                    <button
                      type="button"
                      className="project-toggle"
                      onClick={() => toggle(key)}
                      aria-expanded={isExpanded}
                      aria-label={isExpanded ? collapseProject : expandProject}
                    >
                      <span className="project-toggle-icon" aria-hidden>▼</span>
                    </button>
                  </div>
                  <div className="project-item-body">
                    <div className="project-left">
                      <p className="project-desc">{project.description}</p>
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-link"
                        >
                          {github} →
                        </a>
                      )}
                    </div>
                    <div className="project-right">
                      <div className="project-block">
                        <p className="block-label">{whatIdid}</p>
                        <ul>
                          {project.achievements.map((a, j) => (
                            <li key={j}>{a}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="project-block">
                        <p className="block-label">{stack}</p>
                        <p className="stack-text">{project.stack}</p>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
