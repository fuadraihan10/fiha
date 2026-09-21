'use client';

import Image from 'next/image';

interface MemoryCardProps {
  memory: {
    id: number;
    image: string;
    alt: string;
    date: string;
    caption: string;
    theme: 'warm' | 'slate' | 'dark' | 'film';
  };
}

export default function MemoryCard({ memory }: MemoryCardProps) {
  const themeStyles = {
    warm: {
      bg: '#E2B25A',
      textColor: '#1E1B18',
      decorColor: 'rgba(226, 178, 90, 0.2)',
    },
    slate: {
      bg: '#2D3748',
      textColor: '#F5EBDD',
      decorColor: 'rgba(45, 55, 72, 0.2)',
    },
    dark: {
      bg: '#1E1B18',
      textColor: '#F5EBDD',
      decorColor: 'rgba(122, 31, 43, 0.3)',
    },
    film: {
      bg: '#1E1B18',
      textColor: '#F5EBDD',
      decorColor: 'rgba(226, 178, 90, 0.1)',
    },
  };

  const style = themeStyles[memory.theme];

  return (
    <div 
      className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
      style={{ backgroundColor: style.bg }}
    >
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={memory.image}
          alt={memory.alt}
          fill
          className="object-cover"
        />
      </div>
      
      <div className="p-8">
        <p 
          className="text-sm font-semibold tracking-widest uppercase mb-3"
          style={{ color: style.textColor, opacity: 0.7 }}
        >
          {memory.date}
        </p>
        <p 
          className="text-lg leading-relaxed"
          style={{ color: style.textColor }}
        >
          {memory.caption}
        </p>
      </div>

      <div
        className="h-1 w-full opacity-30"
        style={{ backgroundColor: style.decorColor }}
      />
    </div>
  );
}
