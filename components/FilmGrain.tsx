'use client';

export default function FilmGrain() {
  return (
    <div 
      className="fixed inset-0 pointer-events-none z-50 opacity-3"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' seed='2' /%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23noiseFilter)' opacity='0.5'/%3E%3C/svg%3E")`,
        backgroundSize: '400px 400px',
      }}
    />
  );
}
