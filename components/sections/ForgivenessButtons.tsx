'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import FinalReveal from '../FinalReveal';

const particles = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  emoji: ['🌸', '💖', '✨', '💕', '🌺', '🌷'][i % 6],
  size: 0.8 + Math.random() * 0.8,
  angle: (i / 60) * 360 + Math.random() * 30,
  distance: 300 + Math.random() * 600,
  delay: i * 0.03,
  duration: 2 + Math.random() * 2,
}));

const floatingFlowers = ['🌸', '🌺', '🌷', '💮'];

export default function ForgivenessButtons() {
  const [response, setResponse] = useState<'forgiven' | 'waiting' | null>(null);
  const [showThankYou, setShowThankYou] = useState(false);
  const [showFinal, setShowFinal] = useState(false);
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });

  useEffect(() => {
    if (response === 'forgiven') {
      const thankYouTimer = setTimeout(() => setShowThankYou(true), 2500);
      const finalTimer = setTimeout(() => setShowFinal(true), 5500);
      return () => {
        clearTimeout(thankYouTimer);
        clearTimeout(finalTimer);
      };
    }
  }, [response]);

  if (showFinal) return <FinalReveal />;

  return (
    <section
      ref={ref}
      className="w-screen min-h-screen relative overflow-hidden flex items-center justify-center"
      style={{
        background: response === 'forgiven'
          ? 'radial-gradient(ellipse at center, #FFF8E7 0%, #FFE4C4 40%, #FFDAB9 100%)'
          : 'linear-gradient(135deg, #FFF5EE 0%, #FFE4E1 50%, #FFF0F5 100%)',
      }}
    >
      <AnimatePresence>
        {response === 'forgiven' && (
          <>
            {particles.map((p) => (
              <motion.div
                key={p.id}
                className="absolute pointer-events-none"
                style={{
                  fontSize: `${p.size * 2.5}rem`,
                  left: '50%',
                  top: '50%',
                }}
                initial={{ x: '-50%', y: '-50%', scale: 0, opacity: 0, rotate: 0 }}
                animate={{
                  x: `calc(-50% + ${Math.cos((p.angle * Math.PI) / 180) * p.distance}px)`,
                  y: `calc(-50% + ${Math.sin((p.angle * Math.PI) / 180) * p.distance}px)`,
                  scale: [0, 1.5, 1],
                  opacity: [0, 1, 0.8],
                  rotate: p.angle * 3,
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: p.duration, delay: p.delay, ease: 'easeOut' }}
              >
                {p.emoji}
              </motion.div>
            ))}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={`sakura-${i}`}
                className="absolute w-4 h-4 rounded-full pointer-events-none"
                style={{
                  background: 'rgba(255, 182, 193, 0.7)',
                  left: '50%',
                  top: '50%',
                }}
                initial={{ x: '-50%', y: '-50%', scale: 0, opacity: 0 }}
                animate={{
                  x: `calc(-50% + ${(Math.random() - 0.5) * 1000}px)`,
                  y: `calc(-50% + ${(Math.random() - 0.5) * 800}px)`,
                  scale: [0, 1.2, 0],
                  opacity: [0, 0.9, 0],
                }}
                transition={{ duration: 3, delay: i * 0.05, ease: 'easeOut' }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      <div className="max-w-4xl mx-auto text-center px-6 relative z-10">
        {!response && (
          <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1 }}>
            <motion.h2
              className="font-display text-4xl md:text-6xl text-rose-800 mb-16"
              style={{ fontFamily: '"Fredoka", sans-serif' }}
              animate={{
                textShadow: [
                  '0 0 30px rgba(255, 105, 135, 0.3)',
                  '0 0 60px rgba(255, 105, 135, 0.6)',
                  '0 0 30px rgba(255, 105, 135, 0.3)',
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Can you forgive me?
            </motion.h2>

            <div className="relative inline-block mb-12">
              {floatingFlowers.map((flower, i) => (
                <motion.span
                  key={i}
                  className="absolute text-2xl"
                  style={{
                    left: `${(i - 1.5) * 80}px`,
                    top: `${-30 + (i % 2) * 20}px`,
                  }}
                  animate={{
                    y: [0, -15, 0],
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ duration: 2 + i * 0.3, repeat: Infinity, delay: i * 0.2 }}
                >
                  {flower}
                </motion.span>
              ))}

              <motion.button
                onClick={() => setResponse('forgiven')}
                className="px-12 py-6 rounded-full font-semibold text-2xl shadow-xl relative overflow-hidden"
                style={{
                  fontFamily: '"Fredoka", sans-serif',
                  background: 'linear-gradient(135deg, #FFB6C1 0%, #FFC0CB 50%, #FFB6C1 100%)',
                  border: '3px solid rgba(255, 105, 135, 0.5)',
                  color: '#8B0000',
                }}
                animate={{
                  boxShadow: [
                    '0 0 30px rgba(255, 105, 135, 0.4)',
                    '0 0 50px rgba(255, 105, 135, 0.7)',
                    '0 0 30px rgba(255, 105, 135, 0.4)',
                  ],
                }}
                transition={{ duration: 2.5, repeat: Infinity }}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
              >
                I forgive you, my love ❤️✨
              </motion.button>
            </div>

            <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.5 }}>
              <motion.button
                onClick={() => setResponse('waiting')}
                className="px-8 py-4 rounded-full text-lg text-gray-600 hover:text-gray-800 transition-colors"
                style={{ fontFamily: '"Fredoka", sans-serif' }}
                whileHover={{ scale: 1.02 }}
              >
                I need more time 🤍
              </motion.button>
            </motion.div>
          </motion.div>
        )}

        {response === 'waiting' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-20"
          >
            <motion.p
              className="text-2xl md:text-3xl text-gray-700"
              style={{ fontFamily: '"Fredoka", sans-serif' }}
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              Take all the time you need. I'll be here, loving you always. 🤍
            </motion.p>
          </motion.div>
        )}

        {response === 'forgiven' && showThankYou && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5 }}
          >
            <motion.h3
              className="text-3xl md:text-5xl text-rose-900 mb-8"
              style={{ fontFamily: '"Fredoka", sans-serif' }}
              animate={{
                textShadow: [
                  '0 0 20px rgba(255, 105, 135, 0.2)',
                  '0 0 40px rgba(255, 105, 135, 0.5)',
                  '0 0 20px rgba(255, 105, 135, 0.2)',
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Thank you for saving us and giving me your precious heart again.
            </motion.h3>
            <motion.p
              className="text-xl md:text-2xl text-rose-700"
              style={{ fontFamily: '"Fredoka", sans-serif' }}
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              I love you endlessly, my sweet Fiha! 💖🌸✨
            </motion.p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
