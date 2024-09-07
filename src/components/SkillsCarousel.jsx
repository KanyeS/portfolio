import React, { useState, useEffect } from 'react';
import '../styles/SkillsCarousel.css';

const skills = [
  'JavaScript',
  'React',
  'Node.js',
  'CSS',
  'HTML',
  'Python',
  'Django',
  'Docker',
  'Git',
  'AWS',
];

function SkillsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Auto-scroll every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 3000); // Change every 3 seconds
    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  const handleNext = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % skills.length);
    }
  };

  const handlePrev = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex((prevIndex) => (prevIndex - 1 + skills.length) % skills.length);
    }
  };

  const handleIndicatorClick = (index) => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex(index);
    }
  };

  return (
    <div className="carousel">
      <div className={`carousel-content ${isAnimating ? 'fade' : ''}`} onAnimationEnd={() => setIsAnimating(false)}>
        <h2>{skills[currentIndex]}</h2>
      </div>

      {/* Navigation buttons */}
      <button onClick={handlePrev} className="carousel-button prev">❮</button>
      <button onClick={handleNext} className="carousel-button next">❯</button>

      {/* Indicators */}
      <div className="carousel-indicators">
        {skills.map((_, index) => (
          <span
            key={index}
            className={currentIndex === index ? 'active' : ''}
            onClick={() => handleIndicatorClick(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default SkillsCarousel;
