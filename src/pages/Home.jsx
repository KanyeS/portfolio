import React from 'react';
import SkillsCarousel from '../components/SkillsCarousel';
import '../styles/Home.css'; 

function Home() {
  return (
    <div className="Home">
      <div className="home-content">
        <h1 className="fade-in">Welcome to My Portfolio!</h1>
        <p className="slide-in">
          Hi, I'm Kane, a passionate developer with expertise in React, Node.js,
          and Machine Learning. Explore my projects and connect with me!
        </p>
        {/* Skills carousel with a slight delay in animation */}
        <div className="carousel-wrapper fade-in-later">
          <SkillsCarousel />
        </div>
      </div>
    </div>
  );
}

export default Home;
