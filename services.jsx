const { useEffect, useRef, useState } = React;

const SERVICES = [
  {
    id: "legal", num: "01", label: "Legal", icon: "legal", title: "Asesoría legal y gobierno corporativo",
    statement: "Convertimos una decisión de negocio en contratos, acuerdos y controles que el equipo puede ejecutar.",
    trigger: "Un acuerdo, una contratación o una operación necesita respaldo jurídico antes de avanzar.",
    intervention: "Revisión de hechos y documentos, definición de riesgos y preparación de la documentación aplicable.",
    outcome: "Una decisión documentada, responsables claros y próximos pasos comprensibles.",
    scope: ["Contratos mercantiles", "Gobierno societario", "Coordinación documental", "Obligaciones aplicables"], href: "asesoria-legal.html",
  },
  {
    id: "constitucion", num: "02", label: "Societario", icon: "constitucion", title: "Constitución y estructura societaria",
    statement: "Diseñamos la base societaria para que propiedad, administración y operación no se contradigan después.",
    trigger: "Una nueva sociedad o un cambio de socios exige ordenar roles, capital y reglas de decisión.",
    intervention: "Definición de la estructura, preparación documental y coordinación de los trámites necesarios.",
    outcome: "Una sociedad preparada para operar con una arquitectura entendible por socios y administración.",
    scope: ["Diseño societario", "Pactos y estatutos", "Órganos de administración", "Cambios estructurales"], href: "constitucion.html",
  },
  {
    id: "inversiones", num: "03", label: "Finanzas", icon: "inversiones", title: "Preparación financiera y de inversión",
    statement: "Ordenamos información, escenarios y materiales para decidir con rigor; no prometemos rentabilidades.",
    trigger: "La dirección necesita valorar una oportunidad, preparar financiación o presentar el negocio con claridad.",
    intervention: "Estructuración de datos, supuestos, escenarios y documentación para el proceso de decisión.",
    outcome: "Un dossier trazable que permite comparar alternativas y formular mejores preguntas.",
    scope: ["Modelos y escenarios", "Documentación para inversión", "Preparación de procesos", "Apoyo a la decisión"], href: "inversiones.html",
  },
  {
    id: "digitalizacion", num: "04", label: "Sistemas", icon: "digitalizacion", title: "Digitalización de operaciones",
    statement: "Pasamos procesos dispersos a un sistema compartido, visible y mantenible por el equipo.",
    trigger: "La información vive en correos, hojas y herramientas que no comparten contexto.",
    intervention: "Mapa del proceso actual, diseño del flujo objetivo e implantación por etapas.",
    outcome: "Una operación con estados visibles, datos consistentes y menos dependencia de tareas manuales.",
    scope: ["Mapeo de procesos", "Arquitectura de información", "Portales y herramientas", "Integraciones operativas"], href: "digitalizacion.html",
  },
  {
    id: "automatizacion", num: "05", label: "Automatización", icon: "automatizacion", title: "Automatización de flujos",
    statement: "Conectamos tareas repetitivas sin convertir la operación en una caja negra difícil de mantener.",
    trigger: "El equipo replica datos, persigue aprobaciones o ejecuta pasos previsibles de forma manual.",
    intervention: "Priorización, diseño de reglas, integración, registro de excepciones y puesta en producción.",
    outcome: "Un flujo observable con responsables humanos allí donde la decisión lo requiere.",
    scope: ["Aprobaciones", "Notificaciones", "Sincronización de datos", "Control de excepciones"], href: "automatizacion.html",
  },
  {
    id: "ia", num: "06", label: "IA aplicada", icon: "ia", title: "Agentes de IA para trabajo real",
    statement: "Diseñamos asistentes con fuentes, límites y revisión humana; útiles dentro de un proceso concreto.",
    trigger: "Existe una tarea intensiva en información que necesita velocidad sin perder criterio ni control.",
    intervention: "Definición del caso, fuentes autorizadas, herramientas, evaluaciones y reglas de escalado.",
    outcome: "Un agente acotado, evaluable y conectado al trabajo que debe asistir.",
    scope: ["Asistentes internos", "Consulta documental", "Clasificación y extracción", "Evaluación y control"], href: "agentes.html",
  },
  {
    id: "social", num: "07", label: "Captación y CRM", icon: "social", title: "Posicionamiento, captación y CRM",
    statement: "Traducimos el valor de la empresa en una narrativa que clientes, talento y socios pueden entender.",
    trigger: "La empresa hace un trabajo sólido, pero su mercado no percibe con claridad qué la diferencia.",
    intervention: "Arquitectura de mensajes, sistema editorial, producción y aprendizaje a partir de la respuesta.",
    outcome: "Una presencia coherente que demuestra criterio con hechos, formatos y una voz reconocible.",
    scope: ["Narrativa de marca", "Sistema editorial", "Contenido ejecutivo", "Medición y aprendizaje"], href: "redes-sociales.html",
  },
  {
    id: "jotform", num: "08", label: "Jotform", icon: "digitalizacion", title: "Soluciones sobre Jotform",
    statement: "Creamos formularios y portales que capturan datos útiles y activan el siguiente paso del proceso.",
    trigger: "La recogida de información genera errores, duplicados o demasiado trabajo posterior.",
    intervention: "Diseño de campos y lógica, experiencia de usuario, integraciones, pruebas y documentación.",
    outcome: "Una entrada de datos más clara, conectada y lista para operar dentro del sistema existente.",
    scope: ["Formularios avanzados", "Portales", "Firmas y aprobaciones", "Integraciones"], href: "jotform.html",
  },
];

const BLOCKERS = [
  {
    id: "operacion",
    label: "El trabajo se atasca entre correos, hojas y aprobaciones",
    title: "Primero hacemos visible el recorrido completo.",
    text: "Mapeamos estados, responsables, datos y excepciones antes de conectar herramientas. Así sabemos qué automatizar y qué debe seguir siendo una decisión humana.",
    services: ["digitalizacion", "automatizacion", "jotform"],
    context: "digitalizacion",
  },
  {
    id: "acuerdo",
    label: "Hay un acuerdo, una sociedad o una obligación que desbloquear",
    title: "El documento tiene que describir la operación real.",
    text: "Reunimos hechos, límites comerciales y evidencia disponible para que la decisión jurídica no avance separada del trabajo que debe sostener.",
    services: ["legal", "constitucion"],
    context: "legal",
  },
  {
    id: "capital",
    label: "Necesitamos comparar una inversión o preparar financiación",
    title: "Separamos datos, supuestos y condiciones de cierre.",
    text: "Construimos escenarios trazables y una documentación que permita discutir la decisión sin convertir una proyección en una promesa.",
    services: ["inversiones", "legal"],
    context: "inversiones",
  },
  {
    id: "ia",
    label: "Queremos aplicar IA sin abrir una caja negra",
    title: "La tarea manda; el modelo viene después.",
    text: "Definimos fuentes, permisos, formato de salida, evaluación y ruta de escalado. Después conectamos el agente al proceso que realmente debe asistir.",
    services: ["ia", "digitalizacion", "automatizacion"],
    context: "ia",
  },
  {
    id: "crecimiento",
    label: "La captación no termina en un seguimiento claro",
    title: "Unimos promesa, dato y próxima acción comercial.",
    text: "Ordenamos el mensaje, el punto de entrada y el traspaso al CRM para que cada oportunidad conserve contexto y tenga responsable.",
    services: ["social", "jotform", "automatizacion"],
    context: "crecimiento",
  },
];

function useMenu() {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef(null);
  const triggerRef = useRef(null);
  useEffect(() => {
    if (!open) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const main = document.getElementById("main");
    const footer = document.querySelector(".inner-footer");
    if (main) main.inert = true;
    if (footer) footer.inert = true;
    const dialog = dialogRef.current;
    const focusable = dialog ? [...dialog.querySelectorAll('a[href], button:not([disabled])')] : [];
    focusable[0]?.focus();
    const onKey = (event) => {
      if (event.key === "Escape") setOpen(false);
      if (event.key !== "Tab" || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      if (main) main.inert = false;
      if (footer) footer.inert = false;
      triggerRef.current?.focus();
    };
  }, [open]);
  return { open, setOpen, dialogRef, triggerRef };
}

function ServicesNav() {
  const { open, setOpen, dialogRef, triggerRef } = useMenu();
  return <>
    <a className="skip-link" href="#main">Saltar al contenido</a>
    <header className="inner-nav">
      <a className="inner-brand" href="index.html" aria-label="MEDLA — Inicio"><img src="logo.png" alt="" /></a>
      <nav className="inner-links" aria-label="Navegación principal">
        <a className="is-current" href="servicios.html" aria-current="page">Servicios</a><a href="nosotros.html">Nosotros</a><a href="blog.html">Cuadernos</a><a href="contacto.html">Contacto</a>
      </nav>
      <a className="inner-contact" href="contacto.html">Plantear una decisión <span>↗</span></a>
      <button ref={triggerRef} className="inner-menu-trigger" type="button" aria-label="Abrir menú" aria-expanded={open} aria-controls="services-mobile-menu" onClick={() => setOpen(true)}><span /><span /></button>
    </header>
    {open && <div className="inner-menu" id="services-mobile-menu" role="dialog" aria-modal="true" aria-label="Menú principal" ref={dialogRef}>
      <div className="inner-menu-top"><span>MEDLA / Navegación</span><button type="button" aria-label="Cerrar menú" onClick={() => setOpen(false)}>Cerrar ×</button></div>
      <nav aria-label="Navegación móvil" onClick={() => setOpen(false)}><a href="servicios.html">01 <strong>Servicios</strong></a><a href="nosotros.html">02 <strong>Nosotros</strong></a><a href="blog.html">03 <strong>Cuadernos</strong></a><a href="contacto.html">04 <strong>Contacto</strong></a></nav>
      <p>Madrid · España<br />info@medla-empresas.com</p>
    </div>}
  </>;
}

function Constellation() {
  const points = [[150, 74], [345, 58], [526, 120], [594, 255], [514, 392], [318, 430], [126, 378], [62, 222]];
  return <div className="svc-constellation" aria-hidden="true">
    <svg viewBox="0 0 660 500"><defs><radialGradient id="svc-halo"><stop offset="0" stopColor="#a9f3c1" stopOpacity=".2" /><stop offset="1" stopColor="#a9f3c1" stopOpacity="0" /></radialGradient></defs>
      <circle className="const-halo" cx="330" cy="250" r="178" fill="url(#svc-halo)" /><circle className="const-orbit const-orbit-a" cx="330" cy="250" r="190" /><circle className="const-orbit const-orbit-b" cx="330" cy="250" r="122" />
      {points.map(([x, y], index) => <g key={index}><line className="const-line" x1="330" y1="250" x2={x} y2={y} /><circle className="const-pulse" cx={x} cy={y} r="14" style={{ animationDelay: `${index * -0.38}s` }} /><circle className="const-node" cx={x} cy={y} r="4" /><text className="const-label" x={x + (x < 330 ? -17 : 17)} y={y - 14} textAnchor={x < 330 ? "end" : "start"}>{SERVICES[index].label}</text></g>)}
      <g className="const-core"><circle cx="330" cy="250" r="45" /><text x="330" y="246" textAnchor="middle">MEDLA</text><text x="330" y="264" textAnchor="middle">SYSTEM</text></g>
    </svg>
    <div className="const-readout"><span>08 capacidades</span><span>01 expediente compartido</span></div>
  </div>;
}

function ServicesHero() {
  return <section className="svc-hero" aria-labelledby="svc-title">
    <div className="svc-hero-noise" /><div className="svc-hero-copy"><p className="svc-kicker"><span>Servicios</span> / Arquitectura empresarial</p>
      <h1 id="svc-title">Una decisión.<br />Las disciplinas<br /><em>que necesita.</em></h1>
      <p className="svc-hero-lead">MEDLA reúne trabajo jurídico, operativo, tecnológico y comercial alrededor del mismo problema. El objetivo no es vender más piezas: es evitar que se contradigan.</p>
      <div className="svc-hero-actions"><a className="svc-button svc-button-primary" href="#explorador">Abrir el mapa <span>↓</span></a><a className="svc-text-link" href="contacto.html">Traer una decisión <span>↗</span></a></div>
    </div><Constellation /><div className="svc-hero-index" aria-hidden="true">S / 08</div>
  </section>;
}

function DecisionRouter() {
  const [active, setActive] = useState(0);
  const current = BLOCKERS[active];
  const recommended = current.services.map((id) => SERVICES.find((service) => service.id === id)).filter(Boolean);

  return <section className="svc-router" aria-labelledby="router-title">
    <div className="svc-router-head">
      <p className="svc-kicker"><span>Orientador</span> / Empieza por el bloqueo</p>
      <h2 id="router-title">No hace falta que sepas<br /><em>qué servicio pedir.</em></h2>
      <p>Elige la frase que más se parece a tu situación. Te mostramos por dónde empezar y qué capacidades podrían intervenir después.</p>
    </div>
    <div className="svc-router-workbench">
      <div className="svc-router-questions" role="tablist" aria-label="Bloqueos habituales">
        {BLOCKERS.map((blocker, index) => <button key={blocker.id} id={`blocker-tab-${blocker.id}`} type="button" role="tab" aria-selected={active === index} aria-controls="blocker-panel" tabIndex={active === index ? 0 : -1} onClick={() => setActive(index)} onKeyDown={(event) => {
          if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) return;
          event.preventDefault();
          const next = event.key === "Home" ? 0 : event.key === "End" ? BLOCKERS.length - 1 : (index + (event.key === "ArrowDown" ? 1 : -1) + BLOCKERS.length) % BLOCKERS.length;
          setActive(next);
          event.currentTarget.parentElement.querySelectorAll('[role="tab"]')[next]?.focus();
        }}><span>{String(index + 1).padStart(2, "0")}</span><strong>{blocker.label}</strong><i aria-hidden="true">→</i></button>)}
      </div>
      <article key={current.id} id="blocker-panel" className="svc-router-result" role="tabpanel" aria-labelledby={`blocker-tab-${current.id}`}>
        <div className="svc-router-result-code"><span>RUTA / {String(active + 1).padStart(2, "0")}</span><i>Orientación inicial</i></div>
        <h3>{current.title}</h3>
        <p>{current.text}</p>
        <div className="svc-router-capabilities"><span>Capacidades que pueden intervenir</span>{recommended.map((service) => <a key={service.id} href={service.href}><b>{service.num}</b>{service.label}<i aria-hidden="true">↗</i></a>)}</div>
        <a className="svc-button svc-button-primary" href={`contacto.html?context=${current.context}`}>Continuar con este contexto <span>↗</span></a>
      </article>
    </div>
  </section>;
}

function ServiceExplorer() {
  const [active, setActive] = useState(0);
  const [t, setT] = useState(0);
  const [horizontalRail, setHorizontalRail] = useState(() => window.matchMedia("(max-width: 760px)").matches);
  const tabRefs = useRef([]);
  const visualRef = useRef(null);
  const current = SERVICES[active];
  const Scene = Scenes[current.icon] || Scenes.legal;
  useEffect(() => {
    const media = window.matchMedia("(max-width: 760px)");
    const sync = (event) => setHorizontalRail(event.matches);
    setHorizontalRail(media.matches);
    media.addEventListener?.("change", sync);
    return () => media.removeEventListener?.("change", sync);
  }, []);
  useEffect(() => {
    const visual = visualRef.current;
    if (!visual || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    let visible = false; let raf = 0; let last = 0;
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }, { threshold: 0.05 });
    observer.observe(visual);
    const tick = (now) => { if (visible && now - last > 33) { setT(now / 1000); last = now; } raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    return () => { observer.disconnect(); cancelAnimationFrame(raf); };
  }, []);
  useEffect(() => {
    if (!horizontalRail) return;
    tabRefs.current[active]?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [active, horizontalRail]);
  const choose = (index, focus = false) => { setActive(index); if (focus) tabRefs.current[index]?.focus(); };
  const onTabKeyDown = (event, index) => {
    let next = index;
    if (["ArrowDown", "ArrowRight"].includes(event.key)) next = (index + 1) % SERVICES.length;
    else if (["ArrowUp", "ArrowLeft"].includes(event.key)) next = (index - 1 + SERVICES.length) % SERVICES.length;
    else if (event.key === "Home") next = 0; else if (event.key === "End") next = SERVICES.length - 1; else return;
    event.preventDefault(); choose(next, true);
  };
  return <section className="svc-explorer" id="explorador" aria-labelledby="explorer-title">
    <div className="svc-section-intro"><p className="svc-kicker"><span>Mapa de capacidades</span> / Selecciona una disciplina</p><h2 id="explorer-title">Cada capacidad resuelve una parte.<br /><em>El expediente se comparte.</em></h2><p>Un frente puede activarse por separado. Si el encargo cruza varias áreas, documentos, responsables y decisiones avanzan sobre la misma versión.</p></div>
    <div className="svc-explorer-shell">
      <div className="svc-rail" role="tablist" aria-label="Servicios MEDLA" aria-orientation={horizontalRail ? "horizontal" : "vertical"}>
        {SERVICES.map((service, index) => <button key={service.id} id={`tab-${service.id}`} ref={(node) => { tabRefs.current[index] = node; }} type="button" className={index === active ? "is-active" : ""} role="tab" aria-selected={index === active} aria-controls="service-panel" tabIndex={index === active ? 0 : -1} onClick={() => choose(index)} onKeyDown={(event) => onTabKeyDown(event, index)}><span>{service.num}</span><strong>{service.label}</strong><i>↗</i></button>)}
      </div>
      <article key={current.id} className="svc-panel" id="service-panel" role="tabpanel" aria-labelledby={`tab-${current.id}`} tabIndex="0">
        <div className="svc-panel-top"><div className="svc-panel-title"><p>{current.num} / {current.label}</p><h3>{current.title}</h3><strong>{current.statement}</strong></div><div className="svc-scene" ref={visualRef} aria-hidden="true"><Scene t={t} /></div></div>
        <dl className="svc-decision-flow"><div><dt>El bloqueo</dt><dd>{current.trigger}</dd></div><div><dt>La intervención</dt><dd>{current.intervention}</dd></div><div><dt>Lo que queda</dt><dd>{current.outcome}</dd></div></dl>
        <div className="svc-panel-bottom"><ul aria-label="Ámbitos incluidos">{current.scope.map((item) => <li key={item}>{item}</li>)}</ul><a className="svc-button svc-button-dark" href={current.href}>Ver capacidad <span>↗</span></a></div>
      </article>
    </div>
  </section>;
}

function Orchestration() {
  return <section className="svc-orchestration" aria-labelledby="orchestration-title"><div className="svc-orch-heading"><p className="svc-kicker"><span>Coordinación</span> / Un método visible</p><h2 id="orchestration-title">No basta con reunir especialistas. <em>Hay que diseñar el relevo.</em></h2></div>
    <div className="svc-orch-track"><article><span>01</span><h3>Decisión</h3><p>Definimos qué debe ocurrir, qué puede bloquearlo y quién tiene la última palabra.</p></article><div className="svc-orch-signal"><i /><i /><i /></div><article><span>02</span><h3>Implantación</h3><p>Traducimos la decisión a documentación, herramientas, reglas y puntos de control.</p></article><div className="svc-orch-signal"><i /><i /><i /></div><article><span>03</span><h3>Traspaso</h3><p>Entregamos decisiones, manuales y responsables para que el equipo pueda operar y revisar el trabajo.</p></article></div>
  </section>;
}

function ServicesCta() {
  return <section className="svc-cta" aria-labelledby="svc-cta-title"><div><p className="svc-kicker"><span>Siguiente paso</span> / Primera revisión</p><h2 id="svc-cta-title">Cuéntanos qué está bloqueado,<br /><em>quién interviene y qué debe quedar resuelto.</em></h2></div><div className="svc-cta-side"><p>Con esos datos podemos revisar qué capacidad hace falta, qué conviene priorizar y qué información necesitamos antes de empezar.</p><a className="svc-button svc-button-primary" href="contacto.html">Abrir conversación <span>↗</span></a></div></section>;
}

function ServicesFooter() {
  return <footer className="inner-footer"><a className="inner-footer-brand" href="index.html"><img src="logo.png" alt="MEDLA Empresas" /></a><div><span>Servicios</span><a href="servicios.html">Mapa de capacidades</a><a href="contacto.html">Plantear una decisión</a></div><div><span>Compañía</span><a href="nosotros.html">Cómo trabajamos</a><a href="blog.html">Cuadernos</a></div><div><span>Contacto</span><a href="mailto:info@medla-empresas.com">info@medla-empresas.com</a><a href="tel:+34641576772">+34 641 576 772</a></div><div className="inner-footer-base"><span>© 2026 MEDLA Empresas</span><a href="privacidad.html">Privacidad</a><span>Madrid · España</span></div></footer>;
}

function ServicesApp() {
  return <div className="svc-page"><ServicesNav /><main id="main"><ServicesHero /><DecisionRouter /><ServiceExplorer /><Orchestration /><ServicesCta /></main><ServicesFooter /></div>;
}

ReactDOM.createRoot(document.getElementById("root")).render(<ServicesApp />);
