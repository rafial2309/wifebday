import React, { useState, useEffect } from 'react';
import StarryBackground from './components/StarryBackground';
import AudioPlayer from './components/AudioPlayer';
import ProgressIndicator from './components/ProgressIndicator';
import Scene1Loading from './scenes/Scene1Loading';
import Scene2Envelope from './scenes/Scene2Envelope';
import Scene3Letter from './scenes/Scene3Letter';
import Scene4Timeline from './scenes/Scene4Timeline';
import Scene5Ticket from './scenes/Scene5Ticket';
import Scene6Stage from './scenes/Scene6Stage';
import Scene8MemoryBox from './scenes/Scene8MemoryBox';
import Scene11Final from './scenes/Scene11Final';
import { Maximize, Minimize } from 'lucide-react';

function App() {
  const [currentScene, setCurrentScene] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const TOTAL_SCENES = 8; // Removed Scene 7, 9, 10

  const nextScene = () => {
    if (currentScene < TOTAL_SCENES) {
      setCurrentScene(prev => prev + 1);
    }
  };

  const setScene = (sceneNum) => {
    if (sceneNum >= 1 && sceneNum <= TOTAL_SCENES) {
      setCurrentScene(sceneNum);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <div className="w-screen h-screen overflow-hidden bg-purple-bg relative font-sans text-white">
      {/* Global Background */}
      <div className="absolute inset-0 z-0">
        <StarryBackground />
      </div>

      {/* Global BTS Logo Watermark */}
      <div className="absolute top-4 left-4 z-40 opacity-30 pointer-events-none">
        <svg viewBox="0 0 100 100" className="w-12 h-12 fill-purple-light">
          <polygon points="15,10 40,25 40,75 15,90" fill="none" stroke="#C084FC" strokeWidth="6" />
          <polygon points="85,10 60,25 60,75 85,90" fill="none" stroke="#C084FC" strokeWidth="6" />
        </svg>
      </div>

      {/* Global UI */}
      <div className="absolute top-4 right-4 z-50 flex gap-4">
        <AudioPlayer isPlaying={isPlaying} setIsPlaying={setIsPlaying} currentScene={currentScene} />
        <button 
          onClick={toggleFullscreen}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all"
        >
          {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
        </button>
      </div>

      {currentScene > 1 && (
        <ProgressIndicator current={currentScene} total={TOTAL_SCENES} setScene={setScene} />
      )}

      {/* Scenes Container */}
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        {currentScene === 1 && <Scene1Loading nextScene={nextScene} />}
        {currentScene === 2 && <Scene2Envelope nextScene={nextScene} />}
        {currentScene === 3 && <Scene3Letter nextScene={nextScene} />}
        {currentScene === 4 && <Scene4Timeline nextScene={nextScene} />}
        {currentScene === 5 && <Scene5Ticket nextScene={nextScene} />}
        {currentScene === 6 && <Scene6Stage nextScene={nextScene} />}
        {currentScene === 7 && <Scene8MemoryBox nextScene={nextScene} />}
        {currentScene === 8 && <Scene11Final setScene={setScene} />}
      </div>
    </div>
  );
}

export default App;
