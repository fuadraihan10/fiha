'use client';

import { useEffect, useState } from 'react';
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
    <div className="relative w-screen h-screen overflow-hidden flex items-center justify-center">
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(-45deg, #FFF5F6, #FFD1DC, #FFF5F6, #FFD1DC)',
          backgroundSize: '400% 400%',
        }}
        animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={`dust-${i}`}
            className="absolute w-2 h-2 rounded-full will-change-transform"
            style={{
              background: `rgba(193, 39, 59, ${0.2 + Math.random() * 0.4})`,
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
          className="fixed w-2 h-2 rounded-full pointer-events-none"
          style={{ backgroundColor: '#FFD1DC' }}
          initial={{ x: particle.x, y: particle.y, opacity: 1, scale: 1 }}
          animate={{
            x: particle.x + particle.vx * 60,
            y: particle.y + particle.vy * 60,
            opacity: 0,
            scale: 0,
          }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      ))}

      <motion.div
        className="absolute inset-0 pointer-events-none will-change-transform"
        style={{
          background: `radial-gradient(circle 800px at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 209, 220, 0.4), transparent 70%)`,
        }}
      />

      <div className="absolute top-8 left-8 text-4xl opacity-60 animate-pulse">🌸</div>
      <div className="absolute top-20 right-16 text-3xl opacity-50">🍃</div>
      <div className="absolute bottom-32 left-20 text-3xl opacity-55">🌸</div>
      <div className="absolute bottom-20 right-24 text-4xl opacity-60 animate-pulse">🍃</div>
      <div className="absolute top-1/4 left-12 text-2xl opacity-45">🌸</div>
      <div className="absolute top-1/3 right-10 text-2xl opacity-50">🍃</div>

      <div className="relative z-10 text-center px-8 max-w-5xl">
        <motion.div
          className="mb-24"
          animate={{
            boxShadow: [
              '0 0 30px rgba(193, 39, 59, 0.2)',
              '0 0 60px rgba(193, 39, 59, 0.35)',
              '0 0 30px rgba(193, 39, 59, 0.2)',
            ],
          }}
          transition={{ duration: 3.5, repeat: Infinity }}
        >
          <h1
            className="text-8xl md:text-9xl text-[#7A1F2B] leading-tight drop-shadow-lg"
            style={{ fontFamily: '"Fredoka", sans-serif' }}
          >
            Do you love me? 🥺💖
          </h1>
        </motion.div>

        <div className="flex flex-col sm:flex-row gap-12 justify-center items-center mt-20">
          <div className="text-5xl">🧸</div>
          <motion.button
            onClick={onAccept}
            className="px-16 py-8 text-white rounded-full font-semibold text-3xl shadow-2xl will-change-transform relative overflow-hidden"
            style={{ backgroundColor: '#C1273B', fontFamily: '"Fredoka", sans-serif' }}
            whileHover={{ scale: 1.15, boxShadow: '0 40px 80px rgba(193, 39, 59, 0.7)' }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, y: 50 }}
            animate={{
              opacity: 1,
              y: 0,
              boxShadow: ['0 0 20px rgba(193, 39, 59, 0.4)', '0 0 40px rgba(193, 39, 59, 0.6)', '0 0 20px rgba(193, 39, 59, 0.4)'],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            YES ❤️
          </motion.button>

          <motion.button
            onClick={handleNo}
            className="px-16 py-8 rounded-full font-semibold text-3xl shadow-2xl will-change-transform"
            style={{ backgroundColor: '#FFD1DC', color: '#7A1F2B', fontFamily: '"Fredoka", sans-serif' }}
            whileHover={{ scale: 1.15, boxShadow: '0 40px 80px rgba(255, 209, 220, 0.7)' }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            NO 🥺
          </motion.button>
        </div>
      </div>

      <motion.div
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-10 text-[#7A1F2B] text-xl tracking-widest uppercase font-light"
        style={{ fontFamily: '"Caveat", cursive' }}
        animate={{ y: [0, -30, 0], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3.5, repeat: Infinity }}
      >
        keep scrolling…
      </motion.div>
    </div>
  );
}
