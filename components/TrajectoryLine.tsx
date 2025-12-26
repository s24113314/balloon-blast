
import React from 'react';

interface TrajectoryLineProps {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  isGhost?: boolean;
  jitter?: boolean;
}

const TrajectoryLine: React.FC<TrajectoryLineProps> = ({ startX, startY, endX, endY, isGhost, jitter }) => {
  const angle = Math.atan2(endY - startY, endX - startX);
  const dist = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));

  return (
    <div
      className={`absolute pointer-events-none origin-left transition-opacity duration-1000 ${
        isGhost ? 'opacity-20' : 'opacity-60'
      } ${jitter ? 'animate-pulse' : ''}`}
      style={{
        left: startX,
        top: startY,
        width: dist,
        height: '2px',
        transform: `rotate(${angle}rad) ${jitter ? `translateY(${Math.sin(Date.now() / 50) * 2}px)` : ''}`,
        background: isGhost 
          ? 'linear-gradient(to right, transparent, #94a3b8)' 
          : 'repeating-linear-gradient(to right, #ec4899, #ec4899 10px, transparent 10px, transparent 20px)',
        zIndex: isGhost ? 10 : 40,
      }}
    />
  );
};

export default TrajectoryLine;
