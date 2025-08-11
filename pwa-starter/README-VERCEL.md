# Hamilton PWA — Vercel Ready

Este paquete está listo para desplegarse en **Vercel** en menos de 5 minutos.

## Estructura
- `index.html`, `styles.css`, `app.js`: app básica (cotizador, agenda y pedidos).
- `manifest.json`, `icons/`: PWA (instalable).
- `service-worker.js`: cache de app shell y modo offline.
- `vercel.json`: configuración para SPA, headers y rutas limpias.

## Deploy por Drag & Drop
1. Entra a https://vercel.com y crea/inicia sesión.
2. Click en **Add New… → Project → Import** por **Drag & Drop**.
3. Arrastra la carpeta **pwa-starter** completa (o el .zip descomprimido).
4. Vercel detecta proyecto estático. Haz clic en **Deploy**.
5. Obtendrás un URL como `https://tu-app.vercel.app`.

## Deploy con Git (opcional)
1. Crea repo en GitHub/GitLab.
2. Sube el contenido de `pwa-starter/` a la raíz del repo.
3. En Vercel: **Add New Project** → selecciona el repo → **Deploy**.

## Dominio propio (opcional)
- En el proyecto en Vercel: **Settings → Domains → Add**.
- Apunta tu dominio con CNAME a `cname.vercel-dns.com` (o agrega la verificación sugerida).
- Vercel emite HTTPS automáticamente.

## Notas PWA
- Para que aparezca el banner de instalación, usa **HTTPS** (Vercel ya lo pone).
- iOS agrega “Añadir a la pantalla de inicio” desde el botón de compartir en Safari.
- Cambia el nombre, colores y descripción en `manifest.json`.
- Actualiza iconos en `icons/` (192 y 512 px).

## Siguientes pasos sugeridos
- Conectar precios reales en `app.js`.
- Generar PDF de cotización (jsPDF).
- Autenticación y base de datos (Supabase/Firebase).
- Panel admin y métricas.
