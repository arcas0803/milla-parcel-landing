import type { APIRoute } from "astro";
export const GET: APIRoute = ({ site }) => {
  const indexable =
    import.meta.env.PUBLIC_INDEXABLE === "true" && Boolean(site);
  const pages = indexable
    ? ["", "proyecto/", "legal/"]
        .map(
          (path) =>
            `<url><loc>${new URL(`${import.meta.env.BASE_URL}${path}`, site).href.replaceAll("&", "&amp;").replaceAll("<", "&lt;")}</loc></url>`,
        )
        .join("")
    : "";
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pages}</urlset>`,
    { headers: { "Content-Type": "application/xml; charset=utf-8" } },
  );
};
