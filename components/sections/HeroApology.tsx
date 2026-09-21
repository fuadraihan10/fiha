'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function HeroApology() {
  const [showText, setShowText] = useState(false);
  const { ref, inView } = useInView({ threshold: 0.3 });

  useEffect(() => {
    if (inView) {
      setShowText(true);
    }
  }, [inView]);

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7 },
    },
  };

  const apologyText = `I know I hurt your feelings, and seeing you upset breaks my heart. You are my favorite person, my safest home, and my whole heart. I promise to hold your heart safer from now on and make it up to you, one smile at a time, my love. 💖✨`;

  return (
    <section ref={ref} className="relative w-screen h-screen flex items-center justify-center overflow-hidden will-change-transform">
      <style>{`
        @keyframes ken-burns-final {
          from {
            transform: scale(1) translateZ(0);
          }
          to {
            transform: scale(1.18) translateZ(0);
          }
        }
        
        .ken-burns-final {
          animation: ken-burns-final 22s ease-out forwards;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
      `}</style>

      <div className="absolute inset-0 overflow-hidden">
        <div className="ken-burns-final w-full h-full">
          <Image
            src="/photo_6330266858246225840_y.jpg"
            alt="Fiha and I leaning together in a garden with deep red roses"
            fill
            priority
            quality={95}
            className="object-cover"
            sizes="100vw"
          />
        </div>
      </div>

      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'radial-gradient(ellipse at 50% 50%, rgba(225, 178, 90, 0.1) 0%, rgba(0, 0, 0, 0.35) 100%)',
            'radial-gradient(ellipse at 60% 40%, rgba(225, 178, 90, 0.15) 0%, rgba(0, 0, 0, 0.4) 100%)',
            'radial-gradient(ellipse at 40% 60%, rgba(225, 178, 90, 0.1) 0%, rgba(0, 0, 0, 0.35) 100%)',
          ],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          opacity: [0.15, 0.4, 0.15],
        }}
        transition={{ duration: 12, repeat: Infinity }}
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(226, 178, 90, 0.25) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 text-center px-8 max-w-5xl">
        <motion.h1
          className="font-serif text-9xl md:text-11xl text-white mb-12 leading-tight drop-shadow-2xl"
          style={{ fontFamily: '"Playfair Display", serif', fontWeight: 700 }}
          initial={{ opacity: 0, y: 50 }}
          animate={showText ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.3 }}
        >
          Fiha, I'm so sorry... 🥺🌹
        </motion.h1>

        <motion.div
          className="max-w-2xl mx-auto text-center space-y-3 text-white/90 text-xl md:text-2xl leading-relaxed font-light backdrop-blur-sm bg-black/20 p-8 rounded-2xl border border-rose-500/20 shadow-xl"
          initial={{ opacity: 0, y: 30 }}
          animate={showText ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.5 }}
        >
          <p>
            I know I hurt your feelings, and seeing you upset breaks my heart. You are my favorite person, my safest home, and my whole heart. 💖
          </p>
          <p>
            I promise to hold your heart safer from now on and make it up to you, one smile at a time, my love. ✨
          </p>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-10 text-white text-xl tracking-widest uppercase font-light"
        animate={{ y: [0, -30, 0], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3.5, repeat: Infinity }}
      >
        keep scrolling…
      </motion.div>
    </section>
  );
}
