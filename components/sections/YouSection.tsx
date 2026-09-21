'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useRef } from 'react';

export default function YouSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const cardRef1 = useRef<HTMLDivElement>(null);
  const cardRef2 = useRef<HTMLDivElement>(null);
  const cardRef3 = useRef<HTMLDivElement>(null);
  const [tilt1, setTilt1] = useState({ rotateX: 0, rotateY: 0 });
  const [tilt2, setTilt2] = useState({ rotateX: 0, rotateY: 0 });
  const [tilt3, setTilt3] = useState({ rotateX: 0, rotateY: 0 });

  const handleTilt = (e: React.MouseEvent<HTMLDivElement>, setTilt: any, ref: any) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -14;
    const rotateY = ((x - centerX) / centerX) * 14;
    setTilt({ rotateX, rotateY });
  };

  const resetTilt = (setTilt: any) => {
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  return (
    <section ref={ref} className="w-screen min-h-screen py-40 px-8 bg-cream">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-36"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2 }}
        >
          <h2
            className="font-serif text-10xl md:text-11xl text-maroon mb-8"
            style={{ fontFamily: '"Playfair Display", serif', fontWeight: 700 }}
          >
            The Most Beautiful Person in My Universe 🌟💖
          </h2>
          <p className="text-charcoal text-2xl font-light">
            My favorite view in the whole world, always and forever. 🌺
          </p>
        </motion.div>

        <div className="space-y-32">
          <motion.div
            ref={cardRef1}
            onMouseMove={(e) => handleTilt(e, setTilt1, cardRef1)}
            onMouseLeave={() => resetTilt(setTilt1)}
            className="relative w-full rounded-3xl overflow-hidden group will-change-transform"
            initial={{ opacity: 0, y: 70 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, delay: 0.2 }}
            style={{
              perspective: '1300px',
              transform: `rotateX(${tilt1.rotateX}deg) rotateY(${tilt1.rotateY}deg)`,
              transition: 'transform 0.1s ease-out',
            }}
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              className="absolute inset-0 rounded-3xl pointer-events-none will-change-transform"
              animate={{
                background: [
                  'radial-gradient(circle at 15% 15%, rgba(225, 178, 90, 0.35) 0%, transparent 60%)',
                  'radial-gradient(circle at 85% 85%, rgba(225, 178, 90, 0.35) 0%, transparent 60%)',
                  'radial-gradient(circle at 15% 15%, rgba(225, 178, 90, 0.35) 0%, transparent 60%)',
                ],
              }}
              transition={{ duration: 14, repeat: Infinity }}
            />
            <Image
              src="/photo_6064472012564317518_y.jpg"
              alt="Fiha wearing a wine-red organza scarf in a hazy, overexposed portrait"
              width={2000}
              height={1500}
              quality={95}
              className="w-full h-auto object-cover rounded-3xl group-hover:scale-115 transition-transform duration-800 will-change-transform"
              priority
            />
          </motion.div>

          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-28 items-center"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
          >
            <motion.div
              ref={cardRef2}
              onMouseMove={(e) => handleTilt(e, setTilt2, cardRef2)}
              onMouseLeave={() => resetTilt(setTilt2)}
              className="relative aspect-square rounded-3xl overflow-hidden group cursor-pointer will-change-transform"
              initial={{ opacity: 0, x: -70 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1.2, delay: 0.4 }}
              style={{
                perspective: '1300px',
                transform: `rotateX(${tilt2.rotateX}deg) rotateY(${tilt2.rotateY}deg)`,
                transition: 'transform 0.1s ease-out',
              }}
              whileHover={{ scale: 1.1 }}
            >
              <motion.div
                className="absolute inset-0 pointer-events-none rounded-3xl will-change-transform"
                animate={{
                  boxShadow: [
                    '0 0 80px rgba(226, 178, 90, 0.5)',
                    '0 0 150px rgba(226, 178, 90, 0.7)',
                    '0 0 80px rgba(226, 178, 90, 0.5)',
                  ],
                }}
                transition={{ duration: 5, repeat: Infinity }}
              />
              <Image
                src="/photo_6334724600507778357_y.jpg"
                alt="Fiha in an elegant mirror selfie wearing white and red saree"
                fill
                quality={95}
                className="object-cover rounded-3xl group-hover:scale-140 transition-transform duration-800 will-change-transform"
                sizes="50vw"
              />
            </motion.div>

            <motion.div
              ref={cardRef3}
              onMouseMove={(e) => handleTilt(e, setTilt3, cardRef3)}
              onMouseLeave={() => resetTilt(setTilt3)}
              className="relative h-96 rounded-3xl overflow-hidden group cursor-pointer will-change-transform"
              initial={{ opacity: 0, x: 70 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1.2, delay: 0.5 }}
              style={{
                perspective: '1300px',
                transform: `rotateX(${tilt3.rotateX}deg) rotateY(${tilt3.rotateY}deg)`,
                transition: 'transform 0.1s ease-out',
              }}
              whileHover={{ scale: 1.1 }}
            >
              <motion.div
                className="absolute inset-0 pointer-events-none rounded-3xl will-change-transform"
                animate={{
                  boxShadow: [
                    'inset 0 0 100px rgba(228, 80, 143, 0.5)',
                    'inset 0 0 180px rgba(228, 80, 143, 0.7)',
                    'inset 0 0 100px rgba(228, 80, 143, 0.5)',
                  ],
                }}
                transition={{ duration: 5, repeat: Infinity }}
              />
              <Image
                src="/IMG_20260323_184249.jpg"
                alt="Fiha in an elegant solo portrait with dark cinematic styling"
                fill
                quality={95}
                className="object-cover rounded-3xl group-hover:scale-140 transition-transform duration-800 will-change-transform"
                sizes="50vw"
              />
            </motion.div>
          </motion.div>

          <motion.div
            className="relative w-full aspect-video rounded-3xl overflow-hidden group cursor-pointer will-change-transform"
            initial={{ opacity: 0, y: 70 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, delay: 0.6 }}
            whileHover={{ scale: 1.07 }}
          >
            <motion.div
              className="absolute inset-0 pointer-events-none rounded-3xl will-change-transform"
              animate={{
                boxShadow: [
                  '0 0 100px rgba(193, 39, 59, 0.4)',
                  '0 0 180px rgba(193, 39, 59, 0.6)',
                  '0 0 100px rgba(193, 39, 59, 0.4)',
                ],
              }}
              transition={{ duration: 6, repeat: Infinity }}
            />
            <Image
              src="/photo_6334827194391578943_y.jpeg"
              alt="Fiha in an elegant portrait with radiant glow"
              fill
              quality={95}
              className="object-cover rounded-3xl group-hover:scale-125 transition-transform duration-800 will-change-transform"
              sizes="100vw"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
