
import React from 'react';
import { Balloon as BalloonType } from '../types';

interface ClockHolderProps {
  centerX: number;
  centerY: number;
  radius: number;
  balloons: BalloonType[];
  rotationSpeed: number;
  time: number;
  isClockwise: boolean;
}

const HAND_COLORS = [
  '#ef4444', // red
  '#f97316', // orange
  '#eab308', // yellow
  '#22c55e', // green
  '#3b82f6', // blue
  '#4f46e5', // indigo
  '#8b5cf6', // violet
  '#7dd3fc', // light blue
  '#be185d', // dark pink
  '#ec4899', // pink
];

const ClockHolder: React.FC<ClockHolderProps> = ({ 
  centerX, 
  centerY, 
  radius, 
  balloons, 
  rotationSpeed, 
  time,
  isClockwise 
}) => {
  const speed = isClockwise ? rotationSpeed : -rotationSpeed;

  return (
    <div className="absolute pointer-events-none" style={{ left: centerX, top: centerY, zIndex: 10 }}>
      {/* 10 Long Hands - now in specific sequence of colors */}
      {balloons.map((b, index) => {
        const phase = (time * speed) + (b.angleOffset || 0);
        const rotationDeg = phase * (180 / Math.PI);
        const handColor = HAND_COLORS[index % HAND_COLORS.length];

        return (
          <div 
            key={`hand-${b.id}`}
            className="absolute origin-left"
            style={{
              width: radius + 10, // Slightly longer to reach into the balloon
              height: '3px', 
              left: 0,
              top: '50%',
              marginTop: '-1.5px',
              transform: `rotate(${rotationDeg}deg)`,
              backgroundColor: handColor,
              boxShadow: '0 0 4px rgba(0,0,0,0.5)',
              zIndex: 1,
              borderRadius: '0 2px 2px 0'
            }}
          />
        );
      })}
    </div>
  );
};

export default ClockHolder;
