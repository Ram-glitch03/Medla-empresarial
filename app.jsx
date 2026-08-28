// MEDLA Empresas — Executive Intelligence experience
const { useEffect, useState } = React;

const capabilities = [
  {
    n: "01",
    eyebrow: "Estructura",
    title: "Contratos, sociedades y riesgos bajo control",
    desc: "Revisamos la estructura, priorizamos riesgos y dejamos documentos, responsables y fechas de cumplimiento.",
    href: "asesoria-legal.html",
    className: "hp-capability--lead",
    signal: "Legal y corporativo",
    deliverables: ["Contratos", "Compliance", "Gobierno"]
  },
  {
    n: "02",
    eyebrow: "Inteligencia",
    title: "IA aplicada a una tarea concreta",
    desc: "Creamos asistentes privados para consultar documentación, clasificar información o apoyar al equipo comercial.",
    href: "jotform.html",
    className: "hp-capability--dark",
    signal: "IA útil",
    deliverables: ["Asistentes", "Flujos", "Documentación"]
  },
  {
    n: "03",
    eyebrow: "Capital",
    title: "Decisiones de inversión mejor preparadas",
    desc: "Ordenamos vehículos, escenarios y documentación para evaluar opciones y conversar con inversores con claridad.",
    href: "inversiones.html",
    className: "",
    signal: "Capital",
    deliverables: ["Escenarios", "Vehículos", "Dossier"]
  },
  {
    n: "04",
    eyebrow: "Puesta en marcha",
    title: "Una empresa lista para operar",
    desc: "Definimos la forma societaria y coordinamos documentos, registros y pasos de puesta en marcha.",
    href: "constitucion.html",
    className: "",
    signal: "Constitución",
    deliverables: ["Sociedad", "Pactos", "Operativa inicial"]
  },
  {
    n: "05",
    eyebrow: "Operaciones",
    title: "Procesos y datos en un mismo flujo",
    desc: "Mapeamos la operación, conectamos herramientas y organizamos la información que dirección necesita para decidir.",
    href: "digitalizacion.html",
    className: "hp-capability--wide",
    signal: "Operación conectada",
    deliverables: ["Mapa de procesos", "Integraciones", "Datos"]
  },
  {
    n: "06",
    eyebrow: "Eficiencia",
    title: "Menos tareas manuales, más seguimiento",
    desc: "Automatizamos avisos, aprobaciones y traspasos de información con trazabilidad y supervisión humana.",
    href: "automatizacion.html",
    className: "",
    signal: "Automatización",
    deliverables: ["Flujos", "Alertas", "Seguimiento"]
  },
  {
    n: "07",
    eyebrow: "Crecimiento",
    title: "Ventas con pipeline y próximo paso",
    desc: "Alineamos oferta, mensajes, canales y seguimiento para que cada oportunidad tenga responsable y acción clara.",
    href: "redes-sociales.html",
    className: "hp-capability--accent",
    signal: "Sistema comercial",
    deliverables: ["Posicionamiento", "Pipeline", "Seguimiento"]
  }
];

const operatingModel = [
  {
    n: "01",
    label: "Diagnóstico ejecutivo",
    title: "Identificamos el problema real",
    desc: "Localizamos bloqueos, dependencias y riesgos. También definimos qué no conviene hacer todavía para proteger foco y recursos.",
    output: "Mapa de decisiones y prioridades"
  },
  {
    n: "02",
    label: "Hoja de ruta",
    title: "Convertimos prioridad en un plan ejecutable",
    desc: "Definimos secuencia, responsables, riesgos, herramientas, presupuesto y forma de medir el avance.",
    output: "Plan, responsables y calendario"
  },
  {
    n: "03",
    label: "Implementación y transferencia",
    title: "Lo construimos con tu equipo",
    desc: "Implementamos, coordinamos especialistas, documentamos y dejamos a dirección con visibilidad y control sobre lo implantado.",
    output: "Solución operando y documentada"
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
            <span className="hp-brand__descriptor">Consultoría<br />empresarial</span>
          </a>

          <div className="hp-nav__links">
            <a href="#situaciones">Qué resolvemos</a>
            <a href="#capacidades">Entregables</a>
            <a href="#modelo">Cómo trabajamos</a>
            <a href="nosotros.html">Firma</a>
          </div>

          <div className="hp-nav__actions">
            <span className="hp-nav__location"><i></i> Madrid · Europa</span>
            <a className="hp-nav__cta" href="contacto.html">Solicitar diagnóstico <Arrow /></a>
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
            <a href="#situaciones" onClick={closeMenu}><span>01</span> Qué resolvemos</a>
            <a href="#capacidades" onClick={closeMenu}><span>02</span> Entregables</a>
            <a href="#modelo" onClick={closeMenu}><span>03</span> Cómo trabajamos</a>
            <a href="nosotros.html" onClick={closeMenu}><span>04</span> Firma</a>
          </div>
          <a className="hp-button hp-button--gold" href="contacto.html">Solicitar diagnóstico de 30 min <Arrow /></a>
          <div className="hp-mobile-menu__foot">Legal · Operaciones · IA · Crecimiento</div>
        </div>
      </div>
    </>
  );
}

function TransformationBrief() {
  const streams = [
    { n: "01", area: "Legal", task: "Contratos y riesgos", status: "Prioridad" },
    { n: "02", area: "Operaciones", task: "Procesos y datos", status: "Mapear" },
    { n: "03", area: "IA", task: "Asistente documental", status: "Validar" },
    { n: "04", area: "Comercial", task: "Pipeline y seguimiento", status: "Activar" }
  ];

  return (
    <div className="hp-brief" aria-label="Ejemplo de una intervención de MEDLA">
      <div className="hp-brief__topbar">
        <div><span>M/</span> Ejemplo de intervención</div>
        <div className="hp-brief__confidential">Documento ejecutivo · 01</div>
      </div>
      <div className="hp-brief__body">
        <div className="hp-brief__case">
          <div>
            <span>Situación</span>
            <small>Empresa en crecimiento</small>
          </div>
          <h2>El negocio avanza.<br /><em>La operación no escala.</em></h2>
          <div className="hp-brief__chips">
            <span>Dirección saturada</span>
            <span>Procesos manuales</span>
            <span>Proveedores desconectados</span>
          </div>
        </div>
        <div className="hp-brief__streams">
          <div className="hp-brief__streams-head"><span>Frentes coordinados</span><span>Próximo paso</span></div>
          {streams.map((stream) => (
            <div className="hp-brief__stream" key={stream.n}>
              <span>{stream.n}</span>
              <div><strong>{stream.area}</strong><small>{stream.task}</small></div>
              <i></i>
              <b>{stream.status}</b>
            </div>
          ))}
        </div>
        <div className="hp-brief__result">
          <span>Lo que recibe dirección</span>
          <strong>Una hoja de ruta ejecutable</strong>
          <small>Prioridades · Responsables · Calendario · Seguimiento</small>
        </div>
      </div>
      <div className="hp-brief__footer">
        <span><i></i> Confidencialidad desde el primer contacto</span>
        <span>MEDLA / Madrid</span>
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
            <span>Consultoría empresarial, legal y tecnológica</span>
            <small>Estrategia + implantación</small>
          </div>
          <h1 className="hp-hero__entrance hp-hero__entrance--two">
            Ponemos en orden lo que está frenando el <em>crecimiento de tu empresa.</em>
          </h1>
          <p className="hp-hero__lead hp-hero__entrance hp-hero__entrance--three">
            Revisamos estructura legal, procesos, datos y sistema comercial. Diseñamos una única hoja de ruta e implantamos automatización e IA donde aportan valor real.
          </p>
          <div className="hp-hero__actions hp-hero__entrance hp-hero__entrance--four">
            <a className="hp-button hp-button--gold" href="contacto.html">Solicitar diagnóstico de 30 min <Arrow /></a>
            <a className="hp-button hp-button--quiet" href="#situaciones">Ver qué resolvemos <Arrow diagonal /></a>
          </div>
          <div className="hp-hero__principles hp-hero__entrance hp-hero__entrance--five">
            <div><span>01</span><strong>Control legal</strong><small>Contratos, riesgos y obligaciones</small></div>
            <div><span>02</span><strong>Operación conectada</strong><small>Procesos, datos y automatizaciones</small></div>
            <div><span>03</span><strong>Crecimiento visible</strong><small>Oferta, pipeline y seguimiento</small></div>
          </div>
        </div>

        <div className="hp-hero__visual hp-hero__entrance hp-hero__entrance--visual">
          <TransformationBrief />
        </div>
      </div>
      <div className="hp-hero__index" aria-hidden="true">01 / 05</div>
    </header>
  );
}

function SignalRail() {
  const signals = ["Contratos claros", "Procesos automatizados", "IA útil", "Gobierno corporativo", "Ventas con sistema", "Decisiones con datos"];
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
  const problems = [
    "Decisiones con información incompleta",
    "Procesos manuales que consumen al equipo",
    "Contratos y riesgos que llegan tarde",
    "Legal, tecnología y ventas sin coordinación"
  ];
  const outputs = [
    "Diagnóstico ejecutivo priorizado",
    "Decisiones, responsables y calendario",
    "Contratos, procesos o automatizaciones implantados",
    "Tablero de seguimiento",
    "Documentación para que el equipo lo opere"
  ];

  return (
    <section className="hp-problems hp-section" id="situaciones">
      <div className="hp-container">
        <div className="hp-section-code" data-reveal>01 — Cuándo intervenir</div>
        <div className="hp-problems__heading">
          <h2 data-reveal>Cuando la empresa crece, <em>los parches dejan de funcionar.</em></h2>
          <p data-reveal>Entramos cuando una decisión afecta a más de un área y nadie está coordinando el conjunto.</p>
        </div>

        <div className="hp-problems__layout">
          <div className="hp-problem-list" data-reveal>
            <div className="hp-problem-list__top"><span>Señales que vemos</span><span>04 síntomas</span></div>
            {problems.map((problem, index) => (
              <div className="hp-problem" key={problem}>
                <span>0{index + 1}</span>
                <strong>{problem}</strong>
                <i></i>
              </div>
            ))}
          </div>

          <aside className="hp-output-board" data-reveal style={{ "--delay": "100ms" }}>
            <div className="hp-output-board__eyebrow"><span>M/</span> Lo que recibe dirección</div>
            <h3>No solo una recomendación. Un cambio que se puede operar.</h3>
            <div className="hp-output-board__list">
              {outputs.map((output, index) => (
                <div key={output}><span>{String(index + 1).padStart(2, "0")}</span>{output}</div>
              ))}
            </div>
            <a className="hp-text-link hp-text-link--light" href="#modelo">Ver cómo lo implantamos <Arrow /></a>
          </aside>
        </div>

        <div className="hp-proof-strip" data-reveal>
          <div><span>01</span><strong>Un interlocutor</strong><small>Una dirección para todos los frentes</small></div>
          <div><span>02</span><strong>Todo por escrito</strong><small>Entregables, responsables y siguientes pasos</small></div>
          <div><span>03</span><strong>Con tu equipo</strong><small>Implementación y transferencia de control</small></div>
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
            <div className="hp-section-code" data-reveal>02 — Qué ponemos en marcha</div>
            <h2 data-reveal>Problemas concretos.<br /><em>Entregables claros.</em></h2>
          </div>
          <p data-reveal>Activamos solo las capacidades necesarias para resolver el bloqueo. Cada intervención termina en documentos, procesos, automatizaciones o herramientas que tu equipo puede usar.</p>
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
                <div className="hp-capability__deliverables">
                  <span>Entregamos</span>
                  <div>{item.deliverables.map((deliverable) => <b key={deliverable}>{deliverable}</b>)}</div>
                </div>
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
          <div className="hp-section-code hp-section-code--light" data-reveal>03 — Cómo trabajamos</div>
          <h2 data-reveal>De un problema real a una <em>solución operando.</em></h2>
          <p data-reveal>Primero protegemos el foco. Después construimos con las personas que deberán tomar decisiones y operar lo implantado.</p>
          <a className="hp-button hp-button--outline" href="contacto.html" data-reveal>Traer un problema a la mesa <Arrow /></a>
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
    <section className="hp-difference hp-section" id="resultado">
      <div className="hp-container">
        <div className="hp-section-code" data-reveal>04 — El estándar MEDLA</div>
        <div className="hp-difference__statement" data-reveal>
          <span>Lo que cambia al terminar</span>
          <h2>Tu equipo no recibe una presentación. Recibe una empresa <em>mejor operada.</em></h2>
        </div>

        <div className="hp-difference__grid">
          <article data-reveal>
            <div className="hp-difference__icon">01</div>
            <h3>Decisiones priorizadas</h3>
            <p>Dirección sabe qué resolver primero, qué puede esperar y qué riesgo protege cada decisión.</p>
          </article>
          <article data-reveal style={{ "--delay": "80ms" }}>
            <div className="hp-difference__icon">02</div>
            <h3>Soluciones implantadas</h3>
            <p>Los documentos, integraciones y flujos quedan construidos, probados y conectados a la operación.</p>
          </article>
          <article data-reveal style={{ "--delay": "160ms" }}>
            <div className="hp-difference__icon">03</div>
            <h3>Control transferido</h3>
            <p>El equipo recibe responsables, documentación y visibilidad para continuar sin dependencia innecesaria.</p>
          </article>
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="hp-final-cta hp-section" id="contacto">
      <div className="hp-container">
        <div className="hp-final-cta__card">
          <div className="hp-final-cta__grid" aria-hidden="true"></div>
          <div className="hp-final-cta__orb" aria-hidden="true"></div>
          <div className="hp-final-cta__content">
            <div className="hp-kicker hp-kicker--dark" data-reveal>
              <span>Empieza por la fricción más importante</span>
              <small>30 minutos · Un problema real</small>
            </div>
            <h2 data-reveal>Dinos qué no está funcionando. <em>Te diremos por dónde empezar.</em></h2>
            <p data-reveal>Trae un proceso atascado, un riesgo legal, una automatización pendiente o un sistema comercial que no escala. Si encajamos, te propondremos una forma concreta de trabajar.</p>
            <div className="hp-final-cta__actions" data-reveal>
              <a className="hp-button hp-button--ink" href="contacto.html">Solicitar diagnóstico de 30 min <Arrow /></a>
              <a className="hp-button hp-button--light-quiet" href="https://api.whatsapp.com/send/?phone=34641576772&text=Hola%2C+me+gustar%C3%ADa+hablar+sobre+mi+empresa&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer">Escribir por WhatsApp <Arrow diagonal /></a>
            </div>
          </div>
          <div className="hp-final-cta__note">Primera conversación sin compromiso · Confidencialidad desde el inicio</div>
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
            <p>Consultoría empresarial, legal y tecnológica para convertir decisiones complejas en soluciones que ya están funcionando.</p>
          </div>
          <div className="hp-footer__nav">
            <div>
              <h3>Explorar</h3>
              <a href="#situaciones">Qué resolvemos</a>
              <a href="#capacidades">Entregables</a>
              <a href="#modelo">Cómo trabajamos</a>
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
          <span>Legal · Operaciones · IA · Crecimiento</span>
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
