import React from 'react';
import '../styles/Footer.css'; 

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="contact-info">
          <p>Contact me: <a href="mailto:reillyj12345@gmail.com">reillyj12345@gmail.com</a></p>
        </div>
        <div className="social-links">
          <a href="https://github.com/KanyeS" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/kane-jeffery-35a55720b/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
        <div className="copyright">
          <p>&copy; {new Date().getFullYear()} Kane's Portfolio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
