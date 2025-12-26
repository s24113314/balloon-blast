
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  GameState, 
  Balloon as BalloonType, 
  Prize as PrizeType 
} from './types';
import { 
  GAME_WIDTH, 
  GAME_HEIGHT, 
  DARTS_PER_GAME, 
  BALLOON_COLORS,
  BALLOON_WIDTH,
  BALLOON_HEIGHT,
  LANTERN_CHARS
} from './constants';
import Balloon from './components/Balloon';
import DartVisual from './components/DartVisual';
import NightMarketBackground from './components/NightMarketBackground';
import DartTable from './components/DartTable';
import StallFrame from './components/StallFrame';
import ClockHolder from './components/ClockHolder';
import AuntieBarker from './components/AuntieBarker';
import AuntieCharacter from './components/AuntieCharacter';
import { getBarkerComment, generatePrizeData, generatePrizeImage, generateSpeech, PrizeData } from './services/geminiService';

interface ActiveDart {
  id: string;
  startX: number;
  startY: number;
  targetX: number;
  targetY: number;
  progress: number; // 0 to 1
}

interface PinnedDart {
  id: string;
  x: number;
  y: number;
  rotation: number;
}

interface FallingDart {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  vr: number;
}

const INTRO_LINES = [
  { speaker: 'Auntie', text: "Balloon darts! Balloon darts! Thirty darts for 100 NTD! Easy game, nice prize!" },
  { speaker: 'Player', text: "How does it work?" },
  { speaker: 'Auntie', text: "Each cup has 10 darts, so you take three cups. Pop the balloons as many as you can. Try popping the moving balloons perfectly, 30 perfect shots on the MOVING ones will get you the special prize!" },
  { speaker: 'Player', text: "Only the moving ones for the big prize? Challenging!" },
  { speaker: 'Auntie', text: "Thank you! Here—three cups. Aim carefully, don’t rush. Ready? Go!" }
];

const GAME_PHRASES = {
  HIT: "Nice you popped it",
  MISS: "Ay take your time, the balloon isn't going anywhere",
  ALMOST: "Almost, what a close one"
};

// Audio decoding helpers
function decode(base64: string) {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.START);
  const [balloons, setBalloons] = useState<BalloonType[]>([]);
  const [dartsLeft, setDartsLeft] = useState(DARTS_PER_GAME);
  const [score, setScore] = useState(0);
  const [movingScore, setMovingScore] = useState(0); // Tracking hits on moving balloons specifically
  const [barkerText, setBarkerText] = useState("");
  const [isBarkerThinking, setIsBarkerThinking] = useState(false);
  const [prize, setPrize] = useState<PrizeType | null>(null);
  const [loadingPrize, setLoadingPrize] = useState(false);
  const [activeDarts, setActiveDarts] = useState<ActiveDart[]>([]);
  const [pinnedDarts, setPinnedDarts] = useState<PinnedDart[]>([]);
  const [fallingDarts, setFallingDarts] = useState<FallingDart[]>([]);
  const [currentTime, setCurrentTime] = useState(0);
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  
  const [isAiming, setIsAiming] = useState(false);
  const [aimPos, setAimPos] = useState({ x: 0, y: 0 });
  
  const boardRef = useRef<HTMLDivElement>(null);
  const launchPoint = { x: GAME_WIDTH / 2, y: GAME_HEIGHT + 450 };
  const audioContextRef = useRef<AudioContext | null>(null);
  const bgMusicRef = useRef<HTMLAudioElement | null>(null);
  const gameAudioCache = useRef<Map<string, AudioBuffer>>(new Map());

  const gap = 4; 
  const clusterGap = 40; 
  const colsPerCluster = 4;
  const rowsPerCluster = 6;
  const numClusters = 4;
  const clusterWidth = (colsPerCluster * BALLOON_WIDTH) + ((colsPerCluster - 1) * gap);
  const totalWidth = (numClusters * clusterWidth) + ((numClusters - 1) * clusterGap);
  const totalHeight = (rowsPerCluster * BALLOON_HEIGHT) + ((rowsPerCluster - 1) * gap);
  
  const startX = (GAME_WIDTH - totalWidth) / 2;
  // Position the stall frame contents
  const startY = (GAME_HEIGHT - totalHeight) * 0.35; 

  const RING_ORBIT_RADIUS = 75; 
  const BALLOONS_PER_RING = 10;
  const RING_BALLOON_SCALE = 0.85; 
  const ROTATION_SPEED = 1.2;

  // Initialize background music
  useEffect(() => {
    const audio = new Audio('https://cdn.pixabay.com/audio/2022/03/10/audio_5179a6147d.mp3');
    audio.loop = true;
    audio.volume = 0.5;
    bgMusicRef.current = audio;

    initGameBalloons();

    return () => {
      audio.pause();
      bgMusicRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (bgMusicRef.current) {
      bgMusicRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
    }
    const ctx = audioContextRef.current;
    if (ctx.state === 'suspended') {
      ctx.resume();
    }
    return ctx;
  }, []);

  const playPopSound = useCallback(() => {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    const noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * 0.05, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < noiseBuffer.length; i++) output[i] = Math.random() * 2 - 1;
    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;
    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = 'highpass';
    noiseFilter.frequency.setValueAtTime(1000, now);
    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.8, now); 
    noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.03); 
    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    const thump = ctx.createOscillator();
    const thumpGain = ctx.createGain();
    thump.type = 'square'; 
    thump.frequency.setValueAtTime(250, now);
    thump.frequency.exponentialRampToValueAtTime(60, now + 0.04);
    thumpGain.gain.setValueAtTime(0.6, now);
    thumpGain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
    thump.connect(thumpGain);
    thumpGain.connect(ctx.destination);
    noise.start(now);
    thump.start(now);
    thump.stop(now + 0.1);
  }, [getAudioContext]);

  const playThrowSound = useCallback(() => {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    const noise = ctx.createBufferSource();
    const buffer = ctx.createBuffer(1, ctx.sampleRate * 0.1, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
    noise.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1000, now);
    filter.frequency.exponentialRampToValueAtTime(3000, now + 0.05);
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.04, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    noise.start();
  }, [getAudioContext]);

  const playVoice = async (text: string, useCacheKey?: string) => {
    const ctx = getAudioContext();
    if (useCacheKey !== undefined) {
      const buffer = gameAudioCache.current.get(useCacheKey);
      if (buffer) {
        const source = ctx.createBufferSource();
        source.buffer = buffer;
        source.connect(ctx.destination);
        source.start();
        return;
      }
    }
    try {
      const base64Audio = await generateSpeech(text);
      if (base64Audio) {
        const audioBuffer = await decodeAudioData(decode(base64Audio), ctx, 24000, 1);
        const source = ctx.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(ctx.destination);
        source.start();
      }
    } catch (e) {
      console.error("TTS Error", e);
    }
  };

  const initGameBalloons = useCallback(() => {
    const newBalloons: BalloonType[] = [];
    for (let cluster = 0; cluster < numClusters; cluster++) {
      const currentClusterX = startX + (cluster * (clusterWidth + clusterGap));
      if (cluster === 1 || cluster === 3) {
        const clusterCenterX = currentClusterX + clusterWidth / 2;
        const sw = BALLOON_WIDTH * RING_BALLOON_SCALE;
        const sh = BALLOON_HEIGHT * RING_BALLOON_SCALE;
        // Adjusted from 0.22 to 0.25 for upper and 0.78 to 0.75 for lower to be "just a little bit" closer to center
        const upperCenterY = startY + totalHeight * 0.25;
        newBalloons.push({
          id: `b-${cluster}-top-center`, x: clusterCenterX - sw / 2, y: upperCenterY - sh / 2,
          baseX: clusterCenterX, baseY: upperCenterY, color: BALLOON_COLORS[Math.floor(Math.random() * BALLOON_COLORS.length)],
          isPopped: false, scale: RING_BALLOON_SCALE, rotation: 0, isCenter: true
        });
        for (let i = 0; i < BALLOONS_PER_RING; i++) {
          const angle = (i / BALLOONS_PER_RING) * Math.PI * 2;
          newBalloons.push({
            id: `b-${cluster}-top-${i}`, x: clusterCenterX + Math.cos(angle) * RING_ORBIT_RADIUS - sw / 2, y: upperCenterY + Math.sin(angle) * RING_ORBIT_RADIUS - sh / 2,
            baseX: clusterCenterX, baseY: upperCenterY, orbitCenterX: clusterCenterX, orbitCenterY: upperCenterY, angleOffset: angle,
            color: BALLOON_COLORS[Math.floor(Math.random() * BALLOON_COLORS.length)], isPopped: false, scale: RING_BALLOON_SCALE, rotation: angle * (180 / Math.PI) + 90
          });
        }
        const lowerCenterY = startY + totalHeight * 0.75;
        newBalloons.push({
          id: `b-${cluster}-bottom-center`, x: clusterCenterX - sw / 2, y: lowerCenterY - sh / 2,
          baseX: clusterCenterX, baseY: lowerCenterY, color: BALLOON_COLORS[Math.floor(Math.random() * BALLOON_COLORS.length)],
          isPopped: false, scale: RING_BALLOON_SCALE, rotation: 0, isCenter: true
        });
        for (let i = 0; i < BALLOONS_PER_RING; i++) {
          const angle = (i / BALLOONS_PER_RING) * Math.PI * 2;
          newBalloons.push({
            id: `b-${cluster}-bottom-${i}`, x: clusterCenterX + Math.cos(angle) * RING_ORBIT_RADIUS - sw / 2, y: lowerCenterY + Math.sin(angle) * RING_ORBIT_RADIUS - sh / 2,
            baseX: clusterCenterX, baseY: lowerCenterY, orbitCenterX: clusterCenterX, orbitCenterY: lowerCenterY, angleOffset: angle,
            color: BALLOON_COLORS[Math.floor(Math.random() * BALLOON_COLORS.length)], isPopped: false, scale: RING_BALLOON_SCALE, rotation: angle * (180 / Math.PI) + 90
          });
        }
      } else {
        for (let r = 0; r < rowsPerCluster; r++) {
          for (let c = 0; c < colsPerCluster; c++) {
            const xPos = currentClusterX + (c * (BALLOON_WIDTH + gap));
            const yPos = startY + r * (BALLOON_HEIGHT + gap);
            newBalloons.push({
              id: `b-${cluster}-${r}-${c}`, x: xPos, y: yPos, baseX: xPos, baseY: yPos,
              color: BALLOON_COLORS[Math.floor(Math.random() * BALLOON_COLORS.length)], isPopped: false, scale: 1.0, rotation: Math.random() * 4 - 2
            });
          }
        }
      }
    }
    setBalloons(newBalloons);
  }, [startX, startY, clusterWidth, clusterGap, gap, totalHeight]);

  const initGame = useCallback(() => {
    initGameBalloons();
    setDartsLeft(DARTS_PER_GAME);
    setScore(0);
    setMovingScore(0);
    setGameState(GameState.PLAYING);
    setBarkerText("Ready? Go!");
    setPrize(null);
    setActiveDarts([]);
    setPinnedDarts([]);
    setFallingDarts([]);
  }, [initGameBalloons]);

  const triggerCannedPhrase = (key: 'HIT' | 'MISS' | 'ALMOST') => {
    setBarkerText(GAME_PHRASES[key]);
  };

  const triggerBarker = async (context: string, forceText?: string) => {
    let text = forceText;
    if (!text) {
      setIsBarkerThinking(true);
      text = await getBarkerComment(context);
      setIsBarkerThinking(false);
    }
    setBarkerText(text);
    playVoice(text);
  };

  const startIntro = () => {
    getAudioContext();
    if (bgMusicRef.current) bgMusicRef.current.play().catch(e => console.log("Audio play blocked", e));
    setGameState(GameState.INTRO_DIALOGUE);
    setDialogueIndex(0);
  };

  const nextDialogue = () => {
    const nextIdx = dialogueIndex + 1;
    if (nextIdx < INTRO_LINES.length) {
      setDialogueIndex(nextIdx);
    } else {
      initGame();
    }
  };

  const handlePop = useCallback((id: string) => {
    playPopSound();
    let isMoving = false;
    setBalloons(prev => prev.map(b => {
      if (b.id === id) {
        if (b.orbitCenterX !== undefined) isMoving = true;
        return { ...b, isPopped: true };
      }
      return b;
    }));
    setScore(s => s + 1);
    if (isMoving) setMovingScore(m => m + 1);
    triggerCannedPhrase('HIT');
  }, [playPopSound]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (gameState !== GameState.PLAYING || dartsLeft <= 0 || !boardRef.current) return;
    setIsAiming(true);
    updateAimPos(e);
  };

  const updateAimPos = (e: React.MouseEvent | MouseEvent) => {
    if (!boardRef.current) return;
    const rect = boardRef.current.getBoundingClientRect();
    const borderLeft = boardRef.current.clientLeft || 0;
    const borderTop = boardRef.current.clientTop || 0;
    setAimPos({
      x: e.clientX - rect.left - borderLeft,
      y: e.clientY - rect.top - borderTop
    });
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isAiming || gameState !== GameState.PLAYING || dartsLeft <= 0 || !boardRef.current) {
      setIsAiming(false);
      return;
    }
    playThrowSound();
    const newDart: ActiveDart = {
      id: Math.random().toString(36).substr(2, 9),
      startX: launchPoint.x, startY: launchPoint.y,
      targetX: aimPos.x, targetY: aimPos.y, progress: 0,
    };
    setDartsLeft(d => d - 1);
    setActiveDarts(prev => [...prev, newDart]);
    setIsAiming(false);
  };

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => { if (isAiming) updateAimPos(e); };
    window.addEventListener('mousemove', handleGlobalMouseMove);
    return () => window.removeEventListener('mousemove', handleGlobalMouseMove);
  }, [isAiming]);

  useEffect(() => {
    const interval = setInterval(() => {
      const time = Date.now() / 1000;
      setCurrentTime(time);
      if (balloons.length > 0) {
        setBalloons(prev => prev.map(b => {
          const isRing = (b.id.startsWith('b-1-') || b.id.startsWith('b-3-')) && !b.id.endsWith('center');
          if (!b.isPopped && isRing && b.orbitCenterX !== undefined && b.orbitCenterY !== undefined && b.angleOffset !== undefined) {
            const isTop = b.id.includes('top');
            const speed = isTop ? ROTATION_SPEED : -ROTATION_SPEED; 
            const phase = (time * speed) + b.angleOffset;
            const sw = BALLOON_WIDTH * (b.scale || 1);
            const sh = BALLOON_HEIGHT * (b.scale || 1);
            return {
              ...b,
              x: b.orbitCenterX + Math.cos(phase) * RING_ORBIT_RADIUS - sw / 2,
              y: b.orbitCenterY + Math.sin(phase) * RING_ORBIT_RADIUS - sh / 2,
              rotation: phase * (180 / Math.PI) + 90
            };
          }
          return b;
        }));
      }
      if (gameState === GameState.PLAYING) {
        setActiveDarts(prev => {
          const next = prev.map(dart => ({ ...dart, progress: Math.min(1, dart.progress + 0.05) }));
          const finished = next.filter(d => d.progress >= 1);
          if (finished.length > 0) {
            finished.forEach(dart => {
              // Check for hits on balloons
              let hitBalloon: BalloonType | undefined;
              let isAlmost = false;
              balloons.forEach(b => {
                if (b.isPopped) return;
                const sw = BALLOON_WIDTH * (b.scale || 1), sh = BALLOON_HEIGHT * (b.scale || 1);
                if (dart.targetX >= b.x && dart.targetX <= b.x + sw && dart.targetY >= b.y && dart.targetY <= b.y + sh) hitBalloon = b;
                else if (dart.targetX >= b.x - 20 && dart.targetX <= b.x + sw + 20 && dart.targetY >= b.y - 20 && dart.targetY <= b.y + sh + 20) isAlmost = true;
              });

              if (hitBalloon) {
                handlePop(hitBalloon!.id);
                setPinnedDarts(current => [...current, { id: dart.id, x: dart.targetX, y: dart.targetY, rotation: Math.atan2(dart.targetY - dart.startY, dart.targetX - dart.startX) * (180 / Math.PI) }]);
              } else {
                if (isAlmost) triggerCannedPhrase('ALMOST'); else triggerCannedPhrase('MISS');
                const angle = Math.atan2(dart.targetY - dart.startY, dart.targetX - dart.startX);
                setFallingDarts(current => [...current, { id: dart.id, x: dart.targetX, y: dart.targetY, vx: Math.cos(angle) * 2, vy: 2.0, rotation: angle * (180 / Math.PI), vr: 1.2 }]);
              }
            });
          }
          return next.filter(d => d.progress < 1);
        });
        setFallingDarts(prev => prev.map(dart => ({ ...dart, x: dart.x + dart.vx, y: dart.y + dart.vy, rotation: dart.rotation + dart.vr, vy: Math.min(8, dart.vy + 0.2) })).filter(dart => dart.y < GAME_HEIGHT + 300));
      }
    }, 16);
    return () => clearInterval(interval);
  }, [balloons, handlePop, gameState]);

  useEffect(() => {
    if (gameState === GameState.PLAYING && dartsLeft === 0 && activeDarts.length === 0 && fallingDarts.length === 0) {
      setGameState(GameState.GAME_OVER);
      if (movingScore === 30) triggerBarker("", "Wah! A Perfect 30 on the MOVING ones! Special Prize for you!");
      else if (score >= 25) triggerBarker("", "Very good effort! Worth the 100 NTD!");
      else triggerBarker("", "Never mind lah, market game, play for fun!");
    }
  }, [dartsLeft, gameState, activeDarts, fallingDarts, score, movingScore]);

  const revealPrize = async () => {
    setLoadingPrize(true); setGameState(GameState.PRIZE_REVEAL);
    let tier = "Small";
    // ONLY hits on moving balloons count for the Special Prize (Perfect 30 moving hits)
    if (movingScore === 30) tier = "Special";
    else if (score >= 25) tier = "Large";
    else if (score >= 10) tier = "Medium";
    
    const data: PrizeData = await generatePrizeData(score);
    const imageUrl = await generatePrizeImage(`${tier} ${data.name}`);
    setPrize({ id: Date.now().toString(), name: data.name, description: data.description, imageUrl: imageUrl });
    setLoadingPrize(false);
  };

  const renderLanterns = () => (
    <div className="absolute top-12 left-0 right-0 flex justify-around px-12 z-[5] pointer-events-none overflow-visible">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="flex flex-col items-center animate-lantern-sway" style={{ animationDelay: `${i * 0.4}s`, transform: `translateY(${Math.sin(i * 0.8) * 40}px)` }}>
          <div className="relative w-24 h-32 bg-red-600 rounded-[60px] shadow-[0_0_50px_rgba(220,38,38,0.8)] border-y-8 border-yellow-500/90 flex items-center justify-center overflow-hidden">
            <span className="text-yellow-400 text-4xl font-serif font-bold relative z-10 drop-shadow-lg">{LANTERN_CHARS[i % LANTERN_CHARS.length]}</span>
            <div className="absolute inset-x-4 top-0 bottom-0 border-x-2 border-yellow-400/20 rounded-full" />
            <div className="absolute inset-x-8 top-0 bottom-0 border-x-2 border-yellow-400/20 rounded-full" />
            <div className="w-10 h-10 bg-yellow-200/40 blur-xl animate-pulse absolute" />
          </div>
          <div className="w-1.5 h-10 bg-gradient-to-b from-yellow-500 to-transparent shadow-sm mt-[-2px]" />
        </div>
      ))}
    </div>
  );

  const renderVerticalPrizeTiers = () => (
    <div 
      className="fixed z-[110] flex flex-col items-center gap-2 pointer-events-none"
      style={{ 
        right: 'calc(max(1.2rem, (100vw - 1100px) / 6))', 
        top: '185px' 
      }}
    >
      <div className="bg-slate-900/90 backdrop-blur-md border-2 border-yellow-500/40 rounded-full w-14 py-12 flex flex-col items-center shadow-[0_0_30px_rgba(234,179,8,0.15)] min-h-[520px] justify-between">
        <h3 className="text-[9px] font-bungee text-yellow-500 tracking-widest -rotate-90 origin-center whitespace-nowrap mb-6 neon-glow">PRIZE METER</h3>
        
        <div className="relative flex flex-col items-center gap-14 flex-1 justify-center py-6">
          {/* SPECIAL (30 MOVING) */}
          <div className={`relative flex flex-col items-center transition-all duration-300 ${movingScore === 30 ? 'scale-125' : 'opacity-30'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${movingScore === 30 ? 'border-pink-500 bg-pink-500/20 animate-pulse shadow-[0_0_20px_#ec4899]' : 'border-slate-800'}`}>
              <span className={`text-xs font-bold ${movingScore === 30 ? 'text-pink-500' : 'text-slate-700'}`}>♛</span>
            </div>
            <div className="absolute left-10 flex flex-col">
               <span className={`whitespace-nowrap text-[9px] font-bungee ${movingScore === 30 ? 'text-pink-500 neon-glow' : 'text-slate-600'}`}>SPECIAL</span>
               <span className={`whitespace-nowrap text-[7px] font-bold ${movingScore === 30 ? 'text-pink-400/80' : 'text-slate-700'}`}>(30 MOVING)</span>
            </div>
          </div>

          {/* LARGE (25) */}
          <div className={`relative flex flex-col items-center transition-all duration-300 ${score >= 25 ? 'scale-110' : 'opacity-40'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${score >= 25 && movingScore < 30 ? 'border-yellow-400 bg-yellow-400/20 shadow-[0_0_15px_#facc15]' : (movingScore === 30 ? 'border-yellow-400/40' : 'border-slate-800')}`}>
              <span className={`text-xs font-bold ${score >= 25 ? 'text-yellow-400' : 'text-slate-700'}`}>★</span>
            </div>
            <span className={`absolute left-10 whitespace-nowrap text-[9px] font-bungee ${score >= 25 ? 'text-yellow-400' : 'text-slate-600'}`}>LARGE (25+)</span>
          </div>

          {/* MEDIUM (10) */}
          <div className={`relative flex flex-col items-center transition-all duration-300 ${score >= 10 ? 'scale-110' : 'opacity-40'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${score >= 10 && score < 25 ? 'border-blue-400 bg-blue-400/20 shadow-[0_0_15px_#60a5fa]' : (score >= 25 ? 'border-blue-400/40' : 'border-slate-800')}`}>
              <span className={`text-xs font-bold ${score >= 10 ? 'text-blue-400' : 'text-slate-700'}`}>♦</span>
            </div>
            <span className={`absolute left-10 whitespace-nowrap text-[9px] font-bungee ${score >= 10 ? 'text-blue-400' : 'text-slate-600'}`}>MEDIUM (10+)</span>
          </div>

          {/* SMALL (5) */}
          <div className={`relative flex flex-col items-center transition-all duration-300 ${score >= 5 ? 'scale-110' : 'opacity-40'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${score >= 5 && score < 10 ? 'border-rose-400 bg-rose-400/20 shadow-[0_0_15px_#fb7185]' : (score >= 10 ? 'border-rose-400/40' : 'border-slate-800')}`}>
              <span className={`text-xs font-bold ${score >= 5 ? 'text-rose-400' : 'text-slate-700'}`}>•</span>
            </div>
            <span className={`absolute left-10 whitespace-nowrap text-[9px] font-bungee ${score >= 5 ? 'text-rose-400' : 'text-slate-600'}`}>SMALL (5+)</span>
          </div>
          
          {/* Vertical Fill Line */}
          <div className="absolute top-4 bottom-4 w-[2px] bg-yellow-900/30 -z-10">
            <div 
              className="absolute bottom-0 w-full bg-gradient-to-t from-rose-500 via-blue-500 to-yellow-500 transition-all duration-500" 
              style={{ height: `${(Math.min(30, score) / 30) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderGameContent = (isBlurred: boolean = false) => (
    <div className={`flex flex-col items-center transition-all duration-700 ${isBlurred ? 'blur-sm grayscale-[0.1] opacity-90 scale-[1.01]' : ''}`}>
      <StallFrame>
        <div ref={boardRef} className="relative bg-[#c4a484] rounded-xl border-8 border-[#3e2723] shadow-inner overflow-hidden" style={{ width: GAME_WIDTH, height: GAME_HEIGHT }} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>
          <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')]"></div>
          {[...Array(numClusters)].map((_, i) => (
            <div key={`cluster-box-${i}`} className="absolute border-4 border-[#3e2723] rounded-xl bg-[#3e2723]/5 shadow-[inset_0_2px_10px_rgba(0,0,0,0.1)] transition-all duration-300"
              style={{ left: startX + (i * (clusterWidth + clusterGap)) - 8, top: startY - 12, width: clusterWidth + 16, height: totalHeight + 24, zIndex: 0 }} />
          ))}
          {[1, 3].map(clusterIdx => {
            const clusterCenterX = startX + (clusterIdx * (clusterWidth + clusterGap)) + clusterWidth / 2;
            // Reflect the position adjustment in the visual clock holders as well
            const upperCenterY = startY + totalHeight * 0.25, lowerCenterY = startY + totalHeight * 0.75;
            return (
              <React.Fragment key={`clock-holders-${clusterIdx}`}>
                <ClockHolder centerX={clusterCenterX} centerY={upperCenterY} radius={RING_ORBIT_RADIUS} balloons={balloons.filter(b => b.id.startsWith(`b-${clusterIdx}-top-`) && !b.id.endsWith('center'))} rotationSpeed={ROTATION_SPEED} time={currentTime} isClockwise={true} />
                <ClockHolder centerX={clusterCenterX} centerY={lowerCenterY} radius={RING_ORBIT_RADIUS} balloons={balloons.filter(b => b.id.startsWith(`b-${clusterIdx}-bottom-`) && !b.id.endsWith('center'))} rotationSpeed={ROTATION_SPEED} time={currentTime} isClockwise={false} />
              </React.Fragment>
            );
          })}
          {balloons.map(b => (
            <div key={b.id} style={{ position: 'relative', zIndex: b.isCenter ? 20 : (b.orbitCenterX !== undefined ? 15 : 5) }}><Balloon balloon={b} /></div>
          ))}

          {!isBlurred && pinnedDarts.map(dart => (
            <div key={dart.id} style={{ position: 'absolute', left: dart.x, top: dart.y, width: 80, height: 24, transformOrigin: '100% 50%', transform: `translate(-100%, -50%) rotate(${dart.rotation}deg) scale(0.5)`, zIndex: 8 }}><DartVisual /></div>
          ))}
          {!isBlurred && fallingDarts.map(dart => (
            <div key={dart.id} style={{ position: 'absolute', left: dart.x, top: dart.y, width: 80, height: 24, transformOrigin: '100% 50%', transform: `translate(-100%, -50%) rotate(${dart.rotation}deg) scale(0.6)`, zIndex: 8, filter: 'drop-shadow(2px 4px 6px rgba(0,0,0,0.5))' }}><DartVisual /></div>
          ))}
          {!isBlurred && activeDarts.map(dart => {
            const t = dart.progress, curX = dart.startX + (dart.targetX - dart.startX) * t, curY = dart.startY + (dart.targetY - dart.startY) * t, scale = 10.0 - (t * 9.5), rot = Math.atan2(dart.targetY - dart.startY, dart.targetX - dart.startX) * (180 / Math.PI);
            return (
              <div key={dart.id} style={{ position: 'absolute', left: curX, top: curY, width: 80, height: 24, transformOrigin: '100% 50%', transform: `translate(-100%, -50%) rotate(${rot}deg) scale(${scale})`, zIndex: 8, filter: `blur(${t * 0.1}px) drop-shadow(0 ${20 * (1 - t)}px ${30 * (1 - t)}px rgba(0,0,0,0.3))` }}><DartVisual /></div>
            );
          })}
          {gameState === GameState.GAME_OVER && (
            <div className="absolute inset-0 z-[120] bg-slate-950/85 backdrop-blur-md flex flex-col items-center justify-center p-8">
              <h2 className="text-6xl font-bungee text-white mb-2 neon-glow">STALL CLOSED</h2>
              <p className="text-2xl font-bungee text-blue-400 mb-2">TOTAL SCORE: {score}</p>
              <p className="text-xl font-bungee text-pink-500 mb-8">MOVING HITS: {movingScore}</p>
              <div className="flex gap-4">
                <button onClick={initGame} className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-bungee text-lg rounded-xl transition-all border border-slate-700">TRY AGAIN</button>
                <button onClick={revealPrize} className="px-8 py-4 bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-bungee text-lg rounded-xl transition-all shadow-lg">CLAIM PRIZE</button>
              </div>
            </div>
          )}
        </div>
      </StallFrame>
      <DartTable />
    </div>
  );

  return (
    <div className="relative w-screen h-screen flex flex-col items-center justify-center select-none overflow-hidden cursor-dart-target">
      <NightMarketBackground />
      {gameState !== GameState.START && (
        <div className="absolute top-0 w-full p-6 flex justify-between items-start pointer-events-none z-30">
          <div className="bg-slate-900/80 p-3 rounded-xl border border-pink-500/30 backdrop-blur-md shadow-lg flex flex-col items-center w-36 pointer-events-auto">
             <span className="text-[10px] text-pink-400 uppercase tracking-widest font-bold mb-1">Moving Paps</span>
             <span className="text-2xl font-bungee text-white">{movingScore} / 30</span>
          </div>
          <div className="flex gap-4 pointer-events-auto">
            {/* Darts HUD */}
            <div className="bg-slate-900/80 p-3 rounded-xl border border-blue-500/30 backdrop-blur-md shadow-lg flex flex-col items-center w-28 group">
              <div className="flex items-center gap-1.5 mb-1">
                <svg className="w-4 h-4 text-blue-400" viewBox="0 0 100 30"><path d="M5 15 L35 15 L5 2 L12 15 Z M5 15 L35 15 L5 28 L12 15 Z" fill="currentColor" /><rect x="30" y="13.5" width="50" height="3" fill="currentColor" opacity="0.6"/><path d="M85 15 L100 15 L85 10 L85 20 Z" fill="currentColor" /></svg>
                <span className="text-[10px] text-blue-400 uppercase tracking-widest font-bold">Darts</span>
              </div>
              <span className="text-2xl font-bungee text-white">{dartsLeft}</span>
            </div>
            
            {/* Score HUD */}
            <div className="bg-slate-900/80 p-3 rounded-xl border border-yellow-500/30 backdrop-blur-md shadow-lg flex flex-col items-center w-28 group">
              <div className="flex items-center gap-1.5 mb-1">
                <svg className="w-4 h-4 text-rose-400" viewBox="0 0 100 130"><path d="M50 8 C25 8, 8 32, 8 58 C8 85, 28 112, 50 112 C72 112, 92 85, 92 58 C92 32, 75 8, 50 8 Z" fill="currentColor" /><path d="M44 112 L56 112 L54 120 L46 120 Z" fill="currentColor" opacity="0.6" /></svg>
                <span className="text-[10px] text-yellow-400 uppercase tracking-widest font-bold">Total</span>
              </div>
              <span className="text-2xl font-bungee text-white">{score}</span>
            </div>
          </div>
        </div>
      )}

      {/* Prize Meter - Vertical on the right corner */}
      {gameState === GameState.PLAYING && renderVerticalPrizeTiers()}

      <AuntieBarker message={barkerText} isThinking={isBarkerThinking} hidden={gameState === GameState.INTRO_DIALOGUE || gameState === GameState.START} />

      {gameState === GameState.START && (
        <div className="relative z-50 flex flex-col items-center justify-center w-full h-full scale-90 md:scale-100">
          {renderLanterns()}
          <div className="opacity-40 scale-95 grayscale-[0.5] transition-transform duration-1000 pointer-events-none">{renderGameContent(true)}</div>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="relative group animate-in zoom-in duration-700">
              <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-[110%] h-20 z-20 flex overflow-hidden rounded-t-full border-t-4 border-slate-900 shadow-2xl">
                {[...Array(8)].map((_, i) => (<div key={i} className={`flex-1 h-full ${i % 2 === 0 ? 'bg-red-600' : 'bg-white'}`} />))}
              </div>
              <div className="absolute -top-10 left-0 right-0 flex justify-around px-12 z-30 pointer-events-none">
                {[...Array(6)].map((_, i) => (<div key={i} className="flex flex-col items-center"><div className="w-4 h-6 bg-amber-500 rounded-full shadow-[0_0_20px_#f59e0b] border border-amber-600 animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} /></div>))}
              </div>
              <div className="relative bg-slate-900/95 p-10 pt-14 rounded-3xl border-4 border-yellow-600 text-center backdrop-blur-xl shadow-[0_0_100px_rgba(234,179,8,0.3)] max-w-lg mx-4">
                <h1 className="text-5xl font-bungee text-white mb-2 neon-glow tracking-tighter">BALLOON DART POP</h1>
                <p className="text-yellow-400 font-bold tracking-[0.1em] text-2xl mb-8 uppercase" style={{ fontFamily: 'sans-serif' }}>馬克萊氣球屋</p>
                <button onClick={startIntro} className="group relative w-full bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-bungee text-2xl py-6 rounded-2xl transition-all shadow-[0_10px_0_rgb(180,83,9)] translate-y-[-10px] active:translate-y-0 active:shadow-none overflow-hidden">
                  <span className="relative z-10">ENTER BOOTH</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
                </button>
              </div>
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[105%] h-8 bg-amber-950 rounded-lg shadow-xl border-t-2 border-white/10" />
            </div>
          </div>
        </div>
      )}

      {gameState === GameState.INTRO_DIALOGUE && (
        <div className="fixed inset-0 z-[150] flex flex-col items-center justify-center p-4">
          <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">{renderGameContent(true)}</div>
          <div className="relative z-10 w-full h-full flex items-center justify-center cursor-pointer bg-black/50 backdrop-blur-sm" onClick={nextDialogue}>
            <div className="max-w-4xl w-full flex flex-col gap-4 relative">
              <div className="flex flex-col gap-6 w-full">
                {INTRO_LINES.slice(Math.max(0, dialogueIndex - 1), dialogueIndex + 1).map((line, idx) => {
                  const isAuntie = line.speaker === 'Auntie', isCurrent = (dialogueIndex > 0 ? idx === 1 : idx === 0);
                  return (
                    <div key={idx} className={`flex items-end gap-6 w-full animate-in fade-in slide-in-from-bottom-6 duration-500 ${isAuntie ? 'flex-row' : 'flex-row-reverse'}`}>
                      {isAuntie ? (
                        <div className={`w-[200px] h-[300px] shrink-0 transition-all duration-300 ${isCurrent ? 'opacity-100 scale-100' : 'opacity-40 scale-90 grayscale'}`}><AuntieCharacter className="w-full h-full" /></div>
                      ) : (<div className="w-[200px] h-[300px] shrink-0" />)}
                      <div className={`flex-1 flex flex-col ${isAuntie ? 'items-start' : 'items-end'}`}>
                        <div className={`text-[10px] font-bungee mb-1 px-2 tracking-widest text-yellow-400`}>{line.speaker.toUpperCase()}</div>
                        <div className={`p-6 rounded-3xl border-2 transition-all duration-300 shadow-2xl ${isAuntie ? 'bg-slate-900 border-yellow-500 rounded-bl-none text-white' : 'bg-slate-800 border-yellow-500 rounded-br-none text-white'} ${isCurrent ? 'scale-100 opacity-100' : 'scale-95 opacity-50'}`}>
                          <p className="text-xl md:text-3xl font-marker leading-snug">
                            " {line.text} "
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {(gameState === GameState.PLAYING || gameState === GameState.GAME_OVER) && renderGameContent()}

      {gameState === GameState.PRIZE_REVEAL && (
        <div className="fixed inset-0 z-[200] bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
           {loadingPrize ? (
             <div className="flex flex-col items-center gap-6"><div className="w-16 h-16 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div><p className="font-bungee text-2xl text-white animate-pulse uppercase">Searching for your treasure...</p></div>
           ) : prize ? (
             <div className="max-w-xl w-full bg-slate-900 border-4 border-yellow-500 rounded-3xl p-8 shadow-2xl animate-in zoom-in duration-500">
                <h2 className="text-3xl font-bungee text-yellow-400 mb-2">YOU WIN!</h2>
                <div className="relative aspect-square w-64 mx-auto my-6 rounded-2xl overflow-hidden shadow-2xl border-4 border-slate-800 bg-slate-950"><img src={prize.imageUrl} alt={prize.name} className="w-full h-full object-cover" /></div>
                <h3 className="text-2xl font-bungee text-white mb-2">{prize.name}</h3>
                <p className="text-slate-400 text-sm font-medium italic mb-8 px-4">"{prize.description}"</p>
                <button onClick={() => setGameState(GameState.START)} className="px-10 py-4 bg-pink-600 hover:bg-pink-500 text-white font-bungee text-lg rounded-xl transition-all">RETURN TO MARKET</button>
             </div>
           ) : null}
        </div>
      )}

      <style>{`
        @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
        .animate-shimmer { animation: shimmer 1.5s infinite; }
        @keyframes lantern-sway { 0%, 100% { transform: rotate(-8deg); } 50% { transform: rotate(8deg); } }
        .animate-lantern-sway { animation: lantern-sway 4s ease-in-out infinite; transform-origin: top center; }
      `}</style>
    </div>
  );
};

export default App;
