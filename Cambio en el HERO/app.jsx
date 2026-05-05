// Main App — MEDLA Empresas
const { useState, useEffect, useRef } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "goldTone": "#C9A84C",
  "animations": "on",
  "heading": "serif"
}/*EDITMODE-END*/;

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
      <div className="container nav-inner">
        <a href="#" className="logo"><span className="logo-mark"></span>MEDLA<span className="light">&nbsp;empresas</span></a>
        <ul className="nav-links">
          <li><a href="servicios.html">Servicios</a></li>
          <li><a href="nosotros.html">Nosotros</a></li>
          <li><a href="blog.html">Blog</a></li>
          <li><a href="#proceso">Proceso</a></li>
        </ul>
        <a href="contacto.html" className="nav-cta">Contactar</a>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg"></div>
      <div className="container hero-inner">
        <div className="hero-text">
          <span className="eyebrow">Soluciones integrales para empresas</span>
          <h1 style={{ marginTop: 24 }}>
            Estrategia, tecnología y <em>criterio legal</em> en equilibrio.
          </h1>
          <p className="lead">
            Acompañamos a empresas en expansión con asesoría legal, automatización e inteligencia artificial aplicada — todo bajo una misma estructura.
          </p>
          <div className="hero-ctas">
            <a href="#contacto" className="btn btn-primary">Agendar diagnóstico <span className="arr">→</span></a>
            <a href="#servicios" className="btn btn-ghost">Ver servicios</a>
          </div>
          <div className="hero-meta">
            <div><span className="num">+120</span><span className="lbl">Empresas atendidas</span></div>
            <div><span className="num">15</span><span className="lbl">Años de experiencia</span></div>
            <div><span className="num">7</span><span className="lbl">Líneas de servicio</span></div>
          </div>
        </div>
        <div className="hero-visual-wrap"><HeroVisual /></div>
      </div>
    </section>
  );
}

function LogosSection() {
  const logos = [
    { name: "Vanterra", tag: "Group" },
    { name: "Nórdica", tag: "Capital" },
    { name: "Atelier", tag: "&Co." },
    { name: "Lumière", tag: "Tech" },
    { name: "Monteverde", tag: "Holdings" },
    { name: "Aetheris", tag: "Ventures" },
    { name: "Solstice", tag: "Labs" },
    { name: "Kerning", tag: "Studio" },
    { name: "Orion Fiscal", tag: "Advisors" },
    { name: "Praxis", tag: "Legal" },
  ];
  const doubled = [...logos, ...logos];
  return (
    <section className="logos-section">
      <div className="container">
        <div className="logos-head">Empresas que confían en MEDLA</div>
      </div>
      <div className="marquee">
        <div className="marquee-track">
          {doubled.map((l, i) => (
            <div className="logo-item" key={i}>
              {l.name}<small>{l.tag}</small>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  const services = [
    { kind: "legal", icon: "legal", cls: "t-legal", label: "01 — Pilar", title: "Asesoría legal integral", desc: "Consultoría permanente, revisión contractual, compliance y litigio estratégico. Equipo dedicado por cuenta." },
    { kind: "ai", icon: "ia", cls: "t-ai", label: "02", title: "IA aplicada", desc: "Modelos privados, análisis documental, agentes de decisión." },
    { kind: "invest", icon: "finanzas", cls: "t-invest", label: "03", title: "Manejo de inversiones", desc: "Estructura patrimonial, vehículos y relación con fondos." },
    { kind: "const", icon: "constitucion", cls: "t-const", label: "04", title: "Constitución de empresas", desc: "De la idea a la entidad operativa." },
    { kind: "digi", icon: "digitalizacion", cls: "t-digi", label: "05", title: "Digitalización", desc: "Procesos y operación en capas trazables." },
    { kind: "auto", icon: "automatizacion", cls: "t-auto", label: "06", title: "Automatización", desc: "Flujos que eliminan fricción operativa." },
    { kind: "social", icon: "comercial", cls: "t-social", label: "07 — Nuevo", title: "Manejo comercial & redes", desc: "Creación de contenido, crecimiento de redes y campañas orientadas a resultado. Estrategia, producción y métrica en un mismo equipo." },
  ];
  return (
    <section className="services-section" id="servicios">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Servicios</span>
          <h2>Una operación entera,<br />un solo interlocutor.</h2>
          <p className="lead">Siete líneas que se articulan entre sí. Tu empresa accede a la capa que necesita, sin multiplicar proveedores.</p>
        </div>
        <div className="dashboard">
          {services.map((s) => (
            <div className={`tile ${s.cls}`} key={s.kind}>
              <TileCanvas kind={s.kind} />
              <div className="tile-head">
                <div className="tile-label"><span className="dot"></span>{s.label}</div>
                <div className="tile-icon"><ServiceIcon name={s.icon} size={22} /></div>
              </div>
              <div className="tile-text">
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="services-cta">
          <a href="servicios.html" className="btn btn-dark">Explorar todos los servicios <span className="arr">→</span></a>
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  const ref = useRef(null);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // progress: 0 when section top reaches bottom of viewport; 1 when bottom reaches top
      const total = r.height - vh * 0.4;
      const p = Math.max(0, Math.min(1, (vh * 0.5 - r.top) / total));
      setProgress(p);
      if (p < 0.33) setActive(0);
      else if (p < 0.66) setActive(1);
      else setActive(2);
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const steps = [
    { n: "01", title: "Diagnóstico estratégico", desc: "Mapeamos legal, fiscal, operativa y digital. Entregamos un retrato honesto del estado actual y del camino.", tags: ["Auditoría", "Mapeo", "Oportunidades"] },
    { n: "02", title: "Diseño e implementación", desc: "Construimos la estructura: contratos, tecnología, automatizaciones y procesos. Cada pieza con responsable y métrica.", tags: ["Legal", "Tech stack", "Automatización"] },
    { n: "03", title: "Acompañamiento continuo", desc: "Operamos contigo. Comité mensual, ajuste de estrategia y acceso permanente al equipo.", tags: ["Gobernanza", "Iteración", "Soporte"] },
  ];

  return (
    <section className="process-section" id="proceso" ref={ref}>
      <div className="container process-wrap">
        <div className="process-sticky">
          <span className="eyebrow">Cómo trabajamos</span>
          <h2 style={{ marginTop: 20, marginBottom: 24 }}>Tres pasos,<br />un mismo hilo.</h2>
          <p style={{ color: "var(--text-mute)", maxWidth: "38ch" }}>
            Nuestro método integra disciplinas desde el primer día. Así evitamos los espacios muertos entre asesores.
          </p>
        </div>
        <div className="process-steps">
          <div className="process-track"></div>
          <div className="process-track-fill" style={{ height: `calc(${progress * 100}% - ${progress * 48}px)` }}></div>
          {steps.map((s, i) => (
            <div className={`step ${active >= i ? "active" : ""}`} key={i}>
              <div className="step-num">{s.n}</div>
              <div className="step-body">
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <div className="step-tags">
                  {s.tags.map(t => <span key={t}>{t}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PackagesSection() {
  const pkgs = [
    {
      name: "Essential",
      label: "Para empresas en crecimiento",
      desc: "Lo fundamental para operar con estructura sólida.",
      price: "18,500",
      per: "/ mes",
      features: [
        "Asesoría legal continua",
        "Revisión contractual (hasta 10 / mes)",
        "Compliance básico",
        "1 reunión estratégica mensual",
      ],
      featured: false,
    },
    {
      name: "Pro",
      label: "La elección más popular",
      desc: "Cobertura integral + capa tecnológica.",
      price: "42,000",
      per: "/ mes",
      features: [
        "Todo lo de Essential",
        "Contratos ilimitados",
        "Automatización de procesos clave",
        "IA aplicada (módulo dedicado)",
        "Soporte prioritario 24/48h",
        "Comité estratégico quincenal",
      ],
      featured: true,
      tag: "Recomendado",
    },
    {
      name: "Elite",
      label: "Para operaciones complejas",
      desc: "Equipo dedicado y acompañamiento ejecutivo.",
      price: "85,000",
      per: "/ mes",
      features: [
        "Todo lo de Pro",
        "Equipo legal + tech dedicado",
        "Manejo de inversiones",
        "Manejo comercial & redes",
        "Litigio estratégico incluido",
        "Disponibilidad 24/7",
      ],
      featured: false,
    },
  ];
  return (
    <section className="pkg-section">
      <div className="container">
        <div className="section-head centered">
          <span className="eyebrow">Paquetes</span>
          <h2>Estructuras claras,<br />alcance escalable.</h2>
          <p className="lead" style={{ textAlign: "center" }}>
            Elige la modalidad que corresponde al momento de tu empresa. Todas incluyen acceso a nuestro ecosistema.
          </p>
        </div>
        <div className="pkg-grid">
          {pkgs.map(p => (
            <div className={`pkg ${p.featured ? "featured" : ""}`} key={p.name}>
              {p.tag && <span className="pkg-tag">{p.tag}</span>}
              <div className="pkg-label">{p.label}</div>
              <h3>{p.name}</h3>
              <div className="pkg-desc">{p.desc}</div>
              <div className="pkg-price">
                <span className="price-curr">MXN</span>
                <span className="price-num">${p.price}</span>
                <span className="price-per">{p.per}</span>
              </div>
              <ul className="pkg-features">
                {p.features.map(f => <li key={f}>{f}</li>)}
              </ul>
              <a href="#contacto" className={`btn ${p.featured ? "btn-primary" : "btn-ghost"}`}>
                Elegir {p.name} <span className="arr">→</span>
              </a>
            </div>
          ))}
        </div>
        <div className="pkg-custom">
          <div className="pkg-custom-text">
            <h3>¿Buscas algo a la medida?</h3>
            <p>Construimos paquetes específicos para grupos, holdings y operaciones internacionales. Conversemos sobre el alcance exacto que tu empresa necesita.</p>
          </div>
          <a href="#contacto" className="btn btn-dark">Solicitar propuesta <span className="arr">→</span></a>
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const items = [
    { q: "MEDLA simplificó una operación que llevaba años fragmentada. En seis meses pasamos de tres despachos a un solo interlocutor.", name: "Lucía Ortega", role: "CEO · Monteverde Holdings", ini: "LO" },
    { q: "La combinación de criterio legal y capacidad técnica es única. Resolvieron nuestra migración a IA sin perder compliance.", name: "Andrés Villalba", role: "COO · Lumière Tech", ini: "AV" },
    { q: "Transparencia total, respuestas en horas y un equipo que entiende de verdad cómo opera una empresa en crecimiento.", name: "Renata Paz", role: "Fundadora · Aetheris", ini: "RP" },
    { q: "La automatización que implementaron nos devolvió semanas de trabajo cada mes. El ROI fue visible desde el primer trimestre.", name: "Mauricio Escalante", role: "Director · Vanterra Group", ini: "ME" },
    { q: "Trabajar con MEDLA es tener un socio silencioso que se anticipa. Eso, para un fondo como el nuestro, vale oro.", name: "Daniela Brun", role: "Partner · Nórdica Capital", ini: "DB" },
    { q: "Nos acompañaron en la constitución, y tres años después siguen operando el compliance y las redes comerciales.", name: "Iván Cortés", role: "CEO · Orion Fiscal", ini: "IC" },
  ];
  const doubled = [...items, ...items];
  return (
    <section className="testimonials-section" id="nosotros">
      <div className="container">
        <div className="section-head centered">
          <span className="eyebrow">Testimonios</span>
          <h2>Lo que dicen<br />de trabajar con MEDLA.</h2>
        </div>
      </div>
      <div className="testimonials-track-wrap">
        <div className="testimonials-track">
          {doubled.map((t, i) => (
            <div className="testimonial" key={i}>
              <div className="testimonial-quote">{t.q}</div>
              <div className="testimonial-person">
                <div>
                  <div className="testimonial-name">{t.name}</div>
                  <div className="testimonial-role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="cta-section" id="contacto">
      <div className="container">
        <div className="cta-card">
          <CTACanvas />
          <span className="cta-corner tl"></span>
          <span className="cta-corner tr"></span>
          <span className="cta-corner bl"></span>
          <span className="cta-corner br"></span>
          <div className="cta-card-inner">
            <span className="cta-tag"><span className="blink"></span>Disponibles · Abril 2026</span>
            <h2>
              Conversemos sobre el<br /><em>futuro de tu empresa.</em>
            </h2>
            <p>Una llamada de 30 minutos para entender tu operación y dibujar, sin compromiso, cómo sería trabajar juntos.</p>
            <div className="hero-ctas">
              <a href="#" className="btn btn-dark">Agendar diagnóstico <span className="arr">→</span></a>
              <a href="#" className="btn btn-ghost">Escribir por WhatsApp</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="blog">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="logo"><span className="logo-mark" style={{ borderColor: "#C9A84C" }}></span>MEDLA<span className="light">&nbsp;empresas</span></div>
            <p>Estructura legal, tecnológica y comercial para empresas que deciden operar con criterio.</p>
          </div>
          <div>
            <h4>Servicios</h4>
            <ul>
              <li><a href="#">Asesoría legal</a></li>
              <li><a href="#">Constitución</a></li>
              <li><a href="#">Inversiones</a></li>
              <li><a href="#">IA aplicada</a></li>
              <li><a href="#">Comercial & redes</a></li>
            </ul>
          </div>
          <div>
            <h4>Compañía</h4>
            <ul>
              <li><a href="#">Nosotros</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Casos</a></li>
              <li><a href="#">Carreras</a></li>
            </ul>
          </div>
          <div>
            <h4>Contacto</h4>
            <ul>
              <li><a href="#">empresas@medla.mx</a></li>
              <li><a href="#">+52 55 0000 0000</a></li>
              <li><a href="#">Polanco, CDMX</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 MEDLA Empresas. Todos los derechos reservados.</span>
          <span>Aviso de privacidad · Términos</span>
        </div>
      </div>
    </footer>
  );
}

function TweaksUI({ t, setTweak }) {
  return (
    <TweaksPanel>
      <TweakSection label="Apariencia" />
      <TweakColor label="Tono dorado" value={t.goldTone} onChange={(v) => setTweak("goldTone", v)} />
      <TweakRadio label="Titulares" value={t.heading} options={["serif", "sans"]} onChange={(v) => setTweak("heading", v)} />
      <TweakSection label="Movimiento" />
      <TweakRadio label="Animaciones" value={t.animations} options={["on", "reducido", "off"]} onChange={(v) => setTweak("animations", v)} />
    </TweaksPanel>
  );
}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  useEffect(() => {
    document.documentElement.style.setProperty("--gold", t.goldTone);
    document.documentElement.style.setProperty("--f-display-current",
      t.heading === "serif" ? "Cormorant Garamond, Georgia, serif" : "Inter, sans-serif");
  }, [t.goldTone, t.heading]);

  useEffect(() => {
    if (t.animations === "off") {
      document.documentElement.classList.add("no-anim");
    } else {
      document.documentElement.classList.remove("no-anim");
    }
    if (t.animations === "reducido") {
      document.documentElement.classList.add("slow-anim");
    } else {
      document.documentElement.classList.remove("slow-anim");
    }
  }, [t.animations]);

  useEffect(() => {
    const style = document.getElementById("dyn-heading") || document.createElement("style");
    style.id = "dyn-heading";
    style.textContent = `h1, h2, h3, h4 { font-family: ${t.heading === "serif" ? "'Cormorant Garamond', Georgia, serif" : "'Inter', sans-serif"} !important; font-weight: ${t.heading === "serif" ? 500 : 600} !important; } .logo, .testimonial-quote { font-family: ${t.heading === "serif" ? "'Cormorant Garamond', Georgia, serif" : "'Inter', sans-serif"} !important; }`;
    if (!style.parentNode) document.head.appendChild(style);
  }, [t.heading]);

  return (
    <>
      <Nav />
      <Hero />
      <LogosSection />
      <ServicesSection />
      <ProcessSection />
      <PackagesSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
      <TweaksUI t={t} setTweak={setTweak} />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
