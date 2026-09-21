'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function SillySideSection() {
  const [flipped, setFlipped] = useState(false);
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const [holdGlow, setHoldGlow] = useState(false);

  return (
    <section ref={ref} className="w-screen min-h-screen py-40 px-8 bg-blush-pink relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none will-change-transform">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={`sparkle-${i}`}
            className="absolute text-rose-red text-6xl"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0,
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 4,
            }}
          >
            ✨
          </motion.div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-36"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2 }}
        >
          <h2
            className="font-serif text-8xl md:text-9xl text-charcoal mb-6"
            style={{ fontFamily: '"Playfair Display", serif', fontWeight: 700 }}
          >
            And then there's us being completely stupid together 🤪💖
          </h2>
          <p className="text-charcoal text-2xl font-light">
            Living for all our unfiltered giggles, silly faces, and chaotic late-night conversations. 💌✨
          </p>
        </motion.div>

        <div className="space-y-28">
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1.1, delay: 0.2 }}
            onTouchStart={() => setHoldGlow(true)}
            onTouchEnd={() => setHoldGlow(false)}
          >
            <motion.div
              className="relative w-96 cursor-pointer will-change-transform"
              whileHover={{ scale: 1.15, rotate: -3 }}
              animate={{ rotate: [-12, -12, -12] }}
            >
              <motion.div
                className="relative w-full h-full bg-cream p-5 rounded-3xl"
                animate={{
                  boxShadow: holdGlow
                    ? [
                        '0 25px 80px rgba(193, 39, 59, 0.25), 0 0 100px rgba(255, 209, 220, 0.5)',
                        '0 25px 120px rgba(193, 39, 59, 0.45), 0 0 160px rgba(255, 209, 220, 0.7)',
                        '0 25px 80px rgba(193, 39, 59, 0.25), 0 0 100px rgba(255, 209, 220, 0.5)',
                      ]
                    : '0 20px 60px rgba(193, 39, 59, 0.2), 0 0 80px rgba(255, 209, 220, 0.3)',
                }}
                transition={{ duration: 3, repeat: holdGlow ? Infinity : 0 }}
              >
                <Image
                  src="/IMG_20250214_174806_992.jpg"
                  alt="Fiha and I being completely silly together in a playful moment"
                  width={400}
                  height={500}
                  quality={95}
                  className="w-full h-full object-cover rounded-2xl"
                />
              </motion.div>

              {[0, 1].map((i) => (
                <motion.div
                  key={`tape-${i}`}
                  className="absolute rounded-lg bg-white/70 backdrop-blur-md"
                  style={{
                    top: i === 0 ? '-16px' : 'auto',
                    bottom: i === 1 ? '-16px' : 'auto',
                    left: '15%',
                    right: i === 0 ? '-16px' : 'auto',
                    width: '100px',
                    height: '20px',
                    boxShadow: '3px 3px 10px rgba(0, 0, 0, 0.2)',
                  }}
                  animate={{ rotate: i === 0 ? [10, 15, 10] : [-10, -15, -10] }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 }}
                />
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-24"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
          >
            <motion.div
              className="relative rounded-3xl overflow-hidden group cursor-pointer will-change-transform"
              initial={{ opacity: 0, x: -70 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1.1, delay: 0.5 }}
              whileHover={{ scale: 1.1 }}
            >
              <motion.div
                className="absolute inset-0 pointer-events-none rounded-3xl will-change-transform"
                animate={{
                  boxShadow: [
                    'inset 0 0 80px rgba(255, 209, 220, 0.6), 0 0 100px rgba(255, 209, 220, 0.5)',
                    'inset 0 0 140px rgba(255, 209, 220, 0.8), 0 0 160px rgba(255, 209, 220, 0.6)',
                    'inset 0 0 80px rgba(255, 209, 220, 0.6), 0 0 100px rgba(255, 209, 220, 0.5)',
                  ],
                }}
                transition={{ duration: 4.5, repeat: Infinity }}
              />
              <div
                className="relative aspect-square rounded-3xl overflow-hidden backdrop-blur-3xl"
                style={{
                  background: 'rgba(255, 209, 220, 0.6)',
                  border: '4px solid rgba(255, 209, 220, 0.9)',
                }}
              >
                <Image
                  src="/photo_6334827194391578943_y.jpeg"
                  alt="Fiha and I in a two-panel video-call collage"
                  fill
                  quality={95}
                  className="object-cover"
                  sizes="50vw"
                />
                <motion.div
                  className="absolute inset-0 pointer-events-none rounded-3xl"
                  animate={{
                    boxShadow: [
                      'inset 0 0 0 3px rgba(255, 209, 220, 0.6)',
                      'inset 0 0 30px 3px rgba(255, 209, 220, 0.9)',
                      'inset 0 0 0 3px rgba(255, 209, 220, 0.6)',
                    ],
                  }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                />
              </div>
            </motion.div>

            <motion.div
              className="flex items-center justify-center"
              initial={{ opacity: 0, x: 70 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1.1, delay: 0.6 }}
            >
              <motion.div
                animate={{ scale: [1, 1.25, 1] }}
                transition={{ duration: 3.5, repeat: Infinity }}
                className="text-center"
              >
                <p className="text-charcoal text-4xl font-light">Our Calls 📞</p>
                <p className="text-charcoal text-2xl font-light mt-4 text-opacity-70">Always there. Always you. 💕</p>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, y: 70 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.1, delay: 0.7 }}
          >
            <div className="w-full max-w-2xl">
              <motion.h3
                className="font-serif text-7xl md:text-8xl text-charcoal mb-14 text-center"
                style={{ fontFamily: '"Playfair Display", serif', fontWeight: 700 }}
              >
                Two Seconds Apart ⏱️💖
              </motion.h3>

              <motion.div
                className="relative w-full aspect-square cursor-pointer rounded-3xl overflow-hidden mx-auto will-change-transform"
                onClick={() => setFlipped(!flipped)}
                style={{
                  perspective: '2000px',
                }}
              >
                <motion.div
                  style={{
                    transformStyle: 'preserve-3d',
                    rotateY: flipped ? 180 : 0,
                  }}
                  transition={{ duration: 1.4, type: 'spring', stiffness: 50, damping: 20 }}
                  className="w-full h-full"
                >
                  <motion.div
                    style={{ backfaceVisibility: 'hidden' }}
                    className="absolute w-full h-full"
                  >
                    <Image
                      src="/IMG_20250210_214336_689.jpg"
                      alt="Sunny extreme close-up of Fiha and I - front"
                      fill
                      quality={95}
                      className="object-cover rounded-3xl"
                      sizes="100vw"
                    />
                  </motion.div>

                  <motion.div
                    style={{ backfaceVisibility: 'hidden', rotateY: 180 }}
                    className="absolute w-full h-full"
                  >
                    <Image
                      src="/IMG_20250210_214428_546.jpg"
                      alt="Sunny extreme close-up of Fiha and I - back"
                      fill
                      quality={95}
                      className="object-cover rounded-3xl"
                      sizes="100vw"
                    />
                  </motion.div>
                </motion.div>
              </motion.div>

              <motion.p
                className="text-center text-charcoal/70 text-2xl mt-10 font-light"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 3.5, repeat: Infinity }}
              >
                tap to flip 💕
              </motion.p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
