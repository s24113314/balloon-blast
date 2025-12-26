
import React, { useState, useEffect } from 'react';
import AuntieCharacter from './AuntieCharacter';

interface AuntieBarkerProps {
  message: string;
  isThinking: boolean;
  hidden?: boolean;
}

const AuntieBarker: React.FC<AuntieBarkerProps> = ({ message, isThinking, hidden }) => {
  const [showBubble, setShowBubble] = useState(false);

  useEffect(() => {
    if (message && message.trim().length > 0) {
      setShowBubble(true);
      const timer = setTimeout(() => {
        setShowBubble(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  if (hidden) return null;

  return (
    <>
      <div 
        className={`fixed bottom-[600px] left-[2%] z-[100] transition-all duration-500 transform ${
          showBubble || isThinking ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
        }`}
      >
        <div className="relative pointer-events-none select-none">
          <div className="bg-white/95 backdrop-blur-md p-5 rounded-3xl rounded-bl-none shadow-[0_20px_50px_rgba(0,0,0,0.8)] border-4 border-slate-900 max-w-[240px] min-w-[180px]">
            <div className="text-slate-900 font-marker text-lg leading-tight text-center italic min-h-[1.5em] flex items-center justify-center">
              {isThinking ? "Thinking, honey..." : (showBubble ? message : "")}
            </div>
            <div className="absolute -bottom-6 left-0 w-0 h-0 border-l-[20px] border-l-transparent border-t-[30px] border-t-slate-900"></div>
            <div className="absolute -bottom-3 left-1 w-0 h-0 border-l-[14px] border-l-transparent border-t-[20px] border-t-white z-10"></div>
          </div>
        </div>
      </div>

      <AuntieCharacter 
        className="fixed bottom-[40px] left-[-130px] z-20 w-[480px] h-[660px]" 
        isThinking={isThinking} 
      />
    </>
  );
};

export default AuntieBarker;
