import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { HERO } from '../data/content';

export default function Hero() {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const greetingRef = useRef(null);
  const ageRef = useRef(null);
  const subtitleRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.from(greetingRef.current, {
      y: -50,
      opacity: 0,
      duration: 1,
    })
      .from(
        titleRef.current,
        {
          scale: 0.3,
          opacity: 0,
          rotation: -10,
          duration: 1.2,
          ease: 'back.out(1.7)',
        },
        '-=0.5'
      )
      .from(
        ageRef.current,
        {
          scale: 0,
          opacity: 0,
          rotation: 360,
          duration: 1.5,
          ease: 'elastic.out(1, 0.5)',
        },
        '-=0.7'
      )
      .from(
        subtitleRef.current,
        {
          y: 30,
          opacity: 0,
          duration: 0.8,
        },
        '-=0.5'
      );

    // Плавающая анимация для age
    gsap.to(ageRef.current, {
      y: -15,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
  }, []);

  // Генерация звёзд
  const stars = Array.from({ length: 80 }).map((_, i) => ({
    id: i,
    top: Math.random() * 100,
    left: Math.random() * 100,
    size: Math.random() * 3 + 1,
    delay: Math.random() * 2,
  }));

  return (
    <section className="hero" ref={heroRef}>
      <div className="hero-stars">
        {stars.map((s) => (
          <div
            key={s.id}
            className="star"
            style={{
              top: `${s.top}%`,
              left: `${s.left}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              animationDelay: `${s.delay}s`,
            }}
          />
        ))}
      </div>
      <div ref={greetingRef} className="hero-greeting">
        {HERO.greeting}
      </div>
      <h1 ref={titleRef} className="hero-title">
        {HERO.name}
      </h1>
      <div ref={ageRef} className="hero-age">
        {HERO.age}
      </div>
      <div ref={subtitleRef} className="hero-subtitle">
        {HERO.subtitle}
      </div>
      <div className="hero-scroll">скролль вниз</div>
    </section>
  );
}
