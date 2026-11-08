import { useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { cn } from "./utils/cn";

/* ───────── Mandala: layered lotus petals ───────── */
export function Mandala({ className, style }: { className?: string; style?: CSSProperties }) {
  const ring = (n: number, scale: number, op: number, rot = 0) =>
    Array.from({ length: n }, (_, i) => (
      <path
        key={`${n}-${scale}-${i}`}
        d="M0 -92 C 15 -70, 15 -44, 0 -22 C -15 -44, -15 -70, 0 -92Z"
        transform={`rotate(${(360 / n) * i + rot}) scale(${scale})`}
        opacity={op}
      />
    ));
  return (
    <svg viewBox="-100 -100 200 200" className={className} style={style} fill="none" stroke="currentColor" strokeWidth="0.7" aria-hidden>
      <circle r="97" opacity=".5" />
      <circle r="94" opacity=".25" strokeDasharray="1 3" />
      {ring(24, 1, 0.55)}
      {ring(16, 0.78, 0.7, 11.25)}
      {ring(12, 0.55, 0.85)}
      {ring(8, 0.34, 1, 22.5)}
      <circle r="12" />
      <circle r="6" />
      <circle r="2" fill="currentColor" />
      {Array.from({ length: 36 }, (_, i) => (
        <circle key={i} cx="0" cy="-96" r="0.9" fill="currentColor" transform={`rotate(${i * 10})`} />
      ))}
    </svg>
  );
}

/* ───────── Divider with lotus ───────── */
export function Divider({ className, light }: { className?: string; light?: boolean }) {
  return (
    <div className={cn("mx-auto flex items-center justify-center gap-3", light ? "text-champagne" : "text-gold", className)} aria-hidden>
      <span className="h-px w-16 bg-gradient-to-r from-transparent to-current sm:w-28" />
      <svg viewBox="-20 -14 40 28" className="h-6 w-9" fill="none" stroke="currentColor" strokeWidth="1">
        <path d="M0 -12 C 6 -6, 6 4, 0 10 C -6 4, -6 -6, 0 -12Z" />
        <path d="M-2 10 C -14 8, -18 -2, -17 -8 C -10 -6, -4 0, -2 10Z" />
        <path d="M2 10 C 14 8, 18 -2, 17 -8 C 10 -6, 4 0, 2 10Z" />
        <circle cy="-1" r="1.4" fill="currentColor" />
      </svg>
      <span className="h-px w-16 bg-gradient-to-l from-transparent to-current sm:w-28" />
    </div>
  );
}

/* ───────── Corner flourish ───────── */
export function Corner({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" stroke="currentColor" strokeWidth="1.1" aria-hidden>
      <path d="M3 117 V34 C3 16 16 3 34 3 H117" />
      <path d="M12 117 V38 C12 24 24 12 38 12 H117" opacity=".45" />
      <path d="M3 52 C 24 52, 28 30, 52 3" opacity=".7" />
      <path d="M22 22 C 34 22, 42 30, 42 42 C 30 42, 22 34, 22 22Z" />
      <path d="M22 22 C 10 22, 6 14, 6 6 C 14 6, 22 10, 22 22Z" opacity=".7" />
      <circle cx="22" cy="22" r="2.4" fill="currentColor" />
      <circle cx="60" cy="8" r="1.6" fill="currentColor" />
      <circle cx="8" cy="60" r="1.6" fill="currentColor" />
      <circle cx="84" cy="8" r="1" fill="currentColor" opacity=".7" />
      <circle cx="8" cy="84" r="1" fill="currentColor" opacity=".7" />
    </svg>
  );
}

export function Corners({ className }: { className?: string }) {
  return (
    <>
      <Corner className={cn("pointer-events-none absolute left-2 top-2 h-16 w-16 sm:left-5 sm:top-5 sm:h-28 sm:w-28", className)} />
      <Corner className={cn("pointer-events-none absolute right-2 top-2 h-16 w-16 -scale-x-100 sm:right-5 sm:top-5 sm:h-28 sm:w-28", className)} />
      <Corner className={cn("pointer-events-none absolute bottom-2 left-2 h-16 w-16 -scale-y-100 sm:bottom-5 sm:left-5 sm:h-28 sm:w-28", className)} />
      <Corner className={cn("pointer-events-none absolute bottom-2 right-2 h-16 w-16 scale-[-1] sm:bottom-5 sm:right-5 sm:h-28 sm:w-28", className)} />
    </>
  );
}

/* ───────── Marigold & rose garland (toran) ───────── */
export function Garland({ className }: { className?: string }) {
  const flowers = useMemo(() => {
    const out: { x: number; y: number; c: string; r: number }[] = [];
    const palette = ["#E59A1A", "#F2B632", "#C9302C", "#E8731C", "#F7D060", "#9E1B32"];
    const arcs = 6;
    const W = 1200;
    for (let a = 0; a < arcs; a++) {
      const x0 = (W / arcs) * a;
      const per = 9;
      for (let i = 0; i <= per; i++) {
        const t = i / per;
        const x = x0 + t * (W / arcs);
        const y = 8 + Math.sin(t * Math.PI) * 34;
        out.push({ x, y, c: palette[(a * 3 + i) % palette.length], r: 8 + ((i + a) % 3) * 1.4 });
      }
    }
    return out;
  }, []);
  return (
    <svg viewBox="0 0 1200 70" preserveAspectRatio="xMidYMin slice" className={cn("pointer-events-none w-full", className)} aria-hidden>
      <g style={{ transformOrigin: "50% 0", animation: "sway 7s ease-in-out infinite" }}>
        {flowers.map((f, i) => (
          <g key={i}>
            <circle cx={f.x} cy={f.y} r={f.r} fill={f.c} />
            <circle cx={f.x} cy={f.y} r={f.r * 0.55} fill="#fff" opacity=".18" />
            <circle cx={f.x} cy={f.y} r={f.r * 0.22} fill="#5a1a10" opacity=".55" />
          </g>
        ))}
        {[100, 300, 500, 700, 900, 1100].map((x, i) => (
          <g key={x}>
            <line x1={x} y1={42} x2={x} y2={58 + (i % 2) * 6} stroke="#B8923F" strokeWidth="1.3" />
            <circle cx={x} cy={62 + (i % 2) * 6} r="4.5" fill="#E7D3A1" />
            <circle cx={x} cy={62 + (i % 2) * 6} r="2" fill="#B8923F" />
          </g>
        ))}
      </g>
    </svg>
  );
}

/* ───────── Falling petals ───────── */
export function Petals({ count = 14, className }: { count?: number; className?: string }) {
  const items = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const seed = (i * 9301 + 49297) % 233280;
        const rnd = (k: number) => ((seed * (k + 3)) % 1000) / 1000;
        return {
          left: `${rnd(1) * 100}%`,
          size: 8 + rnd(2) * 12,
          dur: 11 + rnd(3) * 12,
          delay: -rnd(4) * 22,
          sway: (rnd(5) - 0.5) * 140,
          color: ["#E7D3A1", "#B8923F", "#C45A6B", "#F3D77A", "#fff1d0"][i % 5],
        };
      }),
    [count],
  );
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden>
      {items.map((p, i) => (
        <span
          key={i}
          className="petal"
          style={
            {
              left: p.left,
              width: p.size,
              height: p.size * 1.4,
              background: `radial-gradient(ellipse at 30% 30%, #fff8, ${p.color})`,
              borderRadius: "70% 0 70% 0",
              animationDuration: `${p.dur}s`,
              animationDelay: `${p.delay}s`,
              opacity: 0.8,
              "--sway": `${p.sway}px`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}

/* ───────── Scroll reveal ───────── */
export function Reveal({
  children,
  delay = 0,
  variant = "up",
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  variant?: "up" | "left" | "right" | "zoom";
  className?: string;
  as?: "div" | "section" | "li" | "p" | "h2";
}) {
  const ref = useRef<HTMLElement>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setSeen(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const Comp = Tag as "div";
  return (
    <Comp
      ref={ref as React.RefObject<HTMLDivElement>}
      className={cn(
        "reveal",
        variant === "left" && "reveal-left",
        variant === "right" && "reveal-right",
        variant === "zoom" && "reveal-zoom",
        seen && "in",
        className,
      )}
      style={{ "--d": `${delay}ms` } as CSSProperties}
    >
      {children}
    </Comp>
  );
}

/* ───────── Icons ───────── */
export const IconWhatsApp = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2Zm0 18.15c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 4.54 0 8.24 3.7 8.24 8.24s-3.7 8.24-8.24 8.24Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.15.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.42h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.23-.16-.48-.29Z" />
  </svg>
);

export const IconPin = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M12 21s-7-6.1-7-11.5A7 7 0 0 1 19 9.5C19 14.9 12 21 12 21Z" />
    <circle cx="12" cy="9.5" r="2.6" />
  </svg>
);

export const IconNav = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M3 11 21 3l-8 18-2-8-8-2Z" />
  </svg>
);

export const IconClock = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);

export const IconShare = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <circle cx="18" cy="5" r="2.6" />
    <circle cx="6" cy="12" r="2.6" />
    <circle cx="18" cy="19" r="2.6" />
    <path d="m8.3 10.8 7.4-4.4M8.3 13.2l7.4 4.4" />
  </svg>
);

export const IconLink = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1" />
    <path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" />
  </svg>
);

export const IconMusic = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M9 18V5l11-2v13" />
    <circle cx="6" cy="18" r="3" />
    <circle cx="17" cy="16" r="3" />
  </svg>
);
