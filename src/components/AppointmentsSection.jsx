import React from 'react';

const AppointmentsSection = () => (
  <section className="appointments-section">
    <div className="section-header">
      <h2>Recent Appointments</h2>
      <a href="#" className="view-all">View All</a>
    </div>
    <div className="appointments-list">
      <div className="appointment-item">
        <div className="appointment-icon">
          <i className="fas fa-passport"></i>
        </div>
        <div className="appointment-details">
          <h3>Passport Renewal</h3>
          <p>Tomorrow, 10:00 AM</p>
          <span className="status pending">Pending</span>
        </div>
        <div className="appointment-actions">
          <button className="btn-small">Reschedule</button>
          <button className="btn-small">Cancel</button>
        </div>
      </div>
      <div className="appointment-item">
        <div className="appointment-icon">
          <i className="fas fa-vote-yea"></i>
        </div>
        <div className="appointment-details">
          <h3>Overseas Voting Registration</h3>
          <p>Friday, 2:30 PM</p>
          <span className="status confirmed">Confirmed</span>
        </div>
        <div className="appointment-actions">
          <button className="btn-small">View Details</button>
        </div>
      </div>
    </div>
  </section>
);

export default AppointmentsSection;