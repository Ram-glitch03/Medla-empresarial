// Service tile animations — one per service, with a prominent animated icon

function TileCanvas({ kind }) {
  const ref = React.useRef(null);

  React.useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let raf, t0 = performance.now();
    const gold = "#C9A84C";
    const goldHover = "#B8952E";
    const navy = "#1A1A2E";

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      const W = rect.width, H = rect.height;
      const t = (performance.now() - t0) / 1000;
      ctx.clearRect(0, 0, W, H);

      // icon anchor point — top-right area of tile
      const ax = W - 68;
      const ay = 60;

      if (kind === "legal") {
        // Legal document with stamp
        const cx = W - 60, cy = H / 2;
        ctx.save();
        ctx.translate(cx, cy);
        
        // document body
        ctx.strokeStyle = navy;
        ctx.globalAlpha = 0.4;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.roundRect(-25, -35, 50, 70, 4);
        ctx.stroke();
        
        // text lines
        ctx.strokeStyle = gold;
        ctx.globalAlpha = 0.6;
        ctx.lineWidth = 1.5;
        for(let i=0; i<4; i++) {
          ctx.beginPath();
          ctx.moveTo(-15, -15 + i*10);
          ctx.lineTo(i === 3 ? 0 : 15, -15 + i*10);
          ctx.stroke();
        }
        
        // animated stamp
        const pulse = Math.sin(t * 1.5) * 0.1 + 1;
        ctx.globalAlpha = 0.8;
        ctx.fillStyle = gold;
        ctx.beginPath();
        ctx.arc(10, 15, 8 * pulse, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(10, 15, 12 * pulse, 0, Math.PI * 2);
        ctx.lineWidth = 0.5;
        ctx.stroke();

        ctx.restore();

      } else if (kind === "const") {
        // Building blocks stacking + crane
        const baseX = W - 120, baseY = H - 24;
        // ground line
        ctx.strokeStyle = navy;
        ctx.globalAlpha = 0.2;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(baseX - 20, baseY + 2);
        ctx.lineTo(baseX + 100, baseY + 2);
        ctx.stroke();
        // columns (building)
        for (let i = 0; i < 4; i++) {
          const h = 16 + i * 14 + Math.sin(t * 0.7 + i * 0.4) * 2;
          const x = baseX + i * 22;
          ctx.fillStyle = i === 3 ? gold : navy;
          ctx.globalAlpha = i === 3 ? 0.7 : 0.12 + i * 0.05;
          ctx.fillRect(x, baseY - h, 16, h);
          // top slab
          ctx.fillStyle = gold;
          ctx.globalAlpha = 0.5;
          ctx.fillRect(x - 1, baseY - h - 3, 18, 2);
        }
        // falling block (animated)
        const fall = ((t * 0.6) % 1);
        const fy = baseY - 80 - 40 + fall * 40;
        ctx.globalAlpha = 1 - fall;
        ctx.strokeStyle = gold;
        ctx.lineWidth = 1;
        ctx.strokeRect(baseX + 3 * 22, fy, 16, 6);

      } else if (kind === "invest") {
        // Line chart with moving indicator + up arrow
        ctx.strokeStyle = gold;
        ctx.lineWidth = 1.6;
        ctx.globalAlpha = 0.85;
        const points = [];
        const n = 28;
        const startX = 24, endX = W - 24;
        for (let i = 0; i < n; i++) {
          const x = startX + (i / (n - 1)) * (endX - startX);
          const base = H - 30;
          const wave = Math.sin(i * 0.45 + t * 0.9) * 5;
          const trend = Math.pow(i / n, 1.3) * 55;
          const y = base - trend - wave;
          points.push({ x, y });
        }
        ctx.beginPath();
        points.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
        ctx.stroke();
        // fill area
        ctx.fillStyle = gold;
        ctx.globalAlpha = 0.1;
        ctx.beginPath();
        ctx.moveTo(points[0].x, H);
        points.forEach(p => ctx.lineTo(p.x, p.y));
        ctx.lineTo(points[points.length - 1].x, H);
        ctx.closePath();
        ctx.fill();
        // moving dot + trail
        const idx = Math.floor(((t * 0.35) % 1) * (n - 1));
        const p = points[idx];
        ctx.beginPath();
        ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = gold;
        ctx.globalAlpha = 1;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(p.x, p.y, 9, 0, Math.PI * 2);
        ctx.strokeStyle = gold;
        ctx.globalAlpha = 0.4;
        ctx.lineWidth = 1;
        ctx.stroke();

      } else if (kind === "ai") {
        // Dense neural net
        const cols = 4;
        const rows = 4;
        const xs = [W - 170, W - 120, W - 70, W - 20];
        const ys = [28, 58, 88, 118];
        ctx.lineWidth = 0.7;
        for (let c = 0; c < cols - 1; c++) {
          for (let r1 = 0; r1 < rows; r1++) {
            for (let r2 = 0; r2 < rows; r2++) {
              const a = 0.06 + Math.abs(Math.sin(t * 1.4 + c * 1.3 + r1 * 0.7 + r2 * 0.3)) * 0.35;
              ctx.strokeStyle = gold;
              ctx.globalAlpha = a;
              ctx.beginPath();
              ctx.moveTo(xs[c], ys[r1]);
              ctx.lineTo(xs[c + 1], ys[r2]);
              ctx.stroke();
            }
          }
        }
        for (let c = 0; c < cols; c++) {
          for (let r = 0; r < rows; r++) {
            const pulse = Math.sin(t * 1.8 + c + r * 0.6) * 0.5 + 0.5;
            ctx.beginPath();
            ctx.arc(xs[c], ys[r], 3 + pulse * 1.5, 0, Math.PI * 2);
            ctx.fillStyle = c === cols - 1 ? gold : navy;
            ctx.globalAlpha = 0.3 + pulse * 0.6;
            ctx.fill();
          }
        }

      } else if (kind === "digi") {
        // Pixel cascade + scanning line
        const size = 9;
        const cols = 10, rows = 5;
        const startX = W - size * cols - 16;
        const startY = H - size * rows - 18;
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const phase = (t * 0.7 + c * 0.1 + r * 0.15) % 2;
            const alpha = phase < 1 ? phase : 2 - phase;
            ctx.fillStyle = gold;
            ctx.globalAlpha = alpha * 0.55;
            const pad = (1 - alpha) * 2;
            ctx.fillRect(startX + c * size + pad, startY + r * size + pad,
              size - pad * 2 - 1, size - pad * 2 - 1);
          }
        }
        // scan line
        const scan = (t * 0.4) % 1;
        ctx.strokeStyle = gold;
        ctx.globalAlpha = 0.6;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        const sx = startX + scan * (cols * size);
        ctx.moveTo(sx, startY - 4);
        ctx.lineTo(sx, startY + rows * size + 4);
        ctx.stroke();

      } else if (kind === "social") {
        // Growing bars + engagement bubbles floating up
        const bars = 7;
        const bX = W - 180, bY = H - 22;
        for (let i = 0; i < bars; i++) {
          const h = 12 + i * 7 + Math.sin(t * 1.1 + i * 0.7) * 3;
          ctx.fillStyle = i === bars - 1 ? gold : navy;
          ctx.globalAlpha = i === bars - 1 ? 0.75 : 0.12 + i * 0.04;
          ctx.fillRect(bX + i * 11, bY - h, 7, h);
        }
        // Rising engagement ticks
        for (let i = 0; i < 5; i++) {
          const ph = ((t * 0.35) + i * 0.2) % 1;
          const x = W - 42 - i * 10;
          const y = bY - ph * 80;
          const a = ph < 0.15 ? ph / 0.15 : (1 - ph);
          ctx.strokeStyle = gold;
          ctx.globalAlpha = a * 0.75;
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.arc(x, y, 3.5 + ph * 3, 0, Math.PI * 2);
          ctx.stroke();
        }

      } else if (kind === "auto") {
        // Big gear + smaller gear
        const cx = W - 64, cy = H / 2;
        const drawGear = (x, y, r, teeth, speed, alpha) => {
          ctx.save();
          ctx.translate(x, y);
          ctx.rotate(t * speed);
          ctx.strokeStyle = gold;
          ctx.globalAlpha = alpha;
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          for (let i = 0; i <= teeth * 2; i++) {
            const a = (i / (teeth * 2)) * Math.PI * 2;
            const rr = i % 2 ? r + 4 : r;
            const px = Math.cos(a) * rr;
            const py = Math.sin(a) * rr;
            if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
          }
          ctx.closePath();
          ctx.stroke();
          // inner circle
          ctx.beginPath();
          ctx.arc(0, 0, r * 0.45, 0, Math.PI * 2);
          ctx.globalAlpha = alpha * 0.5;
          ctx.stroke();
          ctx.restore();
        };
        drawGear(cx, cy, 28, 8, 0.4, 0.7);
        drawGear(cx - 42, cy + 26, 16, 6, -0.6, 0.55);
      }

      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [kind]);

  return <canvas ref={ref} className="tile-canvas" />;
}

window.TileCanvas = TileCanvas;
