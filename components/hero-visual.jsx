// Hero Visual — Balanza realista con detalles + iconos de servicio orbitando
// Balanza con base ornamental, cadenas, platillos detallados; tilt suave al mouse

function HeroVisual() {
  const ref = React.useRef(null);
  const [mouse, setMouse] = React.useState({ x: 0, y: 0 });
  const [t, setT] = React.useState(0);

  React.useEffect(() => {
    let raf;
    const loop = () => {
      setT(performance.now() / 1000);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  React.useEffect(() => {
    const onMove = (e) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = (e.clientX - cx) / r.width;
      const dy = (e.clientY - cy) / r.height;
      setMouse({ x: Math.max(-1, Math.min(1, dx * 2)), y: Math.max(-1, Math.min(1, dy * 2)) });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const tilt = mouse.x * 4 + Math.sin(t * 0.6) * 1.5;
  const px = (d) => mouse.x * d;
  const py = (d) => mouse.y * d;

  const services = [
    { icon: "finanzas", label: "Finanzas" },
    { icon: "automatizacion", label: "Automatización" },
    { icon: "digitalizacion", label: "Digitalización" },
    { icon: "ia", label: "IA" },
    { icon: "contratos", label: "Contratos" },
    { icon: "comercial", label: "Comercial" },
  ];

  const W = 620, H = 620;
  const cx = W / 2, cy = H / 2 + 10;
  const radius = 260;

  // Balance geometry
  const pivotY = cy - 90;
  const beamW = 150;
  const panLeftX = cx - beamW;
  const panRightX = cx + beamW;
  const chainTop = pivotY;
  const panY = cy + 10;

  return (
    <div ref={ref} className="hero-visual-wrap" style={{ position: "relative", width: "100%", height: "100%" }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: "visible" }}>
        <defs>
          <radialGradient id="glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#C9A84C" stopOpacity="0.16" />
            <stop offset="60%" stopColor="#C9A84C" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#C9A84C" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="goldBeam" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#B8952E" />
            <stop offset="50%" stopColor="#E5C876" />
            <stop offset="100%" stopColor="#B8952E" />
          </linearGradient>
          <linearGradient id="goldStem" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E5C876" />
            <stop offset="100%" stopColor="#8D6F1E" />
          </linearGradient>
          <linearGradient id="goldPan" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#D4B15A" />
            <stop offset="100%" stopColor="#8D6F1E" />
          </linearGradient>
          <radialGradient id="panFace" cx="50%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#FAFAFA" />
            <stop offset="70%" stopColor="#C9A84C" />
            <stop offset="100%" stopColor="#8D6F1E" />
          </radialGradient>
          <filter id="soft">
            <feGaussianBlur stdDeviation="0.4" />
          </filter>
        </defs>

        {/* Ambient glow */}
        <circle cx={cx} cy={cy} r={radius + 60} fill="url(#glow)" />

        {/* Concentric rings */}
        {[radius + 30, radius - 30, radius - 70].map((r, i) => (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke="#1A1A2E"
            strokeOpacity={0.05 + i * 0.02}
            strokeWidth="1"
            strokeDasharray={i === 0 ? "2 6" : "none"}
            style={{
              transformOrigin: `${cx}px ${cy}px`,
              animation: `spin${i % 2} ${70 + i * 20}s linear infinite`,
            }}
          />
        ))}

        {/* Traveling dots on rings */}
        {[0, 1, 2].map((i) => {
          const ang = t * (0.2 + i * 0.08) + i * 2.3;
          const r = radius + 30 - i * 60;
          const x = cx + Math.cos(ang) * r;
          const y = cy + Math.sin(ang) * r;
          return <circle key={`od${i}`} cx={x} cy={y} r={i === 0 ? 3 : 2} fill="#C9A84C" opacity={0.55} />;
        })}

        {/* Service icon nodes on outer orbit */}
        {services.map((s, i) => {
          const ang = (i / services.length) * Math.PI * 2 - Math.PI / 2 + t * 0.05;
          const floaty = Math.sin(t * 0.7 + i) * 4;
          const nx = cx + Math.cos(ang) * (radius - 10) + px(10);
          const ny = cy + Math.sin(ang) * (radius - 10) + floaty + py(10);
          return (
            <g key={s.icon}>
              <line
                x1={cx} y1={pivotY}
                x2={nx} y2={ny}
                stroke="#C9A84C"
                strokeOpacity={0.09}
                strokeWidth="1"
                strokeDasharray="3 4"
              />
              <g transform={`translate(${nx}, ${ny})`}>
                <circle r="28" fill="#FAFAF8" stroke="#C9A84C" strokeOpacity={0.4} strokeWidth="1" />
                <circle r="28" fill="none" stroke="#C9A84C" strokeOpacity={0.18} strokeWidth="1" style={{
                  animation: `nodePulse ${3 + i * 0.4}s ease-in-out infinite`,
                  transformOrigin: "center",
                }} />
                <g transform="translate(-12, -12)" style={{ color: "#1A1A2E" }}>
                  {ServiceIcons[s.icon]}
                </g>
                <text textAnchor="middle" y="48" fill="#9A9AB0" fontSize="10"
                  fontFamily="Inter, sans-serif" letterSpacing="1">
                  {s.label.toUpperCase()}
                </text>
              </g>
            </g>
          );
        })}

        {/* ==== BASE (ornamental) ==== */}
        {/* Ground shadow */}
        <ellipse cx={cx} cy={cy + 205} rx="110" ry="8" fill="#1A1A2E" opacity="0.12" />
        {/* Pedestal bottom */}
        <rect x={cx - 90} y={cy + 188} width="180" height="14" rx="2" fill="url(#goldStem)" />
        <rect x={cx - 80} y={cy + 178} width="160" height="10" rx="1" fill="#C9A84C" opacity="0.85" />
        {/* Pedestal column */}
        <rect x={cx - 54} y={cy + 165} width="108" height="15" rx="1" fill="url(#goldStem)" />
        <rect x={cx - 46} y={cy + 160} width="92" height="6" rx="1" fill="#E5C876" />
        {/* Ornamental ring around column */}
        <ellipse cx={cx} cy={cy + 160} rx="46" ry="3" fill="#8D6F1E" opacity="0.6" />

        {/* ==== VERTICAL STEM ==== */}
        <rect x={cx - 3.5} y={pivotY - 4} width="7" height={cy + 160 - pivotY} fill="url(#goldStem)" />
        <rect x={cx - 5} y={pivotY - 6} width="10" height="5" rx="1" fill="#E5C876" />
        <rect x={cx - 6} y={cy + 158} width="12" height="6" rx="1" fill="#8D6F1E" />

        {/* ==== BEAM + ARMS (tilt) ==== */}
        <g style={{
          transform: `rotate(${tilt}deg) translate(${px(3)}px, ${py(3)}px)`,
          transformOrigin: `${cx}px ${pivotY}px`,
          transition: "transform .6s cubic-bezier(.22,.61,.36,1)",
        }}>
          {/* Beam */}
          <rect x={cx - beamW} y={pivotY - 3} width={beamW * 2} height="6" rx="1" fill="url(#goldBeam)" />
          {/* Beam ornaments — decorative ends */}
          <circle cx={cx - beamW} cy={pivotY} r="6" fill="#C9A84C" stroke="#8D6F1E" strokeWidth="0.5" />
          <circle cx={cx + beamW} cy={pivotY} r="6" fill="#C9A84C" stroke="#8D6F1E" strokeWidth="0.5" />
          {/* Engraved line on beam */}
          <line x1={cx - beamW + 10} y1={pivotY} x2={cx + beamW - 10} y2={pivotY} stroke="#8D6F1E" strokeOpacity="0.5" strokeWidth="0.6" />

          {/* LEFT chains (3 lines) */}
          {[-6, 0, 6].map((dx, i) => (
            <line key={`lc${i}`}
              x1={panLeftX + dx} y1={pivotY + 3}
              x2={panLeftX + dx * 2.2} y2={panY - 8}
              stroke="#8D6F1E" strokeWidth="0.8" strokeOpacity="0.8" />
          ))}
          {/* RIGHT chains */}
          {[-6, 0, 6].map((dx, i) => (
            <line key={`rc${i}`}
              x1={panRightX + dx} y1={pivotY + 3}
              x2={panRightX + dx * 2.2} y2={panY - 8}
              stroke="#8D6F1E" strokeWidth="0.8" strokeOpacity="0.8" />
          ))}

          {/* LEFT PAN */}
          <g>
            {/* REMOVED PAN FACE SO IT DOESN'T LOOK LIKE EYEBALLS */}
            <ellipse cx={panLeftX} cy={panY} rx="42" ry="10" fill="#E5C876" opacity="0.9" />
            <ellipse cx={panLeftX} cy={panY - 2} rx="38" ry="7" fill="#F2DC9A" opacity="0.4" />
            <ellipse cx={panLeftX} cy={panY + 2} rx="42" ry="10" fill="none" stroke="#8D6F1E" strokeWidth="1" />
            {/* Rim highlight */}
            <path d={`M ${panLeftX - 36} ${panY - 4} Q ${panLeftX} ${panY - 9} ${panLeftX + 36} ${panY - 4}`}
              stroke="#FFF3D1" strokeWidth="0.8" fill="none" opacity="0.7" />
            {/* Pan curve underside */}
            <path d={`M ${panLeftX - 42} ${panY} Q ${panLeftX} ${panY + 16} ${panLeftX + 42} ${panY}`}
              stroke="#8D6F1E" strokeWidth="0.8" fill="none" opacity="0.6" />
          </g>

          {/* RIGHT PAN */}
          <g>
            <ellipse cx={panRightX} cy={panY} rx="42" ry="10" fill="#E5C876" opacity="0.9" />
            <ellipse cx={panRightX} cy={panY - 2} rx="38" ry="7" fill="#F2DC9A" opacity="0.4" />
            <ellipse cx={panRightX} cy={panY + 2} rx="42" ry="10" fill="none" stroke="#8D6F1E" strokeWidth="1" />
            <path d={`M ${panRightX - 36} ${panY - 4} Q ${panRightX} ${panY - 9} ${panRightX + 36} ${panY - 4}`}
              stroke="#FFF3D1" strokeWidth="0.8" fill="none" opacity="0.7" />
            <path d={`M ${panRightX - 42} ${panY} Q ${panRightX} ${panY + 16} ${panRightX + 42} ${panY}`}
              stroke="#8D6F1E" strokeWidth="0.8" fill="none" opacity="0.6" />
          </g>

          {/* Central pivot ornament */}
          <circle cx={cx} cy={pivotY} r="10" fill="#E5C876" stroke="#8D6F1E" strokeWidth="1" />
          <circle cx={cx} cy={pivotY} r="5" fill="#8D6F1E" />
          <circle cx={cx} cy={pivotY} r="2" fill="#FFF3D1" />
          {/* Finial on top */}
          <path d={`M ${cx} ${pivotY - 10} L ${cx - 5} ${pivotY - 20} L ${cx} ${pivotY - 30} L ${cx + 5} ${pivotY - 20} Z`}
            fill="url(#goldStem)" stroke="#8D6F1E" strokeWidth="0.5" />
          <circle cx={cx} cy={pivotY - 32} r="3" fill="#E5C876" stroke="#8D6F1E" strokeWidth="0.5" />
        </g>

        {/* Floating micro particles */}
        {Array.from({ length: 10 }).map((_, i) => {
          const ang = (i / 10) * Math.PI * 2 + t * 0.3;
          const r = radius - 110 + Math.sin(t * 0.5 + i) * 10;
          const x = cx + Math.cos(ang) * r;
          const y = cy + Math.sin(ang) * r - 30;
          return <circle key={`p${i}`} cx={x} cy={y} r="1" fill="#C9A84C" opacity={0.35 + Math.sin(t + i) * 0.3} />;
        })}
      </svg>

      <style>{`
        @keyframes spin0 { to { transform: rotate(360deg); } }
        @keyframes spin1 { to { transform: rotate(-360deg); } }
        @keyframes nodePulse {
          0%, 100% { transform: scale(1); opacity: 0.15; }
          50% { transform: scale(1.22); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

window.HeroVisual = HeroVisual;
