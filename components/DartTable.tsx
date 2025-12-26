
import React from 'react';

// --- TOY COMPONENTS ---

const MiniDuck = ({ scale = 1 }) => (
  <svg viewBox="0 0 40 40" className="drop-shadow-md" style={{ width: 32 * scale, height: 32 * scale }}>
    <path d="M10 25 Q10 35 25 35 Q35 35 35 25 Q35 15 25 15 L22 15 Q22 5 12 5 Q2 5 2 15 Q2 25 10 25" fill="#facc15" />
    <circle cx="15" cy="12" r="1.5" fill="#1e293b" />
    <path d="M2 15 Q-2 15 0 18 L4 18 Z" fill="#f97316" />
  </svg>
);

const MiniCar = ({ scale = 1, color = "#ef4444" }) => (
  <svg viewBox="0 0 40 40" className="drop-shadow-md" style={{ width: 40 * scale, height: 32 * scale }}>
    <rect x="5" y="20" width="30" height="10" rx="4" fill={color} />
    <path d="M10 20 L15 10 L25 10 L30 20 Z" fill="#93c5fd" />
    <circle cx="10" cy="30" r="4" fill="#1e293b" />
    <circle cx="30" cy="30" r="4" fill="#1e293b" />
  </svg>
);

const MiniBall = ({ scale = 1, color = "#3b82f6" }) => (
  <svg viewBox="0 0 40 40" className="drop-shadow-md" style={{ width: 28 * scale, height: 28 * scale }}>
    <circle cx="20" cy="20" r="15" fill={color} />
    <path d="M5 20 Q20 5 35 20" stroke="white" strokeWidth="2" fill="none" opacity="0.4" />
  </svg>
);

const MiniYoyo = ({ scale = 1, color = "#8b5cf6" }) => (
  <svg viewBox="0 0 40 40" className="drop-shadow-md" style={{ width: 24 * scale, height: 24 * scale }}>
    <circle cx="20" cy="20" r="12" fill={color} />
    <circle cx="20" cy="20" r="10" fill="rgba(0,0,0,0.2)" />
    <path d="M20 8 L20 15" stroke="white" strokeWidth="1" opacity="0.6" />
    <circle cx="20" cy="20" r="3" fill="#ede9fe" />
  </svg>
);

const MiniRobot = ({ scale = 1, color = "#94a3b8" }) => (
  <svg viewBox="0 0 40 50" className="drop-shadow-md" style={{ width: 36 * scale, height: 45 * scale }}>
    <rect x="10" y="15" width="20" height="20" rx="2" fill={color} />
    <rect x="12" y="5" width="16" height="10" rx="3" fill={color} />
    <circle cx="16" cy="10" r="1.5" fill="#ef4444" />
    <circle cx="24" cy="10" r="1.5" fill="#ef4444" />
    <rect x="8" y="18" width="4" height="12" rx="1" fill="#64748b" />
    <rect x="28" y="18" width="4" height="12" rx="1" fill="#64748b" />
    <path d="M18 2 L22 2 L20 6 Z" fill="#facc15" />
  </svg>
);

const MiniCat = ({ scale = 1, color = "#f8fafc" }) => (
  <svg viewBox="0 0 40 40" className="drop-shadow-md" style={{ width: 32 * scale, height: 32 * scale }}>
    <circle cx="20" cy="25" r="12" fill={color} />
    <circle cx="20" cy="15" r="10" fill={color} />
    <path d="M12 10 L15 18 L9 18 Z" fill={color} />
    <path d="M28 10 L25 18 L31 18 Z" fill={color} />
    <circle cx="17" cy="14" r="1" fill="#1e293b" />
    <circle cx="23" cy="14" r="1" fill="#1e293b" />
    <path d="M19 18 Q20 19 21 18" stroke="#f43f5e" strokeWidth="1" fill="none" />
  </svg>
);

const MiniNotebook = ({ scale = 1, color = "#fbcfe8" }) => (
  <svg viewBox="0 0 40 50" className="drop-shadow-md" style={{ width: 30 * scale, height: 38 * scale }}>
    <rect x="5" y="5" width="30" height="40" rx="2" fill={color} />
    <rect x="5" y="5" width="6" height="40" fill="rgba(0,0,0,0.1)" />
    <path d="M5 10 L11 10 M5 15 L11 15 M5 20 L11 20 M5 25 L11 25 M5 30 L11 30 M5 35 L11 35 M5 40 L11 40" stroke="white" strokeWidth="1" />
    <rect x="15" y="15" width="12" height="2" fill="white" opacity="0.6" />
    <rect x="15" y="20" width="15" height="2" fill="white" opacity="0.6" />
    <rect x="15" y="25" width="10" height="2" fill="white" opacity="0.6" />
  </svg>
);

const MiniKeychain = ({ scale = 1, color = "#fb7185" }) => (
  <svg viewBox="0 0 40 50" className="drop-shadow-md" style={{ width: 28 * scale, height: 35 * scale }}>
    <circle cx="20" cy="10" r="5" fill="none" stroke="#94a3b8" strokeWidth="2" />
    <path d="M20 15 L20 20" stroke="#94a3b8" strokeWidth="2" />
    <rect x="10" y="20" width="20" height="20" rx="4" fill={color} />
    <circle cx="20" cy="30" r="5" fill="white" opacity="0.3" />
  </svg>
);

const MiniBunny = ({ scale = 1, color = "#fff" }) => (
  <svg viewBox="0 0 40 40" className="drop-shadow-md" style={{ width: 32 * scale, height: 32 * scale }}>
    <path d="M12 5 Q10 15 15 20 L15 25 Z" fill={color} />
    <path d="M28 5 Q30 15 25 20 L25 25 Z" fill={color} />
    <circle cx="20" cy="25" r="10" fill={color} />
    <circle cx="17" cy="22" r="1" fill="#000" />
    <circle cx="23" cy="22" r="1" fill="#000" />
    <path d="M19 25 Q20 26 21 25" stroke="#f472b6" strokeWidth="1" />
  </svg>
);

const MiniHeart = ({ scale = 1, color = "#ef4444" }) => (
  <svg viewBox="0 0 40 40" className="drop-shadow-md" style={{ width: 24 * scale, height: 24 * scale }}>
    <path d="M20 35 Q5 20 10 10 Q15 5 20 12 Q25 5 30 10 Q35 20 20 35 Z" fill={color} />
  </svg>
);

const MiniTeddy = ({ scale = 1, color = "#92400e" }) => (
  <svg viewBox="0 0 40 40" className="drop-shadow-md" style={{ width: 34 * scale, height: 34 * scale }}>
    <circle cx="12" cy="12" r="6" fill={color} />
    <circle cx="28" cy="12" r="6" fill={color} />
    <circle cx="20" cy="24" r="12" fill={color} />
    <circle cx="20" cy="18" r="10" fill={color} />
    <ellipse cx="20" cy="22" rx="5" ry="4" fill="#fef3c7" />
    <circle cx="17" cy="16" r="1" fill="#1e1b4b" />
    <circle cx="23" cy="16" r="1" fill="#1e1b4b" />
  </svg>
);

const MiniPlane = ({ scale = 1, color = "#ef4444" }) => (
  <svg viewBox="0 0 40 40" className="drop-shadow-md" style={{ width: 36 * scale, height: 32 * scale }}>
    <path d="M5 25 L35 25 L35 20 Q35 15 20 15 L10 15 L5 25 Z" fill={color} />
    <path d="M15 15 L20 5 L25 15 Z" fill={color} />
    <rect x="25" y="23" width="10" height="4" fill="rgba(0,0,0,0.2)" />
  </svg>
);

const MiniStar = ({ scale = 1, color = "#fde047" }) => (
  <svg viewBox="0 0 40 40" className="drop-shadow-md" style={{ width: 28 * scale, height: 28 * scale }}>
    <path d="M20 5 L24 15 L35 15 L26 22 L30 32 L20 25 L10 32 L14 22 L5 15 L16 15 Z" fill={color} />
  </svg>
);

const MiniDino = ({ scale = 1, color = "#22c55e" }) => (
  <svg viewBox="0 0 40 40" className="drop-shadow-md" style={{ width: 34 * scale, height: 34 * scale }}>
    <path d="M10 30 Q10 15 25 15 L35 15 L35 25 Q35 35 25 35 L15 35 Q10 35 10 30" fill={color} />
    <path d="M25 15 Q25 5 15 5 Q5 5 5 15 L5 25" fill={color} />
    <circle cx="12" cy="10" r="1.5" fill="#1e293b" />
    <path d="M28 15 L32 10 L35 15" fill={color} />
  </svg>
);

// --- COMPONENT ---

const DartTable: React.FC = () => {
  const segments = Array.from({ length: 6 });
  const dartsPerCup = Array.from({ length: 10 });

  const cupColors = [
    { body: 'bg-slate-100', lip: 'bg-slate-200', border: 'border-slate-300' },
    { body: 'bg-green-700', lip: 'bg-green-600', border: 'border-green-800' },
    { body: 'bg-yellow-600', lip: 'bg-yellow-500', border: 'border-yellow-700' },
    { body: 'bg-blue-700', lip: 'bg-blue-600', border: 'border-blue-800' },
    { body: 'bg-violet-700', lip: 'bg-violet-600', border: 'border-violet-800' },
  ];

  const dartFletchingColors = [
    { primary: '#ef4444', secondary: '#dc2626' },
    { primary: '#22c55e', secondary: '#16a34a' },
    { primary: '#3b82f6', secondary: '#2563eb' },
    { primary: '#eab308', secondary: '#ca8a04' },
    { primary: '#8b5cf6', secondary: '#7c3aed' },
    { primary: '#f97316', secondary: '#ea580c' },
    { primary: '#06b6d4', secondary: '#0891b2' },
  ];

  // Generating a highly dense, continuous row of toys
  const toyTypes = ['duck', 'car', 'ball', 'yoyo', 'robot', 'cat', 'plane', 'star', 'dino', 'notebook', 'keychain', 'bunny', 'heart', 'teddy'];
  const colors = ["#ef4444", "#3b82f6", "#22c55e", "#facc15", "#8b5cf6", "#f97316", "#fb7185", "#ec4899", "#06b6d4", "#f8fafc", "#94a3b8"];

  const generateToyRow = () => {
    const items = [];
    
    // 1. DENSE FRONT LINE (Directly on pink stripe)
    const toyCount = 130; 
    const startX = -650; 
    const endX = 650;
    const step = (endX - startX) / (toyCount - 1);

    for (let i = 0; i < toyCount; i++) {
      const type = toyTypes[Math.floor(Math.random() * toyTypes.length)];
      items.push({
        type,
        scale: 1.5 + Math.random() * 0.4, 
        rot: (Math.random() - 0.5) * 10,
        y: -5 - (Math.random() * 5), // Reduced height to keep away from balloons
        x: startX + (i * step),
        color: colors[Math.floor(Math.random() * colors.length)],
        zIndexOffset: Math.floor(Math.random() * 10)
      });
    }

    // 2. AUNTIE'S SIDE (Extreme Left Edge) - Below her duster area
    const auntieSideCount = 45;
    for (let i = 0; i < auntieSideCount; i++) {
        items.push({
            type: toyTypes[Math.floor(Math.random() * toyTypes.length)],
            scale: 1.4 + Math.random() * 0.5,
            rot: (Math.random() - 0.5) * 45,
            y: -15 - (Math.random() * 10), // Reduced height
            x: -620 + (Math.random() * 180), 
            color: colors[Math.floor(Math.random() * colors.length)],
            zIndexOffset: -5
        });
    }

    // 3. PRIZE METER SIDE (Extreme Right Edge) - Below the meter area
    const meterSideCount = 45;
    for (let i = 0; i < meterSideCount; i++) {
        items.push({
            type: toyTypes[Math.floor(Math.random() * toyTypes.length)],
            scale: 1.4 + Math.random() * 0.5,
            rot: (Math.random() - 0.5) * 45,
            y: -15 - (Math.random() * 10), // Reduced height
            x: 440 + (Math.random() * 180), 
            color: colors[Math.floor(Math.random() * colors.length)],
            zIndexOffset: -5
        });
    }

    // 4. RICH BACKFILL (The depth layer)
    const backFillCount = 60;
    for (let i = 0; i < backFillCount; i++) {
        items.push({
          type: toyTypes[Math.floor(Math.random() * toyTypes.length)],
          scale: 1.2 + Math.random() * 0.4,
          rot: (Math.random() - 0.5) * 30,
          y: -25 - (Math.random() * 10), // Reduced height
          x: (Math.random() - 0.5) * 1300,
          color: colors[Math.floor(Math.random() * colors.length)],
          zIndexOffset: -20
        });
      }

    // 5. ADDITIONAL SMALL TOYS (Middle Concentration)
    // Adding smaller prize fillers in the central area for extra density
    const middleCount = 70;
    const midStartX = -350;
    const midEndX = 350;
    const midStep = (midEndX - midStartX) / (middleCount - 1);
    for (let i = 0; i < middleCount; i++) {
      const type = toyTypes[Math.floor(Math.random() * toyTypes.length)];
      items.push({
        type,
        scale: 0.8 + Math.random() * 0.5, // Specifically smaller "fillers"
        rot: (Math.random() - 0.5) * 40,
        y: -3 - (Math.random() * 12),
        x: midStartX + (i * midStep) + (Math.random() * 10 - 5),
        color: colors[Math.floor(Math.random() * colors.length)],
        zIndexOffset: 20 // Bring these smaller ones right to the very front
      });
    }
    
    return items;
  };

  const toyCollection = React.useMemo(() => generateToyRow(), []);

  const renderToy = (toy: any, index: number) => {
    const props = { scale: toy.scale, color: toy.color };
    let component;
    switch (toy.type) {
      case 'duck': component = <MiniDuck {...props} />; break;
      case 'car': component = <MiniCar {...props} />; break;
      case 'ball': component = <MiniBall {...props} />; break;
      case 'yoyo': component = <MiniYoyo {...props} />; break;
      case 'robot': component = <MiniRobot {...props} />; break;
      case 'cat': component = <MiniCat {...props} />; break;
      case 'plane': component = <MiniPlane {...props} />; break;
      case 'star': component = <MiniStar {...props} />; break;
      case 'dino': component = <MiniDino {...props} />; break;
      case 'notebook': component = <MiniNotebook {...props} />; break;
      case 'keychain': component = <MiniKeychain {...props} />; break;
      case 'bunny': component = <MiniBunny {...props} />; break;
      case 'heart': component = <MiniHeart {...props} />; break;
      case 'teddy': component = <MiniTeddy {...props} />; break;
      default: component = <MiniBall {...props} />;
    }

    return (
      <div 
        key={index} 
        className="absolute pointer-events-none"
        style={{ 
          left: `calc(50% + ${toy.x}px)`,
          top: `calc(0% + ${toy.y}px)`,
          transformOrigin: 'bottom center',
          transform: `translateX(-50%) rotate(${toy.rot}deg)`,
          zIndex: (toy.y < -35 ? 45 : 55) + (toy.zIndexOffset || 0)
        }}
      >
        {component}
      </div>
    );
  };

  return (
    <div className="absolute bottom-0 w-full h-56 z-40 pointer-events-none flex flex-col items-center justify-end">
      {/* Perspective Top Surface */}
      <div 
        className="relative w-[120%] h-24 bg-amber-900 border-b-2 border-amber-950 shadow-[0_-20px_50px_rgba(0,0,0,0.6)]"
        style={{ 
          transform: 'perspective(600px) rotateX(40deg)',
          marginBottom: '-30px'
        }}
      >
        <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/dark-wood.png')]"></div>
        <div className="absolute top-0 left-0 right-0 h-4 bg-amber-950 shadow-inner border-b border-white/10"></div>
        <div className="absolute bottom-0 left-0 right-0 h-4 bg-black/30"></div>
      </div>

      {/* Front Panel (The Stall Base) */}
      <div className="relative w-full h-40 bg-amber-950 border-t-8 border-pink-700 shadow-[0_-30px_60px_rgba(0,0,0,0.9)] flex flex-col items-center overflow-visible">
        <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/dark-wood.png')]"></div>
        
        {/* ULTRA DENSE TOY ROW - Occupying the entire pink line length from extreme left to extreme right */}
        <div className="absolute top-[-36px] left-0 right-0 h-10 pointer-events-none overflow-visible">
          {toyCollection.map((toy, i) => renderToy(toy, i))}
        </div>

        <div className="absolute inset-x-0 top-10 bottom-4 flex justify-around px-20 gap-4">
          {segments.map((_, i) => {
            const colors = cupColors[i % cupColors.length];
            return (
              <div key={i} className="relative w-32 h-full border-2 border-amber-900/50 rounded-lg bg-black/40 flex flex-col items-center justify-center">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>

                <div className="relative mt-8">
                  <div 
                    className={`relative w-14 h-16 ${colors.body} rounded-b-md border-x-2 ${colors.border} shadow-2xl overflow-visible`}
                    style={{ clipPath: 'polygon(0% 0%, 100% 0%, 85% 100%, 15% 100%)' }}
                  >
                    <div className={`absolute -top-0.5 -left-0.5 -right-0.5 h-2 ${colors.lip} rounded-full border-b ${colors.border}`}></div>
                  </div>
                  
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-16 h-16 pointer-events-none">
                    {dartsPerCup.map((_, dartIdx) => {
                      const row = dartIdx < 5 ? 0 : 1;
                      const col = dartIdx % 5;
                      const rot = (col - 2) * 10 + (row * 5); 
                      const offX = (col - 2) * 4; 
                      const offY = row * 4; 
                      
                      const fletchColor = dartFletchingColors[(i + dartIdx) % dartFletchingColors.length];
                      
                      return (
                        <div 
                          key={dartIdx} 
                          className="absolute bottom-0 left-1/2 w-4 h-12 origin-bottom"
                          style={{ 
                            transform: `translateX(calc(-50% + ${offX}px)) translateY(${offY}px) rotate(${rot}deg)`,
                            zIndex: 10 - row
                          }}
                        >
                          <svg viewBox="0 0 20 40" className="w-full h-full drop-shadow-sm">
                            <path d="M10 40 L10 10 M10 10 L2 2 L10 8 L18 2 L10 10" stroke="#78350f" strokeWidth="2.5" fill="none" />
                            <path d="M10 25 L2 15 L10 20 L18 15 Z" fill={fletchColor.primary} />
                            <path d="M10 18 L4 10 L10 14 L16 10 Z" fill={fletchColor.secondary} />
                          </svg>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DartTable;
