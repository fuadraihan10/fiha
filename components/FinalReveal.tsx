'use client'

import { motion } from 'framer-motion'

const messages = [
  "I am sorry.",
  "I love you.",
  "I value you.",
  "I want to treat your heart more carefully.",
  "Thank you for being you. 💖"
]

const flowers = [
  { emoji: '🌸', left: '10%', top: '20%', delay: 0 },
  { emoji: '💐', right: '15%', top: '30%', delay: 0.5 },
  { emoji: '🌷', left: '20%', bottom: '25%', delay: 1 },
  { emoji: '🌸', right: '10%', bottom: '35%', delay: 1.5 },
  { emoji: '💐', left: '5%', top: '50%', delay: 2 },
]

export default function FinalReveal() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center py-40 px-8 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #FFF5F6 0%, #FFD1DC 100%)'
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, rgba(255,182,193,0.3) 0%, transparent 60%)'
        }}
      />

      {flowers.map((flower, i) => (
        <motion.span
          key={i}
          className="absolute text-3xl select-none pointer-events-none"
          style={{
            left: flower.left,
            right: flower.right,
            top: flower.top,
            bottom: flower.bottom
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: [0.4, 0.8, 0.4],
            y: [0, -15, 0]
          }}
          transition={{
            delay: flower.delay,
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          {flower.emoji}
        </motion.span>
      ))}

      <div className="relative z-10 max-w-2xl text-center">
        {messages.map((msg, i) => (
          <motion.p
            key={i}
            className="mb-6 text-3xl md:text-4xl"
            style={{
              fontFamily: 'Caveat, cursive',
              color: '#7A1F2B'
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.4, duration: 0.8, ease: 'easeOut' }}
          >
            {msg}
          </motion.p>
        ))}

        <motion.div
          className="relative mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.4, duration: 0.8 }}
        >
          {[...Array(5)].map((_, i) => (
            <motion.span
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{
                background: '#E2B25A',
                left: `${20 + i * 15}%`,
                top: Math.random() * 20 - 10
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0.5, 1, 0.5]
              }}
              transition={{
                delay: 2.4 + i * 0.2,
                duration: 1.5,
                repeat: Infinity,
                repeatDelay: 1
              }}
            />
          ))}
          <p
            className="text-xl italic"
            style={{ color: '#E2B25A' }}
          >
            — jr_alexkazi
          </p>
        </motion.div>
      </div>
    </section>
  )
}
