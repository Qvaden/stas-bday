import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { HERO } from '../data/content';

export default function Hero() {
  const heroRef = useRef(null);
  const tagRef = useRef(null);
  const titleRef = useRef(null);
  const greetingRef = useRef(null);
  const ageRef = useRef(null);
  const subtitleRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Сначала ставим всё видимым — fallback
    gsap.set(
      [tagRef.current, greetingRef.current, titleRef.current, ageRef.current, subtitleRef.current, scrollRef.current],
      { opacity: 1 }
    );

    tl.from(tagRef.current, {
      x: -50,
      opacity: 0,
      duration: 0.8,
    })
      .from(
        greetingRef.current,
        {
          y: -30,
          opacity: 0,
          duration: 0.8,
        },
        '-=0.5'
      )
      .from(
        titleRef.current,
        {
          scale: 0.5,
          opacity: 0,
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
          duration: 1.2,
          ease: 'back.out(1.4)',
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
      )
      .from(
        scrollRef.current,
        {
          y: 20,
          opacity: 0,
          duration: 0.6,
        },
        '-=0.3'
      );

    // Плавающая анимация для age
    gsap.to(ageRef.current, {
      y: -12,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    // Мигание tag
    gsap.to(tagRef.current, {
      boxShadow: '0 0 30px rgba(0, 240, 255, 0.4)',
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    // FALLBACK: если что-то осталось невидимым через 2 секунды — показать
    const fallback = setTimeout(() => {
      [tagRef.current, greetingRef.current, titleRef.current, ageRef.current, subtitleRef.current, scrollRef.current].forEach((el) => {
        if (!el) return;
        const style = window.getComputedStyle(el);
        if (parseFloat(style.opacity) < 0.1) {
          el.style.opacity = '1';
          el.style.transform = 'none';
        }
      });
    }, 2000);

    return () => clearTimeout(fallback);
  }, []);

  // Генерация огней Night City
  const stars = Array.from({ length: 80 }).map((_, i) => ({
    id: i,
    top: Math.random() * 100,
    left: Math.random() * 100,
    size: Math.random() * 2 + 1,
    delay: Math.random() * 2,
    color: ['#fcee0a', '#00f0ff', '#ff003c', '#b026ff'][Math.floor(Math.random() * 4)],
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
              background: s.color,
              boxShadow: `0 0 4px ${s.color}`,
              animationDelay: `${s.delay}s`,
            }}
          />
        ))}
      </div>

      <div ref={tagRef} className="hero-tag">
        WELCOME TO NIGHT CITY :: 2077
      </div>

      <div ref={greetingRef} className="hero-greeting">
        С ДНЁМ РОЖДЕНИЯ
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

      <div ref={scrollRef} className="hero-scroll">SCROLL_DOWN</div>
    </section>
  );
}
