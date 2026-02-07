// Simple SEO helpers for SPA pages (title/description/canonical/OG).
// Note: Search engines may require SSR/prerender for best results, but these tags help.
export function setPageSEO({ title, description, canonicalPath }) {
  if (typeof document === 'undefined') return;

  if (title) document.title = title;

  if (description) {
    const meta = document.querySelector('meta[name="description"]') || (() => {
      const m = document.createElement("meta");
      m.setAttribute("name", "description");
      document.head.appendChild(m);
      return m;
    })();
    meta.setAttribute("content", description);
  }

  // Canonical
  if (canonicalPath) {
    const href = (() => {
      try { return new URL(canonicalPath, window.location.origin).toString(); }
      catch { return canonicalPath; }
    })();
    const link = document.querySelector('link[rel="canonical"]') || (() => {
      const l = document.createElement("link");
      l.setAttribute("rel", "canonical");
      document.head.appendChild(l);
      return l;
    })();
    link.setAttribute("href", href);
  }

  // OpenGraph (best-effort)
  if (title) {
    const ogt = document.querySelector('meta[property="og:title"]') || (() => {
      const m = document.createElement("meta");
      m.setAttribute("property", "og:title");
      document.head.appendChild(m);
      return m;
    })();
    ogt.setAttribute("content", title);
  }

  if (description) {
    const ogd = document.querySelector('meta[property="og:description"]') || (() => {
      const m = document.createElement("meta");
      m.setAttribute("property", "og:description");
      document.head.appendChild(m);
      return m;
    })();
    ogd.setAttribute("content", description);
  }
}
