import type { APIRoute } from "astro";
export const GET: APIRoute = ({ site }) => {
  const indexable =
    import.meta.env.PUBLIC_INDEXABLE === "true" && Boolean(site);
  return new Response(
    `User-agent: *\n${indexable ? "Allow: /" : "Disallow: /"}\n${indexable ? `Sitemap: ${new URL(`${import.meta.env.BASE_URL}sitemap.xml`, site)}\n` : ""}`,
    { headers: { "Content-Type": "text/plain; charset=utf-8" } },
  );
};
