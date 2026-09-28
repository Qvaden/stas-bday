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
    const refresh = () => ScrollTrigger.refresh();

    if (document.readyState === 'complete') {
      refresh();
    } else {
      window.addEventListener('load', refresh);
    }

    const timer = setTimeout(refresh, 500);
    const timer2 = setTimeout(refresh, 2000);
    const timer3 = setTimeout(refresh, 4000);

    // === FALLBACK 0: через 1.5 сек показываем ВСЁ что имеет opacity < 1 ===
    const quickFallback = setTimeout(() => {
      const allAnimated = document.querySelectorAll(
        '.reason-card, .wish-card, .timeline-item, .meme, .section-title, .section-header, .section-num, .section-subtitle, .timeline-text, .timeline-year, .timeline-dot, .secret-title, .secret-text, .final-title, .final-subtitle, .final-emoji, .hero-tag, .hero-greeting, .hero-subtitle, .hero-scroll, .hero-title, .hero-age'
      );
      allAnimated.forEach((el) => {
        const style = window.getComputedStyle(el);
        if (parseFloat(style.opacity) < 0.1) {
          el.style.opacity = '1';
          el.style.transform = 'none';
        }
      });
    }, 1500);

    // === FALLBACK 1: показывать через 2 сек всё что осталось невидимым ===
    const fallbackTimer = setTimeout(() => {
      const animatedSelectors = [
        '.reason-card',
        '.wish-card',
        '.timeline-item',
        '.meme',
        '.section-title',
        '.section-header',
        '.timeline-text',
        '.timeline-year',
        '.timeline-dot',
        '.secret-title',
        '.secret-text',
        '.final-title',
        '.final-subtitle',
        '.final-emoji',
        '.hero-tag',
        '.hero-greeting',
        '.hero-subtitle',
        '.hero-scroll',
      ];
      animatedSelectors.forEach((sel) => {
        document.querySelectorAll(sel).forEach((el) => {
          const style = window.getComputedStyle(el);
          const opacity = parseFloat(style.opacity);
          if (opacity < 0.1) {
            el.style.opacity = '1';
            el.style.transform = 'none';
          }
        });
      });
    }, 2000);

    // === FALLBACK 2: IntersectionObserver — мгновенный показ при попадании в viewport ===
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const style = window.getComputedStyle(el);
            const opacity = parseFloat(style.opacity);
            // Если GSAP по какой-то причине не сработал — показываем
            if (opacity < 0.5) {
              el.style.opacity = '1';
              el.style.transform = 'none';
            }
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px -50px 0px' }
    );

    const observeTargets = () => {
      document.querySelectorAll(
        '.reason-card, .wish-card, .timeline-item, .meme, .section-title, .section-header, .timeline-text, .timeline-year, .timeline-dot, .secret-title, .secret-text, .final-title, .final-subtitle, .final-emoji'
      ).forEach((el) => observer.observe(el));
    };

    // Запускаем observer после небольшой задержки (когда GSAP успеет поставить opacity:0)
    setTimeout(observeTargets, 100);

    return () => {
      window.removeEventListener('load', refresh);
      clearTimeout(timer);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(quickFallback);
      clearTimeout(fallbackTimer);
      observer.disconnect();
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
