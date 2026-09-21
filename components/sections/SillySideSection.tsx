'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const cards = [
  {
    id: 'goofy',
    frontEmoji: '🤪',
    frontLabel: 'Remember this?',
    image: '/IMG_20250214_174806_992.jpg',
    caption: 'Our goofy moments 💕',
    rotate: -6,
  },
  {
    id: 'calls',
    frontEmoji: '📞',
    frontLabel: 'Our Calls',
    image: '/photo_6334827194391578943_y.jpeg',
    caption: 'Always there. Always you. 💖',
    rotate: 3,
  },
  {
    id: 'seconds',
    frontEmoji: '⏱️',
    frontLabel: 'Two Seconds Apart',
    images: ['/IMG_20250210_214336_689.jpg', '/IMG_20250210_214428_546.jpg'],
    caption: 'Just 2 seconds between these 💕',
    rotate: -2,
  },
];

function SparkleBurst({ trigger }: { trigger: boolean }) {
  return (
    <AnimatePresence>
      {trigger && (
        <>
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-xl pointer-events-none"
              initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
              animate={{
                opacity: 0,
                scale: 1.5,
                x: Math.cos((i * Math.PI) / 4) * 80,
                y: Math.sin((i * Math.PI) / 4) * 80,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              style={{ top: '50%', left: '50%' }}
            >
              ✨
            </motion.div>
          ))}
        </>
      )}
    </AnimatePresence>
  );
}

function FlipCard({ card, inView }: { card: typeof cards[0]; inView: boolean }) {
  const [flipped, setFlipped] = useState(false);
  const [sparkle, setSparkle] = useState(false);

  const handleFlip = () => {
    setFlipped(!flipped);
    setSparkle(true);
    setTimeout(() => setSparkle(false), 600);
  };

  return (
    <motion.div
      className="relative cursor-pointer"
      style={{ perspective: '1200px' }}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
      onClick={handleFlip}
    >
      <motion.div
        className="relative w-full max-w-xs aspect-[3/4]"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ type: 'spring', stiffness: 80, damping: 15 }}
      >
        <motion.div
          className="absolute inset-0 bg-cream rounded-2xl p-3 shadow-xl border-4 border-white"
          style={{ backfaceVisibility: 'hidden' }}
          animate={{ rotate: card.rotate }}
        >
          <div className="absolute -top-2 -left-2 text-2xl">🌸</div>
          <div className="absolute -top-2 -right-2 text-2xl">🌸</div>
          <div className="absolute -bottom-2 -left-2 text-2xl">🌸</div>
          <div className="absolute -bottom-2 -right-2 text-2xl">🌸</div>

          <div className="w-full h-full bg-[#FFD1DC] rounded-xl flex flex-col items-center justify-center gap-4 p-6">
            <span className="text-6xl">{card.frontEmoji}</span>
            <span className="text-charcoal text-2xl font-serif text-center">{card.frontLabel}</span>
            <span className="text-charcoal/60 text-sm">tap to reveal ✨</span>
          </div>
        </motion.div>

        <motion.div
          className="absolute inset-0 bg-cream rounded-2xl p-3 shadow-xl border-4 border-white"
          style={{ backfaceVisibility: 'hidden', rotateY: 180 }}
        >
          <div className="absolute -top-2 -left-2 text-2xl">🌸</div>
          <div className="absolute -top-2 -right-2 text-2xl">🌸</div>
          <div className="absolute -bottom-2 -left-2 text-2xl">🌸</div>
          <div className="absolute -bottom-2 -right-2 text-2xl">🌸</div>

          <div className="relative w-full h-full rounded-xl overflow-hidden">
            {card.images ? (
              <div className="grid grid-cols-2 gap-1 h-full">
                <Image src={card.images[0]} alt="Photo 1" fill className="object-cover" sizes="50vw" />
                <Image src={card.images[1]} alt="Photo 2" fill className="object-cover" sizes="50vw" />
              </div>
            ) : (
              <Image src={card.image!} alt="Memory" fill className="object-cover" sizes="100vw" />
            )}
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-3">
              <p className="text-white text-sm text-center">{card.caption}</p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <SparkleBurst trigger={sparkle} />
    </motion.div>
  );
}

export default function SillySideSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section
      ref={ref}
      className="w-screen min-h-screen py-20 px-8 relative overflow-hidden"
      style={{ background: '#FFD1DC' }}
    >
      <div className="absolute inset-0 pointer-events-none opacity-30">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl"
            initial={{ x: Math.random() * 100 + '%', y: Math.random() * 100 + '%', opacity: 0 }}
            animate={{ opacity: [0, 0.6, 0] }}
            transition={{ duration: 4, repeat: Infinity, delay: Math.random() * 2 }}
          >
            ✨
          </motion.div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2
            className="font-serif text-4xl md:text-6xl text-charcoal mb-4"
            style={{ fontFamily: '"Playfair Display", serif', fontWeight: 700 }}
          >
            Our Silly Side 🤪💖
          </h2>
          <p className="text-charcoal text-lg md:text-xl font-light max-w-2xl mx-auto">
            Our favorite unfiltered giggles, silly faces, and chaotic late-night conversations. 💌✨
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          {cards.map((card) => (
            <FlipCard key={card.id} card={card} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
