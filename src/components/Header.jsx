import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

function Header() {
  return (
    <header className="Header">
      <div className="logo">
        <h1>Kane's Portfolio</h1>
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/projects">Projects</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
      <div className="cta">
        <a href="/resume.pdf" download className="btn">Download Resume</a>
      </div>
    </header>
  );
}

export default Header;
