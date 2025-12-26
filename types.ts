
export enum GameState {
  START = 'START',
  INTRO_DIALOGUE = 'INTRO_DIALOGUE',
  PLAYING = 'PLAYING',
  GAME_OVER = 'GAME_OVER',
  PRIZE_REVEAL = 'PRIZE_REVEAL'
}

export interface Balloon {
  id: string;
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  orbitCenterX?: number;
  orbitCenterY?: number;
  angleOffset?: number;
  color: string;
  isPopped: boolean;
  scale: number;
  rotation: number;
  isCenter?: boolean; 
}

export interface Prize {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

export interface BarkerMessage {
  text: string;
  type: 'cheer' | 'jeer' | 'intro';
}
