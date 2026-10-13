# Milla: una experiencia de paquetería de principio a fin

## Contexto y reto

Caso de estudio sin cliente real ni información previa de empresa. Se propone una marca de paquetería para pequeños negocios y particulares. El objetivo es mostrar capacidad de convertir un brief abierto en contenido, identidad, interfaz, interacciones y evidencia de calidad.

## Solución

La propuesta “Cada paquete, una nueva historia” da un tono humano a una tarea operativa. La composición alterna un hero editorial, tres servicios, un proceso sobre fondo oscuro y herramientas de simulación. El visitante puede evaluar un envío sin registrarse ni entregar datos personales.

Se estudiaron tres direcciones visuales y se eligió una identidad cálida con azul tinta y naranja. La ilustración SVG propia presenta cajas, etiquetas y una ruta de entrega, evitando fotos genéricas y dependencias remotas. El diseño utiliza fuentes de sistema y pocas animaciones.

## Decisiones de producto

- **CTA único:** “Calcular mi envío” se repite en los puntos de decisión; el seguimiento es una acción secundaria.
- **Precio explicable:** un desglose separa tarifa, peso, provincia e impuesto ilustrativo. No existen gastos ocultos en la simulación.
- **Errores accionables:** cada campo conserva su valor, explica cómo corregirlo y recibe foco si es el primero inválido.
- **Final útil:** copiar o descargar un resumen ofrece una salida concreta sin simular un envío de email.
- **Credibilidad honesta:** la ficción aparece en cabecera, herramientas y pie. No se inventan clientes, reseñas ni promesas ambientales.
- **Escalabilidad acotada:** Milla Negocios documenta una posible fase futura, sin aparentar integraciones que no existen.

## Implementación

Astro produce tres páginas estáticas. Tailwind se integra mediante Vite; la hoja de estilos define tokens y layouts responsive. TypeScript organiza un cálculo puro separado de los eventos de interfaz. La página no hidrata componentes de React ni usa servicios externos.

GitHub Actions instala desde lockfile, verifica tipos, compila y publica en GitHub Pages con un prefijo de ruta configurable. La indexación permanece desactivada para el negocio ficticio.

## Verificación

Se prueban cálculo, límites, cambio de servicio, descarga, tres estados de seguimiento, errores, menú, Escape, FAQ, anclas y páginas auxiliares. Axe comprueba barreras detectables en 320, 375, 768, 1440 y 1920 px. Las capturas permiten revisar todos los bloques, y Lighthouse mide tres navegaciones equivalentes por perfil móvil y escritorio.

El primer pase detectó un contraste insuficiente en la pequeña leyenda del CTA naranja (4,47:1); se oscureció ese texto y se repitieron las comprobaciones afectadas. El [informe final](../audits/audit.md) conserva las condiciones, cifras y límites.

## Límites y siguiente fase

No hay API logística, contratación, pagos ni captación. Los códigos postales no se verifican contra una base de direcciones. Las tarifas y plazos son ficticios. Para una empresa real faltan condiciones operativas verificadas, backend, tratamiento de datos y una revisión legal.

No se atribuyen mejoras de conversión a esta demo. Se documentan hipótesis futuras en [design-plan.md](design-plan.md), con ventanas comparables y métricas de guardia. Quedan pendientes datos de campo, revisión con lector de pantalla y alto contraste.
