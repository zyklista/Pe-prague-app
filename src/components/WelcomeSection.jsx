import React from 'react';

const WelcomeSection = () => (
  <section className="welcome-section">
    <div className="welcome-content">
      <h1>Welcome back, John!</h1>
      <p>Here's what's happening with your services today</p>
      <div className="date-info">
        <i className="fas fa-calendar"></i>
        <span id="current-date"></span>
      </div>
    </div>
    <div className="welcome-actions">
      <button className="btn-primary">
        <i className="fas fa-plus"></i>
        New Appointment
      </button>
      <button className="btn-secondary">
        <i className="fas fa-download"></i>
        Download Documents
      </button>
    </div>
  </section>
);

export default WelcomeSection;