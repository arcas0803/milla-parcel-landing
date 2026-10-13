# Informe de calidad · Milla

Fecha: 13 de octubre de 2026. Compilación estática de producción en localhost, HTTP, Lighthouse 13.5.0. Tres navegaciones equivalentes por perfil, caché reiniciada por Lighthouse. Perfil móvil 412×823, red simulada 1638,4 Kbps / RTT 150 ms, CPU ×4; escritorio según preset nativo (condiciones completas en summary.json). Navegador temporal, sin usar el perfil personal.

## Resultados finales

| Perfil | Métrica | Mediana | Rango |
| --- | --- | --- | --- |
| mobile | performance | 100 | 100–100 |
| mobile | accessibility | 100 | 100–100 |
| mobile | best-practices | 100 | 100–100 |
| mobile | seo | 63 | 63–63 |
| mobile | largest-contentful-paint | 902.14 | 901.86–902.34 |
| mobile | cumulative-layout-shift | 0.00 | 0.00–0.00 |
| mobile | total-blocking-time | 0.00 | 0.00–0.00 |
| desktop | performance | 100 | 100–100 |
| desktop | accessibility | 100 | 100–100 |
| desktop | best-practices | 100 | 100–100 |
| desktop | seo | 63 | 63–63 |
| desktop | largest-contentful-paint | 242.11 | 242.08–242.41 |
| desktop | cumulative-layout-shift | 0.00 | 0.00–0.00 |
| desktop | total-blocking-time | 0.00 | 0.00–0.00 |

LCP y TBT en milisegundos. CLS sin unidad. **SEO 63 es deliberado:** el negocio ficticio permanece noindex y robots bloquea el rastreo. No se ha retirado esa protección para elevar la puntuación. El único fallo binario SEO es is-crawlable, esperado en el alcance demo.

## Recursos

Proxy conservador del build: JavaScript **2826 bytes gzip** (presupuesto 30 KiB); CSS **6472 bytes gzip** (presupuesto 50 KiB). No son el tamaño de transferencia inicial. Los informes contienen grupos de recursos observados por navegación, incluidos headers; valores cero pueden reflejar caché. SVG inline incluido dentro del documento. Fuentes descargadas: 0. Imágenes externas: 0. Terceros: 0. Imagen social PNG solo para compartir, no descargada por la landing.

## Comprobaciones y correcciones

- Tipos: 0 errores y 0 warnings. Build de producción correcto.
- Cinco pruebas de recorridos superadas; reporte en tests.json.
- Axe: sin infracciones detectadas de WCAG 2 A/AA, 2.1 AA y 2.2 AA en 320, 375, 768, 1440 y 1920 px. No equivale a una certificación.
- Capturas completas inspeccionadas en los cuatro tamaños principales. No se detectaron colisiones, assets rotos ni overflow. Reflow adicional a 320 px y controles de formularios conservados.
- Skip link con foco visible observado. Menú móvil, Escape, errores enfocados y FAQ con teclado probados.
- Variante reduced motion verificada contra CSS computado. Contenido esencial y FAQ funcionan con ejecución de scripts desactivada. Chromium no cambia su flag de parsing de noscript al desactivar ejecución; la prueba valida el contenido de fallback en el HTML. Submit inicialmente desactivado para impedir navegación/envío sin JS; la interacción habilita los botones.
- Primer pase: contraste de leyenda naranja 4,47:1. Se oscureció el texto a #102235 y se repitieron axe y Lighthouse: 100 en accesibilidad en ambos perfiles.
- Revisión de interfaz según [Web Interface Guidelines](https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md): semántica, labels, foco, estados, reduced motion y dimensiones reservadas. Sin hallazgos reproducibles restantes en el alcance revisado.
- Metadatos, idioma, enlaces, robots y sitemap coherentes con demo. Build con prefijo GitHub Pages y origen real comprobado: deployment-check.json. No se publica schema de empresa ficticia.

## Aceptación

Brief y tokens: passed (docs/design-plan.md). Recorridos: passed. Visual: passed. Accesibilidad automática/teclado/reflow/reduced motion: passed en el alcance indicado. Rendimiento: passed. SEO de demo: passed, indexación not applicable. Captación y retención: plan documentado, tracking not applicable. Entrega: código, documentación, capturas, lockfile y workflow.

El evaluador automático utiliza evidence.json y conserva gates.json. La oportunidad network-dependency-tree de Lighthouse refleja la descarga de CSS/JS desde HTML; se revisó y no se añaden preloads sin beneficio medido. No incumple los presupuestos. Los resultados locales no prueban comportamiento de CDN, HTTPS o caché de producción.

## Pendientes y límites

Lector de pantalla, alto contraste y zoom visual 200 % en varios navegadores: pending. Ancho efectivo de reflow a 320 px comprobado. Core Web Vitals de campo, INP p75, conversión y retención: pending/no disponibles, no bloquean una demo nueva. TBT no se presenta como INP. No hay resultados de leads o tráfico real. Una empresa real necesita tarifas, términos, API y dominio propios.
