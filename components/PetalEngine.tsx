'use client'

import { useEffect, useRef, useCallback } from 'react'

type ParticleType = 'rose' | 'sakura' | 'leaf' | 'gold' | 'sparkle'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  rotation: number
  rotationSpeed: number
  size: number
  opacity: number
  type: ParticleType
}

const COLORS = {
  rose: '#C1273B',
  sakura: '#FFD1DC',
  leaf: '#6B8F5E',
  gold: '#E2B25A',
  sparkle: '#FFF5F6',
}

const PARTICLE_CONFIG: Record<ParticleType, { weight: number; sizeRange: [number, number] }> = {
  rose: { weight: 0.25, sizeRange: [12, 22] },
  sakura: { weight: 0.25, sizeRange: [8, 16] },
  leaf: { weight: 0.15, sizeRange: [10, 18] },
  gold: { weight: 0.25, sizeRange: [2, 5] },
  sparkle: { weight: 0.1, sizeRange: [1, 3] },
}

export default function PetalEngine() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const rafRef = useRef<number>(0)
  const pausedRef = useRef(false)

  const getParticleCount = useCallback(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    return reducedMotion ? 15 : 40
  }, [])

  const createParticle = useCallback((w: number, h: number, fromTop = false): Particle => {
    const rand = Math.random()
    let type: ParticleType = 'rose'
    let cumulative = 0
    for (const [t, config] of Object.entries(PARTICLE_CONFIG)) {
      cumulative += config.weight
      if (rand < cumulative) {
        type = t as ParticleType
        break
      }
    }
    const [minS, maxS] = PARTICLE_CONFIG[type].sizeRange
    const size = minS + Math.random() * (maxS - minS)
    return {
      x: Math.random() * w,
      y: fromTop ? -size * 2 : Math.random() * h,
      vx: (Math.random() - 0.5) * 0.5,
      vy: 0.3 + Math.random() * 0.7,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.02,
      size,
      opacity: 0.4 + Math.random() * 0.5,
      type,
    }
  }, [])

  const drawPetal = (ctx: CanvasRenderingContext2D, p: Particle) => {
    ctx.save()
    ctx.translate(p.x, p.y)
    ctx.rotate(p.rotation)
    ctx.globalAlpha = p.opacity
    const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size)
    grad.addColorStop(0, p.type === 'rose' ? '#FF6B8A' : p.type === 'sakura' ? '#FFB6C1' : '#8FBC8F')
    grad.addColorStop(1, COLORS[p.type])
    ctx.fillStyle = grad
    ctx.beginPath()
    ctx.ellipse(0, 0, p.size * 0.6, p.size, 0, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()
  }

  const drawGold = (ctx: CanvasRenderingContext2D, p: Particle) => {
    ctx.save()
    ctx.globalAlpha = p.opacity * (0.5 + Math.sin(Date.now() * 0.003 + p.x) * 0.5)
    ctx.fillStyle = COLORS.gold
    ctx.beginPath()
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()
  }

  const drawSparkle = (ctx: CanvasRenderingContext2D, p: Particle) => {
    ctx.save()
    ctx.globalAlpha = p.opacity * (0.3 + Math.sin(Date.now() * 0.005 + p.y) * 0.7)
    ctx.fillStyle = COLORS.sparkle
    ctx.beginPath()
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()
  }

  const animate = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas || pausedRef.current) {
      rafRef.current = requestAnimationFrame(animate)
      return
    }
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    const { x: mx, y: my } = mouseRef.current
    for (const p of particlesRef.current) {
      const dx = p.x - mx
      const dy = p.y - my
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < 100 && dist > 0) {
        const force = (100 - dist) / 100 * 0.3
        p.vx += (dx / dist) * force
        p.vy += (dy / dist) * force * 0.5
      }
      p.vx *= 0.99
      p.vy = Math.min(p.vy, 2)
      p.x += p.vx + Math.sin(Date.now() * 0.001 + p.y * 0.01) * 0.3
      p.y += p.vy
      p.rotation += p.rotationSpeed
      if (p.type === 'rose' || p.type === 'sakura' || p.type === 'leaf') {
        drawPetal(ctx, p)
      } else if (p.type === 'gold') {
        drawGold(ctx, p)
      } else {
        drawSparkle(ctx, p)
      }
      if (p.y > canvas.height + p.size * 2 || p.x < -p.size * 2 || p.x > canvas.width + p.size * 2) {
        Object.assign(p, createParticle(canvas.width, canvas.height, true))
      }
    }
    rafRef.current = requestAnimationFrame(animate)
  }, [createParticle])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    handleResize()
    const count = getParticleCount()
    particlesRef.current = Array.from({ length: count }, () => createParticle(canvas.width, canvas.height))
    const handleMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0]?.clientX ?? -1000 : e.clientX
      const clientY = 'touches' in e ? e.touches[0]?.clientY ?? -1000 : e.clientY
      mouseRef.current = { x: clientX, y: clientY }
    }
    const handleLeave = () => { mouseRef.current = { x: -1000, y: -1000 } }
    const handleVisibility = () => { pausedRef.current = document.hidden }
    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', handleMove)
    window.addEventListener('touchmove', handleMove)
    window.addEventListener('mouseleave', handleLeave)
    document.addEventListener('visibilitychange', handleVisibility)
    rafRef.current = requestAnimationFrame(animate)
    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('touchmove', handleMove)
      window.removeEventListener('mouseleave', handleLeave)
      document.removeEventListener('visibilitychange', handleVisibility)
      cancelAnimationFrame(rafRef.current)
    }
  }, [animate, createParticle, getParticleCount])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 2,
      }}
    />
  )
}
