import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import confetti from 'canvas-confetti';
import { Play, Pause, Video } from 'lucide-react';

const ROMANTIC_MESSAGES = [
  "Happy 29th Birthday, Nida 💜",
  "No concert is more beautiful than a life with you.",
  "You are the most beautiful part of our lives.",
  "Thank you for being our home.",
  "Every day with you becomes our favorite memory.",
  "If ARMY has BTS, Rafi and Geya have you.",
  "You are Geya's favorite person.",
  "You are my greatest blessing.",
  "Thank you for choosing us every single day.",
  "You are our safe place.",
  "Our little family exists because of your love.",
  "You make ordinary days feel special.",
  "You are my forever and Geya's superhero.",
  "Thank you for walking beside us.",
  "I Purple You 💜"
];

const IDOLS = [
  { id: 1, src: '/idols/idol1.png', name: 'RM' },
  { id: 2, src: '/idols/idol2.png', name: 'Jin' },
  { id: 3, src: '/idols/idol3.png', name: 'Suga' },
  { id: 4, src: '/idols/idol4.png', name: 'J-Hope' },
  { id: 5, src: '/idols/idol5.png', name: 'Jimin' },
  { id: 6, src: '/idols/idol6.png', name: 'V' },
  { id: 7, src: '/idols/idol7.png', name: 'Jungkook' },
];

const LIGHTSTICK_COLORS = ['#A855F7', '#ec4899', '#ffffff', '#6F42C1', '#d8b4fe'];

const Scene6Stage = ({ nextScene }) => {
  const containerRef = useRef(null);
  const stageRef = useRef(null);
  const idolsRef = useRef([]);
  const canvasRef = useRef(null);
  const ytRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [messageIndex, setMessageIndex] = useState(0);
  const [cameraMode, setCameraMode] = useState('center');
  const [showLightsticks, setShowLightsticks] = useState(true);
  const [isFinalMoment, setIsFinalMoment] = useState(false);
  const [showFinishButton, setShowFinishButton] = useState(false);

  // Autoplay Youtube Video Unmuted on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      if (ytRef.current && ytRef.current.contentWindow) {
        ytRef.current.contentWindow.postMessage(JSON.stringify({
          event: 'command',
          func: 'playVideo',
          args: []
        }), '*');
        
        ytRef.current.contentWindow.postMessage(JSON.stringify({
          event: 'command',
          func: 'unMute',
          args: []
        }), '*');
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Idol Animations
  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(containerRef.current, { opacity: 0 }, { opacity: 1, duration: 2 });
      
      idolsRef.current.forEach((idol, i) => {
        if (!idol) return;
        
        const tl = gsap.timeline({ repeat: -1, delay: i * 0.15 });
        tl.to(idol, { y: 10, scaleY: 0.95, duration: 0.4, ease: "sine.inOut" })
          .to(idol, { y: -15, scaleY: 1.05, duration: 0.4, ease: "power2.out" })
          .to(idol, { y: 0, scaleY: 1, duration: 0.3, ease: "bounce.out" })
          .to(idol, { x: 5, rotation: 3, duration: 0.5, ease: "sine.inOut" })
          .to(idol, { x: -5, rotation: -3, duration: 0.5, ease: "sine.inOut" })
          .to(idol, { x: 0, rotation: 0, duration: 0.4, ease: "sine.inOut" });

        idol.addEventListener('mouseenter', () => {
          gsap.to(idol, { rotationY: "+=360", duration: 1, ease: "power2.out" });
        });
        idol.addEventListener('click', () => {
          gsap.to(idol, { y: -50, duration: 0.3, yoyo: true, repeat: 1, ease: "power1.out" });
        });
      });
    });
    return () => ctx.revert();
  }, []);

  const togglePlay = () => {
    if (ytRef.current && ytRef.current.contentWindow) {
      ytRef.current.contentWindow.postMessage(JSON.stringify({
        event: 'command',
        func: isPlaying ? 'pauseVideo' : 'playVideo',
        args: []
      }), '*');
      setIsPlaying(!isPlaying);
    }
  };

  // Audience Canvas Animation (Lightstick SVGs)
  useEffect(() => {
    if (!canvasRef.current || !showLightsticks) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;

    const resize = () => {
      const isMobile = window.innerWidth < 768;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const lsCanvas = document.createElement('canvas');
    lsCanvas.width = 40;
    lsCanvas.height = 80;
    const lsCtx = lsCanvas.getContext('2d');
    
    // Draw the lightstick handle on the offscreen canvas
    lsCtx.fillStyle = '#1f2937';
    lsCtx.roundRect ? lsCtx.roundRect(16, 32, 8, 36, 4) : lsCtx.fillRect(16, 32, 8, 36);
    lsCtx.fillStyle = '#ef4444';
    lsCtx.beginPath();
    lsCtx.arc(20, 46, 1.5, 0, Math.PI * 2);
    lsCtx.fill();
    lsCtx.fillStyle = '#4b5563';
    lsCtx.beginPath();
    lsCtx.moveTo(12, 32);
    lsCtx.quadraticCurveTo(20, 24, 28, 32);
    lsCtx.fill();
    lsCtx.fillStyle = 'rgba(107, 114, 128, 0.5)';
    lsCtx.beginPath();
    lsCtx.moveTo(17, 14);
    lsCtx.lineTo(13, 18);
    lsCtx.lineTo(13, 28);
    lsCtx.lineTo(17, 24);
    lsCtx.closePath();
    lsCtx.fill();
    lsCtx.beginPath();
    lsCtx.moveTo(23, 14);
    lsCtx.lineTo(27, 18);
    lsCtx.lineTo(27, 28);
    lsCtx.lineTo(23, 24);
    lsCtx.closePath();
    lsCtx.fill();

    const isMobile = window.innerWidth < 768;
    const cols = isMobile ? 9 : 15;
    const rows = 4;

    let lightsticks = [];
    const cellW = canvas.width / cols;
    // Prevent top clipping by ensuring minimum Y is far enough down
    const minY = 70; 
    const maxY = canvas.height + 20;
    const availableH = Math.max(10, maxY - minY);
    const cellH = availableH / rows;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        // Back rows (lower r) have smaller scale
        const scale = 0.5 + (r / rows) * 0.4 + (Math.random() * 0.1); 
        
        // Base coordinate is center of the cell
        const baseX = c * cellW + (cellW * 0.5);
        const baseY = minY + r * cellH + (cellH * 0.5);
        
        // Add minimal random offset to look natural but prevent overlapping
        const x = baseX + ((Math.random() - 0.5) * cellW * 0.5);
        const y = baseY + ((Math.random() - 0.5) * cellH * 0.5);
        
        lightsticks.push({
          x: x,
          y: y,
          scale: scale,
          velocity: Math.random() * 0.015 + 0.01, // Slower bounce
          offset: Math.random() * Math.PI * 2,
          wobble: Math.random() * 0.04 // Slower wobble
        });
      }
    }

    // Sort by scale so smaller (distant) lightsticks are drawn first in the background
    lightsticks.sort((a, b) => a.scale - b.scale);

    const render = (time) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const colorIndex = Math.floor(Date.now() / 2000) % LIGHTSTICK_COLORS.length;
      const globalColor = LIGHTSTICK_COLORS[colorIndex];
      
      lightsticks.forEach(ls => {
        const bounceY = Math.sin(time * ls.velocity + ls.offset) * 8; // Shorter bounce height
        const rotate = Math.cos(time * ls.velocity + ls.offset) * ls.wobble;
        
        ctx.save();
        ctx.translate(ls.x, ls.y + bounceY);
        ctx.scale(ls.scale, ls.scale);
        ctx.rotate(rotate);
        
        // Draw the glowing bulb
        ctx.beginPath();
        ctx.arc(0, -20, 14, 0, Math.PI * 2);
        ctx.fillStyle = globalColor;
        ctx.shadowBlur = 20;
        ctx.shadowColor = globalColor;
        ctx.fill();
        ctx.shadowBlur = 0; // reset
        
        // Draw the white inner bulb
        ctx.beginPath();
        ctx.arc(0, -20, 8, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fill();

        // Draw the pre-rendered handle
        ctx.drawImage(lsCanvas, -20, -40);
        
        ctx.restore();
      });
      
      animationId = requestAnimationFrame(render);
    };
    render(0);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, [showLightsticks]);

  // Messages Loop
  useEffect(() => {
    if (isFinalMoment) return;
    const interval = setInterval(() => {
      setMessageIndex(prev => (prev + 1) % ROMANTIC_MESSAGES.length);
    }, 5000); 
    return () => clearInterval(interval);
  }, [isFinalMoment]);

  // Confetti Loop
  useEffect(() => {
    if (isFinalMoment) return;
    const interval = setInterval(() => {
      confetti({
        particleCount: 80,
        spread: 120,
        origin: { y: 0.1 },
        colors: ['#5B2C87', '#6F42C1', '#A855F7', '#ffffff'],
        zIndex: 50
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [isFinalMoment]);

  // Camera Controls
  useEffect(() => {
    if (!stageRef.current) return;
    let x = 0, y = 0, scale = 1;
    
    const isMobile = window.innerWidth < 768;
    const zoomScale = isMobile ? 1.3 : 1.5;

    switch(cameraMode) {
      case 'left': x = '20%'; scale = 1.2; break;
      case 'right': x = '-20%'; scale = 1.2; break;
      case 'zoom': y = '10%'; scale = zoomScale; break;
      case 'center': default: x = 0; y = 0; scale = 1; break;
    }

    gsap.to(stageRef.current, { x, y, scale, duration: 2, ease: "power3.inOut" });
  }, [cameraMode]);

  const triggerFinalMoment = () => {
    setIsFinalMoment(true);
    setShowLightsticks(false);
    
    if (ytRef.current && ytRef.current.contentWindow) {
      setTimeout(() => {
        ytRef.current.contentWindow.postMessage(JSON.stringify({
          event: 'command',
          func: 'pauseVideo',
          args: []
        }), '*');
      }, 5000);
    }

    const isMobile = window.innerWidth < 768;
    gsap.to(stageRef.current, { scale: isMobile ? 1.4 : 1.8, y: '10%', duration: 10, ease: "power1.inOut" });

    setTimeout(() => {
      setShowFinishButton(true);
    }, 4000);
  };

  return (
    <div ref={containerRef} className="w-full h-full flex flex-col relative overflow-hidden bg-[#050510] text-white">
      
      {/* Dynamic Background Stars */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 animate-[spin_120s_linear_infinite] mix-blend-screen pointer-events-none" />

      {/* Hidden YouTube Video for Audio */}
      <div className="absolute opacity-0 pointer-events-none w-0 h-0 overflow-hidden">
        <iframe 
          ref={ytRef}
          width="10" 
          height="10" 
          src="https://www.youtube.com/embed/RBaSiVjtKR4?enablejsapi=1&autoplay=1&mute=0" 
          title="BTS Audio"
          frameBorder="0" 
          allow="autoplay; encrypted-media" 
        ></iframe>
      </div>

      {/* Main Stage Container (Affected by Camera) - Now FULL SCREEN COVER */}
      <div ref={stageRef} className="absolute inset-0 flex flex-col items-center justify-center transform-origin-bottom">
        
        {/* Stage PNG Image - object-cover to fill the entire screen */}
        <img 
          src="/stage.png" 
          alt="Concert Stage" 
          className={`absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-[3s] ${isFinalMoment ? 'opacity-30' : 'opacity-100'}`}
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.parentElement.innerHTML += `<div class="absolute inset-0 flex items-center justify-center border-2 border-dashed border-purple-main text-purple-300 font-bold z-10 bg-black/50">Stage Image Placeholder (public/stage.png)</div>`;
          }}
        />

        {/* Relative container to hold idols and screens in proportion to the stage center */}
        <div className="relative w-full h-full flex flex-col items-center justify-center max-w-7xl z-10">
          
          {/* LED Screen Text Overlay (Positioned carefully over the center screen area of the stage) */}
          <div className="absolute top-[25%] md:top-[30%] w-[80%] md:w-[60%] h-[30%] flex flex-col items-center justify-center text-center z-15">
            {!isFinalMoment ? (
              <h2 key={messageIndex} className="font-serif text-xl md:text-4xl lg:text-5xl text-white drop-shadow-[0_0_20px_#A855F7] animate-[fadeIn_1s_ease-out] font-bold">
                {ROMANTIC_MESSAGES[messageIndex]}
              </h2>
            ) : (
              <div className="flex flex-col gap-2 md:gap-4 animate-[fadeIn_3s_ease-out] delay-1000 bg-black/50 p-6 rounded-2xl backdrop-blur-md border border-purple-main/50">
                <h1 className="font-serif text-3xl md:text-5xl lg:text-7xl text-purple-light drop-shadow-[0_0_30px_#A855F7] font-bold">
                  I Purple You 💜
                </h1>
                <h2 className="font-serif text-xl md:text-3xl lg:text-5xl text-white">
                  Happy Birthday Nida
                </h2>
                <p className="text-sm md:text-xl lg:text-2xl text-purple-300 italic mt-2">
                  Thank you for loving us.
                </p>
              </div>
            )}
          </div>

          {/* 7 Idol Performers positioned on the stage floor in 4-3 formation */}
          <div className={`absolute bottom-[22%] md:bottom-[20%] w-[95%] md:w-[85%] flex flex-col items-center justify-end z-20 transition-all duration-[3s] ${isFinalMoment ? 'opacity-0 scale-90' : 'opacity-100'}`}>
            
            {/* Back Row: 4 Idols */}
            <div className="w-full flex justify-between items-end z-20 px-2 md:px-0">
              {IDOLS.slice(0, 4).map((idol, idx) => (
                <div 
                  key={idol.id}
                  ref={el => idolsRef.current[idx] = el}
                  className="relative w-[23%] md:w-auto h-auto md:h-[40vh] aspect-[1/2] flex items-end justify-center group cursor-pointer"
                >
                  <div className="absolute inset-x-0 bottom-0 h-[80%] bg-gradient-to-t from-purple-main to-transparent rounded-t-full opacity-0 mix-blend-screen blur-md group-hover:opacity-60 transition-opacity duration-300" />
                  <img 
                    src={idol.src} 
                    alt={idol.name} 
                    className="relative w-full h-full object-contain drop-shadow-[0_0_25px_rgba(168,85,247,0.8)] origin-bottom"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML += `<div class="w-full h-full flex items-center justify-center text-[8px] md:text-xs text-purple-300 font-bold border border-dashed border-purple-main rounded-t-full bg-black/50 backdrop-blur-sm">${idol.name}</div>`;
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Front Row: 3 Idols (Overlapping back row slightly) */}
            <div className="w-[70%] md:w-[60%] flex justify-between items-end z-30 mt-[-15%] md:mt-[-5%]">
              {IDOLS.slice(4, 7).map((idol, idx) => {
                const globalIdx = idx + 4;
                return (
                  <div 
                    key={idol.id}
                    ref={el => idolsRef.current[globalIdx] = el}
                    className="relative w-[30%] md:w-auto h-auto md:h-[40vh] aspect-[1/2] flex items-end justify-center group cursor-pointer"
                  >
                    <div className="absolute inset-x-0 bottom-0 h-[80%] bg-gradient-to-t from-purple-main to-transparent rounded-t-full opacity-0 mix-blend-screen blur-md group-hover:opacity-60 transition-opacity duration-300" />
                    <img 
                      src={idol.src} 
                      alt={idol.name} 
                      className="relative w-full h-full object-contain drop-shadow-[0_0_25px_rgba(168,85,247,0.8)] origin-bottom"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentElement.innerHTML += `<div class="w-full h-full flex items-center justify-center text-[8px] md:text-xs text-purple-300 font-bold border border-dashed border-purple-main rounded-t-full bg-black/50 backdrop-blur-sm">${idol.name}</div>`;
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Foreground Audience Canvas with Lightsticks */}
      <canvas 
        ref={canvasRef} 
        className={`absolute bottom-0 left-0 w-full h-[30%] md:h-[50%] z-30 pointer-events-none transition-opacity duration-[3s] ${isFinalMoment ? 'opacity-0' : 'opacity-100'}`} 
      />

      {/* Final Moment Finish Button */}
      {isFinalMoment && showFinishButton && (
        <div className="absolute bottom-16 md:bottom-20 left-1/2 -translate-x-1/2 z-[100] animate-[fadeIn_1s_ease-out]">
          <button 
            onClick={nextScene}
            className="px-10 py-4 bg-purple-dark border border-purple-main hover:bg-purple-main shadow-[0_0_40px_#A855F7] rounded-full text-white font-bold text-xl transition-all"
          >
            Finish
          </button>
        </div>
      )}

      {/* UI Overlay - Compacted for mobile */}
      {!isFinalMoment && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 flex flex-row items-center justify-between gap-2 md:gap-4 bg-black/80 backdrop-blur-xl p-2 md:p-4 rounded-xl md:rounded-2xl border border-purple-900 shadow-[0_0_30px_rgba(168,85,247,0.2)] w-[95%] md:w-auto">
          
          <div className="flex items-center gap-2 md:gap-4 border-r border-purple-800 pr-2 md:pr-4">
            <button onClick={togglePlay} className="p-2 md:p-3 bg-purple-main rounded-full hover:bg-purple-light transition-colors shadow-[0_0_15px_#A855F7]">
              {isPlaying ? <Pause size={14} className="md:w-5 md:h-5" /> : <Play size={14} className="md:w-5 md:h-5 ml-0.5" />}
            </button>
            <div className="flex flex-col hidden sm:flex">
              <span className="text-[10px] md:text-xs text-purple-300 font-bold uppercase tracking-wider">Now Playing</span>
              <span className="text-[10px] md:text-sm font-serif truncate max-w-[100px] md:max-w-[200px]">BTS - Body to Body</span>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4 pl-1 md:pl-0">
            <div className="flex items-center gap-1 md:gap-2 px-1 md:px-4 border-r border-purple-800">
              <Video size={14} className="text-purple-400 md:w-4 md:h-4" />
              <select 
                className="bg-transparent text-[10px] md:text-sm focus:outline-none cursor-pointer text-purple-100"
                value={cameraMode}
                onChange={(e) => setCameraMode(e.target.value)}
              >
                <option value="center" className="bg-black">Center</option>
                <option value="left" className="bg-black">Left</option>
                <option value="right" className="bg-black">Right</option>
                <option value="zoom" className="bg-black">Zoom</option>
              </select>
            </div>

            <div className="flex items-center gap-1 md:gap-4">
              <button 
                onClick={() => setShowLightsticks(!showLightsticks)}
                className={`text-[8px] md:text-xs px-2 md:px-3 py-1 md:py-1.5 rounded-full border transition-colors ${showLightsticks ? 'bg-purple-900 border-purple-main text-white' : 'border-gray-600 text-gray-400'}`}
              >
                ARMY
              </button>
              <button 
                onClick={triggerFinalMoment}
                className="text-[8px] md:text-xs px-2 md:px-4 py-1 md:py-1.5 bg-red-900/50 hover:bg-red-600 border border-red-500 rounded-full transition-colors font-bold uppercase tracking-widest text-white shadow-[0_0_15px_rgba(239,68,68,0.3)] whitespace-nowrap"
              >
                Final
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Scene6Stage;
