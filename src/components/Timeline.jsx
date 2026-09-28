import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TIMELINE } from '../data/content';

gsap.registerPlugin(ScrollTrigger);

export default function Timeline() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const itemsRef = useRef([]);

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
      });

      itemsRef.current.forEach((item, i) => {
        if (!item) return;
        const isEven = i % 2 === 0;
        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
          x: isEven ? -100 : 100,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef}>
      <h2 ref={titleRef} className="section-title">
        ТАЙМЛАЙН<br />ЖИЗНИ СТАСА
      </h2>
      <p className="section-subtitle">— от 0 до 27, официально и неофициально —</p>
      <div className="timeline">
        {TIMELINE.map((item, i) => (
          <div
            key={i}
            ref={(el) => (itemsRef.current[i] = el)}
            className="timeline-item"
          >
            <div className="timeline-year">{item.year}</div>
            <div className="timeline-dot" />
            <div className="timeline-content">
              <div className="timeline-text">{item.text}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
