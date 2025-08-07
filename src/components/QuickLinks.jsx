import React, { useState } from 'react';

const quickLinks = [
  { label: 'My Profile', icon: 'fa-user', action: 'profile' },
  { label: 'Appointments', icon: 'fa-calendar-check', action: 'appointments' },
  { label: 'E-Services', icon: 'fa-laptop', action: 'eservices' },
  { label: 'Government Services', icon: 'fa-landmark', action: 'gov' },
];

const govLinks = [
  { label: 'SSS', url: 'https://www.sss.gov.ph/' },
  { label: 'PhilHealth', url: 'https://www.philhealth.gov.ph/' },
  { label: 'Pag-IBIG', url: 'https://www.pagibigfundservices.com/virtualpagibig/' },
];

const QuickLinks = () => {
  const [modal, setModal] = useState(null);

  const handleClick = (action) => {
    if (action === 'eservices') {
      window.open('https://onlineservices.dmw.gov.ph/OnlineServices/POEAOnline.aspx?ReturnUrl=%2fOnlineServices%2fBMOnline%2fBMProcessing.aspx', '_blank');
    } else {
      setModal(action);
    }
  };

  const closeModal = () => setModal(null);

  return (
    <section className="quick-links-section">
      <div className="quick-links-row">
        {quickLinks.map((link) => (
          <div
            className="quick-link-card"
            key={link.label}
            tabIndex={0}
            role="button"
            onClick={() => handleClick(link.action)}
            onKeyDown={e => (e.key === 'Enter' ? handleClick(link.action) : null)}
          >
            <i className={`fas ${link.icon}`}></i>
            <span>{link.label}</span>
          </div>
        ))}
      </div>
      {/* Modals */}
      {modal === 'profile' && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h2>My Profile</h2>
            <p>Profile details and settings will appear here.</p>
            <button className="modal-close-btn" onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
      {modal === 'appointments' && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h2>Appointments</h2>
            <p>Your appointments and scheduling options will appear here.</p>
            <button className="modal-close-btn" onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
      {modal === 'gov' && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h2>Government Services</h2>
            <ul className="gov-links-list">
              {govLinks.map(link => (
                <li key={link.label}>
                  <a href={link.url} target="_blank" rel="noopener noreferrer">{link.label}</a>
                </li>
              ))}
            </ul>
            <button className="modal-close-btn" onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </section>
  );
};

export default QuickLinks;