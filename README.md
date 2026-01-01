# Isru – Prototipo de sitio web

Archivos generados:

- `index.html` — Página principal (hero, productos, sobre, contacto, pie de página).
- `css/styles.css` — Estilos principales (responsive, colores de marca).
- `js/script.js` — JavaScript mínimo (año dinámico, menú móvil).

Cómo probar:

1. Abrir `index.html` en un navegador moderno (doble clic o arrastrar al navegador).
2. Para desarrollo, puedes usar un servidor estático (opcional). Ejemplo con Python:

```bash
python -m http.server 8000
# luego abrir http://localhost:8000
```

Siguientes pasos sugeridos:
- Añadir imágenes reales y logo.
- Integrar carrito / plataforma de pago.
- Ajustes de SEO y rendimiento.

Versiones de vista previa:

- `index.html` — versión responsive (se ajusta a ambos dispositivos).
- `index_desktop.html` — variante enfocada a escritorio.
- `index_mobile.html` — variante enfocada a móviles.

Versiones por idioma:

- `index.html` — Español (castellano)
- `index_en.html` — English
- `index_fr.html` — Français
- `index_desktop_en.html`, `index_desktop_fr.html` — variantes escritorio en EN/FR
- `index_mobile_en.html`, `index_mobile_fr.html` — variantes móvil en EN/FR

Las páginas incluyen un selector de idioma en el header que enlaza entre las versiones.

Para previsualizar específicamente la versión mobile o desktop localmente usando Python:

```bash
python -m http.server 8000
# Abrir en el navegador:
# Desktop: http://localhost:8000/index_desktop.html
# Mobile:  http://localhost:8000/index_mobile.html
```

También puedes abrir directamente los archivos con doble clic en el explorador de archivos, o usar Live Server en VS Code.

Despliegue en GitHub Pages (recomendado):

1. Crea un repositorio en GitHub (por ejemplo: https://github.com/Javy16S/Isru.git).
2. Desde tu máquina local, añade el remoto y sube los archivos (sustituye la URL por la tuya):

```bash
cd "c:/Users/sanch/OneDrive/Escritorio/Pagina_tia"
git init
git add .
git commit -m "Site initial"
git branch -M main
git remote add origin https://github.com/Javy16S/Isru.git
git push -u origin main
```

3. El repositorio incluye un workflow de GitHub Actions (`.github/workflows/deploy-pages.yml`) que desplegará automáticamente la rama `main` en GitHub Pages.

4. En GitHub, ve a Settings → Pages y verifica que el deployment esté activo; en unos minutos tendrás una URL pública `https://<tu-usuario>.github.io/<repo>`.

Despliegue alternativo (Netlify / Vercel): sube la carpeta o conecta el repositorio desde sus paneles y el sitio quedará disponible con HTTPS.

Notas de seguridad y producción:
- Reemplaza `images` y contenido temporal por activos optimizados (.webp/.avif) antes de compartir públicamente.
- Añade un `CNAME` si usarás dominio propio.
- Revisa la configuración de `robots.txt` y `sitemap.xml` si quieres indexación SEO.

Si quieres, puedo:
- añadir automáticamente un `CNAME` cuando tengas dominio propio,
- o empujar los cambios a tu repo si me confirmas que me des permiso para ejecutar los comandos (te daré los comandos exactos para ejecutarlos localmente si prefieres hacerlo tú).
