import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Scene5Ticket = ({ nextScene }) => {
  const containerRef = useRef(null);
  const ticketRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(ticketRef.current,
      { y: '100vh', rotation: -10 },
      { y: 0, rotation: 0, duration: 1.5, ease: "back.out(1.2)" }
    );
  }, []);

  const handleNext = () => {
    gsap.to(ticketRef.current, {
      scale: 1.5,
      opacity: 0,
      duration: 1,
      onComplete: nextScene
    });
  };

  return (
    <div ref={containerRef} className="w-full h-full flex items-center justify-center p-4">
      <div 
        ref={ticketRef}
        className="w-full max-w-2xl bg-gradient-to-br from-purple-dark to-black rounded-xl overflow-hidden shadow-[0_0_50px_rgba(168,85,247,0.4)] border border-purple-main flex flex-col md:flex-row relative"
      >
        {/* Holographic overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-purple-light/20 pointer-events-none mix-blend-overlay" />
        
        {/* Ticket Left Side */}
        <div className="w-full md:w-3/4 p-6 md:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-dashed border-purple-main/50 relative">
          <div className="absolute top-4 right-4 opacity-20">
            {/* BTS Logo */}
            <svg viewBox="0 0 100 100" className="w-16 h-16 fill-white">
              <polygon points="15,10 40,25 40,75 15,90" fill="none" stroke="#C084FC" strokeWidth="6" />
              <polygon points="85,10 60,25 60,75 85,90" fill="none" stroke="#C084FC" strokeWidth="6" />
            </svg>
          </div>
          
          <div>
            <h1 className="text-3xl md:text-5xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-purple-light to-white mb-2 uppercase">
              Purple Love Tour
            </h1>
            <p className="font-serif text-purple-300">A Celebration of You</p>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-purple-main uppercase tracking-widest">Guest</p>
              <p className="font-bold text-xl text-white">Nida</p>
            </div>
            <div>
              <p className="text-xs text-purple-main uppercase tracking-widest">Special Guest</p>
              <p className="font-bold text-xl text-white">Rafi & Geya</p>
            </div>
            <div>
              <p className="text-xs text-purple-main uppercase tracking-widest">Venue</p>
              <p className="font-bold text-lg text-white">Purple Universe Arena</p>
            </div>
            <div>
              <p className="text-xs text-purple-main uppercase tracking-widest">Seat</p>
              <p className="font-bold text-lg text-white">Forever Together</p>
            </div>
          </div>
        </div>

        {/* Ticket Right Side */}
        <div className="w-full md:w-1/4 bg-purple-900/50 p-6 flex flex-col items-center justify-center relative">
          {/* Circular Cutouts for Ticket Effect */}
          <div className="hidden md:block absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-[#111827] rounded-full border-r border-purple-main/50" />
          <div className="md:hidden absolute left-1/2 -top-3 -translate-x-1/2 w-6 h-6 bg-[#111827] rounded-full border-b border-purple-main/50" />

          <div className="mb-4">
            {/* Fake Barcode */}
            <div className="w-full h-16 flex gap-1 items-center justify-center">
               {[...Array(15)].map((_, i) => (
                 <div key={i} className="bg-white/80 h-full" style={{ width: `${Math.random() * 4 + 1}px` }} />
               ))}
            </div>
            <p className="text-center text-xs text-purple-300 mt-2 font-mono">1997-2026-NIDA</p>
          </div>

          <p className="text-xs text-purple-main font-bold mb-4 uppercase text-center">Status: VIP Lifetime</p>

          <button 
            onClick={handleNext}
            className="w-full py-3 bg-purple-light hover:bg-white text-purple-900 font-bold rounded shadow-lg transition-colors duration-300"
          >
            Enter Concert
          </button>
        </div>
      </div>
    </div>
  );
};

export default Scene5Ticket;
