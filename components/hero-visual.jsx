// Hero visual — Direct DOM animation for native 60fps (no React state per frame)

const HV_R = 120;
const HV_ORBIT = 215;

const HV_ORBITAL = [
  { angle: 0,   lbl: "Legal" },
  { angle: 60,  lbl: "Auto." },
  { angle: 120, lbl: "Digital" },
  { angle: 180, lbl: "IA" },
  { angle: 240, lbl: "Const." },
  { angle: 300, lbl: "Comercial" },
];

const HV_CITIES = [
  { lat: 19,  lon: -99  }, // CDMX
  { lat: 40,  lon: -3   }, // Madrid
  { lat: 41,  lon: -74  }, // NYC
  { lat: 5,   lon: -74  }, // Bogotá
  { lat: -34, lon: -58  }, // Buenos Aires
  { lat: -12, lon: -77  }, // Lima
  { lat: -23, lon: -46  }, // São Paulo
  { lat: -33, lon: -70  }, // Santiago
  { lat: 25,  lon: -80  }, // Miami
  { lat: 51,  lon: 0    }, // London
  { lat: 35,  lon: 139  }, // Tokyo
  { lat: 25,  lon: 55   }, // Dubai
  { lat: 1,   lon: 103  }, // Singapore
  { lat: -33, lon: 151  }, // Sydney
  { lat: 52,  lon: 13   }, // Berlin
  { lat: 48,  lon: 2    }, // Paris
];

const HV_CONNECTIONS = [
  [0,1],[0,2],[0,8],[1,9],[1,14],[1,15],[2,8],[2,9],[3,4],[3,6],
  [4,7],[4,6],[5,3],[9,10],[9,11],[10,12],[12,13],[11,12],[14,15],[14,9],[0,6],
];

const HV_CONTINENTS = {
  northAmerica: [
    [70,-160],[70,-140],[60,-130],[55,-125],[49,-123],[40,-124],[33,-118],[28,-110],
    [25,-100],[22,-97],[18,-95],[15,-92],[13,-88],[9,-83],[12,-82],[16,-88],[22,-82],
    [25,-80],[29,-82],[31,-81],[35,-75],[40,-73],[44,-67],[47,-62],[50,-58],[54,-57],
    [60,-65],[62,-78],[70,-85],[73,-100],[73,-120],[72,-145],[70,-160],
  ],
  centralAmerica: [[9,-83],[13,-88],[16,-94],[18,-95],[15,-88],[12,-85],[9,-83]],
  southAmerica: [
    [12,-72],[11,-68],[8,-60],[5,-52],[0,-50],[-5,-36],[-13,-38],[-23,-40],[-33,-52],
    [-40,-62],[-50,-68],[-55,-68],[-52,-72],[-45,-73],[-35,-72],[-25,-70],[-18,-71],
    [-10,-76],[-2,-80],[2,-78],[7,-78],[10,-75],[12,-72],
  ],
  europe: [
    [70,25],[68,12],[62,5],[58,-5],[52,-8],[48,-5],[44,-9],[40,-9],[37,-6],[36,-2],
    [37,4],[38,12],[42,14],[45,18],[42,22],[42,28],[45,35],[50,38],[55,36],[60,30],
    [65,30],[70,30],[70,25],
  ],
  africa: [
    [37,-6],[33,10],[32,22],[32,32],[27,35],[16,40],[12,43],[10,48],[2,47],[-5,39],
    [-15,40],[-26,33],[-34,25],[-35,19],[-31,17],[-22,14],[-15,12],[-8,8],[-2,8],
    [4,5],[4,-1],[4,-8],[10,-16],[16,-18],[21,-17],[25,-15],[33,-8],[37,-6],
  ],
  asia: [
    [70,30],[72,60],[70,90],[68,110],[70,140],[65,160],[60,170],[55,158],[50,155],
    [42,145],[38,140],[33,132],[30,122],[22,115],[15,110],[10,105],[8,100],[12,98],
    [16,95],[18,92],[22,90],[22,80],[10,78],[8,75],[22,70],[25,60],[25,50],[37,50],
    [45,40],[55,38],[60,30],[70,30],
  ],
  oceania: [
    [-12,130],[-10,140],[-15,145],[-22,152],[-30,153],[-37,148],[-38,142],[-34,137],
    [-30,130],[-26,122],[-20,118],[-15,122],[-12,130],
  ],
  greenland: [
    [83,-30],[80,-20],[76,-20],[70,-25],[65,-38],[70,-52],[78,-58],[82,-45],[83,-30],
  ],
};

function HeroVisual() {
  const globeRef = React.useRef(null); // inside clipPath (grid + continents)
  const outerRef = React.useRef(null); // outside clipPath (arcs + cities + orbits)
  const [tilt, setTilt] = React.useState({ x: 0, y: 0 });

  // Mouse tilt (React state OK here — updates slowly)
  React.useEffect(() => {
    const onMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setTilt({ x: x * 4, y: y * 4 });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // Animation loop — direct DOM, zero React re-renders per frame
  React.useEffect(() => {
    let rot = 0;
    let last = performance.now();

    const proj = (lat, lon) => {
      const phi = lat * Math.PI / 180;
      const theta = (lon + rot) * Math.PI / 180;
      const x = HV_R * Math.cos(phi) * Math.sin(theta);
      const y = -HV_R * Math.sin(phi);
      const z = HV_R * Math.cos(phi) * Math.cos(theta);
      return { x, y, z, v: z > -2 };
    };

    // All points included — SVG clipPath handles the globe boundary cleanly
    const polyPath = (poly) => {
      let d = '';
      poly.forEach(([la, lo], i) => {
        const p = proj(la, lo);
        d += `${i ? 'L' : 'M'}${p.x.toFixed(1)} ${p.y.toFixed(1)} `;
      });
      return d + 'Z';
    };

    const arcPath = (a, b) => {
      let d = '', on = false;
      for (let i = 0; i <= 28; i++) {
        const t = i / 28;
        const lat = a.lat + (b.lat - a.lat) * t;
        let dlon = b.lon - a.lon;
        if (dlon > 180) dlon -= 360;
        if (dlon < -180) dlon += 360;
        const p = proj(lat, a.lon + dlon * t);
        const lift = Math.sin(t * Math.PI) * 32;
        const px = (p.x * (1 + lift / HV_R / 2)).toFixed(1);
        const py = (p.y * (1 + lift / HV_R / 2)).toFixed(1);
        if (p.z > -20) {
          d += on ? ` L${px} ${py}` : `M${px} ${py}`;
          on = true;
        } else { on = false; }
      }
      return d;
    };

    const tick = (now) => {
      const dt = Math.min((now - last) / 1000, 0.05); // cap dt to avoid jumps
      last = now;
      rot = (rot + dt * 10) % 360;

      const gEl = globeRef.current;
      const oEl = outerRef.current;
      if (!gEl || !oEl) { raf = requestAnimationFrame(tick); return; }

      // ── Globe interior (inside clipPath) ─────────────────
      let g = '';

      // Latitude rings
      for (const lat of [-60, -30, 0, 30, 60]) {
        const phi = lat * Math.PI / 180;
        const cy  = (-HV_R * Math.sin(phi)).toFixed(1);
        const rx  = (HV_R * Math.cos(phi)).toFixed(1);
        const ry  = (HV_R * Math.cos(phi) * 0.18 + 1).toFixed(1);
        const sw  = lat === 0 ? '0.7' : '0.4';
        const op  = lat === 0 ? '0.45' : '0.22';
        g += `<ellipse cx="0" cy="${cy}" rx="${rx}" ry="${ry}" fill="none" stroke="#C9A84C" stroke-width="${sw}" opacity="${op}"/>`;
      }

      // Longitude meridians
      for (const lon of [-150,-120,-90,-60,-30,0,30,60,90,120,150]) {
        let pts = [];
        for (let la = -90; la <= 90; la += 5) {
          const p = proj(la, lon);
          if (p.v) pts.push(`${p.x.toFixed(1)},${p.y.toFixed(1)}`);
        }
        if (pts.length >= 3)
          g += `<polyline points="${pts.join(' ')}" fill="none" stroke="#C9A84C" stroke-width="0.35" opacity="0.18"/>`;
      }

      // Continent silhouettes — clipPath clips them to the globe edge
      for (const poly of Object.values(HV_CONTINENTS))
        g += `<path d="${polyPath(poly)}" fill="url(#continentGrad)" stroke="#0F0F1F" stroke-width="0.5"/>`;

      gEl.innerHTML = g;

      // ── Outer content (arcs, cities, orbit icons) ─────────
      let o = '';

      // Connection arcs
      for (const [i, j] of HV_CONNECTIONS) {
        const a = HV_CITIES[i], b = HV_CITIES[j];
        const aP = proj(a.lat, a.lon), bP = proj(b.lat, b.lon);
        if (!aP.v && !bP.v) continue;
        const d = arcPath(a, b);
        if (d) o += `<path d="${d}" fill="none" stroke="#C9A84C" stroke-width="0.7" opacity="0.32"/>`;
      }

      // City markers
      for (const c of HV_CITIES) {
        const p = proj(c.lat, c.lon);
        if (!p.v) continue;
        const sc = 0.5 + (p.z / HV_R) * 0.5;
        const cx = p.x.toFixed(1), cy = p.y.toFixed(1);
        o += `<circle cx="${cx}" cy="${cy}" r="${(4*sc).toFixed(1)}" fill="#C9A84C" opacity="0.3" filter="url(#cityGlow)"/>`;
        o += `<circle cx="${cx}" cy="${cy}" r="${(2.2*sc).toFixed(1)}" fill="#C9A84C"/>`;
        o += `<circle cx="${cx}" cy="${cy}" r="${sc.toFixed(1)}" fill="#FFF"/>`;
      }

      // Orbital service badges
      for (const s of HV_ORBITAL) {
        const ang   = (s.angle - rot * 0.4) * Math.PI / 180;
        const ox    = (Math.cos(ang) * HV_ORBIT).toFixed(1);
        const oy    = (Math.sin(ang) * HV_ORBIT * 0.82).toFixed(1);
        const depth = Math.sin(ang);
        const op    = (0.45 + (depth + 1) * 0.275).toFixed(2);
        const sc    = 0.85 + (depth + 1) * 0.10;
        const r     = (22 * sc).toFixed(1);
        const rh    = (22 * sc + 6).toFixed(1);
        const rl    = (22 * sc + 16).toFixed(1);
        const lw    = (s.lbl.length * 6.8 + 16).toFixed(0);
        const lx    = (-(s.lbl.length * 3.4 + 8)).toFixed(0);
        o += `<g transform="translate(${ox} ${oy})" opacity="${op}">
          <circle cx="0" cy="0" r="${rh}" fill="none" stroke="#C9A84C" stroke-width="0.4" opacity="0.35"/>
          <circle cx="0" cy="0" r="${r}" fill="#FFF" stroke="#C9A84C" stroke-width="0.9"/>
          <text text-anchor="middle" y="4" font-size="9" fill="#1A1A2E" font-family="Inter,sans-serif" font-weight="700">${s.lbl[0]}</text>
          <g transform="translate(0,${rl})">
            <rect x="${lx}" y="-7" width="${lw}" height="14" rx="7" fill="#FFF" stroke="#E2D9C6" stroke-width="0.5"/>
            <text text-anchor="middle" y="3" font-size="8.5" fill="#1A1A2E" opacity="0.9" font-family="Inter,sans-serif" letter-spacing="0.14em" font-weight="500">${s.lbl}</text>
          </g>
        </g>`;
      }

      oEl.innerHTML = o;
      raf = requestAnimationFrame(tick);
    };

    let raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="hero-visual" style={{ "--tx": `${tilt.x}px`, "--ty": `${tilt.y}px` }}>
      <svg viewBox="-280 -280 560 560" className="hero-visual-svg" preserveAspectRatio="xMidYMid meet">
        <defs>
          <radialGradient id="globeOcean" cx="35%" cy="35%" r="80%">
            <stop offset="0%" stopColor="#FBF7EE" />
            <stop offset="100%" stopColor="#E8DFC8" />
          </radialGradient>
          <radialGradient id="globeGlow" cx="50%" cy="50%" r="55%">
            <stop offset="60%" stopColor="#C9A84C" stopOpacity="0" />
            <stop offset="92%" stopColor="#C9A84C" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#C9A84C" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="continentGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1A1A2E" stopOpacity="0.92" />
            <stop offset="100%" stopColor="#2A2A45" stopOpacity="0.78" />
          </linearGradient>
          <filter id="cityGlow"><feGaussianBlur stdDeviation="2.5" /></filter>
          <clipPath id="globeClip"><circle cx="0" cy="0" r={HV_R} /></clipPath>
        </defs>

        {/* Outer glow */}
        <circle cx="0" cy="0" r={HV_R + 50} fill="url(#globeGlow)" />

        {/* Orbit rings */}
        <circle cx="0" cy="0" r={HV_ORBIT + 40} fill="none" stroke="#C9A84C" strokeWidth="0.5" strokeDasharray="2 6" opacity="0.3" />
        <circle cx="0" cy="0" r={HV_ORBIT + 70} fill="none" stroke="#C9A84C" strokeWidth="0.4" strokeDasharray="1 8" opacity="0.18" />

        {/* Globe ocean */}
        <circle cx="0" cy="0" r={HV_R} fill="url(#globeOcean)" />

        {/* Dynamic globe interior — clipped to sphere */}
        <g clipPath="url(#globeClip)" ref={globeRef} />

        {/* Sphere outline */}
        <circle cx="0" cy="0" r={HV_R} fill="none" stroke="#C9A84C" strokeWidth="0.8" opacity="0.7" />

        {/* Specular highlight */}
        <ellipse cx={-HV_R * 0.32} cy={-HV_R * 0.4} rx={HV_R * 0.32} ry={HV_R * 0.16}
          fill="#FFFFFF" opacity="0.35" clipPath="url(#globeClip)" />

        {/* Dynamic outer content — arcs, cities, orbit badges */}
        <g ref={outerRef} />

        {/* Live badge */}
        <g transform={`translate(0 ${-HV_ORBIT - 110})`}>
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
