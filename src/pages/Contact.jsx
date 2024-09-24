import React, { useRef } from "react";
import "../styles/Contact.css";
import VantaBackground from "../components/VantaBackgrounds";
import contactInfo from "../components/config";

function Contact() {
  const ContentContentRef = useRef(null);

  return (
    <div ref={ContentContentRef} className="contact-container">
      <VantaBackground
        projectsWrapperRef={ContentContentRef}
        effectType="birds"
      />
      <div className="contact-content">
        <h2>Contact Me</h2>
        <p>
          Email: <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
        </p>
        <p>
          Phone:{" "}
          <a href={`tel:${contactInfo.phonenumber}`}>
            {contactInfo.phonenumber}
          </a>
        </p>
        <p>
          <img
            src="/assets/LI-In-Bug.png"
            alt="LinkedIn"
            className="social-logo"
          />
          <a
            href="https://www.linkedin.com/in/kane-jeffery-35a55720b/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </p>
      </div>
    </div>
  );
}

export default Contact;
