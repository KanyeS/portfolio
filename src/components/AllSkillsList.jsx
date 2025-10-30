import React, { useState, useEffect } from "react";
import "../styles/AllSkillsList.css";
import skillsData from "../Data/Skills.json";

function AllSkillsList() {
  const [skills, setSkills] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Set the skills from the imported JSON file
    setSkills(skillsData);
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  // Function to filter skills across all categories
  const getFilteredSkills = () => {
    if (!searchTerm) return skills;
    
    const filtered = {};
    Object.keys(skills).forEach(category => {
      const filteredCategorySkills = skills[category].filter(skill =>
        skill.name.toLowerCase().includes(searchTerm)
      );
      if (filteredCategorySkills.length > 0) {
        filtered[category] = filteredCategorySkills;
      }
    });
    return filtered;
  };

  const filteredSkills = getFilteredSkills();
  const hasResults = Object.keys(filteredSkills).length > 0;

  return (
    <div className="all-skills-container">
      <h2>All My Skills</h2>
      <p>
        Browse through all my skills organised by category. You can search for specific skills below:
      </p>

      <input
        type="text"
        placeholder="Search for a skill..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="search-bar"
      />

      <div className="skills-categories">
        {hasResults ? (
          Object.keys(filteredSkills).map((category, categoryIndex) => (
            <div key={categoryIndex} className="skill-category">
              <h3 className="category-title">{category}</h3>
              <div className="skills-list">
                {filteredSkills[category].map((skill, skillIndex) => (
                  <a key={skillIndex} href={skill.link} className="skill-bubble">
                    {skill.name}
                  </a>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className="no-results">No skills match your search.</p>
        )}
      </div>
    </div>
  );
}

export default AllSkillsList;
