import React, { useEffect, useRef, useCallback } from "react";
import PropTypes from "prop-types";
import * as THREE from "three";

function VantaBackground({ projectsWrapperRef, effectType }) {
  const vantaRef = useRef(null);
  const vantaEffectRef = useRef(null);

  // Memoize initVantaEffect with useCallback
  const initVantaEffect = useCallback(async () => {
    if (vantaRef.current) {
      if (vantaEffectRef.current) {
        vantaEffectRef.current.destroy();
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
        const effectInstance = effectModule.default({
          THREE,
          el: vantaRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          ...(effectType === "birds"
            ? {
                backgroundColor: 0x0,
                color1: 0x1a73e8,
                color2: 0x61dafb,
                birdSize: 1.5,
                speedLimit: 4.0,
                separation: 60.0,
              }
            : effectType === "globe"
              ? {
                  color: 0x61dafb,
                  backgroundColor: 0x0,
                  size: 1.2,
                  scale: 1,
                  scaleMobile: 1,
                }
              : {
                  color: 0x61dafb,
                  backgroundColor: 0x0,
                  points: 10.0,
                  maxDistance: 20.0,
                  spacing: 15.0,
                }),
        });

        vantaEffectRef.current = effectInstance;

        // Set visibility and styles
        vantaRef.current.style.visibility = "visible";
        vantaRef.current.style.opacity = "1";
        vantaRef.current.style.zIndex = "1";

        // Ensure the effect resizes properly
        effectInstance.resize();
      }
    }
  }, [effectType]);

  // Initialize Vanta effect
  useEffect(() => {
    initVantaEffect();

    return () => {
      if (vantaEffectRef.current) vantaEffectRef.current.destroy();
    };
  }, [initVantaEffect]);

  // Use ResizeObserver to adjust Vanta effect on size changes
  useEffect(() => {
    if (projectsWrapperRef.current) {
      const resizeObserver = new ResizeObserver(() => {
        if (vantaEffectRef.current) {
          vantaEffectRef.current.resize();
        }
      });

      resizeObserver.observe(projectsWrapperRef.current);

      return () => {
        resizeObserver.disconnect();
      };
    }
  }, [projectsWrapperRef]);

  return <div className="Vanta-background" ref={vantaRef}></div>;
}

VantaBackground.propTypes = {
  projectsWrapperRef: PropTypes.object.isRequired,
  effectType: PropTypes.string.isRequired,
};

export default VantaBackground;
