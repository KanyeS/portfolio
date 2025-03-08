import React, { useEffect, useRef, useCallback } from "react";
import PropTypes from "prop-types";

function VantaBackground({ projectsWrapperRef, effectType }) {
  const vantaRef = useRef(null);
  const vantaEffectRef = useRef(null);

  // 🛠️ Function to dynamically load THREE.js and Vanta.js
  const initVantaEffect = useCallback(async () => {
    if (vantaRef.current) {
      if (vantaEffectRef.current) {
        vantaEffectRef.current.destroy();
      }

      try {
        // 🔹 Dynamically import three@0.124.0 and make it extensible
        if (!window.THREE) {
          const threeModule = await import(
            "https://cdn.jsdelivr.net/npm/three@0.124.0/build/three.module.min.js"
          );
          window.THREE = Object.assign({}, threeModule);
        }

        let effectModule;
        if (effectType === "birds") {
          effectModule = await import("vanta/dist/vanta.birds.min");
        } else if (effectType === "globe") {
          effectModule = await import("vanta/dist/vanta.globe.min");
        } else if (effectType === "net") {
          effectModule = await import("vanta/dist/vanta.net.min");
        }

        if (effectModule) {
          vantaEffectRef.current = effectModule.default({
            THREE: window.THREE, // ✅ Explicitly set THREE version
            el: vantaRef.current,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            ...(effectType === "birds"
              ? {
                  backgroundColor: 0x000000,
                  color1: 0x61dafb,
                  color2: 0xd1ff,
                  birdSize: 1.5,
                  wingSpan: 20.0,
                  speedLimit: 4.0,
                  separation: 60.0,
                }
              : effectType === "globe"
              ? {
                  color: 0x61dafb,
                  backgroundColor: 0x000000,
                  size: 1.2,
                  scale: 1,
                  scaleMobile: 1,
                }
              : {
                  color: 0x61dafb,
                  backgroundColor: 0x000000,
                  points: 10.0,
                  maxDistance: 20.0,
                  spacing: 15.0,
                }),
          });

          // Ensure proper visibility & resizing
          vantaRef.current.style.visibility = "visible";
          vantaRef.current.style.opacity = "1";
          vantaRef.current.style.zIndex = "1";

          vantaEffectRef.current.resize();
        }
      } catch (error) {
        console.error("[VANTA] Initialization Error:", error);
      }
    }
  }, [effectType]);

  // 🎯 Initialize Vanta Effect
  useEffect(() => {
    initVantaEffect();
    return () => {
      if (vantaEffectRef.current) {
        vantaEffectRef.current.destroy();
        vantaEffectRef.current = null;
      }
    };
  }, [initVantaEffect]);

  // 📏 Handle Resizing Dynamically
  useEffect(() => {
    if (projectsWrapperRef.current) {
      const resizeObserver = new ResizeObserver(() => {
        if (vantaEffectRef.current) {
          vantaEffectRef.current.resize();
        }
      });

      resizeObserver.observe(projectsWrapperRef.current);
      return () => resizeObserver.disconnect();
    }
  }, [projectsWrapperRef]);

  return <div className="Vanta-background" ref={vantaRef}></div>;
}

VantaBackground.propTypes = {
  projectsWrapperRef: PropTypes.object.isRequired,
  effectType: PropTypes.string.isRequired,
};

export default VantaBackground;
