import React, { useRef, useState } from 'react';
import { gsap } from 'gsap';

const Scene2Envelope = ({ nextScene }) => {
  const containerRef = useRef(null);
  const envelopeRef = useRef(null);
  const flapRef = useRef(null);
  const letterRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);

    const tl = gsap.timeline({
      onComplete: () => {
        setTimeout(() => {
          gsap.to(containerRef.current, { opacity: 0, duration: 1, onComplete: nextScene });
        }, 1000);
      }
    });

    // Animate flap opening
    tl.to(flapRef.current, { rotateX: 180, duration: 1, ease: "power2.inOut", transformOrigin: "top" }, 0);
    tl.set(flapRef.current, { zIndex: 1 }, 0.5);
    
    // Zoom in slightly
    tl.to(envelopeRef.current, { scale: 1.1, duration: 1.5, ease: "power2.out" }, 0.5);

    // Slide letter up
    tl.to(letterRef.current, { y: -100, opacity: 1, duration: 1, ease: "power2.out" }, 1);
  };

  return (
    <div ref={containerRef} className="w-full h-full flex flex-col items-center justify-center">
      <div className="absolute top-1/4 text-center z-20 pointer-events-none mb-10">
        <h2 className="font-serif text-3xl md:text-4xl text-purple-soft drop-shadow-lg">
          For My Beloved Wife, Nida
        </h2>
        <p className="text-purple-300 mt-2 font-sans animate-pulse">Tap to open</p>
      </div>

      <div 
        ref={envelopeRef}
        onClick={handleOpen}
        className="relative w-80 h-52 md:w-96 md:h-64 cursor-pointer mt-20"
        style={{ perspective: '1000px' }}
      >
        {/* Envelope Back */}
        <div className="absolute inset-0 bg-purple-dark rounded-md shadow-2xl border border-purple-main/30 z-0" />

        {/* The Letter inside */}
        <div 
          ref={letterRef}
          className="absolute inset-x-4 top-4 bottom-4 bg-white rounded-sm opacity-0 flex items-center justify-center border border-gray-200 z-[5]"
        >
          <div className="w-12 h-12 border border-purple-main rounded-full flex items-center justify-center opacity-50">
            <span className="text-purple-dark font-serif text-xl">N</span>
          </div>
        </div>

        {/* Envelope Flap (Top) */}
        <div 
          ref={flapRef}
          className="absolute top-0 left-0 w-full h-1/2 origin-top z-20"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <svg viewBox="0 0 100 50" preserveAspectRatio="none" className="w-full h-full drop-shadow-md">
            <polygon points="0,0 100,0 50,50" fill="#6F42C1" />
            <polygon points="0,0 100,0 50,50" fill="none" stroke="#A855F7" strokeWidth="0.5" />
          </svg>
          {/* Wax Seal */}
          <div className={`absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 w-12 h-12 bg-red-600 rounded-full flex items-center justify-center shadow-lg transition-opacity duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`}>
            <div className="w-10 h-10 border border-white/50 rounded-full flex items-center justify-center">
              <span className="font-serif text-white text-lg">R</span>
            </div>
          </div>
        </div>

        {/* Envelope Front (Left/Right/Bottom folds) */}
        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden rounded-md">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
            <polygon points="0,100 0,0 50,50" fill="#4B1E73" />
            <polygon points="100,100 100,0 50,50" fill="#4B1E73" />
            <polygon points="0,100 100,100 50,50" fill="#5B2C87" />
            
            <polygon points="0,100 0,0 50,50" fill="none" stroke="#8A4ACF" strokeWidth="0.5" />
            <polygon points="100,100 100,0 50,50" fill="none" stroke="#8A4ACF" strokeWidth="0.5" />
            <polygon points="0,100 100,100 50,50" fill="none" stroke="#8A4ACF" strokeWidth="0.5" />
          </svg>
        </div>

      </div>
    </div>
  );
};

export default Scene2Envelope;
