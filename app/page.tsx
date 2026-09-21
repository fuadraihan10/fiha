'use client';

import { useState, useEffect } from 'react';
import MainExperience from '@/components/MainExperience';
import PetalEngine from '@/components/PetalEngine';
import FilmGrain from '@/components/FilmGrain';

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className="bg-cherry-cream overflow-x-hidden">
      <PetalEngine />
      <FilmGrain />
      <MainExperience />
    </main>
  );
}
