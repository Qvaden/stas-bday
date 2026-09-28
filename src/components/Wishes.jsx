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
      // Заголовок — анимация по скроллу
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

      // Карточки — каждая со своим триггером через batch,
      // чтобы анимация ТОЧНО сработала, даже если секция уже видна
      const cards = gridRef.current.querySelectorAll('.wish-card');

      // Сначала ставим финальное состояние явно, чтобы не было мерцания
      gsap.set(cards, { opacity: 1, scale: 1, rotation: 0 });

      // Анимируем вход — каждый со своей задержкой
      cards.forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
          scale: 0,
          opacity: 0,
          rotation: gsap.utils.random(-180, 180),
          duration: 0.8,
          delay: i * 0.08,
          ease: 'back.out(1.4)',
        });
      });
    }, sectionRef);

    return () => ctx.revert();
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
