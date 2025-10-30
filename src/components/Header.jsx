import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import "../styles/Header.css";

function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    if (savedTheme) {
      // Use saved preference
      setIsDarkMode(savedTheme === 'dark');
    } else {
      // Use system preference
      setIsDarkMode(mediaQuery.matches);
    }

    const handleChange = (e) => {
      // Only auto-switch if user hasn't manually set a preference
      if (!localStorage.getItem('theme')) {
        setIsDarkMode(e.matches);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Apply dark mode to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    // Save preference to localStorage
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
  };

  return (
    <header className="Header">
      <div className="logo">
        <h1>Kane's Portfolio</h1>
      </div>
      <nav>
        <ul>
          <li>
            <button 
              className="dark-mode-toggle" 
              onClick={toggleDarkMode}
              aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
            >
              <FontAwesomeIcon 
                icon={isDarkMode ? faSun : faMoon} 
                className="theme-icon"
              />
            </button>
          </li>
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
    </header>
  );
}

export default Header;
