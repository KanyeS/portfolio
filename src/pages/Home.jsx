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
            given me extensive experience in translating client needs into technical solutions 
            and building robust, scalable systems.
          </p>

          <p className="slide-in">
            I specialize in creating custom integrations, managing complex data workflows, 
            and developing tailored solutions that bridge the gap between business requirements 
            and technical implementation. My experience spans full-stack development, database 
            management, and cloud infrastructure, allowing me to deliver comprehensive solutions 
            for diverse client needs.
          </p>

          <p className="slide-in">
            Want to learn more about my professional background, technical skills, and project experience? 
            Download my resume below to get a comprehensive overview of my qualifications, 
            achievements, and the value I can bring to your team.
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
