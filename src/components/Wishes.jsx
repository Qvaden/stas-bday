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
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        y: 100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });

      const cards = gridRef.current.querySelectorAll('.wish-card');
      cards.forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
          y: 60,
          opacity: 0,
          duration: 0.7,
          delay: i * 0.06,
          ease: 'power3.out',
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef}>
      <div className="section-header">
        <span className="section-num">WISHES.EXE // 10 QUESTS</span>
        <h2 ref={titleRef} className="section-title">
          ПОЖЕЛАНИЯ<br />ОТ ДУШИ
        </h2>
        <p className="section-subtitle">— &gt; INITIALIZING GENUINE WISHES... —</p>
      </div>
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
