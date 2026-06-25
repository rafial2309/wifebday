import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Scene3Letter = ({ nextScene }) => {
  const containerRef = useRef(null);
  const [displayedText, setDisplayedText] = useState('');
  const [showButton, setShowButton] = useState(false);
  
  const fullText = `Happy 29th Birthday, my love, and Geya's Mom, Nida.

Thank you for being our home, our safe place, our greatest blessing, and the most beautiful part of our lives.

Every day with you becomes a memory we will always treasure.

We hope this little universe reminds you how deeply and endlessly you are loved.

Thank you for choosing us, loving us, and walking beside us every single day.

Love always,

Rafi & Geya 💜`;




  useEffect(() => {
    // Fade in container
    gsap.fromTo(containerRef.current, 
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
    );

    // Typing effect
    let index = 0;
    const interval = setInterval(() => {
      if (index < fullText.length - 1) {
        setDisplayedText(prev => prev + fullText[index]);
        index++;
      } else {
        clearInterval(interval);
        setTimeout(() => setShowButton(true), 1000);
      }
    }, 50); // Adjust typing speed here

    return () => clearInterval(interval);
  }, []);

  const handleNext = () => {
    gsap.to(containerRef.current, {
      opacity: 0,
      scale: 0.9,
      duration: 1,
      onComplete: nextScene
    });
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4 md:p-6">
      <div 
        ref={containerRef}
        className="glassmorphism w-full max-w-lg rounded-2xl p-6 md:p-12 text-left relative overflow-hidden flex flex-col max-h-[90vh]"
      >
        <div className="absolute top-0 right-0 p-4 opacity-20 pointer-events-none">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" className="text-white">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </div>

        <div className="overflow-y-auto pr-2 custom-scrollbar flex-grow">
          <p className="font-serif text-lg md:text-xl leading-relaxed whitespace-pre-wrap text-purple-soft drop-shadow-md min-h-[300px]">
            {displayedText}
            <span className="inline-block w-1 h-5 bg-purple-main ml-1 animate-pulse align-middle" />
          </p>
        </div>

        <div className="mt-6 flex justify-center shrink-0 min-h-[50px]">
          {showButton && (
            <button 
              onClick={handleNext}
              className="px-6 py-3 bg-purple-main hover:bg-purple-light text-white rounded-full font-sans tracking-widest uppercase text-sm shadow-[0_0_15px_rgba(111,66,193,0.5)] transition-all duration-300 hover:scale-105"
            >
              Continue Our Journey
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Scene3Letter;
