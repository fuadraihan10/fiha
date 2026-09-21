'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface LoveLetterEnvelopeProps {
  text: string
  signature?: string
}

export default function LoveLetterEnvelope({ text, signature }: LoveLetterEnvelopeProps) {
  const [isOpen, setIsOpen] = useState(false)

  const lines = text.split('\n').filter(line => line.trim())

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[500px] max-w-md mx-auto px-4">
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(circle at center, rgba(255,182,193,0.3) 0%, transparent 70%)'
              }}
            />
            {[...Array(3)].map((_, i) => (
              <motion.svg
                key={i}
                initial={{ 
                  opacity: 0,
                  x: Math.random() * 200 - 100,
                  y: 400
                }}
                animate={{
                  opacity: [0, 1, 0],
                  y: -100,
                  x: Math.random() * 200 - 100
                }}
                transition={{
                  duration: 4,
                  delay: i * 0.5,
                  repeat: Infinity,
                  repeatDelay: 2
                }}
                className="absolute w-4 h-4 text-pink-200 pointer-events-none"
                viewBox="0 0 20 20"
              >
                <path
                  fill="currentColor"
                  d="M10 0C10 0 12 5 16 7C12 9 10 14 10 14C10 14 8 9 4 7C8 5 10 0 10 0Z"
                />
              </motion.svg>
            ))}
          </>
        )}
      </AnimatePresence>

      <motion.div
        animate={{ y: isOpen ? -10 : 0 }}
        transition={{ duration: 0.3 }}
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer relative"
      >
        {!isOpen && (
          <>
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-pink-300 rounded-full"
                style={{
                  top: `${20 + i * 30}%`,
                  left: `${10 + i * 35}%`
                }}
                animate={{
                  opacity: [0.3, 1, 0.3],
                  scale: [0.8, 1.2, 0.8]
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.3,
                  repeat: Infinity
                }}
              />
            ))}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="relative"
            >
              <div className="relative w-64 h-44 bg-gradient-to-br from-pink-200 to-pink-300 rounded-lg shadow-xl">
                <div className="absolute inset-0 rounded-lg border-2 border-pink-300 opacity-50" />
                <motion.div
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  💌
                </motion.div>
              </div>
            </motion.div>
            <p 
              className="mt-4 text-pink-600 text-center"
              style={{ fontFamily: 'Caveat, cursive', fontSize: '1.25rem' }}
            >
              Tap to open my letter 💌
            </p>
          </>
        )}

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.9 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="relative"
            >
              <div 
                className="w-72 min-h-[300px] p-6 rounded-xl shadow-2xl"
                style={{ 
                  backgroundColor: '#FFF5F6',
                  fontFamily: 'Caveat, cursive'
                }}
              >
                <div className="space-y-3 text-gray-700 text-lg">
                  {lines.map((line, index) => (
                    <motion.p
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.15, duration: 0.4 }}
                      className="leading-relaxed"
                    >
                      {line}
                    </motion.p>
                  ))}
                </div>
                {signature && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 + lines.length * 0.15 + 0.2 }}
                    className="mt-6 text-pink-600 text-base"
                  >
                    — {signature}
                  </motion.p>
                )}
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 }}
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsOpen(false)
                  }}
                  className="mt-4 text-sm text-pink-400 hover:text-pink-600 transition-colors"
                >
                  Close
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
