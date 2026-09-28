import { useEffect, useRef } from 'react';

const COLORS = ['#fcee0a', '#00f0ff', '#ff003c', '#b026ff', '#00ff9f', '#ff6b00'];

export default function Confetti({ active = true }) {
  const canvasRef = useRef(null);
  const particles = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;

    // === Определяем мобилку для оптимизации ===
    const isMobile = window.innerWidth < 768 || /Android|iPhone|iPad/i.test(navigator.userAgent);
    const isLowPerf = isMobile || (navigator.deviceMemory && navigator.deviceMemory < 4);

    // === Адаптивные параметры ===
    const INITIAL_COUNT = isLowPerf ? 50 : 150;
    const SPAWN_BATCH = isLowPerf ? 2 : 5;
    const SPAWN_INTERVAL = isLowPerf ? 400 : 200;
    const MAX_PARTICLES = isLowPerf ? 80 : 250;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Создаём частицы
    const createParticle = () => ({
      x: Math.random() * canvas.width,
      y: -20,
      vx: (Math.random() - 0.5) * 3,
      vy: Math.random() * 3 + 2,
      size: Math.random() * 8 + 4,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 10,
      life: 1,
    });

    // Инициализируем начальный взрыв
    for (let i = 0; i < INITIAL_COUNT; i++) {
      const p = createParticle();
      p.y = Math.random() * canvas.height;
      p.vy = Math.random() * 4 + 1;
      particles.current.push(p);
    }

    // Периодически добавляем новые
    const interval = setInterval(() => {
      if (!active) return;
      // Не превышаем лимит
      if (particles.current.length > MAX_PARTICLES) return;
      for (let i = 0; i < SPAWN_BATCH; i++) {
        particles.current.push(createParticle());
      }
    }, SPAWN_INTERVAL);

    // Frame counter для адаптивного FPS на мобилке
    let lastTime = 0;
    const TARGET_FPS = isLowPerf ? 30 : 60;
    const FRAME_INTERVAL = 1000 / TARGET_FPS;

    const draw = (currentTime) => {
      animationId = requestAnimationFrame(draw);

      // Throttle до TARGET_FPS
      const delta = currentTime - lastTime;
      if (delta < FRAME_INTERVAL) return;
      lastTime = currentTime - (delta % FRAME_INTERVAL);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.current = particles.current.filter((p) => p.y < canvas.height + 30);

      particles.current.forEach((p) => {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        // На мобиле — без теней (экономим GPU)
        if (!isLowPerf) {
          ctx.shadowBlur = 15;
          ctx.shadowColor = p.color;
        }
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.5);
        ctx.restore();

        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;
        p.vy += 0.04; // gravity
      });
    };
    animationId = requestAnimationFrame(draw);

    // === Pause когда вкладка не активна (экономия батареи) ===
    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationId);
      } else {
        animationId = requestAnimationFrame(draw);
      }
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVisibility);
      clearInterval(interval);
      cancelAnimationFrame(animationId);
    };
  }, [active]);

  return <canvas ref={canvasRef} className="confetti-canvas" />;
}
