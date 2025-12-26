
import React from 'react';

interface AuntieCharacterProps {
  className?: string;
  isThinking?: boolean;
}

const AuntieCharacter: React.FC<AuntieCharacterProps> = ({ className, isThinking }) => {
  return (
    <div className={`${className} transition-all duration-700 pointer-events-none select-none ${isThinking ? 'scale-[1.02]' : 'scale-100'} animate-barker-float origin-bottom`}>
      <svg viewBox="0 0 300 450" className="w-full h-full drop-shadow-[0_25px_45px_rgba(0,0,0,0.8)]">
        <defs>
          <radialGradient id="ariSkin" cx="50%" cy="40%" r="65%">
            <stop offset="0%" stopColor="#ffeedd" />
            <stop offset="70%" stopColor="#f7d3ba" />
            <stop offset="100%" stopColor="#d99b7e" />
          </radialGradient>
          
          <linearGradient id="ariHair" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#4a3121" />
            <stop offset="50%" stopColor="#2a1a10" />
            <stop offset="100%" stopColor="#120a06" />
          </linearGradient>

          <pattern id="dusterPattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="20" cy="20" r="10" fill="#fef08a" opacity="0.1" />
            <path d="M5 5 L15 15 M5 15 L15 5" stroke="#9333ea" strokeWidth="1" opacity="0.1" />
          </pattern>

          <linearGradient id="dusterGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7e22ce" />
            <stop offset="100%" stopColor="#581c87" />
          </linearGradient>

          <filter id="shadow">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.3"/>
          </filter>
        </defs>

        {/* Ponytail Swish */}
        <path d="M150 70 C190 60 230 100 230 200 C230 300 200 400 170 430" fill="url(#ariHair)" opacity="0.9" />

        {/* Main Hair Cap */}
        <path d="M90 100 C90 50 210 50 210 100 C210 130 180 145 150 145 C120 145 90 130 90 100" fill="url(#ariHair)" />
        
        {/* Neck */}
        <path d="M130 190 Q150 210 170 190 L165 220 L135 220 Z" fill="#f7d3ba" />
        <path d="M130 190 Q150 205 170 190" fill="none" stroke="#d99b7e" strokeWidth="1" opacity="0.2" />

        {/* Face */}
        <path d="M105 110 C105 85 195 85 195 110 C195 170 180 205 150 205 C120 205 105 170 105 110 Z" fill="url(#ariSkin)" />
        
        {/* Eyes - Clean Eyeliner */}
        <g className="ari-eyes-clean">
          <path d="M115 138 Q125 132 138 138 Q125 142 115 138 Z" fill="#fff" />
          <circle cx="128" cy="138" r="4" fill="#3e2723" />
          <circle cx="129" cy="137" r="1" fill="white" opacity="0.8" />
          <path d="M112 136 L142 134" stroke="black" strokeWidth="2" fill="none" strokeLinecap="round" />
          
          <path d="M162 138 Q175 132 185 138 Q175 142 162 138 Z" fill="#fff" />
          <circle cx="172" cy="138" r="4" fill="#3e2723" />
          <circle cx="173" cy="137" r="1" fill="white" opacity="0.8" />
          <path d="M158 134 L188 136" stroke="black" strokeWidth="2" fill="none" strokeLinecap="round" />
        </g>

        {/* Nose */}
        <path d="M147 166 Q150 171 153 166" stroke="#d99b7e" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.7" />

        {/* Brows */}
        <path d="M115 120 Q130 112 145 122" stroke="#2a1a10" strokeWidth="1.5" fill="none" opacity="0.5" />
        <path d="M155 122 Q170 112 185 120" stroke="#2a1a10" strokeWidth="1.5" fill="none" opacity="0.5" />

        {/* Lips */}
        <path d="M138 185 Q150 192 162 185 Q150 187 138 185" fill="#f4a7a7" stroke="#9d174d" strokeWidth="0.5" />

        {/* Arms on Back */}
        <g className="ari-arms-back" opacity="0.9">
           <path d="M100 230 Q85 260 90 300" stroke="#f7d3ba" strokeWidth="14" fill="none" strokeLinecap="round" />
           <path d="M200 230 Q215 260 210 300" stroke="#f7d3ba" strokeWidth="14" fill="none" strokeLinecap="round" />
        </g>

        {/* T-Shirt Duster */}
        <g className="tshirt-duster">
          <path d="M100 220 L200 220 L240 450 L60 450 Z" fill="url(#dusterGrad)" />
          <path d="M100 220 L200 220 L240 450 L60 450 Z" fill="url(#dusterPattern)" />
          
          <path d="M100 220 L75 240 L85 280 L100 260 Z" fill="url(#dusterGrad)" filter="url(#shadow)" />
          <path d="M200 220 L225 240 L215 280 L200 260 Z" fill="url(#dusterGrad)" filter="url(#shadow)" />
          
          <path d="M150 220 L150 450" stroke="rgba(0,0,0,0.15)" strokeWidth="2" fill="none" />
          <circle cx="150" cy="280" r="2.5" fill="rgba(255,255,255,0.2)" />
          <circle cx="150" cy="330" r="2.5" fill="rgba(255,255,255,0.2)" />
          <circle cx="150" cy="380" r="2.5" fill="rgba(255,255,255,0.2)" />
        </g>

        {/* ID Badge */}
        <rect x="110" y="290" width="30" height="20" rx="3" fill="#1e293b" opacity="0.3" />
      </svg>

      <style>{`
        @keyframes barker-float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(0.1deg); }
        }
        .animate-barker-float {
          animation: barker-float 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default AuntieCharacter;
