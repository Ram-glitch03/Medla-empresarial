import os
import glob

replacements = [
    ('href="tel:+525500000000"', 'href="tel:+34641576772"'),
    ('href="https://wa.me/525500000000"', 'href="https://wa.me/34641576772"'),
    ('+52 55 0000 0000', '+34 641 576 772'),
    ('href="mailto:contacto@medlaempresas.com"', 'href="mailto:info@medla-empresas.com"'),
    ('contacto@medlaempresas.com', 'info@medla-empresas.com'),
]

# Specifically replace the footer services list in jsx files
old_services = """<li><a href="asesoria-legal.html">Asesoría legal</a></li>
              <li><a href="constitucion.html">Constitución</a></li>
              <li><a href="inversiones.html">Inversiones</a></li>
              <li><a href="automatizacion.html">Automatización</a></li>
              <li><a href="agentes.html">IA aplicada</a></li>"""
new_services = """<li><a href="asesoria-legal.html">Asesoría legal</a></li>
              <li><a href="redes-sociales.html">Comunicación</a></li>
              <li><a href="jotform-landing.html">Soluciones Jotform</a></li>"""

old_services_nos = """<li><a href="asesoria-legal.html">Asesoría legal</a></li>
              <li><a href="constitucion.html">Constitución</a></li>
              <li><a href="inversiones.html">Inversiones</a></li>
              <li><a href="agentes.html">IA aplicada</a></li>
              <li><a href="redes-sociales.html">Comercial & redes</a></li>"""

files_to_check = glob.glob('*.jsx') + glob.glob('*.html') + glob.glob('avanzza-landing/*.jsx') + glob.glob('avanzza-landing/*.html')

for filepath in files_to_check:
    if os.path.isfile(filepath):
        with open(filepath, 'r') as f:
            content = f.read()
        
        orig_content = content
        
        for old, new in replacements:
            content = content.replace(old, new)
            
        if filepath.endswith('.jsx'):
            content = content.replace(old_services, new_services)
            content = content.replace(old_services_nos, new_services)
            
        if orig_content != content:
            with open(filepath, 'w') as f:
                f.write(content)
            print(f"Updated {filepath}")

