// Hero visual — Rotating globe with proper continent shapes + city connections + orbiting service icons

function HeroVisual() {
  const [tilt, setTilt] = React.useState({ x: 0, y: 0 });
  const [rotation, setRotation] = React.useState(0);

  React.useEffect(() => {
    let raf;
    let last = performance.now();
    const tick = (now) => {
      const dt = (now - last) / 1000;
      last = now;
      setRotation((r) => (r + dt * 10) % 360); // ~36s per revolution
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  React.useEffect(() => {
    const onMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setTilt({ x: x * 4, y: y * 4 });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // Service icons orbiting around the globe
  const orbitalServices = [
    { ic: "legal", angle: 0, lbl: "Legal" },
    { ic: "automatizacion", angle: 60, lbl: "Auto." },
    { ic: "digitalizacion", angle: 120, lbl: "Digital" },
    { ic: "ia", angle: 180, lbl: "IA" },
    { ic: "constitucion", angle: 240, lbl: "Const." },
    { ic: "comercial", angle: 300, lbl: "Comercial" },
  ];

  const cities = [
    { name: "CDMX", lat: 19, lon: -99 },
    { name: "Madrid", lat: 40, lon: -3 },
    { name: "NYC", lat: 41, lon: -74 },
    { name: "Bogotá", lat: 5, lon: -74 },
    { name: "Buenos Aires", lat: -34, lon: -58 },
    { name: "Lima", lat: -12, lon: -77 },
    { name: "São Paulo", lat: -23, lon: -46 },
    { name: "Santiago", lat: -33, lon: -70 },
    { name: "Miami", lat: 25, lon: -80 },
    { name: "London", lat: 51, lon: 0 },
    { name: "Tokyo", lat: 35, lon: 139 },
    { name: "Dubai", lat: 25, lon: 55 },
    { name: "Singapore", lat: 1, lon: 103 },
    { name: "Sydney", lat: -33, lon: 151 },
    { name: "Berlin", lat: 52, lon: 13 },
    { name: "Paris", lat: 48, lon: 2 },
  ];

  const connections = [
    [0, 1], [0, 2], [0, 8],
    [1, 9], [1, 14], [1, 15],
    [2, 8], [2, 9],
    [3, 4], [3, 6],
    [4, 7], [4, 6],
    [5, 3],
    [9, 10], [9, 11],
    [10, 12], [12, 13],
    [11, 12],
    [14, 15], [14, 9],
    [0, 6],
  ];

  const R = 120; // globe radius (smaller — gives icons more room)
  const orbitR = 215; // orbit radius for service icons

  // Orthographic projection of (lat, lon) onto current rotation
  const project = (lat, lon) => {
    const rotLon = lon + rotation;
    const phi = (lat * Math.PI) / 180;
    const theta = (rotLon * Math.PI) / 180;
    const x = R * Math.cos(phi) * Math.sin(theta);
    const y = -R * Math.sin(phi);
    const z = R * Math.cos(phi) * Math.cos(theta);
    return { x, y, z, visible: z > -2 };
  };

  // Continent paths in lat/lon space — simplified outlines.
  // We project each polygon's vertices and draw the visible portion.
  const continents = {
    northAmerica: [
      [70, -160], [70, -140], [60, -130], [55, -125], [49, -123], [40, -124],
      [33, -118], [28, -110], [25, -100], [22, -97], [18, -95], [15, -92],
      [13, -88], [9, -83], [12, -82], [16, -88], [22, -82], [25, -80],
      [29, -82], [31, -81], [35, -75], [40, -73], [44, -67], [47, -62],
      [50, -58], [54, -57], [60, -65], [62, -78], [70, -85], [73, -100],
      [73, -120], [72, -145], [70, -160],
    ],
    centralAmerica: [
      [9, -83], [13, -88], [16, -94], [18, -95], [15, -88], [12, -85], [9, -83],
    ],
    southAmerica: [
      [12, -72], [11, -68], [8, -60], [5, -52], [0, -50], [-5, -36], [-13, -38],
      [-23, -40], [-33, -52], [-40, -62], [-50, -68], [-55, -68], [-52, -72],
      [-45, -73], [-35, -72], [-25, -70], [-18, -71], [-10, -76], [-2, -80],
      [2, -78], [7, -78], [10, -75], [12, -72],
    ],
    europe: [
      [70, 25], [68, 12], [62, 5], [58, -5], [52, -8], [48, -5], [44, -9],
      [40, -9], [37, -6], [36, -2], [37, 4], [38, 12], [42, 14], [45, 18],
      [42, 22], [42, 28], [45, 35], [50, 38], [55, 36], [60, 30], [65, 30],
      [70, 30], [70, 25],
    ],
    africa: [
      [37, -6], [33, 10], [32, 22], [32, 32], [27, 35], [16, 40], [12, 43],
      [10, 48], [2, 47], [-5, 39], [-15, 40], [-26, 33], [-34, 25], [-35, 19],
      [-31, 17], [-22, 14], [-15, 12], [-8, 8], [-2, 8], [4, 5], [4, -1],
      [4, -8], [10, -16], [16, -18], [21, -17], [25, -15], [33, -8], [37, -6],
    ],
    asia: [
      [70, 30], [72, 60], [70, 90], [68, 110], [70, 140], [65, 160], [60, 170],
      [55, 158], [50, 155], [42, 145], [38, 140], [33, 132], [30, 122],
      [22, 115], [15, 110], [10, 105], [8, 100], [12, 98], [16, 95], [18, 92],
      [22, 90], [22, 80], [10, 78], [8, 75], [22, 70], [25, 60], [25, 50],
      [37, 50], [45, 40], [55, 38], [60, 30], [70, 30],
    ],
    oceania: [
      [-12, 130], [-10, 140], [-15, 145], [-22, 152], [-30, 153], [-37, 148],
      [-38, 142], [-34, 137], [-30, 130], [-26, 122], [-20, 118], [-15, 122],
      [-12, 130],
    ],
    greenland: [
      [83, -30], [80, -20], [76, -20], [70, -25], [65, -38], [70, -52], [78, -58],
      [82, -45], [83, -30],
    ],
  };

  // Build a path for a continent — clip to visible hemisphere
  const continentPath = (poly) => {
    let path = "";
    let started = false;
    poly.forEach(([lat, lon]) => {
      const p = project(lat, lon);
      if (p.visible) {
        if (!started) { path += `M ${p.x.toFixed(1)} ${p.y.toFixed(1)} `; started = true; }
        else path += `L ${p.x.toFixed(1)} ${p.y.toFixed(1)} `;
      } else {
        // When point is invisible, project onto sphere edge to avoid weird closes
        if (started) {
          // project onto sphere boundary
          const norm = Math.sqrt(p.x * p.x + p.y * p.y) || 1;
          const ex = (p.x / norm) * R;
          const ey = (p.y / norm) * R;
          path += `L ${ex.toFixed(1)} ${ey.toFixed(1)} `;
          started = false;
        }
      }
    });
    if (started) path += "Z";
    return path;
  };

  // Sample points on great circle between two lat/lon
  const arcPoints = (a, b, steps = 28) => {
    const pts = [];
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const lat = a.lat + (b.lat - a.lat) * t;
      let dlon = b.lon - a.lon;
      if (dlon > 180) dlon -= 360;
      if (dlon < -180) dlon += 360;
      const lon = a.lon + dlon * t;
      const p = project(lat, lon);
      const lift = Math.sin(t * Math.PI) * 32;
      pts.push({
        x: p.x * (1 + lift / R / 2),
        y: p.y * (1 + lift / R / 2),
        z: p.z * (1 + lift / R / 2),
        visible: p.z > -20,
      });
    }
    return pts;
  };

  return (
    <div className="hero-visual" style={{ "--tx": `${tilt.x}px`, "--ty": `${tilt.y}px` }}>
      <svg viewBox="-280 -280 560 560" className="hero-visual-svg" preserveAspectRatio="xMidYMid meet">
        <defs>
          <radialGradient id="globeBg" cx="32%" cy="32%" r="78%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="55%" stopColor="#F5EFE2" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#D9CFB7" stopOpacity="0.85" />
          </radialGradient>
          <radialGradient id="globeOcean" cx="35%" cy="35%" r="80%">
            <stop offset="0%" stopColor="#FBF7EE" />
            <stop offset="100%" stopColor="#E8DFC8" />
          </radialGradient>
          <radialGradient id="globeGlow" cx="50%" cy="50%" r="55%">
            <stop offset="60%" stopColor="#C9A84C" stopOpacity="0" />
            <stop offset="92%" stopColor="#C9A84C" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#C9A84C" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="arcGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#C9A84C" stopOpacity="0" />
            <stop offset="50%" stopColor="#C9A84C" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#C9A84C" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="continentGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1A1A2E" stopOpacity="0.92" />
            <stop offset="100%" stopColor="#2A2A45" stopOpacity="0.78" />
          </linearGradient>
          <filter id="cityGlow"><feGaussianBlur stdDeviation="2.5" /></filter>
          <clipPath id="globeClip"><circle cx="0" cy="0" r={R} /></clipPath>
        </defs>

        {/* Outer glow */}
        <circle cx="0" cy="0" r={R + 50} fill="url(#globeGlow)" />

        {/* Outer dashed orbit ring — sized so service icons sit comfortably outside it */}
        <circle cx="0" cy="0" r={orbitR + 40} fill="none" stroke="#C9A84C" strokeWidth="0.5" strokeDasharray="2 6" opacity="0.3" />
        <circle cx="0" cy="0" r={orbitR + 70} fill="none" stroke="#C9A84C" strokeWidth="0.4" strokeDasharray="1 8" opacity="0.18" />

        {/* Globe ocean base */}
        <circle cx="0" cy="0" r={R} fill="url(#globeOcean)" />

        {/* Latitude rings */}
        <g clipPath="url(#globeClip)">
          {[-60, -30, 0, 30, 60].map((lat) => {
            const phi = (lat * Math.PI) / 180;
            const cy = -R * Math.sin(phi);
            const rx = R * Math.cos(phi);
            return (
              <ellipse key={`lat${lat}`} cx="0" cy={cy} rx={rx} ry={rx * 0.18 + 1}
                fill="none" stroke="#C9A84C" strokeWidth={lat === 0 ? "0.7" : "0.4"}
                opacity={lat === 0 ? 0.45 : 0.22} />
            );
          })}

          {/* Longitude meridians (only visible hemisphere) */}
          {[-150, -120, -90, -60, -30, 0, 30, 60, 90, 120, 150].map((lon) => {
            const pts = [];
            for (let lat = -90; lat <= 90; lat += 5) {
              const p = project(lat, lon);
              if (p.visible) pts.push(`${p.x.toFixed(1)},${p.y.toFixed(1)}`);
            }
            if (pts.length < 3) return null;
            return <polyline key={`lon${lon}`} points={pts.join(" ")} fill="none" stroke="#C9A84C" strokeWidth="0.35" opacity="0.18" />;
          })}

          {/* Continent silhouettes — solid filled shapes */}
          {Object.entries(continents).map(([name, poly]) => (
            <path key={name} d={continentPath(poly)} fill="url(#continentGrad)" stroke="#0F0F1F" strokeWidth="0.5" />
          ))}
        </g>

        {/* Sphere outline */}
        <circle cx="0" cy="0" r={R} fill="none" stroke="#C9A84C" strokeWidth="0.8" opacity="0.7" />

        {/* Specular highlight — sits above continents but below cities */}
        <ellipse cx={-R * 0.32} cy={-R * 0.4} rx={R * 0.32} ry={R * 0.16}
          fill="#FFFFFF" opacity="0.35" clipPath="url(#globeClip)" />

        {/* Connection arcs between cities */}
        {connections.map(([i, j], idx) => {
          const a = cities[i], b = cities[j];
          const aP = project(a.lat, a.lon);
          const bP = project(b.lat, b.lon);
          if (!aP.visible && !bP.visible) return null;
          const pts = arcPoints(a, b, 28);
          let d = "";
          let started = false;
          pts.forEach((p) => {
            if (p.visible) {
              if (!started) { d += `M ${p.x.toFixed(1)} ${p.y.toFixed(1)} `; started = true; }
              else d += `L ${p.x.toFixed(1)} ${p.y.toFixed(1)} `;
            } else { started = false; }
          });
          const phase = (idx * 1.3) % 6;
          return (
            <g key={`arc${idx}`}>
              <path d={d} fill="none" stroke="#C9A84C" strokeWidth="0.7" opacity="0.32" />
              <path d={d} fill="none" stroke="url(#arcGrad)" strokeWidth="1.6" strokeLinecap="round"
                strokeDasharray="40 200">
                <animate attributeName="stroke-dashoffset" from="240" to="0" dur="6s" begin={`${-phase}s`} repeatCount="indefinite" />
              </path>
            </g>
          );
        })}

        {/* City markers */}
        {cities.map((c, i) => {
          const p = project(c.lat, c.lon);
          if (!p.visible) return null;
          const scale = 0.5 + (p.z / R) * 0.5;
          return (
            <g key={`city${i}`}>
              <circle cx={p.x} cy={p.y} r={4 * scale} fill="#C9A84C" opacity="0.3" filter="url(#cityGlow)" />
              <circle cx={p.x} cy={p.y} r={2.2 * scale} fill="#C9A84C">
                <animate attributeName="r" values={`${1.6 * scale};${3.2 * scale};${1.6 * scale}`} dur="2.4s" begin={`${i * 0.18}s`} repeatCount="indefinite" />
              </circle>
              <circle cx={p.x} cy={p.y} r={1 * scale} fill="#FFFFFF" />
            </g>
          );
        })}

        {/* Orbiting service icons — well outside the globe, no clipping */}
        {orbitalServices.map((s, i) => {
          const orbAngle = (s.angle - rotation * 0.4) * Math.PI / 180;
          const ox = Math.cos(orbAngle) * orbitR;
          const oy = Math.sin(orbAngle) * orbitR * 0.82; // squashed for perspective
          const depth = Math.sin(orbAngle); // -1 (back) to 1 (front)
          const opacity = 0.45 + (depth + 1) * 0.275;
          const scale = 0.85 + (depth + 1) * 0.10;
          const r = 22 * scale;
          return (
            <g key={s.lbl} transform={`translate(${ox.toFixed(1)} ${oy.toFixed(1)})`} style={{ opacity }}>
              {/* outer halo ring */}
              <circle cx="0" cy="0" r={r + 6} fill="none" stroke="#C9A84C" strokeWidth="0.4" opacity="0.35" />
              {/* the white badge */}
              <circle cx="0" cy="0" r={r} fill="#FFFFFF" stroke="#C9A84C" strokeWidth="0.9" />
              <circle cx="0" cy="0" r={r - 3} fill="none" stroke="#C9A84C" strokeWidth="0.3" opacity="0.45" />
              {/* icon */}
              <g transform={`translate(-12, -12) scale(${scale})`} style={{ color: "#1A1A2E" }}>
                {window.ServiceIcons && window.ServiceIcons[s.ic]}
              </g>
              {/* label */}
              <g transform={`translate(0, ${r + 16})`}>
                <rect x={-(s.lbl.length * 3.4 + 8)} y="-7" width={s.lbl.length * 6.8 + 16} height="14" rx="7"
                  fill="#FFFFFF" stroke="#E2D9C6" strokeWidth="0.5" />
                <text textAnchor="middle" y="3" fontSize="8.5" fill="#1A1A2E" opacity="0.9"
                  fontFamily="Inter, sans-serif" letterSpacing="0.14em" fontWeight="500"
                  style={{ textTransform: "uppercase" }}>
                  {s.lbl}
                </text>
              </g>
            </g>
          );
        })}

        {/* Hub badge on top */}
        <g transform={`translate(0 ${-orbitR - 110})`}>
          <rect x="-62" y="-13" width="124" height="26" rx="13" fill="#1A1A2E" />
          <circle cx="-46" cy="0" r="3" fill="#C9A84C">
            <animate attributeName="opacity" values="1;0.3;1" dur="1.6s" repeatCount="indefinite" />
          </circle>
          <text x="8" y="3.5" textAnchor="middle" fontSize="9" fill="#FFFFFF"
            fontFamily="Inter, sans-serif" letterSpacing="0.18em" fontWeight="500"
            style={{ textTransform: "uppercase" }}>
            En vivo · global
          </text>
        </g>
      </svg>
    </div>
  );
}

window.HeroVisual = HeroVisual;
