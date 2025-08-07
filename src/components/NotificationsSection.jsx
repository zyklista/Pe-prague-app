import React from 'react';

const NotificationsSection = () => (
  <section className="notifications-section">
    <div className="section-header">
      <h2>Notifications</h2>
      <a href="#" className="view-all">Mark All Read</a>
    </div>
    <div className="notifications-list">
      <div className="notification-item unread">
        <div className="notification-icon">
          <i className="fas fa-bell"></i>
        </div>
        <div className="notification-content">
          <h3>Appointment Reminder</h3>
          <p>Your passport renewal appointment is tomorrow at 10:00 AM</p>
          <span className="notification-time">2 hours ago</span>
        </div>
        <button className="btn-small">Mark Read</button>
      </div>
      <div className="notification-item">
        <div className="notification-icon">
          <i className="fas fa-check-circle"></i>
        </div>
        <div className="notification-content">
          <h3>Document Approved</h3>
          <p>Your employment change certificate has been approved</p>
          <span className="notification-time">1 day ago</span>
        </div>
        <button className="btn-small">View</button>
      </div>
    </div>
  </section>
);

export default NotificationsSection;