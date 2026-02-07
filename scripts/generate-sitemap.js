
const fs = require("fs");

const pages = [
  "/", "/us", "/us-assessment", "/us-illegal-collection",
  "/us-risk-warning", "/us-solutions", "/us-guides",
  "/us-guide-debt-validation", "/us-guide-stop-calls",
  "/us-guide-threats-arrest", "/us-guide-contact-family",
  "/us-guide-wrong-person", "/us-guide-scam-collector"
];

const domain = process.env.SITE_DOMAIN || "https://YOUR_DOMAIN";

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages.map(p => `<url><loc>${domain}${p}</loc></url>`).join("\n")}
</urlset>`;

fs.writeFileSync("public/sitemap.xml", xml);
console.log("sitemap.xml generated");
