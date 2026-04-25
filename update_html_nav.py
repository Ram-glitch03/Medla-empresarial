import os
import glob

html_files = glob.glob('*.html')
js_to_add = """
<div id="mobileMenu" class="mobile-menu" style="display: none;">
  <div class="mobile-menu-overlay" onclick="document.getElementById('mobileMenu').style.display='none'"></div>
  <div class="mobile-menu-content">
    <div class="mobile-menu-head">
      <img src="logo.png" alt="MEDLA" style="height: 40px" />
      <button class="nav-toggle" style="display: block" onclick="document.getElementById('mobileMenu').style.display='none'">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
      </button>
    </div>
    <ul class="mobile-links" onclick="document.getElementById('mobileMenu').style.display='none'">
      <li><a href="servicios.html">Servicios</a></li>
      <li><a href="nosotros.html">Nosotros</a></li>
      <li><a href="blog.html">Blog</a></li>
      <li style="margin-top: 20px"><a href="contacto.html" class="btn btn-gold nav-cta" style="text-align: center; justify-content: center; width: 100%">Contactar</a></li>
    </ul>
  </div>
</div>
"""

css_to_add = """
  /* MOBILE MENU */
  .nav-toggle { display: none; background: transparent; border: none; color: inherit; padding: 8px; cursor: pointer; margin-left: 12px; }
  @media (max-width: 960px) {
    .nav-links, .nav-cta { display: none !important; }
    .nav-toggle { display: block; }
  }
  .mobile-menu { position: fixed; inset: 0; z-index: 999; display: flex; justify-content: flex-end; }
  .mobile-menu-overlay { position: absolute; inset: 0; background: rgba(26,26,46,0.5); backdrop-filter: blur(4px); }
  .mobile-menu-content { position: relative; width: 80%; max-width: 320px; background: #faf8f5; height: 100%; padding: 24px; display: flex; flex-direction: column; animation: slideIn 0.3s cubic-bezier(0.2, 0.8, 0.2, 1); box-shadow: -10px 0 40px rgba(0,0,0,0.1); }
  @keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }
  .mobile-menu-head { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(174,158,113,.22); padding-bottom: 20px; margin-bottom: 24px; }
  .mobile-links { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 20px; }
  .mobile-links a { font-size: 18px; font-weight: 500; color: #1c1914; text-decoration: none; }
  .mobile-links a.btn { font-size: 15px; margin-top: 10px; }
"""

for fname in html_files:
    if fname == 'index.html':
        continue # React rendered
    with open(fname, 'r') as f:
        content = f.read()

    # Skip if already modified
    if 'id="mobileMenu"' in content:
        continue

    # Add mobile-menu div near the end of body
    content = content.replace('</body>', js_to_add + '\n</body>')

    # Add toggle button in nav right after nav-cta
    if 'nav-cta"' in content:
        import re
        content = re.sub(r'(<a[^>]*class="[^"]*nav-cta[^"]*"[^>]*>.*?</a>)',
                         r'\1\n      <button class="nav-toggle" onclick="document.getElementById(\'mobileMenu\').style.display=\'flex\'"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg></button>',
                         content, count=1, flags=re.DOTALL)
    
    # Inject CSS before closing </style>
    if '</style>' in content:
        content = content.replace('</style>', css_to_add + '</style>')
    
    with open(fname, 'w') as f:
        f.write(content)

print(f"Updated {len(html_files)} HTML files")
