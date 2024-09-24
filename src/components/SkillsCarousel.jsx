import React, { useState, useEffect, useCallback } from "react";
import "../styles/SkillsCarousel.css";
import skillsData from "../Data/SkillsShowcase.json";

function SkillsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const skills = skillsData;

  const handleNext = useCallback(() => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % skills.length);
      setIsAnimating(false); // Reset animation state after changing the skill
    }, 500); // Animation duration is 500ms
  }, [skills.length]);

  const handlePrev = useCallback(() => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex(
        (prevIndex) => (prevIndex - 1 + skills.length) % skills.length,
      );
      setIsAnimating(false); // Reset animation state after changing the skill
    }, 500);
  }, [skills.length]);

  const handleIndicatorClick = (index) => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setIsAnimating(false); // Reset animation state
    }, 500);
  };

  // Auto-scroll every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 3000); // Change every 3 seconds
    return () => clearInterval(interval); // Cleanup on component unmount
  }, [handleNext]);

  return (
    <div className="carousel">
      <div className={`carousel-content ${isAnimating ? "fade" : ""}`}>
        <h2>{skills[currentIndex].name}</h2>
        <p className="carousel-text-content">
          {skills[currentIndex].description}
        </p>
        <div className="image-link-container">
          <div className="showcase-bubble">
            <img
              src={skills[currentIndex].image}
              alt={skills[currentIndex].name}
              className="skill-image"
            />
          </div>
          <a href={skills[currentIndex].link} className="project-link">
            View Project
          </a>
        </div>
      </div>
      <button onClick={handlePrev} className="carousel-button prev">
        ❮
      </button>
      <button onClick={handleNext} className="carousel-button next">
        ❯
      </button>
      <div className="carousel-indicators">
        {skills.map((_, index) => (
          <span
            key={index}
            className={currentIndex === index ? "active" : ""}
            onClick={() => handleIndicatorClick(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default SkillsCarousel;
