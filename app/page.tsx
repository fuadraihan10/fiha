'use client';

import { useState, useEffect } from 'react';
import OpeningQuestion from '@/components/OpeningQuestion';
import MainExperience from '@/components/MainExperience';
import HeartTrail from '@/components/HeartTrail';
import FilmGrain from '@/components/FilmGrain';

export default function Home() {
  const [hasAccepted, setHasAccepted] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className="bg-cream overflow-x-hidden">
      <HeartTrail />
      <FilmGrain />
      {!hasAccepted ? (
        <OpeningQuestion onAccept={() => setHasAccepted(true)} />
      ) : (
        <MainExperience />
      )}
    </main>
  );
}

