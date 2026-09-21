'use client'

import { useRef, useEffect, useState, useCallback } from 'react'

interface ScratchRevealProps {
  imageSrc: string
  alt: string
  caption?: string
  aspectRatio?: 'square' | 'video'
}

export default function ScratchReveal({
  imageSrc,
  alt,
  caption,
  aspectRatio = 'square'
}: ScratchRevealProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [revealed, setRevealed] = useState(false)
  const [fadeOut, setFadeOut] = useState(false)
  const scratchedPixels = useRef(0)
  const totalPixels = useRef(0)
  const isDrawing = useRef(false)
  const lastPoint = useRef<{ x: number; y: number } | null>(null)

  const getCanvasContext = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return null
    const ctx = canvas.getContext('2d', { willReadFrequently: true })
    return { canvas, ctx }
  }, [])

  const drawOverlay = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const gradient = ctx.createLinearGradient(0, 0, width, height)
    gradient.addColorStop(0, 'rgba(255,245,246,0.92)')
    gradient.addColorStop(0.5, 'rgba(255,240,245,0.88)')
    gradient.addColorStop(1, 'rgba(255,235,240,0.92)')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, width, height)

    const petals = ['🌸', '🌺', '💕', '✿']
    const positions = [
      { x: width * 0.15, y: height * 0.2 },
      { x: width * 0.8, y: height * 0.15 },
      { x: width * 0.1, y: height * 0.75 },
      { x: width * 0.85, y: height * 0.8 },
      { x: width * 0.5, y: height * 0.1 },
      { x: width * 0.3, y: height * 0.85 },
    ]
    ctx.font = `${Math.min(width, height) * 0.08}px serif`
    positions.forEach((pos, i) => {
      ctx.fillText(petals[i % petals.length], pos.x, pos.y)
    })

    ctx.fillStyle = 'rgba(180,100,120,0.75)'
    ctx.font = `bold ${Math.min(width, height) * 0.065}px Caveat, cursive`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('Swipe to reveal our memory ✨', width / 2, height / 2)
  }, [])

  const initCanvas = useCallback(() => {
    const result = getCanvasContext()
    if (!result) return
    const { canvas, ctx } = result
    if (!ctx) return
    const container = containerRef.current
    if (!container) return

    const rect = container.getBoundingClientRect()
    canvas.width = rect.width
    canvas.height = rect.height
    totalPixels.current = canvas.width * canvas.height
    scratchedPixels.current = 0

    drawOverlay(ctx, canvas.width, canvas.height)
  }, [getCanvasContext, drawOverlay])

  useEffect(() => {
    initCanvas()
    window.addEventListener('resize', initCanvas)
    return () => window.removeEventListener('resize', initCanvas)
  }, [initCanvas])

  const scratch = useCallback((x: number, y: number) => {
    const result = getCanvasContext()
    if (!result || revealed || fadeOut) return
    const { canvas, ctx } = result
    if (!ctx) return

    const radius = 35

    ctx.globalCompositeOperation = 'destination-out'
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, Math.PI * 2)
    ctx.fill()

    if (lastPoint.current) {
      const dist = Math.hypot(x - lastPoint.current.x, y - lastPoint.current.y)
      const steps = Math.max(1, Math.floor(dist / 5))
      for (let i = 1; i < steps; i++) {
        const t = i / steps
        const ix = lastPoint.current.x + (x - lastPoint.current.x) * t
        const iy = lastPoint.current.y + (y - lastPoint.current.y) * t
        ctx.beginPath()
        ctx.arc(ix, iy, radius, 0, Math.PI * 2)
        ctx.fill()
      }
    }
    lastPoint.current = { x, y }

    ctx.globalCompositeOperation = 'source-over'
    scratchedPixels.current += Math.PI * radius * radius * 2

    const percentage = scratchedPixels.current / totalPixels.current
    if (percentage > 0.4) {
      setFadeOut(true)
      setTimeout(() => setRevealed(true), 600)
    }
  }, [getCanvasContext, revealed, fadeOut])

  const getPointerPos = useCallback((e: React.PointerEvent) => {
    const canvas = canvasRef.current
    if (!canvas) return { x: 0, y: 0 }
    const rect = canvas.getBoundingClientRect()
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    }
  }, [])

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    isDrawing.current = true
    const pos = getPointerPos(e)
    scratch(pos.x, pos.y)
  }, [getPointerPos, scratch])

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDrawing.current) return
    const pos = getPointerPos(e)
    scratch(pos.x, pos.y)
  }, [getPointerPos, scratch])

  const handlePointerUp = useCallback(() => {
    isDrawing.current = false
    lastPoint.current = null
  }, [])

  const aspectClass = aspectRatio === 'square' ? 'aspect-square' : 'aspect-video'

  return (
    <div className="relative">
      <div
        ref={containerRef}
        className={`relative overflow-hidden rounded-2xl shadow-lg ${aspectClass}`}
      >
        <img
          src={imageSrc}
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <canvas
          ref={canvasRef}
          className={`absolute inset-0 w-full h-full touch-none transition-opacity duration-600 ${
            fadeOut ? 'opacity-0' : 'opacity-100'
          }`}
          style={{ cursor: 'crosshair' }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
        />
        {!revealed && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
            <div
              className="absolute inset-0 animate-shimmer"
              style={{
                background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.5) 50%, transparent 60%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 3s infinite'
              }}
            />
          </div>
        )}
      </div>
      {caption && (
        <p className="mt-3 text-center text-rose-700 font-medium" style={{ fontFamily: 'Caveat, cursive', fontSize: '1.25rem' }}>
          {caption}
        </p>
      )}
      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  )
}
