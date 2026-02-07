import { useEffect } from "react";

type SeoProps = {
  title: string;
  description?: string;
  /** e.g. "/us-assessment". If omitted, no canonical tag is set/updated. */
  canonicalPath?: string;
  /** If true, adds a noindex robots meta. */
  noindex?: boolean;
};

function upsertMeta(name: string, content: string) {
  let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertCanonical(canonicalPath: string) {
  const origin = window.location.origin;
  const href = `${origin}${canonicalPath}`;
  let el = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function setNoindex(noindex: boolean) {
  const existing = document.querySelector('meta[name="robots"]') as HTMLMetaElement | null;
  if (!noindex) {
    if (existing) existing.remove();
    return;
  }
  upsertMeta("robots", "noindex, nofollow");
}

export function Seo({ title, description, canonicalPath, noindex }: SeoProps) {
  useEffect(() => {
    document.title = title;
    if (description) {
      upsertMeta("description", description);
    }
    if (canonicalPath) {
      upsertCanonical(canonicalPath);
    }
    setNoindex(!!noindex);
  }, [title, description, canonicalPath, noindex]);

  return null;
}
