import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Cursor from './components/Cursor';
import Confetti from './components/Confetti';
import Hero from './components/Hero';
import Reasons from './components/Reasons';
import Timeline from './components/Timeline';
import Wishes from './components/Wishes';
import Memes from './components/Memes';
import SecretLetter from './components/SecretLetter';
import Finale from './components/Finale';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  useEffect(() => {
    // Обновить ScrollTrigger после полной загрузки (изображений, шрифтов)
    const refresh = () => ScrollTrigger.refresh();

    if (document.readyState === 'complete') {
      refresh();
    } else {
      window.addEventListener('load', refresh);
    }

    // Дополнительный рефреш через 500мс (на случай поздней загрузки)
    const timer = setTimeout(refresh, 500);
    const timer2 = setTimeout(refresh, 2000);

    // === FALLBACK: гарантия что элементы покажутся даже при сбое ScrollTrigger ===
    // Если через 3 секунды элементы всё ещё невидимы — принудительно показать
    const fallbackTimer = setTimeout(() => {
      const animatedSelectors = [
        '.reason-card',
        '.wish-card',
        '.timeline-item',
        '.meme',
      ];
      animatedSelectors.forEach((sel) => {
        document.querySelectorAll(sel).forEach((el) => {
          const style = window.getComputedStyle(el);
          if (style.opacity === '0' || parseFloat(style.opacity) < 0.1) {
            // Принудительно показать
            el.style.opacity = '1';
            el.style.transform = 'none';
          }
        });
      });

      // Заголовки секций
      document.querySelectorAll('.section-title').forEach((el) => {
        const style = window.getComputedStyle(el);
        if (style.opacity === '0' || parseFloat(style.opacity) < 0.1) {
          el.style.opacity = '1';
          el.style.transform = 'none';
        }
      });
    }, 3000);

    return () => {
      window.removeEventListener('load', refresh);
      clearTimeout(timer);
      clearTimeout(timer2);
      clearTimeout(fallbackTimer);
    };
  }, []);

  return (
    <div>
      <Cursor />
      <Confetti active={true} />
      <Hero />
      <Reasons />
      <Timeline />
      <Wishes />
      <Memes />
      <SecretLetter />
      <Finale />
    </div>
  );
}
