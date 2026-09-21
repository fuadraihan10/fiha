'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface MemoryCardProps {
  image: string;
  alt: string;
  chapter: string;
  text: string;
  theme: 'warm' | 'slate' | 'dark' | 'film';
  index: number;
  align: 'left' | 'right';
}

function MemoryCard({ image, alt, chapter, text, theme, index, align }: MemoryCardProps) {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });

  const themeConfig = {
    warm: { bg: '#FFF5F6', accent: '#E2B25A', textColor: '#1E1B18' },
    slate: { bg: '#F0F4F8', accent: '#2D3748', textColor: '#2D3748' },
    dark: { bg: '#FFF5F6', accent: '#7A1F2B', textColor: '#1E1B18' },
    film: { bg: '#FFFBF0', accent: '#E2B25A', textColor: '#1E1B18' },
  };

  const config = themeConfig[theme];

  return (
    <motion.div
      ref={ref}
      className={`relative max-w-2xl my-24 ${align === 'left' ? 'mr-auto ml-8' : 'ml-auto mr-8'}`}
      initial={{ opacity: 0, x: align === 'left' ? -100 : 100, y: 50 }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <motion.div
        className="relative bg-[#FFF5F6] p-4 pb-16 rounded-sm shadow-[0_8px_30px_rgba(180,100,100,0.2)]"
        style={{ perspective: '1000px' }}
        whileHover={{ y: -12, rotate: align === 'left' ? 2 : -2 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
          <motion.div
            initial={{ scale: 1.2, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <Image src={image} alt={alt} fill quality={95} className="object-cover" sizes="(max-width: 768px) 100vw, 672px" />
          </motion.div>
        </div>

        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-7 bg-pink-200/70 border-2 border-dashed border-pink-300/50 rotate-[-8deg] rounded-sm" />

        <motion.div
          className="mt-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <p className="text-sm font-semibold tracking-widest uppercase mb-2" style={{ color: config.accent }}>
            {chapter}
          </p>
          <p className="text-lg font-light" style={{ color: config.textColor }}>
            {text}
          </p>
        </motion.div>

        <motion.span
          className="absolute top-4 right-4 text-3xl"
          initial={{ scale: 0, rotate: -180 }}
          animate={inView ? { scale: 1, rotate: 0 } : {}}
          transition={{ duration: 0.5, delay: 1 }}
        >
          {theme === 'warm' ? '✨' : theme === 'slate' ? '☕' : theme === 'dark' ? '🌟' : '💌'}
        </motion.span>
        <span className="absolute bottom-20 left-4 text-xl opacity-60">🍃</span>
      </motion.div>

      {inView && (
        <motion.div
          className="absolute -inset-4 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {[...Array(5)].map((_, i) => (
            <motion.span
              key={i}
              className="absolute text-pink-300 text-lg"
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${-20 + Math.random() * 40}%`,
              }}
              initial={{ y: 0, opacity: 0 }}
              animate={{ y: -30, opacity: [0, 1, 0] }}
              transition={{ duration: 2, delay: 0.5 + i * 0.2, repeat: Infinity, repeatDelay: 3 }}
            >
              🌸
            </motion.span>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}

function GrowingVine({ progress }: { progress: number }) {
  return (
    <svg className="absolute left-1/2 top-0 h-full w-32 -translate-x-1/2 pointer-events-none z-0" viewBox="0 0 100 800" preserveAspectRatio="none">
      <defs>
        <linearGradient id="vineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#4A7C59" />
          <stop offset="100%" stopColor="#2D5016" />
        </linearGradient>
      </defs>

      <motion.path
        d="M 50 0 Q 25 100, 50 200 Q 75 300, 50 400 Q 25 500, 50 600 Q 75 700, 50 800"
        stroke="url(#vineGradient)"
        strokeWidth="4"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: progress }}
        transition={{ duration: 2, ease: 'easeOut' }}
      />

      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <motion.ellipse
            cx={i % 2 === 0 ? 30 : 70}
            cy={150 + i * 180}
            rx="12"
            ry="6"
            fill="#5A8F4C"
            initial={{ scale: 0, opacity: 0 }}
            animate={progress > (i + 1) * 0.2 ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: i * 0.3 }}
            style={{ transformOrigin: `${i % 2 === 0 ? 30 : 70}px ${150 + i * 180}px` }}
          />
          <motion.circle
            cx={i % 2 === 0 ? 70 : 30}
            cy={180 + i * 180}
            r="8"
            fill="#E8A0B0"
            initial={{ scale: 0, opacity: 0 }}
            animate={progress > (i + 1) * 0.25 ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: i * 0.3 + 0.2 }}
          />
        </g>
      ))}
    </svg>
  );
}

export default function OurMemoryPathSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  const memories = [
    { image: '/photo_6127373341921318063_w.jpg', alt: 'Fiha and I seated closely in a warm café atmosphere', chapter: 'Chapter 01 ✨', text: 'The moment my whole world turned soft and bright. 🌸', theme: 'warm' as const },
    { image: '/photo_6197504230806373605_y.jpg', alt: 'Fiha and I in a casual everyday mirror selfie moment', chapter: 'Chapter 02 ☕', text: 'Warm hugs, happy giggles, and endless love. ☕💖', theme: 'slate' as const },
    { image: '/photo_6311957799210433560_y.jpg', alt: 'Fiha and I dressed in black in front of a floral mural', chapter: 'Chapter 03 🌟', text: 'Hand in hand, ready to face every tomorrow together. 🌟', theme: 'dark' as const },
    { image: '/photo_6197504230806373599_y.jpg', alt: 'Fiha and I in a vintage film-frame mirror selfie', chapter: 'Chapter 04 💌', text: 'My forever Valentine, today and every single day after. 🌹', theme: 'film' as const },
  ];

  return (
    <section ref={ref} className="relative min-h-screen py-32 px-4 overflow-hidden" style={{ background: 'linear-gradient(180deg, #FFFBF5 0%, #FFF5F0 50%, #FFFBF5 100%)' }}>
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <text x="10" y="20" fontSize="0.5" fill="#4A7C59" opacity="0.3">🌿</text>
          <text x="85" y="40" fontSize="0.4" fill="#4A7C59" opacity="0.2">🍃</text>
          <text x="15" y="70" fontSize="0.5" fill="#4A7C59" opacity="0.25">🌱</text>
          <text x="90" y="85" fontSize="0.4" fill="#4A7C59" opacity="0.2">🌿</text>
        </svg>
      </div>

      <div className="relative z-10">
        <motion.h2
          className="text-center mb-20 text-5xl md:text-6xl font-serif font-bold"
          style={{ fontFamily: '"Playfair Display", serif', color: '#8B2942' }}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
        >
          Our Memory Path 🌸💖
        </motion.h2>

        <div className="relative max-w-6xl mx-auto">
          <GrowingVine progress={inView ? 1 : 0} />

          {memories.map((memory, index) => (
            <MemoryCard
              key={index}
              {...memory}
              index={index}
              align={index % 2 === 0 ? 'left' : 'right'}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
