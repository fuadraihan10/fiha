'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const cards = [
  {
    id: 'goofy',
    image: '/IMG_20250214_174806_992.jpg',
    caption: 'Our goofy moments 💕',
    rotate: -4,
    flower: '🌸',
  },
  {
    id: 'calls',
    image: '/photo_6334827194391578943_y.jpeg',
    caption: 'Always there. Always you. 💖',
    rotate: 3,
    flower: '🌺',
  },
  {
    id: 'seconds1',
    image: '/IMG_20250210_214336_689.jpg',
    caption: 'Two seconds apart ⏱️',
    rotate: -2,
    flower: '🌷',
  },
  {
    id: 'seconds2',
    image: '/IMG_20250210_214428_546.jpg',
    caption: 'And just like that 💕',
    rotate: 5,
    flower: '💐',
  },
];

export default function SillySideSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const [activeCard, setActiveCard] = useState<string | null>(null);

  return (
    <section
      ref={ref}
      className="w-screen min-h-screen py-20 px-8 relative overflow-hidden"
      style={{ background: '#FFD1DC' }}
    >
      <div className="absolute inset-0 pointer-events-none opacity-20">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl"
            initial={{ x: `${Math.random() * 100}%`, y: `${Math.random() * 100}%`, opacity: 0 }}
            animate={{ opacity: [0, 0.5, 0] }}
            transition={{ duration: 5, repeat: Infinity, delay: Math.random() * 3 }}
          >
            {['✨', '🌸', '💕'][i % 3]}
          </motion.div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2
            className="text-4xl md:text-6xl text-charcoal mb-4"
            style={{ fontFamily: '"Fredoka", sans-serif', fontWeight: 600 }}
          >
            Our Silly Side 🤪💖
          </h2>
          <p className="text-charcoal text-lg md:text-xl font-light max-w-2xl mx-auto">
            Our favorite unfiltered giggles, silly faces, and chaotic late-night conversations. 💌✨
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 place-items-center">
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              className="relative cursor-pointer"
              style={{ transform: `rotate(${card.rotate}deg)` }}
              initial={{ opacity: 0, y: 60 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: index * 0.15, type: 'spring', stiffness: 100 }}
              whileHover={{ scale: 1.08, rotate: 0, zIndex: 10 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCard(activeCard === card.id ? null : card.id)}
            >
              <div
                className="relative w-full max-w-[240px] bg-white rounded-sm p-3 shadow-xl"
                style={{ boxShadow: '0 8px 30px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.08)' }}
              >
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 bg-pink-200/70 backdrop-blur-sm border-y border-dashed border-pink-300/50 rounded-sm shadow-sm" />

                <div className="absolute -top-4 -right-3 text-2xl drop-shadow-md">{card.flower}</div>
                <div className="absolute -bottom-3 -left-3 text-xl drop-shadow-md">{card.flower}</div>

                <div className="relative aspect-square rounded-sm overflow-hidden">
                  <Image
                    src={card.image}
                    alt={card.caption}
                    fill
                    className="object-cover"
                    sizes="240px"
                  />
                </div>

                <div className="mt-3 text-center">
                  <p
                    className="text-rose-900 text-xl"
                    style={{ fontFamily: '"Caveat", cursive' }}
                  >
                    {card.caption}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
