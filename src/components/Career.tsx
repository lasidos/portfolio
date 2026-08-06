import { useCallback, useEffect, useState } from 'react';
import { useLanguage } from '../i18n';
import { getCareerItemYears, getTotalCareerYears } from './CareerChart';
import { CapabilityRadar } from './CapabilityRadar';
import './Career.css';

type CardDetailKey = 'careers' | 'projects' | 'domains' | null;

const ACHIEVEMENT_ICONS = ['⚡', '📱', '🚀', '🤖'];

export function Career() {
  const { t } = useLanguage();
  const {
    sectionTitle,
    dashboard,
    items,
  } = t.career;
  const projectItems = t.projects.items;
  const totalCareerYears = getTotalCareerYears(items);
  const totalYearsFormatted = (() => {
    const years = Math.floor(totalCareerYears);
    const months = Math.round((totalCareerYears - years) * 12);
    return `${years}${dashboard.yearUnit} ${months}${dashboard.monthUnit}`;
  })();
  const careerYearsLabel = `${Math.floor(totalCareerYears)}+`;
  const projectCount = projectItems.length;
  const domainCount = dashboard.domainList.length;

  const [detailCard, setDetailCard] = useState<CardDetailKey>(null);

  const openCardDetail = useCallback((key: CardDetailKey) => {
    setDetailCard((prev) => (prev === key ? null : key));
  }, []);

  const closeCardDetail = useCallback(() => {
    setDetailCard(null);
  }, []);

  useEffect(() => {
    if (detailCard === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCardDetail();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [detailCard, closeCardDetail]);

  return (
    <section className="career-section" id="career">
      <div className="container">
        <p className="section-eyebrow">Career</p>
        <h2 className="section-title">{sectionTitle}</h2>

        <div className="career-dashboard">
          <div className="career-kpi-row">
            <button
              type="button"
              className="career-kpi-card career-kpi-card--clickable"
              onClick={() => openCardDetail('careers')}
            >
              <span className="career-kpi-value">{careerYearsLabel}</span>
              <span className="career-kpi-label">{dashboard.careers}</span>
            </button>
            <button
              type="button"
              className="career-kpi-card career-kpi-card--clickable"
              onClick={() => openCardDetail('projects')}
            >
              <span className="career-kpi-value">{projectCount}+</span>
              <span className="career-kpi-label">{dashboard.projects}</span>
            </button>
            <button
              type="button"
              className="career-kpi-card career-kpi-card--clickable"
              onClick={() => openCardDetail('domains')}
            >
              <span className="career-kpi-value">{domainCount}+</span>
              <span className="career-kpi-label">{dashboard.domains}</span>
            </button>
          </div>

          <div className="career-chart-wrap">
            <div className="career-dashboard-chart">
              <CapabilityRadar />
            </div>
          </div>

          <div className="career-achievements">
            <h3 className="career-achievements-title">{dashboard.achievementsTitle}</h3>
            <div className="career-achievements-grid">
              {dashboard.achievements.map((a, i) => (
                <div key={i} className="career-achievement-card">
                  <span className="career-achievement-icon" aria-hidden>
                    {ACHIEVEMENT_ICONS[i % ACHIEVEMENT_ICONS.length]}
                  </span>
                  <div className="career-achievement-text">
                    <h4 className="career-achievement-title">{a.title}</h4>
                    <p className="career-achievement-desc">{a.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {detailCard !== null && (
        <div
          className="career-detail-backdrop"
          onClick={closeCardDetail}
          role="dialog"
          aria-modal="true"
          aria-labelledby="career-detail-title"
        >
          <div className="career-detail-modal" onClick={(e) => e.stopPropagation()}>
            <div className="career-detail-header">
              <h3 id="career-detail-title" className="career-detail-title">
                {detailCard === 'careers' && dashboard.careers}
                {detailCard === 'projects' && dashboard.projects}
                {detailCard === 'domains' && dashboard.domains}
              </h3>
              <span className="career-detail-count">
                {detailCard === 'careers' && totalYearsFormatted}
                {detailCard === 'projects' && `${projectItems.length}건`}
                {detailCard === 'domains' && `${dashboard.domainList.length}건`}
              </span>
              <button type="button" className="career-detail-close" onClick={closeCardDetail} aria-label="닫기">
                ×
              </button>
            </div>
            <div className="career-detail-body">
              {detailCard === 'careers' && (
                <ul className="career-detail-list">
                  {items.map((c, i) => {
                    const years = getCareerItemYears(c);
                    const yearsText = `${years.toFixed(1)}${dashboard.yearUnit}`;
                    return (
                      <li key={i} className="career-detail-item">
                        <span className="career-detail-item-label">{c.company}</span>
                        <span className="career-detail-item-value">{yearsText}</span>
                      </li>
                    );
                  })}
                </ul>
              )}
              {detailCard === 'projects' && (
                <ul className="career-detail-list career-detail-list--projects">
                  {projectItems.map((p, i) => (
                    <li key={i} className="career-detail-item career-detail-item--project">
                      <span className="career-detail-item-label">{p.title}</span>
                      {p.type && <span className="career-detail-item-type">{p.type}</span>}
                    </li>
                  ))}
                </ul>
              )}
              {detailCard === 'domains' && (
                <div className="career-detail-tags">
                  {dashboard.domainList.map((d, i) => (
                    <span key={i} className="career-detail-tag">{d}</span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
