import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
const url = process.env.LANDING_URL || "http://127.0.0.1:4322/";
test("cotizador: validación, cálculo, cambio de servicio y descarga", async ({
  page,
}) => {
  await page.goto(url);
  await page.locator("#quote-form button[type=submit]").click();
  await expect(page.locator("#origin")).toBeFocused();
  await expect(page.locator("#origin")).toHaveAttribute("aria-invalid", "true");
  await page.locator("#origin").fill("35001");
  await page.locator("#destination").fill("08001");
  await page.locator("#weight").fill("2");
  await page.locator("#quote-form button[type=submit]").click();
  await expect(page.locator("#origin-error")).toContainText(
    "solo la península",
  );
  await page.locator("#origin").fill("28013");
  await page.locator("#quote-form button[type=submit]").click();
  await expect(page.locator(".result-price")).toHaveText(/8,53/);
  await page
    .getByRole("radio", { name: "Express 1–2 días laborables" })
    .check();
  await expect(page.locator("#quote-result")).toBeHidden();
  await page.locator("#quote-form button[type=submit]").click();
  await expect(page.locator(".result-price")).toHaveText(/12,16/);
  const [download] = await Promise.all([
    page.waitForEvent("download"),
    page.getByRole("button", { name: "Descargar .txt" }).click(),
  ]);
  expect(download.suggestedFilename()).toBe("milla-envio-demo.txt");
  await page.locator("#weight").fill("20.1");
  await page.locator("#quote-form button[type=submit]").click();
  await expect(page.locator("#weight")).toBeFocused();
  await expect(page.locator("#weight-error")).toContainText("entre 0,1 y 20");
});
test("seguimiento: tres estados, desconocido e input tras error", async ({
  page,
}) => {
  await page.goto(url);
  for (const [label, state] of [
    ["En reparto ↗", "Tu paquete está en reparto"],
    ["Entregado ↗", "Paquete entregado"],
    ["Incidencia ↗", "Una pausa en el camino"],
  ]) {
    await page.getByRole("button", { name: label, exact: true }).click();
    await expect(page.locator(".tracking-state")).toHaveText(state);
  }
  await page.locator("#tracking-code").fill("desconocido");
  await page.getByRole("button", { name: "Localizar", exact: true }).click();
  await expect(page.locator("#tracking-error")).toContainText("No encontramos");
  await page.locator("#tracking-code").fill("milla-2026");
  await expect(page.locator("#tracking-error")).toBeEmpty();
  await page.getByRole("button", { name: "Localizar", exact: true }).click();
  await expect(page.locator(".tracking-state")).toHaveText(
    "Tu paquete está en reparto",
  );
});
test("menú móvil, escape, ancla y FAQ con teclado", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto(url);
  await page.getByRole("button", { name: "Abrir menú" }).click();
  await expect(page.locator("#navigation")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.locator(".menu-toggle")).toBeFocused();
  await expect(page.locator("#navigation")).toBeHidden();
  await page.getByRole("button", { name: "Abrir menú" }).click();
  await page
    .locator("#navigation")
    .getByRole("link", { name: "Servicios", exact: true })
    .click();
  await expect(page.locator("#navigation")).toBeHidden();
  await page.locator("summary").first().focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("details").first()).toHaveAttribute("open", "");
});
test("responsive, accesibilidad automática y páginas auxiliares", async ({
  page,
}) => {
  await page.goto(url);
  for (const width of [320, 375, 768, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(results.violations).toEqual([]);
  }
  await page
    .getByRole("link", { name: "Caso de estudio ↗", exact: true })
    .click();
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "De una idea",
  );
  await page.getByRole("link", { name: "Volver a la landing ↗" }).click();
  await page.getByRole("link", { name: "Privacidad", exact: true }).click();
  await expect(page.locator("#privacidad")).toBeVisible();
});
test("sin JavaScript y movimiento reducido", async ({ browser, page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto(url);
  expect(
    await page
      .locator(".parcel-scene")
      .evaluate((el) => getComputedStyle(el).animationName),
  ).toBe("none");
  const context = await browser.newContext({ javaScriptEnabled: false });
  const plain = await context.newPage();
  await plain.goto(url);
  await expect(plain.getByRole("heading", { level: 1 })).toBeVisible();
  expect(await plain.locator("#cotizador noscript").textContent()).toContain(
    "Activa JavaScript",
  );
  // Chromium disables script execution without changing its HTML noscript parsing flag.
  await plain.locator("summary").first().click();
  await expect(plain.locator("details").first()).toHaveAttribute("open", "");
  await context.close();
});
