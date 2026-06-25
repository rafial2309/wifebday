import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Scene1Loading = ({ nextScene }) => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const glowRef = useRef(null);
  const lightstickRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Pulse the lightstick glow with changing colors
      gsap.to(glowRef.current, {
        scale: 1.5,
        opacity: 0.8,
        duration: 1.5,
        yoyo: true,
        repeat: -1,
        ease: "power1.inOut"
      });
      
      gsap.to(glowRef.current, {
        backgroundColor: ["#A855F7", "#ec4899", "#3b82f6", "#A855F7"],
        duration: 4,
        repeat: -1,
        ease: "linear"
      });

      // Float the lightstick
      gsap.to(lightstickRef.current, {
        y: -10,
        rotation: 5,
        yoyo: true,
        repeat: -1,
        duration: 1.5,
        ease: "sine.inOut"
      });

      // Fade in text
      gsap.fromTo(textRef.current, 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
      );
    });

    const timer = setTimeout(() => {
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 1,
        onComplete: nextScene
      });
    }, 4000);

    return () => {
      ctx.revert();
      clearTimeout(timer);
    };
  }, [nextScene]);

  return (
    <div ref={containerRef} className="w-full h-full flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm z-50">
      
      <div className="relative flex justify-center items-center h-48 w-48 mb-8">
        {/* Glow effect */}
        <div 
          ref={glowRef}
          className="w-32 h-32 rounded-full blur-[40px] absolute mix-blend-screen"
        />
        
        {/* BTS Lightstick SVG */}
        <svg ref={lightstickRef} className="w-24 h-48 z-10" viewBox="0 0 100 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Handle */}
          <rect x="40" y="80" width="20" height="90" rx="10" fill="#1f2937" />
          <rect x="45" y="100" width="10" height="30" rx="5" fill="#374151" />
          <circle cx="50" cy="115" r="3" fill="#ef4444" /> {/* Button */}
          
          {/* Bulb Base */}
          <path d="M30 80 Q50 60 70 80 Z" fill="#4b5563" />
          
          {/* Sphere Bulb */}
          <circle cx="50" cy="50" r="35" fill="white" fillOpacity="0.8" stroke="#d1d5db" strokeWidth="2" />
          
          {/* BTS Logo inside Bulb */}
          <g transform="translate(50, 50) scale(0.4) translate(-50, -50)">
            <polygon points="15,10 40,25 40,75 15,90" fill="none" stroke="#6b7280" strokeWidth="6" opacity="0.8" />
            <polygon points="85,10 60,25 60,75 85,90" fill="none" stroke="#6b7280" strokeWidth="6" opacity="0.8" />
          </g>
          
          {/* Red fuse */}
          <circle cx="50" cy="15" r="4" fill="#ef4444" />
        </svg>
      </div>
      
      <div ref={textRef} className="z-10 text-center flex flex-col items-center gap-4">
        <h1 className="font-serif text-3xl md:text-5xl text-purple-soft font-bold tracking-wider mt-4">
          Connecting to the Purple Universe...
        </h1>
        <p className="text-purple-300 font-sans text-lg animate-pulse">
          Preparing a special journey.
        </p>
      </div>
    </div>
  );
};

export default Scene1Loading;
