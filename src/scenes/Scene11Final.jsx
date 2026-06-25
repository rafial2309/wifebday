import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const Scene11Final = ({ setScene }) => {
  const containerRef = useRef(null);
  const textGroupRef = useRef(null);
  const secretRef = useRef(null);
  const star1Ref = useRef(null);
  const star2Ref = useRef(null);
  const [showSecret, setShowSecret] = useState(false);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Initial fade in
      tl.fromTo(containerRef.current, { opacity: 0 }, { opacity: 1, duration: 2 });
      
      // Animate two stars orbiting and merging
      tl.fromTo(star1Ref.current, 
        { x: -150, y: 50, scale: 0.5, opacity: 0 }, 
        { x: 0, y: 0, scale: 1.5, opacity: 1, duration: 4, ease: "power2.inOut" },
        0
      );
      tl.fromTo(star2Ref.current, 
        { x: 150, y: -50, scale: 0.5, opacity: 0 }, 
        { x: 0, y: 0, scale: 1.5, opacity: 1, duration: 4, ease: "power2.inOut" },
        0
      );

      // Supernova effect when they merge
      tl.to([star1Ref.current, star2Ref.current], {
        scale: 10,
        opacity: 0,
        duration: 2,
        ease: "power4.out"
      }, 4);

      // Fade in text slowly after merge
      tl.fromTo(textGroupRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 2, stagger: 1.5, ease: "power2.out" },
        5
      );
    });

    // Secret ending after all text is shown
    const timer = setTimeout(() => {
      setShowSecret(true);
    }, 12000); 

    return () => {
      ctx.revert();
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (showSecret && secretRef.current) {
      gsap.fromTo(secretRef.current, 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 3, ease: "power2.out" }
      );
    }
  }, [showSecret]);

  return (
    <div ref={containerRef} className="w-full h-full flex flex-col items-center justify-center p-4 relative overflow-hidden bg-black/50">
      
      {/* Emotional Merging Stars Animation */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-0 mix-blend-screen">
        <div ref={star1Ref} className="absolute w-12 h-12 rounded-full bg-purple-main blur-[10px] shadow-[0_0_50px_#A855F7]">
          <div className="absolute inset-2 bg-white rounded-full blur-[2px]" />
        </div>
        <div ref={star2Ref} className="absolute w-12 h-12 rounded-full bg-pink-500 blur-[10px] shadow-[0_0_50px_#ec4899]">
          <div className="absolute inset-2 bg-white rounded-full blur-[2px]" />
        </div>
      </div>

      <div ref={textGroupRef} className="z-10 text-center flex flex-col gap-10 max-w-2xl mt-12">
        <p className="font-serif text-xl md:text-2xl text-purple-300 tracking-wider">
          Thank you for walking beside us every single day.
        </p>
        
        <h1 className="font-serif text-4xl md:text-6xl text-white font-bold drop-shadow-[0_0_20px_rgba(168,85,247,0.8)]">
          Happy 29th Birthday.
        </h1>
        
        <div className="text-2xl md:text-3xl text-purple-soft font-serif italic space-y-4">
          <p className="drop-shadow-lg">You are our home.</p>
          <p className="drop-shadow-lg">You are our happiness.</p>
          <p className="drop-shadow-lg">You are our forever.</p>
        </div>

        <div className="mt-8 flex items-center justify-center gap-6 text-2xl text-white font-bold font-serif opacity-90">
          <span className="text-purple-light drop-shadow-md">Ayah</span>
          <div className="w-2 h-2 rounded-full bg-white animate-ping" />
          <span className="text-pink-300 drop-shadow-md">Geya</span>
        </div>
      </div>

      {showSecret && (
        <div ref={secretRef} className="absolute bottom-32 z-20 text-center px-4">
          <p className="font-sans text-sm md:text-base tracking-widest text-white/80 uppercase">
            P.S. We love you more than all the stars in this universe.
          </p>
        </div>
      )}

      <div className="absolute bottom-10 z-50">
        <button 
          onClick={() => setScene(2)} // Restart from Envelope
          className="px-8 py-3 bg-purple-900/50 hover:bg-purple-main/80 backdrop-blur-md rounded-full text-white font-bold shadow-[0_0_20px_rgba(111,66,193,0.5)] border border-purple-light/30 transition-all duration-300 hover:scale-105"
        >
          Replay Our Story
        </button>
      </div>
    </div>
  );
};

export default Scene11Final;
