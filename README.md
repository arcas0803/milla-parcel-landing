# Milla · Paquetería con otra mirada

[Ver demo](https://arcas0803.github.io/milla-parcel-landing/) · [Caso de estudio](docs/case-study.md) · [Informe de calidad](audits/audit.md)

Landing de una **marca ficticia de paquetería**, desarrollada como caso de estudio de diseño y frontend. Un proyecto completo, ligero y responsive que convierte una propuesta de marca en dos recorridos interactivos: cotizar y seguir un paquete.

![Vista de escritorio de Milla](audits/screenshots/hero.jpg)

## El proyecto

“Tú lo preparas. Nosotros lo acercamos.” Milla conecta la logística con las historias que viajan dentro de un paquete. La dirección editorial combina papel crema, azul tinta, naranja, una ilustración SVG propia y un acento tipográfico serif.

- Landing con servicios, proceso, cotizador, seguimiento y FAQ.
- Cotizador con validación de códigos postales, peso y selección Estándar/Express.
- Desglose de tarifa, suplementos e impuesto ilustrativo; resumen copiable y descargable.
- Seguimiento con estados de reparto, entregado, incidencia y código desconocido.
- Menú móvil, navegación con teclado, skip link y movimiento reducido.
- Páginas de caso de estudio y privacidad; metadatos y control de indexación.
- Pruebas de recorridos, axe, auditorías Lighthouse y capturas responsive.

**Es una demo:** no contrata envíos, no procesa pagos y no almacena datos de formularios. Tarifas, plazos, cobertura y estados son ilustrativos. No hay testimonios ni métricas comerciales inventadas.

## Stack

Astro 7 · TypeScript · Tailwind CSS 4 · CSS nativo · SVG · Playwright · axe · Lighthouse. HTML estático, sin framework hidratado, fuentes remotas ni tracking. Node **24 LTS** recomendado (mínimo 22.12).

## Ejecutar

```bash
npm ci
npm run dev
```

Abre la URL que muestra Astro. Para comprobar la versión de producción:

```bash
npm run check
npm run build
npm run preview
```

La versión instalada de Astro puede elegir otro puerto si el solicitado está ocupado; utiliza siempre la URL que devuelve. `dist/` contiene la web lista para un alojamiento estático.

## Probar las interacciones

Cotizador: origen **28013**, destino **08001**, **2 kg**, Estándar → **8,53 €** de ejemplo. El mismo paquete con Express → **12,16 €**. Prueba peso fuera de rango, códigos incompletos y códigos de islas para ver los mensajes de validación.

Seguimiento:

| Código     | Estado ficticio |
| ---------- | --------------- |
| MILLA-2026 | En reparto      |
| MILLA-2025 | Entregado       |
| MILLA-2024 | Incidencia      |

Los códigos postales se validan por formato y provincia; no se contrastan con una base de direcciones. El simulador no considera dimensiones, festivos ni restricciones de mercancías.

## Pruebas y auditoría

```bash
npx playwright install chromium
npm run build
npm run test:e2e
```

Las pruebas levantan un servidor estático en el puerto 4322. También pueden utilizar una instancia existente:

```bash
LANDING_URL=http://127.0.0.1:4322/ npm run test:e2e
```

Para usar un Chrome ya instalado, configura `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` con su ruta. La auditoría requiere Chrome y la vista previa en ejecución:

```bash
node scripts/lighthouse.mjs --url=http://127.0.0.1:4322/ --runs=3 --expected-noindex=true
npm run audit:gates
```

Consulta [el informe de calidad](audits/audit.md), [la estrategia y dirección](docs/design-plan.md) y [el caso de estudio](docs/case-study.md). Los resultados son mediciones locales de laboratorio, no Core Web Vitals de usuarios reales ni una certificación WCAG.

## Publicar en GitHub Pages

El repositorio incluye `.github/workflows/deploy.yml`. En **Settings → Pages → Build and deployment**, selecciona **GitHub Actions**. Cada push a `main` comprueba los tipos, compila y despliega `dist/`.

El workflow configura automáticamente el dominio y el prefijo `/nombre-del-repositorio/`. Si usas un repositorio `usuario.github.io`, cambia `BASE_PATH` a `/`. Para un dominio propio, ajusta `SITE_URL` y `BASE_PATH` y configura ese dominio en GitHub Pages. [Referencia oficial de Astro](https://docs.astro.build/en/guides/deploy/github/).

En otro alojamiento estático, usa `npm run build` y publica `dist/`. No hay servidor de aplicación ni claves secretas.

## SEO y privacidad

La marca ficticia se mantiene con **noindex** por defecto. Configurar `SITE_URL` genera canonical y Open Graph; `PUBLIC_INDEXABLE=true` activa indexación, robots y sitemap juntos si existe una URL real. Actívalo solo si decides indexar el caso de estudio como portfolio, con el contenido ficticio claramente identificado. No se genera información de empresa real en JSON-LD.

`.env.example` documenta las variables. No incluyas credenciales ni datos personales al adaptar el proyecto.

## Estructura

```text
src/components/     Layout, iconos e ilustración
src/pages/          Landing, caso de estudio, privacidad, robots y sitemap
src/lib/            Cálculo puro e interacciones
src/styles/         Tokens y diseño responsive
public/             Favicon e imagen social
tests/              Pruebas de recorridos y accesibilidad
audits/             Informes originales, resumen y capturas
docs/               Estrategia y caso de estudio
.github/workflows/  Despliegue de GitHub Pages
```

## Créditos y licencia

Concepto e ilustración originales para este caso de estudio. Desarrollo con asistencia de Codex y el pack Modern Landing Factory. Las decisiones, alcance y límites están documentados para facilitar revisión y adaptación. El código y los recursos propios se distribuyen bajo [MIT](LICENSE). Las dependencias conservan sus respectivas licencias.
