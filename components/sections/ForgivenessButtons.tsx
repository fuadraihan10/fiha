'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function ForgivenessButtons() {
  const [response, setResponse] = useState<'forgiven' | null>(null);
  const { ref, inView } = useInView({ threshold: 0.5, triggerOnce: true });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <section
      ref={ref}
      className="w-screen min-h-screen py-40 px-8 relative overflow-hidden flex items-center will-change-transform"
      style={{ backgroundColor: '#1E1B18' }}
      onMouseMove={handleMouseMove}
    >
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={`petal-bloom-${i}`}
            className="absolute text-rose-red text-7xl will-change-transform"
            initial={{
              x: window.innerWidth / 2,
              y: window.innerHeight / 2,
              opacity: 0,
            }}
            animate={
              response === 'forgiven'
                ? {
                    x: window.innerWidth / 2 + (Math.random() - 0.5) * window.innerWidth * 1.3,
                    y: window.innerHeight / 2 + (Math.random() - 0.5) * window.innerHeight * 1.3,
                    opacity: [0, 1, 0],
                    rotate: Math.random() * 720,
                    scale: [0, 1.8, 0],
                  }
                : {}
            }
            transition={{
              duration: 14 + Math.random() * 10,
              delay: i * 0.1,
              ease: 'easeOut',
            }}
          >
            💖
          </motion.div>
        ))}

        {[...Array(60)].map((_, i) => (
          <motion.div
            key={`sparkle-bloom-${i}`}
            className="absolute w-3 h-3 rounded-full pointer-events-none will-change-transform"
            style={{
              background: `rgba(226, 178, 90, ${0.4 + Math.random() * 0.6})`,
            }}
            initial={{
              x: window.innerWidth / 2,
              y: window.innerHeight / 2,
              opacity: 0,
            }}
            animate={
              response === 'forgiven'
                ? {
                    x: window.innerWidth / 2 + (Math.random() - 0.5) * window.innerWidth * 1.4,
                    y: window.innerHeight / 2 + (Math.random() - 0.5) * window.innerHeight * 1.4,
                    opacity: [0, 0.9, 0],
                    scale: [0, 2.5, 0],
                  }
                : {}
            }
            transition={{
              duration: 10 + Math.random() * 8,
              delay: i * 0.06,
              ease: 'easeOut',
            }}
          />
        ))}
      </div>

      <motion.div
        className="absolute inset-0 pointer-events-none will-change-transform"
        style={{
          background: `radial-gradient(circle 1500px at ${mousePos.x}px ${mousePos.y}px, rgba(225, 178, 90, 0.2), transparent 80%)`,
        }}
      />

      <div className="max-w-5xl mx-auto relative z-10 text-center w-full">
        {!response ? (
          <motion.div
            initial={{ opacity: 0, y: 70 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.3 }}
          >
            <motion.h2
              className="font-serif text-9xl md:text-10xl text-white mb-24"
              style={{ fontFamily: '"Playfair Display", serif', fontWeight: 700 }}
              animate={{
                scale: [1, 1.05, 1],
                textShadow: [
                  '0 0 50px rgba(226, 178, 90, 0.3)',
                  '0 0 100px rgba(226, 178, 90, 0.6)',
                  '0 0 50px rgba(226, 178, 90, 0.3)',
                ],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              Will you forgive your favorite idiot and give us another chance? 🥺💖
            </motion.h2>

            <motion.button
              onClick={() => setResponse('forgiven')}
              className="px-20 py-12 bg-rose-red text-white rounded-full font-semibold text-4xl shadow-2xl will-change-transform relative overflow-hidden"
              style={{ backgroundColor: 'var(--rose-red)' }}
              whileHover={{
                scale: 1.2,
                boxShadow: '0 80px 150px rgba(193, 39, 59, 0.9)',
              }}
              whileTap={{ scale: 0.8 }}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.2, delay: 0.4 }}
            >
              <motion.span
                animate={{
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                I forgive you, my love ❤️✨
              </motion.span>
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 70 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5 }}
          >
            <motion.h3
              className="font-serif text-8xl md:text-9xl text-white mb-12"
              style={{ fontFamily: '"Playfair Display", serif', fontWeight: 700 }}
              animate={{
                scale: [1, 1.08, 1],
                textShadow: [
                  '0 0 60px rgba(226, 178, 90, 0)',
                  '0 0 120px rgba(226, 178, 90, 0.9)',
                  '0 0 60px rgba(226, 178, 90, 0)',
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Thank you for saving us and giving me your precious heart again. 💖🌸✨
            </motion.h3>

            <motion.p
              className="text-3xl md:text-4xl text-white/90 font-light leading-relaxed max-w-4xl mx-auto mb-20"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              I love you endlessly, my sweet Fiha! You are my forever. 🌹💕
            </motion.p>

            <motion.div
              className="flex flex-wrap justify-center gap-8"
              animate={{ opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 4.5, repeat: Infinity }}
            >
              {[...Array(32)].map((_, i) => (
                <motion.div
                  key={`celebration-${i}`}
                  className="inline-block text-6xl will-change-transform"
                  animate={{
                    scale: [0, 2, 0],
                    opacity: [0, 1, 0],
                    y: [-40, 40, 0],
                  }}
                  transition={{
                    duration: 2.2,
                    delay: i * 0.18,
                    repeat: Infinity,
                  }}
                >
                  {i % 3 === 0 ? '✨' : i % 3 === 1 ? '💖' : '🌹'}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
