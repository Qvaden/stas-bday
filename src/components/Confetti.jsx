import { useEffect, useRef } from 'react';

const COLORS = ['#ff2bd6', '#00f0ff', '#ffe600', '#39ff14', '#b026ff', '#ff6b00'];

export default function Confetti({ active = true }) {
  const canvasRef = useRef(null);
  const particles = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;

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
    for (let i = 0; i < 150; i++) {
      const p = createParticle();
      p.y = Math.random() * canvas.height;
      p.vy = Math.random() * 4 + 1;
      particles.current.push(p);
    }

    // Периодически добавляем новые
    const interval = setInterval(() => {
      if (!active) return;
      for (let i = 0; i < 5; i++) {
        particles.current.push(createParticle());
      }
    }, 200);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.current = particles.current.filter((p) => p.y < canvas.height + 30);

      particles.current.forEach((p) => {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 15;
        ctx.shadowColor = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.5);
        ctx.restore();

        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;
        p.vy += 0.04; // gravity
      });

      animationId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      clearInterval(interval);
      cancelAnimationFrame(animationId);
    };
  }, [active]);

  return <canvas ref={canvasRef} className="confetti-canvas" />;
}
