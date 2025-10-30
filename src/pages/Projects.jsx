import React, { useState, useEffect, useRef } from "react";
import "../styles/Projects.css";
import projectsData from "../Data/projects.json";
import { useLocation, useNavigate } from "react-router-dom";
import P5Background from "../components/P5Background";

function Projects() {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedProject, setSelectedProject] = useState(null);
  const projectsWrapperRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const hash = location.hash.replace("#", "");

  const projects = projectsData.map((project) => ({
    ...project,
    image: project.image,
  }));

  useEffect(() => {
    if (hash) {
      const project = projects.find(
        (project) => project.title.replace(/\s+/g, "-") === hash,
      );
      if (project) {
        setSelectedProject(project);
        setActiveTab("detailed");
      }
    } else {
      // If there's no hash, reset to overview
      setSelectedProject(null);
      setActiveTab("overview");
    }
  }, [hash, projects]);

  const handleProjectSelect = (project) => {
    setSelectedProject(project);
    setActiveTab("detailed");
    navigate(`/projects#${project.title.replace(/\s+/g, "-")}`, { replace: true });
  };

  const getTechStackSummary = () => {
    const allSkills = projects.flatMap(project => project.skills);
    const skillCount = allSkills.reduce((acc, skill) => {
      acc[skill] = (acc[skill] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(skillCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10);
  };

  const getProjectStats = () => {
    if (!projects || !Array.isArray(projects)) return { totalProjects: 0, uniqueTechnologies: 0, totalLinks: 0 };

    const totalProjects = projects.length;

    const uniqueTechnologies = new Set(
      projects.flatMap(p => p.skills || [])
    ).size;

    const totalLinks = projects.reduce((sum, project) => {
      const githubLinks = (project.links || []).filter(linkObj =>
        linkObj.url?.toLowerCase().includes("github.com")
      ).length;
      return sum + githubLinks;
    }, 0);

    return { totalProjects, uniqueTechnologies, totalLinks };
  };



  const renderOverview = () => {
    const stats = getProjectStats(projects);
    const topSkills = getTechStackSummary();
    
    return (
      <div className="overview-section">
        <div className="journey-header">
          <h1>My Development Journey</h1>
          <p>
            From game development to full-stack web applications, explore the development 
            of my technical skills.
          </p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <h3>{stats.totalProjects}</h3>
            <p>Projects Completed</p>
          </div>
          <div className="stat-card">
            <h3>{stats.uniqueTechnologies}</h3>
            <p>Technologies Used</p>
          </div>
          <div className="stat-card">
            <h3>{stats.totalLinks}</h3>
            <p>Live Demos & Repos</p>
          </div>
        </div>

        <div className="tech-journey">
          <h2>Skills & Technologies Used By Project</h2>
          <div className="tech-timeline">
            {topSkills.map(([skill, count], index) => (
              <div key={skill} className="tech-item">
                <span className="tech-name">{skill}</span>
                <div className="tech-bar">
                  <div 
                    className="tech-progress" 
                    style={{ width: `${(count / projects.length) * 100}%` }}
                  ></div>
                </div>
                <span className="tech-count">{count} project{count > 1 ? 's' : ''}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="projects-preview">
          <h2>Featured Projects</h2>
          <div className="projects-grid-preview">
            {projects.map((project) => (
              <div
                key={project.id}
                className="project-preview-card"
                onClick={() => handleProjectSelect(project)}
              >
                <div className="project-image-container">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="project-preview-image"
                  />
                  <div className="project-overlay">
                    <span>View Details</span>
                  </div>
                </div>
                <h3>{project.title}</h3>
                <p className="project-brief">{project.description.substring(0, 100)}...</p>
                <div className="project-tech-preview">
                  {project.skills.slice(0, 3).map((skill, index) => (
                    <span key={index} className="tech-tag">{skill}</span>
                  ))}
                  {project.skills.length > 3 && <span className="tech-more">+{project.skills.length - 3}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderDetailedView = () => {
    if (!selectedProject) return null;

    return (
      <div className="detailed-section">
        <button 
          className="back-button"
          onClick={() => {
            setSelectedProject(null);
            setActiveTab("overview");
            navigate("/projects", { replace: true });
          }}
        >
          ← Back to Overview
        </button>

        <div className="project-detailed-card">
          <div className="project-header">
            <h1>{selectedProject.title}</h1>
            <div className="project-links">
              {selectedProject.links.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  className="project-link-btn"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className="project-content">
            <div className="project-media">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="project-detailed-image"
              />
            </div>

            <div className="project-info">
              <div className="project-description">
                <h3>About This Project</h3>
                <p>{selectedProject.description}</p>
              </div>

              <div className="project-technologies">
                <h3>Technologies & Skills</h3>
                <div className="tech-grid">
                  {selectedProject.skills.map((skill, index) => (
                    <div key={index} className="tech-bubble-detailed">
                      {skill}
                    </div>
                  ))}
                </div>
              </div>

              <div className="project-impact">
                <h3>Key Features & Learnings</h3>
                <ul>
                  {selectedProject.keyFeatures?.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="Projects-wrapper" ref={projectsWrapperRef}>
      <P5Background effectType="circles" />
      <div className="Projects-content">
        <nav className="projects-nav">
          <button 
            className={`nav-tab ${activeTab === "overview" ? "active" : ""}`}
            onClick={() => {
              setSelectedProject(null);
              setActiveTab("overview");
              navigate("/projects", { replace: true });
            }}
          >
            Journey Overview
          </button>
          <button 
            className={`nav-tab ${activeTab === "detailed" ? "active" : ""}`}
            onClick={() => setActiveTab("detailed")}
            disabled={!selectedProject}
          >
            Project Details
          </button>
        </nav>

        {activeTab === "overview" && renderOverview()}
        {activeTab === "detailed" && renderDetailedView()}
      </div>
    </div>
  );
}

export default Projects;
