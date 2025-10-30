import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

function P5Background({ effectType }) {
  const canvasRef = useRef(null);
  const p5InstanceRef = useRef(null);
  const isInitializedRef = useRef(false);
  
  // Initialize isDarkMode with the correct theme immediately
  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    const dataTheme = document.documentElement.getAttribute('data-theme');
    if (dataTheme) {
      return dataTheme === 'dark';
    }
    // Fall back to system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  };
  
  const [isDarkMode, setIsDarkMode] = useState(getInitialTheme);

  // Detect theme changes from CSS variables
  useEffect(() => {
    const detectTheme = () => {
      // Check localStorage first, then fall back to data-theme attribute
      const savedTheme = localStorage.getItem('theme');
      const dataTheme = document.documentElement.getAttribute('data-theme');
      
      if (savedTheme) {
        setIsDarkMode(savedTheme === 'dark');
        // Ensure data-theme attribute is set if it's not already
        if (!dataTheme) {
          document.documentElement.setAttribute('data-theme', savedTheme);
        }
      } else if (dataTheme) {
        setIsDarkMode(dataTheme === 'dark');
      } else {
        // Fall back to system preference
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        setIsDarkMode(mediaQuery.matches);
      }
    };

    // Initial detection
    detectTheme();

    // Watch for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
          detectTheme();
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Clean up existing instance when theme changes
    if (p5InstanceRef.current) {
      p5InstanceRef.current.remove();
      p5InstanceRef.current = null;
      isInitializedRef.current = false;
    }
    
    // Capture the ref value to use in cleanup
    const currentCanvasRef = canvasRef.current;
    
    const loadP5AndInit = async () => {
      // Clean up any existing p5 instances and canvases first
      if (p5InstanceRef.current) {
        p5InstanceRef.current.remove();
        p5InstanceRef.current = null;
      }
      
      // Remove any existing canvases in the entire document
      const allCanvases = document.querySelectorAll('canvas.p5Canvas');
      allCanvases.forEach(canvas => canvas.remove());
      
      // Remove any existing canvases in our container
      if (canvasRef.current) {
        const existingCanvases = canvasRef.current.querySelectorAll('canvas');
        existingCanvases.forEach(canvas => canvas.remove());
      }

      // Check if p5.js script already exists in the DOM
      const existingScript = document.querySelector('script[src*="p5.min.js"]');
      
      // Load p5.js if not already loaded
      if (!window.p5 && !existingScript) {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.2/p5.min.js';
        script.async = true;
        document.body.appendChild(script);
        
        await new Promise((resolve) => {
          script.onload = resolve;
        });
      } else if (existingScript && !window.p5) {
        // Wait for existing script to load
        await new Promise((resolve) => {
          const checkP5 = () => {
            if (window.p5) {
              resolve();
            } else {
              setTimeout(checkP5, 50);
            }
          };
          checkP5();
        });
      }

      // Wait a bit for p5 to be ready
      await new Promise(resolve => setTimeout(resolve, 100));

      if (effectType === "dust") {
        console.log('Loading dust effect...');
        // Simple dust effect
        const sketch = (p) => {
          let particles = [];

          p.setup = () => {
            // Get container dimensions
            const container = canvasRef.current;
            const containerWidth = container ? container.clientWidth : window.innerWidth;
            const containerHeight = container ? container.clientHeight : window.innerHeight;
        
            
            let canvas = p.createCanvas(containerWidth, containerHeight);
            canvas.parent(canvasRef.current);
            canvas.style('position', 'absolute');
            canvas.style('top', '0');
            canvas.style('left', '0');
            canvas.style('z-index', '-1');
            canvas.style('width', '100%');
            canvas.style('height', '100%');
            p.background(isDarkMode ? 20 : 255); // Dark gray or white background
            
            // Create simple particle objects
            for (let i = 0; i < 150; i++) {
              particles.push({
                x: p.random(p.width),
                y: p.random(p.height),
                vx: p.random(-0.5, 0.5),
                vy: p.random(-0.5, 0.5),
                size: p.random(3, 8),
                opacity: p.random(150, 255)
              });
            }
            
            console.log('P5 dust setup complete - particles created:', particles.length);
          };

          p.draw = () => {
            p.background(isDarkMode ? 20 : 255, 30); // Dynamic background with fade
            
            p.noStroke();
            
            
            for (let particle of particles) {
              // Add some turbulent movement
              let angle = p.noise(particle.x * 0.008, particle.y * 0.008, p.frameCount * 0.005) * p.TWO_PI * 2;
              particle.vx += Math.cos(angle) * 0.05;
              particle.vy += Math.sin(angle) * 0.05;
              
              // Limit velocity
              particle.vx = p.constrain(particle.vx, -1, 1);
              particle.vy = p.constrain(particle.vy, -1, 1);
              
              // Update position
              particle.x += particle.vx;
              particle.y += particle.vy;
              
              // Wrap edges
              if (particle.x > p.width) particle.x = 0;
              if (particle.x < 0) particle.x = p.width;
              if (particle.y > p.height) particle.y = 0;
              if (particle.y < 0) particle.y = p.height;
              
              // Dynamic particle color based on dark mode
              if (isDarkMode) {
                p.fill(69, 123, 157, 200); // Blue for dark mode
              } else {
                p.fill(230, 57, 70, 200); // Red for light mode
              }
              p.ellipse(particle.x, particle.y, particle.size * 2);
            }
          };

          p.windowResized = () => {
            const container = canvasRef.current;
            const containerWidth = container ? container.clientWidth : window.innerWidth;
            const containerHeight = container ? container.clientHeight : window.innerHeight;
            p.resizeCanvas(containerWidth, containerHeight);
          };
        };

        // Create p5 instance
        if (canvasRef.current && !p5InstanceRef.current) {
          p5InstanceRef.current = new window.p5(sketch, canvasRef.current);
          isInitializedRef.current = true;
        }
      } else if (effectType === "flow") {
        // Flowing wave effect
        const sketch = (p) => {
          let noiseScale = 0.02;
          let zoff = 0;

          p.setup = () => {
            // Get container dimensions
            const container = canvasRef.current;
            const containerWidth = container ? container.clientWidth : window.innerWidth;
            const containerHeight = container ? container.clientHeight : window.innerHeight;
            
            let canvas = p.createCanvas(containerWidth, containerHeight);
            canvas.parent(canvasRef.current);
            canvas.style('position', 'absolute');
            canvas.style('top', '0');
            canvas.style('left', '0');
            canvas.style('z-index', '-1');
            canvas.style('width', '100%');
            canvas.style('height', '100%');
            p.noStroke();
            p.frameRate(60);
          };

          p.draw = () => {
            p.background(isDarkMode ? 20 : 255); // Dynamic background

            // Draw smooth flowing shapes
            if (isDarkMode) {
              p.fill(255, 15); // Light shapes on dark background
            } else {
              p.fill(0, 15); // Dark shapes on light background
            }
            p.beginShape();
            let xoff = 0;
            for (let x = 0; x <= p.width; x += 10) {
              let y = p.map(p.noise(xoff, zoff), 0, 1, p.height / 2 - 100, p.height / 2 + 100);
              p.vertex(x, y);
              xoff += noiseScale;
            }
            p.vertex(p.width, p.height);
            p.vertex(0, p.height);
            p.endShape(p.CLOSE);

            zoff += 0.01; // animate over time
          };

          p.windowResized = () => {
            const container = canvasRef.current;
            const containerWidth = container ? container.clientWidth : window.innerWidth;
            const containerHeight = container ? container.clientHeight : window.innerHeight;
            p.resizeCanvas(containerWidth, containerHeight);
          };
        };

        // Create p5 instance
        if (canvasRef.current && !p5InstanceRef.current) {
          p5InstanceRef.current = new window.p5(sketch, canvasRef.current);
          isInitializedRef.current = true;
        }
      } else if (effectType === "circles") {
        // Floating circles effect for projects page
        const sketch = (p) => {
          let circles = [];

          p.setup = () => {
            // Get container dimensions
            const container = canvasRef.current;
            const containerWidth = container ? container.clientWidth : window.innerWidth;
            const containerHeight = container ? container.clientHeight : window.innerHeight;
            
            let canvas = p.createCanvas(containerWidth, containerHeight);
            canvas.parent(canvasRef.current);
            canvas.style('position', 'absolute');
            canvas.style('top', '0');
            canvas.style('left', '0');
            canvas.style('z-index', '-1');
            canvas.style('width', '100%');
            canvas.style('height', '100%');
            
            // Create circles
            for (let i = 0; i < 5; i++) {
              circles.push({
                x: p.random(p.width),
                y: p.random(p.height),
                size: p.random(50, 150),
                speed: p.random(0.2, 0.5),
                direction: p.random(p.TWO_PI)
              });
            }
            p.noStroke();
          };

          p.draw = () => {
            p.background(isDarkMode ? 20 : 255); // Dynamic background

            for (let c of circles) {
              // subtle oscillating motion
              c.x += p.cos(c.direction) * c.speed;
              c.y += p.sin(c.direction) * c.speed;

              // wrap around screen
              if (c.x > p.width) c.x = 0;
              if (c.x < 0) c.x = p.width;
              if (c.y > p.height) c.y = 0;
              if (c.y < 0) c.y = p.height;

              // Dynamic circle colors based on dark mode
              if (isDarkMode) {
                p.fill(69, 123, 157, 50); // Blue accent for dark mode
                p.ellipse(c.x, c.y, c.size);
                p.fill(200, 200, 200, 30); // Light gray accent
                p.ellipse(c.x, c.y, c.size * 0.7);
              } else {
                p.fill(230, 57, 70, 50); // Red accent for light mode
                p.ellipse(c.x, c.y, c.size);
                p.fill(168, 168, 168, 30); // Gray accent
                p.ellipse(c.x, c.y, c.size * 0.7);
              }
            }
          };

          p.windowResized = () => {
            const container = canvasRef.current;
            const containerWidth = container ? container.clientWidth : window.innerWidth;
            const containerHeight = container ? container.clientHeight : window.innerHeight;
            p.resizeCanvas(containerWidth, containerHeight);
          };
        };

        // Create p5 instance
        if (canvasRef.current && !p5InstanceRef.current) {
          p5InstanceRef.current = new window.p5(sketch, canvasRef.current);
          isInitializedRef.current = true;
        }
      } else {
        // Other effects (simplified)
        const sketch = (p) => {
          p.setup = () => {
            let canvas = p.createCanvas(p.windowWidth, p.windowHeight);
            canvas.parent(canvasRef.current);
            canvas.style('position', 'absolute');
            canvas.style('top', '0');
            canvas.style('left', '0');
            canvas.style('z-index', '-1');
          };

          p.draw = () => {
            p.background(0, 20);
            p.fill(97, 218, 251, 100);
            p.noStroke();
            
            for (let i = 0; i < 30; i++) {
              let x = p.sin(p.frameCount * 0.01 + i) * 200 + p.width / 2;
              let y = p.cos(p.frameCount * 0.005 + i * 0.5) * 150 + p.height / 2;
              p.ellipse(x, y, 4);
            }
          };

          p.windowResized = () => {
            p.resizeCanvas(p.windowWidth, p.windowHeight);
          };
        };

        if (canvasRef.current && !p5InstanceRef.current) {
          p5InstanceRef.current = new window.p5(sketch, canvasRef.current);
          isInitializedRef.current = true;
        }
      }
    };

    loadP5AndInit();

    // Cleanup
    return () => {
      isInitializedRef.current = false;
      if (p5InstanceRef.current) {
        p5InstanceRef.current.remove();
        p5InstanceRef.current = null;
      }
      
      // Remove any remaining canvases from our container
      if (currentCanvasRef) {
        const canvases = currentCanvasRef.querySelectorAll('canvas');
        canvases.forEach(canvas => canvas.remove());
      }
      
      // Clean up any p5 canvases in the document
      const allCanvases = document.querySelectorAll('canvas.p5Canvas');
      allCanvases.forEach(canvas => canvas.remove());
    };
  }, [effectType, isDarkMode]);

  return (
    <div 
      ref={canvasRef} 
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        pointerEvents: 'none'
      }}
    />
  );
}

P5Background.propTypes = {
  effectType: PropTypes.oneOf(['dust', 'flow', 'circles', 'default']).isRequired,
};

export default P5Background;
