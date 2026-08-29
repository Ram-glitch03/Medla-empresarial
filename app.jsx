// MEDLA Empresas — bespoke operational intelligence experience
const { useEffect, useReducer, useRef, useState } = React;

const capabilities = [
  {
    n: "01",
    eyebrow: "Legal",
    title: "Contratos, sociedades y riesgos",
    desc: "Revisamos lo que existe, señalamos prioridades y dejamos los documentos al día, con responsables y vencimientos claros.",
    href: "asesoria-legal.html",
    className: "hp-capability--lead",
    signal: "Legal y corporativo",
    deliverables: ["Contratos", "Cumplimiento", "Gobierno"]
  },
  {
    n: "02",
    eyebrow: "Inteligencia artificial",
    title: "IA para tareas concretas",
    desc: "Desarrollamos asistentes conectados a fuentes autorizadas para consultar documentos, clasificar información o apoyar al equipo comercial.",
    href: "agentes.html",
    className: "hp-capability--dark",
    signal: "IA aplicada",
    deliverables: ["Asistentes", "Integraciones", "Guía de uso"]
  },
  {
    n: "03",
    eyebrow: "Inversión",
    title: "Estructura y documentación para inversión",
    desc: "Ordenamos la estructura societaria, construimos escenarios y preparamos la documentación para evaluar una operación o presentarla a inversores.",
    href: "inversiones.html",
    className: "",
    signal: "Capital",
    deliverables: ["Escenarios", "Vehículos", "Dossier"]
  },
  {
    n: "04",
    eyebrow: "Societario",
    title: "Constitución de sociedades",
    desc: "Definimos la forma societaria y coordinamos estatutos, pactos, registro y primeros trámites operativos.",
    href: "constitucion.html",
    className: "",
    signal: "Constitución",
    deliverables: ["Estructura societaria", "Pactos", "Primeros trámites"]
  },
  {
    n: "05",
    eyebrow: "Operaciones",
    title: "Procesos, herramientas y datos",
    desc: "Revisamos cómo trabaja el equipo, conectamos las herramientas y consolidamos los datos que dirección necesita para decidir.",
    href: "digitalizacion.html",
    className: "hp-capability--wide",
    signal: "Procesos e integraciones",
    deliverables: ["Mapa de procesos", "Integraciones", "Indicadores"]
  },
  {
    n: "06",
    eyebrow: "Automatización",
    title: "Automatización con control",
    desc: "Automatizamos avisos, aprobaciones y movimientos de información, con registro y revisión cuando haga falta.",
    href: "automatizacion.html",
    className: "",
    signal: "Automatización",
    deliverables: ["Flujos", "Alertas", "Seguimiento"]
  },
  {
    n: "07",
    eyebrow: "Comercial",
    title: "Captación, CRM y seguimiento comercial",
    desc: "Definimos la oferta y el criterio de cualificación, conectamos la captación con el CRM y asignamos cada oportunidad con responsable y próxima acción.",
    href: "redes-sociales.html",
    className: "hp-capability--accent",
    signal: "Sistema comercial",
    deliverables: ["Posicionamiento", "CRM", "Seguimiento comercial"]
  },
  {
    n: "08",
    eyebrow: "Captura de datos",
    title: "Formularios y portales sobre Jotform",
    desc: "Diseñamos la captura, validación y entrega de datos para que cada respuesta active el siguiente paso del proceso.",
    href: "jotform.html",
    className: "",
    signal: "Jotform e integraciones",
    deliverables: ["Formularios", "Validaciones", "Integraciones"]
  }
];

const operatingModel = [
  {
    n: "01",
    label: "Primera revisión",
    title: "Revisamos el problema antes de definir la solución",
    desc: "Hablamos con las personas implicadas, revisamos datos y documentación e identificamos decisiones, dependencias, riesgos y tiempos de espera.",
    output: "Diagnóstico y prioridades acordadas"
  },
  {
    n: "02",
    label: "Diseño",
    title: "Definimos alcance, responsables y secuencia de trabajo",
    desc: "Definimos qué se hará, qué no, quién decide, cuánto esfuerzo requiere y cómo comprobaremos el resultado.",
    output: "Plan de trabajo y calendario"
  },
  {
    n: "03",
    label: "Desarrollo y entrega",
    title: "Desarrollamos, probamos y transferimos la solución",
    desc: "Construimos con el equipo, validamos los casos críticos y entregamos configuración, documentación y criterios de mantenimiento.",
    output: "Solución implantada, probada y documentada"
  }
];

const demoScenarios = [
  {
    id: "contract",
    code: "CASO 01 / CONTRATOS",
    tab: "Contrato",
    title: "Revisión de un contrato con criterios de riesgo definidos.",
    summary: "El documento se contrasta con tus criterios de riesgo. La revisión jurídica valida las excepciones y el expediente queda registrado.",
    sources: [
      { name: "DOCUMENTO", value: "Proveedor_nuevo.pdf" },
      { name: "CRITERIO", value: "Matriz jurídica v4" },
      { name: "EXPEDIENTE", value: "Proveedor / Alta" }
    ],
    stages: [
      { name: "Ingesta", detail: "Documento normalizado", code: "doc.parse" },
      { name: "Análisis IA", detail: "Cláusulas y desviaciones", code: "risk.extract" },
      { name: "Control humano", detail: "Revisión jurídica", code: "human.gate" },
      { name: "Registro", detail: "Versión y trazabilidad", code: "audit.write" }
    ],
    output: { title: "Contrato listo para decidir", detail: "Riesgos señalados, responsable y próxima acción" },
    trace: ["Documento recibido", "7 cláusulas localizadas", "2 revisiones requeridas", "Expediente listo"]
  },
  {
    id: "operations",
    code: "CASO 02 / OPERACIONES",
    tab: "Operaciones",
    title: "Una aprobación sin cadenas de correos.",
    summary: "La solicitud se registra una vez; el flujo aplica la política interna y la envía a la persona que debe resolverla.",
    sources: [
      { name: "ERP", value: "Solicitud #1042" },
      { name: "POLÍTICA", value: "Compras / Nivel 2" },
      { name: "EQUIPO", value: "Finanzas + Operación" }
    ],
    stages: [
      { name: "Captura", detail: "12 campos unificados", code: "intake.map" },
      { name: "Regla", detail: "Política aplicada", code: "rule.check" },
      { name: "Aprobación", detail: "Responsable asignado", code: "owner.route" },
      { name: "Sincronización", detail: "ERP actualizado", code: "system.sync" }
    ],
    output: { title: "Aprobación resuelta y registrada", detail: "Estado, plazo e historial visibles" },
    trace: ["Solicitud detectada", "Política validada", "Dirección notificada", "Sistemas sincronizados"]
  },
  {
    id: "knowledge",
    code: "CASO 03 / CONOCIMIENTO",
    tab: "Conocimiento",
    title: "Un asistente que responde solo con información autorizada.",
    summary: "Busca en la documentación interna, cita la fuente y respeta los permisos de cada persona.",
    sources: [
      { name: "ARCHIVO", value: "Base documental" },
      { name: "ACCESO", value: "Roles y permisos" },
      { name: "CONSULTA", value: "Pregunta interna" }
    ],
    stages: [
      { name: "Permiso", detail: "Identidad verificada", code: "auth.scope" },
      { name: "Búsqueda", detail: "Contexto relevante", code: "index.retrieve" },
      { name: "Respuesta", detail: "Síntesis con fuentes", code: "answer.ground" },
      { name: "Control", detail: "Evaluación registrada", code: "quality.log" }
    ],
    output: { title: "Respuesta comprobable", detail: "Fuente, permiso y registro de uso" },
    trace: ["Usuario autorizado", "Fuentes recuperadas", "Respuesta generada", "Control registrado"]
  },
  {
    id: "growth",
    code: "CASO 04 / VENTAS",
    tab: "Crecimiento",
    title: "Cada oportunidad queda asignada y con una próxima acción.",
    summary: "La información llega al CRM, se prioriza y asigna sin perder el contexto.",
    sources: [
      { name: "WEB", value: "Nueva conversación" },
      { name: "CRM", value: "Cuenta / Contexto" },
      { name: "SEÑAL", value: "Interés + Encaje" }
    ],
    stages: [
      { name: "Captura", detail: "Contexto reunido", code: "lead.enrich" },
      { name: "Criterio", detail: "Encaje evaluado", code: "fit.score" },
      { name: "Asignación", detail: "Responsable y acción", code: "owner.route" },
      { name: "Seguimiento", detail: "CRM actualizado", code: "next.sync" }
    ],
    output: { title: "Seguimiento preparado", detail: "Prioridad, responsable y próxima acción" },
    trace: ["Señal capturada", "Contexto enriquecido", "Responsable asignado", "Seguimiento programado"]
  }
];

const decisionCases = [
  {
    id: "scale",
    code: "EJEMPLO / 01",
    label: "El proceso depende de seguimiento manual",
    signal: "El equipo copia datos, persigue aprobaciones y pregunta por el estado.",
    thesis: "Un flujo con estado, responsable y plazo visibles.",
    steps: [
      { n: "01", name: "Observar", owner: "Operaciones", text: "Mapeamos decisiones, esperas y traspasos reales." },
      { n: "02", name: "Diseñar", owner: "Arquitectura", text: "Definimos datos, reglas, responsables y excepciones." },
      { n: "03", name: "Construir", owner: "Desarrollo", text: "Conectamos herramientas y automatizamos el flujo." },
      { n: "04", name: "Gobernar", owner: "Dirección", text: "Dejamos métricas, alertas, permisos y documentación." }
    ],
    stack: ["Diseño del proceso", "Integraciones", "Automatización", "Control"],
    outputs: ["Mapa de proceso", "Flujo implantado", "Tablero de control"]
  },
  {
    id: "legal",
    code: "EJEMPLO / 02",
    label: "El riesgo legal frena decisiones",
    signal: "Los contratos y obligaciones se revisan tarde, o con versiones y contexto dispersos.",
    thesis: "El criterio legal, disponible cuando hay que decidir.",
    steps: [
      { n: "01", name: "Ordenar", owner: "Legal", text: "Reunimos documentos, obligaciones, roles y vencimientos." },
      { n: "02", name: "Priorizar", owner: "Dirección", text: "Clasificamos cada riesgo por impacto, responsable y plazo." },
      { n: "03", name: "Implantar", owner: "Tecnología", text: "Creamos plantillas, flujos, avisos y repositorio." },
      { n: "04", name: "Transferir", owner: "Equipo", text: "Dejamos gobierno, responsables y trazabilidad." }
    ],
    stack: ["Criterio legal", "Documentos", "Avisos", "Gobierno"],
    outputs: ["Matriz de riesgos", "Documentos versionados", "Calendario de control"]
  },
  {
    id: "ai",
    code: "EJEMPLO / 03",
    label: "Los pilotos de IA no se integran en el trabajo diario",
    signal: "Hay herramientas y pruebas, pero ningún caso funciona aún con datos, permisos y control definidos.",
    thesis: "Un caso acotado, integrado y medible.",
    steps: [
      { n: "01", name: "Elegir", owner: "Negocio", text: "Priorizamos una tarea con valor, datos y propietario." },
      { n: "02", name: "Proteger", owner: "Legal + Sistemas", text: "Definimos acceso, datos, riesgos y control humano." },
      { n: "03", name: "Construir", owner: "IA", text: "Conectamos el modelo con las fuentes autorizadas y el flujo de trabajo." },
      { n: "04", name: "Medir", owner: "Dirección", text: "Registramos uso, calidad, incidencias y oportunidades de mejora." }
    ],
    stack: ["Diseño del caso", "Fuentes autorizadas", "Permisos", "Evaluación"],
    outputs: ["Caso de uso activo", "Asistente integrado", "Protocolo de calidad"]
  },
  {
    id: "commercial",
    code: "EJEMPLO / 04",
    label: "Marketing, CRM y ventas trabajan sin una lectura común",
    signal: "Marketing genera actividad, ventas gestiona oportunidades y dirección no ve el conjunto.",
    thesis: "Una sola lectura desde el primer contacto hasta la venta.",
    steps: [
      { n: "01", name: "Enfocar", owner: "Estrategia", text: "Alineamos cliente, problema, oferta y criterio de encaje." },
      { n: "02", name: "Conectar", owner: "Marketing", text: "Diseñamos señales, canales y captura de contexto." },
      { n: "03", name: "Activar", owner: "Ventas", text: "Definimos prioridad, responsable y próximo paso." },
      { n: "04", name: "Aprender", owner: "Dirección", text: "Unimos actividad, oportunidades y decisiones de mejora." }
    ],
    stack: ["Oferta", "CRM", "Seguimiento", "Operaciones de venta"],
    outputs: ["Propuesta y criterio de encaje", "Oportunidades con responsable", "Sistema de seguimiento"]
  }
];

const buildStandard = [
  { layer: "Decisiones", clarity: "Qué se ha priorizado y por qué", owned: "Responsable, criterio y próxima revisión" },
  { layer: "Desarrollo", clarity: "Qué hace la solución y qué no", owned: "Configuración, integraciones y repositorio entregados" },
  { layer: "Control", clarity: "Cómo se detecta un problema", owned: "Estados, alertas e historial" },
  { layer: "Continuidad", clarity: "Quién puede mantenerlo", owned: "Manual, responsables y criterios de cambio" }
];

const worldBridgeRoutes = [
  { id: "intake", number: "01", short: "Información", label: "Correos · documentos · bloqueos", color: "#56849a" },
  { id: "dossier", number: "02", short: "Criterio", label: "Versión válida · criterio · decisión", color: "#557a61" },
  { id: "action", number: "03", short: "Acción", label: "Responsable · plazo · siguiente paso", color: "#9d8246" }
];

function Arrow({ diagonal = false }) {
  return (
    <svg className="hp-arrow" viewBox="0 0 20 20" aria-hidden="true">
      {diagonal ? <path d="M5 15 15 5M7 5h8v8" /> : <path d="M3 10h13M11 5l5 5-5 5" />}
    </svg>
  );
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    query.addEventListener?.("change", update);
    return () => query.removeEventListener?.("change", update);
  }, []);

  return reduced;
}

function SignatureField({ id, light = false }) {
  const reducedMotion = useReducedMotion();
  const mainPath = `medla-flow-${id}`;
  const secondPath = `medla-flow-secondary-${id}`;
  const gradient = `medla-gradient-${id}`;

  return (
    <svg className={`hp-signature-field ${light ? "hp-signature-field--light" : ""}`} viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id={gradient} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={light ? "#080a0f" : "#8bc7ee"} stopOpacity="0" />
          <stop offset=".28" stopColor={light ? "#080a0f" : "#a9f3c1"} stopOpacity=".68" />
          <stop offset=".72" stopColor={light ? "#4e5f4e" : "#d5b76c"} stopOpacity=".54" />
          <stop offset="1" stopColor={light ? "#080a0f" : "#8bc7ee"} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path id={mainPath} className="hp-signature-field__line hp-signature-field__line--main" d="M-60 690C170 690 180 238 405 238S560 690 720 690 820 238 1042 238s234 452 458 452" stroke={`url(#${gradient})`} />
      <path id={secondPath} className="hp-signature-field__line hp-signature-field__line--secondary" d="M-80 752C162 752 218 318 408 318S570 752 720 752 842 318 1035 318s236 434 488 434" stroke={`url(#${gradient})`} />
      <path className="hp-signature-field__line hp-signature-field__line--ghost" d="M-40 612C190 612 150 166 402 166S548 612 720 612 818 166 1056 166s218 446 440 446" stroke={`url(#${gradient})`} />
      <g className="hp-signature-field__nodes">
        <circle cx="405" cy="238" r="4" /><circle cx="720" cy="690" r="4" /><circle cx="1042" cy="238" r="4" />
      </g>
      {!reducedMotion && (
        <>
          <circle className="hp-signature-field__packet" r="5">
            <animateMotion dur="8s" repeatCount="indefinite" rotate="auto"><mpath href={`#${mainPath}`} /></animateMotion>
          </circle>
          <circle className="hp-signature-field__packet hp-signature-field__packet--two" r="3">
            <animateMotion dur="11s" begin="-4s" repeatCount="indefinite" rotate="auto"><mpath href={`#${secondPath}`} /></animateMotion>
          </circle>
        </>
      )}
    </svg>
  );
}

function LightMotionField({ variant = "one" }) {
  const fieldRef = useRef(null);

  useEffect(() => {
    const node = fieldRef.current;
    if (!node || !("IntersectionObserver" in window)) {
      node?.classList.add("is-active");
      return undefined;
    }
    const observer = new IntersectionObserver(([entry]) => {
      node.classList.toggle("is-active", entry.isIntersecting);
    }, { rootMargin: "160px 0px" });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={fieldRef} className={`hp-light-field hp-light-field--${variant}`} aria-hidden="true">
      <i></i><i></i><i></i>
      <span></span><span></span>
    </div>
  );
}

function WorldBridgeSequence({ onSceneChange }) {
  const markerRef = useRef(null);
  const onSceneChangeRef = useRef(onSceneChange);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    onSceneChangeRef.current = onSceneChange;
  }, [onSceneChange]);

  useEffect(() => {
    const marker = markerRef.current;
    const section = marker?.closest(".hp-world-bridge");
    if (!marker || !section) return undefined;

    let frame = 0;
    let visible = false;
    let sequenceStartTime = null;
    let scrollAssist = 0;
    let furthestProgress = reducedMotion ? 1 : 0;
    let lastCssProgress = -1;
    let lastSceneKey = "";

    const smoothstep = (start, end, value) => {
      const amount = Math.max(0, Math.min(1, (value - start) / (end - start)));
      return amount * amount * (3 - 2 * amount);
    };

    const render = (time) => {
      const sectionRect = section.getBoundingClientRect();
      const scrollSpan = Math.max(1, section.offsetHeight - window.innerHeight);
      const scrollProgress = reducedMotion ? 1 : Math.max(0, Math.min(1, -sectionRect.top / scrollSpan));

      if (!reducedMotion) {
        const readyToStart = sectionRect.bottom > 0 && sectionRect.top < window.innerHeight * .34;
        if (visible && readyToStart && !document.hidden && sequenceStartTime === null) sequenceStartTime = time;
        const duration = window.innerWidth < 760 ? 5800 : 6900;
        const autoProgress = sequenceStartTime === null ? 0 : Math.min(1, Math.max(0, (time - sequenceStartTime) / duration));
        if (scrollProgress > scrollAssist) scrollAssist += (scrollProgress - scrollAssist) * .08;
        furthestProgress = Math.max(furthestProgress, autoProgress, scrollAssist);
      }

      const sceneProgress = reducedMotion ? 1 : furthestProgress;
      const stageReveal = [
        smoothstep(.01, .3, sceneProgress),
        smoothstep(.27, .64, sceneProgress),
        smoothstep(.58, .94, sceneProgress)
      ];
      const hasStarted = reducedMotion || sequenceStartTime !== null || scrollAssist > .001;
      const sceneStep = hasStarted ? (sceneProgress < .3 ? 0 : sceneProgress < .62 ? 1 : 2) : -1;
      const completedStages = stageReveal.filter((value) => value >= .995).length;
      const sceneComplete = sceneProgress >= .985;
      const sceneKey = `${sceneStep}:${completedStages}:${sceneComplete}`;

      if (Math.abs(sceneProgress - lastCssProgress) > .003 || (sceneProgress === 1 && lastCssProgress !== 1)) {
        lastCssProgress = sceneProgress;
        section.style.setProperty("--bridge-progress", sceneProgress.toFixed(3));
        section.style.setProperty("--bridge-intake", stageReveal[0].toFixed(3));
        section.style.setProperty("--bridge-dossier", stageReveal[1].toFixed(3));
        section.style.setProperty("--bridge-action", stageReveal[2].toFixed(3));
      }

      if (sceneKey !== lastSceneKey) {
        lastSceneKey = sceneKey;
        section.dataset.bridgeAct = String(sceneStep);
        section.dataset.bridgeComplete = String(sceneComplete);
        onSceneChangeRef.current?.({ step: sceneStep, completed: completedStages, complete: sceneComplete });
      }
    };

    const loop = (time) => {
      frame = 0;
      if (!visible || document.hidden || reducedMotion) return;
      render(time);
      frame = window.requestAnimationFrame(loop);
    };
    const start = () => {
      if (!frame && visible && !document.hidden && !reducedMotion) frame = window.requestAnimationFrame(loop);
    };
    const stop = () => {
      if (frame) window.cancelAnimationFrame(frame);
      frame = 0;
    };
    const onVisibility = () => {
      const rect = section.getBoundingClientRect();
      visible = !document.hidden && rect.bottom > -80 && rect.top < window.innerHeight + 80;
      section.dataset.bridgeVisible = String(visible);
      if (visible) start(); else stop();
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      section.dataset.bridgeVisible = String(visible);
      if (visible) start(); else stop();
    }, { rootMargin: "80px" });

    observer.observe(section);
    document.addEventListener("visibilitychange", onVisibility);
    const initialRect = section.getBoundingClientRect();
    visible = initialRect.bottom > -80 && initialRect.top < window.innerHeight + 80;
    section.dataset.bridgeVisible = String(visible);
    render(performance.now());
    if (!reducedMotion) start();

    return () => {
      stop();
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [reducedMotion]);

  return <span ref={markerRef} className="hp-world-bridge__sequence" aria-hidden="true"></span>;
}

function WorldBridgeSection() {
  const [scene, setScene] = useState({ step: -1, completed: 0, complete: false });
  const [previewRoute, setPreviewRoute] = useState(null);
  const [pinnedRoute, setPinnedRoute] = useState(null);
  const activeRoute = previewRoute ?? pinnedRoute ?? Math.max(scene.step, 0);
  const route = worldBridgeRoutes[activeRoute];

  return (
    <section
      className="hp-world-bridge hp-section"
      id="puente"
      data-bridge-act={scene.step}
      data-bridge-complete={scene.complete}
      data-bridge-focus={activeRoute}
    >
      <div className="hp-world-bridge__sticky">
        <WorldBridgeSequence onSceneChange={setScene} />
        <div className="hp-world-bridge__wash" aria-hidden="true"><i></i><i></i><i></i></div>

        <div className="hp-world-bridge__intro hp-container">
          <div className="hp-section-code" data-reveal>01 — Coordinación internacional</div>
          <div>
            <h2 data-reveal>Cuando intervienen varios equipos, <em>la información no puede depender de un correo.</em></h2>
            <p data-reveal>Un alta de proveedor puede mezclar un correo, un contrato y un bloqueo en el ERP. Reunimos ese contexto, fijamos la versión válida y dejamos la decisión con responsable, plazo y siguiente acción.</p>
          </div>
        </div>

        <div className="hp-world-bridge__flow hp-container" aria-label="Ejemplo ilustrativo de cómo MEDLA convierte información dispersa en una acción asignada">
          <header className="hp-world-bridge__flow-head">
            <span>Ejemplo ilustrativo</span>
            <strong>Alta de un proveedor internacional</strong>
            <small>De información dispersa a una acción que alguien puede ejecutar</small>
          </header>

          <div className="hp-world-bridge__scene">
            <article className="hp-world-bridge__source" id="bridge-phase-intake">
              <header>
                <span>01 / Información de partida</span>
                <h3>La información llega separada</h3>
              </header>
              <ul>
                <li>
                  <span>Email / equipo local</span>
                  <strong>¿Quién valida las condiciones?</strong>
                  <small>Sin responsable asignado</small>
                </li>
                <li>
                  <span>Documento / proveedor</span>
                  <strong>Contrato_proveedor_v7.pdf</strong>
                  <small>Versión pendiente de confirmar</small>
                </li>
                <li>
                  <span>ERP / administración</span>
                  <strong>Alta bloqueada</strong>
                  <small>Falta documentación fiscal</small>
                </li>
              </ul>
            </article>

            <div className="hp-world-bridge__transfer hp-world-bridge__transfer--one" aria-hidden="true">
              <span>Reunir y contrastar</span><i></i><b></b>
            </div>

            <article className="hp-world-bridge__dossier" id="bridge-phase-dossier">
              <header>
                <span>MEDLA / Expediente único</span>
                <strong>Alta de proveedor</strong>
                <small><i></i> Coordinación activa</small>
              </header>
              <dl>
                <div>
                  <dt>Versión válida</dt>
                  <dd>Contrato v7</dd>
                </div>
                <div>
                  <dt>Condición para continuar</dt>
                  <dd>Certificado fiscal vigente</dd>
                </div>
                <div>
                  <dt>Decisión identificada</dt>
                  <dd>Validar condiciones comerciales</dd>
                </div>
              </dl>
              <p>Hechos reunidos <i></i> criterio aplicado <i></i> decisión visible</p>
            </article>

            <div className="hp-world-bridge__transfer hp-world-bridge__transfer--two" aria-hidden="true">
              <span>Asignar y ejecutar</span><i></i><b></b>
            </div>

            <article className="hp-world-bridge__result" id="bridge-phase-action">
              <header>
                <span>03 / Resultado</span>
                <h3>La decisión ya tiene dueño</h3>
              </header>
              <dl>
                <div>
                  <dt>Responsable</dt>
                  <dd>Dirección de Operaciones</dd>
                </div>
                <div>
                  <dt>Plazo</dt>
                  <dd>Viernes · 12:00</dd>
                </div>
                <div>
                  <dt>Próxima acción</dt>
                  <dd>Aprobar condiciones y registrar el alta</dd>
                </div>
              </dl>
              <p><i></i> Listo para ejecutar</p>
            </article>
          </div>
        </div>

        <div className="hp-world-bridge__controls" role="group" aria-label="Fases del ejemplo de coordinación">
          <div className="hp-world-bridge__active" aria-live={pinnedRoute !== null ? "polite" : "off"}>
            <span>{route.number}</span><strong>{route.label}</strong>
            <small><i></i>{scene.complete ? "Caso resuelto · listo para ejecutar" : scene.step < 0 ? "Ejemplo preparado" : `Secuencia 0${scene.step + 1} / 03`}</small>
          </div>
          {worldBridgeRoutes.map((item, index) => (
            <button
              type="button"
              aria-controls={`bridge-phase-${item.id}`}
              aria-pressed={pinnedRoute === index}
              className={`${activeRoute === index ? "is-active" : ""} ${index < scene.completed ? "is-complete" : ""}`.trim()}
              key={item.id}
              style={{ "--bridge-route-color": item.color }}
              onClick={() => setPinnedRoute((current) => current === index ? null : index)}
              onMouseEnter={() => setPreviewRoute(index)}
              onMouseLeave={() => setPreviewRoute(null)}
              onFocus={() => setPreviewRoute(index)}
              onBlur={() => setPreviewRoute(null)}
            >
              <span>{item.number}</span>{item.short}<i></i>
            </button>
          ))}
        </div>

        <div className="hp-world-bridge__foot" aria-label="Cómo convertimos información en ejecución">
          <span>Información dispersa</span><i></i><span>Expediente común</span><i></i><span>Acción asignada</span>
        </div>
      </div>
    </section>
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
  const toggleRef = useRef(null);
  const panelRef = useRef(null);
  const wasOpenRef = useRef(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    const main = document.querySelector("main");
    const footer = document.querySelector("footer");
    const setBackgroundInert = (value) => {
      [main, footer].forEach((node) => {
        if (!node) return;
        if (value) node.setAttribute("inert", "");
        else node.removeAttribute("inert");
      });
    };

    if (!open) {
      document.body.style.overflow = "";
      setBackgroundInert(false);
      if (wasOpenRef.current) toggleRef.current?.focus();
      wasOpenRef.current = false;
      return undefined;
    }

    wasOpenRef.current = true;
    document.body.style.overflow = "hidden";
    setBackgroundInert(true);
    const panel = panelRef.current;
    const focusables = panel ? [...panel.querySelectorAll('a[href], button:not([disabled])')] : [];
    const focusFrame = window.requestAnimationFrame(() => focusables[0]?.focus());
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        return;
      }
      if (event.key !== "Tab" || focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      setBackgroundInert(false);
    };
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
            <a href="#sistema">Cómo intervenimos</a>
            <a href="#capacidades">Qué hacemos</a>
            <a href="#modelo">Cómo trabajamos</a>
            <a href="nosotros.html">Nosotros</a>
          </div>

          <div className="hp-nav__actions">
            <span className="hp-nav__location"><i></i> Madrid · España</span>
            <a className="hp-nav__cta" href="contacto.html">Cuéntanos el problema <Arrow /></a>
            <button
              ref={toggleRef}
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
        <div ref={panelRef} className="hp-mobile-menu__panel">
          <button className="hp-mobile-menu__close" type="button" aria-label="Cerrar menú" onClick={closeMenu}><MenuIcon close /></button>
          <div className="hp-mobile-menu__meta">MEDLA / Navegación</div>
          <div className="hp-mobile-menu__links">
            <a href="#sistema" onClick={closeMenu}><span>01</span> Cómo intervenimos</a>
            <a href="#capacidades" onClick={closeMenu}><span>02</span> Qué hacemos</a>
            <a href="#modelo" onClick={closeMenu}><span>03</span> Cómo trabajamos</a>
            <a href="nosotros.html" onClick={closeMenu}><span>04</span> Nosotros</a>
          </div>
          <a className="hp-button hp-button--gold" href="contacto.html">Cuéntanos el problema <Arrow /></a>
          <div className="hp-mobile-menu__foot">Legal · Operaciones · Software · Ventas</div>
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
  const [isVisible, setIsVisible] = useState(true);
  const labRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const demo = demoScenarios[state.scenario];

  useEffect(() => {
    const node = labRef.current;
    if (!node || !("IntersectionObserver" in window)) return undefined;
    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting && !document.hidden), { rootMargin: "120px" });
    const onVisibility = () => setIsVisible(!document.hidden && node.getBoundingClientRect().bottom > -120 && node.getBoundingClientRect().top < window.innerHeight + 120);
    observer.observe(node);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      dispatch({ type: "FINISH" });
      return undefined;
    }
    if (!state.running || !isVisible) return undefined;
    const timer = window.setInterval(() => dispatch({ type: "ADVANCE" }), 1500);
    return () => window.clearInterval(timer);
  }, [state.running, state.scenario, isVisible, reducedMotion]);

  const selectScenario = (index) => dispatch({ type: "SELECT", index });
  const handleTabKey = (event, index) => {
    if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
    event.preventDefault();
    const direction = event.key === 'ArrowRight' ? 1 : -1;
    const next = (index + direction + demoScenarios.length) % demoScenarios.length;
    selectScenario(next);
    event.currentTarget.parentElement.querySelectorAll('[role="tab"]')[next]?.focus();
  };
  const moveLight = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--mx", `${((event.clientX - rect.left) / rect.width) * 100}%`);
    event.currentTarget.style.setProperty("--my", `${((event.clientY - rect.top) / rect.height) * 100}%`);
  };

  return (
    <div ref={labRef} className="hp-ops-lab" onPointerMove={moveLight} aria-label="Demostración interactiva de un sistema MEDLA">
      <div className="hp-ops-lab__topbar">
        <div><span>M/</span> LABORATORIO <b>Demostración</b></div>
        <button type="button" onClick={() => dispatch({ type: "TOGGLE" })} aria-label={state.running ? "Pausar simulación" : "Reanudar simulación"}>
          <i className={state.running ? "is-live" : ""}></i>{state.running ? "EN CURSO" : "PAUSA"}
        </button>
      </div>

      <div className="hp-ops-lab__tabs" role="tablist" aria-label="Escenarios de demostración">
        {demoScenarios.map((scenario, index) => (
          <button
            type="button"
            role="tab"
            id={`ops-tab-${scenario.id}`}
            aria-controls="ops-panel"
            aria-selected={state.scenario === index}
            tabIndex={state.scenario === index ? 0 : -1}
            className={state.scenario === index ? "is-active" : ""}
            key={scenario.id}
            onClick={() => selectScenario(index)}
            onKeyDown={(event) => handleTabKey(event, index)}
          >
            <span>0{index + 1}</span>{scenario.tab}
          </button>
        ))}
      </div>

      <div id="ops-panel" className="hp-ops-lab__context" role="tabpanel" aria-labelledby={`ops-tab-${demo.id}`}>
        <div><span>{demo.code}</span><span>Demostración interactiva · Datos ficticios</span></div>
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
          <span className="hp-ops-lab__label">PROCESO</span>
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
            <span>{state.step === 3 ? "LISTO" : "PROCESANDO"}</span>
            <strong>{demo.output.title}</strong>
            <small>{demo.output.detail}</small>
          </div>
        </div>
      </div>

      <div className="hp-ops-lab__trace">
        <span>REGISTRO</span>
        <code>T+00:{String((state.step + 1) * 3).padStart(2, "0")}</code>
        <p><i></i>{demo.trace[state.step]}</p>
        <b>{state.step + 1}/4</b>
      </div>
    </div>
  );
}

function Hero() {
  const moveField = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const dx = (((event.clientX - rect.left) / rect.width) - .5) * 22;
    const dy = (((event.clientY - rect.top) / rect.height) - .5) * 18;
    event.currentTarget.style.setProperty("--field-x", `${dx}px`);
    event.currentTarget.style.setProperty("--field-y", `${dy}px`);
  };

  return (
    <header className="hp-hero" onPointerMove={moveField}>
      <SignatureField id="hero" />
      <div className="hp-hero__ambient" aria-hidden="true"></div>
      <div className="hp-container hp-hero__inner">
        <div className="hp-hero__copy">
          <div className="hp-kicker hp-hero__entrance hp-hero__entrance--one">
            <span>Consultoría y desarrollo · Madrid</span>
            <small>Negocio / Legal / Software</small>
          </div>
          <h1 className="hp-hero__entrance hp-hero__entrance--two">
            Cuando una decisión mezcla contratos, procesos y software, <em>MEDLA coordina el trabajo.</em>
          </h1>
          <p className="hp-hero__lead hp-hero__entrance hp-hero__entrance--three">
            Analizamos el bloqueo con el equipo y ejecutamos la parte necesaria: contratos, procesos, software, automatización o soporte comercial.
          </p>
          <div className="hp-hero__actions hp-hero__entrance hp-hero__entrance--four">
            <a className="hp-button hp-button--gold" href="contacto.html">Cuéntanos la decisión <Arrow /></a>
            <a className="hp-button hp-button--quiet" href="#sistema">Explorar un caso <Arrow diagonal /></a>
          </div>
          <div className="hp-hero__principles hp-hero__entrance hp-hero__entrance--five">
            <div><span>01</span><strong>Diagnosticar</strong><small>Decisiones, esperas y riesgo</small></div>
            <div><span>02</span><strong>Implantar</strong><small>Proceso, software e integraciones</small></div>
            <div><span>03</span><strong>Transferir</strong><small>Documentación, responsables y control</small></div>
          </div>
        </div>

        <div className="hp-hero__visual hp-hero__entrance hp-hero__entrance--visual">
          <MedlaOpsLab />
        </div>
      </div>
    </header>
  );
}

function SignalRail() {
  return (
    <div className="hp-system-rail" aria-label="Principios de diseño MEDLA">
      <div className="hp-container hp-system-rail__inner">
        <div><code>01</code><span>Revisión humana</span></div>
        <div><code>02</code><span>Registro de decisiones clave</span></div>
        <div><code>03</code><span>Permisos según responsabilidad</span></div>
        <div><code>04</code><span>Documentación acordada</span></div>
      </div>
    </div>
  );
}

function DecisionTrajectory({ caseId }) {
  const reducedMotion = useReducedMotion();
  const pathId = `decision-route-${caseId}`;

  return (
    <svg className="hp-decision-room__trajectory" viewBox="0 0 1000 390" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id={`decision-gradient-${caseId}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#a9f3c1" stopOpacity=".12" />
          <stop offset=".52" stopColor="#a9f3c1" stopOpacity=".84" />
          <stop offset="1" stopColor="#d5b76c" stopOpacity=".38" />
        </linearGradient>
        <filter id={`decision-glow-${caseId}`} x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <path className="hp-decision-room__trajectory-ghost" d="M105 258C245 258 240 94 355 94S512 276 615 246 748 102 884 118" />
      <path id={pathId} className="hp-decision-room__trajectory-line" pathLength="1" d="M105 258C245 258 240 94 355 94S512 276 615 246 748 102 884 118" stroke={`url(#decision-gradient-${caseId})`} />
      {[{ x: 105, y: 258 }, { x: 355, y: 94 }, { x: 615, y: 246 }, { x: 884, y: 118 }].map((point, index) => (
        <g className="hp-decision-room__trajectory-node" key={point.x} transform={`translate(${point.x} ${point.y})`}>
          <circle r="14" /><circle r="3" /><text x="0" y="34">0{index + 1}</text>
        </g>
      ))}
      {!reducedMotion && (
        <circle className="hp-decision-room__trajectory-packet" r="6" filter={`url(#decision-glow-${caseId})`}>
          <animateMotion dur="4.8s" repeatCount="indefinite"><mpath href={`#${pathId}`} /></animateMotion>
        </circle>
      )}
    </svg>
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
    event.currentTarget.parentElement.querySelectorAll('[role="tab"]')[next]?.focus();
  };

  return (
    <section className="hp-decision-room hp-section" id="sistema">
      <LightMotionField variant="one" />
      <div className="hp-container">
        <div className="hp-section-code" data-reveal>02 — Así intervenimos</div>
        <div className="hp-decision-room__heading">
          <h2 data-reveal>Cuatro problemas frecuentes.<br /><em>Un plan concreto para cada uno.</em></h2>
          <div data-reveal>
            <p>Cada ejemplo detalla responsables, trabajo incluido y entregables.</p>
            <small>Escenarios ilustrativos · No utilizan datos de clientes</small>
          </div>
        </div>
      </div>

      <div className="hp-stage-bleed">
        <div className="hp-decision-room__shell" data-reveal>
          <div className="hp-decision-room__nav" role="tablist" aria-label="Bloqueos empresariales">
            <div className="hp-decision-room__nav-head"><span>PROBLEMA</span><span>4 ejemplos</span></div>
            {decisionCases.map((decision, index) => (
              <button
                type="button"
                role="tab"
                id={`decision-tab-${decision.id}`}
                aria-controls="decision-panel"
                aria-selected={active === index}
                tabIndex={active === index ? 0 : -1}
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

          <div id="decision-panel" className="hp-decision-room__workspace" role="tabpanel" aria-labelledby={`decision-tab-${item.id}`} aria-live="polite">
            <div className="hp-decision-room__case-head">
              <div><span>{item.code}</span><b>PLAN DE TRABAJO</b></div>
              <h3>{item.thesis}</h3>
            </div>
            <div className="hp-decision-room__map" key={item.id}>
              <DecisionTrajectory caseId={item.id} />
              {item.steps.map((step, index) => (
                <article key={step.n} style={{ "--step": index }}>
                  <div className="hp-decision-room__step-head"><span>{step.n}</span><code>{step.owner}</code></div>
                  <strong>{step.name}</strong>
                  <p>{step.text}</p>
                  {index < item.steps.length - 1 && <i aria-hidden="true"></i>}
                </article>
              ))}
            </div>
            <div className="hp-decision-room__bottom">
              <div>
                <span>TRABAJO INCLUIDO</span>
                <p>{item.stack.map((entry) => <b key={entry}>{entry}</b>)}</p>
              </div>
              <div>
                <span>ENTREGABLES</span>
                <p>{item.outputs.map((entry, index) => <b key={entry}><i>{index + 1}</i>{entry}</b>)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CapabilityGraphic({ item }) {
  const reducedMotion = useReducedMotion();
  const routeId = `capability-route-${item.n}`;
  return (
    <svg className="hp-capability-graphic" viewBox="0 0 680 420" aria-hidden="true">
      <defs>
        <linearGradient id={`capability-gradient-${item.n}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#a9f3c1" stopOpacity=".78" />
          <stop offset="1" stopColor="#8bc7ee" stopOpacity=".22" />
        </linearGradient>
      </defs>
      <path id={routeId} className="hp-capability-graphic__route" d="M220 210C320 210 330 92 470 92" stroke={`url(#capability-gradient-${item.n})`} />
      <path className="hp-capability-graphic__route hp-capability-graphic__route--two" d="M220 210C340 210 360 210 510 210" stroke={`url(#capability-gradient-${item.n})`} />
      <path className="hp-capability-graphic__route hp-capability-graphic__route--three" d="M220 210C320 210 330 328 470 328" stroke={`url(#capability-gradient-${item.n})`} />
      <g className="hp-capability-graphic__hub">
        <rect x="54" y="137" width="166" height="146" rx="20" />
        <text x="82" y="177">PUNTO DE PARTIDA</text>
        <text x="82" y="218">{item.signal}</text>
        <text x="82" y="251">ENTREGABLES</text>
      </g>
      {item.deliverables.map((deliverable, index) => {
        const positions = [{ x: 470, y: 62 }, { x: 510, y: 180 }, { x: 470, y: 298 }];
        const point = positions[index];
        return (
          <g className="hp-capability-graphic__output" key={deliverable} transform={`translate(${point.x} ${point.y})`}>
            <rect width="162" height="60" rx="30" />
            <circle cx="25" cy="30" r="4" />
            <text x="42" y="34">{deliverable}</text>
          </g>
        );
      })}
      {!reducedMotion && (
        <circle className="hp-capability-graphic__packet" r="5">
          <animateMotion dur="2.8s" repeatCount="indefinite"><mpath href={`#${routeId}`} /></animateMotion>
        </circle>
      )}
    </svg>
  );
}

function CapabilitiesSection() {
  const [activeCapability, setActiveCapability] = useState(0);
  const item = capabilities[activeCapability];
  const handleCapabilityKey = (event, index) => {
    if (!["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)) return;
    event.preventDefault();
    const direction = ["ArrowDown", "ArrowRight"].includes(event.key) ? 1 : -1;
    const next = (index + direction + capabilities.length) % capabilities.length;
    setActiveCapability(next);
    event.currentTarget.parentElement.querySelectorAll('[role="tab"]')[next]?.focus();
  };

  return (
    <section className="hp-capabilities hp-section" id="capacidades">
      <LightMotionField variant="two" />
      <div className="hp-container">
        <div className="hp-section-intro">
          <div>
            <div className="hp-section-code" data-reveal>03 — Áreas de intervención</div>
            <h2 data-reveal>Legal, operaciones y tecnología <em>en el mismo plan de trabajo.</em></h2>
          </div>
          <p data-reveal>Podemos resolver una pieza concreta o coordinar el conjunto: desde un contrato o una integración hasta el proceso comercial completo.</p>
        </div>
      </div>

      <div className="hp-stage-bleed">
        <div className="hp-capability-explorer" data-reveal>
          <div className="hp-capability-explorer__nav" role="tablist" aria-label="Capacidades MEDLA">
            {capabilities.map((capability, index) => (
              <button
                type="button"
                role="tab"
                id={`capability-tab-${capability.n}`}
                aria-controls="capability-panel"
                aria-selected={activeCapability === index}
                tabIndex={activeCapability === index ? 0 : -1}
                className={activeCapability === index ? "is-active" : ""}
                key={capability.n}
                onClick={() => setActiveCapability(index)}
                onMouseEnter={() => setActiveCapability(index)}
                onKeyDown={(event) => handleCapabilityKey(event, index)}
              >
                <span>{capability.n}</span><strong>{capability.title}</strong><i></i>
              </button>
            ))}
          </div>
          <div id="capability-panel" className="hp-capability-explorer__stage" role="tabpanel" aria-labelledby={`capability-tab-${item.n}`} aria-live="polite">
            <div className="hp-capability-explorer__copy">
              <span>{item.signal} / {item.n}</span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
              <div>{item.deliverables.map((deliverable) => <b key={deliverable}>{deliverable}</b>)}</div>
              <a className="hp-text-link hp-text-link--light" href={item.href}>Ver alcance y entregables <Arrow /></a>
            </div>
            <CapabilityGraphic item={item} key={item.n} />
          </div>
        </div>
      </div>
    </section>
  );
}

function OperatingModelSection() {
  return (
    <section className="hp-model hp-section" id="modelo">
      <div className="hp-model__ambient" aria-hidden="true"></div>
      <div className="hp-container hp-model__layout hp-layout-bleed">
        <div className="hp-model__intro">
          <div className="hp-section-code hp-section-code--light" data-reveal>04 — Nuestro trabajo</div>
          <h2 data-reveal>Del diagnóstico a una solución <em>implantada y documentada.</em></h2>
          <p data-reveal>El trabajo se divide en tres fases. Cada una tiene responsables, criterios de revisión y un entregable concreto.</p>
          <a className="hp-button hp-button--outline" href="contacto.html" data-reveal>Hablar de un proyecto <Arrow /></a>
        </div>

        <div className="hp-model__steps">
          {operatingModel.map((step, index) => (
            <article className="hp-model-step" key={step.n} data-reveal style={{ "--delay": `${index * 90}ms` }}>
              <div className="hp-model-step__number">{step.n}</div>
              <div className="hp-model-step__content">
                <span>{step.label}</span>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
                <div className="hp-model-step__output"><i></i> Al terminar: {step.output}</div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function TransferScene() {
  const [ordered, setOrdered] = useState(false);
  const rootRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const fragments = [
    "contrato_v7_final.pdf",
    "¿quién lo aprueba?",
    "Excel de compras",
    "pendiente desde el martes",
    "email sin responder",
    "datos duplicados"
  ];

  useEffect(() => {
    if (reducedMotion) {
      setOrdered(true);
      return undefined;
    }
    const node = rootRef.current;
    if (!node || !("IntersectionObserver" in window)) return undefined;
    const observer = new IntersectionObserver((entries) => {
      if (!entries[0]?.isIntersecting) return;
      window.setTimeout(() => setOrdered(true), 350);
      observer.disconnect();
    }, { threshold: .38 });
    observer.observe(node);
    return () => observer.disconnect();
  }, [reducedMotion]);

  return (
    <div ref={rootRef} className={`hp-transfer-scene ${ordered ? "is-ordered" : ""}`}>
      <div className="hp-transfer-scene__head">
        <div><i></i><span>{ordered ? "TRABAJO ORDENADO" : "PUNTO DE PARTIDA"}</span></div>
        <button type="button" aria-pressed={ordered} onClick={() => setOrdered(!ordered)}>
          <span><i></i></span>{ordered ? "Volver al punto de partida" : "Ver el resultado"}
        </button>
      </div>

      <div className="hp-transfer-scene__canvas">
        <SignatureField id="transfer" light />
        <div className="hp-transfer-scene__fragments" aria-hidden={ordered}>
          {fragments.map((fragment, index) => <span key={fragment} style={{ "--fragment": index }}>{fragment}</span>)}
        </div>

        <div className="hp-transfer-scene__core">
          <span>MEDLA</span>
          <strong>{ordered ? "Proceso documentado" : "Trabajo disperso"}</strong>
          <small>{ordered ? "Responsables, criterio y control" : "Archivos, mensajes y decisiones sueltas"}</small>
        </div>

        <div className="hp-transfer-scene__outcomes">
          {buildStandard.map((row, index) => (
            <article key={row.layer} style={{ "--outcome": index }}>
              <span>0{index + 1}</span>
              <small>{row.layer}</small>
              <strong>{row.clarity}</strong>
              <p>{row.owned}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="hp-transfer-scene__foot">
        <span>Criterio de entrega</span>
        <p>Entregamos responsables, documentación y criterios de cambio para que el equipo pueda operar y ampliar la solución.</p>
      </div>
    </div>
  );
}

function DifferenceSection() {
  return (
    <section className="hp-difference hp-section" id="resultado">
      <LightMotionField variant="three" />
      <div className="hp-container">
        <div className="hp-section-code" data-reveal>05 — Qué queda al terminar</div>
        <div className="hp-difference__statement" data-reveal>
          <span>Condiciones de entrega</span>
          <h2>Las decisiones, la documentación y el control <em>quedan en tu equipo.</em></h2>
        </div>
      </div>
      <div className="hp-stage-bleed">
        <TransferScene />
      </div>
    </section>
  );
}

function FinalCTA() {
  const issues = [
    { id: "operacion", label: "Aprobaciones y tareas manuales", summary: "un proceso de aprobaciones manuales sin un estado ni un responsable claros" },
    { id: "legal", label: "Un contrato o riesgo legal", summary: "una decisión bloqueada por contratos, obligaciones o versiones dispersas" },
    { id: "ia", label: "IA que no pasa de la prueba", summary: "un caso de IA que aún no opera con fuentes, permisos y controles definidos" },
    { id: "growth", label: "Ventas sin seguimiento claro", summary: "oportunidades comerciales sin responsable o próxima acción" }
  ];
  const [selectedIssue, setSelectedIssue] = useState(issues[0]);
  const whatsappText = encodeURIComponent(`Hola, quiero hablar con MEDLA. Mi punto de partida es: ${selectedIssue.summary}.`);
  const handleIssueKey = (event, index) => {
    if (!["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    let next = index;
    if (event.key === "Home") next = 0;
    else if (event.key === "End") next = issues.length - 1;
    else next = (index + (["ArrowDown", "ArrowRight"].includes(event.key) ? 1 : -1) + issues.length) % issues.length;
    setSelectedIssue(issues[next]);
    event.currentTarget.parentElement.querySelectorAll('[role="radio"]')[next]?.focus();
  };

  return (
    <section className="hp-final-cta hp-section" id="contacto">
      <div className="hp-stage-bleed hp-stage-bleed--flush">
        <div className="hp-final-cta__card">
          <SignatureField id="cta" light />
          <div className="hp-final-cta__content">
            <div className="hp-kicker hp-kicker--dark" data-reveal>
              <span>06 — Primera conversación</span>
              <small>Empezamos por un caso concreto</small>
            </div>
            <h2 data-reveal>Empecemos por <em>una decisión concreta.</em></h2>
            <p data-reveal>Selecciona el punto de partida. Lo añadiremos al formulario para que no tengas que empezar desde cero.</p>
            <div className="hp-final-cta__actions" data-reveal>
              <a className="hp-button hp-button--ink" href={`contacto.html?context=${selectedIssue.id}`}>Continuar con este tema <Arrow /></a>
              <a className="hp-button hp-button--light-quiet" href={`https://api.whatsapp.com/send/?phone=34641576772&text=${whatsappText}&type=phone_number&app_absent=0`} target="_blank" rel="noopener noreferrer">WhatsApp <Arrow diagonal /></a>
            </div>
          </div>
          <div className="hp-brief-composer" data-reveal style={{ "--delay": "100ms" }}>
            <div className="hp-brief-composer__head"><span>¿POR DÓNDE EMPEZAMOS?</span><span>{String(issues.findIndex((issue) => issue.id === selectedIssue.id) + 1).padStart(2, "0")} / 04</span></div>
            <div className="hp-brief-composer__options" role="radiogroup" aria-label="Punto de partida">
              {issues.map((issue, index) => (
                <button
                  type="button"
                  role="radio"
                  aria-checked={selectedIssue.id === issue.id}
                  tabIndex={selectedIssue.id === issue.id ? 0 : -1}
                  className={selectedIssue.id === issue.id ? "is-selected" : ""}
                  onClick={() => setSelectedIssue(issue)}
                  onKeyDown={(event) => handleIssueKey(event, index)}
                  key={issue.id}
                >
                  <span>0{index + 1}</span>{issue.label}<i></i>
                </button>
              ))}
            </div>
            <div className="hp-brief-composer__summary" aria-live="polite">
              <span>PUNTO DE PARTIDA</span>
              <p>“Nuestro punto de partida es {selectedIssue.summary}.”</p>
              <div><i></i> Se añadirá al formulario</div>
            </div>
          </div>
          <div className="hp-final-cta__note">Información preparada desde el inicio · Siguiente paso definido con el equipo</div>
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
            <p>Consultoría y desarrollo para resolver problemas legales, operativos y tecnológicos dentro de la empresa.</p>
          </div>
          <div className="hp-footer__nav">
            <div>
              <h3>Explorar</h3>
              <a href="#sistema">Cómo intervenimos</a>
              <a href="#capacidades">Qué hacemos</a>
              <a href="#modelo">Cómo trabajamos</a>
              <a href="nosotros.html">Cómo nos organizamos</a>
              <a href="blog.html">Cuadernos</a>
            </div>
            <div>
              <h3>Contacto</h3>
              <a href="mailto:info@medla-empresas.com">info@medla-empresas.com</a>
              <a href="tel:+34641576772">+34 641 576 772</a>
              <a href="privacidad.html">Privacidad</a>
              <span>Madrid, España</span>
            </div>
          </div>
        </div>
        <div className="hp-footer__bottom">
          <span>© 2026 MEDLA Empresas</span>
          <span>Legal · Operaciones · Software · Ventas</span>
          <span>Madrid · España</span>
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
        <WorldBridgeSection />
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
