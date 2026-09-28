import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Cursor from './components/Cursor';
import Confetti from './components/Confetti';
import Hero from './components/Hero';
import Reasons from './components/Reasons';
import Timeline from './components/Timeline';
import Wishes from './components/Wishes';
import Memes from './components/Memes';
import SecretLetter from './components/SecretLetter';
import Finale from './components/Finale';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const containerRef = useRef(null);

  useEffect(() => {
    // Refresh ScrollTrigger после полной загрузки DOM
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div ref={containerRef}>
      <Cursor />
      <Confetti active={true} />
      <Hero />
      <Reasons />
      <Timeline />
      <Wishes />
      <Memes />
      <SecretLetter />
      <Finale />
    </div>
  );
}
