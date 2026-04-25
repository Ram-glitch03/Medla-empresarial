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

  const services = [
    { icon: "finanzas", label: "Finanzas" },
    { icon: "automatizacion", label: "Automatización" },
    { icon: "digitalizacion", label: "Digitalización" },
    { icon: "ia", label: "IA" },
    { icon: "contratos", label: "Contratos" },
    { icon: "comercial", label: "Comercial" },
  ];

  const W = 620, H = 620;
  const cx = W / 2, cy = H / 2;
  const radius = 220;

  return (
    <div ref={ref} className="hero-visual-wrap" style={{ position: "relative", width: "100%", height: "100%" }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: "visible" }}>
        <defs>
          <radialGradient id="glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#C9A84C" stopOpacity="0.25" />
            <stop offset="60%" stopColor="#C9A84C" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#C9A84C" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient glow */}
        <circle cx={cx} cy={cy} r={radius + 80} fill="url(#glow)" />

        {/* Abstract Data Net and connections */}
        <g style={{
          transform: `translate(${mouse.x * 12}px, ${mouse.y * 12}px)`,
          transition: "transform 0.4s ease-out"
        }}>
          {services.map((s, i) => {
            const ang = (i / services.length) * Math.PI * 2 + t * 0.1;
            const nx = cx + Math.cos(ang) * radius;
            const ny = cy + Math.sin(ang) * radius;
            return (
              <line key={`l-${i}`} x1={cx} y1={cy} x2={nx} y2={ny} stroke="#C9A84C" strokeOpacity={0.15} strokeWidth="1.5" />
            );
          })}
          
          <circle cx={cx} cy={cy} r="60" fill="none" stroke="#C9A84C" strokeOpacity="0.4" strokeWidth="1" strokeDasharray="4 6" style={{ animation: "spin1 20s linear infinite", transformOrigin: "center" }} />
          <circle cx={cx} cy={cy} r="35" fill="none" stroke="#C9A84C" strokeOpacity="0.7" strokeWidth="2" />
          <circle cx={cx} cy={cy} r="15" fill="#C9A84C" opacity="0.9" />

          {/* Service nodes */}
          {services.map((s, i) => {
            const ang = (i / services.length) * Math.PI * 2 + t * 0.1;
            const nx = cx + Math.cos(ang) * radius;
            const ny = cy + Math.sin(ang) * radius;
            const floaty = Math.sin(t * 1.5 + i) * 6;
            return (
              <g key={s.icon} transform={`translate(${nx}, ${ny + floaty})`}>
                <circle r="30" fill="#FAFAF8" stroke="#C9A84C" strokeOpacity={0.7} strokeWidth="1.5" />
                <circle r="36" fill="none" stroke="#C9A84C" strokeOpacity={0.2} strokeWidth="1" style={{
                  animation: `nodePulse ${2 + i * 0.3}s ease-in-out infinite`,
                  transformOrigin: "center",
                }} />
                <g transform="translate(-12, -12)" style={{ color: "#1A1A2E" }}>
                   {ServiceIcons[s.icon]}
                </g>
                <text textAnchor="middle" y="52" fill="#3A3A4E" fontSize="11" fontWeight="600"
                  fontFamily="Inter, sans-serif" letterSpacing="0.05em">
                  {s.label.toUpperCase()}
                </text>
              </g>
            );
          })}
        </g>
        
        {/* Floating micro particles */}
        {Array.from({ length: 15 }).map((_, i) => {
          const ang = (i / 15) * Math.PI * 2 + t * 0.3;
          const r = radius - 80 + Math.sin(t * 0.8 + i) * 20;
          const px = cx + Math.cos(ang) * r;
          const py = cy + Math.sin(ang) * r - 10;
          return <circle key={`p${i}`} cx={px} cy={py} r="1.5" fill="#C9A84C" opacity={0.4 + Math.sin(t * 2 + i) * 0.4} />;
        })}
      </svg>
      <style>{`
        @keyframes spin1 { to { transform: rotate(360deg); } }
        @keyframes nodePulse {
          0%, 100% { transform: scale(1); opacity: 0.2; }
          50% { transform: scale(1.3); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

window.HeroVisual = HeroVisual;
