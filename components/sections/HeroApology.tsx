'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import LoveLetterEnvelope from '@/components/LoveLetterEnvelope';

export default function HeroApology() {
  const [showText, setShowText] = useState(false);
  const { ref, inView } = useInView({ threshold: 0.3 });

  useEffect(() => {
    if (inView) {
      setShowText(true);
    }
  }, [inView]);

  return (
    <section ref={ref} className="relative w-screen h-screen flex items-center justify-center overflow-hidden will-change-transform">
      <style>{`
        @keyframes ken-burns-final {
          from { transform: scale(1) translateZ(0); }
          to { transform: scale(1.18) translateZ(0); }
        }
        @keyframes petal-drift {
          0% { transform: translateY(-20px) rotate(0deg); opacity: 0; }
          10% { opacity: 0.8; }
          90% { opacity: 0.6; }
          100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
        }
        .ken-burns-final {
          animation: ken-burns-final 22s ease-out forwards;
          backface-visibility: hidden;
        }
        .petal { animation: petal-drift linear infinite; }
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
        animate={{ opacity: [0.15, 0.4, 0.15] }}
        transition={{ duration: 12, repeat: Infinity }}
        style={{ background: 'radial-gradient(circle at 50% 50%, rgba(226, 178, 90, 0.25) 0%, transparent 70%)' }}
      />

      {/* Botanical decorations */}
      <svg className="absolute top-4 left-4 w-32 h-32 text-white/20 pointer-events-none" viewBox="0 0 100 100">
        <path d="M10,90 Q30,60 20,30 Q25,50 40,40 Q30,55 50,50" fill="none" stroke="currentColor" strokeWidth="1"/>
        <circle cx="25" cy="35" r="4" fill="currentColor" opacity="0.5"/>
        <circle cx="45" cy="48" r="3" fill="currentColor" opacity="0.4"/>
      </svg>
      <svg className="absolute top-8 right-8 w-28 h-28 text-white/15 pointer-events-none" viewBox="0 0 100 100">
        <path d="M90,10 Q70,40 80,70 Q75,50 60,60 Q70,45 50,50" fill="none" stroke="currentColor" strokeWidth="1"/>
        <circle cx="72" cy="62" r="3" fill="currentColor" opacity="0.5"/>
      </svg>
      <svg className="absolute bottom-20 left-8 w-24 h-24 text-white/15 pointer-events-none" viewBox="0 0 100 100">
        <path d="M5,100 Q20,70 15,40 Q25,60 40,50 Q25,65 45,60" fill="none" stroke="currentColor" strokeWidth="1"/>
      </svg>

      {/* Cherry blossom petals */}
      <svg className="petal absolute left-[15%] w-3 h-3 text-pink-200/60" style={{ animationDuration: '18s' }} viewBox="0 0 20 20">
        <ellipse cx="10" cy="10" rx="8" ry="6" fill="currentColor"/>
      </svg>
      <svg className="petal absolute left-[45%] w-2.5 h-2.5 text-rose-200/50" style={{ animationDuration: '22s', animationDelay: '3s' }} viewBox="0 0 20 20">
        <ellipse cx="10" cy="10" rx="7" ry="5" fill="currentColor"/>
      </svg>
      <svg className="petal absolute right-[25%] w-3 h-3 text-pink-100/55" style={{ animationDuration: '20s', animationDelay: '7s' }} viewBox="0 0 20 20">
        <ellipse cx="10" cy="10" rx="8" ry="6" fill="currentColor"/>
      </svg>
      <svg className="petal absolute left-[70%] w-2 h-2 text-rose-100/45" style={{ animationDuration: '25s', animationDelay: '12s' }} viewBox="0 0 20 20">
        <ellipse cx="10" cy="10" rx="7" ry="5" fill="currentColor"/>
      </svg>

      <div className="relative z-10 text-center px-8 max-w-5xl">
        <motion.h1
          className="text-5xl md:text-7xl text-white mb-8 leading-tight drop-shadow-2xl"
          style={{ fontFamily: '"Fredoka", sans-serif' }}
          initial={{ opacity: 0, y: 50 }}
          animate={showText ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.3 }}
        >
          Fiha, I'm so sorry... 🥺🌹
        </motion.h1>

        <motion.div
          className="mt-6"
          initial={{ opacity: 0, y: 40 }}
          animate={showText ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.5 }}
        >
          <LoveLetterEnvelope
            text="I know I hurt your feelings, and seeing you upset breaks my heart. You are my favorite person, my safest home, and my whole heart. 💖 I promise to hold your heart safer from now on and make it up to you, one smile at a time, my love. ✨"
            signature="9:05 PM • fuad"
          />
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
