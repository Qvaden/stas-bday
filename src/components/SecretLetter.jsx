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
    gsap.from(titleRef.current, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
      },
      scale: 0,
      opacity: 0,
      duration: 1,
      ease: 'elastic.out(1, 0.5)',
    });

    gsap.from(textRef.current, {
      scrollTrigger: {
        trigger: textRef.current,
        start: 'top 85%',
      },
      y: 50,
      opacity: 0,
      duration: 1.2,
      delay: 0.3,
    });
  }, []);

  return (
    <section ref={sectionRef}>
      <div className="secret">
        <h2 ref={titleRef} className="secret-title">
          СЕКРЕТНОЕ ПОСЛАНИЕ
        </h2>
        <div ref={textRef} className="secret-text">
          {SECRET_LETTER.join('\n')}
        </div>
      </div>
    </section>
  );
}
