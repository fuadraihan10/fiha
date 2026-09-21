'use client'

import { motion } from 'framer-motion'
import { useMemo } from 'react'

interface PolaroidFrameProps {
  imageSrc: string
  alt: string
  caption?: string
  rotation?: number
  flower?: string
  tapeColor?: string
}

const flowers = ['🌸', '🌺', '🌷', '💐']
const corners = ['top-left', 'top-right', 'bottom-left', 'bottom-right'] as const

export default function PolaroidFrame({
  imageSrc,
  alt,
  caption,
  rotation,
  flower,
  tapeColor = 'pink-200',
}: PolaroidFrameProps) {
  const randomRotation = useMemo(() => rotation ?? Math.random() * 8 - 4, [rotation])
  const randomFlower = useMemo(() => flower ?? flowers[Math.floor(Math.random() * flowers.length)], [flower])
  const randomCorner = useMemo(() => corners[Math.floor(Math.random() * corners.length)], [])

  const cornerStyles: Record<typeof randomCorner, string> = {
    'top-left': 'top-2 left-2',
    'top-right': 'top-2 right-2',
    'bottom-left': 'bottom-16 left-2',
    'bottom-right': 'bottom-16 right-2',
  }

  return (
    <motion.div
      className="relative max-w-sm mx-auto"
      style={{ perspective: '1000px' }}
      initial={{ rotate: randomRotation, y: 0 }}
      whileHover={{ rotate: 0, y: -8 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <div className="bg-[#FFF5F6] p-3 pb-12 rounded-sm shadow-[0_4px_20px_rgba(180,100,100,0.15),0_2px_8px_rgba(0,0,0,0.1)]">
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <img src={imageSrc} alt={alt} className="w-full h-full object-cover" />
        </div>
        {caption && (
          <p className="mt-3 text-center text-gray-700 text-lg font-caveat">{caption}</p>
        )}
      </div>

      <div
        className={`absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-${tapeColor}/70 
          border-2 border-dashed border-pink-300/50 rotate-[-8deg] rounded-sm`}
      />

      <span className={`absolute ${cornerStyles[randomCorner]} text-2xl pointer-events-none`}>
        {randomFlower}
      </span>

      <span className="absolute bottom-20 right-3 text-lg opacity-70 pointer-events-none">🍃</span>
    </motion.div>
  )
}
