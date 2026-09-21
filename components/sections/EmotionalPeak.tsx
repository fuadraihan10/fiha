'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function EmotionalPeak() {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });

  return (
    <section ref={ref} className="w-screen h-screen relative overflow-hidden flex items-center justify-center will-change-transform" style={{ backgroundColor: '#1E1B18' }}>
      <motion.div
        className="absolute inset-0 pointer-events-none will-change-transform"
        animate={{
          opacity: [0.08, 0.25, 0.08],
        }}
        transition={{ duration: 14, repeat: Infinity }}
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(226, 178, 90, 0.35) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-5xl mx-auto relative z-10 px-8">
        <motion.div
          className="relative w-full aspect-square md:aspect-auto md:h-full rounded-3xl overflow-hidden"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.5 }}
        >
          <motion.div
            className="absolute inset-0 pointer-events-none rounded-3xl will-change-transform"
            animate={{
              boxShadow: [
                '0 0 150px rgba(226, 178, 90, 0.5)',
                '0 0 250px rgba(226, 178, 90, 0.7)',
                '0 0 150px rgba(226, 178, 90, 0.5)',
              ],
            }}
            transition={{ duration: 7, repeat: Infinity }}
          />

          <Image
            src="/IMG_20250219_191832_553.jpg"
            alt="Me kissing Fiha on the cheek in a garden at 4:54 PM"
            fill
            quality={95}
            className="object-cover rounded-3xl"
            priority
            sizes="100vw"
          />

          <motion.div
            className="absolute inset-0 rounded-3xl pointer-events-none will-change-transform"
            animate={{
              background: [
                'radial-gradient(circle at 50% 50%, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.55) 100%)',
                'radial-gradient(circle at 50% 50%, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.65) 100%)',
                'radial-gradient(circle at 50% 50%, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.55) 100%)',
              ],
            }}
            transition={{ duration: 10, repeat: Infinity }}
          />

          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center pointer-events-none"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 1.8, duration: 2 }}
          >
            <motion.p
              className="font-serif text-4xl md:text-5xl font-light"
              style={{ fontFamily: '"Playfair Display", serif' }}
              animate={{
                textShadow: [
                  '0 0 30px rgba(226, 178, 90, 0.3)',
                  '0 0 60px rgba(226, 178, 90, 0.6)',
                  '0 0 30px rgba(226, 178, 90, 0.3)',
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              4:54 PM — The exact moment my world felt perfectly complete. ⏳💖
            </motion.p>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute inset-0 pointer-events-none will-change-transform"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 2, duration: 2.5 }}
        >
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={`heartbeat-${i}`}
              className="absolute w-4 h-4 rounded-full"
              style={{
                background: 'rgba(226, 178, 90, 0.9)',
                left: `${12 + i * 4.7}%`,
                top: '50%',
              }}
              animate={{
                scale: [0, 5, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3.5,
                delay: i * 0.3,
                repeat: Infinity,
              }}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
