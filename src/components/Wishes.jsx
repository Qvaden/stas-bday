import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { WISHES } from '../data/content';

gsap.registerPlugin(ScrollTrigger);

export default function Wishes() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    gsap.from(titleRef.current, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
      },
      y: 100,
      opacity: 0,
      duration: 1,
    });

    const cards = gridRef.current.querySelectorAll('.wish-card');
    gsap.from(cards, {
      scrollTrigger: {
        trigger: gridRef.current,
        start: 'top 75%',
      },
      scale: 0,
      opacity: 0,
      rotation: () => gsap.utils.random(-180, 180),
      duration: 0.8,
      stagger: {
        each: 0.1,
        from: 'random',
      },
      ease: 'back.out(1.4)',
    });
  }, []);

  return (
    <section ref={sectionRef}>
      <h2 ref={titleRef} className="section-title">
        ПОЖЕЛАНИЯ<br />ОТ ДУШИ
      </h2>
      <p className="section-subtitle">— и немного от живота —</p>
      <div ref={gridRef} className="wishes-grid">
        {WISHES.map((wish, i) => (
          <div key={i} className="wish-card">
            <span className="wish-icon">{wish.icon}</span>
            <p className="wish-text">{wish.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
