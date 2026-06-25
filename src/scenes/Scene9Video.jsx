import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { Play } from 'lucide-react';

const Scene9Video = ({ nextScene }) => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    gsap.fromTo(containerRef.current, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 1 });
  }, []);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleNext = () => {
    gsap.to(containerRef.current, { opacity: 0, x: -100, duration: 1, onComplete: nextScene });
  };

  return (
    <div ref={containerRef} className="w-full h-full flex flex-col items-center justify-center p-4">
      <div className="mb-8 text-center">
        <h2 className="font-serif text-3xl md:text-5xl text-purple-soft drop-shadow-[0_0_10px_#A855F7]">
          A special message just for you.
        </h2>
      </div>

      <div className="relative w-full max-w-4xl aspect-video bg-black rounded-xl overflow-hidden shadow-[0_0_30px_#5B2C87] border border-purple-main/30 group">
        
        {/* Placeholder Video */}
        <video 
          ref={videoRef}
          className="w-full h-full object-cover"
          controls={isPlaying}
          onEnded={() => setIsPlaying(false)}
        >
          <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
          Your browser does not support HTML video.
        </video>

        {!isPlaying && (
          <div className="absolute inset-0 bg-purple-900/40 flex items-center justify-center backdrop-blur-sm">
            <button 
              onClick={handlePlay}
              className="w-20 h-20 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center backdrop-blur-md transition-all group-hover:scale-110"
            >
              <Play fill="white" size={40} className="text-white ml-2" />
            </button>
          </div>
        )}
      </div>

      <div className="absolute bottom-6 z-50">
        <button 
          onClick={handleNext}
          className="px-8 py-3 bg-white/10 hover:bg-white/30 backdrop-blur-md rounded-full border border-purple-light transition-colors"
        >
          Next Scene
        </button>
      </div>
    </div>
  );
};

export default Scene9Video;
