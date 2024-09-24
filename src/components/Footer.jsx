import React from "react";
import "../styles/Footer.css";
import contactInfo from "../components/config";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="contact-info">
          <p>
            Contact me:{" "}
            <p>
              {" "}
              Email:{" "}
              <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
            </p>
            Phone:{" "}
            <a href={`tel:${contactInfo.phonenumber}`}>
              {contactInfo.phonenumber}
            </a>
          </p>
        </div>
        <div className="social-links">
          <a
            href={contactInfo.github}
            target="_blank"
            rel="noopener noreferrer"
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
          <p>
            &copy; {new Date().getFullYear()} Kane's Portfolio. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
