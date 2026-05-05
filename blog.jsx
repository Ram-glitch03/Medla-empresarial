// Blog page — editorial magazine layout

const { useState, useMemo } = React;

/* ─────────── Nav ─────────── */
function BlogNav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <>
    <nav className="nav scrolled">
      <div className="container nav-inner">
        <a href="index.html" className="logo"><img src="logo.png" alt="MEDLA" style={{height: 64}} /></a>
        <ul className="nav-links">
          <li><a href="servicios.html">Servicios</a></li>
          <li><a href="nosotros.html">Nosotros</a></li>
          <li><a href="blog.html" style={{ color: "var(--gold)" }}>Blog</a></li>
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
            <li><a href="nosotros.html">Nosotros</a></li>
            <li><a href="blog.html" style={{ color: "var(--gold)" }}>Blog</a></li>
            <li><a href="contacto.html">Contacto</a></li>
            <li style={{marginTop: 20}}><a href="contacto.html" className="btn btn-primary" style={{textAlign: "center", justifyContent: "center", width: "100%"}}>Agendar diagnóstico</a></li>
          </ul>
        </div>
      </div>
    )}
    </>
  );
}

/* ─────────── Article Cover SVG Patterns ─────────── */
const coverPatterns = {
  legal: (
    <svg viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="lg1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F2EDE4" />
          <stop offset="100%" stopColor="#E2D9C6" />
        </linearGradient>
      </defs>
      <rect width="400" height="250" fill="url(#lg1)" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <rect key={i} x={60 + i * 50} y={40 + i * 6} width={60} height={170 - i * 6} fill="#1A1A2E" opacity={0.08 + i * 0.04} rx="2" />
      ))}
      <circle cx="320" cy="80" r="42" fill="none" stroke="#C9A84C" strokeWidth="1" opacity="0.6" />
      <circle cx="320" cy="80" r="28" fill="#C9A84C" opacity="0.3" />
    </svg>
  ),
  tech: (
    <svg viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="250" fill="#1A1A2E" />
      {Array.from({ length: 8 }).map((_, i) => (
        <line key={i} x1="0" y1={30 * i} x2="400" y2={30 * i} stroke="#C9A84C" strokeWidth="0.5" opacity="0.15" />
      ))}
      {Array.from({ length: 13 }).map((_, i) => (
        <line key={`v${i}`} x1={30 * i} y1="0" x2={30 * i} y2="250" stroke="#C9A84C" strokeWidth="0.5" opacity="0.15" />
      ))}
      <circle cx="140" cy="125" r="60" fill="none" stroke="#C9A84C" strokeWidth="1" opacity="0.5" />
      <circle cx="140" cy="125" r="36" fill="#C9A84C" opacity="0.2" />
      <circle cx="140" cy="125" r="12" fill="#C9A84C" />
      <circle cx="260" cy="90" r="5" fill="#C9A84C" />
      <circle cx="300" cy="160" r="5" fill="#C9A84C" opacity="0.6" />
      <line x1="140" y1="125" x2="260" y2="90" stroke="#C9A84C" strokeWidth="0.8" opacity="0.5" />
      <line x1="140" y1="125" x2="300" y2="160" stroke="#C9A84C" strokeWidth="0.8" opacity="0.5" />
    </svg>
  ),
  finance: (
    <svg viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="250" fill="#F2EDE4" />
      <path d="M 0 180 L 60 160 L 120 170 L 180 120 L 240 130 L 300 80 L 360 90 L 400 60 L 400 250 L 0 250 Z" fill="#C9A84C" opacity="0.3" />
      <path d="M 0 180 L 60 160 L 120 170 L 180 120 L 240 130 L 300 80 L 360 90 L 400 60" stroke="#C9A84C" strokeWidth="2.5" fill="none" />
      {[60, 120, 180, 240, 300, 360].map((x, i) => (
        <circle key={i} cx={x} cy={[160, 170, 120, 130, 80, 90][i]} r="4" fill="#1A1A2E" />
      ))}
    </svg>
  ),
  ai: (
    <svg viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id="aig" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#C9A84C" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#1A1A2E" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="250" fill="#1A1A2E" />
      <circle cx="200" cy="125" r="120" fill="url(#aig)" />
      {Array.from({ length: 24 }).map((_, i) => {
        const angle = (i / 24) * Math.PI * 2;
        const r1 = 40;
        const r2 = 90 + (i % 3) * 15;
        return (
          <line key={i} x1={200 + Math.cos(angle) * r1} y1={125 + Math.sin(angle) * r1} x2={200 + Math.cos(angle) * r2} y2={125 + Math.sin(angle) * r2} stroke="#C9A84C" strokeWidth="1" opacity={0.3 + (i % 4) * 0.15} />
        );
      })}
      <circle cx="200" cy="125" r="30" fill="#C9A84C" opacity="0.2" />
      <circle cx="200" cy="125" r="14" fill="#C9A84C" />
    </svg>
  ),
  comms: (
    <svg viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="250" fill="#F2EDE4" />
      {[80, 140, 200, 260].map((x, i) => (
        <rect key={i} x={x} y={60 + i * 8} width={80} height={130 - i * 8} fill="#1A1A2E" opacity={0.1 + i * 0.05} rx="3" />
      ))}
      <circle cx="120" cy="100" r="26" fill="#C9A84C" opacity="0.3" />
      <circle cx="120" cy="100" r="12" fill="#C9A84C" />
      <path d="M 140 100 Q 180 80 220 100 T 300 100" stroke="#C9A84C" strokeWidth="2" fill="none" strokeDasharray="4 4" />
    </svg>
  ),
  people: (
    <svg viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="peg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E2D9C6" />
          <stop offset="100%" stopColor="#C9A84C" stopOpacity="0.3" />
        </linearGradient>
      </defs>
      <rect width="400" height="250" fill="url(#peg)" />
      {[120, 200, 280].map((cx, i) => (
        <g key={i} opacity={0.75 + i * 0.08}>
          <circle cx={cx} cy="100" r="28" fill="#1A1A2E" />
          <path d={`M ${cx - 42} 200 Q ${cx} 145 ${cx + 42} 200 L ${cx + 42} 250 L ${cx - 42} 250 Z`} fill="#1A1A2E" />
        </g>
      ))}
    </svg>
  ),
};

/* ─────────── Hero ─────────── */
function BlogHero({ totalArticles, totalCats }) {
  return (
    <section className="blog-hero">
      <div className="container blog-hero-inner">
        <div>
          <span className="eyebrow">— Ideas MEDLA</span>
          <h1 style={{ marginTop: 20 }}>
            Lecturas <em>con criterio</em>.
          </h1>
        </div>
        <div className="blog-hero-meta">
          <p>
            Análisis, ensayos y notas breves sobre legal, tecnología, inversión y estrategia —
            publicados por el equipo de MEDLA. Sin clickbait, sin relleno.
          </p>
          <div className="blog-hero-count">
            <div><div className="n">{totalArticles}</div><div className="l">Artículos</div></div>
            <div><div className="n">{totalCats}</div><div className="l">Categorías</div></div>
            <div><div className="n"><em>07</em></div><div className="l">Autores</div></div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────── Featured ─────────── */
function BlogFeatured({ article }) {
  return (
    <section className="blog-featured">
      <div className="container">
        <a href="#" className="featured-card">
          <div className="featured-visual">{coverPatterns[article.pattern]}</div>
          <div className="featured-body">
            <div>
              <h2>{article.title}</h2>
              <p style={{ marginTop: 18 }}>{article.excerpt}</p>
            </div>
            <div>
              <div className="featured-meta">
                <span>{article.cat}</span>
                <span className="dot"></span>
                <span>{article.date}</span>
                <span className="dot"></span>
                <span>{article.time}</span>
              </div>
              <div className="featured-cta" style={{ marginTop: 20 }}>
                Leer el análisis completo
                <span className="featured-cta-arr">→</span>
              </div>
            </div>
          </div>
        </a>
      </div>
    </section>
  );
}

/* ─────────── Filters ─────────── */
function BlogFilters({ cats, active, onCat, query, onQuery }) {
  return (
    <div className="blog-filters-wrap">
      <div className="container">
        <div className="blog-filters">
          <div className="blog-cats">
            {cats.map((c) => (
              <button key={c.id} className={`cat-btn ${active === c.id ? "active" : ""}`} onClick={() => onCat(c.id)}>
                {c.label} <span className="n">{c.n}</span>
              </button>
            ))}
          </div>
          <div className="blog-search">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4-4" strokeLinecap="round" />
            </svg>
            <input placeholder="Buscar artículo..." value={query} onChange={(e) => onQuery(e.target.value)} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────── Grid ─────────── */
function ArticleCard({ a }) {
  return (
    <a href="#" className="article-card">
      <div className="article-cover">
        {coverPatterns[a.pattern]}
        <span className="article-cat-pill">{a.cat}</span>
      </div>
      <div className="article-body">
        <div className="article-meta">
          <span>{a.date}</span>
          <span className="dot"></span>
          <span>{a.time}</span>
        </div>
        <h3>{a.title}</h3>
        <p>{a.excerpt}</p>
        <div className="article-author">
          <div className="author-dot">{a.authorInit}</div>
          <span>{a.author}</span>
        </div>
      </div>
    </a>
  );
}

function BlogGrid({ articles }) {
  return (
    <section className="blog-grid-wrap">
      <div className="container">
        {articles.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0", color: "var(--text-mute)" }}>
            Sin resultados. Prueba con otra búsqueda.
          </div>
        ) : (
          <div className="blog-grid">
            {articles.map((a, i) => (<ArticleCard a={a} key={i} />))}
          </div>
        )}
      </div>
    </section>
  );
}

/* ─────────── Newsletter ─────────── */
function BlogNewsletter() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  return (
    <section className="blog-newsletter">
      <div className="container">
        <div className="newsletter-card">
          <div className="newsletter-inner">
            <span className="eyebrow" style={{ justifyContent: "center" }}>— Newsletter</span>
            <h2 style={{ marginTop: 16 }}>Un análisis <em>cada jueves</em>, al correo.</h2>
            <p>Sin relleno: una pieza original del equipo MEDLA sobre legal, tecnología e inversión. Cancela cuando quieras.</p>
            {sent ? (
              <div style={{ fontFamily: "var(--f-display)", fontSize: 22, color: "var(--gold-hover)", fontStyle: "italic" }}>
                ✓ Suscrito — nos vemos el próximo jueves.
              </div>
            ) : (
              <form className="newsletter-form" onSubmit={(e) => { e.preventDefault(); if (email) setSent(true); }}>
                <input type="email" placeholder="tu@empresa.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <button type="submit" className="btn btn-primary">Suscribirme <span className="arr">→</span></button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────── Footer ─────────── */
function BlogFooter() {
  return (
    <footer className="footer" id="blog">
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

/* ─────────── App ─────────── */
const ARTICLES = [
  { title: "El contrato que no firmaste: cláusulas ocultas en SaaS B2B", cat: "Legal", pattern: "legal", date: "18 Mar 2025", time: "9 min", excerpt: "Cinco cláusulas que aparecen en los SaaS que usa tu empresa y que pueden comprometer propiedad intelectual, jurisdicción y continuidad operativa.", author: "Mateo Delgado", authorInit: "MD" },
  { title: "Cómo modelamos una ronda pre-seed sin perder el control", cat: "Inversión", pattern: "finance", date: "12 Mar 2025", time: "12 min", excerpt: "Un framework práctico para founders que levantan su primer millón — con SAFEs, discount caps y qué negociar primero.", author: "Lucía Almada", authorInit: "LA" },
  { title: "IA que sí sirve: tres casos reales en operaciones internas", cat: "Tecnología", pattern: "ai", date: "05 Mar 2025", time: "7 min", excerpt: "Historias de clientes que implementaron IA sin hype: qué funcionó, qué no, y cuánto tiempo libera realmente cada caso.", author: "Daniel Herrera", authorInit: "DH" },
  { title: "El compliance no es un formulario — es una arquitectura", cat: "Legal", pattern: "legal", date: "28 Feb 2025", time: "8 min", excerpt: "Por qué las empresas que tratan el compliance como documento pierden cuando llega la auditoría. Cómo convertirlo en proceso.", author: "Rafael Ortiz", authorInit: "RO" },
  { title: "Rediseñar una operación: cuándo digitalizar y cuándo no", cat: "Tecnología", pattern: "tech", date: "20 Feb 2025", time: "10 min", excerpt: "No todo proceso merece un software. Una guía para decidir qué automatizar primero y qué conservar manual — con criterio.", author: "Elena Cortés", authorInit: "EC" },
  { title: "Narrativa de marca para empresas B2B que venden criterio", cat: "Comunicación", pattern: "comms", date: "14 Feb 2025", time: "6 min", excerpt: "Cómo construir una voz de marca que comunique solidez sin caer en corporativismo vacío. Ejemplos y anti-ejemplos.", author: "Sofía Medina", authorInit: "SM" },
  { title: "M&A en pymes: el playbook que nadie te da", cat: "Legal", pattern: "legal", date: "07 Feb 2025", time: "14 min", excerpt: "Desde la carta de intención hasta el closing. Diez años de negociar compras de empresas medianas, en un solo documento.", author: "Mateo Delgado", authorInit: "MD" },
  { title: "Los tres roles que toda startup subcontrata mal", cat: "Equipo", pattern: "people", date: "31 Ene 2025", time: "5 min", excerpt: "CFO fraccional, contador y legal. Por qué uno de estos tres siempre está mal contratado en fase temprana — y cómo detectarlo.", author: "Lucía Almada", authorInit: "LA" },
  { title: "Due diligence técnica: la checklist real", cat: "Inversión", pattern: "tech", date: "24 Ene 2025", time: "11 min", excerpt: "Lo que miramos cuando auditamos tecnológicamente una empresa antes de una inversión. No es lo que los founders creen.", author: "Elena Cortés", authorInit: "EC" },
];

const CATS = [
  { id: "all", label: "Todos" },
  { id: "Legal", label: "Legal" },
  { id: "Tecnología", label: "Tecnología" },
  { id: "Inversión", label: "Inversión" },
  { id: "Comunicación", label: "Comunicación" },
  { id: "Equipo", label: "Equipo" },
];

function BlogApp() {
  const [activeCat, setActiveCat] = useState("all");
  const [query, setQuery] = useState("");

  const featured = ARTICLES[0];
  const rest = ARTICLES.slice(1);

  const catsWithCounts = CATS.map((c) => ({
    ...c,
    n: c.id === "all" ? rest.length : rest.filter((a) => a.cat === c.id).length,
  }));

  const filtered = useMemo(() => {
    return rest.filter((a) => {
      if (activeCat !== "all" && a.cat !== activeCat) return false;
      if (query && !(`${a.title} ${a.excerpt} ${a.author}`).toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
  }, [activeCat, query]);

  return (
    <div className="blog-page">
      <BlogNav />
      <BlogHero totalArticles={String(ARTICLES.length).padStart(2, "0")} totalCats={String(CATS.length - 1).padStart(2, "0")} />
      <BlogFeatured article={featured} />
      <BlogFilters cats={catsWithCounts} active={activeCat} onCat={setActiveCat} query={query} onQuery={setQuery} />
      <BlogGrid articles={filtered} />
      <BlogNewsletter />
      <BlogFooter />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<BlogApp />);
