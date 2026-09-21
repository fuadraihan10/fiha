'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useRef } from 'react';
import PolaroidFrame from '@/components/PolaroidFrame';
import ScratchReveal from '@/components/ScratchReveal';

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
    <section ref={ref} className="w-screen min-h-screen py-32 px-8 bg-gradient-to-b from-[#FFF8F3] via-[#FFFAF5] to-[#FFF5EE]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-28"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2 }}
        >
          <h2
            className="font-serif text-5xl md:text-7xl text-[#6B2D5C] mb-6"
            style={{ fontFamily: '"Playfair Display", serif', fontWeight: 700 }}
          >
            The Most Beautiful Person in My Universe 🌟💖
          </h2>
          <p className="text-[#5D4E4E] text-xl font-light">
            My favorite view in the whole world, always and forever. 🌺
          </p>
        </motion.div>

        <div className="space-y-24">
          <motion.div
            ref={cardRef1}
            onMouseMove={(e) => handleTilt(e, setTilt1, cardRef1)}
            onMouseLeave={() => resetTilt(setTilt1)}
            className="relative w-full max-w-md mx-auto will-change-transform"
            initial={{ opacity: 0, y: 70 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, delay: 0.2 }}
            style={{
              perspective: '1300px',
              transform: `rotateX(${tilt1.rotateX}deg) rotateY(${tilt1.rotateY}deg)`,
              transition: 'transform 0.1s ease-out',
            }}
            whileHover={{ scale: 1.03 }}
          >
            <ScratchReveal
              imageSrc="/photo_6064472012564317518_y.jpg"
              alt="Fiha wearing a wine-red organza scarf in a hazy, overexposed portrait"
              aspectRatio="video"
            />
            <motion.div
              className="absolute inset-0 pointer-events-none rounded-2xl"
              animate={{
                boxShadow: [
                  '0 0 60px rgba(226, 178, 90, 0.3)',
                  '0 0 100px rgba(226, 178, 90, 0.5)',
                  '0 0 60px rgba(226, 178, 90, 0.3)',
                ],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />
          </motion.div>

          <motion.p
            className="text-center text-2xl text-[#8B6B6B] font-caveat"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.35 }}
            style={{ fontFamily: 'Caveat, cursive' }}
          >
            Your smile is my favorite view 🌺
          </motion.p>

          <motion.div
            ref={cardRef2}
            onMouseMove={(e) => handleTilt(e, setTilt2, cardRef2)}
            onMouseLeave={() => resetTilt(setTilt2)}
            className="relative max-w-sm mx-auto will-change-transform"
            initial={{ opacity: 0, x: -70 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.2, delay: 0.4 }}
            style={{
              perspective: '1300px',
              transform: `rotateX(${tilt2.rotateX}deg) rotateY(${tilt2.rotateY}deg)`,
              transition: 'transform 0.1s ease-out',
            }}
            whileHover={{ scale: 1.05 }}
          >
            <PolaroidFrame
              imageSrc="/photo_6334724600507778357_y.jpg"
              alt="Fiha in an elegant mirror selfie wearing white and red saree"
              caption="Pure elegance ✨"
              flower="🌺"
              rotation={-3}
            />
            <motion.div
              className="absolute inset-0 pointer-events-none rounded-sm"
              animate={{
                boxShadow: [
                  '0 0 50px rgba(226, 178, 90, 0.4)',
                  '0 0 90px rgba(226, 178, 90, 0.6)',
                  '0 0 50px rgba(226, 178, 90, 0.4)',
                ],
              }}
              transition={{ duration: 5, repeat: Infinity }}
            />
          </motion.div>

          <motion.p
            className="text-center text-2xl text-[#8B6B6B] font-caveat"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.55 }}
            style={{ fontFamily: 'Caveat, cursive' }}
          >
            Every little expression of yours melts my heart 💖
          </motion.p>

          <motion.div
            className="relative bg-[#2D2A2A] py-16 px-8 -mx-8 rounded-none"
            initial={{ opacity: 0, y: 70 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, delay: 0.6 }}
          >
            <motion.div
              ref={cardRef3}
              onMouseMove={(e) => handleTilt(e, setTilt3, cardRef3)}
              onMouseLeave={() => resetTilt(setTilt3)}
              className="relative max-w-lg mx-auto will-change-transform"
              style={{
                perspective: '1300px',
                transform: `rotateX(${tilt3.rotateX}deg) rotateY(${tilt3.rotateY}deg)`,
                transition: 'transform 0.1s ease-out',
              }}
              whileHover={{ scale: 1.05 }}
            >
              <PolaroidFrame
                imageSrc="/IMG_20260323_184249.jpg"
                alt="Fiha in an elegant solo portrait with dark cinematic styling"
                caption="My forever muse 🖤"
                flower="🌷"
                rotation={2}
                tapeColor="rose-200"
              />
              <motion.div
                className="absolute inset-0 pointer-events-none rounded-sm"
                animate={{
                  boxShadow: [
                    'inset 0 0 80px rgba(228, 80, 143, 0.4)',
                    'inset 0 0 140px rgba(228, 80, 143, 0.6)',
                    'inset 0 0 80px rgba(228, 80, 143, 0.4)',
                  ],
                }}
                transition={{ duration: 5, repeat: Infinity }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
