import React from 'react';
import '../styles/Projects.css';

function Projects() {
  return (
    <div className="Projects">
      <h2>My Projects</h2>
      <div className="Project-card">
        <h3>Project 1</h3>
        <p>A brief description of the project.</p>
        <a href="https://github.com/yourusername/project1" target="_blank" rel="noopener noreferrer">View on GitHub</a>
      </div>
      <div className="Project-card">
        <h3>Project 2</h3>
        <p>A brief description of the project.</p>
        <a href="https://github.com/yourusername/project2" target="_blank" rel="noopener noreferrer">View on GitHub</a>
      </div>
    </div>
  );
}

export default Projects;
