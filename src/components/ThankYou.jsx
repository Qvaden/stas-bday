import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { THANK_YOU } from '../data/content';

gsap.registerPlugin(ScrollTrigger);

export default function ThankYou() {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const titleRef = useRef(null);
  const linesRef = useRef([]);
  const sigRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Карточка появляется целиком
      gsap.from(cardRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        y: 80,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });

      // Заголовок
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
        scale: 0.8,
        opacity: 0,
        duration: 0.8,
        ease: 'back.out(1.4)',
      });

      // Каждая строка появляется последовательно
      linesRef.current.forEach((line, i) => {
        if (!line) return;
        gsap.from(line, {
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
          y: 20,
          opacity: 0,
          duration: 0.5,
          delay: 0.3 + i * 0.06,
          ease: 'power2.out',
        });
      });

      // Подпись
      gsap.from(sigRef.current, {
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
        opacity: 0,
        duration: 0.8,
        delay: 1.5,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="thank-you-section">
      <div ref={cardRef} className="thank-you-card">
        <h2 ref={titleRef} className="thank-you-title">
          {THANK_YOU.title}
        </h2>
        <div className="thank-you-body">
          {THANK_YOU.lines.map((line, i) => (
            <p
              key={i}
              ref={(el) => (linesRef.current[i] = el)}
              className={line === '' ? 'thank-you-spacer' : 'thank-you-line'}
            >
              {line}
            </p>
          ))}
        </div>
        <div ref={sigRef} className="thank-you-sig">
          {THANK_YOU.signature}
        </div>
      </div>
    </section>
  );
}
