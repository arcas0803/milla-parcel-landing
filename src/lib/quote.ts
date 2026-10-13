export type Service = "standard" | "express";
export type QuoteInput = {
  origin: string;
  destination: string;
  weight: number;
  service: Service;
};
export const services = {
  standard: { label: "Estándar", days: "2–3 días laborables", base: 4.9 },
  express: { label: "Express", days: "1–2 días laborables", base: 7.9 },
};
export function validatePostcode(value: string): string {
  if (!/^(0[1-9]|[1-4][0-9]|5[0-2])[0-9]{3}$/.test(value))
    return "Introduce un código postal español de 5 cifras, por ejemplo 28013.";
  if (["07", "35", "38", "51", "52"].includes(value.slice(0, 2)))
    return "Esta demo cubre solo la península. Prueba Madrid (28013) o Barcelona (08001).";
  return "";
}
export function calculateQuote(input: QuoteInput) {
  const originError = validatePostcode(input.origin);
  const destinationError = validatePostcode(input.destination);
  if (
    originError ||
    destinationError ||
    !Number.isFinite(input.weight) ||
    input.weight < 0.1 ||
    input.weight > 20 ||
    !services[input.service]
  )
    throw new Error("Revisa los datos del envío.");
  const base = services[input.service].base;
  const weightFee = Math.ceil(Math.max(0, input.weight - 1)) * 0.65;
  const routeFee =
    input.origin.slice(0, 2) === input.destination.slice(0, 2) ? 0 : 1.5;
  const subtotal = Math.round((base + weightFee + routeFee) * 100) / 100;
  const tax = Math.round(subtotal * 0.21 * 100) / 100;
  return {
    weightFee,
    routeFee,
    subtotal,
    tax,
    total: Math.round((subtotal + tax) * 100) / 100,
    ...services[input.service],
  };
}
export const money = (value: number) =>
  new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(
    value,
  );
