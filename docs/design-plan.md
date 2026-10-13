# Milla · dirección y estrategia

Marca ficticia de paquetería para comercios online, autónomos y personas que envían dentro de España peninsular. El objetivo de la demo es completar una estimación sin pedir datos personales. Tráfico supuesto: portfolio, GitHub y visitas de selección profesional. Stack: Astro estático + Tailwind 4, TypeScript para interacciones; sin hidratación ni servicios externos.

## Tres direcciones

1. Editorial cálida: titular expresivo, papel crema, tinta azul, acento naranja e ilustración vectorial propia. Cercanía y claridad.
2. Tecnología operativa: fondo oscuro, mapa y datos compactos. Apropiada para un producto logístico empresarial.
3. Urbana expresiva: carteles, color intenso y composición diagonal. Más atrevida, menos centrada en la lectura.

Se selecciona la editorial: diferencia la marca y permite mostrar el recorrido de un paquete sin usar fotografías genéricas. Gesto distintivo: una ruta de puntos que une cajas, etiquetas y destinos.

DESIGN_VARIANCE 7 / MOTION_INTENSITY 3 / VISUAL_DENSITY 4. Consulta UI/UX Pro Max: coincidencia Operations Landing + Minimalism & Swiss Style; se adopta claridad operativa y jerarquía, se adapta la paleta al brief. No se aplica telemetría en vivo a una demo.

## Tokens

- Papel #f7f5ef: fondo principal.
- Tinta #172d43: texto, botones, sección de proceso.
- Naranja #ed693b: superficies de marca y detalles; texto oscuro encima.
- Blanco #ffffff: controles, tarjetas.
- Texto secundario #52616c: párrafos y leyendas.
- Borde #d9ddd9: separadores decorativos; controles #83909b.

Tipografía local de sistema: Arial/Helvetica para cuerpo y titulares, Georgia italic como acento editorial. H1 clamp 48–92 px; H2 36–64 px; cuerpo 16–19 px, line-height 1.6. Espacios 8/12/16/24/32/48/64/96/128 px. Contenedor máximo 1280 px; lectura máxima 60 caracteres. Breakpoints 640/900/1200 px.

## Mapa de secciones

Navegación → hero con oferta y CTA “Calcular mi envío” → atributos de servicio → servicios → proceso → cotizador → seguimiento ilustrativo → FAQ → CTA final → footer con enlaces legales y caso de estudio. En móvil: orden de lectura natural, menú desplegable y formularios de una columna. No se requiere un contacto real ni se inventa prueba social.

## Recorridos y movimiento

Cotizador: códigos postales peninsulares + peso + servicio → validación específica → resultado orientativo → resumen copiable/descargable. Errores preservan valores y enfocan el primer campo inválido. Destinos insulares se explican como fuera del alcance de la demo. Seguimiento: códigos de ejemplo con estado entregado, en reparto o incidencia; código desconocido tiene un mensaje útil. Nada se guarda ni se transmite.

Feedback de botones 180 ms ease-out; entrada breve de la ilustración 450 ms; sin loops. Reduced motion elimina animaciones y scroll suave. Contenido esencial siempre visible sin JavaScript.

## Hipótesis futuras, sin tracking instalado

1. “Calcular mi envío” frente a “Ver tarifas”: comparar inicios/vistas de CTA en la misma ventana; guardrail errores.
2. Mostrar el desglose frente a precio único: comparar demos completadas/inicios; guardrail comprensión del precio.
3. Proceso antes o después de servicios: comparar interacción con cotizador; guardrail rendimiento y navegación.
   Eventos propuestos: cta_clicked (ubicación), quote_started, quote_error (campo, sin valor), demo_completed. Una demo completada no es un lead. Validación real requiere tráfico comparable y ventanas cerradas.
