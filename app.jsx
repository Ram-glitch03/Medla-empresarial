// MEDLA Empresas — Executive Intelligence experience
const { useEffect, useState } = React;

const capabilities = [
  {
    n: "01",
    eyebrow: "Estructura",
    title: "Arquitectura legal y corporativa",
    desc: "Diseñamos el marco societario, contractual y de cumplimiento que permite crecer con control.",
    href: "asesoria-legal.html",
    className: "hp-capability--lead",
    signal: "Governance"
  },
  {
    n: "02",
    eyebrow: "Inteligencia",
    title: "IA aplicada al negocio",
    desc: "Sistemas privados, agentes y flujos de decisión integrados en la operación real.",
    href: "jotform.html",
    className: "hp-capability--dark",
    signal: "AI systems"
  },
  {
    n: "03",
    eyebrow: "Capital",
    title: "Inversión y estructura patrimonial",
    desc: "Criterio estratégico para ordenar vehículos, capital y conversaciones con inversores.",
    href: "inversiones.html",
    className: "",
    signal: "Capital"
  },
  {
    n: "04",
    eyebrow: "Launch",
    title: "Constitución de empresas",
    desc: "De la oportunidad a una entidad preparada para operar, contratar y escalar.",
    href: "constitucion.html",
    className: "",
    signal: "Venture"
  },
  {
    n: "05",
    eyebrow: "Operaciones",
    title: "Digitalización y datos",
    desc: "Convertimos procesos dispersos en una arquitectura trazable y medible.",
    href: "digitalizacion.html",
    className: "hp-capability--wide",
    signal: "Data layer"
  },
  {
    n: "06",
    eyebrow: "Eficiencia",
    title: "Automatización inteligente",
    desc: "Eliminamos fricción y trabajo repetitivo sin perder supervisión ni criterio humano.",
    href: "automatizacion.html",
    className: "",
    signal: "Automation"
  },
  {
    n: "07",
    eyebrow: "Crecimiento",
    title: "Sistema comercial y comunicación",
    desc: "Alineamos posicionamiento, contenido y adquisición alrededor de una tesis comercial clara.",
    href: "redes-sociales.html",
    className: "hp-capability--accent",
    signal: "Growth"
  }
];

const operatingModel = [
  {
    n: "01",
    label: "Diagnóstico",
    title: "Entender antes de intervenir",
    desc: "Leemos la empresa como un sistema: decisiones, riesgos, procesos, tecnología y oportunidad. El resultado es una visión ejecutiva compartida.",
    output: "Mapa de prioridades"
  },
  {
    n: "02",
    label: "Arquitectura",
    title: "Diseñar una única hoja de ruta",
    desc: "Traducimos la estrategia en estructura: responsables, iniciativas, secuencia, herramientas y métricas. Cada pieza responde a una tesis.",
    output: "Sistema operativo"
  },
  {
    n: "03",
    label: "Ejecución",
    title: "Construir junto al equipo",
    desc: "Implementamos, coordinamos especialistas y dejamos capacidad instalada. La dirección conserva visibilidad y control durante todo el proceso.",
    output: "Capacidad en marcha"
  }
];

function Arrow({ diagonal = false }) {
  return (
    <svg className="hp-arrow" viewBox="0 0 20 20" aria-hidden="true">
      {diagonal ? <path d="M5 15 15 5M7 5h8v8" /> : <path d="M3 10h13M11 5l5 5-5 5" />}
    </svg>
  );
}

function MenuIcon({ close = false }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {close ? <path d="M5 5l14 14M19 5 5 19" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
    </svg>
  );
}

function RevealController() {
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    document.documentElement.classList.add("hp-reveal-ready");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -6%" }
    );
    const nodes = document.querySelectorAll("[data-reveal]");
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
  return null;
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    const onKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <>
      <nav className={`hp-nav ${scrolled ? "is-scrolled" : ""}`} aria-label="Navegación principal">
        <div className="hp-container hp-nav__inner">
          <a className="hp-brand" href="index.html" aria-label="MEDLA Empresas, inicio">
            <img src="logo.png" alt="" />
            <span className="hp-brand__descriptor">Executive<br />Intelligence</span>
          </a>

          <div className="hp-nav__links">
            <a href="#capacidades">Capacidades</a>
            <a href="#modelo">Modelo</a>
            <a href="nosotros.html">Firma</a>
            <a href="blog.html">Perspectivas</a>
          </div>

          <div className="hp-nav__actions">
            <span className="hp-nav__location"><i></i> Madrid · Europa</span>
            <a className="hp-nav__cta" href="contacto.html">Iniciar conversación <Arrow /></a>
            <button
              className="hp-nav__toggle"
              type="button"
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={open}
              onClick={() => setOpen(!open)}
            >
              <MenuIcon close={open} />
            </button>
          </div>
        </div>
      </nav>

      <div className={`hp-mobile-menu ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <button className="hp-mobile-menu__backdrop" aria-label="Cerrar menú" onClick={closeMenu}></button>
        <div className="hp-mobile-menu__panel">
          <div className="hp-mobile-menu__meta">MEDLA / Navegación</div>
          <div className="hp-mobile-menu__links">
            <a href="#capacidades" onClick={closeMenu}><span>01</span> Capacidades</a>
            <a href="#modelo" onClick={closeMenu}><span>02</span> Modelo</a>
            <a href="nosotros.html" onClick={closeMenu}><span>03</span> Firma</a>
            <a href="blog.html" onClick={closeMenu}><span>04</span> Perspectivas</a>
          </div>
          <a className="hp-button hp-button--gold" href="contacto.html">Solicitar diagnóstico <Arrow /></a>
          <div className="hp-mobile-menu__foot">Estrategia · Tecnología · Empresa</div>
        </div>
      </div>
    </>
  );
}

function ExecutiveSystem() {
  return (
    <div className="hp-system" aria-label="Sistema integrado de estrategia, inteligencia y ejecución">
      <div className="hp-system__topbar">
        <div><span className="hp-system__mark">M/</span> Executive System</div>
        <div className="hp-system__status"><i></i> Sistema activo</div>
      </div>

      <div className="hp-system__field" aria-hidden="true">
        <div className="hp-system__grid"></div>
        <div className="hp-system__halo hp-system__halo--one"></div>
        <div className="hp-system__halo hp-system__halo--two"></div>
        <svg className="hp-system__map" viewBox="0 0 600 560">
          <defs>
            <linearGradient id="hp-line" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#D5B76C" stopOpacity="0.08" />
              <stop offset="0.5" stopColor="#D5B76C" stopOpacity="0.9" />
              <stop offset="1" stopColor="#79AFC4" stopOpacity="0.12" />
            </linearGradient>
          </defs>
          <path className="hp-map__orbit" d="M80 292C112 105 337 40 492 165c133 108 76 319-94 366C232 577 48 470 80 292Z" />
          <path className="hp-map__line hp-map__line--a" d="M119 220 300 280 480 183" />
          <path className="hp-map__line hp-map__line--b" d="M150 430 300 280 448 422" />
          <path className="hp-map__line hp-map__line--c" d="M119 220 150 430M480 183l-32 239" />
          <g className="hp-map__node hp-map__node--one" transform="translate(119 220)"><circle r="9"/><circle r="3"/></g>
          <g className="hp-map__node hp-map__node--two" transform="translate(480 183)"><circle r="9"/><circle r="3"/></g>
          <g className="hp-map__node hp-map__node--three" transform="translate(448 422)"><circle r="9"/><circle r="3"/></g>
          <g className="hp-map__node hp-map__node--four" transform="translate(150 430)"><circle r="9"/><circle r="3"/></g>
          <circle className="hp-map__pulse" cx="300" cy="280" r="72" />
        </svg>

        <div className="hp-system__core">
          <span>MEDLA</span>
          <strong>M</strong>
          <small>Integrated intelligence</small>
        </div>

        <div className="hp-system__label hp-system__label--legal"><span>01</span> Legal architecture</div>
        <div className="hp-system__label hp-system__label--ai"><span>02</span> AI systems</div>
        <div className="hp-system__label hp-system__label--growth"><span>03</span> Growth infrastructure</div>
        <div className="hp-system__label hp-system__label--capital"><span>04</span> Capital strategy</div>
      </div>

      <div className="hp-system__footer">
        <div><span>Input</span><strong>Complejidad</strong></div>
        <div className="hp-system__flow"><i></i><i></i><i></i></div>
        <div><span>Output</span><strong>Ventaja operativa</strong></div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <header className="hp-hero">
      <div className="hp-hero__ambient" aria-hidden="true"></div>
      <div className="hp-container hp-hero__inner">
        <div className="hp-hero__copy">
          <div className="hp-kicker hp-hero__entrance hp-hero__entrance--one">
            <span>Consultoría de nueva generación</span>
            <small>Strategy × Technology × Enterprise</small>
          </div>
          <h1 className="hp-hero__entrance hp-hero__entrance--two">
            Convertimos complejidad empresarial en <em>ventaja operativa.</em>
          </h1>
          <p className="hp-hero__lead hp-hero__entrance hp-hero__entrance--three">
            Integramos estrategia, estructura legal, inteligencia artificial y ejecución comercial en un único sistema de crecimiento.
          </p>
          <div className="hp-hero__actions hp-hero__entrance hp-hero__entrance--four">
            <a className="hp-button hp-button--gold" href="contacto.html">Diseñar nuestra hoja de ruta <Arrow /></a>
            <a className="hp-button hp-button--quiet" href="#capacidades">Explorar capacidades <Arrow diagonal /></a>
          </div>
          <div className="hp-hero__principles hp-hero__entrance hp-hero__entrance--five">
            <div><span>01</span><strong>Una dirección</strong><small>Visión ejecutiva compartida</small></div>
            <div><span>02</span><strong>Una arquitectura</strong><small>Sin silos ni piezas aisladas</small></div>
            <div><span>03</span><strong>Un equipo</strong><small>De la decisión a la ejecución</small></div>
          </div>
        </div>

        <div className="hp-hero__visual hp-hero__entrance hp-hero__entrance--visual">
          <ExecutiveSystem />
        </div>
      </div>
      <div className="hp-hero__index" aria-hidden="true">01 / 05</div>
    </header>
  );
}

function SignalRail() {
  const signals = ["Estrategia", "Arquitectura legal", "IA aplicada", "Automatización", "Capital", "Growth systems"];
  const all = [...signals, ...signals];
  return (
    <div className="hp-signal-rail" aria-label="Áreas de especialidad">
      <div className="hp-signal-rail__track">
        {all.map((signal, index) => <span key={`${signal}-${index}`}>{signal}<i></i></span>)}
      </div>
    </div>
  );
}

function ThesisSection() {
  return (
    <section className="hp-thesis hp-section">
      <div className="hp-container">
        <div className="hp-section-code" data-reveal>01 — Tesis</div>
        <div className="hp-thesis__grid">
          <h2 data-reveal>La empresa no necesita más proveedores. Necesita <em>coherencia.</em></h2>
          <div className="hp-thesis__body" data-reveal>
            <p>Las decisiones legales, tecnológicas y comerciales ya no pueden vivir en habitaciones separadas. Cada una modifica el riesgo, la velocidad y el valor de las demás.</p>
            <p>MEDLA reúne esas capas bajo una sola dirección para que la estrategia no termine en una presentación: termina funcionando.</p>
            <a className="hp-text-link" href="nosotros.html">Conocer nuestra forma de pensar <Arrow /></a>
          </div>
        </div>
        <div className="hp-thesis__principles" data-reveal>
          <div><span>A</span><strong>Criterio antes que herramientas</strong></div>
          <div><span>B</span><strong>Sistema antes que piezas</strong></div>
          <div><span>C</span><strong>Impacto antes que ruido</strong></div>
        </div>
      </div>
    </section>
  );
}

function CapabilitiesSection() {
  return (
    <section className="hp-capabilities hp-section" id="capacidades">
      <div className="hp-container">
        <div className="hp-section-intro">
          <div>
            <div className="hp-section-code" data-reveal>02 — Capacidades</div>
            <h2 data-reveal>Una firma.<br /><em>Siete palancas.</em></h2>
          </div>
          <p data-reveal>Activamos la combinación que exige cada momento de la empresa. Sin departamentos que compiten. Sin estrategia desconectada de la realidad.</p>
        </div>

        <div className="hp-capabilities__grid">
          {capabilities.map((item, index) => (
            <a
              className={`hp-capability ${item.className}`}
              href={item.href}
              key={item.n}
              data-reveal
              style={{ "--delay": `${(index % 3) * 70}ms` }}
            >
              <div className="hp-capability__top">
                <span>{item.n} / {item.eyebrow}</span>
                <Arrow diagonal />
              </div>
              <div className="hp-capability__signal"><i></i>{item.signal}</div>
              <div className="hp-capability__content">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
              <div className="hp-capability__scan" aria-hidden="true"></div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function OperatingModelSection() {
  return (
    <section className="hp-model hp-section" id="modelo">
      <div className="hp-model__ambient" aria-hidden="true"></div>
      <div className="hp-container hp-model__layout">
        <div className="hp-model__intro">
          <div className="hp-section-code hp-section-code--light" data-reveal>03 — Modelo operativo</div>
          <h2 data-reveal>Del criterio a la <em>capacidad instalada.</em></h2>
          <p data-reveal>No llegamos con una receta. Construimos el sistema adecuado con las personas que después deberán operarlo.</p>
          <a className="hp-button hp-button--outline" href="contacto.html" data-reveal>Hablar con dirección <Arrow /></a>
        </div>

        <div className="hp-model__steps">
          {operatingModel.map((step, index) => (
            <article className="hp-model-step" key={step.n} data-reveal style={{ "--delay": `${index * 90}ms` }}>
              <div className="hp-model-step__number">{step.n}</div>
              <div className="hp-model-step__content">
                <span>{step.label}</span>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
                <div className="hp-model-step__output"><i></i> Entregable: {step.output}</div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function DifferenceSection() {
  return (
    <section className="hp-difference hp-section">
      <div className="hp-container">
        <div className="hp-section-code" data-reveal>04 — Diferencia</div>
        <div className="hp-difference__statement" data-reveal>
          <span>El estándar MEDLA</span>
          <h2>No vendemos informes.<br />Diseñamos <em>sistemas de decisión.</em></h2>
        </div>

        <div className="hp-difference__grid">
          <article data-reveal>
            <div className="hp-difference__icon">01</div>
            <h3>Visión multidisciplinar</h3>
            <p>La misma conversación incorpora empresa, regulación, tecnología y mercado.</p>
          </article>
          <article data-reveal style={{ "--delay": "80ms" }}>
            <div className="hp-difference__icon">02</div>
            <h3>Responsabilidad única</h3>
            <p>Un interlocutor coordina la arquitectura completa y protege la coherencia.</p>
          </article>
          <article data-reveal style={{ "--delay": "160ms" }}>
            <div className="hp-difference__icon">03</div>
            <h3>Orientación a ejecución</h3>
            <p>Cada recomendación nace con responsables, secuencia y forma de medirla.</p>
          </article>
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="hp-final-cta hp-section">
      <div className="hp-container">
        <div className="hp-final-cta__card">
          <div className="hp-final-cta__grid" aria-hidden="true"></div>
          <div className="hp-final-cta__orb" aria-hidden="true"></div>
          <div className="hp-final-cta__content">
            <div className="hp-kicker hp-kicker--dark" data-reveal>
              <span>Una conversación ejecutiva</span>
              <small>30 minutos · Sin compromiso</small>
            </div>
            <h2 data-reveal>La próxima ventaja de tu empresa no se compra. <em>Se diseña.</em></h2>
            <p data-reveal>Cuéntanos dónde está la complejidad. Te devolveremos una primera lectura clara de las decisiones que importan.</p>
            <div className="hp-final-cta__actions" data-reveal>
              <a className="hp-button hp-button--ink" href="contacto.html">Solicitar diagnóstico <Arrow /></a>
              <a className="hp-button hp-button--light-quiet" href="https://api.whatsapp.com/send/?phone=34641576772&text=Hola%2C+me+gustar%C3%ADa+hablar+sobre+mi+empresa&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer">WhatsApp <Arrow diagonal /></a>
            </div>
          </div>
          <div className="hp-final-cta__note">Madrid / Proyectos internacionales</div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="hp-footer">
      <div className="hp-container">
        <div className="hp-footer__top">
          <div className="hp-footer__brand">
            <a href="index.html" aria-label="MEDLA Empresas, inicio"><img src="logo.png" alt="MEDLA Empresas" /></a>
            <p>Consultoría empresarial y tecnológica para organizaciones que quieren operar con más criterio, velocidad y control.</p>
          </div>
          <div className="hp-footer__nav">
            <div>
              <h3>Explorar</h3>
              <a href="#capacidades">Capacidades</a>
              <a href="#modelo">Modelo</a>
              <a href="nosotros.html">Firma</a>
              <a href="blog.html">Perspectivas</a>
            </div>
            <div>
              <h3>Contacto</h3>
              <a href="mailto:info@medla-empresas.com">info@medla-empresas.com</a>
              <a href="tel:+34641576772">+34 641 576 772</a>
              <span>Madrid, España</span>
            </div>
          </div>
        </div>
        <div className="hp-footer__bottom">
          <span>© 2026 MEDLA Empresas</span>
          <span>Strategy · Technology · Enterprise</span>
          <span>Aviso de privacidad · Términos</span>
        </div>
      </div>
    </footer>
  );
}

function App() {
  return (
    <>
      <RevealController />
      <Nav />
      <main id="contenido">
        <Hero />
        <SignalRail />
        <ThesisSection />
        <CapabilitiesSection />
        <OperatingModelSection />
        <DifferenceSection />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
