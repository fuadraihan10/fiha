'use client';

import { useRef, useEffect, useState } from 'react';

interface TiltPosition {
  rotateX: number;
  rotateY: number;
  scale: number;
}

export function useTilt() {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState<TiltPosition>({ rotateX: 0, rotateY: 0, scale: 1 });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -15;
      const rotateY = ((x - centerX) / centerX) * 15;

      setTilt({
        rotateX,
        rotateY,
        scale: 1.05,
      });
    };

    const handleMouseLeave = () => {
      setTilt({ rotateX: 0, rotateY: 0, scale: 1 });
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return { ref, tilt };
}

export function useTouchTrail() {
  const [trail, setTrail] = useState<Array<{ id: string; x: number; y: number }>>([]);

  useEffect(() => {
    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (!touch) return;

      const particle = {
        id: `${Date.now()}-${Math.random()}`,
        x: touch.clientX,
        y: touch.clientY,
      };

      setTrail((prev) => [...prev, particle].slice(-40));
    };

    window.addEventListener('touchmove', handleTouchMove);
    return () => window.removeEventListener('touchmove', handleTouchMove);
  }, []);

  return trail;
}
