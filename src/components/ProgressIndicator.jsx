import React from 'react';
import { Heart } from 'lucide-react';

const ProgressIndicator = ({ current, total, setScene }) => {
  return (
    <div className="absolute left-4 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
      {Array.from({ length: total - 1 }).map((_, index) => {
        const sceneNum = index + 2; // offset since we don't show indicator for loading screen
        const isActive = current === sceneNum;
        const isPast = current > sceneNum;

        return (
          <button 
            key={sceneNum}
            onClick={() => setScene(sceneNum)}
            className={`w-3 h-3 rounded-full transition-all duration-300 flex items-center justify-center
              ${isActive ? 'bg-purple-light scale-150 shadow-[0_0_10px_#A855F7]' : 
                isPast ? 'bg-purple-main opacity-50 hover:opacity-100' : 'bg-white/20 hover:bg-white/50'}`}
          />
        );
      })}
    </div>
  );
};

export default ProgressIndicator;
