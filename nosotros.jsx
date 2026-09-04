const { useEffect, useRef, useState } = React;

const PROJECT_RHYTHM = [
  { id: "status", code: "01", label: "Estado", title: "Una versión común del proyecto", text: "Objetivo, alcance, progreso, bloqueos y cambios visibles para todas las áreas.", facts: [["Tramo", "Implantación / 02"], ["Progreso", "6 de 8 criterios validados"], ["Próximo cierre", "Viernes · 12:00"]] },
  { id: "decisions", code: "02", label: "Decisiones", title: "Cada decisión deja responsable y razón", text: "Se registra qué se aprobó, qué alternativa se descartó y qué condición sigue pendiente.", facts: [["Abiertas", "2 decisiones"], ["Responsable", "Dirección del cliente"], ["Evidencia", "Expediente DEC-024"]] },
  { id: "risks", code: "03", label: "Riesgos", title: "Los riesgos salen con impacto y tratamiento", text: "Un riesgo no se esconde en una nota: se asigna, se prioriza y se lleva a una decisión.", facts: [["Crítico", "0"], ["En tratamiento", "2"], ["Revisión", "Comité semanal"]] },
  { id: "next", code: "04", label: "Acciones", title: "Cada reunión termina con una siguiente acción", text: "Responsable, fecha y evidencia necesaria para que el proyecto continúe sin perseguir contexto.", facts: [["Esta semana", "7 acciones"], ["Sin responsable", "0"], ["Fuera de plazo", "1"]] },
];

const ROLES = [
  { number: "01", role: "Dirección MEDLA", responsibility: "Mantiene el alcance, ordena dependencias y eleva las decisiones que corresponden al cliente.", authority: "Coordina el mandato" },
  { number: "02", role: "Responsable del cliente", responsibility: "Valida hechos, asigna acceso y toma las decisiones reservadas a la empresa.", authority: "Aprueba decisiones del cliente" },
  { number: "03", role: "Especialista de frente", responsibility: "Aporta criterio jurídico, operativo o técnico sobre la misma versión del proyecto.", authority: "Resuelve su disciplina" },
];

const PHASES = [
  { code: "01", name: "Encaje", verb: "Delimitar", description: "Revisamos decisión, urgencia, áreas implicadas y acceso a responsables, datos y documentos.", closure: "Decisión de encaje" },
  { code: "02", name: "Mandato", verb: "Acordar", description: "La propuesta fija resultado, alcance, autoridad, equipo, calendario, precio y criterios de aceptación.", closure: "Mandato aprobado" },
  { code: "03", name: "Implantación", verb: "Construir", description: "Coordinamos las capacidades necesarias, probamos por tramos y registramos decisiones y cambios.", closure: "Solución validada" },
  { code: "04", name: "Transferencia", verb: "Traspasar", description: "Asignamos propiedad interna, entregamos documentación y acordamos mantenimiento y revisión.", closure: "Control en el equipo" },
];

function Arrow({ diagonal = false }) { return <span className="how-arrow" aria-hidden="true">{diagonal ? "↗" : "→"}</span>; }

function useReveal() {
  useEffect(() => {
    const nodes = [...document.querySelectorAll("[data-how-reveal]")];
    if (!("IntersectionObserver" in window)) { nodes.forEach((node) => node.classList.add("is-visible")); return undefined; }
    document.documentElement.classList.add("how-reveal-ready");
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible"); observer.unobserve(entry.target);
    }), { threshold:.12, rootMargin:"0px 0px -6%" });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
}

function GovernanceBoard() {
  const [active, setActive] = useState(0);
  const item = PROJECT_RHYTHM[active];
  const refs = useRef([]);
  const move = (event,index) => {
    if (!["ArrowLeft","ArrowRight","Home","End"].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === "Home" ? 0 : event.key === "End" ? PROJECT_RHYTHM.length - 1 : (index + (event.key === "ArrowRight" ? 1 : -1) + PROJECT_RHYTHM.length) % PROJECT_RHYTHM.length;
    setActive(next); refs.current[next]?.focus();
  };
  return <div className="how-board" aria-label="Ejemplo interactivo del gobierno de un proyecto">
    <header><div><i />PROYECTO / SEMANA 03</div><span>VISTA COMPARTIDA</span></header>
    <div className="how-board__summary"><span>MANDATO DEMOSTRATIVO</span><h2>Implantar el alta digital de proveedores.</h2><div><b>EN EJECUCIÓN</b><small>Sin bloqueo crítico</small></div></div>
    <div className="how-board__tabs" role="tablist" aria-label="Lecturas del proyecto">
      {PROJECT_RHYTHM.map((entry,index) => <button key={entry.id} ref={(node) => { refs.current[index] = node; }} type="button" role="tab" id={`rhythm-tab-${entry.id}`} aria-controls="rhythm-panel" aria-selected={active === index} tabIndex={active === index ? 0 : -1} onClick={() => setActive(index)} onKeyDown={(event) => move(event,index)}><span>{entry.code}</span>{entry.label}<i /></button>)}
    </div>
    <article id="rhythm-panel" role="tabpanel" aria-labelledby={`rhythm-tab-${item.id}`} key={item.id}>
      <div><span>{item.code} / {item.label}</span><h3>{item.title}</h3><p>{item.text}</p></div>
      <dl>{item.facts.map(([label,value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
    </article>
    <footer><span><i />Responsable MEDLA</span><span><i />Responsable cliente</span><span><i />Próximo cierre</span></footer>
  </div>;
}

function Hero() {
  return <header className="how-hero">
    <div className="how-shell how-hero__layout">
      <div className="how-hero__copy">
        <div className="how-overline"><span>Cómo trabajamos</span><small>Gobierno · ejecución · transferencia</small></div>
        <h1>Así se dirige un proyecto MEDLA: <em>con alcance, responsables y decisiones visibles.</em></h1>
        <p>Un mandato común, una persona responsable de coordinarlo y un sistema de trabajo que permite a dirección saber qué está decidido, qué falta y quién debe actuar.</p>
        <div className="how-actions"><a className="how-button how-button--gold" href="contacto.html?context=proyecto">Plantear un proyecto <Arrow /></a><a className="how-text-link" href="#gobierno">Ver el gobierno del encargo <Arrow /></a></div>
      </div>
      <GovernanceBoard />
    </div>
  </header>;
}

function MandateAnatomy() {
  const fields = [
    ["01", "Resultado", "Qué debe quedar decidido, implantado o transferido."],
    ["02", "Alcance", "Qué entra, qué queda fuera y cómo se gestionan los cambios."],
    ["03", "Autoridad", "Quién puede aprobar, priorizar y resolver una excepción."],
    ["04", "Equipo", "Qué capacidad activa MEDLA y qué responsabilidad conserva el cliente."],
    ["05", "Evidencia", "Qué entregable o prueba permite aceptar cada tramo."],
    ["06", "Continuidad", "Quién opera, mantiene y mejora la solución después del cierre."],
  ];
  return <section className="how-anatomy" id="gobierno" aria-labelledby="anatomy-title">
    <div className="how-shell">
      <div className="how-section-head" data-how-reveal><span>01 / ANTES DE EMPEZAR</span><h2 id="anatomy-title">El mandato convierte una necesidad abierta <em>en un encargo gobernable.</em></h2><p>Estas seis definiciones aparecen en la propuesta y se confirman antes de iniciar la implantación.</p></div>
      <div className="how-anatomy__list">{fields.map(([number,title,text]) => <article key={number} data-how-reveal><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
      <aside data-how-reveal><span>DEFINICIÓN</span><p><strong>Mandato de dirección:</strong> objetivo, alcance, autoridad, responsables y criterio de cierre acordados con el cliente.</p></aside>
    </div>
  </section>;
}

function Roles() {
  return <section className="how-roles" aria-labelledby="roles-title">
    <div className="how-shell">
      <div className="how-section-head how-section-head--dark" data-how-reveal><span>02 / QUIÉN RESPONDE</span><h2 id="roles-title">Tres funciones distintas. <em>Ninguna responsabilidad difusa.</em></h2><p>La propuesta identifica la dirección del proyecto, las funciones asignadas, su dedicación y su autoridad.</p></div>
      <div className="how-role-list">{ROLES.map((role) => <article key={role.number} data-how-reveal><span>{role.number}</span><div><small>FUNCIÓN</small><h3>{role.role}</h3></div><p>{role.responsibility}</p><strong><i />{role.authority}</strong></article>)}</div>
      <div className="how-roles__note" data-how-reveal><span>Regla de gobierno</span><p>La dirección MEDLA coordina el trabajo. Las decisiones reservadas al negocio siguen perteneciendo al cliente y quedan identificadas desde el inicio.</p></div>
    </div>
  </section>;
}

function Protocol() {
  return <section className="how-protocol" aria-labelledby="protocol-title">
    <div className="how-shell how-protocol__layout">
      <div className="how-protocol__intro" data-how-reveal><span>03 / RECORRIDO</span><h2 id="protocol-title">Cada fase cierra una decisión <em>antes de abrir la siguiente.</em></h2><p>El calendario cambia según el alcance. La secuencia de gobierno se mantiene para que la complejidad no quede oculta tras tareas sueltas.</p></div>
      <ol>{PHASES.map((phase,index) => <li key={phase.code} data-how-reveal><span>{phase.code}</span><div><small>{phase.name}</small><h3>{phase.verb}</h3><p>{phase.description}</p></div><strong><i />{phase.closure}</strong>{index < PHASES.length-1 && <b aria-hidden="true" />}</li>)}</ol>
    </div>
  </section>;
}

function WorkingCadence() {
  const cadence = [
    ["Arranque", "Objetivo, alcance, derechos de decisión y primer tramo confirmados."],
    ["Seguimiento", "Estado, bloqueos, riesgos, cambios y siguiente cierre en una lectura común."],
    ["Puertas de decisión", "La dirección aprueba únicamente cuando existe evidencia suficiente."],
    ["Cierre", "Aceptación, propiedad interna, documentación y revisión posterior acordadas."],
  ];
  return <section className="how-cadence" aria-labelledby="cadence-title">
    <div className="how-shell how-cadence__layout">
      <div data-how-reveal><span>04 / RITMO DE TRABAJO</span><h2 id="cadence-title">Una cadencia orientada <em>a cierres verificables.</em></h2><p>La frecuencia se ajusta al proyecto y a la disponibilidad de quienes deben decidir.</p></div>
      <div className="how-cadence__track" data-how-reveal>{cadence.map(([title,text],index) => <article key={title}><span>0{index+1}</span><h3>{title}</h3><p>{text}</p>{index<cadence.length-1 && <i />}</article>)}</div>
    </div>
  </section>;
}

function Transfer() {
  const items = [
    ["Decisiones", "Qué se aprobó, por qué y qué condiciones siguen vigentes."],
    ["Sistema", "Configuración, fuentes, permisos, límites y criterios de recuperación."],
    ["Operación", "Responsables internos, manual, mantenimiento y cambios pendientes."],
    ["Revisión", "Fecha, métricas y preguntas para comprobar que la solución sigue funcionando."],
  ];
  return <section className="how-transfer" aria-labelledby="transfer-title">
    <div className="how-shell">
      <div className="how-section-head" data-how-reveal><span>05 / TRANSFERENCIA</span><h2 id="transfer-title">El control queda <em>dentro de la empresa.</em></h2><p>La transferencia forma parte del alcance; no es una explicación improvisada al final.</p></div>
      <div className="how-transfer__record" data-how-reveal><header><span>EXPEDIENTE DE CIERRE</span><b>CONTROL TRANSFERIDO</b></header>{items.map(([title,text],index) => <article key={title}><span>0{index+1}</span><h3>{title}</h3><p>{text}</p><i aria-hidden="true">✓</i></article>)}<footer><span>Responsable interno asignado</span><span>Documentación aceptada</span><span>Próxima revisión acordada</span></footer></div>
    </div>
  </section>;
}

function Identity() {
  return <aside className="how-identity"><div className="how-shell how-identity__layout" data-how-reveal><div><span>RESPONSABILIDAD EMPRESARIAL</span><h2>La entidad que recibe el encargo está identificada.</h2><p>La propuesta identifica además la dirección del proyecto y los perfiles previstos para cada frente.</p></div><dl><div><dt>Razón social</dt><dd>MEDLA ASESORES, S.L.</dd></div><div><dt>Sede</dt><dd>Móstoles · Madrid · España</dd></div><div><dt>Registro</dt><dd>Tomo 46169 · Folio 20 · Hoja M-811076</dd></div><div><dt>Contacto</dt><dd><a href="mailto:info@medla-empresas.com">info@medla-empresas.com</a></dd></div></dl><a href="contacto.html?context=proyecto">Plantear un proyecto <Arrow /></a></div></aside>;
}

function NosotrosApp() {
  useReveal();
  return <div className="how-page"><window.MedlaSiteHeader current="about" /><main id="main-content"><Hero /><MandateAnatomy /><Roles /><Protocol /><WorkingCadence /><Transfer /><Identity /></main><window.MedlaSiteFooter current="about" /></div>;
}

ReactDOM.createRoot(document.getElementById("root")).render(<NosotrosApp />);
