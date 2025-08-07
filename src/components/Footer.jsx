import React from 'react';

const Footer = () => (
  <footer className="footer">
    <div className="footer-content">
      <div className="footer-section">
        <h3>PE PRAGUE</h3>
        <p>Your comprehensive public employment portal</p>
      </div>
      <div className="footer-section">
        <h4>Quick Links</h4>
        <ul>
          <li><a href="#">Services</a></li>
          <li><a href="#">Appointments</a></li>
          <li><a href="#">Documents</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </div>
      <div className="footer-section">
        <h4>Support</h4>
        <ul>
          <li><a href="#">Help Center</a></li>
          <li><a href="#">FAQ</a></li>
          <li><a href="#">Contact Support</a></li>
          <li><a href="#">Privacy Policy</a></li>
        </ul>
      </div>
      <div className="footer-section">
        <h4>Connect</h4>
        <div className="social-links">
          <a href="#"><i className="fab fa-facebook"></i></a>
          <a href="#"><i className="fab fa-twitter"></i></a>
          <a href="#"><i className="fab fa-instagram"></i></a>
          <a href="#"><i className="fab fa-linkedin"></i></a>
        </div>
      </div>
    </div>
    <div className="footer-bottom">
      <p>&copy; 2024 PE PRAGUE. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;