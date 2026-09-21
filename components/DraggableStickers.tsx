'use client'

import { useRef, useEffect, useState } from 'react'

const STICKERS = ['🧸', '🎀', '💐', '💌', '🌸', '💖']

interface StickerState {
  id: number
  emoji: string
  x: number
  y: number
  rotation: number
}

export default function DraggableStickers() {
  const containerRef = useRef<HTMLDivElement>(null)
  const dragState = useRef<{
    id: number | null
    offsetX: number
    offsetY: number
    startX: number
    startY: number
  }>({ id: null, offsetX: 0, offsetY: 0, startX: 0, startY: 0 })
  const [stickers, setStickers] = useState<StickerState[]>([])
  const [draggingId, setDraggingId] = useState<number | null>(null)

  useEffect(() => {
    const initialized: StickerState[] = STICKERS.map((emoji, id) => ({
      id,
      emoji,
      x: Math.random() * (window.innerWidth - 80),
      y: Math.random() * (window.innerHeight - 80),
      rotation: (Math.random() - 0.5) * 20,
    }))
    setStickers(initialized)
  }, [])

  const handleStart = (
    id: number,
    clientX: number,
    clientY: number,
    currentX: number,
    currentY: number
  ) => {
    dragState.current = {
      id,
      offsetX: clientX - currentX,
      offsetY: clientY - currentY,
      startX: currentX,
      startY: currentY,
    }
    setDraggingId(id)
  }

  const handleMove = (clientX: number, clientY: number) => {
    if (dragState.current.id === null) return
    const id = dragState.current.id
    const newX = clientX - dragState.current.offsetX
    const newY = clientY - dragState.current.offsetY
    const maxX = window.innerWidth - 60
    const maxY = window.innerHeight - 60
    setStickers((prev) =>
      prev.map((s) =>
        s.id === id
          ? {
              ...s,
              x: Math.max(0, Math.min(maxX, newX)),
              y: Math.max(0, Math.min(maxY, newY)),
            }
          : s
      )
    )
  }

  const handleEnd = () => {
    dragState.current.id = null
    setDraggingId(null)
  }

  const onMouseDown = (e: React.MouseEvent, id: number) => {
    const sticker = stickers.find((s) => s.id === id)
    if (!sticker) return
    handleStart(id, e.clientX, e.clientY, sticker.x, sticker.y)
  }

  const onTouchStart = (e: React.TouchEvent, id: number) => {
    const sticker = stickers.find((s) => s.id === id)
    if (!sticker) return
    const touch = e.touches[0]
    handleStart(id, touch.clientX, touch.clientY, sticker.x, sticker.y)
  }

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => handleMove(e.clientX, e.clientY)
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        handleMove(e.touches[0].clientX, e.touches[0].clientY)
      }
    }
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', handleEnd)
    window.addEventListener('touchmove', onTouchMove)
    window.addEventListener('touchend', handleEnd)
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', handleEnd)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', handleEnd)
    }
  }, [])

  return (
    <>
      <style jsx global>{`
        @keyframes gentle-float {
          0%, 100% { transform: translateY(0px) rotate(var(--rot)); }
          50% { transform: translateY(-8px) rotate(var(--rot)); }
        }
      `}</style>
      <div
        ref={containerRef}
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 30 }}
      >
        {stickers.map((sticker) => (
          <div
            key={sticker.id}
            onMouseDown={(e) => onMouseDown(e, sticker.id)}
            onTouchStart={(e) => onTouchStart(e, sticker.id)}
            className="absolute pointer-events-auto select-none cursor-grab active:cursor-grabbing"
            style={{
              left: sticker.x,
              top: sticker.y,
              fontSize: '48px',
              transform: draggingId === sticker.id ? 'scale(1.2) rotate(5deg)' : `rotate(${sticker.rotation}deg)`,
              transition: draggingId === sticker.id ? 'none' : 'transform 0.3s ease-out',
              boxShadow: draggingId === sticker.id ? '0 8px 24px rgba(0,0,0,0.3)' : '0 2px 8px rgba(0,0,0,0.1)',
              touchAction: 'none',
              animation: draggingId === sticker.id ? 'none' : `gentle-float ${3 + sticker.id * 0.5}s ease-in-out infinite`,
              animationDelay: `${sticker.id * 0.3}s`,
              ['--rot' as string]: `${sticker.rotation}deg`,
            } as React.CSSProperties}
          >
            {sticker.emoji}
          </div>
        ))}
      </div>
    </>
  )
}
