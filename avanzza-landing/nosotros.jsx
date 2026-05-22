// Nosotros page — manifesto + principles + stats + timeline + team + values + CTA

const { useState, useEffect, useRef } = React;

/* ─────────── Nav ─────────── */
function NosNav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <>
    <nav className="nav scrolled">
      <div className="container nav-inner">
        <a href="index.html" className="logo"><img src="logo.png" alt="MEDLA" style={{height: 96}} /></a>
        <ul className="nav-links">
          <li><a href="servicios.html">Servicios</a></li>
          <li><a href="nosotros.html" style={{ color: "var(--gold)" }}>Nosotros</a></li>
          <li><a href="blog.html">Blog</a></li>
          <li><a href="contacto.html">Contacto</a></li>
        </ul>
        <div style={{display: "flex", alignItems: "center"}}>
          <a href="contacto.html" className="btn btn-primary btn-sm nav-cta">Agendar diagnóstico</a>
          <button className="nav-toggle" onClick={() => setMobileOpen(true)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
          </button>
        </div>
      </div>
    </nav>
    {mobileOpen && (
      <div className="mobile-menu">
        <div className="mobile-menu-overlay" onClick={() => setMobileOpen(false)}></div>
        <div className="mobile-menu-content">
          <div className="mobile-menu-head">
            <img src="logo.png" alt="MEDLA" style={{height: 40}} />
            <button className="nav-toggle" style={{display: "block"}} onClick={() => setMobileOpen(false)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
          </div>
          <ul className="mobile-links" onClick={() => setMobileOpen(false)}>
            <li><a href="servicios.html">Servicios</a></li>
            <li><a href="nosotros.html" style={{ color: "var(--gold)" }}>Nosotros</a></li>
            <li><a href="blog.html">Blog</a></li>
            <li><a href="contacto.html">Contacto</a></li>
            <li style={{marginTop: 20}}><a href="contacto.html" className="btn btn-primary" style={{textAlign: "center", justifyContent: "center", width: "100%"}}>Agendar diagnóstico</a></li>
          </ul>
        </div>
      </div>
    )}
    </>
  );
}

/* ─────────── Hero ─────────── */
function NosHero() {
  return (
    <section className="nos-hero">
      <div className="nos-hero-marquee">criterio · criterio · criterio · criterio · criterio · criterio · criterio ·</div>
      <div className="container nos-hero-inner">
        <span className="eyebrow" style={{ justifyContent: "center" }}>— Nosotros</span>
        <h1 style={{ marginTop: 24 }}>
          No somos<br />consultores.<br /><em>Somos socios</em>.
        </h1>
        <p className="nos-hero-sub">
          MEDLA nació para resolver un vacío claro: las empresas en crecimiento necesitan
          una capa estratégica que piense en términos legales, tecnológicos y comerciales
          al mismo tiempo — bajo un único criterio.
        </p>
      </div>
    </section>
  );
}

/* ─────────── Manifiesto ─────────── */
function NosManifest() {
  const principles = [
    {
      num: "01",
      t: "Criterio sobre volumen",
      d: "No queremos ser el despacho más grande. Queremos ser el que mejor entiende a tu empresa. Por eso trabajamos con un número limitado de clientes al año.",
    },
    {
      num: "02",
      t: "Integración real, no coordinación",
      d: "Legal, tech y comercial operan bajo el mismo criterio. No somos tres equipos que se pasan tickets: somos un solo equipo que piensa transversalmente.",
    },
    {
      num: "03",
      t: "Arquitectura antes que parche",
      d: "Resolvemos la causa estructural, no el síntoma visible. Si tu problema es de flujo operativo, no vamos a darte un contrato: vamos a rediseñar el flujo.",
    },
    {
      num: "04",
      t: "Transparencia como producto",
      d: "Sin letra pequeña, sin minutos facturados, sin sorpresas. Cada alcance se acuerda, se escribe y se cumple. Si algo cambia, se conversa antes, no después.",
    },
  ];

  return (
    <section className="nos-manifest">
      <div className="container nos-manifest-inner">
        <span className="eyebrow" style={{ color: "var(--gold)" }}>— Manifiesto</span>
        <h2 style={{ marginTop: 16 }}>
          Creemos que <em>operar con criterio</em> ya no es opcional para una empresa seria.
        </h2>
        <p className="nos-manifest-lead">
          En un mercado saturado de proveedores funcionales, MEDLA apuesta por lo contrario:
          menos interlocutores, más pensamiento transversal. Cuatro principios sostienen todo
          lo que hacemos.
        </p>

        <div className="nos-manifest-grid">
          {principles.map((p) => (
            <div className="nos-principle" key={p.num}>
              <div className="nos-principle-num">{p.num}</div>
              <div className="nos-principle-body">
                <h3>{p.t}</h3>
                <p>{p.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────── Stats ─────────── */
function useCountUp(target, ms = 1500) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const loop = (t) => {
            const p = Math.min(1, (t - start) / ms);
            const eased = 1 - Math.pow(1 - p, 3);
            setVal(Math.round(target * eased));
            if (p < 1) requestAnimationFrame(loop);
          };
          requestAnimationFrame(loop);
        }
      });
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target, ms]);
  return [val, ref];
}

function StatCard({ value, suffix, label, sub }) {
  const [v, ref] = useCountUp(value);
  return (
    <div className="nos-stat" ref={ref}>
      <div className="nos-stat-val">{v}{suffix && <em>{suffix}</em>}</div>
      <div className="nos-stat-lbl">{label}</div>
      <div className="nos-stat-sub">{sub}</div>
    </div>
  );
}

function NosStats() {
  return (
    <section className="nos-stats">
      <div className="container">
        <div className="section-head" style={{ marginBottom: 56 }}>
          <span className="eyebrow">— Por dentro</span>
          <h2>Lo que <em>sí</em> somos, en números.</h2>
        </div>
        <div className="nos-stats-grid">
          <StatCard value={67} label="Clientes activos" sub="Pymes, startups, holdings y family offices operando con MEDLA." />
          <StatCard value={8} label="Años de operación" sub="Desde 2017, sirviendo a empresas que deciden crecer con criterio." />
          <StatCard value={14} label="Profesionales" sub="Abogados, ingenieros, consultores y especialistas bajo un mismo techo." />
          <StatCard value={24} suffix="h" label="Respuesta media" sub="Tiempo máximo para que recibas una primera respuesta con contexto." />
        </div>
      </div>
    </section>
  );
}

/* ─────────── Timeline ─────────── */
function NosTimeline() {
  const events = [
    { y: "2017", t: "El punto de partida", d: "MEDLA nace como una firma pequeña de asesoría legal corporativa, especializada en pymes en crecimiento. Tres abogados, una oficina compartida, una convicción clara: el cliente merece criterio, no procesos." },
    { y: "2019", t: "Incorporamos tecnología", d: "Tras ver una y otra vez los mismos cuellos de botella operativos en nuestros clientes, sumamos un equipo de ingenieros para digitalizar procesos internos. Nace la segunda línea." },
    { y: "2021", t: "Especialización en inversión", d: "Acompañamos la primera ronda serie A de un cliente histórico. La operación fuerza a construir un área propia de inversiones y levantamiento de capital, con equipo dedicado." },
    { y: "2023", t: "IA aplicada en producción", d: "Lanzamos la línea de IA aplicada tras un año de I+D. Primeros asistentes internos de clientes, análisis documental masivo y compliance automatizado." },
    { y: "2025", t: "MEDLA Empresas consolidado", d: "Cerramos el año con 67 clientes activos en 4 países. Integramos comunicación estratégica como séptima línea: un único gobierno operativo con siete capas coordinadas.", current: true },
  ];
  return (
    <section className="nos-timeline">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">— Trayectoria</span>
          <h2>Ocho años <em>construyendo</em> criterio.</h2>
          <p className="lead">No improvisamos la integración. La construimos año a año, siguiendo las necesidades reales de nuestros clientes.</p>
        </div>
        <div className="tl-wrap">
          {events.map((e, i) => (
            <div key={i} className={`tl-item ${e.current ? "current" : ""}`}>
              <div className="tl-year">{e.y}</div>
              <div className="tl-title">{e.t}</div>
              <div className="tl-desc">{e.d}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────── Team ─────────── */
const AvatarPattern = ({ seed, initials }) => {
  const hue1 = (seed * 47) % 360;
  const hue2 = (seed * 89 + 140) % 360;
  const shapes = [0, 1, 2, 3].map((i) => ({
    cx: 30 + ((seed * (i + 1) * 37) % 140),
    cy: 30 + ((seed * (i + 2) * 53) % 140),
    r: 18 + ((seed * (i + 1) * 11) % 30),
  }));
  return (
    <svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id={`avg-${seed}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={`hsl(${hue1}, 30%, 90%)`} />
          <stop offset="100%" stopColor={`hsl(${hue2}, 25%, 78%)`} />
        </linearGradient>
      </defs>
      <rect width="200" height="200" fill={`url(#avg-${seed})`} />
      {shapes.map((s, i) => (
        <circle key={i} cx={s.cx} cy={s.cy} r={s.r} fill="#1A1A2E" opacity={0.06 + i * 0.03} />
      ))}
      <circle cx="100" cy="80" r="28" fill="#1A1A2E" opacity="0.85" />
      <path d="M 50 180 Q 100 130 150 180 L 150 200 L 50 200 Z" fill="#1A1A2E" opacity="0.85" />
      <text x="100" y="108" textAnchor="middle" fontSize="22" fill="#C9A84C" fontFamily="Cormorant Garamond" fontStyle="italic" fontWeight="500">
        {initials}
      </text>
    </svg>
  );
};

function NosTeam() {
  const people = [
    { n: "Mateo Delgado", r: "Socio fundador · Director", b: "Abogado corporativo. 15 años negociando M&A y rondas de inversión antes de apostar por construir algo propio.", seed: 3, i: "MD" },
    { n: "Elena Cortés", r: "Socia · Tecnología", b: "Ingeniera y ex-CTO. Diseña arquitecturas operativas que hablan tanto con auditores como con equipos de producto.", seed: 17, i: "EC" },
    { n: "Lucía Almada", r: "Socia · Inversiones", b: "VC durante 10 años en Madrid y CDMX. Sabe leer un cap table al derecho y al revés, y negociar lo que nadie firma.", seed: 31, i: "LA" },
    { n: "Daniel Herrera", r: "Director · IA aplicada", b: "Data scientist con formación jurídica. Lidera los productos de IA internos y los proyectos de implementación con clientes.", seed: 43, i: "DH" },
    { n: "Sofía Medina", r: "Directora · Comercial", b: "Periodista reconvertida en estratega de comunicación. Construye la narrativa de marca de founders y empresas del portfolio.", seed: 61, i: "SM" },
    { n: "Rafael Ortiz", r: "Director · Compliance", b: "Ex-regulador. Diseña programas de cumplimiento normativo en sectores financiero, salud y tecnológico.", seed: 79, i: "RO" },
  ];
  return (
    <section className="nos-team" id="equipo">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">— Equipo</span>
          <h2>Las personas detrás <em>del criterio</em>.</h2>
          <p className="lead">Trabajamos de forma plana y directa. Cada cliente habla con la persona que toma las decisiones, no con un account manager que las traduce.</p>
        </div>
        <div className="team-grid">
          {people.map((p, i) => (
            <div className="team-card" key={i}>
              <div className="team-avatar">
                <AvatarPattern seed={p.seed} initials={p.i} />
              </div>
              <div className="name">{p.n}</div>
              <div className="role">{p.r}</div>
              <div className="bio">{p.b}</div>
              <div className="team-card-social">
                <a href="#" aria-label="LinkedIn">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M8 10v7M8 7.5v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7" strokeLinecap="round" /></svg>
                </a>
                <a href="#" aria-label="Email">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 7 9-7" strokeLinecap="round" /></svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────── Values ─────────── */
function NosValues() {
  const values = [
    {
      n: "I",
      t: "Escuchar antes de proponer",
      d: "Cada engagement empieza con al menos una conversación larga. Lo que aprendemos ahí define toda la ruta.",
      svg: (
        <svg width="44" height="44" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 16 Q 12 10 18 10 L 30 10 Q 36 10 36 16 L 36 24 Q 36 30 30 30 L 20 30 L 14 36 L 14 30 Q 12 30 12 28 Z" />
          <circle cx="20" cy="20" r="1" fill="currentColor" />
          <circle cx="24" cy="20" r="1" fill="currentColor" />
          <circle cx="28" cy="20" r="1" fill="currentColor" />
        </svg>
      ),
    },
    {
      n: "II",
      t: "Decir lo que no vemos",
      d: "Si el alcance que pides no tiene sentido, lo decimos. Si necesitas algo que no ofrecemos, recomendamos a quien sí.",
      svg: (
        <svg width="44" height="44" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="24" cy="24" r="16" />
          <path d="M24 14 L24 26" />
          <circle cx="24" cy="32" r="1.5" fill="currentColor" />
        </svg>
      ),
    },
    {
      n: "III",
      t: "Documentar todo",
      d: "Decisiones, razones, alternativas. El trabajo queda escrito para que tu equipo pueda continuarlo sin nosotros.",
      svg: (
        <svg width="44" height="44" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
          <rect x="12" y="8" width="24" height="32" rx="2" />
          <path d="M17 18 L31 18 M17 24 L31 24 M17 30 L26 30" />
        </svg>
      ),
    },
    {
      n: "IV",
      t: "Cerrar bien o no abrir",
      d: "Un engagement no termina cuando entregamos: termina cuando tu equipo lo está operando sin fricciones. Esa es nuestra vara.",
      svg: (
        <svg width="44" height="44" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 24 L20 34 L38 14" />
        </svg>
      ),
    },
  ];
  return (
    <section className="nos-values">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">— Valores</span>
          <h2>Cómo <em>trabajamos</em>, en la práctica.</h2>
        </div>
        <div className="values-grid">
          {values.map((v, i) => (
            <div className="value-card" key={i}>
              <div className="value-num">{v.n}</div>
              <div className="value-pattern">{v.svg}</div>
              <h4>{v.t}</h4>
              <p>{v.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────── CTA ─────────── */
function NosCTA() {
  return (
    <section className="nos-cta">
      <div className="container nos-cta-inner">
        <span className="eyebrow" style={{ color: "var(--gold)", justifyContent: "center" }}>— Trabajemos juntos</span>
        <h2 style={{ marginTop: 20 }}>¿Y si <em>el próximo</em> somos nosotros?</h2>
        <p>Si llegaste hasta aquí es porque algo resuena. Conversemos: 30 minutos, sin compromiso, para entender si tiene sentido seguir adelante.</p>
        <div className="hero-ctas" style={{ justifyContent: "center" }}>
          <a href="contacto.html" className="btn btn-primary">Agendar diagnóstico <span className="arr">→</span></a>
          <a href="contacto.html" className="btn btn-ghost" style={{ color: "var(--white)", borderColor: "rgba(255,255,255,0.3)" }}>Ver servicios</a>
        </div>
      </div>
    </section>
  );
}

/* ─────────── Footer ─────────── */
function NosFooter() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <a href="index.html"><img src="logo.png" alt="MEDLA Empresas" style={{height: 72, display: "block", marginBottom: 16}} /></a>
            <p>Estructura legal, tecnológica y comercial para empresas que deciden operar con criterio.</p>
          </div>
          <div>
            <h4>Servicios</h4>
            <ul>
              <li><a href="asesoria-legal.html">Asesoría legal</a></li>
              <li><a href="redes-sociales.html">Comunicación</a></li>
              <li><a href="Langin_MEDLA_Jotform/dist/index.html">Soluciones Jotform</a></li>
            </ul>
          </div>
          <div>
            <h4>Empresa</h4>
            <ul>
              <li><a href="nosotros.html">Nosotros</a></li>
              <li><a href="blog.html">Blog</a></li>
              <li><a href="contacto.html">Contacto</a></li>
            </ul>
          </div>
          <div>
            <h4>Contacto</h4>
            <ul>
              <li>info@medla-empresas.com</li>
              <li>+34 641 57 67 72</li>
              <li>Madrid, España</li>
            </ul>
            <a
              href="https://api.whatsapp.com/send/?phone=34641576772&text=Hola%2C+me+gustar%C3%ADa+recibir+m%C3%A1s+informaci%C3%B3n&type=phone_number&app_absent=0"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{marginTop: 20, display: "inline-flex", alignItems: "center", gap: 8, fontSize: "0.85rem", padding: "10px 20px"}}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Contactar por WhatsApp
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2025 MEDLA empresas. Todos los derechos reservados.</span>
          <div>
            <a href="#">Aviso legal</a>
            <a href="#">Política de privacidad</a>
            <a href="#">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function NosotrosApp() {
  return (
    <div className="nos-page">
      <NosNav />
      <NosHero />
      <NosManifest />
      <NosStats />
      <NosTimeline />
      <NosTeam />
      <NosValues />
      <NosCTA />
      <NosFooter />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<NosotrosApp />);
