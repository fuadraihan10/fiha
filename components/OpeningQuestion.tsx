'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface OpeningQuestionProps {
  onAccept: () => void;
}

interface TrailParticle {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export default function OpeningQuestion({ onAccept }: OpeningQuestionProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [touchTrail, setTouchTrail] = useState<TrailParticle[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      if (Math.random() > 0.7) {
        const particle: TrailParticle = {
          id: `${Date.now()}-${Math.random()}`,
          x: e.clientX,
          y: e.clientY,
          vx: (Math.random() - 0.5) * 3,
          vy: (Math.random() - 0.5) * 3,
        };
        
        setTouchTrail(prev => [...prev, particle].slice(-50));
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleNo = () => {
    const videoUrl = process.env.NEXT_PUBLIC_ROLL_VIDEO_URL;
    if (videoUrl) {
      window.location.href = videoUrl;
    } else {
      alert('Video URL not configured. Please set NEXT_PUBLIC_ROLL_VIDEO_URL in environment variables.');
    }
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden flex items-center justify-center bg-gradient-to-br from-blush-pink via-cream to-warm-gold">
      <style>{`
        @keyframes mesh-gradient-final {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>

      <motion.div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(-45deg, #FFD1DC, #F5EBDD, #E2B25A, #C1273B, #FFD1DC)`,
          backgroundSize: '600% 600%',
        }}
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(60)].map((_, i) => (
          <motion.div
            key={`dust-${i}`}
            className="absolute w-2 h-2 rounded-full will-change-transform"
            style={{
              background: `rgba(193, 39, 59, ${0.2 + Math.random() * 0.6})`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: 'blur(1.5px)',
            }}
            animate={{
              y: [-100, 1400],
              x: [0, Math.random() * 150 - 75],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: 20 + Math.random() * 15,
              repeat: Infinity,
              ease: 'linear',
              delay: Math.random() * 8,
            }}
          />
        ))}
      </div>

      {touchTrail.map((particle) => (
        <motion.div
          key={particle.id}
          className="fixed w-3 h-3 pointer-events-none text-rose-red text-lg"
          initial={{ x: particle.x, y: particle.y, opacity: 1, scale: 1 }}
          animate={{ 
            x: particle.x + particle.vx * 60, 
            y: particle.y + particle.vy * 60, 
            opacity: 0, 
            scale: 0 
          }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          💖
        </motion.div>
      ))}

      <motion.div
        className="absolute inset-0 pointer-events-none will-change-transform"
        style={{
          background: `radial-gradient(circle 1200px at ${mousePosition.x}px ${mousePosition.y}px, rgba(225, 178, 90, 0.3), transparent 80%)`,
        }}
      />

      <div className="relative z-10 text-center px-8 max-w-5xl">
        <motion.div
          className="mb-24"
          animate={{
            boxShadow: [
              '0 0 50px rgba(193, 39, 59, 0.25)',
              '0 0 100px rgba(193, 39, 59, 0.5)',
              '0 0 50px rgba(193, 39, 59, 0.25)',
            ],
          }}
          transition={{ duration: 3.5, repeat: Infinity }}
        >
          <h1
            className="font-serif text-10xl md:text-11xl text-charcoal leading-tight drop-shadow-lg"
            style={{ fontFamily: '"Playfair Display", serif', fontWeight: 700 }}
          >
            Do you love me? 🥺💖
          </h1>
        </motion.div>

        <div className="flex flex-col sm:flex-row gap-16 justify-center items-center mt-28">
          <motion.button
            onClick={onAccept}
            className="px-20 py-10 bg-rose-red text-white rounded-full font-semibold text-4xl shadow-2xl will-change-transform relative overflow-hidden"
            style={{ backgroundColor: 'var(--rose-red)' }}
            whileHover={{
              scale: 1.18,
              boxShadow: '0 60px 120px rgba(193, 39, 59, 0.8)',
            }}
            whileTap={{ scale: 0.85 }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 1.2 }}
          >
            <motion.span
              animate={{
                opacity: [0.6, 1, 0.6],
              }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              YES ❤️
            </motion.span>
          </motion.button>

          <motion.button
            onClick={handleNo}
            className="px-20 py-10 bg-blush-pink text-charcoal rounded-full font-semibold text-4xl shadow-2xl will-change-transform"
            style={{ backgroundColor: 'var(--blush-pink)' }}
            whileHover={{
              scale: 1.18,
              boxShadow: '0 60px 120px rgba(255, 209, 220, 0.8)',
            }}
            whileTap={{ scale: 0.85 }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 1.4 }}
          >
            NO 🥺
          </motion.button>
        </div>
      </div>

      <motion.div
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-10 text-charcoal text-2xl tracking-widest uppercase font-light"
        animate={{ y: [0, -40, 0], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3.5, repeat: Infinity }}
      >
        keep scrolling…
      </motion.div>
    </div>
  );
}
