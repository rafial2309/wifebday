import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';
import { Camera } from 'lucide-react';

const photos = [
  

  {
    id: 1,
    text: "Young Mom and Dad.",
    rot: -5,
    image: "/photos/memory1.jpg"
  },
  {
    id: 2,
    text: "Our forever begins.",
    rot: 8,
    image: "/photos/memory2.jpg"
  },
  {
    id: 3,
    text: "Welcome, little Geya.",
    rot: -10,
    image: "/photos/memory3.jpg"
  },
  {
    id: 4,
    text: "Our concert night.",
    rot: 4,
    image: "/photos/memory4.jpg"
  },
  {
    id: 5,
    text: "Geya's first concert.",
    rot: -3,
    image: "/photos/memory5.jpg"
  }


];

const Scene8MemoryBox = ({ nextScene }) => {
  const containerRef = useRef(null);
  const boxRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    gsap.fromTo(containerRef.current, { opacity: 0 }, { opacity: 1, duration: 1 });
  }, []);

  const handleOpenBox = () => {
    if (isOpen) return;
    setIsOpen(true);
    
    // Animate box opening (shake and fade out slightly)
    gsap.to(boxRef.current, {
      y: 20,
      opacity: 0,
      duration: 1,
      ease: "power2.in",
      delay: 0.5
    });
  };

  const handleNext = () => {
    gsap.to(containerRef.current, { opacity: 0, duration: 1, onComplete: nextScene });
  };

  return (
    <div ref={containerRef} className="w-full h-full flex flex-col items-center justify-center overflow-hidden relative">
      <h2 className="absolute top-10 font-serif text-2xl md:text-4xl text-purple-soft drop-shadow-md z-50">
        Our Memory Box
      </h2>

      {!isOpen && (
        <div 
          ref={boxRef}
          onClick={handleOpenBox}
          className="relative w-40 h-40 md:w-64 md:h-64 cursor-pointer hover:scale-105 transition-transform z-40 group"
        >
          {/* Simple Box Representation */}
          <div className="w-full h-full bg-gradient-to-br from-purple-main to-purple-dark rounded-xl shadow-[0_0_30px_#6F42C1] border-2 border-purple-light flex items-center justify-center relative overflow-hidden">
            <div className="absolute w-full h-4 bg-purple-light/50 top-1/2 -translate-y-1/2" />
            <div className="absolute h-full w-4 bg-purple-light/50 left-1/2 -translate-x-1/2" />
            
            {/* Bow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 border-4 border-purple-soft rounded-full opacity-80" />
            
            <p className="absolute bottom-4 font-sans text-xs text-white/70 group-hover:animate-bounce">Tap to open</p>
          </div>
        </div>
      )}

      {isOpen && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {photos.map((photo, idx) => (
            <motion.div
              key={photo.id}
              drag
              dragConstraints={containerRef}
              initial={{ scale: 0, y: 100, opacity: 0, rotate: 0 }}
              animate={{ 
                scale: 1, 
                y: (Math.random() * 200 - 100), 
                x: (Math.random() * 300 - 150),
                opacity: 1, 
                rotate: photo.rot 
              }}
              transition={{ type: "spring", stiffness: 100, damping: 10, delay: idx * 0.1 }}
              whileHover={{ scale: 1.1, zIndex: 50 }}
              whileDrag={{ scale: 1.1, zIndex: 50, cursor: "grabbing" }}
              className="absolute w-40 h-48 md:w-56 md:h-64 bg-white p-3 pb-8 shadow-2xl rounded-sm cursor-grab pointer-events-auto border border-gray-200"
            >
              <div className="w-full h-full bg-gray-200 flex items-center justify-center border border-gray-300 overflow-hidden">
                {photo.image ? (
                  <img src={photo.image} alt={photo.text} className="w-full h-full object-cover pointer-events-none" />
                ) : (
                  <Camera size={32} className="text-gray-400" />
                )}
              </div>
              <p className="absolute bottom-2 left-0 w-full text-center font-serif text-gray-800 text-xs md:text-sm">
                {photo.text}
              </p>
            </motion.div>
          ))}
          
          <p className="absolute top-24 text-purple-300 font-sans animate-pulse z-0">
            Drag the photos around
          </p>
        </div>
      )}

      <div className="absolute bottom-6 z-50">
        <button 
          onClick={handleNext}
          className="px-8 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full border border-purple-main transition-colors"
        >
          Next Scene
        </button>
      </div>
    </div>
  );
};

export default Scene8MemoryBox;
