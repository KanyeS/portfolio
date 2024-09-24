import React, { useState, useEffect, useRef } from "react";
import "../styles/Projects.css";
import finishedProjectsData from "../Data/finishedProjects.json";
import inProgressProjectsData from "../Data/inProgressProjects.json";
import { useLocation, useNavigate } from "react-router-dom";
import VantaBackground from "../components/VantaBackgrounds";

function Projects() {
  const [searchTerm, setSearchTerm] = useState("");
  const [highlightedProject, setHighlightedProject] = useState(null);
  const [showInProgress, setShowInProgress] = useState(true);
  const projectsWrapperRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const hash = location.hash.replace("#", "");

  const finishedProjects = finishedProjectsData.map((project) => ({
    ...project,
    image: `${process.env.PUBLIC_URL}${project.image}`,
  }));

  const inProgressProjects = inProgressProjectsData.map((project) => ({
    ...project,
    image: `${process.env.PUBLIC_URL}${project.image}`,
  }));

  const filterProjects = (projects) => {
    if (searchTerm.trim() === "") {
      return projects;
    }
    return projects.filter((project) =>
      project.skills.some((skill) =>
        skill.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    );
  };

  const filteredInProgressProjects = filterProjects(inProgressProjects);
  const filteredFinishedProjects = filterProjects(finishedProjects);

  const displayedProjects = showInProgress
    ? filteredInProgressProjects
    : filteredFinishedProjects;

  // Update the highlighted project based on the URL hash
  useEffect(() => {
    if (hash) {
      const projectInProgress = inProgressProjects.find(
        (project) => project.title.replace(/\s+/g, "-") === hash,
      );
      const projectFinished = finishedProjects.find(
        (project) => project.title.replace(/\s+/g, "-") === hash,
      );

      if (projectInProgress) {
        setShowInProgress(true);
        setHighlightedProject(hash);
      } else if (projectFinished) {
        setShowInProgress(false);
        setHighlightedProject(hash);
      }
    }
  }, [hash, inProgressProjects, finishedProjects, searchTerm]);

  return (
    <div className="Projects-wrapper" ref={projectsWrapperRef}>
      <VantaBackground
        projectsWrapperRef={projectsWrapperRef}
        effectType="globe"
      />
      <div className="Projects-content">
        <h2>My Projects</h2>
        <div className="toggle-buttons">
          <button
            onClick={() => {
              setShowInProgress(true);
              setHighlightedProject(null);
              navigate({ hash: "" });
            }}
            className={showInProgress ? "active" : ""}
          >
            In Progress Projects
          </button>
          <button
            onClick={() => {
              setShowInProgress(false);
              setHighlightedProject(null);
              navigate({ hash: "" });
            }}
            className={!showInProgress ? "active" : ""}
          >
            Finished Projects
          </button>
        </div>

        <input
          type="text"
          placeholder="Search by skill..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input large-search"
        />

        {displayedProjects.length > 0 ? (
          displayedProjects.map((project) => (
            <div
              key={project.id}
              className={`Project-card ${
                highlightedProject === project.title.replace(/\s+/g, "-")
                  ? "highlight"
                  : ""
              }`}
              id={project.title.replace(/\s+/g, "-")}
            >
              <h2>{project.title}</h2>
              <p>{project.description}</p>
              <div className="center-content">
                <img
                  src={project.image}
                  alt={`${project.title} Gameplay`}
                  className="project-gif"
                />
                <div className="links">
                  {project.links.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
              <div className="skill-bubbles">
                {project.skills.map((skill, index) => (
                  <div key={index} className="bubble">
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p>No projects found for the searched skill.</p>
        )}
      </div>
    </div>
  );
}

export default Projects;
