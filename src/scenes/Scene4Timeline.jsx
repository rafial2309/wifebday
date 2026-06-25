import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Camera } from 'lucide-react';

const milestones = [
  {
    id: 1,
    title: 'First Meeting',
    desc: 'A simple moment in the classroom that changed our lives forever.',
    date: '2012',
    image: '/photos/photo1.jpg'
  },
  {
    id: 2,
    title: 'Long Distance Love',
    desc: 'Distance tested us, but love always brought us closer.',
    date: '2013 - 2015',
    image: '/photos/photo2.jpg'
  },
  {
    id: 3,
    title: 'Wedding Day',
    desc: 'The day we became each other’s forever.',
    date: 'July 2022',
    image: '/photos/photo3.jpg'
  },
  {
    id: 4,
    title: 'Welcome Geya',
    desc: 'Our little miracle arrived and filled our hearts with endless joy.',
    date: 'August 2023',
    image: '/photos/photo4.jpg'
  },
  {
    id: 5,
    title: 'Happy 29th Birthday',
    desc: 'Today we celebrate the woman who makes our world complete.',
    date: 'Present',
    image: '/photos/photo5.jpg'
  }
];

const Scene4Timeline = ({ nextScene }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(containerRef.current, { opacity: 0 }, { opacity: 1, duration: 1 });
    });

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev < milestones.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 4000); // Change milestone every 4 seconds

    return () => {
      ctx.revert();
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(cardRef.current, 
        { opacity: 0, scale: 0.9, y: 20 }, 
        { opacity: 1, scale: 1, y: 0, duration: 1, ease: "power2.out" }
      );
    }
  }, [currentIndex]);

  const handleNext = () => {
    gsap.to(containerRef.current, { opacity: 0, duration: 1, onComplete: nextScene });
  };

  const activeStar = milestones[currentIndex];

  return (
    <div ref={containerRef} className="w-full h-full flex flex-col md:flex-row items-center justify-center p-4 md:p-12 relative overflow-hidden">
      
      {/* Timeline Path Auto-animated */}
      <div className="relative w-full md:w-1/2 h-[20%] md:h-full flex flex-row md:flex-col justify-between items-center py-4 md:py-20 z-10 px-4 md:px-0">
        <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-10 bottom-10 w-0.5 bg-gradient-to-b from-transparent via-purple-main to-transparent opacity-50" />
        <div className="md:hidden absolute top-1/2 -translate-y-1/2 left-10 right-10 h-0.5 bg-gradient-to-r from-transparent via-purple-main to-transparent opacity-50" />
        
        {milestones.map((milestone, idx) => {
          const isActive = idx === currentIndex;
          const isPast = idx < currentIndex;
          return (
            <div key={milestone.id} className="relative z-10 flex justify-center items-center">
              <div className={`w-4 h-4 md:w-6 md:h-6 rounded-full transition-all duration-1000 flex items-center justify-center
                ${isActive ? 'bg-purple-light scale-150 shadow-[0_0_25px_#A855F7]' : 
                  isPast ? 'bg-purple-main opacity-50' : 'bg-white/20'}`}
              >
                {isActive && <div className="w-2 h-2 rounded-full bg-white animate-ping absolute" />}
                <div className="w-1 h-1 md:w-2 md:h-2 rounded-full bg-purple-dark" />
              </div>
            </div>
          )
        })}
      </div>

      {/* Details Panel */}
      <div className="w-full md:w-1/2 h-[70%] md:h-full flex items-center justify-center z-20 mt-4 md:mt-0 p-4">
        <div ref={cardRef} className="glassmorphism rounded-2xl p-6 md:p-10 w-full max-w-md border border-purple-light/30 shadow-[0_0_30px_rgba(168,85,247,0.2)] relative overflow-hidden">
          {/* Subtle BTS Logo Watermark */}
          <svg viewBox="0 0 100 100" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 text-purple-main/20 pointer-events-none opacity-20">
            <polygon points="15,10 40,25 40,75 15,90" fill="none" stroke="currentColor" strokeWidth="6" />
            <polygon points="85,10 60,25 60,75 85,90" fill="none" stroke="currentColor" strokeWidth="6" />
          </svg>

          <div className="w-full h-40 md:h-60 bg-purple-900/50 rounded-xl mb-6 flex flex-col items-center justify-center border border-purple-main/30 relative overflow-hidden">
             {activeStar.image ? (
               <img src={activeStar.image} alt={activeStar.title} className="w-full h-full object-cover" />
             ) : (
               <>
                 <Camera size={48} className="text-white/20 mb-2" />
                 <p className="text-white/30 text-xs">Photo Placeholder</p>
               </>
             )}
          </div>
          <h3 className="font-serif text-2xl text-purple-light mb-2">{activeStar.title}</h3>
          <p className="text-sm text-purple-300 mb-4">{activeStar.date}</p>
          <p className="font-sans text-purple-soft leading-relaxed">{activeStar.desc}</p>
        </div>
      </div>

      {currentIndex === milestones.length - 1 && (
        <div className="absolute bottom-6 right-6 z-50 animate-[fadeIn_1s_ease-out]">
          <button 
            onClick={handleNext}
            className="px-6 py-2 bg-purple-dark hover:bg-purple-main backdrop-blur-md rounded-full border border-purple-light transition-colors shadow-[0_0_15px_#6F42C1]"
          >
            Next Scene
          </button>
        </div>
      )}
    </div>
  );
};

export default Scene4Timeline;
