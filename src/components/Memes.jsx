import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MEMES } from '../data/content';

gsap.registerPlugin(ScrollTrigger);

export default function Memes() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const memesRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        scale: 0.5,
        opacity: 0,
        duration: 1,
        ease: 'back.out(1.7)',
      });

      memesRef.current.forEach((m, i) => {
        if (!m) return;
        gsap.from(m, {
          scrollTrigger: {
            trigger: m,
            start: 'top 95%',
            toggleActions: 'play none none none',
          },
          x: i % 2 === 0 ? -100 : 100,
          opacity: 0,
          duration: 0.6,
          ease: 'power3.out',
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="memes">
      <div className="section-header">
        <span className="section-num">MEMES.NET // MIX_PROTOCOL</span>
        <h2 ref={titleRef} className="section-title">
          МЕМЫ ПРО СТАСА
        </h2>
        <p className="section-subtitle">— &gt; FETCHING DATA FROM NIGHT_CITY —</p>
      </div>
      <div className="memes-list">
        {MEMES.map((meme, i) => (
          <div
            key={i}
            ref={(el) => (memesRef.current[i] = el)}
            className="meme"
          >
            <span className="meme-tag" data-tag={meme.tag}>{meme.tag}</span>
            <p className="meme-text">{meme.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
