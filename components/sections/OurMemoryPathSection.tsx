'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useRef } from 'react';

interface AnimatedMemoryCardProps {
  image: string;
  alt: string;
  badge: string;
  text: string;
  theme: 'warm' | 'slate' | 'dark' | 'film';
  index: number;
  inView: boolean;
}

function AnimatedMemoryCard({ image, alt, badge, text, theme, index, inView }: AnimatedMemoryCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [holdGlow, setHoldGlow] = useState(false);
  const [vibrated, setVibrated] = useState(false);

  const handleTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;
    setTilt({ rotateX, rotateY });
  };

  const resetTilt = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  const handleTouchHold = () => {
    setHoldGlow(true);
    if (!vibrated && navigator.vibrate) {
      navigator.vibrate([100, 150, 100]);
      setVibrated(true);
    }
  };

  const themeConfig = {
    warm: {
      glow: 'rgba(226, 178, 90, 0.6)',
      bg: '#E2B25A',
    },
    slate: {
      glow: 'rgba(45, 55, 72, 0.6)',
      bg: '#2D3748',
    },
    dark: {
      glow: 'rgba(122, 31, 43, 0.6)',
      bg: '#1E1B18',
    },
    film: {
      glow: 'rgba(226, 178, 90, 0.5)',
      bg: '#1E1B18',
    },
  };

  const config = themeConfig[theme];

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleTilt}
      onMouseLeave={resetTilt}
      onTouchStart={handleTouchHold}
      onTouchEnd={() => setHoldGlow(false)}
      className="relative rounded-3xl overflow-hidden group cursor-pointer will-change-transform"
      initial={{ opacity: 0, y: 120 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, delay: index * 0.35 }}
      style={{
        perspective: '1300px',
        transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
        transition: 'transform 0.1s ease-out',
        minHeight: '56px',
      }}
      whileHover={{ y: -25 }}
    >
      <motion.div
        className="absolute inset-0 rounded-3xl pointer-events-none will-change-transform"
        animate={{
          boxShadow: holdGlow
            ? [
                `0 0 100px ${config.glow}`,
                `0 0 180px ${config.glow}`,
                `0 0 100px ${config.glow}`,
              ]
            : `0 0 60px ${config.glow}`,
        }}
        transition={{ duration: 3, repeat: holdGlow ? Infinity : 0 }}
      />

      <div className="relative aspect-video overflow-hidden rounded-3xl">
        <motion.div
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.15 }}
          transition={{ duration: 0.9 }}
          className="w-full h-full will-change-transform"
        >
          <Image
            src={image}
            alt={alt}
            fill
            quality={95}
            className="object-cover"
            sizes="100vw"
          />
        </motion.div>

        {theme === 'warm' && (
          <motion.div
            className="absolute inset-0 pointer-events-none rounded-3xl"
            animate={{
              background: [
                'radial-gradient(circle at 25% 25%, rgba(226, 178, 90, 0.25) 0%, transparent 50%)',
                'radial-gradient(circle at 75% 75%, rgba(226, 178, 90, 0.25) 0%, transparent 50%)',
                'radial-gradient(circle at 25% 25%, rgba(226, 178, 90, 0.25) 0%, transparent 50%)',
              ],
            }}
            transition={{ duration: 12, repeat: Infinity }}
          />
        )}

        {theme === 'dark' && (
          <motion.div
            className="absolute inset-0 pointer-events-none rounded-3xl"
            animate={{ opacity: [0.6, 0.9, 0.6] }}
            transition={{ duration: 7, repeat: Infinity }}
            style={{
              background: 'url("data:image/svg+xml,%3Csvg viewBox=%270 0 100 100%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cpath d=%27M0,50 Q25,40 50,50 T100,50%27 stroke=%27rgba(122,31,43,0.6)%27 fill=%27none%27 /%3E%3C/svg%3E")',
            }}
          />
        )}
      </div>

      <div
        className="p-12"
        style={{ backgroundColor: config.bg }}
      >
        <motion.div
          className="text-xl font-semibold tracking-widest uppercase mb-3"
          style={{ color: theme === 'warm' ? '#1E1B18' : '#F5EBDD', opacity: 0.85 }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 0.85 } : {}}
          transition={{ duration: 1, delay: index * 0.35 + 0.3 }}
        >
          {badge}
        </motion.div>
        <motion.p
          className="text-xl font-light leading-relaxed"
          style={{ color: theme === 'warm' ? '#1E1B18' : '#F5EBDD' }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: index * 0.35 + 0.5 }}
        >
          {text}
        </motion.p>
      </div>
    </motion.div>
  );
}

export default function OurMemoryPathSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  const memories = [
    {
      image: '/photo_6127373341921318063_w.jpg',
      alt: 'Fiha and I seated closely in a warm café atmosphere',
      badge: 'Chapter I ✨',
      text: 'The moment my whole world turned soft and bright. 🌸',
      theme: 'warm' as const,
    },
    {
      image: '/photo_6197504230806373605_y.jpg',
      alt: 'Fiha and I in a casual everyday mirror selfie moment',
      badge: 'Chapter II ☕💖',
      text: 'Warm hugs, happy giggles, and endless love. ☕💖',
      theme: 'slate' as const,
    },
    {
      image: '/photo_6311957799210433560_y.jpg',
      alt: 'Fiha and I dressed in black in front of a floral mural',
      badge: 'Chapter III 🌟',
      text: 'Hand in hand, ready to face every tomorrow together. 🌟',
      theme: 'dark' as const,
    },
    {
      image: '/photo_6197504230806373599_y.jpg',
      alt: 'Fiha and I in a vintage film-frame mirror selfie',
      badge: 'Chapter IV 💌',
      text: 'My forever Valentine, today and every single day after. 🌹',
      theme: 'film' as const,
    },
  ];

  return (
    <section ref={ref} className="w-screen min-h-screen py-40 px-8 bg-cream relative">
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 1 }}
      >
        <motion.path
          d="M 50% 0 Q 45% 25%, 50% 50% T 50% 100%"
          stroke="rgba(226, 178, 90, 0.25)"
          strokeWidth="4"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={inView ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ duration: 4, ease: 'easeInOut' }}
        />
      </svg>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-36"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2 }}
        >
          <h2
            className="font-serif text-10xl md:text-11xl text-maroon mb-6"
            style={{ fontFamily: '"Playfair Display", serif', fontWeight: 700 }}
          >
            Our Memory Path 🌸💖
          </h2>
        </motion.div>

        <motion.div
          className="space-y-24"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
        >
          {memories.map((memory, index) => (
            <AnimatedMemoryCard key={index} {...memory} index={index} inView={inView} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
