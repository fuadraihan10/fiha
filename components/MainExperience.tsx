'use client';

import HeroApology from './sections/HeroApology';
import UsSection from './sections/UsSection';
import OurMemoryPathSection from './sections/OurMemoryPathSection';
import SillySideSection from './sections/SillySideSection';
import YouSection from './sections/YouSection';
import EmotionalPeak from './sections/EmotionalPeak';
import FinalApology from './sections/FinalApology';
import ForgivenessButtons from './sections/ForgivenessButtons';
import VinylPlayer from './VinylPlayer';
import DraggableStickers from './DraggableStickers';

export default function MainExperience() {
  return (
    <div className="relative w-full bg-cherry-cream">
      <VinylPlayer youtubeId="IpFX2vq8HKw" />
      <DraggableStickers />
      <HeroApology />
      <UsSection />
      <OurMemoryPathSection />
      <SillySideSection />
      <YouSection />
      <EmotionalPeak />
      <FinalApology />
      <ForgivenessButtons />
    </div>
  );
}
