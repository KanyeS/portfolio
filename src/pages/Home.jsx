import { useRef } from "react";
import SkillsCarousel from "../components/SkillsMasonary";
import AllSkillsList from "../components/AllSkillsList";
import P5Background from "../components/P5Background";
import "../styles/Home.css";

function Home() {
  const homeContentRef = useRef(null);

  return (
    <div className="Home" ref={homeContentRef}>
      <P5Background effectType="dust" />
      <div className="home-content">
        <div className="section-box">
          <h1 className="fade-in">Welcome to My Portfolio!</h1>

          <p className="slide-in">
            Hi, I'm Kane, a Queensland University of Technology graduate with a passion for technology and problem-solving. 
            Currently, I'm working as a Client Support Specialist, where I handle data management 
            and develop custom integrations and designs with code for customers. This role has 
            given me experience in translating client needs into reality.
          </p>

          <p className="slide-in">
            I specialise in creating custom integrations, managing complex data workflows, 
            and developing solutions that bridge the gap between business requirements 
            and technical implementation. My experience spans small scale fullstack development, database 
            management, Quality Assurance, and cloud infrastructure, allowing me to deliver solutions 
            for client needs.
          </p>

          <p className="slide-in">
            For recruiters and hiring managers: Download my resume below for detailed information about my professional background, technical skills, and project experience.
          </p>

          <div className="cta">
            <a href="/Kane_Jeffery_Resume.pdf" download className="btn">
               Download Resume
              </a>
      </div>
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
