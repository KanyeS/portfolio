import React, { useEffect, useRef } from "react";
import Masonry from "masonry-layout";
import imagesLoaded from "imagesloaded";
import "../styles/SkillsMasonry.css";
import skillsData from "../Data/SkillsShowcase.json";

function SkillsMasonry() {
  const masonryRef = useRef(null);
  const masonryInstance = useRef(null);

  useEffect(() => {
    if (masonryRef.current) {
      masonryInstance.current = new Masonry(masonryRef.current, {
        itemSelector: ".skill-masonry-item",
        columnWidth: ".skill-masonry-item",
        percentPosition: true,
        gutter: 20,
      });

      imagesLoaded(masonryRef.current, () => {
        masonryInstance.current.layout();
      });
    }
  }, []);

  return (
    <div className="skills-masonry" ref={masonryRef}>
      {skillsData.map((skill, idx) => (
        <div className="skill-masonry-item" key={idx}>
          <div className="skill-masonry-image-container">
            <img
              src={skill.image}
              alt={skill.name}
              className="skill-masonry-image"
            />
          </div>
          <div className="skill-masonry-title">{skill.name}</div>
          <div className="skill-masonry-desc">{skill.description}</div>
          <a
            href={skill.link}
            className="skill-masonry-link"
          >
            View Project
          </a>
        </div>
      ))}
    </div>
  );
}

export default SkillsMasonry;
