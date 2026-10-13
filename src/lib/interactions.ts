import { calculateQuote, validatePostcode, money, type Service } from "./quote";
const toggle = document.querySelector<HTMLButtonElement>(".menu-toggle")!;
const navigation = document.querySelector<HTMLElement>("#navigation")!;
function closeMenu(focus = false) {
  toggle.setAttribute("aria-expanded", "false");
  toggle.setAttribute("aria-label", "Abrir menú");
  navigation.classList.remove("is-open");
  if (focus) toggle.focus();
}
toggle.addEventListener("click", () => {
  const open = toggle.getAttribute("aria-expanded") !== "true";
  toggle.setAttribute("aria-expanded", String(open));
  toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
  navigation.classList.toggle("is-open", open);
});
navigation
  .querySelectorAll("a")
  .forEach((a) => a.addEventListener("click", () => closeMenu()));
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true")
    closeMenu(true);
});
matchMedia("(min-width: 901px)").addEventListener("change", () => closeMenu());
document
  .querySelectorAll<HTMLButtonElement>('button[type="submit"]')
  .forEach((button) => {
    button.disabled = false;
  });
const quoteForm = document.querySelector<HTMLFormElement>("#quote-form")!;
const result = document.querySelector<HTMLElement>("#quote-result")!;
const fields = ["origin", "destination", "weight"] as const;
function setError(id: string, message: string) {
  const input = document.getElementById(id)!;
  input.setAttribute("aria-invalid", String(Boolean(message)));
  document.getElementById(`${id}-error`)!.textContent = message;
}
function fieldError(id: string, value: string) {
  return id === "weight"
    ? !value ||
      !Number.isFinite(Number(value)) ||
      Number(value) < 0.1 ||
      Number(value) > 20 ||
      Math.abs(Number(value) * 10 - Math.round(Number(value) * 10)) > 0.000001
      ? "Indica un peso entre 0,1 y 20 kg, con un máximo de un decimal."
      : ""
    : validatePostcode(value.trim());
}
fields.forEach((id) => {
  const input = document.getElementById(id) as HTMLInputElement;
  input.addEventListener("input", () => {
    result.hidden = true;
    if (input.getAttribute("aria-invalid") === "true")
      setError(id, fieldError(id, input.value));
  });
});
quoteForm.addEventListener("change", () => {
  result.hidden = true;
});
document.querySelectorAll<HTMLAnchorElement>("[data-service]").forEach((link) =>
  link.addEventListener("click", () => {
    const input = quoteForm.querySelector<HTMLInputElement>(
      `input[value="${link.dataset.service}"]`,
    );
    if (input) input.checked = true;
    result.hidden = true;
  }),
);
quoteForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(quoteForm);
  let first: HTMLElement | null = null;
  fields.forEach((id) => {
    const message = fieldError(id, String(data.get(id) ?? ""));
    setError(id, message);
    if (message && !first) first = document.getElementById(id);
  });
  if (first) {
    result.hidden = true;
    (first as HTMLElement).focus();
    return;
  }
  const origin = String(data.get("origin")).trim(),
    destination = String(data.get("destination")).trim(),
    weight = Number(data.get("weight")),
    service = String(data.get("service")) as Service;
  const quote = calculateQuote({ origin, destination, weight, service });
  const weightLabel = new Intl.NumberFormat("es-ES").format(weight);
  const summary = `MILLA · SIMULACIÓN DE ENVÍO\n${origin} → ${destination} · ${weightLabel} kg\nServicio: ${quote.label} · Plazo ilustrativo: ${quote.days}\nBase: ${money(quote.base)}\nPeso adicional: ${money(quote.weightFee)}\nEntre provincias: ${money(quote.routeFee)}\nSubtotal: ${money(quote.subtotal)}\nImpuesto ilustrativo (21 %): ${money(quote.tax)}\nTotal orientativo: ${money(quote.total)}\nMarca ficticia. No es una contratación ni un presupuesto vinculante.`;
  // Only validated numeric fields and constants are interpolated, never arbitrary user text.
  result.innerHTML = `<span class="tag">TU ESTIMACIÓN DE EJEMPLO</span><div class="result-heading"><div><strong>${quote.label}</strong><p class="result-label">${quote.days} · plazo ilustrativo</p></div><span class="result-price">${money(quote.total)}</span></div><p class="result-route">${origin} → ${destination} · ${weightLabel} kg</p><dl class="result-breakdown"><div><dt>Tarifa base</dt><dd>${money(quote.base)}</dd></div><div><dt>Peso adicional</dt><dd>${money(quote.weightFee)}</dd></div><div><dt>Entre provincias</dt><dd>${money(quote.routeFee)}</dd></div><div><dt>Subtotal</dt><dd>${money(quote.subtotal)}</dd></div><div><dt>Impuesto ilustrativo (21 %)</dt><dd>${money(quote.tax)}</dd></div></dl><p class="result-note">No se ha contratado ningún envío. Puedes guardar este ejemplo para explorar el concepto.</p><div class="result-actions"><button type="button" class="subtle-button" id="copy-quote">Copiar resumen</button><button type="button" class="subtle-button" id="download-quote">Descargar .txt</button></div><p id="copy-status" class="field-help" role="status"></p>`;
  result.hidden = false;
  document.getElementById("copy-quote")!.addEventListener("click", async () => {
    const status = document.getElementById("copy-status")!;
    try {
      await navigator.clipboard.writeText(summary);
      status.textContent = "Resumen copiado.";
    } catch {
      status.textContent =
        "Tu navegador no permite copiar. Puedes descargar el resumen en su lugar.";
    }
  });
  document.getElementById("download-quote")!.addEventListener("click", () => {
    const url = URL.createObjectURL(
      new Blob([summary], { type: "text/plain;charset=utf-8" }),
    );
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "milla-envio-demo.txt";
    anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  });
});
const trackingForm = document.querySelector<HTMLFormElement>("#tracking-form")!;
const trackingInput =
  document.querySelector<HTMLInputElement>("#tracking-code")!;
const trackingResult = document.querySelector<HTMLElement>("#tracking-result")!;
const examples: Record<
  string,
  { state: string; description: string; stage: number }
> = {
  "MILLA-2026": {
    state: "Tu paquete está en reparto",
    description:
      "En este ejemplo, el paquete ha salido del centro de destino y está en la última etapa de su recorrido. No hay una entrega real programada.",
    stage: 2,
  },
  "MILLA-2025": {
    state: "Paquete entregado",
    description:
      "Este recorrido ficticio ha terminado. El paquete de ejemplo figura como entregado en su destino.",
    stage: 3,
  },
  "MILLA-2024": {
    state: "Una pausa en el camino",
    description:
      "Incidencia de ejemplo: no se pudo completar la entrega. En un servicio real, aquí se ofrecerían instrucciones para acordar un nuevo intento.",
    stage: 2,
  },
};
trackingInput.addEventListener("input", () => {
  trackingError("");
  trackingResult.hidden = true;
});
// Tracking uses its own error element so its descriptive helper remains stable.
function trackingError(message: string) {
  trackingInput.setAttribute("aria-invalid", String(Boolean(message)));
  document.getElementById("tracking-error")!.textContent = message;
}
trackingForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const code = trackingInput.value.trim().toUpperCase();
  const example = examples[code];
  if (!example) {
    trackingError(
      code
        ? "No encontramos ese código en la demo. Prueba MILLA-2026, MILLA-2025 o MILLA-2024."
        : "Introduce un código o elige uno de los ejemplos.",
    );
    trackingResult.hidden = true;
    trackingInput.focus();
    return;
  }
  trackingError("");
  trackingInput.value = code;
  trackingResult.innerHTML = `<span class="tag">ENVÍO FICTICIO · ${code}</span><h3 class="tracking-state">${example.state}</h3><p>${example.description}</p><ol class="timeline">${["Recogido", "En tránsito", "En reparto", "Entregado"].map((label, index) => `<li class="${index <= example.stage ? "done" : ""}">${label}${index === example.stage ? " · Estado actual" : ""}</li>`).join("")}</ol>`;
  trackingResult.hidden = false;
});
document
  .querySelectorAll<HTMLButtonElement>("[data-tracking]")
  .forEach((button) =>
    button.addEventListener("click", () => {
      trackingInput.value = button.dataset.tracking!;
      trackingForm.requestSubmit();
    }),
  );
