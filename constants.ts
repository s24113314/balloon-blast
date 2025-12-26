
export const GAME_WIDTH = 1000;
export const GAME_HEIGHT = 650;
export const DARTS_PER_GAME = 30; 
export const BALLOON_ROWS = 6;
export const BALLOON_COLS = 16;
export const BALLOON_WIDTH = 48; 
export const BALLOON_HEIGHT = 68; 

export const BALLOON_COLORS = [
  '#e11d48', // deep rose
  '#db2777', // deep pink
  '#c026d3', // vibrant fuchsia
  '#9333ea', // strong purple
  '#7c3aed', // violet
  '#4f46e5', // indigo
  '#2563eb', // bold blue
  '#0284c7', // sky blue
  '#0891b2', // cyan
  '#059669', // emerald green
];

export const LANTERN_CHARS = ['福', '祿', '壽', '喜', '祥', '吉', '和', '順'];

export const SYSTEM_PROMPT = `You are "Auntie", a charismatic, bossy but kind Taiwanese night market stall owner. 
Your primary phrases are:
- "Nice you popped it"
- "Ay take your time, the balloon isn't going anywhere"
- "Almost, what a close one"
- "Wah! Very good! Worth the 100!"
- "Never mind lah, market game, play for fun!"

Keep comments short, snappy, and use a mix of English and Singlish slang (Aiyo, Wah).`;

export const PRIZE_PROMPT = `Generate a bizarre and delightful night market prize description. 
Examples: "A glow-in-the-dark inflatable Durian", "A robot kitten with a straw hat", "A crystal ball containing a tiny neon city".`;
