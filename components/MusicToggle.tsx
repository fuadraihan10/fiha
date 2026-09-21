'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function MusicToggle() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <motion.div
      className="fixed bottom-12 right-12 z-40"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 2, duration: 0.6 }}
    >
      <motion.button
        onClick={() => setIsPlaying(!isPlaying)}
        className="w-16 h-16 rounded-full bg-rose-red text-white flex items-center justify-center shadow-xl will-change-transform"
        style={{ backgroundColor: 'var(--rose-red)' }}
        whileHover={{ scale: 1.15, boxShadow: '0 20px 50px rgba(193, 39, 59, 0.6)' }}
        whileTap={{ scale: 0.9 }}
        title={isPlaying ? 'Music on' : 'Music off'}
      >
        <motion.span
          className="text-3xl"
          animate={{ rotate: isPlaying ? 360 : 0 }}
          transition={{ duration: isPlaying ? 4 : 0.3, repeat: isPlaying ? Infinity : 0 }}
        >
          {isPlaying ? '♫' : '♪'}
        </motion.span>
      </motion.button>

      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`note-${i}`}
          className="absolute w-1 h-1 text-rose-red pointer-events-none"
          initial={{ x: 0, y: 0, opacity: 0 }}
          animate={isPlaying ? { x: Math.random() * 80 - 40, y: Math.random() * 80 - 40, opacity: [0, 1, 0] } : {}}
          transition={{ duration: 1.5, delay: i * 0.1, repeat: isPlaying ? Infinity : 0 }}
        >
          ♪
        </motion.div>
      ))}
    </motion.div>
  );
}
