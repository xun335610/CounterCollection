import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export type RelatedLink = {
  to: string;
  label: string;
  description?: string;
};

type Props = {
  title?: string;
  links: RelatedLink[];
};

/**
 * A small, style-safe card that adds internal links without changing the page layout.
 * Use it at the bottom of pages to avoid content duplication between Assessment and Guides.
 */
export function RelatedLinksCard({ title = "Next steps", links }: Props) {
  if (!links?.length) return null;

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 sm:grid-cols-2">
          {links.map((l) => (
            <div key={`${l.to}-${l.label}`} className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="font-medium leading-tight">{l.label}</div>
                {l.description ? (
                  <div className="text-sm text-muted-foreground leading-snug">{l.description}</div>
                ) : null}
              </div>
              <Button asChild variant="outline" size="sm" className="shrink-0">
                <Link to={l.to}>Open</Link>
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
