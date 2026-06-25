import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const reasons = [
  "Your beautiful smile.", "Your endless kindness.", "How you care for Geya.", "Your gentle patience.", 
  "Your contagious laughter.", "How you support my dreams.", "Your warm hugs.", "The way you look at me.",
  "Your intelligence.", "Your cooking.", "Your sense of style.", "How you make a house a home.",
  "Your strength.", "Your forgiving heart.", "Your silly jokes.", "How you listen.",
  "Your passion for life.", "Your beautiful eyes.", "The way you hold my hand.", "Your resilience.",
  "Your honesty.", "Your loyalty.", "How you make me want to be better.", "Your sweet voice.",
  "Your random dances.", "Your thoughtful surprises.", "How you comfort me.", "Your beautiful soul.",
  "Because you are you."
];

const Scene7Reasons = ({ nextScene }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(containerRef.current, { opacity: 0 }, { opacity: 1, duration: 1 });
  }, []);

  const handleNext = () => {
    gsap.to(containerRef.current, { opacity: 0, duration: 1, onComplete: nextScene });
  };

  return (
    <div ref={containerRef} className="w-full h-full flex flex-col items-center justify-center p-4 md:p-10">
      <h2 className="font-serif text-3xl text-purple-soft mb-8 mt-10 md:mt-0 drop-shadow-md text-center">
        29 Reasons I Love You
      </h2>
      
      <div className="w-full max-w-6xl flex-1 overflow-y-auto pb-20 scrollbar-hide">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 p-2">
          {reasons.map((reason, idx) => (
            <div key={idx} className="group perspective-1000 h-32 md:h-40 cursor-pointer">
              <div className="w-full h-full relative preserve-3d transition-transform duration-700 group-hover:rotate-y-180">
                
                {/* Front */}
                <div className="absolute inset-0 backface-hidden glassmorphism rounded-xl flex items-center justify-center border border-purple-main/30 shadow-lg">
                  <span className="font-serif text-2xl text-purple-light opacity-50">{idx + 1}</span>
                </div>
                
                {/* Back */}
                <div className="absolute inset-0 backface-hidden rotate-y-180 glassmorphism rounded-xl flex items-center justify-center p-4 text-center border border-purple-soft shadow-[0_0_15px_#A855F7]">
                  <p className="font-sans text-xs md:text-sm text-white">{reason}</p>
                </div>
                
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-6 z-50">
        <button 
          onClick={handleNext}
          className="px-8 py-3 bg-purple-dark hover:bg-purple-main rounded-full border border-purple-main transition-colors shadow-lg"
        >
          Next Scene
        </button>
      </div>

      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default Scene7Reasons;
