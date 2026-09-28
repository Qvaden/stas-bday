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

      const cards = gridRef.current.querySelectorAll('.reason-card');
      cards.forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 95%',
            toggleActions: 'play none none none',
          },
          x: -50,
          opacity: 0,
          duration: 0.6,
          delay: (i % 4) * 0.08,
          ease: 'power3.out',
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef}>
      <div className="section-header">
        <span className="section-num">REASONS.LOG // 27 ENTRIES</span>
        <h2 ref={titleRef} className="section-title">
          27 ПРИЧИН,<br />ПОЧЕМУ СТАС — ЛЕГЕНДА
        </h2>
        <p className="section-subtitle">— &gt; ACCESS GRANTED :: LEVEL 27 CLEARED —</p>
      </div>
      <div ref={gridRef} className="reasons-grid">
        {REASONS.map((reason, i) => (
          <div key={i} className="reason-card">
            <div className="reason-num">{String(i + 1).padStart(2, '0')} //</div>
            <div className="reason-text">{reason}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
