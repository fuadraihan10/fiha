'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function EmotionalPeak() {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });

  return (
    <section ref={ref} className="w-screen h-screen relative overflow-hidden flex items-center justify-center" style={{ backgroundColor: '#1E1B18' }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.5) 100%)' }} />
      
      <div className="absolute top-6 left-6 w-24 h-24 opacity-[0.04]" style={{ background: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\'%3E%3Cpath d=\'M50 5 C30 25 25 45 50 90 C75 45 70 25 50 5\' fill=\'%23E2B25A\'/%3E%3C/svg%3E")' }} />
      <div className="absolute bottom-6 right-6 w-32 h-32 opacity-[0.03]" style={{ background: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\'%3E%3Cpath d=\'M50 5 C30 25 25 45 50 90 C75 45 70 25 50 5\' fill=\'%23E2B25A\'/%3E%3C/svg%3E")' }} />

      {[...Array(4)].map((_, i) => (
        <motion.div
          key={`petal-${i}`}
          className="absolute w-3 h-3 rounded-full opacity-[0.12]"
          style={{
            background: 'linear-gradient(135deg, rgba(226,178,90,0.6), rgba(226,178,90,0.2))',
            left: `${15 + i * 22}%`,
            top: `${20 + (i % 2) * 50}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, 0],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 20 + i * 3, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      <motion.div
        className="max-w-4xl mx-auto relative z-10 px-6"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1.5 }}
      >
        <motion.div
          className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          style={{
            boxShadow: '0 25px 80px -12px rgba(0,0,0,0.5)',
          }}
        >
          <motion.div
            className="absolute -inset-2 rounded-3xl pointer-events-none"
            animate={{
              boxShadow: [
                '0 0 80px rgba(226,178,90,0.08), inset 0 0 60px rgba(226,178,90,0.03)',
                '0 0 120px rgba(226,178,90,0.15), inset 0 0 80px rgba(226,178,90,0.06)',
                '0 0 80px rgba(226,178,90,0.08), inset 0 0 60px rgba(226,178,90,0.03)',
              ],
            }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          />

          <Image
            src="/IMG_20250219_191832_553.jpg"
            alt="Me kissing Fiha on the cheek in a garden at 4:54 PM"
            fill
            quality={95}
            className="object-cover"
            priority
            sizes="(max-width: 896px) 100vw, 896px"
          />
        </motion.div>

        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2, duration: 1 }}
        >
          <div className="relative inline-block">
            <motion.span
              className="absolute -top-1 -left-3 text-xs opacity-60"
              animate={{ opacity: [0.3, 0.7, 0.3], scale: [0.8, 1, 0.8] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ✨
            </motion.span>
            <p
              className="text-2xl md:text-3xl tracking-wide"
              style={{ fontFamily: '"Caveat", cursive', color: 'rgba(226,178,90,0.9)' }}
            >
              4:54 PM — A Moment Frozen in Time ⏳💖
            </p>
            <motion.span
              className="absolute -bottom-1 -right-3 text-xs opacity-60"
              animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.2, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
            >
              ✨
            </motion.span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
