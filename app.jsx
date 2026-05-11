// Main App — MEDLA Empresas
const { useState, useEffect, useRef } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "goldTone": "#C9A84C",
  "animations": "on",
  "heading": "serif"
}/*EDITMODE-END*/;

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <>
    <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
      <div className="container nav-inner">
        <a href="index.html" className="logo"><img src="logo.png" alt="MEDLA" style={{height: 96}} /></a>
        <ul className="nav-links">
          <li><a href="servicios.html">Servicios</a></li>
          <li><a href="nosotros.html">Nosotros</a></li>
          <li><a href="blog.html">Blog</a></li>
          <li><a href="contacto.html">Contacto</a></li>
        </ul>
        <div style={{display: "flex", alignItems: "center"}}>
          <a href="contacto.html" className="nav-cta">Contactar</a>
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
            <li><a href="nosotros.html">Nosotros</a></li>
            <li><a href="blog.html">Blog</a></li>
            <li><a href="contacto.html">Contacto</a></li>
            <li style={{marginTop: 20}}><a href="contacto.html" className="btn btn-primary" style={{textAlign: "center", justifyContent: "center", width: "100%"}}>Contactar</a></li>
          </ul>
        </div>
      </div>
    )}
    </>
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
            <a href="contacto.html" className="btn btn-primary">Agendar diagnóstico <span className="arr">→</span></a>
            <a href="#servicios" className="btn btn-ghost">Ver servicios</a>
          </div>
          <div className="hero-meta">
            <div><span className="num">+6</span><span className="lbl">Años de experiencia</span></div>
            <div><span className="num">+20</span><span className="lbl">Empresas atendidas</span></div>
            <div><span className="num">24/7</span><span className="lbl">Soporte personalizado</span></div>
          </div>
        </div>
        <div className="hero-visual-wrap"><HeroVisual /></div>
      </div>
    </section>
  );
}

function LogosSection() {
  const logos = [
    "assets/logos/ce.png",
    "assets/logos/asociacion_espanola.png",
    "assets/logos/avannzza.png",
    "assets/logos/jotform.png"
  ];
  const doubled = [...logos, ...logos];
  return (
    <section className="logos-section">
      <div className="container">
        <div className="logos-head">Empresas que confían en MEDLA</div>
      </div>
      <div className="marquee">
        <div className="marquee-track">
          {doubled.map((src, i) => (
            <div className="logo-item" key={i} style={{ display: 'flex', alignItems: 'center', padding: '0 30px' }}>
              <img src={src} alt="logo" style={{ maxHeight: '60px', maxWidth: '180px', objectFit: 'contain' }} />
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
              <a href="contacto.html" className="btn btn-dark">Agendar diagnóstico <span className="arr">→</span></a>
              <a href="https://api.whatsapp.com/send/?phone=34641576772&text=Hola%2C+me+gustar%C3%ADa+recibir+m%C3%A1s+informaci%C3%B3n&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">Escribir por WhatsApp</a>
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
            <a href="index.html"><img src="logo.png" alt="MEDLA Empresas" style={{height: 160, display: "block", marginBottom: 16, filter: "invert(1)"}} /></a>
            <p>Estructura legal, tecnológica y comercial para empresas que deciden operar con criterio.</p>
          </div>
          <div>
            <h4>Servicios</h4>
            <ul>
              <li><a href="asesoria-legal.html">Asesoría legal</a></li>
              <li><a href="constitucion.html">Constitución</a></li>
              <li><a href="inversiones.html">Inversiones</a></li>
              <li><a href="agentes.html">IA aplicada</a></li>
              <li><a href="redes-sociales.html">Comercial & redes</a></li>
            </ul>
          </div>
          <div>
            <h4>Compañía</h4>
            <ul>
              <li><a href="nosotros.html">Nosotros</a></li>
              <li><a href="blog.html">Blog</a></li>
              <li><a href="#">Casos</a></li>
              <li><a href="#">Carreras</a></li>
            </ul>
          </div>
          <div>
            <h4>Contacto</h4>
            <ul>
              <li><a href="mailto:info@medla-empresas.com">info@medla-empresas.com</a></li>
              <li><a href="tel:+34641576772">+34 641 576 772</a></li>
              <li><a href="#">Madrid, España</a></li>
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
      
      <TestimonialsSection />
      <CTASection />
      <Footer />
      <TweaksUI t={t} setTweak={setTweak} />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
