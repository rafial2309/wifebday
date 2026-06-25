import React, { useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const AudioPlayer = ({ isPlaying, setIsPlaying, currentScene }) => {
  const iframeRef = useRef(null);

  useEffect(() => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      // Pause if we are in scene 6 (Concert Stage), otherwise respect isPlaying
      const shouldPlay = isPlaying && currentScene !== 6;
      const command = shouldPlay ? 'playVideo' : 'pauseVideo';
      
      try {
        iframeRef.current.contentWindow.postMessage(
          JSON.stringify({ event: 'command', func: command, args: '' }),
          '*'
        );
      } catch (e) {
        console.error("Error communicating with YouTube IFrame API", e);
      }
    }
  }, [isPlaying, currentScene]);

  return (
    <div className="flex items-center">
      <iframe
        ref={iframeRef}
        src="https://www.youtube.com/embed/rOhoILlViwQ?enablejsapi=1&autoplay=1&loop=1&playlist=rOhoILlViwQ"
        className="hidden"
        allow="autoplay"
        title="Background Music"
      />
      <button 
        onClick={() => setIsPlaying(!isPlaying)}
        disabled={currentScene === 6}
        className={`p-2 rounded-full backdrop-blur-sm transition-all ${currentScene === 6 ? 'bg-white/5 opacity-50 cursor-not-allowed' : 'bg-white/10 hover:bg-white/20'}`}
      >
        {isPlaying && currentScene !== 6 ? <Volume2 size={20} /> : <VolumeX size={20} />}
      </button>
    </div>
  );
};

export default AudioPlayer;
