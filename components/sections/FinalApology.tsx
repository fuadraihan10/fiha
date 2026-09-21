'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function FinalApology() {
  const { ref, inView } = useInView({ threshold: 0.5, triggerOnce: true });

  return (
    <section ref={ref} className="w-screen min-h-screen py-40 px-8 relative overflow-hidden flex items-center will-change-transform" style={{ backgroundColor: '#1E1B18' }}>
      <motion.div
        className="absolute inset-0 pointer-events-none will-change-transform"
        animate={{
          opacity: [0.05, 0.2, 0.05],
        }}
        transition={{ duration: 14, repeat: Infinity }}
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(226, 178, 90, 0.25) 0%, transparent 70%)',
        }}
      />

      {[...Array(16)].map((_, i) => (
        <motion.div
          key={`falling-petal-${i}`}
          className="absolute w-1 h-10 pointer-events-none will-change-transform"
          initial={{
            x: Math.random() * window.innerWidth,
            y: -100,
            opacity: 0,
            rotate: Math.random() * 360,
          }}
          animate={{
            y: window.innerHeight + 100,
            opacity: [0, 0.7, 0],
            rotate: Math.random() * 720,
          }}
          transition={{
            duration: 18 + Math.random() * 10,
            repeat: Infinity,
            ease: 'linear',
            delay: Math.random() * 5,
          }}
          style={{
            background: 'linear-gradient(to bottom, rgba(193, 39, 59, 0.9), transparent)',
          }}
        />
      ))}

      <div className="max-w-5xl mx-auto relative z-10 text-center w-full">
        <motion.h2
          className="font-serif text-11xl md:text-12xl text-white mb-16"
          style={{ fontFamily: '"Playfair Display", serif', fontWeight: 700 }}
          initial={{ opacity: 0, y: 70 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.4 }}
        >
          Fiha,
        </motion.h2>

        <motion.h3
          className="font-serif text-8xl md:text-9xl text-white/95 mb-28"
          style={{ fontFamily: '"Playfair Display", serif', fontWeight: 700 }}
          initial={{ opacity: 0, y: 70 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.4, delay: 0.2 }}
        >
          I'm really, truly sorry... 🥺🌹
        </motion.h3>

        <motion.div
          className="h-2 w-48 mx-auto mb-24"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={inView ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ duration: 1.3, delay: 0.6 }}
          style={{
            background: 'linear-gradient(to right, transparent, #E2B25A, transparent)',
          }}
        />

        <motion.p
          className="text-2xl md:text-3xl text-white/90 font-light leading-relaxed max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: 1 }}
        >
          I know my words can't undo the hurt, but I hope my actions will prove how deeply I cherish you and our beautiful love story. You deserve the world, and I'm committed to being the partner you deserve every single day. 💖✨
        </motion.p>
      </div>
    </section>
  );
}
