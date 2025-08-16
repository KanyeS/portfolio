import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";

function P5Background({ effectType }) {
  const canvasRef = useRef(null);
  const p5InstanceRef = useRef(null);
  const isInitializedRef = useRef(false);

  useEffect(() => {
    // Prevent multiple initializations
    if (isInitializedRef.current) {
      return;
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
            p.background(255); // White background (#FFFFFF)
            
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
            p.background(255, 30); // White background with slight fade for trails
            
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
              
              // Draw particle with bright red color (#E63946) - make more visible
              p.fill(230, 57, 70, 200); // Increased opacity for better visibility
              p.ellipse(particle.x, particle.y, particle.size * 2); // Doubled size for visibility
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
            p.background(255); // white background

            // Draw smooth flowing shapes
            p.fill(0, 15); // black with low alpha for smooth blending
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
            p.background('#FFFFFF'); // White background

            for (let c of circles) {
              // subtle oscillating motion
              c.x += p.cos(c.direction) * c.speed;
              c.y += p.sin(c.direction) * c.speed;

              // wrap around screen
              if (c.x > p.width) c.x = 0;
              if (c.x < 0) c.x = p.width;
              if (c.y > p.height) c.y = 0;
              if (c.y < 0) c.y = p.height;

              // soft, translucent circle accents
              p.fill(230, 57, 70, 50); // bright red with low opacity
              p.ellipse(c.x, c.y, c.size);

              p.fill(168, 168, 168, 30); // cool gray subtle accent
              p.ellipse(c.x, c.y, c.size * 0.7);
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
  }, [effectType]);

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
  effectType: PropTypes.oneOf(['dust', 'particles', 'waves', 'geometric', 'flow', 'default']).isRequired,
};

export default P5Background;
