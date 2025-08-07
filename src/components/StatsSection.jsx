import React from 'react';

const StatsSection = () => (
  <section className="stats-section">
    <div className="stat-card">
      <div className="stat-icon">
        <i className="fas fa-calendar-check"></i>
      </div>
      <div className="stat-content">
        <h3>2</h3>
        <p>Upcoming Appointments</p>
      </div>
    </div>
    <div className="stat-card">
      <div className="stat-icon">
        <i className="fas fa-file-alt"></i>
      </div>
      <div className="stat-content">
        <h3>5</h3>
        <p>Pending Documents</p>
      </div>
    </div>
    <div className="stat-card">
      <div className="stat-icon">
        <i className="fas fa-clock"></i>
      </div>
      <div className="stat-content">
        <h3>3</h3>
        <p>Recent Activities</p>
      </div>
    </div>
    <div className="stat-card">
      <div className="stat-icon">
        <i className="fas fa-check-circle"></i>
      </div>
      <div className="stat-content">
        <h3>12</h3>
        <p>Completed Services</p>
      </div>
    </div>
  </section>
);

export default StatsSection;