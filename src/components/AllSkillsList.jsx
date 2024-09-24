import React, { useState, useEffect } from "react";
import "../styles/AllSkillsList.css";
import skillsData from "../Data/Skills.json";

function AllSkillsList() {
  const [skills, setSkills] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Set the skills from the imported JSON file
    setSkills(skillsData);
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredSkills = skills.filter((skill) =>
    skill.name.toLowerCase().includes(searchTerm),
  );

  return (
    <div className="all-skills-container">
      <h2>All My Skills</h2>
      <p>
        Browse through all my skills and explore the associated projects. You
        can search for specific skills below:
      </p>

      <input
        type="text"
        placeholder="Search for a skill..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="search-bar"
      />

      <div className="skills-list">
        {filteredSkills.length > 0 ? (
          filteredSkills.map((skill, index) => (
            <a key={index} href={skill.link} className="skill-bubble">
              {skill.name}
            </a>
          ))
        ) : (
          <p>No skills match your search.</p>
        )}
      </div>
    </div>
  );
}

export default AllSkillsList;
