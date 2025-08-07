import React from 'react';

const QuickActionsSection = () => (
  <section className="quick-actions-section">
    <h2>Quick Actions</h2>
    <div className="quick-actions-grid">
      <div className="action-card">
        <div className="action-icon">
          <i className="fas fa-passport"></i>
        </div>
        <h3>Passport Renewal</h3>
        <p>Renew your passport online</p>
        <button className="btn-action">Start Process</button>
      </div>
      <div className="action-card">
        <div className="action-icon">
          <i className="fas fa-vote-yea"></i>
        </div>
        <h3>Overseas Voting</h3>
        <p>Register for overseas voting</p>
        <button className="btn-action">Register Now</button>
      </div>
      <div className="action-card">
        <div className="action-icon">
          <i className="fas fa-briefcase"></i>
        </div>
        <h3>Employment Change</h3>
        <p>Update employment information</p>
        <button className="btn-action">Update Info</button>
      </div>
      <div className="action-card">
        <div className="action-icon">
          <i className="fas fa-certificate"></i>
        </div>
        <h3>Civil Registry</h3>
        <p>Request civil registry documents</p>
        <button className="btn-action">Request</button>
      </div>
    </div>
  </section>
);

export default QuickActionsSection;