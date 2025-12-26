
import React from 'react';

const StuffedShark: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`pointer-events-none select-none ${className}`}>
    <svg viewBox="0 0 120 160" className="w-36 h-48 drop-shadow-[0_15px_20px_rgba(0,0,0,0.8)]">
      {/* Back Fin */}
      <path d="M50 40 Q75 10 90 40 Z" fill="#64748b" transform="rotate(-15, 60, 40)" />
      {/* Body */}
      <ellipse cx="60" cy="95" rx="55" ry="45" fill="#64748b" />
      <ellipse cx="60" cy="115" rx="45" ry="25" fill="#f8fafc" />
      {/* Side Fins */}
      <path d="M15 95 Q-10 110 15 120" fill="#475569" />
      <path d="M105 95 Q130 110 105 120" fill="#475569" />
      {/* Tail */}
      <path d="M40 140 Q60 165 80 140" stroke="#64748b" strokeWidth="12" fill="none" strokeLinecap="round" />
      {/* Face */}
      <circle cx="40" cy="90" r="4.5" fill="#1e1b4b" />
      <circle cx="80" cy="90" r="4.5" fill="#1e1b4b" />
      <circle cx="35" cy="100" r="6" fill="#fb7185" opacity="0.25" />
      <circle cx="85" cy="100" r="6" fill="#fb7185" opacity="0.25" />
      <path d="M50 105 Q60 112 70 105" stroke="#1e1b4b" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  </div>
);

const StuffedPenguin: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`pointer-events-none select-none ${className}`}>
    <svg viewBox="0 0 120 160" className="w-36 h-48 drop-shadow-[0_15px_20px_rgba(0,0,0,0.8)]">
      {/* Flippers */}
      <ellipse cx="15" cy="105" rx="8" ry="22" fill="#000" transform="rotate(25, 15, 105)" />
      <ellipse cx="105" cy="105" rx="8" ry="22" fill="#000" transform="rotate(-25, 105, 105)" />
      {/* Feet */}
      <ellipse cx="42" cy="148" rx="14" ry="8" fill="#f97316" />
      <ellipse cx="78" cy="148" rx="14" ry="8" fill="#f97316" />
      {/* Body */}
      <ellipse cx="60" cy="95" rx="48" ry="58" fill="#000" />
      <ellipse cx="60" cy="105" rx="35" ry="45" fill="#fff" />
      {/* Face */}
      <circle cx="45" cy="75" r="4.5" fill="#000" />
      <circle cx="75" cy="75" r="4.5" fill="#000" />
      <path d="M52 85 L68 85 L60 98 Z" fill="#fb923c" />
      <circle cx="38" cy="85" r="6" fill="#fb7185" opacity="0.2" />
      <circle cx="82" cy="85" r="6" fill="#fb7185" opacity="0.2" />
    </svg>
  </div>
);

const StuffedChase: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`pointer-events-none select-none ${className}`}>
    <svg viewBox="0 0 120 160" className="w-36 h-48 drop-shadow-[0_15px_20px_rgba(0,0,0,0.8)]">
      {/* Arms */}
      <ellipse cx="20" cy="110" rx="14" ry="25" fill="#78350f" transform="rotate(25, 20, 110)" />
      <ellipse cx="100" cy="110" rx="14" ry="25" fill="#78350f" transform="rotate(-25, 100, 110)" />
      {/* Body / Vest */}
      <ellipse cx="60" cy="120" rx="45" ry="40" fill="#1e40af" />
      <path d="M40 95 L80 95 L85 140 L35 140 Z" fill="#1e3a8a" />
      <rect x="55" y="105" width="10" height="10" fill="#facc15" rx="2" /> {/* Shield */}
      {/* Head */}
      <circle cx="60" cy="65" r="42" fill="#78350f" />
      <ellipse cx="60" cy="80" rx="22" ry="18" fill="#d97706" />
      {/* Police Hat */}
      <path d="M25 45 Q60 25 95 45 L90 55 L30 55 Z" fill="#1e3a8a" />
      <rect x="30" y="52" width="60" height="5" fill="#000" />
      <circle cx="60" cy="40" r="6" fill="#facc15" />
      {/* Face */}
      <circle cx="48" cy="70" r="4.5" fill="#1e1b4b" />
      <circle cx="72" cy="70" r="4.5" fill="#1e1b4b" />
      <ellipse cx="60" cy="80" rx="6" ry="4" fill="#000" />
    </svg>
  </div>
);

const StuffedWhale: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`pointer-events-none select-none ${className}`}>
    <svg viewBox="0 0 120 160" className="w-36 h-48 drop-shadow-[0_15px_20px_rgba(0,0,0,0.8)]">
      {/* Tail Fins */}
      <ellipse cx="40" cy="130" rx="20" ry="10" fill="#60a5fa" transform="rotate(-30, 40, 130)" />
      <ellipse cx="80" cy="130" rx="20" ry="10" fill="#60a5fa" transform="rotate(30, 80, 130)" />
      {/* Body */}
      <ellipse cx="60" cy="85" rx="50" ry="45" fill="#60a5fa" />
      <ellipse cx="60" cy="105" rx="40" ry="25" fill="#fff" opacity="0.9" />
      {/* Flippers */}
      <ellipse cx="15" cy="100" rx="12" ry="6" fill="#3b82f6" transform="rotate(-20, 15, 100)" />
      <ellipse cx="105" cy="100" rx="12" ry="6" fill="#3b82f6" transform="rotate(20, 105, 100)" />
      {/* Face */}
      <circle cx="40" cy="80" r="4" fill="#1e1b4b" />
      <circle cx="80" cy="80" r="4" fill="#1e1b4b" />
      <path d="M50 95 Q60 102 70 95" stroke="#1e1b4b" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Water Spout */}
      <path d="M60 40 Q60 20 50 15 M60 40 Q60 20 70 15" stroke="#93c5fd" strokeWidth="3" fill="none" strokeLinecap="round" />
    </svg>
  </div>
);

const StuffedElephant: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`pointer-events-none select-none ${className}`}>
    <svg viewBox="0 0 120 160" className="w-36 h-48 drop-shadow-[0_15px_20px_rgba(0,0,0,0.8)]">
      {/* Ears */}
      <ellipse cx="20" cy="80" rx="25" ry="35" fill="#94a3b8" />
      <ellipse cx="100" cy="80" rx="25" ry="35" fill="#94a3b8" />
      <ellipse cx="22" cy="80" rx="15" ry="25" fill="#fbcfe8" opacity="0.4" />
      <ellipse cx="98" cy="80" rx="15" ry="25" fill="#fbcfe8" opacity="0.4" />
      {/* Arms */}
      <ellipse cx="25" cy="115" rx="12" ry="20" fill="#64748b" transform="rotate(20, 25, 115)" />
      <ellipse cx="95" cy="115" rx="12" ry="20" fill="#64748b" transform="rotate(-20, 95, 115)" />
      {/* Body */}
      <ellipse cx="60" cy="120" rx="45" ry="40" fill="#94a3b8" />
      <ellipse cx="60" cy="120" rx="25" ry="20" fill="#f8fafc" opacity="0.3" />
      {/* Head */}
      <circle cx="60" cy="85" r="40" fill="#94a3b8" />
      {/* Trunk */}
      <path d="M60 95 Q60 135 80 130" stroke="#94a3b8" strokeWidth="14" fill="none" strokeLinecap="round" />
      {/* Eyes */}
      <circle cx="45" cy="80" r="4" fill="#1e1b4b" />
      <circle cx="75" cy="80" r="4" fill="#1e1b4b" />
      {/* Blush */}
      <circle cx="38" cy="90" r="5" fill="#fb7185" opacity="0.2" />
      <circle cx="82" cy="90" r="5" fill="#fb7185" opacity="0.2" />
    </svg>
  </div>
);

const StuffedDog: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`pointer-events-none select-none ${className}`}>
    <svg viewBox="0 0 120 160" className="w-36 h-48 drop-shadow-[0_15px_20px_rgba(0,0,0,0.8)]">
      <ellipse cx="20" cy="100" rx="18" ry="28" fill="#d97706" transform="rotate(25, 20, 100)" />
      <ellipse cx="100" cy="100" rx="18" ry="28" fill="#d97706" transform="rotate(-25, 100, 100)" />
      <path d="M15 40 Q-10 40 0 85 Q5 110 25 95 Z" fill="#78350f" transform="rotate(-5, 15, 40)" />
      <path d="M105 40 Q130 40 120 85 Q115 110 95 95 Z" fill="#78350f" transform="rotate(5, 105, 40)" />
      <ellipse cx="60" cy="115" rx="48" ry="42" fill="#d97706" />
      <ellipse cx="60" cy="115" rx="28" ry="24" fill="#f59e0b" opacity="0.3" />
      <circle cx="35" cy="148" r="20" fill="#78350f" />
      <circle cx="85" cy="148" r="20" fill="#78350f" />
      <circle cx="60" cy="55" r="42" fill="#d97706" />
      <ellipse cx="60" cy="72" rx="24" ry="20" fill="#fef3c7" />
      <circle cx="45" cy="60" r="7" fill="#1e1b4b" />
      <circle cx="75" cy="60" r="7" fill="#1e1b4b" />
      <ellipse cx="60" cy="68" rx="8" ry="6" fill="#1e1b4b" />
      <path d="M50 82 Q60 90 70 82" stroke="#1e1b4b" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <rect x="30" y="90" width="60" height="10" rx="5" fill="#ef4444" />
      <circle cx="60" cy="100" r="7" fill="#facc15" />
    </svg>
  </div>
);

const StuffedPanda: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`pointer-events-none select-none ${className}`}>
    <svg viewBox="0 0 120 160" className="w-36 h-48 drop-shadow-[0_15px_20px_rgba(0,0,0,0.8)]">
      <ellipse cx="20" cy="95" rx="18" ry="32" fill="#000" transform="rotate(35, 20, 95)" />
      <ellipse cx="100" cy="95" rx="18" ry="32" fill="#000" transform="rotate(-35, 100, 95)" />
      <circle cx="28" cy="32" r="20" fill="#000" />
      <circle cx="92" cy="32" r="20" fill="#000" />
      <circle cx="60" cy="110" r="50" fill="#fff" />
      <ellipse cx="35" cy="148" rx="24" ry="16" fill="#000" />
      <ellipse cx="85" cy="148" rx="24" ry="16" fill="#000" />
      <circle cx="60" cy="58" r="45" fill="#fff" />
      <ellipse cx="45" cy="60" rx="16" ry="18" fill="#000" transform="rotate(-15, 45, 60)" />
      <ellipse cx="75" cy="60" rx="16" ry="18" fill="#000" transform="rotate(15, 75, 60)" />
      <circle cx="45" cy="58" r="5" fill="#fff" />
      <circle cx="75" cy="58" r="5" fill="#fff" />
      <circle cx="60" cy="74" r="7" fill="#000" />
    </svg>
  </div>
);

const StuffedRabbit: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`pointer-events-none select-none ${className}`}>
    <svg viewBox="0 0 120 180" className="w-36 h-48 drop-shadow-[0_15px_20px_rgba(0,0,0,0.8)]">
      <ellipse cx="38" cy="30" rx="14" ry="55" fill="#fee2e2" transform="rotate(-15, 38, 30)" />
      <ellipse cx="82" cy="30" rx="14" ry="55" fill="#fee2e2" transform="rotate(15, 82, 30)" />
      <ellipse cx="20" cy="110" rx="15" ry="28" fill="#fff" transform="rotate(30, 20, 110)" />
      <ellipse cx="100" cy="110" rx="15" ry="28" fill="#fff" transform="rotate(-30, 100, 110)" />
      <circle cx="60" cy="120" r="50" fill="#fff" />
      <ellipse cx="38" cy="158" rx="24" ry="14" fill="#fff" />
      <ellipse cx="82" cy="158" rx="24" ry="14" fill="#fff" />
      <circle cx="60" cy="75" r="42" fill="#fff" />
      <circle cx="48" cy="70" r="3.5" fill="#1e1b4b" />
      <circle cx="72" cy="70" r="3.5" fill="#1e1b4b" />
      <path d="M52 90 Q60 98 68 90" stroke="#f43f5e" strokeWidth="3" fill="none" strokeLinecap="round" />
      <circle cx="60" cy="80" r="5" fill="#fecaca" />
    </svg>
  </div>
);

const StuffedMilkTea: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`pointer-events-none select-none ${className}`}>
    <svg viewBox="0 0 120 160" className="w-36 h-48 drop-shadow-[0_15px_20px_rgba(0,0,0,0.8)]">
      <path d="M30 15 L50 15 L45 0 L35 0 Z" fill="#475569" /> {/* Straw */}
      <path d="M20 20 L100 20 L90 140 L30 140 Z" fill="#fbbf24" /> {/* Cup Body */}
      <path d="M20 20 L100 20 L95 40 L25 40 Z" fill="#fef3c7" /> {/* Creamy Top */}
      <path d="M20 20 Q60 10 100 20" stroke="#d97706" strokeWidth="4" fill="none" /> {/* Lid Rim */}
      <circle cx="40" cy="120" r="5" fill="#1e293b" />
      <circle cx="60" cy="125" r="5" fill="#1e293b" />
      <circle cx="80" cy="118" r="5" fill="#1e293b" />
      <circle cx="50" cy="110" r="5" fill="#1e293b" />
      <circle cx="50" cy="65" r="3" fill="#1e1b4b" />
      <circle cx="70" cy="65" r="3" fill="#1e1b4b" />
      <path d="M55 75 Q60 80 65 75" stroke="#1e1b4b" strokeWidth="2" fill="none" strokeLinecap="round" />
      <ellipse cx="15" cy="80" rx="8" ry="15" fill="#fbbf24" transform="rotate(10, 15, 80)" />
      <ellipse cx="105" cy="80" rx="8" ry="15" fill="#fbbf24" transform="rotate(-10, 105, 80)" />
    </svg>
  </div>
);

const StuffedSnoopy: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`pointer-events-none select-none ${className}`}>
    <svg viewBox="0 0 120 160" className="w-36 h-48 drop-shadow-[0_15px_20px_rgba(0,0,0,0.8)]">
      <ellipse cx="60" cy="110" rx="35" ry="45" fill="#fff" />
      <circle cx="60" cy="60" r="40" fill="#fff" />
      <path d="M30 40 Q5 40 10 90 Q15 110 30 100 Z" fill="#000" transform="rotate(-10, 30, 40)" />
      <path d="M90 40 Q115 40 110 90 Q105 110 90 100 Z" fill="#000" transform="rotate(10, 90, 40)" />
      <ellipse cx="60" cy="75" rx="10" ry="7" fill="#000" />
      <path d="M45 55 Q50 52 55 55" stroke="#000" strokeWidth="2.5" fill="none" />
      <path d="M65 55 Q70 52 75 55" stroke="#000" strokeWidth="2.5" fill="none" />
      <path d="M50 85 Q60 90 70 85" stroke="#000" strokeWidth="1.5" fill="none" />
      <rect x="35" y="95" width="50" height="6" rx="3" fill="#ef4444" />
      <ellipse cx="25" cy="110" rx="10" ry="20" fill="#fff" transform="rotate(20, 25, 110)" />
      <ellipse cx="95" cy="110" rx="10" ry="20" fill="#fff" transform="rotate(-20, 95, 110)" />
      <circle cx="45" cy="150" r="14" fill="#fff" />
      <circle cx="75" cy="150" r="14" fill="#fff" />
    </svg>
  </div>
);

const StuffedCat: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`pointer-events-none select-none ${className}`}>
    <svg viewBox="0 0 120 160" className="w-36 h-48 drop-shadow-[0_15px_20px_rgba(0,0,0,0.8)]">
      <path d="M20 20 L50 65 L10 65 Z" fill="#94a3b8" />
      <path d="M100 20 L70 65 L110 65 Z" fill="#94a3b8" />
      <ellipse cx="20" cy="110" rx="14" ry="25" fill="#cbd5e1" transform="rotate(25, 20, 110)" />
      <ellipse cx="100" cy="110" rx="14" ry="25" fill="#cbd5e1" transform="rotate(-25, 100, 110)" />
      <circle cx="60" cy="115" r="50" fill="#cbd5e1" />
      <ellipse cx="60" cy="115" rx="30" ry="25" fill="#f8fafc" opacity="0.4" />
      <circle cx="38" cy="152" r="20" fill="#cbd5e1" />
      <circle cx="82" cy="152" r="20" fill="#cbd5e1" />
      <circle cx="60" cy="68" r="44" fill="#cbd5e1" />
      <circle cx="45" cy="62" r="4.5" fill="#1e1b4b" />
      <circle cx="75" cy="62" r="4.5" fill="#1e1b4b" />
      <path d="M50 85 Q60 94 70 85" stroke="#f43f5e" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M25 75 L5 70 M25 82 L5 82" stroke="#64748b" strokeWidth="2" />
      <path d="M95 75 L115 70 M95 82 L115 82" stroke="#64748b" strokeWidth="2" />
    </svg>
  </div>
);

const StuffedTeddy: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`pointer-events-none select-none ${className}`}>
    <svg viewBox="0 0 120 160" className="w-36 h-48 drop-shadow-[0_15px_20px_rgba(0,0,0,0.8)]">
      <ellipse cx="20" cy="105" rx="16" ry="28" fill="#92400e" transform="rotate(35, 20, 105)" />
      <ellipse cx="100" cy="105" rx="16" ry="28" fill="#92400e" transform="rotate(-35, 100, 105)" />
      <circle cx="32" cy="38" r="20" fill="#92400e" />
      <circle cx="88" cy="38" r="20" fill="#92400e" />
      <circle cx="60" cy="115" r="52" fill="#92400e" />
      <ellipse cx="60" cy="115" rx="30" ry="25" fill="#b45309" opacity="0.2" />
      <circle cx="35" cy="150" r="22" fill="#78350f" />
      <circle cx="85" cy="150" r="22" fill="#78350f" />
      <circle cx="60" cy="68" r="45" fill="#92400e" />
      <ellipse cx="60" cy="85" rx="18" ry="14" fill="#fef3c7" />
      <circle cx="48" cy="62" r="4.5" fill="#1e1b4b" />
      <circle cx="72" cy="62" r="4.5" fill="#1e1b4b" />
      <path d="M55 78 Q60 76 65 78 L60 85 Z" fill="#1e1b4b" />
    </svg>
  </div>
);

const StuffedTurtle: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`pointer-events-none select-none ${className}`}>
    <svg viewBox="0 0 100 120" className="w-32 h-40 drop-shadow-[0_12px_12px_rgba(0,0,0,0.6)]">
      <ellipse cx="20" cy="50" rx="12" ry="7" fill="#22c55e" transform="rotate(-30, 20, 50)" />
      <ellipse cx="80" cy="50" rx="12" ry="7" fill="#22c55e" transform="rotate(30, 80, 50)" />
      <ellipse cx="25" cy="90" rx="10" ry="6" fill="#22c55e" transform="rotate(20, 25, 90)" />
      <ellipse cx="75" cy="90" rx="10" ry="6" fill="#22c55e" transform="rotate(-20, 75, 90)" />
      <circle cx="50" cy="70" r="32" fill="#14532d" />
      <circle cx="50" cy="70" r="28" fill="#166534" />
      <circle cx="50" cy="70" r="8" fill="#15803d" opacity="0.4" />
      <circle cx="50" cy="50" r="6" fill="#15803d" opacity="0.3" />
      <circle cx="50" cy="90" r="6" fill="#15803d" opacity="0.3" />
      <circle cx="35" cy="70" r="6" fill="#15803d" opacity="0.3" />
      <circle cx="65" cy="70" r="6" fill="#15803d" opacity="0.3" />
      <ellipse cx="50" cy="35" rx="18" ry="16" fill="#22c55e" />
      <circle cx="42" cy="32" r="2.5" fill="white" />
      <circle cx="58" cy="32" r="2.5" fill="white" />
      <path d="M46 40 Q50 43 54 40" stroke="#064e3b" strokeWidth="1.5" fill="none" />
    </svg>
  </div>
);

const StuffedIceBear: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`pointer-events-none select-none ${className}`}>
    <svg viewBox="0 0 100 120" className="w-32 h-40 drop-shadow-[0_12px_12px_rgba(0,0,0,0.6)]">
      <circle cx="30" cy="30" r="10" fill="#f8fafc" />
      <circle cx="70" cy="30" r="10" fill="#f8fafc" />
      <circle cx="50" cy="75" r="30" fill="#f8fafc" />
      <circle cx="50" cy="45" r="25" fill="#f8fafc" />
      <circle cx="40" cy="42" r="2" fill="#0f172a" />
      <circle cx="60" cy="42" r="2" fill="#0f172a" />
      <ellipse cx="50" cy="50" rx="4" ry="3" fill="#0f172a" />
      <ellipse cx="25" cy="75" rx="8" ry="14" fill="#f8fafc" transform="rotate(10, 25, 75)" />
      <ellipse cx="75" cy="75" rx="8" ry="14" fill="#f8fafc" transform="rotate(-10, 75, 75)" />
      <circle cx="35" cy="100" r="12" fill="#f8fafc" />
      <circle cx="65" cy="100" r="12" fill="#f8fafc" />
    </svg>
  </div>
);

const StuffedStitch: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`pointer-events-none select-none ${className}`}>
    <svg viewBox="0 0 100 120" className="w-32 h-40 drop-shadow-[0_12px_12px_rgba(0,0,0,0.6)]">
      <path d="M15 45 Q-15 10 25 35 Z" fill="#3b82f6" />
      <path d="M15 45 Q-5 20 20 38 Z" fill="#f472b6" opacity="0.4" />
      <path d="M85 45 Q115 10 75 35 Z" fill="#3b82f6" />
      <path d="M85 45 Q105 20 80 38 Z" fill="#f472b6" opacity="0.4" />
      <circle cx="50" cy="85" r="28" fill="#3b82f6" />
      <circle cx="50" cy="88" r="18" fill="#93c5fd" opacity="0.5" />
      <ellipse cx="50" cy="50" rx="35" ry="30" fill="#3b82f6" />
      <ellipse cx="32" cy="48" rx="8" ry="12" fill="#1e1b4b" transform="rotate(-15, 32, 48)" />
      <circle cx="34" cy="44" r="2" fill="white" />
      <ellipse cx="68" cy="48" rx="8" ry="12" fill="#1e1b4b" transform="rotate(15, 68, 48)" />
      <circle cx="66" cy="44" r="2" fill="white" />
      <ellipse cx="50" cy="62" rx="10" ry="6" fill="#1d4ed8" />
      <circle cx="28" cy="105" r="10" fill="#3b82f6" />
      <circle cx="72" cy="105" r="10" fill="#3b82f6" />
    </svg>
  </div>
);

const StuffedChiikawa: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`pointer-events-none select-none ${className}`}>
    <svg viewBox="0 0 100 120" className="w-32 h-40 drop-shadow-[0_12px_12px_rgba(0,0,0,0.6)]">
      <circle cx="35" cy="35" r="8" fill="#fff" />
      <circle cx="65" cy="35" r="8" fill="#fff" />
      <circle cx="50" cy="75" r="40" fill="#fff" />
      <circle cx="50" cy="65" r="35" fill="#fff" />
      <circle cx="38" cy="65" r="2.5" fill="#111" />
      <circle cx="62" cy="65" r="2.5" fill="#111" />
      <path d="M35 58 Q38 56 41 58" stroke="#111" strokeWidth="1" fill="none" />
      <path d="M59 58 Q62 56 65 58" stroke="#111" strokeWidth="1" fill="none" />
      <circle cx="32" cy="72" r="5" fill="#fbcfe8" opacity="0.6" />
      <circle cx="68" cy="72" r="5" fill="#fbcfe8" opacity="0.6" />
      <path d="M48 75 Q50 78 52 75" stroke="#111" strokeWidth="1.5" fill="none" />
      <circle cx="30" cy="105" r="8" fill="#fff" />
      <circle cx="70" cy="105" r="8" fill="#fff" />
      <circle cx="20" cy="85" r="8" fill="#fff" />
      <circle cx="80" cy="85" r="8" fill="#fff" />
    </svg>
  </div>
);

const StuffedMyMelody: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`pointer-events-none select-none ${className}`}>
    <svg viewBox="0 0 100 120" className="w-32 h-40 drop-shadow-[0_12px_12px_rgba(0,0,0,0.6)]">
      <path d="M25 40 Q20 5 35 15 L40 45 Z" fill="#f472b6" />
      <path d="M75 40 Q80 5 65 15 L60 45 Z" fill="#f472b6" />
      <circle cx="50" cy="55" r="30" fill="#f472b6" />
      <ellipse cx="50" cy="62" rx="22" ry="18" fill="#fff" />
      <ellipse cx="42" cy="62" rx="2" ry="4" fill="#111" />
      <ellipse cx="58" cy="62" rx="2" ry="4" fill="#111" />
      <ellipse cx="50" cy="68" rx="3" ry="2" fill="#facc15" />
      <circle cx="30" cy="45" r="6" fill="#fff" />
      <circle cx="30" cy="45" r="2" fill="#facc15" />
      <circle cx="50" cy="95" r="18" fill="#f472b6" />
      <ellipse cx="30" cy="95" rx="5" ry="8" fill="#f472b6" transform="rotate(30, 30, 95)" />
      <ellipse cx="70" cy="95" rx="5" ry="8" fill="#f472b6" transform="rotate(-30, 70, 95)" />
      <circle cx="40" cy="110" r="6" fill="#f472b6" />
      <circle cx="60" cy="110" r="6" fill="#f472b6" />
    </svg>
  </div>
);

const StallFrame: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="relative p-8 pt-36 bg-amber-950/20 rounded-t-3xl border-x-8 border-t-8 border-amber-900 shadow-[0_0_100px_rgba(0,0,0,0.8)]">
      
      {/* Wooden Pillars */}
      <div className="absolute top-0 -left-10 w-10 h-full bg-amber-900 border-r-4 border-amber-950 shadow-2xl">
        <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/dark-wood.png')]"></div>
        <StuffedIceBear className="absolute top-[20px] -left-12 z-30" />
        <StuffedStitch className="absolute top-[140px] -left-12 z-30" />
        <StuffedTeddy className="absolute top-[260px] -left-12 z-30" />
        <StuffedChiikawa className="absolute top-[380px] -left-12 z-30" />
        <StuffedMyMelody className="absolute top-[500px] -left-12 z-30" />
      </div>

      <div className="absolute top-0 -right-10 w-10 h-full bg-amber-900 border-l-4 border-amber-950 shadow-2xl">
        <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/dark-wood.png')]"></div>
        <StuffedTurtle className="absolute top-[20px] -right-12 z-30" />
        <StuffedMyMelody className="absolute top-[140px] -right-12 z-30" />
        <StuffedChiikawa className="absolute top-[260px] -right-12 z-30" />
        <StuffedTeddy className="absolute top-[380px] -right-12 z-30" />
        <StuffedStitch className="absolute top-[500px] -right-12 z-30" />
      </div>

      {/* Awning (Striped Canvas) - z-index 100 */}
      <div className="fixed top-0 left-0 right-0 h-28 z-[100] flex pointer-events-none overflow-hidden">
        {[...Array(100)].map((_, i) => (
          <div 
            key={i} 
            className={`flex-1 h-full rounded-b-3xl shadow-2xl ${i % 2 === 0 ? 'bg-red-600' : 'bg-slate-50'}`}
            style={{ 
              transform: `translateY(${Math.sin(i * 0.4) * 6}px)`,
              borderBottom: '4px solid rgba(0,0,0,0.25)',
              boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
            }}
          />
        ))}
      </div>

      {/* Prize Shelf row - Sitting RIGHT ON the dark wooden border line */}
      <div className="absolute top-[-14px] left-1/2 -translate-x-1/2 w-full max-w-[1600px] flex justify-center items-end z-[150] pointer-events-none px-4 pb-0 overflow-visible">
        <div className="flex -space-x-14">
          <StuffedWhale /> {/* Occupy space between shark and ice bear */}
          <StuffedShark />
          <StuffedPanda />
          <StuffedChase />
          <StuffedPenguin />
          <StuffedRabbit />
          <StuffedElephant /> {/* Beside rabbit to occupy space towards turtle */}
          <StuffedWhale />
          <StuffedMilkTea />
          <StuffedSnoopy />
          <StuffedDog />
          <StuffedTeddy />
          <StuffedCat />
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_60px_rgba(0,0,0,0.6)] rounded-t-lg z-0"></div>

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default StallFrame;
