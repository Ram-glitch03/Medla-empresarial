// CTA Canvas — interactive, tech-forward: particle grid + orbit rings + circuit lines reacting to mouse

function CTACanvas() {
  const ref = React.useRef(null);
  const mouse = React.useRef({ x: 0.5, y: 0.5, active: false });

  React.useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    let W, H;
    const resize = () => {
      const r = canvas.getBoundingClientRect();
      W = r.width; H = r.height;
      canvas.width = W * dpr; canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const onMove = (e) => {
      const r = canvas.getBoundingClientRect();
      mouse.current.x = (e.clientX - r.left) / r.width;
      mouse.current.y = (e.clientY - r.top) / r.height;
      mouse.current.active = true;
    };
    const onLeave = () => { mouse.current.active = false; };
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);

    // Orbiting circuit nodes
    const circuits = Array.from({ length: 5 }, (_, i) => ({
      r: 80 + i * 50,
      speed: 0.08 + i * 0.03 * (i % 2 ? -1 : 1),
      offset: i * 1.3,
    }));

    const cols = 30, rows = 16;

    let raf, t0 = performance.now();
    const draw = () => {
      const t = (performance.now() - t0) / 1000;
      ctx.clearRect(0, 0, W, H);

      const mx = mouse.current.x * W;
      const my = mouse.current.y * H;
      const cx = W / 2;
      const cy = H / 2;

      // Subtle concentric rings
      ctx.strokeStyle = "#C9A84C";
      for (let i = 0; i < 3; i++) {
        ctx.globalAlpha = 0.08 - i * 0.02;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(cx, cy, 110 + i * 70, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Dot grid reacting to cursor
      const gapX = W / (cols + 1);
      const gapY = H / (rows + 1);
      for (let c = 1; c <= cols; c++) {
        for (let r = 1; r <= rows; r++) {
          const x = c * gapX;
          const y = r * gapY;
          const dx = x - mx, dy = y - my;
          const d = Math.sqrt(dx * dx + dy * dy);
          const influence = mouse.current.active ? Math.max(0, 1 - d / 240) : 0;
          const wave = Math.sin(t * 0.6 + c * 0.22 + r * 0.3) * 0.4 + 0.6;
          const size = 0.8 + influence * 3.5 + wave * 0.3;
          const offX = influence * (dx / (d + 0.01)) * -22;
          const offY = influence * (dy / (d + 0.01)) * -22;
          const alpha = 0.12 + influence * 0.7 + wave * 0.08;
          ctx.beginPath();
          ctx.arc(x + offX, y + offY, size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(184, 149, 46, ${alpha})`;
          ctx.fill();
        }
      }

      // Circuit traveling nodes + trails
      circuits.forEach((c, i) => {
        const ang = t * c.speed + c.offset;
        const x = cx + Math.cos(ang) * c.r;
        const y = cy + Math.sin(ang) * c.r * 0.55;
        // trail
        for (let k = 0; k < 8; k++) {
          const tAng = ang - k * 0.04;
          const tx = cx + Math.cos(tAng) * c.r;
          const ty = cy + Math.sin(tAng) * c.r * 0.55;
          ctx.beginPath();
          ctx.arc(tx, ty, 1.5 - k * 0.15, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(184, 149, 46, ${0.4 - k * 0.05})`;
          ctx.fill();
        }
        // main node
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fillStyle = "#B8952E";
        ctx.globalAlpha = 1;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(x, y, 7, 0, Math.PI * 2);
        ctx.strokeStyle = "#C9A84C";
        ctx.globalAlpha = 0.4;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Central node pulse
      const pulse = Math.sin(t * 1.5) * 0.5 + 0.5;
      ctx.beginPath();
      ctx.arc(cx, cy, 6 + pulse * 3, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(201, 168, 76, ${0.8 - pulse * 0.3})`;
      ctx.globalAlpha = 1;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(cx, cy, 14 + pulse * 8, 0, Math.PI * 2);
      ctx.strokeStyle = "#C9A84C";
      ctx.globalAlpha = 0.3 - pulse * 0.2;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Horizontal scanning line
      const scan = ((t * 0.15) % 1);
      const gradient = ctx.createLinearGradient(0, scan * H, W, scan * H);
      gradient.addColorStop(0, "rgba(201,168,76,0)");
      gradient.addColorStop(0.5, "rgba(201,168,76,0.3)");
      gradient.addColorStop(1, "rgba(201,168,76,0)");
      ctx.strokeStyle = gradient;
      ctx.globalAlpha = 1;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, scan * H);
      ctx.lineTo(W, scan * H);
      ctx.stroke();

      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(raf); ro.disconnect();
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return <canvas ref={ref} className="cta-canvas" />;
}

// Particle field for logos (unchanged behavior, kept)
function ParticleField() {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    let W, H;
    const resize = () => {
      const r = canvas.getBoundingClientRect();
      W = r.width; H = r.height;
      canvas.width = W * dpr; canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const N = 40;
    const particles = Array.from({ length: N }, () => ({
      x: Math.random(), y: Math.random(),
      r: 0.6 + Math.random() * 1.2,
      vx: (Math.random() - 0.5) * 0.0003,
      vy: (Math.random() - 0.5) * 0.0002,
      a: 0.2 + Math.random() * 0.3,
      phase: Math.random() * Math.PI * 2,
    }));

    let raf, t0 = performance.now();
    const draw = () => {
      const t = (performance.now() - t0) / 1000;
      ctx.clearRect(0, 0, W, H);
      for (const p of particles) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > 1) p.vx *= -1;
        if (p.y < 0 || p.y > 1) p.vy *= -1;
        const alpha = p.a * (0.5 + Math.sin(t * 0.7 + p.phase) * 0.5);
        ctx.beginPath();
        ctx.arc(p.x * W, p.y * H, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201,168,76,${alpha})`;
        ctx.fill();
      }
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const dx = (particles[i].x - particles[j].x) * W;
          const dy = (particles[i].y - particles[j].y) * H;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 80) {
            ctx.strokeStyle = `rgba(201,168,76,${(1 - d / 80) * 0.08})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x * W, particles[i].y * H);
            ctx.lineTo(particles[j].x * W, particles[j].y * H);
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);
  return <canvas ref={ref} className="particles" />;
}

window.ParticleField = ParticleField;
window.CTACanvas = CTACanvas;
