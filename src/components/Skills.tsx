import { useMemo, useState, type ReactNode } from 'react';
import { useLanguage } from '../i18n';
import './Skills.css';

const SUMMARY_ITEMS = 3;

function SkillWithTooltip({
  tooltip,
  children,
  as: Tag = 'span',
}: {
  skill: string;
  tooltip: string | undefined;
  children: ReactNode;
  as?: 'span' | 'li';
}) {
  if (!tooltip) return <Tag>{children}</Tag>;
  return (
    <Tag className="skill-with-tooltip">
      {children}
      <span className="skill-tooltip" role="tooltip">{tooltip}</span>
    </Tag>
  );
}

export function Skills() {
  const { t } = useLanguage();
  const { sectionTitle, primaryStack, experiencedWith, toolsAndEnvironment, list, descriptions } = t.skills;
  const getTooltip = (skill: string) => descriptions[skill] ?? undefined;
  const allSkills = useMemo(
    () => [...list.primaryStack, ...list.experiencedWith, ...list.toolsAndEnvironment],
    [list]
  );
  const groups = useMemo(
    () => [
      { title: primaryStack, items: list.primaryStack },
      { title: experiencedWith, items: list.experiencedWith },
      { title: toolsAndEnvironment, items: list.toolsAndEnvironment },
    ],
    [primaryStack, experiencedWith, toolsAndEnvironment, list]
  );
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleCardClick = (index: number) => {
    setSelectedIndex((prev) => (prev === index ? null : index));
  };

  const expandedGroup = selectedIndex !== null ? groups[selectedIndex] : null;
  const summaryGroups =
    selectedIndex !== null
      ? groups
          .map((group, i) => ({ group, index: i }))
          .filter(({ index }) => index !== selectedIndex)
      : [];

  return (
    <section className="skills-section" id="skills">
      <div className="container">
        <h2 className="section-title">{sectionTitle}</h2>
        <div className="skills-cards-wrap">
          {selectedIndex === null ? (
            <div className="skills-cards-grid" role="list">
              {groups.map((group, i) => (
                <div
                  className="skill-group"
                  key={group.title}
                  role="listitem"
                  onClick={() => handleCardClick(i)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleCardClick(i);
                    }
                  }}
                  tabIndex={0}
                >
                  <h3>{group.title}</h3>
                  <ul>
                    {group.items.map((s) => (
                      <SkillWithTooltip key={s} as="li" skill={s} tooltip={getTooltip(s)}>{s}</SkillWithTooltip>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            <div className="skills-cards-grid skills-cards-grid--expanded" role="list">
              <div className="skills-cards-summary-col">
                {summaryGroups.map(({ group, index }) => (
                  <div
                    className="skill-group skill-group--summary"
                    key={group.title}
                    role="listitem"
                    onClick={() => setSelectedIndex(index)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setSelectedIndex(index);
                      }
                    }}
                    tabIndex={0}
                  >
                    <h3>{group.title}</h3>
                    <ul>
                      {group.items.slice(0, SUMMARY_ITEMS).map((s) => (
                        <SkillWithTooltip key={s} as="li" skill={s} tooltip={getTooltip(s)}>{s}</SkillWithTooltip>
                      ))}
                      {group.items.length > SUMMARY_ITEMS && (
                        <li className="skill-group-more">+{group.items.length - SUMMARY_ITEMS}</li>
                      )}
                    </ul>
                  </div>
                ))}
              </div>
              <div
                className="skill-group skill-group--expanded"
                role="listitem"
                onClick={() => setSelectedIndex(null)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedIndex(null);
                  }
                }}
                tabIndex={0}
              >
                {expandedGroup && (
                  <>
                    <h3>{expandedGroup.title}</h3>
                    <ul>
                      {expandedGroup.items.map((s) => (
                        <SkillWithTooltip key={s} as="li" skill={s} tooltip={getTooltip(s)}>{s}</SkillWithTooltip>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
        <div className="skills-marquee-wrap" aria-hidden="true">
          <div className="skills-marquee">
            {[...allSkills, ...allSkills].map((s, i) => (
              <span className="skills-marquee-item" key={`${s}-${i}`}>
                <SkillWithTooltip skill={s} tooltip={getTooltip(s)} as="span">{s}</SkillWithTooltip>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
