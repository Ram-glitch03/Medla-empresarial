// MEDLA Empresas — bespoke operational intelligence experience
const { useEffect, useReducer, useState } = React;

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

const demoScenarios = [
  {
    id: "contract",
    code: "LEGAL_FLOW_01",
    tab: "Contrato",
    title: "Un contrato entra. El criterio se activa.",
    summary: "Lectura documental, reglas de riesgo y validación humana en un flujo trazable.",
    sources: [
      { name: "INBOX", value: "Proveedor_nuevo.pdf" },
      { name: "POLICY", value: "Matriz jurídica v4" },
      { name: "CRM", value: "Proveedor / Alta" }
    ],
    stages: [
      { name: "Ingesta", detail: "Documento normalizado", code: "doc.parse" },
      { name: "Análisis IA", detail: "Cláusulas y desviaciones", code: "risk.extract" },
      { name: "Control humano", detail: "Revisión jurídica", code: "human.gate" },
      { name: "Registro", detail: "Versión y trazabilidad", code: "audit.write" }
    ],
    output: { title: "Decisión preparada", detail: "Riesgos, responsable y siguiente acción" },
    trace: ["Documento recibido", "7 cláusulas localizadas", "2 revisiones requeridas", "Expediente listo"]
  },
  {
    id: "operations",
    code: "OPS_FLOW_07",
    tab: "Operaciones",
    title: "Una aprobación deja de vivir en el correo.",
    summary: "Datos, política interna y responsables conectados en una secuencia visible.",
    sources: [
      { name: "ERP", value: "Solicitud #1042" },
      { name: "POLICY", value: "Compras / Nivel 2" },
      { name: "TEAM", value: "Finanzas + Operación" }
    ],
    stages: [
      { name: "Captura", detail: "12 campos unificados", code: "intake.map" },
      { name: "Regla", detail: "Política aplicada", code: "rule.check" },
      { name: "Aprobación", detail: "Responsable asignado", code: "owner.route" },
      { name: "Sincronía", detail: "ERP actualizado", code: "system.sync" }
    ],
    output: { title: "Proceso gobernado", detail: "Estado, SLA e historial en un punto" },
    trace: ["Solicitud detectada", "Política validada", "Dirección notificada", "Sistemas sincronizados"]
  },
  {
    id: "knowledge",
    code: "AI_FLOW_03",
    tab: "Conocimiento",
    title: "La IA responde con permiso y con fuente.",
    summary: "Conocimiento privado convertido en una herramienta controlada para el equipo.",
    sources: [
      { name: "DRIVE", value: "Base documental" },
      { name: "ACCESS", value: "Roles y permisos" },
      { name: "QUERY", value: "Pregunta interna" }
    ],
    stages: [
      { name: "Permiso", detail: "Identidad verificada", code: "auth.scope" },
      { name: "Búsqueda", detail: "Contexto relevante", code: "index.retrieve" },
      { name: "Respuesta", detail: "Síntesis con fuentes", code: "answer.ground" },
      { name: "Control", detail: "Feedback registrado", code: "quality.log" }
    ],
    output: { title: "Asistente privado", detail: "Respuesta verificable y acceso gobernado" },
    trace: ["Usuario autorizado", "Fuentes recuperadas", "Respuesta generada", "Control registrado"]
  },
  {
    id: "growth",
    code: "GROWTH_FLOW_04",
    tab: "Crecimiento",
    title: "Cada oportunidad conserva su próximo paso.",
    summary: "Señales comerciales, criterio de prioridad y seguimiento conectados al CRM.",
    sources: [
      { name: "WEB", value: "Nueva conversación" },
      { name: "CRM", value: "Cuenta / Contexto" },
      { name: "SIGNAL", value: "Interés + Encaje" }
    ],
    stages: [
      { name: "Captura", detail: "Contexto reunido", code: "lead.enrich" },
      { name: "Criterio", detail: "Encaje evaluado", code: "fit.score" },
      { name: "Asignación", detail: "Owner y acción", code: "owner.route" },
      { name: "Seguimiento", detail: "CRM actualizado", code: "next.sync" }
    ],
    output: { title: "Pipeline accionable", detail: "Prioridad, responsable y siguiente paso" },
    trace: ["Señal capturada", "Contexto enriquecido", "Responsable asignado", "Seguimiento programado"]
  }
];

const decisionCases = [
  {
    id: "scale",
    code: "CASE / 01",
    label: "La operación no escala",
    signal: "El equipo copia datos, persigue aprobaciones y pregunta por el estado.",
    thesis: "Convertir una secuencia invisible en un proceso gobernado.",
    steps: [
      { n: "01", name: "Observar", owner: "Operaciones", text: "Mapeamos decisiones, esperas y traspasos reales." },
      { n: "02", name: "Diseñar", owner: "Arquitectura", text: "Definimos datos, reglas, responsables y excepciones." },
      { n: "03", name: "Construir", owner: "Desarrollo", text: "Conectamos herramientas y automatizamos el flujo." },
      { n: "04", name: "Gobernar", owner: "Dirección", text: "Dejamos métricas, alertas, permisos y documentación." }
    ],
    stack: ["Process design", "Integraciones", "Automatización", "Control"],
    outputs: ["Mapa de proceso", "Flujo implantado", "Tablero de control"]
  },
  {
    id: "legal",
    code: "CASE / 02",
    label: "El riesgo legal frena decisiones",
    signal: "Contratos, obligaciones y versiones llegan tarde o sin contexto de negocio.",
    thesis: "Hacer que el criterio jurídico forme parte de la operación.",
    steps: [
      { n: "01", name: "Ordenar", owner: "Legal", text: "Reunimos documentos, obligaciones, roles y vencimientos." },
      { n: "02", name: "Priorizar", owner: "Dirección", text: "Traducimos riesgo a decisiones y próximos pasos." },
      { n: "03", name: "Instrumentar", owner: "Tecnología", text: "Creamos plantillas, flujos, avisos y repositorio." },
      { n: "04", name: "Transferir", owner: "Equipo", text: "Dejamos gobierno, responsables y trazabilidad." }
    ],
    stack: ["Legal design", "Documentos", "Alertas", "Gobierno"],
    outputs: ["Matriz de riesgos", "Documentos versionados", "Calendario de control"]
  },
  {
    id: "ai",
    code: "CASE / 03",
    label: "La IA no llega a producción",
    signal: "Hay herramientas y pruebas, pero ningún caso operando con permisos y control.",
    thesis: "Pasar de la demo aislada a una capacidad que el equipo puede usar.",
    steps: [
      { n: "01", name: "Elegir", owner: "Negocio", text: "Priorizamos una tarea con valor, datos y propietario." },
      { n: "02", name: "Proteger", owner: "Legal + IT", text: "Definimos acceso, datos, riesgos y control humano." },
      { n: "03", name: "Construir", owner: "IA", text: "Integramos el modelo, el contexto y las herramientas." },
      { n: "04", name: "Medir", owner: "Dirección", text: "Registramos uso, calidad, incidencias y mejora." }
    ],
    stack: ["AI product", "Datos privados", "Permisos", "Evaluación"],
    outputs: ["Caso de uso activo", "Asistente integrado", "Protocolo de calidad"]
  },
  {
    id: "commercial",
    code: "CASE / 04",
    label: "El crecimiento está disperso",
    signal: "Marketing genera actividad, ventas gestiona oportunidades y dirección no ve el conjunto.",
    thesis: "Conectar posicionamiento, adquisición y pipeline bajo una misma lectura.",
    steps: [
      { n: "01", name: "Enfocar", owner: "Estrategia", text: "Alineamos cliente, problema, oferta y criterio de encaje." },
      { n: "02", name: "Conectar", owner: "Growth", text: "Diseñamos señales, canales y captura de contexto." },
      { n: "03", name: "Activar", owner: "Ventas", text: "Definimos prioridad, responsable y próximo paso." },
      { n: "04", name: "Aprender", owner: "Dirección", text: "Unimos actividad, pipeline y decisiones de mejora." }
    ],
    stack: ["Posicionamiento", "CRM", "Automatización", "Revenue ops"],
    outputs: ["Tesis comercial", "Pipeline gobernado", "Sistema de seguimiento"]
  }
];

const buildStandard = [
  { layer: "Decisión", usual: "Recomendación abierta", medla: "Prioridad, responsable y criterio" },
  { layer: "Construcción", usual: "Se delega al cliente", medla: "Implementación coordinada con el equipo" },
  { layer: "Control", usual: "Seguimiento por reuniones", medla: "Estados, alertas y trazabilidad visibles" },
  { layer: "Transferencia", usual: "Dependencia del proveedor", medla: "Documentación y control en la organización" }
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

function ScrollProgress() {
  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const value = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      document.documentElement.style.setProperty("--hp-scroll", value);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return <div className="hp-scroll-progress" aria-hidden="true"><i></i></div>;
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
            <a href="#sistema">Sistema MEDLA</a>
            <a href="#capacidades">Capacidades</a>
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
              aria-controls="hp-mobile-menu"
              onClick={() => setOpen(!open)}
            >
              <MenuIcon close={open} />
            </button>
          </div>
        </div>
      </nav>

      <div id="hp-mobile-menu" className={`hp-mobile-menu ${open ? "is-open" : ""}`} role="dialog" aria-modal="true" aria-label="Menú de navegación" aria-hidden={!open}>
        <button className="hp-mobile-menu__backdrop" aria-label="Cerrar menú" onClick={closeMenu}></button>
        <div className="hp-mobile-menu__panel">
          <div className="hp-mobile-menu__meta">MEDLA / Navegación</div>
          <div className="hp-mobile-menu__links">
            <a href="#sistema" onClick={closeMenu}><span>01</span> Sistema MEDLA</a>
            <a href="#capacidades" onClick={closeMenu}><span>02</span> Capacidades</a>
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

function demoReducer(state, action) {
  switch (action.type) {
    case "SELECT": return { scenario: action.index, step: 0, running: true };
    case "ADVANCE": return { ...state, step: (state.step + 1) % 4 };
    case "TOGGLE": return { ...state, running: !state.running };
    case "FINISH": return { ...state, step: 3, running: false };
    default: return state;
  }
}

function MedlaOpsLab() {
  const [state, dispatch] = useReducer(demoReducer, { scenario: 0, step: 0, running: true });
  const demo = demoScenarios[state.scenario];

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      dispatch({ type: "FINISH" });
      return undefined;
    }
    if (!state.running) return undefined;
    const timer = window.setInterval(() => dispatch({ type: "ADVANCE" }), 1500);
    return () => window.clearInterval(timer);
  }, [state.running, state.scenario]);

  const selectScenario = (index) => dispatch({ type: "SELECT", index });
  const handleTabKey = (event, index) => {
    if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
    event.preventDefault();
    const direction = event.key === 'ArrowRight' ? 1 : -1;
    const next = (index + direction + demoScenarios.length) % demoScenarios.length;
    selectScenario(next);
    event.currentTarget.parentElement.children[next].focus();
  };
  const moveLight = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--mx", `${((event.clientX - rect.left) / rect.width) * 100}%`);
    event.currentTarget.style.setProperty("--my", `${((event.clientY - rect.top) / rect.height) * 100}%`);
  };

  return (
    <div className="hp-ops-lab" onPointerMove={moveLight} aria-label="Demostración interactiva de un sistema MEDLA">
      <div className="hp-ops-lab__topbar">
        <div><span>M/</span> OPS LAB <b>Entorno simulado</b></div>
        <button type="button" onClick={() => dispatch({ type: "TOGGLE" })} aria-label={state.running ? "Pausar simulación" : "Reanudar simulación"}>
          <i className={state.running ? "is-live" : ""}></i>{state.running ? "LIVE" : "PAUSA"}
        </button>
      </div>

      <div className="hp-ops-lab__tabs" role="tablist" aria-label="Escenarios de demostración">
        {demoScenarios.map((scenario, index) => (
          <button
            type="button"
            role="tab"
            aria-selected={state.scenario === index}
            className={state.scenario === index ? "is-active" : ""}
            key={scenario.id}
            onClick={() => selectScenario(index)}
            onKeyDown={(event) => handleTabKey(event, index)}
          >
            <span>0{index + 1}</span>{scenario.tab}
          </button>
        ))}
      </div>

      <div className="hp-ops-lab__context" role="tabpanel" aria-live="polite">
        <div><span>{demo.code}</span><span>Simulación interactiva · sin datos reales</span></div>
        <h2>{demo.title}</h2>
        <p>{demo.summary}</p>
      </div>

      <div className="hp-ops-lab__diagram">
        <div className="hp-ops-lab__column hp-ops-lab__sources">
          <span className="hp-ops-lab__label">ENTRADAS</span>
          {demo.sources.map((source, index) => (
            <div className={`hp-ops-source ${state.step >= index ? "is-online" : ""}`} key={source.name}>
              <i></i><div><b>{source.name}</b><small>{source.value}</small></div>
            </div>
          ))}
        </div>

        <div className="hp-ops-lab__bus" aria-hidden="true">
          <i></i><i></i><i></i><i></i>
        </div>

        <div className="hp-ops-lab__column hp-ops-lab__pipeline">
          <span className="hp-ops-lab__label">ORQUESTACIÓN</span>
          {demo.stages.map((stage, index) => (
            <div className={`hp-ops-stage ${state.step === index ? "is-active" : ""} ${state.step > index ? "is-complete" : ""}`} key={stage.code}>
              <span>0{index + 1}</span>
              <div><b>{stage.name}</b><small>{stage.detail}</small></div>
              <code>{stage.code}</code>
            </div>
          ))}
        </div>

        <div className="hp-ops-lab__column hp-ops-lab__result">
          <span className="hp-ops-lab__label">SALIDA</span>
          <div className={state.step === 3 ? "is-ready" : ""}>
            <span>{state.step === 3 ? "READY" : "BUILDING"}</span>
            <strong>{demo.output.title}</strong>
            <small>{demo.output.detail}</small>
          </div>
        </div>
      </div>

      <div className="hp-ops-lab__trace" aria-live="polite">
        <span>AUDIT TRACE</span>
        <code>T+00:{String((state.step + 1) * 3).padStart(2, "0")}</code>
        <p><i></i>{demo.trace[state.step]}</p>
        <b>{state.step + 1}/4</b>
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
            <span>Business systems studio · Madrid</span>
            <small>Estrategia / Desarrollo / Transferencia</small>
          </div>
          <h1 className="hp-hero__entrance hp-hero__entrance--two">
            Legal, operaciones, IA y crecimiento. <em>Conectados como un solo sistema.</em>
          </h1>
          <p className="hp-hero__lead hp-hero__entrance hp-hero__entrance--three">
            Entramos donde una decisión cruza varias áreas. Modelamos las reglas, construimos los flujos e integraciones y transferimos el control a tu equipo.
          </p>
          <div className="hp-hero__actions hp-hero__entrance hp-hero__entrance--four">
            <a className="hp-button hp-button--gold" href="contacto.html">Solicitar diagnóstico de 30 min <Arrow /></a>
            <a className="hp-button hp-button--quiet" href="#sistema">Abrir la mesa de intervención <Arrow diagonal /></a>
          </div>
          <div className="hp-hero__principles hp-hero__entrance hp-hero__entrance--five">
            <div><span>01</span><strong>Diagnóstico</strong><small>Dependencias, riesgos y reglas</small></div>
            <div><span>02</span><strong>Desarrollo</strong><small>Flujos, software e integraciones</small></div>
            <div><span>03</span><strong>Transferencia</strong><small>Control, métricas y documentación</small></div>
          </div>
        </div>

        <div className="hp-hero__visual hp-hero__entrance hp-hero__entrance--visual">
          <MedlaOpsLab />
        </div>
      </div>
      <div className="hp-hero__index" aria-hidden="true">01 / 05</div>
    </header>
  );
}

function SignalRail() {
  return (
    <div className="hp-system-rail" aria-label="Estándares del sistema MEDLA">
      <div className="hp-container hp-system-rail__inner">
        <div><code>01 / HUMAN_GATE</code><span>Supervisión humana</span></div>
        <div><code>02 / AUDIT_TRACE</code><span>Trazabilidad por diseño</span></div>
        <div><code>03 / PRIVATE_DATA</code><span>Acceso gobernado</span></div>
        <div><code>04 / TRANSFER</code><span>Control en tu equipo</span></div>
      </div>
    </div>
  );
}

function ThesisSection() {
  const [active, setActive] = useState(0);
  const item = decisionCases[active];
  const choose = (index) => setActive(index);
  const handleKey = (event, index) => {
    if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) return;
    event.preventDefault();
    const direction = ['ArrowDown', 'ArrowRight'].includes(event.key) ? 1 : -1;
    const next = (index + direction + decisionCases.length) % decisionCases.length;
    choose(next);
    event.currentTarget.parentElement.children[next].focus();
  };

  return (
    <section className="hp-decision-room hp-section" id="sistema">
      <div className="hp-container">
        <div className="hp-section-code" data-reveal>01 — Mesa de intervención</div>
        <div className="hp-decision-room__heading">
          <h2 data-reveal>Selecciona el bloqueo.<br /><em>Construimos el sistema delante de ti.</em></h2>
          <div data-reveal>
            <p>No es un cuestionario comercial. Es una demostración de cómo MEDLA convierte una fricción en arquitectura, desarrollo y entregables.</p>
            <small>Escenario interactivo · No utiliza datos de tu empresa</small>
          </div>
        </div>

        <div className="hp-decision-room__shell" data-reveal>
          <div className="hp-decision-room__nav" role="tablist" aria-label="Bloqueos empresariales">
            <div className="hp-decision-room__nav-head"><span>INPUT / BLOCKER</span><span>4 escenarios</span></div>
            {decisionCases.map((decision, index) => (
              <button
                type="button"
                role="tab"
                aria-selected={active === index}
                className={active === index ? "is-active" : ""}
                key={decision.id}
                onClick={() => choose(index)}
                onKeyDown={(event) => handleKey(event, index)}
              >
                <span>0{index + 1}</span>
                <div><strong>{decision.label}</strong><small>{decision.signal}</small></div>
                <i></i>
              </button>
            ))}
          </div>

          <div className="hp-decision-room__workspace" role="tabpanel" aria-live="polite">
            <div className="hp-decision-room__case-head">
              <div><span>{item.code}</span><b>INTERVENTION_MAP</b></div>
              <h3>{item.thesis}</h3>
            </div>
            <div className="hp-decision-room__map">
              {item.steps.map((step, index) => (
                <article key={step.n}>
                  <div className="hp-decision-room__step-head"><span>{step.n}</span><code>{step.owner}</code></div>
                  <strong>{step.name}</strong>
                  <p>{step.text}</p>
                  {index < item.steps.length - 1 && <i aria-hidden="true"></i>}
                </article>
              ))}
            </div>
            <div className="hp-decision-room__bottom">
              <div>
                <span>STACK ACTIVADO</span>
                <p>{item.stack.map((entry) => <b key={entry}>{entry}</b>)}</p>
              </div>
              <div>
                <span>LO QUE QUEDA</span>
                <p>{item.outputs.map((entry, index) => <b key={entry}><i>{index + 1}</i>{entry}</b>)}</p>
              </div>
            </div>
          </div>
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
            <div className="hp-section-code" data-reveal>02 — Arquitectura de capacidades</div>
            <h2 data-reveal>No son servicios aislados.<br /><em>Son capas que se conectan.</em></h2>
          </div>
          <p data-reveal>Legal condiciona el dato. El dato condiciona la automatización. La automatización cambia la operación. MEDLA dirige el conjunto y activa solo las capas necesarias.</p>
        </div>

        <div className="hp-capability-index" data-reveal>
          <div className="hp-capability-index__head">
            <span>CAPA</span><span>CAPACIDAD</span><span>QUÉ CONSTRUIMOS</span><span>OUTPUT</span><span></span>
          </div>
          {capabilities.map((item, index) => (
            <a
              className="hp-capability-row"
              href={item.href}
              key={item.n}
              style={{ "--row": index }}
            >
              <div className="hp-capability-row__code">
                <span>{item.n}</span><i></i><small>{item.eyebrow}</small>
              </div>
              <div className="hp-capability-row__title">
                <small>{item.signal}</small>
                <h3>{item.title}</h3>
              </div>
              <p>{item.desc}</p>
              <div className="hp-capability-row__outputs">
                {item.deliverables.map((deliverable) => <b key={deliverable}>{deliverable}</b>)}
              </div>
              <Arrow diagonal />
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
        <div className="hp-section-code" data-reveal>04 — Build standard</div>
        <div className="hp-difference__statement" data-reveal>
          <span>Cómo se diseña la transferencia</span>
          <h2>La calidad no está solo en la idea. Está en <em>cómo queda construida.</em></h2>
        </div>

        <div className="hp-build-standard" data-reveal>
          <div className="hp-build-standard__head">
            <span>SISTEMA / LAYER</span><span>MODELO CONVENCIONAL</span><span>MEDLA BUILD STANDARD</span>
          </div>
          {buildStandard.map((row, index) => (
            <div className="hp-build-standard__row" key={row.layer}>
              <div><span>0{index + 1}</span><strong>{row.layer}</strong></div>
              <p><i></i>{row.usual}</p>
              <p><i></i>{row.medla}</p>
            </div>
          ))}
          <div className="hp-build-standard__foot">
            <span><i></i> DESIGN FOR OWNERSHIP</span>
            <p>El sistema se diseña para que la organización lo entienda, lo gobierne y lo pueda seguir desarrollando.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  const issues = [
    { id: "operacion", label: "Operación manual", summary: "procesos y aprobaciones que aún dependen de seguimiento manual" },
    { id: "legal", label: "Riesgo legal", summary: "decisiones bloqueadas por contratos, obligaciones o falta de gobierno" },
    { id: "ia", label: "IA sin implantar", summary: "casos de IA que todavía no operan con datos, permisos y control" },
    { id: "growth", label: "Crecimiento disperso", summary: "actividad comercial sin un pipeline y un próximo paso visibles" }
  ];
  const [selectedIssue, setSelectedIssue] = useState(issues[0]);
  const whatsappText = encodeURIComponent(`Hola, quiero hablar con MEDLA. Mi punto de partida es: ${selectedIssue.summary}.`);

  return (
    <section className="hp-final-cta hp-section" id="contacto">
      <div className="hp-container">
        <div className="hp-final-cta__card">
          <div className="hp-final-cta__grid" aria-hidden="true"></div>
          <div className="hp-final-cta__content">
            <div className="hp-kicker hp-kicker--dark" data-reveal>
              <span>Brief composer / 01</span>
              <small>El contexto viaja contigo</small>
            </div>
            <h2 data-reveal>¿Qué está fallando <em>ahora mismo?</em></h2>
            <p data-reveal>Selecciona el punto de partida. La conversación empieza con contexto, no con un formulario vacío.</p>
            <div className="hp-final-cta__actions" data-reveal>
              <a className="hp-button hp-button--ink" href={`contacto.html?context=${selectedIssue.id}`}>Llevar este contexto a MEDLA <Arrow /></a>
              <a className="hp-button hp-button--light-quiet" href={`https://api.whatsapp.com/send/?phone=34641576772&text=${whatsappText}&type=phone_number&app_absent=0`} target="_blank" rel="noopener noreferrer">WhatsApp <Arrow diagonal /></a>
            </div>
          </div>
          <div className="hp-brief-composer" data-reveal style={{ "--delay": "100ms" }}>
            <div className="hp-brief-composer__head"><span>SELECT / STARTING_POINT</span><span>{String(issues.findIndex((issue) => issue.id === selectedIssue.id) + 1).padStart(2, "0")} activo</span></div>
            <div className="hp-brief-composer__options" role="radiogroup" aria-label="Punto de partida">
              {issues.map((issue, index) => (
                <button
                  type="button"
                  role="radio"
                  aria-checked={selectedIssue.id === issue.id}
                  className={selectedIssue.id === issue.id ? "is-selected" : ""}
                  onClick={() => setSelectedIssue(issue)}
                  key={issue.id}
                >
                  <span>0{index + 1}</span>{issue.label}<i></i>
                </button>
              ))}
            </div>
            <div className="hp-brief-composer__summary" aria-live="polite">
              <span>RESUMEN GENERADO</span>
              <p>“Nuestro punto de partida es {selectedIssue.summary}.”</p>
              <div><i></i> Contexto listo para compartir</div>
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
              <a href="#sistema">Sistema MEDLA</a>
              <a href="#capacidades">Capacidades</a>
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
      <ScrollProgress />
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
