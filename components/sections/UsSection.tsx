'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useRef, useState } from 'react';
import PolaroidFrame from '@/components/PolaroidFrame';

export default function UsSection() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });
  const cardRef1 = useRef<HTMLDivElement>(null);
  const cardRef2 = useRef<HTMLDivElement>(null);
  const [tilt1, setTilt1] = useState({ rotateX: 0, rotateY: 0 });
  const [tilt2, setTilt2] = useState({ rotateX: 0, rotateY: 0 });
  const [hover1, setHover1] = useState(false);
  const [hover2, setHover2] = useState(false);

  const handleTilt = (e: React.MouseEvent<HTMLDivElement>, setTilt: typeof setTilt1, refEl: typeof cardRef1) => {
    if (!refEl.current) return;
    const rect = refEl.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;
    setTilt({ rotateX, rotateY });
  };

  const resetTilt = (setTilt: typeof setTilt1) => {
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  return (
    <section
      ref={ref}
      className="w-screen min-h-screen py-32 px-8 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #FFF8F0 0%, #FFF0F5 50%, #FFE4E8 100%)',
      }}
    >
      <svg
        className="absolute left-0 top-0 h-full w-24 pointer-events-none opacity-30"
        viewBox="0 0 100 800"
        preserveAspectRatio="none"
      >
        <path
          d="M30 0 Q50 100 30 200 Q10 300 40 400 Q70 500 20 600 Q40 700 30 800"
          stroke="rgba(180, 120, 100, 0.4)"
          strokeWidth="2"
          fill="none"
        />
        <circle cx="35" cy="80" r="6" fill="rgba(255, 182, 193, 0.5)" />
        <circle cx="25" cy="250" r="5" fill="rgba(255, 192, 203, 0.5)" />
        <circle cx="40" cy="420" r="6" fill="rgba(255, 182, 193, 0.5)" />
        <circle cx="28" cy="580" r="5" fill="rgba(255, 192, 203, 0.5)" />
        <path
          d="M35 60 Q45 80 35 100 Q25 120 38 140"
          stroke="rgba(150, 180, 120, 0.4)"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M38 380 Q48 400 38 420 Q28 440 41 460"
          stroke="rgba(150, 180, 120, 0.4)"
          strokeWidth="1.5"
          fill="none"
        />
      </svg>

      <motion.div
        className="absolute top-24 left-12 text-4xl opacity-50"
        animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        🌸
      </motion.div>
      <motion.div
        className="absolute bottom-32 right-16 text-3xl opacity-50"
        animate={{ y: [0, 8, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
      >
        🌺
      </motion.div>
      <motion.div
        className="absolute top-1/2 right-8 text-2xl opacity-40"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
      >
        🌸
      </motion.div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2 }}
        >
          <h2
            className="text-6xl md:text-7xl text-maroon mb-4"
            style={{ fontFamily: '"Fredoka", sans-serif', fontWeight: 600 }}
          >
            Us 💖✨
          </h2>
          <p className="text-charcoal text-xl md:text-2xl font-light max-w-xl mx-auto">
            Every second spent with you is my absolute favorite core memory.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
          <motion.div
            ref={cardRef1}
            onMouseMove={(e) => handleTilt(e, setTilt1, cardRef1)}
            onMouseLeave={() => {
              resetTilt(setTilt1);
              setHover1(false);
            }}
            onMouseEnter={() => setHover1(true)}
            onTouchStart={() => setHover1(true)}
            onTouchEnd={() => setHover1(false)}
            initial={{ opacity: 0, x: -80, rotate: -2 }}
            animate={inView ? { opacity: 1, x: 0, rotate: -2 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
            className="cursor-pointer"
            style={{
              perspective: '1200px',
              transform: `rotateX(${tilt1.rotateX}deg) rotateY(${tilt1.rotateY}deg) rotate(-2deg)`,
              transformStyle: 'preserve-3d',
            }}
          >
            <div
              className="relative bg-white/90 p-4 pb-16 rounded shadow-xl transition-shadow duration-300"
              style={{
                boxShadow: hover1
                  ? '0 20px 50px rgba(180, 100, 100, 0.25), 0 8px 20px rgba(0, 0, 0, 0.15)'
                  : '0 8px 30px rgba(180, 100, 100, 0.15), 0 4px 12px rgba(0, 0, 0, 0.1)',
              }}
            >
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-14 h-5 bg-pink-200/70 border-2 border-dashed border-pink-300/50 rotate-[-6deg] rounded-sm" />
              <div className="relative aspect-square overflow-hidden rounded-sm">
                <Image
                  src="/photo_6294209954961277959_y.jpg"
                  alt="Our favorite portrait"
                  fill
                  quality={95}
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-pink-100/20 to-transparent pointer-events-none" />
              </div>
              <p
                className="mt-4 text-center text-gray-700 text-xl"
                style={{ fontFamily: '"Caveat", cursive' }}
              >
                Our favorite portrait 🌸
              </p>
            </div>
            <span className="absolute -top-4 right-4 text-2xl pointer-events-none rotate-12">🌸</span>
          </motion.div>

          <motion.div
            ref={cardRef2}
            onMouseMove={(e) => handleTilt(e, setTilt2, cardRef2)}
            onMouseLeave={() => {
              resetTilt(setTilt2);
              setHover2(false);
            }}
            onMouseEnter={() => setHover2(true)}
            onTouchStart={() => setHover2(true)}
            onTouchEnd={() => setHover2(false)}
            initial={{ opacity: 0, x: 80, rotate: 1.5 }}
            animate={inView ? { opacity: 1, x: 0, rotate: 1.5 } : {}}
            transition={{ duration: 1, delay: 0.35 }}
            className="cursor-pointer"
            style={{
              perspective: '1200px',
              transform: `rotateX(${tilt2.rotateX}deg) rotateY(${tilt2.rotateY}deg) rotate(1.5deg)`,
              transformStyle: 'preserve-3d',
            }}
          >
            <div
              className="relative bg-white/90 p-4 pb-16 rounded shadow-xl transition-shadow duration-300"
              style={{
                boxShadow: hover2
                  ? '0 20px 50px rgba(180, 100, 100, 0.25), 0 8px 20px rgba(0, 0, 0, 0.15)'
                  : '0 8px 30px rgba(180, 100, 100, 0.15), 0 4px 12px rgba(0, 0, 0, 0.1)',
              }}
            >
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-14 h-5 bg-rose-200/70 border-2 border-dashed border-rose-300/50 rotate-[4deg] rounded-sm" />
              <div className="relative aspect-square overflow-hidden rounded-sm">
                <Image
                  src="/photo_6127373341921318062_w.jpg"
                  alt="Us being us"
                  fill
                  quality={95}
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-pink-100/20 to-transparent pointer-events-none" />
              </div>
              <p
                className="mt-4 text-center text-gray-700 text-xl"
                style={{ fontFamily: '"Caveat", cursive' }}
              >
                Us being us 💖
              </p>
            </div>
            <span className="absolute -bottom-6 left-6 text-2xl pointer-events-none -rotate-12">🌺</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
