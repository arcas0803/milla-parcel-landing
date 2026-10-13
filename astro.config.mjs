import { defineConfig } from "astro/config";
import tailwind from "@tailwindcss/vite";
const site = process.env.SITE_URL;
if (site && !/^https:\/\//.test(site))
  throw new Error("SITE_URL must be an absolute HTTPS origin.");
const base = process.env.BASE_PATH || "/";
export default defineConfig({
  site: site || undefined,
  base,
  vite: { plugins: [tailwind()] },
  devToolbar: { enabled: false },
});
