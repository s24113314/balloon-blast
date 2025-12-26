
import React from 'react';

interface DartVisualProps {
  className?: string;
  style?: React.CSSProperties;
}

const DartVisual: React.FC<DartVisualProps> = ({ className, style }) => {
  return (
    <div className={`pointer-events-none ${className}`} style={style}>
      <svg viewBox="0 0 100 30" className="w-full h-full drop-shadow-xl overflow-visible">
        {/* Metal Sharp Tip (Centered at Y=15, extends to X=100) */}
        <path d="M85 15 L100 15 L85 10 L85 20 Z" fill="#cbd5e1" />
        <rect x="75" y="14" width="10" height="2" fill="#94a3b8" />
        
        {/* Main Grip / Barrel */}
        <rect x="65" y="12" width="10" height="6" rx="1" fill="#475569" />
        
        {/* Wooden Body Shaft */}
        <rect x="30" y="13.5" width="35" height="3" fill="#78350f" />
        
        {/* Symmetrical Fletching (Feathers) */}
        {/* Top Feather */}
        <path d="M5 15 L35 15 L5 2 L12 15 Z" fill="#ef4444" />
        {/* Bottom Feather (Mirror of Top) */}
        <path d="M5 15 L35 15 L5 28 L12 15 Z" fill="#ef4444" />
        
        {/* Inner detail feathers */}
        <path d="M2 15 L25 15 L2 7 L8 15 Z" fill="#dc2626" opacity="0.8" />
        <path d="M2 15 L25 15 L2 23 L8 15 Z" fill="#dc2626" opacity="0.8" />
        
        {/* Shaft line through feathers for vertical centering */}
        <line x1="5" y1="15" x2="35" y2="15" stroke="#451a03" strokeWidth="1.5" />
      </svg>
    </div>
  );
};

export default DartVisual;
