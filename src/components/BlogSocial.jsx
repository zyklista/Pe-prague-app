import React from 'react';

const socials = [
  { icon: 'fa-facebook', url: '#' },
  { icon: 'fa-twitter', url: '#' },
  { icon: 'fa-instagram', url: '#' },
  { icon: 'fa-linkedin', url: '#' },
];

const BlogSocial = () => (
  <>
    <section className="blog-section">
      <h4>Blogs</h4>
      {/* Placeholder for blog posts */}
    </section>
    <footer className="social-footer">
      <div className="social-links">
        {socials.map((s) => (
          <a href={s.url} key={s.icon} className="social-link" target="_blank" rel="noopener noreferrer">
            <i className={`fab ${s.icon}`}></i>
          </a>
        ))}
      </div>
    </footer>
  </>
);

export default BlogSocial;