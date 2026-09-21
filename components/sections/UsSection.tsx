'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useRef, useState } from 'react';

export default function UsSection() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });
  const cardRef1 = useRef<HTMLDivElement>(null);
  const cardRef2 = useRef<HTMLDivElement>(null);
  const [tilt1, setTilt1] = useState({ rotateX: 0, rotateY: 0 });
  const [tilt2, setTilt2] = useState({ rotateX: 0, rotateY: 0 });
  const [holdGlow1, setHoldGlow1] = useState(false);
  const [holdGlow2, setHoldGlow2] = useState(false);

  const handleTilt = (e: React.MouseEvent<HTMLDivElement>, setTilt: any, ref: any) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -15;
    const rotateY = ((x - centerX) / centerX) * 15;
    setTilt({ rotateX, rotateY });
  };

  const resetTilt = (setTilt: any) => {
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  return (
    <section ref={ref} className="w-screen min-h-screen py-40 px-8 bg-cream relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(35)].map((_, i) => (
          <motion.div
            key={`vine-${i}`}
            className="absolute"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={inView ? { pathLength: 1, opacity: 0.3 } : {}}
            transition={{ duration: 2.5, delay: i * 0.06 }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          >
            <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
              <path
                d="M25 5 Q35 15 25 30 Q15 40 25 50"
                stroke="rgba(226, 178, 90, 0.35)"
                strokeWidth="1.5"
              />
            </svg>
          </motion.div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-32"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2 }}
        >
          <h2
            className="font-serif text-10xl md:text-11xl text-maroon mb-6"
            style={{ fontFamily: '"Playfair Display", serif', fontWeight: 700 }}
          >
            Us 💖✨
          </h2>
          <p className="text-charcoal text-3xl font-light">
            Every second spent with you is my absolute favorite core memory. 🌸
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-28 items-center">
          <motion.div
            ref={cardRef1}
            onMouseMove={(e) => handleTilt(e, setTilt1, cardRef1)}
            onMouseLeave={() => resetTilt(setTilt1)}
            onTouchStart={() => setHoldGlow1(true)}
            onTouchEnd={() => setHoldGlow1(false)}
            initial={{ opacity: 0, x: -100 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="cursor-pointer will-change-transform"
            style={{
              perspective: '1300px',
              transform: `rotateX(${tilt1.rotateX}deg) rotateY(${tilt1.rotateY}deg)`,
              transition: 'transform 0.1s ease-out',
            }}
          >
            <motion.div
              className="absolute -inset-10 rounded-3xl pointer-events-none will-change-transform"
              animate={{
                boxShadow: holdGlow1
                  ? [
                      '0 0 80px rgba(226, 178, 90, 0.5)',
                      '0 0 140px rgba(226, 178, 90, 0.7)',
                      '0 0 80px rgba(226, 178, 90, 0.5)',
                    ]
                  : '0 0 60px rgba(226, 178, 90, 0.3)',
              }}
              transition={{ duration: 2.5, repeat: holdGlow1 ? Infinity : 0 }}
            />
            <div
              className="relative w-full aspect-square rounded-3xl overflow-hidden backdrop-blur-2xl"
              style={{
                background: 'rgba(245, 235, 221, 0.8)',
                border: '3px solid rgba(226, 178, 90, 0.4)',
                padding: '20px',
              }}
            >
              <Image
                src="/photo_6294209954961277959_y.jpg"
                alt="Fiha and I in a warm golden garden portrait"
                fill
                quality={95}
                className="object-cover rounded-2xl"
                sizes="50vw"
              />
            </div>
          </motion.div>

          <motion.div
            ref={cardRef2}
            onMouseMove={(e) => handleTilt(e, setTilt2, cardRef2)}
            onMouseLeave={() => resetTilt(setTilt2)}
            onTouchStart={() => setHoldGlow2(true)}
            onTouchEnd={() => setHoldGlow2(false)}
            initial={{ opacity: 0, x: 100 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="relative w-full aspect-video rounded-3xl overflow-hidden group cursor-pointer will-change-transform"
            style={{
              perspective: '1300px',
              transform: `rotateX(${tilt2.rotateX}deg) rotateY(${tilt2.rotateY}deg)`,
              transition: 'transform 0.1s ease-out',
            }}
          >
            <motion.div
              className="absolute inset-0 rounded-3xl pointer-events-none will-change-transform"
              animate={{
                boxShadow: holdGlow2
                  ? [
                      'inset 0 0 80px rgba(193, 39, 59, 0.3)',
                      'inset 0 0 140px rgba(193, 39, 59, 0.5)',
                      'inset 0 0 80px rgba(193, 39, 59, 0.3)',
                    ]
                  : 'inset 0 0 60px rgba(193, 39, 59, 0.15)',
              }}
              transition={{ duration: 2.5, repeat: holdGlow2 ? Infinity : 0 }}
            />
            <Image
              src="/photo_6127373341921318062_w.jpg"
              alt="Fiha and I leaning our heads together for a close-up selfie"
              fill
              quality={95}
              className="object-cover group-hover:scale-130 transition-transform duration-800 will-change-transform rounded-3xl"
              sizes="50vw"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
