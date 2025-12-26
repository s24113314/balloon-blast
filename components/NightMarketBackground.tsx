
import React from 'react';

const NightMarketBackground: React.FC = () => {
  // Generate random stars for the upper sky
  const stars = Array.from({ length: 160 }).map((_, i) => ({
    id: i,
    top: `${Math.random() * 65}%`,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 2 + 0.4,
    opacity: Math.random() * 0.7 + 0.3,
    delay: Math.random() * 5,
  }));

  // Generate shadowy stalls for the "highway" perspective (vanishing point logic)
  const stallSilhouettes = Array.from({ length: 12 }).map((_, i) => {
    const side = i % 2 === 0 ? 'left' : 'right';
    const depth = Math.floor(i / 2); 
    const depthFactor = depth / 6;
    
    // vanish towards center
    const horizontalBase = side === 'left' ? -5 : 105;
    const shift = side === 'left' ? depthFactor * 40 : -depthFactor * 40;
    const left = `${horizontalBase + shift}%`;
    
    // Random height/width for variety
    const width = 300 - (depthFactor * 150);
    const height = 400 - (depthFactor * 250);

    return {
      id: i,
      left,
      depth,
      scale: 1.2 - (depthFactor * 0.6),
      blur: 2 + (depthFactor * 10),
      opacity: 0.8 - (depthFactor * 0.4),
      width,
      height,
      glowColor: i % 3 === 0 ? 'rgba(236, 72, 153, 0.4)' : (i % 3 === 1 ? 'rgba(59, 130, 246, 0.4)' : 'rgba(234, 179, 8, 0.4)')
    };
  });

  // Generate people silhouettes (shadows)
  const people = Array.from({ length: 25 }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 110 - 5}%`,
    bottom: `${-20 - Math.random() * 40}px`,
    scale: 0.6 + Math.random() * 0.8,
    delay: Math.random() * 10,
    speed: 15 + Math.random() * 20,
    height: 120 + Math.random() * 80,
    width: 60 + Math.random() * 40,
    opacity: 0.4 + Math.random() * 0.4
  }));

  return (
    <div className="fixed inset-0 -z-10 bg-[#010413] overflow-hidden">
      {/* 1. Deep Space Sky with Twinkling Stars */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#010208] via-[#020617] to-[#0a0f1e]" />
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute bg-white rounded-full animate-pulse"
            style={{
              top: star.top,
              left: star.left,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              animationDelay: `${star.delay}s`,
              animationDuration: `${2.5 + Math.random() * 4}s`,
              boxShadow: star.size > 1.5 ? `0 0 8px rgba(255,255,255,0.9)` : 'none',
            }}
          />
        ))}
      </div>

      {/* 2. Side Silhouetted Stalls (Highway Perspective) */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        {stallSilhouettes.map((stall) => (
          <div
            key={stall.id}
            className="absolute bottom-0 bg-slate-950 transition-all duration-1000"
            style={{
              left: stall.left,
              transform: `translateX(-50%) scale(${stall.scale})`,
              width: `${stall.width}px`,
              height: `${stall.height}px`,
              filter: `blur(${stall.blur}px)`,
              opacity: stall.opacity,
              boxShadow: `0 -10px 40px ${stall.glowColor}`,
              borderRadius: '20px 20px 0 0',
              borderTop: '2px solid rgba(255,255,255,0.05)'
            }}
          >
            {/* Fake signs / lights inside the "shadow" structures */}
            <div className="absolute top-10 left-1/2 -translate-x-1/2 w-3/4 h-1/4 bg-white/5 blur-xl rounded-full" />
            <div className="absolute bottom-1/2 left-4 right-4 h-1 bg-white/10 blur-sm" />
          </div>
        ))}
      </div>

      {/* 3. Overhead Lantern Strings */}
      <div className="absolute top-0 w-full h-[75%] z-20 pointer-events-none overflow-hidden">
        {[0, 1].map((rowIdx) => {
          const rowY = 5 + rowIdx * 20;
          const lanternCount = 12 - rowIdx;
          const scale = 1.1 - rowIdx * 0.3;

          return (
            <div 
              key={`row-${rowIdx}`} 
              className="absolute w-[150%] -left-[25%]"
              style={{ top: `${rowY}%` }}
            >
              <svg className="absolute w-full h-32 -top-12 overflow-visible opacity-10" viewBox="0 0 1400 100">
                <path d="M0 30 Q700 90 1400 30" stroke="#fff" fill="none" strokeWidth="1" />
              </svg>
              
              <div className="flex justify-around items-start w-full px-32">
                {Array.from({ length: lanternCount }).map((_, i) => (
                  <div 
                    key={`lan-${rowIdx}-${i}`} 
                    className="flex flex-col items-center animate-lantern-sway"
                    style={{ 
                      animationDelay: `${i * 0.6}s`,
                      opacity: 0.8 - rowIdx * 0.3,
                      transform: `scale(${scale})`
                    }}
                  >
                    <div className="w-[1px] h-10 bg-white/20" />
                    <div className="relative w-10 h-14 bg-red-700 rounded-3xl shadow-[0_0_30px_rgba(220,38,38,0.6)] border-y border-yellow-500/30 overflow-hidden">
                      <div className="absolute inset-2 bg-orange-500/30 blur-md rounded-full animate-pulse" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* 4. Crowd Silhouettes (Shadows of people) */}
      <div className="absolute bottom-0 w-full h-64 z-30 pointer-events-none overflow-hidden">
        {people.map((person) => (
          <div
            key={person.id}
            className="absolute bg-black/90 rounded-t-full animate-person-drift"
            style={{
              left: person.left,
              bottom: person.bottom,
              width: `${person.width}px`,
              height: `${person.height}px`,
              transform: `scale(${person.scale})`,
              opacity: person.opacity,
              animationDuration: `${person.speed}s`,
              animationDelay: `-${person.delay}s`,
              filter: 'blur(2px)'
            }}
          >
             {/* Head */}
             <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-3/4 h-1/2 bg-black rounded-full" />
             {/* Shoulder slope */}
             <div className="absolute top-0 inset-x-0 h-1/2 bg-black rounded-t-[40px]" />
          </div>
        ))}
      </div>

      {/* 5. Atmospheric Horizon Glow & Ground Mist */}
      <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-black via-[#010208]/90 to-transparent z-40" />
      
      {/* Soft floor highlights from "off-screen" stalls */}
      <div className="absolute bottom-0 left-0 w-1/3 h-48 bg-pink-900/10 blur-[100px]" />
      <div className="absolute bottom-0 right-0 w-1/3 h-48 bg-blue-900/10 blur-[100px]" />

      <style>{`
        @keyframes lantern-sway {
          0%, 100% { transform: rotate(-5deg); }
          50% { transform: rotate(5deg); }
        }
        .animate-lantern-sway {
          animation: lantern-sway 7s ease-in-out infinite;
          transform-origin: top center;
        }
        @keyframes person-drift {
          0% { transform: translateX(-20px) scale(var(--tw-scale-x)); }
          50% { transform: translateX(20px) scale(var(--tw-scale-x)); }
          100% { transform: translateX(-20px) scale(var(--tw-scale-x)); }
        }
        .animate-person-drift {
          animation: person-drift ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default NightMarketBackground;
