import React, { useRef } from "react";
import SkillsCarousel from "../components/SkillsCarousel";
import AllSkillsList from "../components/AllSkillsList";
import VantaBackground from "../components/VantaBackgrounds";
import "../styles/Home.css";

function Home() {
  const homeContentRef = useRef(null);

  return (
    <div className="Home" ref={homeContentRef}>
      <VantaBackground projectsWrapperRef={homeContentRef} effectType="net" />
      <div className="home-content">
        <div className="section-box">
          <h1 className="fade-in">Welcome to My Portfolio!</h1>

          <p className="slide-in">
            Hi, I'm Kane, a soon-to-be graduate from QUT, completing my degree
            in 2024. Currently, I'm working as a Support Technical Analyst,
            where I’ve had the opportunity to develop hands-on experience in
            cloud infrastructure, programming, and project planning.
          </p>

          <p className="slide-in">
            I am looking to transition into a Junior Developer or Data Science
            role to further enhance my skills and gain deeper experience in
            software development. Explore my projects below, and feel free to
            connect with me as I embark on this exciting journey into
            development.
          </p>
        </div>

        <div className="carousel-wrapper fade-in-later">
          <div className="section-box">
            <SkillsCarousel />
          </div>
          <div className="section-box">
            <AllSkillsList />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
