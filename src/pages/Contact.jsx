import React, { useRef } from "react";
import "../styles/Contact.css";
import P5Background from "../components/P5Background";
import contactInfo from "../components/config";

function Contact() {
  const contactContentRef = useRef(null);

  return (
    <div ref={contactContentRef} className="contact-container">
      <P5Background effectType="flow" />
      <div className="contact-content">
        <div className="contact-header">
          <h1>Contacts</h1>
          <p>Have a project in mind? Let's talk about it.</p>
        </div>
        
        <div className="contact-grid">
          <div className="contact-info-section">
            <h3>Get In Touch</h3>
            <div className="contact-item">
              <span className="contact-label">Email:</span>
              <a href={`mailto:${contactInfo.email}`} className="contact-link">
                {contactInfo.email}
              </a>
            </div>
          </div>
          
          <div className="social-links-section">
            <h3>Socials</h3>
            <div className="social-buttons">
              <a
                href={contactInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="social-button"
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
                className="social-button"
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
          </div>
          
          <div className="resume-section">
            <h3>Resume</h3>
            <div className="cta-section">
              <a href="/Kane_Jeffery_Resume.pdf" download className="resume-btn">
                Download Resume
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
