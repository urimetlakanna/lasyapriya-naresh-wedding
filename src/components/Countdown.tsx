import { useEffect, useState } from "react";
import { useLang } from "../i18n";
import { WEDDING_MOMENT } from "../data";
import { Divider, Mandala, Reveal } from "../ornaments";

const target = new Date(WEDDING_MOMENT).getTime();

function useRemaining() {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);
  const diff = Math.max(0, target - now);
  return {
    done: diff === 0,
    d: Math.floor(diff / 86400000),
    h: Math.floor((diff / 3600000) % 24),
    m: Math.floor((diff / 60000) % 60),
    s: Math.floor((diff / 1000) % 60),
  };
}

export function Countdown() {
  const { lang, u } = useLang();
  const r = useRemaining();
  const cells = [
    { v: r.d, k: u("days") },
    { v: r.h, k: u("hours") },
    { v: r.m, k: u("minutes") },
    { v: r.s, k: u("seconds") },
  ];
  const pretty = lang === "te" ? "18 నవంబర్ 2026 · ఉదయం 10:12" : "18 November 2026 · 10:12 AM";

  return (
    <section
      id="countdown"
      className="relative overflow-hidden px-5 py-24 text-ivory sm:py-28"
      style={{ background: "linear-gradient(160deg,#6b1b2b 0%,#4a1020 55%,#3f0e19 100%)" }}
    >
      <Mandala className="absolute left-1/2 top-1/2 h-[110vmin] w-[110vmin] -translate-x-1/2 -translate-y-1/2 text-gold/[0.1]" style={{ animation: "spin-slow 200s linear infinite" }} />
      <div className="relative mx-auto max-w-3xl text-center">
        <Reveal>
          <p className="label text-champagne">{pretty}</p>
          <h2 className="gold-text mt-3 font-script text-4xl leading-snug sm:text-6xl">{u("countdownTitle")}</h2>
          <Divider light className="mt-5" />
        </Reveal>

        {r.done ? (
          <Reveal className="mt-10">
            <p className="font-display text-2xl italic text-champagne sm:text-3xl">{u("countdownDone")}</p>
          </Reveal>
        ) : (
          <Reveal delay={150} className="mt-10 grid grid-cols-4 gap-2 sm:gap-5" >
            {cells.map((c, i) => (
              <div
                key={i}
                className="gold-border relative overflow-hidden rounded-2xl px-1 py-5 sm:py-8"
                style={{ ["--card-bg" as string]: "#4a1020" }}
              >
                <div className="absolute inset-x-0 top-1/2 h-px bg-gold/20" />
                <div key={c.v} className="font-display text-4xl font-semibold tabular-nums text-ivory sm:text-6xl" style={{ animation: "tick .5s ease-out" }}>
                  {String(c.v).padStart(2, "0")}
                </div>
                <div className="label mt-2 !text-[0.55rem] text-champagne sm:!text-[0.65rem]">{c.k}</div>
              </div>
            ))}
          </Reveal>
        )}
      </div>
    </section>
  );
}
