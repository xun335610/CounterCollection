// @ts-ignore
import React from 'react';
// @ts-ignore
import { Button } from '@/components/ui/button';
// @ts-ignore
import { Separator } from '@/components/ui/separator';

export default function UsNav({ $w, current }) {
  const nav = (pageId) => $w?.utils?.navigateTo?.({ pageId });

  const items = [
    { id: 'us/home', label: 'Home' },
    { id: 'us/assessment', label: 'Assessment' },
    { id: 'us/solutions', label: 'Solutions' },
    { id: 'us/state-laws', label: 'State rules' },
    { id: 'us/disclaimer', label: 'Disclaimer' },
    { id: 'us/privacy', label: 'Privacy' },
  ];

  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-2 items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {items.map((it) => (
            <Button
              key={it.id}
              variant={current === it.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => nav(it.id)}
            >
              {it.label}
            </Button>
          ))}
        </div>

        <Button variant="ghost" size="sm" onClick={() => $w?.utils?.navigateBack?.()}>
          Back
        </Button>
      </div>
      <Separator className="mt-4" />
    </div>
  );
}
