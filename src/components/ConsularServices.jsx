import React from 'react';

const services = [
  { label: 'Passport Renewal', icon: 'fa-passport' },
  { label: 'Overseas Voting', icon: 'fa-vote-yea' },
  { label: 'Change of Employment', icon: 'fa-briefcase' },
  { label: 'Civil Registry', icon: 'fa-certificate' },
];

const ConsularServices = () => (
  <section className="consular-services-section">
    <h3>Consular Services</h3>
    <div className="consular-list">
      {services.map((service) => (
        <div className="consular-list-item" key={service.label} tabIndex={0} role="button">
          <i className={`fas ${service.icon}`}></i>
          <span>{service.label}</span>
          <i className="fas fa-chevron-right"></i>
        </div>
      ))}
    </div>
  </section>
);

export default ConsularServices;