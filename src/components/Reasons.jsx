import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { REASONS } from '../data/content';

gsap.registerPlugin(ScrollTrigger);

export default function Reasons() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Заголовок
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        y: 100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });

      // Каждая карточка — со своим триггером
      const cards = gridRef.current.querySelectorAll('.reason-card');
      cards.forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 95%',
            toggleActions: 'play none none none',
          },
          y: 80,
          opacity: 0,
          rotation: gsap.utils.random(-12, 12),
          duration: 0.7,
          delay: (i % 3) * 0.05,
          ease: 'back.out(1.5)',
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef}>
      <h2 ref={titleRef} className="section-title">
        27 ПРИЧИН,<br />ПОЧЕМУ СТАС — ЛЕГЕНДА
      </h2>
      <p className="section-subtitle">— осторожно, может вызвать зависть —</p>
      <div ref={gridRef} className="reasons-grid">
        {REASONS.map((reason, i) => (
          <div key={i} className="reason-card">
            <div className="reason-num">#{String(i + 1).padStart(2, '0')}</div>
            <div className="reason-text">{reason}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
