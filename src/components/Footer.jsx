import React from "react";
import "../styles/Footer.css";
import contactInfo from "../components/config";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="contact-info">
          <h3>Get In Touch</h3>
          <p>
            Email: <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
          </p>
        </div>
        
        <div className="social-links">
          <h3>Contacts</h3>
          <a
            href={contactInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit my GitHub profile"
          >
            <img
              src="/assets/github-mark-white.png"
              alt="GitHub"
              className="social-logo"
            />
            GitHub
          </a>
          <a
            href={contactInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit my LinkedIn profile"
          >
            <img
              src="/assets/LI-In-Bug.png"
              alt="LinkedIn"
              className="social-logo"
            />
            LinkedIn
          </a>
        </div>
        
        <div className="copyright">
          <h3>Portfolio</h3>
          <p>
            &copy; {new Date().getFullYear()} Kane's Portfolio
          </p>
          <p>All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
