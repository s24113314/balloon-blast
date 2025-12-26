
import React from 'react';
import { Balloon as BalloonType } from '../types';
import { BALLOON_WIDTH, BALLOON_HEIGHT } from '../constants';

interface BalloonProps {
  balloon: BalloonType;
}

const Balloon: React.FC<BalloonProps> = ({ balloon }) => {
  if (balloon.isPopped) {
    return (
      <div 
        className="absolute flex items-center justify-center pointer-events-none z-10"
        style={{ 
          left: balloon.x, 
          top: balloon.y, 
          width: BALLOON_WIDTH, 
          height: BALLOON_HEIGHT 
        }}
      >
        {/* Satisfying POP text burst that fades away */}
        <div className="absolute balloon-pop text-white font-bungee text-lg neon-glow z-20">POP!</div>
      </div>
    );
  }

  return (
    <div
      className="absolute pointer-events-none group"
      style={{
        left: balloon.x,
        top: balloon.y,
        width: BALLOON_WIDTH,
        height: BALLOON_HEIGHT,
        filter: `drop-shadow(0 4px 12px ${balloon.color}66)`,
        transform: `rotate(${balloon.rotation}deg) scale(${balloon.scale})`,
        transition: 'transform 0.15s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      }}
    >
      <svg viewBox="0 0 100 130" className="w-full h-full drop-shadow-md">
        <defs>
          <radialGradient id={`grad-main-${balloon.id}`} cx="40%" cy="35%" r="60%">
            <stop offset="0%" stopColor="white" stopOpacity="0.3" />
            <stop offset="40%" stopColor={balloon.color} />
            <stop offset="100%" stopColor={getDarkerColor(balloon.color)} />
          </radialGradient>
          
          <filter id={`blur-${balloon.id}`}>
            <feGaussianBlur stdDeviation="2" />
          </filter>
        </defs>

        {/* Main Balloon Body */}
        <path
          d="M50 8 C25 8, 8 32, 8 58 C8 85, 28 112, 50 112 C72 112, 92 85, 92 58 C92 32, 75 8, 50 8 Z"
          fill={`url(#grad-main-${balloon.id})`}
        />

        {/* Glossy Reflection (Highlight) */}
        <ellipse 
          cx="35" cy="35" rx="12" ry="18" 
          fill="white" 
          fillOpacity="0.45" 
          transform="rotate(-15, 35, 35)"
          filter={`url(#blur-${balloon.id})`}
        />
        
        {/* Subtle secondary reflection */}
        <ellipse 
          cx="65" cy="80" rx="5" ry="10" 
          fill="white" 
          fillOpacity="0.15" 
          transform="rotate(10, 65, 80)"
          filter={`url(#blur-${balloon.id})`}
        />

        {/* Knot at bottom */}
        <path 
          d="M44 112 L56 112 L54 120 L46 120 Z" 
          fill={getDarkerColor(balloon.color)} 
        />
        
        {/* String */}
        <path
          d="M50 120 Q52 125, 50 135"
          stroke="rgba(255,255,255,0.4)"
          strokeWidth="1.5"
          fill="none"
        />
      </svg>
    </div>
  );
};

// Helper to darken colors for realistic depth
function getDarkerColor(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgb(${Math.max(0, r - 50)}, ${Math.max(0, g - 50)}, ${Math.max(0, b - 50)})`;
}

export default Balloon;
