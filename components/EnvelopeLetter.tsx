'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface EnvelopeLetterProps {
  text: string;
  timestamp?: string;
}

export function EnvelopeLetter({ text, timestamp }: EnvelopeLetterProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center my-8 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
      {!isOpen ? (
        <motion.div 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative w-72 h-44 bg-rose-200 rounded-2xl border-2 border-rose-300 shadow-lg flex items-center justify-center overflow-hidden"
        >
          {/* Flap lines */}
          <div className="absolute top-0 w-0 h-0 border-l-[144px] border-l-transparent border-r-[144px] border-r-transparent border-t-[90px] border-t-rose-300" />
          {/* Heart Seal */}
          <div className="z-10 bg-white/90 p-3 rounded-full shadow-md text-2xl animate-pulse">
            💌
          </div>
          <span className="absolute bottom-3 text-xs text-rose-800 font-semibold tracking-wider">
            TAP TO OPEN MY LETTER
          </span>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="max-w-xl mx-auto p-6 bg-cream/95 backdrop-blur-md rounded-3xl border-2 border-rose-300/60 shadow-2xl text-center space-y-4"
        >
          <div className="text-3xl">🌸</div>
          <p className="text-rose-950 font-['Caveat'] text-2xl leading-relaxed">
            {text}
          </p>
          {timestamp && (
            <div className="pt-3 border-t border-rose-200 text-xs font-mono text-rose-500">
              {timestamp}
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
