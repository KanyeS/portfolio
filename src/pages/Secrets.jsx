import React, { useState, useEffect } from "react";
import FloatingHearts3D from "../components/CustomBackground/FloatingHearts";

const Secrets = () => {
    const [elapsedTime, setElapsedTime] = useState("");

    
    useEffect(() => {
        const startDate = new Date("2025-02-08T13:00:00");
    
        const updateTimer = () => {
            const now = new Date();
            const diff = Math.floor((now - startDate) / 1000);
    
            const days = Math.floor(diff / (24 * 3600));
            const hours = Math.floor((diff % (24 * 3600)) / 3600);
            const minutes = Math.floor((diff % 3600) / 60);
            const seconds = diff % 60;
    
            setElapsedTime(`${days}d ${hours}h ${minutes}m ${seconds}s`);
        };
    
        const timerInterval = setInterval(updateTimer, 1000);
        updateTimer();
    
        return () => clearInterval(timerInterval);
    }, []);
    

    return (
        <div style={{
            position: "relative", 
            width: "100vw", 
            height: "100vh", 
            background: "black", 
            color: "white", 
            display: "flex", 
            flexDirection: "column", 
            justifyContent: "center", 
            alignItems: "center",
            fontSize: "2rem"
        }}>
            {/* Floating 3D Hearts */}
            <FloatingHearts3D count={30} />

            {/* Timer */}
            <h1 style={{
                zIndex: 2,
                textAlign: "center",
                fontFamily: "'Orbitron', sans-serif",
                color: "rgb(255, 0, 0)",
                textShadow: "2px 2px 4px rgba(255, 255, 255, 0.8), 0 0 10px rgba(255, 59, 59, 0.7)",
                fontWeight: "bold", 
                background: "rgba(255, 0, 0, 0.1)",
                padding: "15px 30px",
                borderRadius: "10px",
                boxShadow: "0 0 15px rgba(255, 255, 255, 0.6)",
                textTransform: "uppercase",
                letterSpacing: "2px",
                display: "inline-block",
                marginTop: "20px",
                position: "relative",
                overflow: "hidden",
                border: "2px solid rgba(255, 0, 0, 0.4)",
                minWidth: "60%",  
                minHeight: "60px",   
                fontSize: "clamp(1.5rem, 2vw, 2.5rem)",
            }}>
                💖 Time In Love With Jess: {elapsedTime} 💖
            </h1>

        </div>
  );
};

export default Secrets;
