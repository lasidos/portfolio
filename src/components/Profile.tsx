import { profile } from '../data';
import './Profile.css';

export function Profile() {
  return (
    <section className="profile-section" id="profile">
      <div className="container">
        <h2 className="section-title black">PROFILE</h2>
        <div className="profile-box">
          <div className="profile-avatar">
            <div className="avatar-placeholder">
              <span className="avatar-initial">{profile.name[0]}</span>
            </div>
          </div>
          <div className="profile-info">
            <div className="profile-name">
              <span>{profile.name}</span>
              <span className="name-en">{profile.nameEn}</span>
            </div>
            <p className="profile-role">{profile.role}</p>
            <ul className="profile-list">
              <li>
                <span className="label">Email</span>
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
              </li>
              <li>
                <span className="label">Phone</span>
                <a href={`tel:${profile.phone.replace(/-/g, '')}`}>{profile.phone}</a>
              </li>
              <li>
                <span className="label">Location</span>
                <span>{profile.location}</span>
              </li>
              <li>
                <span className="label">GitHub</span>
                <a href={profile.github} target="_blank" rel="noopener noreferrer">
                  {profile.github.replace('https://', '')}
                </a>
              </li>
              <li>
                <span className="label">Portfolio</span>
                <a href={profile.portfolioRepo} target="_blank" rel="noopener noreferrer">
                  DataCrawling_Web
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
