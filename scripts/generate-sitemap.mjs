import fs from "fs";
import path from "path";

const repoRoot = path.resolve(process.cwd());
const routersPath = path.join(repoRoot, "src", "configs", "routers.ts");
const publicDir = path.join(repoRoot, "public");
const outPath = path.join(publicDir, "sitemap.xml");

const origin = process.env.SITE_ORIGIN || "https://YOUR_DOMAIN";

function extractRouteIds(tsText) {
  const ids = [];
  const re = /id\s*:\s*["']([^"']+)["']/g;
  let m;
  while ((m = re.exec(tsText))) {
    ids.push(m[1]);
  }
  // De-dup while preserving order
  return Array.from(new Set(ids));
}

function buildXml(urls) {
  const today = new Date().toISOString().split("T")[0];
  return `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls
      .map((u) => {
        return `  <url>\n    <loc>${u}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`;
      })
      .join("\n") +
    `\n</urlset>\n`;
}

if (!fs.existsSync(routersPath)) {
  console.error(`Cannot find routers file at: ${routersPath}`);
  process.exit(1);
}

const tsText = fs.readFileSync(routersPath, "utf8");
const ids = extractRouteIds(tsText);

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

const urls = [origin.replace(/\/$/, ""), ...ids.map((id) => `${origin.replace(/\/$/, "")}/${id}`)];
fs.writeFileSync(outPath, buildXml(urls), "utf8");

console.log(`Sitemap generated with ${urls.length} URLs -> ${outPath}`);
