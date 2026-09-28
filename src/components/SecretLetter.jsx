import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SECRET_LETTER } from '../data/content';

gsap.registerPlugin(ScrollTrigger);

export default function SecretLetter() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        scale: 0,
        opacity: 0,
        duration: 1,
        ease: 'elastic.out(1, 0.5)',
      });

      gsap.from(textRef.current, {
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
        y: 50,
        opacity: 0,
        duration: 1.2,
        delay: 0.3,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef}>
      <div className="secret">
        <h2 ref={titleRef} className="secret-title">
          ENCRYPTED_MESSAGE.LV27
        </h2>
        <div ref={textRef} className="secret-text">
          {SECRET_LETTER.join('\n')}
        </div>
      </div>
    </section>
  );
}
