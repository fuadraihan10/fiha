'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Heart {
  id: number;
  x: number;
  y: number;
  size: number;
  emoji: string;
}

export default function HeartTrail() {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    const handleTouchOrMove = (e: any) => {
      const x = e.touches ? e.touches[0].clientX : e.clientX;
      const y = e.touches ? e.touches[0].clientY : e.clientY;

      const newHeart: Heart = {
        id: Date.now() + Math.random(),
        x,
        y,
        size: Math.random() * 16 + 12,
        emoji: ['💖', '✨', '🌸', '💕'][Math.floor(Math.random() * 4)],
      };

      setHearts((prev) => [...prev.slice(-15), newHeart]);
    };

    window.addEventListener('pointermove', handleTouchOrMove);
    window.addEventListener('touchmove', handleTouchOrMove);
    return () => {
      window.removeEventListener('pointermove', handleTouchOrMove);
      window.removeEventListener('touchmove', handleTouchOrMove);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      <AnimatePresence>
        {hearts.map((h) => (
          <motion.span
            key={h.id}
            initial={{ opacity: 1, scale: 0.5, x: h.x - 10, y: h.y - 10 }}
            animate={{ opacity: 0, scale: 1.5, y: h.y - 60 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="absolute select-none"
            style={{ fontSize: `${h.size}px` }}
          >
            {h.emoji}
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
}
