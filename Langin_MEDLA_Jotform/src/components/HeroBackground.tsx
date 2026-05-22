import { useRef, useEffect } from 'react';

interface Node {
  x: number; y: number;
  vx: number; vy: number;
  r: number;
  baseOpacity: number;
  phase: number;
}

const CONNECT_DIST = 170;
const COUNT = 55;

export default function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const nodesRef = useRef<Node[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;

    const init = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width > 0 ? rect.width : window.innerWidth;
      canvas.height = rect.height > 0 ? rect.height : window.innerHeight;
      nodesRef.current = Array.from({ length: COUNT }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.32,
        vy: (Math.random() - 0.5) * 0.32,
        r: Math.random() * 2.8 + 1.0,
        baseOpacity: Math.random() * 0.65 + 0.3,
        phase: Math.random() * Math.PI * 2,
      }));
    };

    init();
    const ro = new ResizeObserver(init);
    ro.observe(canvas);

    const REPEL_D = 160;
    let t = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.007;
      const { x: mx, y: my } = mouseRef.current;
      const nodes = nodesRef.current;

      for (const n of nodes) {
        n.vx += Math.sin(t * 0.6 + n.phase) * 0.003;
        n.vy += Math.cos(t * 0.45 + n.phase * 1.2) * 0.003;

        const dx = n.x - mx, dy = n.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < REPEL_D && dist > 0) {
          const force = ((REPEL_D - dist) / REPEL_D) * 5.5;
          n.vx += (dx / dist) * force * 0.09;
          n.vy += (dy / dist) * force * 0.09;
        }

        n.vx *= 0.968;
        n.vy *= 0.968;
        n.x += n.vx;
        n.y += n.vy;

        if (n.x < 0) { n.x = 0; n.vx = Math.abs(n.vx); }
        if (n.x > canvas.width) { n.x = canvas.width; n.vx = -Math.abs(n.vx); }
        if (n.y < 0) { n.y = 0; n.vy = Math.abs(n.vy); }
        if (n.y > canvas.height) { n.y = canvas.height; n.vy = -Math.abs(n.vy); }
      }

      // Draw edges
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < CONNECT_DIST) {
            const proximity = 1 - d / CONNECT_DIST;
            const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
            grad.addColorStop(0, `rgba(212,175,55,${proximity * 0.32})`);
            grad.addColorStop(0.5, `rgba(212,175,55,${proximity * 0.18})`);
            grad.addColorStop(1, `rgba(212,175,55,${proximity * 0.32})`);
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = grad;
            ctx.lineWidth = proximity * 1.6;
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      for (const n of nodes) {
        const op = n.baseOpacity * (0.6 + 0.4 * Math.sin(t * 0.55 + n.phase));

        // Outer glow halo
        const grd = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 9);
        grd.addColorStop(0, `rgba(212,175,55,${op * 0.55})`);
        grd.addColorStop(0.35, `rgba(212,175,55,${op * 0.22})`);
        grd.addColorStop(1, 'rgba(212,175,55,0)');
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * 9, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212,175,55,${op})`;
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    document.addEventListener('mousemove', onMove);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      document.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 2 }}
    />
  );
}
