export type StoredEnvelope<T> = {
  v: number;
  exp?: number; // ms epoch
  data: T;
};

const isBrowser = typeof window !== "undefined";

function safeParse(raw: string | null): any | null {
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function unwrap<T>(parsed: any): { data: T | null; isEnvelope: boolean; expired: boolean } {
  if (!parsed) return { data: null, isEnvelope: false, expired: false };

  // Envelope format {v, exp, data}
  if (typeof parsed === "object" && parsed.data !== undefined && parsed.v !== undefined) {
    const exp = typeof parsed.exp === "number" ? parsed.exp : undefined;
    if (exp && Date.now() > exp) return { data: null, isEnvelope: true, expired: true };
    return { data: parsed.data as T, isEnvelope: true, expired: false };
  }

  // Legacy: plain object
  return { data: parsed as T, isEnvelope: false, expired: false };
}

export function getAssessmentResult<T = any>(key: string): T | null {
  if (!isBrowser) return null;

  // 1) session first
  const sessionParsed = safeParse(window.sessionStorage.getItem(key));
  const s = unwrap<T>(sessionParsed);
  if (s.data) return s.data;

  // 2) local fallback (with TTL)
  const localRaw = window.localStorage.getItem(key);
  const localParsed = safeParse(localRaw);
  const l = unwrap<T>(localParsed);

  // If expired envelope, clean up
  if (l.isEnvelope && l.expired) {
    try { window.localStorage.removeItem(key); } catch {}
    return null;
  }

  return l.data;
}

export function setAssessmentResult<T = any>(
  key: string,
  data: T,
  opts?: { remember?: boolean; ttlDays?: number }
): void {
  if (!isBrowser) return;

  const remember = !!opts?.remember;
  const ttlDays = typeof opts?.ttlDays === "number" ? opts!.ttlDays : 7;
  const exp = remember ? Date.now() + ttlDays * 24 * 60 * 60 * 1000 : undefined;
  const envelope: StoredEnvelope<T> = { v: 1, exp, data };

  // Always write session for current flow stability
  try {
    window.sessionStorage.setItem(key, JSON.stringify(envelope));
  } catch {
    // ignore
  }

  // Only persist locally when user opts in
  if (remember) {
    try {
      window.localStorage.setItem(key, JSON.stringify(envelope));
    } catch {
      // ignore
    }
  } else {
    // If user turned off remember, remove any previous local cache
    try {
      window.localStorage.removeItem(key);
    } catch {
      // ignore
    }
  }
}

export function removeAssessmentResult(key: string): void {
  if (!isBrowser) return;
  try { window.sessionStorage.removeItem(key); } catch {}
  try { window.localStorage.removeItem(key); } catch {}
}
