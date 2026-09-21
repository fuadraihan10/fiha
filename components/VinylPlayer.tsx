'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface VinylPlayerProps {
  audioSrc?: string
}

export default function VinylPlayer({ audioSrc }: VinylPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (audioSrc && !audioRef.current) {
      audioRef.current = new Audio(audioSrc)
      audioRef.current.loop = true
      audioRef.current.volume = 0.5
    }
    const startAudio = () => {
      if (audioRef.current && !isPlaying) {
        audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {})
      }
      window.removeEventListener('click', startAudio)
      window.removeEventListener('touchstart', startAudio)
      window.removeEventListener('scroll', startAudio)
    }
    window.addEventListener('click', startAudio, { once: true })
    window.addEventListener('touchstart', startAudio, { once: true })
    window.addEventListener('scroll', startAudio, { once: true })
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
      window.removeEventListener('click', startAudio)
      window.removeEventListener('touchstart', startAudio)
      window.removeEventListener('scroll', startAudio)
    }
  }, [audioSrc])

  const togglePlay = () => {
    if (!audioRef.current) {
      if (audioSrc) {
        audioRef.current = new Audio(audioSrc)
        audioRef.current.loop = true
        audioRef.current.volume = 0.5
        audioRef.current.play().catch(() => {})
        setIsPlaying(true)
      }
      return
    }
    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play().catch(() => {})
    }
    setIsPlaying(!isPlaying)
  }

  const notes = ['♪', '♫', '✨']

  return (
    <motion.button
      onClick={togglePlay}
      className="fixed right-6 top-6 z-40 w-20 h-20 rounded-full flex items-center justify-center"
      style={{
        background: 'linear-gradient(145deg, #fef3f3, #fde4e4)',
        boxShadow: '0 4px 20px rgba(255, 182, 193, 0.4), 0 0 30px rgba(255, 182, 193, 0.2)',
        minHeight: '56px',
        minWidth: '56px'
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      animate={isPlaying ? { boxShadow: ['0 4px 20px rgba(255, 182, 193, 0.4), 0 0 30px rgba(255, 182, 193, 0.2)', '0 4px 30px rgba(255, 182, 193, 0.6), 0 0 50px rgba(255, 182, 193, 0.4)', '0 4px 20px rgba(255, 182, 193, 0.4), 0 0 30px rgba(255, 182, 193, 0.2)'] } : {}}
      transition={isPlaying ? { duration: 2, repeat: Infinity } : {}}
    >
      <div className="absolute -top-1 -right-1 text-xs">🌸</div>
      <motion.div
        className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-900 to-black flex items-center justify-center relative"
        style={{ boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.5)' }}
        animate={isPlaying ? { rotate: 360 } : { y: [0, -3, 0] }}
        transition={isPlaying ? { duration: 2, repeat: Infinity, ease: 'linear' } : { duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="w-3 h-3 rounded-full bg-gray-700 border border-gray-600" />
        <div className="absolute inset-2 rounded-full border border-gray-700 opacity-30" />
        <div className="absolute inset-4 rounded-full border border-gray-700 opacity-20" />
      </motion.div>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {isPlaying ? (
          <svg className="w-5 h-5 text-rose-400 drop-shadow-md" fill="currentColor" viewBox="0 0 24 24"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>
        ) : (
          <svg className="w-5 h-5 text-rose-400 drop-shadow-md ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
        )}
      </div>
      <AnimatePresence>
        {isPlaying && notes.map((note, i) => (
          <motion.span
            key={i}
            className="absolute text-rose-400 text-lg pointer-events-none"
            initial={{ opacity: 0, y: 0, x: 0 }}
            animate={{ opacity: [0, 1, 0], y: -40, x: (i - 1) * 20 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.5 }}
          >
            {note}
          </motion.span>
        ))}
      </AnimatePresence>
    </motion.button>
  )
}
