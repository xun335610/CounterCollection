import { useEffect } from "react";

export type FaqItem = {
  question: string;
  answer: string;
};

type Props = {
  /** A stable id so multiple FAQ blocks can coexist across pages if needed. */
  id: string;
  faqs: FaqItem[];
};

function buildFaqJsonLd(faqs: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };
}

export function FaqJsonLd({ id, faqs }: Props) {
  useEffect(() => {
    const scriptId = `faq-jsonld-${id}`;
    const payload = JSON.stringify(buildFaqJsonLd(faqs));

    let el = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!el) {
      el = document.createElement("script");
      el.id = scriptId;
      el.type = "application/ld+json";
      document.head.appendChild(el);
    }
    el.text = payload;

    return () => {
      // Keep the head clean when navigating between SPA routes.
      const existing = document.getElementById(scriptId);
      if (existing) existing.remove();
    };
  }, [id, faqs]);

  return null;
}
