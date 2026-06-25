import React, { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';

const Scene10Lantern = ({ nextScene }) => {
  const containerRef = useRef(null);
  const lanternRef = useRef(null);
  const [wish, setWish] = useState('');
  const [isLaunched, setIsLaunched] = useState(false);

  useEffect(() => {
    gsap.fromTo(containerRef.current, { opacity: 0 }, { opacity: 1, duration: 1 });
  }, []);

  const handleLaunch = () => {
    if (!wish.trim() || isLaunched) return;
    setIsLaunched(true);

    // Save wish to local storage (feature requested)
    localStorage.setItem('nida_birthday_wish', wish);

    const tl = gsap.timeline({
      onComplete: () => {
        setTimeout(() => {
          gsap.to(containerRef.current, { opacity: 0, duration: 1, onComplete: nextScene });
        }, 2000);
      }
    });

    // Animate lantern flying up
    tl.to(lanternRef.current, {
      y: '-120vh',
      x: 'random(-100, 100)',
      scale: 0.5,
      opacity: 0,
      duration: 5,
      ease: "power2.in"
    });
  };

  return (
    <div ref={containerRef} className="w-full h-full flex flex-col items-center justify-center p-4 relative overflow-hidden">
      
      {!isLaunched ? (
        <div className="z-20 flex flex-col items-center max-w-lg w-full">
          <h2 className="font-serif text-3xl md:text-4xl text-purple-soft mb-8 text-center drop-shadow-md">
            Make a Wish
          </h2>
          
          <div className="w-full glassmorphism p-6 rounded-2xl flex flex-col items-center">
            <textarea
              className="w-full bg-transparent border-b-2 border-purple-main text-white placeholder-purple-300 focus:outline-none focus:border-purple-light resize-none font-sans p-2 text-center"
              rows="3"
              placeholder="What is your wish this year?"
              value={wish}
              onChange={(e) => setWish(e.target.value)}
            />
            
            <button 
              onClick={handleLaunch}
              disabled={!wish.trim()}
              className="mt-6 px-8 py-3 bg-purple-main hover:bg-purple-light disabled:opacity-50 disabled:cursor-not-allowed rounded-full text-white font-bold tracking-wider uppercase transition-all shadow-[0_0_15px_#A855F7]"
            >
              Release Lantern
            </button>
          </div>
        </div>
      ) : (
        <div className="z-20 text-center animate-[fadeIn_2s_ease-out]">
          <h2 className="font-serif text-3xl text-purple-soft drop-shadow-[0_0_20px_#fff]">
            May all your wishes reach the stars.
          </h2>
        </div>
      )}

      {/* The Lantern */}
      <div 
        ref={lanternRef}
        className="absolute bottom-20 z-10 w-20 h-28 opacity-90 transition-opacity duration-1000"
        style={{ opacity: isLaunched ? 1 : 0 }}
      >
        {/* Simple CSS Lantern */}
        <div className="w-full h-full bg-gradient-to-t from-orange-500 via-yellow-500 to-yellow-100 rounded-t-[40%] rounded-b-md shadow-[0_0_50px_#f59e0b] relative overflow-hidden">
           <div className="absolute bottom-0 w-full h-4 bg-orange-700 rounded-b-md" />
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-yellow-200 blur-xl opacity-50 mix-blend-screen animate-pulse" />
        </div>
      </div>

    </div>
  );
};

export default Scene10Lantern;
