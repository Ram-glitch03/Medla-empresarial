// MEDLA Empresas — Nosotros / operating model
const { useEffect, useRef, useState } = React;

const Arrow = () => <span className="nos-arrow" aria-hidden="true">↗</span>;

function NosNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const triggerRef = useRef(null);
  const panelRef = useRef(null);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const panel = panelRef.current;
    const page = document.getElementById("main-content");
    const footer = document.querySelector(".nos-footer");
    const focusable = panel?.querySelectorAll('a[href], button:not([disabled])') || [];
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    page?.setAttribute("inert", "");
    footer?.setAttribute("inert", "");
    first?.focus();

    const onKey = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }
      if (event.key !== "Tab" || focusable.length === 0) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      page?.removeAttribute("inert");
      footer?.removeAttribute("inert");
      triggerRef.current?.focus();
    };
  }, [open]);

  return (
    <>
      <nav className={`nos-nav ${scrolled ? "is-scrolled" : ""}`} aria-label="Navegación principal">
        <div className="nos-shell nos-nav__inner">
          <a className="nos-brand" href="index.html" aria-label="MEDLA Empresas, inicio">
            <img src="logo.png" alt="" />
            <span>Consultoría<br />empresarial</span>
          </a>
          <div className="nos-nav__links" aria-label="Secciones">
            <a href="servicios.html">Servicios</a>
            <a href="nosotros.html" aria-current="page">Nosotros</a>
            <a href="blog.html">Cuadernos</a>
            <a href="contacto.html">Contacto</a>
          </div>
          <a className="nos-nav__cta" href="contacto.html">Plantear un proyecto <Arrow /></a>
          <button className="nos-nav__toggle" type="button" ref={triggerRef} aria-label="Abrir menú" aria-expanded={open} aria-controls="nos-mobile-menu" onClick={() => setOpen(true)}>
            <span /><span />
          </button>
        </div>
      </nav>

      {open && (
        <div className="nos-menu" id="nos-mobile-menu" role="dialog" aria-modal="true" aria-label="Menú de navegación" ref={panelRef}>
          <div className="nos-menu__head">
            <a className="nos-brand" href="index.html" aria-label="MEDLA Empresas, inicio" onClick={() => setOpen(false)}><img src="logo.png" alt="" /></a>
            <button className="nos-menu__close" type="button" aria-label="Cerrar menú" onClick={() => setOpen(false)}>Cerrar <span aria-hidden="true">×</span></button>
          </div>
          <div className="nos-menu__body">
            <span className="nos-kicker">Navegación</span>
            <a href="servicios.html" onClick={() => setOpen(false)}><span>01</span> Servicios</a>
            <a href="nosotros.html" aria-current="page" onClick={() => setOpen(false)}><span>02</span> Nosotros</a>
            <a href="blog.html" onClick={() => setOpen(false)}><span>03</span> Cuadernos</a>
            <a href="contacto.html" onClick={() => setOpen(false)}><span>04</span> Contacto</a>
          </div>
          <div className="nos-menu__foot">
            <a href="mailto:info@medla-empresas.com">info@medla-empresas.com</a>
            <a href="contacto.html" onClick={() => setOpen(false)}>Plantear un proyecto <Arrow /></a>
          </div>
        </div>
      )}
    </>
  );
}

function Hero() {
  return (
    <section className="nos-hero" aria-labelledby="nos-title">
      <div className="nos-hero__field" aria-hidden="true">
        <span className="nos-field__ring nos-field__ring--one" />
        <span className="nos-field__ring nos-field__ring--two" />
        <span className="nos-field__axis nos-field__axis--x" />
        <span className="nos-field__axis nos-field__axis--y" />
        <span className="nos-field__node nos-field__node--one">Legal</span>
        <span className="nos-field__node nos-field__node--two">Tecnología</span>
        <span className="nos-field__node nos-field__node--three">Negocio</span>
        <span className="nos-field__core">MEDLA</span>
      </div>
      <div className="nos-shell nos-hero__inner">
        <div className="nos-hero__meta">
          <span className="nos-kicker">Nosotros / Modelo de trabajo</span>
          <span>Madrid · España</span>
        </div>
        <h1 id="nos-title">Un equipo para dirigir proyectos<br /><em>de negocio, legal y tecnología.</em></h1>
        <div className="nos-hero__bottom">
          <p>Trabajamos con fundadores, pymes y equipos de dirección, coordinando especialistas y entregas con un responsable claro en cada fase.</p>
          <a href="#punto-de-partida">Ver cómo trabajamos <Arrow /></a>
        </div>
      </div>
      <div className="nos-hero__ticker" aria-hidden="true">
        <div><span>REVISIÓN</span><i /> <span>DECISIÓN</span><i /> <span>EJECUCIÓN</span><i /> <span>TRASPASO</span><i /> <span>REVISIÓN</span><i /> <span>DECISIÓN</span><i /> <span>EJECUCIÓN</span><i /> <span>TRASPASO</span><i /></div>
      </div>
    </section>
  );
}

function OpeningStatement() {
  return (
    <section className="nos-opening" id="punto-de-partida">
      <div className="nos-shell nos-opening__inner">
        <span className="nos-section-code">01 / Punto de partida</span>
        <p className="nos-opening__lead">Empezamos por el problema.</p>
        <p className="nos-opening__statement">Aclaramos <em>qué debe resolverse</em>, quién interviene y qué resultado necesita el equipo antes de asignar especialistas o herramientas.</p>
        <div className="nos-opening__note"><span aria-hidden="true">→</span><p>Elegimos las áreas y las herramientas después de acordar prioridades, responsables y resultado.</p></div>
      </div>
    </section>
  );
}

function ResponsibilityDesk() {
  const roles = [
    ["01", "Dirección del encargo", "Mantiene la pregunta, prioriza dependencias y cierra cada decisión antes de abrir la siguiente.", "Decisión y alcance"],
    ["02", "Especialista de disciplina", "Aporta criterio jurídico, técnico, operativo o comercial sobre una versión común del caso.", "Criterio aplicable"],
    ["03", "Responsable del cliente", "Valida hechos, toma las decisiones reservadas al negocio y recibe el traspaso del trabajo.", "Aprobación y continuidad"],
  ];
  return (
    <section className="nos-responsibility" aria-labelledby="responsibility-title">
      <div className="nos-shell">
        <div className="nos-responsibility__head">
          <span className="nos-section-code">02 / Quién responde</span>
          <h2 id="responsibility-title">Siempre sabrás<br /><em>quién responde de cada parte.</em></h2>
          <p>Al iniciar el encargo, cada rol se asigna a una persona concreta. Cada fase mantiene responsable, versión de trabajo y entrega revisable.</p>
        </div>
        <div className="nos-responsibility__desk">
          <article className="nos-responsibility__record">
            <header><span>EJEMPLO / DEC-024</span><b>DEMOSTRACIÓN</b></header>
            <div className="nos-responsibility__stamp" aria-hidden="true"><span>M/</span><small>DECISIÓN</small></div>
            <h3>Condiciones para aprobar el siguiente tramo.</h3>
            <dl><div><dt>Versión</dt><dd>03 · compartida</dd></div><div><dt>Responsable</dt><dd>Dirección del encargo</dd></div><div><dt>Siguiente acción</dt><dd>Validación del cliente</dd></div></dl>
            <footer><i></i> Una decisión · un registro · un responsable</footer>
          </article>
          <div className="nos-responsibility__roles">
            {roles.map(([code, title, text, output]) => <article key={code}><span>{code}</span><div><h3>{title}</h3><p>{text}</p></div><strong>{output}</strong></article>)}
          </div>
        </div>
        <aside className="nos-responsibility__firm" aria-label="Identidad verificada de MEDLA">
          <div>
            <span>Identidad de la firma</span>
            <h3>Responsabilidad empresarial visible.</h3>
            <p>La entidad que recibe el encargo y trata los datos está identificada públicamente. Los perfiles concretos de cada proyecto se confirman al definir el equipo.</p>
          </div>
          <dl>
            <div><dt>Razón social</dt><dd>MEDLA ASESORES, S.L.</dd></div>
            <div><dt>Sede</dt><dd>Móstoles · Madrid · España</dd></div>
            <div><dt>Registro Mercantil</dt><dd>Tomo 46169 · Folio 20 · Hoja M-811076</dd></div>
            <div><dt>Contacto</dt><dd><a href="mailto:info@medla-empresas.com">info@medla-empresas.com</a></dd></div>
          </dl>
          <a href="privacidad.html#responsable">Ver información legal <Arrow /></a>
        </aside>
      </div>
    </section>
  );
}

const disciplines = [
  { id: "direccion", name: "Dirección", code: "01", title: "Convierte una preocupación difusa en una decisión abordable.", copy: "Define la pregunta, separa lo urgente de lo importante y alinea alcance, responsables y criterio de éxito.", output: "Marco de decisión" },
  { id: "legal", name: "Legal", code: "02", title: "Traduce el riesgo en condiciones que el negocio puede aplicar.", copy: "Revisa obligaciones, límites y dependencias para que la solución funcione también fuera del documento.", output: "Condiciones y controles" },
  { id: "tecnologia", name: "Tecnología", code: "03", title: "Da forma operativa a procesos, datos e integraciones.", copy: "Diseña el flujo, construye los componentes necesarios y prueba los puntos donde una operación suele romperse.", output: "Sistema probado" },
  { id: "negocio", name: "Negocio", code: "04", title: "Conecta la solución con clientes, equipo y resultados.", copy: "Ajusta mensajes, seguimiento y métricas para que la mejora tenga un uso claro en el día a día.", output: "Adopción y seguimiento" }
];

function Coordination() {
  const [active, setActive] = useState(0);
  const [horizontalTabs, setHorizontalTabs] = useState(() => window.matchMedia("(max-width: 820px)").matches);
  const tabRefs = useRef([]);
  const selected = disciplines[active];

  useEffect(() => {
    const media = window.matchMedia("(max-width: 820px)");
    const sync = (event) => setHorizontalTabs(event.matches);
    setHorizontalTabs(media.matches);
    media.addEventListener?.("change", sync);
    return () => media.removeEventListener?.("change", sync);
  }, []);

  const onKeyDown = (event, index) => {
    let next = index;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") next = (index + 1) % disciplines.length;
    else if (event.key === "ArrowUp" || event.key === "ArrowLeft") next = (index - 1 + disciplines.length) % disciplines.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = disciplines.length - 1;
    else return;
    event.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <section className="nos-coordination" aria-labelledby="coordination-title">
      <div className="nos-shell">
        <div className="nos-coordination__head">
          <span className="nos-section-code nos-section-code--light">03 / Coordinación</span>
          <h2 id="coordination-title">Especialidades distintas.<br /><em>Una misma mesa.</em></h2>
          <p>Cada proyecto activa solo las disciplinas que necesita. La coordinación mantiene decisiones, dependencias y cambios en un único hilo de trabajo.</p>
        </div>
        <div className="nos-discipline">
          <div className="nos-discipline__tabs" role="tablist" aria-label="Disciplinas coordinadas" aria-orientation={horizontalTabs ? "horizontal" : "vertical"}>
            {disciplines.map((item, index) => (
              <button key={item.id} id={`discipline-tab-${item.id}`} type="button" role="tab" aria-selected={active === index} aria-controls="discipline-panel" tabIndex={active === index ? 0 : -1} ref={(node) => { tabRefs.current[index] = node; }} onClick={() => setActive(index)} onKeyDown={(event) => onKeyDown(event, index)}>
                <span>{item.code}</span>{item.name}<i aria-hidden="true">↗</i>
              </button>
            ))}
          </div>
          <div className="nos-discipline__panel" id="discipline-panel" role="tabpanel" aria-labelledby={`discipline-tab-${selected.id}`}>
            <div className="nos-discipline__signal" aria-hidden="true"><span /><span /><span /><span /><b>{selected.code}</b></div>
            <div className="nos-discipline__copy" key={selected.id}>
              <span className="nos-kicker">{selected.name} / Función</span>
              <h3>{selected.title}</h3>
              <p>{selected.copy}</p>
              <div><span>Salida de trabajo</span><strong>{selected.output}</strong></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const stages = [
  { code: "01", name: "Revisión", title: "Entender antes de prescribir.", copy: "Reunimos las conversaciones, documentos y datos que condicionan la decisión. También hacemos visible lo que aún falta por saber.", output: "Diagnóstico y preguntas abiertas", signal: "ENTENDER" },
  { code: "02", name: "Decisión", title: "Definir qué debe resolverse y con qué límites.", copy: "Acordamos prioridades, alcance, responsables y condiciones de validación. Así cada disciplina trabaja sobre la misma decisión.", output: "Mapa de decisión y plan", signal: "DECIDIR" },
  { code: "03", name: "Ejecución", title: "Construir, contrastar y corregir.", copy: "Desarrollamos la solución por tramos, probamos los casos críticos y registramos los cambios que afectan al conjunto.", output: "Solución validada", signal: "HACER" },
  { code: "04", name: "Transferencia", title: "Traspaso documentado.", copy: "Entregamos documentación, responsables, criterios de mantenimiento y una sesión de traspaso para que el equipo pueda continuar el trabajo.", output: "Operación documentada", signal: "TRANSFERIR" }
];

function Protocol() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef([]);
  const selected = stages[active];
  return (
    <section className="nos-protocol" aria-labelledby="protocol-title">
      <div className="nos-shell">
        <div className="nos-protocol__intro">
          <span className="nos-section-code">04 / Protocolo</span>
          <h2 id="protocol-title">Del problema<br />a una solución <em>que el equipo puede operar y mejorar.</em></h2>
          <p>El recorrido cambia según el proyecto. El principio no: cada fase debe producir una salida que permita tomar la siguiente decisión.</p>
        </div>
        <div className="nos-protocol__workbench">
          <div className="nos-protocol__rail" role="tablist" aria-label="Fases del protocolo">
            {stages.map((stage, index) => (
              <button key={stage.code} type="button" role="tab" aria-selected={active === index} aria-controls="protocol-panel" id={`protocol-tab-${stage.code}`} tabIndex={active === index ? 0 : -1} ref={(node) => { tabRefs.current[index] = node; }} onClick={() => setActive(index)} onKeyDown={(event) => {
                if (event.key !== "ArrowLeft" && event.key !== "ArrowRight" && event.key !== "Home" && event.key !== "End") return;
                event.preventDefault();
                const next = event.key === "Home" ? 0 : event.key === "End" ? stages.length - 1 : event.key === "ArrowRight" ? (index + 1) % stages.length : (index - 1 + stages.length) % stages.length;
                setActive(next);
                tabRefs.current[next]?.focus();
              }}><span>{stage.code}</span>{stage.name}</button>
            ))}
          </div>
          <div className="nos-protocol__panel" id="protocol-panel" role="tabpanel" aria-labelledby={`protocol-tab-${selected.code}`}>
            <div className="nos-protocol__index" aria-hidden="true">{selected.code}</div>
            <div className="nos-protocol__visual" aria-hidden="true"><div className="nos-pulse"><span /><span /><span /><strong>{selected.signal}</strong></div></div>
            <div className="nos-protocol__copy" key={selected.code}>
              <span className="nos-kicker">Fase {selected.code} / {selected.name}</span>
              <h3>{selected.title}</h3>
              <p>{selected.copy}</p>
              <div className="nos-protocol__output"><small>Salida</small><strong>{selected.output}</strong></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Transfer() {
  return (
    <section className="nos-transfer" aria-labelledby="transfer-title">
      <div className="nos-shell nos-transfer__layout">
        <div className="nos-transfer__heading">
          <span className="nos-section-code nos-section-code--light">05 / Transferencia</span>
          <h2 id="transfer-title">El proyecto no acaba<br />en la entrega.</h2>
          <p>La entrega incluye las decisiones tomadas, responsables, documentación operativa y cambios previstos.</p>
        </div>
        <div className="nos-transfer__stack" aria-label="Elementos de una transferencia MEDLA">
          <article><span>01</span><div><small>Qué queda</small><h3>Decisiones y razones</h3><p>Lo acordado, las alternativas descartadas y los límites que siguen vigentes.</p></div></article>
          <article><span>02</span><div><small>Cómo funciona</small><h3>Documentación operativa</h3><p>Flujos, configuraciones y puntos de control explicados para quien los va a usar.</p></div></article>
          <article><span>03</span><div><small>Quién continúa</small><h3>Responsables y siguiente acción</h3><p>Propiedad interna, mantenimiento previsto y próximos hitos sin ambigüedad.</p></div></article>
        </div>
      </div>
    </section>
  );
}

function Principles() {
  const items = [
    ["01", "Problema antes que entregable", "No forzamos una solución conocida sobre una pregunta que aún no está bien formulada."],
    ["02", "Decisiones visibles", "El equipo puede ver qué se decidió, quién lo hizo y qué información sostuvo la elección."],
    ["03", "Responsabilidad clara", "Cada tramo tiene una persona que decide y una siguiente acción concreta."],
    ["04", "Continuidad acordada", "La entrega identifica qué puede operar el equipo, qué mantenimiento requiere y cómo se solicitan los cambios."]
  ];
  return (
    <section className="nos-principles" aria-labelledby="principles-title">
      <div className="nos-shell">
        <div className="nos-principles__head"><span className="nos-section-code">06 / Principios</span><h2 id="principles-title">La forma de trabajar<br /><em>también es parte del resultado.</em></h2></div>
        <div className="nos-principles__list">
          {items.map(([code, title, copy]) => <article key={code}><span>{code}</span><h3>{title}</h3><p>{copy}</p><i aria-hidden="true">↗</i></article>)}
        </div>
      </div>
    </section>
  );
}

function Closing() {
  return (
    <section className="nos-closing" aria-labelledby="closing-title">
      <div className="nos-closing__orbit" aria-hidden="true"><span /><span /><b>MEDLA</b></div>
      <div className="nos-shell nos-closing__inner">
        <span className="nos-kicker">Empezar por la pregunta</span>
        <h2 id="closing-title">Cuéntanos qué necesitas<br /><em>resolver.</em></h2>
        <p>Revisaremos el proyecto contigo y te diremos qué áreas hacen falta, qué conviene priorizar y cuál es el siguiente paso.</p>
        <div className="nos-closing__actions"><a className="nos-button nos-button--signal" href="contacto.html">Solicitar diagnóstico <Arrow /></a><a className="nos-button nos-button--quiet" href="servicios.html">Explorar servicios <Arrow /></a></div>
      </div>
    </section>
  );
}

function NosotrosApp() {
  return <div className="nos-page"><a className="nos-skip" href="#main-content">Saltar al contenido</a><window.MedlaSiteHeader current="about" /><main id="main-content"><Hero /><OpeningStatement /><ResponsibilityDesk /><Coordination /><Protocol /><Transfer /><Principles /><Closing /></main><window.MedlaSiteFooter /></div>;
}

ReactDOM.createRoot(document.getElementById("root")).render(<NosotrosApp />);
