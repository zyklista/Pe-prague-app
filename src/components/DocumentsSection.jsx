import React from 'react';

const DocumentsSection = () => (
  <section className="documents-section">
    <div className="section-header">
      <h2>Recent Documents</h2>
      <a href="#" className="view-all">View All</a>
    </div>
    <div className="documents-list">
      <div className="document-item">
        <div className="document-icon">
          <i className="fas fa-file-pdf"></i>
        </div>
        <div className="document-details">
          <h3>Passport Application Form</h3>
          <p>Submitted on March 15, 2024</p>
          <span className="status approved">Approved</span>
        </div>
        <div className="document-actions">
          <button className="btn-small"><i className="fas fa-download"></i></button>
          <button className="btn-small"><i className="fas fa-eye"></i></button>
        </div>
      </div>
      <div className="document-item">
        <div className="document-icon">
          <i className="fas fa-file-alt"></i>
        </div>
        <div className="document-details">
          <h3>Employment Change Certificate</h3>
          <p>Submitted on March 10, 2024</p>
          <span className="status processing">Processing</span>
        </div>
        <div className="document-actions">
          <button className="btn-small"><i className="fas fa-download"></i></button>
          <button className="btn-small"><i className="fas fa-eye"></i></button>
        </div>
      </div>
    </div>
  </section>
);

export default DocumentsSection;