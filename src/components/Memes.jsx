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
    gsap.from(titleRef.current, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
      },
      scale: 0.5,
      opacity: 0,
      rotation: -10,
      duration: 1,
      ease: 'back.out(1.7)',
    });

    memesRef.current.forEach((m, i) => {
      if (!m) return;
      gsap.from(m, {
        scrollTrigger: {
          trigger: m,
          start: 'top 90%',
        },
        x: i % 2 === 0 ? -100 : 100,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
      });
    });
  }, []);

  return (
    <div ref={sectionRef} className="memes">
      <h2 ref={titleRef} className="section-title">
        МЕМЫ ПРО СТАСА
      </h2>
      <p className="section-subtitle">— mix: классика, gen-z, абсурд —</p>
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
