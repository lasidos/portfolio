import { useState } from 'react';
import { useLanguage } from '../i18n';
import './Profile.css';

export function Profile() {
  const { t } = useLanguage();
  const p = t.profile;
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <section className="profile-section" id="profile">
      <div className="container">
        <h2 className="section-title">{p.sectionTitle}</h2>
        <div className="profile-box">
          <div className="profile-avatar">
            <div className="avatar-placeholder">
              <span className="avatar-initial">{p.name[0]}</span>
            </div>
          </div>
          <div className="profile-info">
            <div className="profile-name">
              <span>{p.name}</span>
              <span className="name-en">{p.nameEn}</span>
            </div>
            <div className="profile-role-row">
              <p className="profile-role">{p.role}</p>
              <button
                type="button"
                className="profile-toggle"
                onClick={() => setContactOpen((v) => !v)}
                aria-expanded={contactOpen}
              >
                <span className="profile-toggle-text">
                  {contactOpen ? p.collapseContact : p.expandContact}
                </span>
                <span className="profile-toggle-icon" aria-hidden>▼</span>
              </button>
            </div>
            <div className={`profile-contact ${contactOpen ? 'profile-contact--open' : ''}`}>
              <ul className="profile-list">
                <li>
                  <span className="label">Email</span>
                  <a href={`mailto:${p.email}`}>{p.email}</a>
                </li>
                <li>
                  <span className="label">Phone</span>
                  <a href={`tel:${p.phone.replace(/-/g, '')}`}>{p.phone}</a>
                </li>
                <li>
                  <span className="label">Location</span>
                  <span>{p.location}</span>
                </li>
                <li>
                  <span className="label">GitHub</span>
                  <a href={p.github} target="_blank" rel="noopener noreferrer">
                    {p.github.replace('https://', '')}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
