import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HERO } from '../data/content';

gsap.registerPlugin(ScrollTrigger);

export default function Finale() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 60%',
      },
    });

    tl.from(titleRef.current, {
      scale: 0,
      rotation: -360,
      opacity: 0,
      duration: 1.5,
      ease: 'back.out(1.4)',
    })
      .from(
        subtitleRef.current,
        {
          y: 50,
          opacity: 0,
          duration: 0.8,
        },
        '-=0.5'
      )
      .from(
        '.final-emoji',
        {
          scale: 0,
          opacity: 0,
          duration: 0.5,
          stagger: 0.1,
        },
        '-=0.3'
      );
  }, []);

  return (
    <section className="final" ref={sectionRef}>
      <h2 ref={titleRef} className="final-title">
        С ДР, {HERO.name}!
      </h2>
      <p ref={subtitleRef} className="final-subtitle">
        ЛУЧШИХ {HERO.age} ЛЕТ В ТВОЕЙ ЖИЗНИ
      </p>
      <div className="final-emoji">🎂</div>
      <div className="final-emoji">🎉</div>
      <div className="final-emoji">🥳</div>
      <p className="final-signature">
        сделано с любовью лучшим другом
      </p>
    </section>
  );
}
