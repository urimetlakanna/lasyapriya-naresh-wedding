import { useState, type ReactNode } from "react";
import { useLang } from "../i18n";
import { events, weddingDetails, type EventData } from "../data";
import { Corners, Divider, Garland, IconClock, IconNav, IconPin, Mandala, Petals, Reveal } from "../ornaments";
import { cn } from "../utils/cn";

type Theme = {
  root: string;
  accent: string;
  muted: string;
  ring: string;
  card: string;
  primary: string;
  ghost: string;
  title: string;
};

const themes: Record<EventData["id"], Theme> = {
  haldi: {
    root: "bg-[linear-gradient(165deg,#fdf3cd_0%,#f7e08f_58%,#f1cf66_100%)] text-wine",
    accent: "text-antique",
    muted: "text-wine/70",
    ring: "text-antique",
    card: "bg-white/55 border-antique/30",
    primary: "bg-burgundy text-ivory hover:bg-wine",
    ghost: "border-burgundy/50 text-burgundy hover:bg-burgundy/10",
    title: "text-burgundy",
  },
  wedding: {
    root: "bg-wine text-ivory",
    accent: "text-champagne",
    muted: "text-ivory/70",
    ring: "text-gold",
    card: "bg-white/[0.06] border-champagne/25",
    primary: "bg-gradient-to-r from-[#b8923f] via-[#f0dc9a] to-[#b8923f] text-wine hover:brightness-110",
    ghost: "border-champagne/50 text-champagne hover:bg-champagne/10",
    title: "gold-text",
  },
  reception: {
    root: "bg-[linear-gradient(180deg,#f4ead2_0%,#ecdcb4_100%)] text-wine",
    accent: "text-burgundy",
    muted: "text-wine/70",
    ring: "text-gold",
    card: "bg-ivory/70 border-gold/40",
    primary: "bg-burgundy text-ivory hover:bg-wine",
    ghost: "border-burgundy/50 text-burgundy hover:bg-burgundy/10",
    title: "text-burgundy",
  },
};

const dirUrl = (e: EventData) =>
  e.mapUrl ?? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(e.mapQuery)}`;
const embedUrl = (e: EventData) => `https://maps.google.com/maps?q=${encodeURIComponent(e.mapQuery)}&z=15&output=embed`;

function Medallion({ e, th, big }: { e: EventData; th: Theme; big?: boolean }) {
  const { t } = useLang();
  return (
    <div className={cn("relative mx-auto shrink-0", big ? "h-64 w-64 sm:h-80 sm:w-80" : "h-56 w-56 sm:h-64 sm:w-64")}>
      <Mandala className={cn("absolute inset-0", th.ring)} style={{ animation: "spin-slow 90s linear infinite" }} />
      <Mandala className={cn("absolute inset-[9%] opacity-60", th.ring)} style={{ animation: "spin-rev 70s linear infinite" }} />
      <div className={cn("absolute inset-[20%] flex flex-col items-center justify-center rounded-full border text-center shadow-xl", th.card, "backdrop-blur-sm")}>
        <span className={cn("label !text-[0.6rem]", th.accent)}>{t(e.weekday)}</span>
        <span className={cn("font-display font-semibold leading-none", big ? "text-7xl sm:text-8xl" : "text-6xl sm:text-7xl", e.id === "wedding" ? "gold-text" : th.accent)}>
          {e.day}
        </span>
        <span className="mt-1 text-sm sm:text-base">{t(e.month)}</span>
        <span className={cn("text-xs", th.muted)}>{e.year}</span>
      </div>
    </div>
  );
}

function Row({ icon, label, children, th }: { icon: ReactNode; label: string; children: ReactNode; th: Theme }) {
  return (
    <div className="flex items-start gap-4 text-left">
      <span className={cn("mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border", th.card, th.accent)}>{icon}</span>
      <div>
        <p className={cn("label !text-[0.62rem]", th.accent)}>{label}</p>
        <div className="text-lg leading-snug sm:text-xl">{children}</div>
      </div>
    </div>
  );
}

function EventSection({ e, index }: { e: EventData; index: number }) {
  const { lang, t, u } = useLang();
  const [showMap, setShowMap] = useState(false);
  const th = themes[e.id];
  const isWedding = e.id === "wedding";
  const flip = index % 2 === 1;
  const other = lang === "en" ? "te" : "en";

  return (
    <section id={e.id} className={cn("relative overflow-hidden px-5 py-20 sm:py-28", th.root)}>
      {e.id === "haldi" && (
        <>
          <Garland className="absolute left-0 top-0 h-12 sm:h-16" />
          <Petals count={10} />
        </>
      )}
      {isWedding && (
        <>
          <Mandala className="absolute left-1/2 top-1/2 h-[130vmin] w-[130vmin] -translate-x-1/2 -translate-y-1/2 text-gold/[0.08]" style={{ animation: "spin-slow 280s linear infinite" }} />
          <Corners className="text-gold/50" />
          <Petals count={12} />
        </>
      )}
      {e.id === "reception" && <Corners className="text-gold/60" />}

      <div className={cn("relative mx-auto grid max-w-5xl items-center gap-10 md:gap-14", isWedding ? "md:grid-cols-[22rem_1fr]" : "md:grid-cols-[18rem_1fr]", flip && "md:[direction:rtl]")}>
        <Reveal variant={flip ? "right" : "left"} className="md:[direction:ltr]">
          <Medallion e={e} th={th} big={isWedding} />
        </Reveal>

        <div className="text-center md:text-left md:[direction:ltr]">
          <Reveal>
            <p className={cn("label", th.accent)}>
              {String(index + 1).padStart(2, "0")} &nbsp;✦&nbsp; {lang === "te" ? e.title.en : e.title.te}
            </p>
            <h2 className={cn("mt-2 font-display font-medium leading-tight", isWedding ? "text-5xl sm:text-6xl" : "text-4xl sm:text-5xl", th.title)}>
              {t(e.title)}
            </h2>
            <p className={cn("mt-3 italic", th.muted)}>{t(e.blurb)}</p>
            <div className={cn("my-6 h-px w-24 bg-gradient-to-r from-current to-transparent mx-auto md:mx-0", th.accent)} />
          </Reveal>

          <Reveal delay={120} className="space-y-5">
            <Row th={th} label={u("time")} icon={<IconClock className="h-5 w-5" />}>
              {e.time ? (
                <span className="font-medium">{t(e.time)}</span>
              ) : (
                <span className={cn("italic", th.muted)}>{u("tba")}</span>
              )}
            </Row>
            <Row th={th} label={u("venue")} icon={<IconPin className="h-5 w-5" />}>
              <span className="font-medium">{t(e.venueName)}</span>
              {e.address && <span className={cn("mt-0.5 block text-base", th.muted)}>{t(e.address)}</span>}
            </Row>
          </Reveal>

          {isWedding && (
            <Reveal delay={200} className="mt-8">
              <div className="grid gap-3 sm:grid-cols-3">
                {(
                  [
                    [u("muhurtham"), t(weddingDetails.muhurtham)],
                    [u("nakshatram"), t(weddingDetails.nakshatram)],
                    [u("lagnam"), t(weddingDetails.lagnam)],
                  ] as const
                ).map(([k, v]) => (
                  <div key={k} className={cn("rounded-2xl border px-4 py-4 text-center", th.card)}>
                    <p className={cn("label !text-[0.6rem]", th.accent)}>{k}</p>
                    <p className="mt-1 font-display text-xl font-medium leading-tight">{v}</p>
                  </div>
                ))}
              </div>
              <p className="mt-5 flex items-center justify-center gap-3 italic text-champagne md:justify-start">
                <span className="text-gold">❖</span>
                {t(weddingDetails.lunch)}
              </p>
            </Reveal>
          )}

          <Reveal delay={260} className="mt-8 flex flex-wrap justify-center gap-3 md:justify-start">
            <a
              href={dirUrl(e)}
              target="_blank"
              rel="noopener noreferrer"
              className={cn("inline-flex items-center gap-2 rounded-full px-6 py-3 text-base font-medium shadow-lg transition active:scale-95", th.primary)}
            >
              <IconNav className="h-5 w-5" />
              {u("directions")}
            </a>
            <button
              onClick={() => setShowMap((s) => !s)}
              aria-expanded={showMap}
              className={cn("inline-flex items-center gap-2 rounded-full border px-6 py-3 text-base transition active:scale-95", th.ghost)}
            >
              <IconPin className="h-5 w-5" />
              {showMap ? u("hideMap") : u("viewMap")}
            </button>
          </Reveal>

          <div
            className="overflow-hidden transition-[max-height,opacity,margin] duration-700 ease-out"
            style={{ maxHeight: showMap ? 340 : 0, opacity: showMap ? 1 : 0, marginTop: showMap ? 24 : 0 }}
          >
            {showMap && (
              <iframe
                title={`${e.title.en} map`}
                src={embedUrl(e)}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className={cn("h-[320px] w-full rounded-2xl border", th.card)}
              />
            )}
          </div>
          <span className="sr-only">{e.title[other]}</span>
        </div>
      </div>
    </section>
  );
}

export function Events() {
  const { u } = useLang();
  return (
    <>
      <section className="paper relative overflow-hidden px-6 pb-16 pt-24 text-center">
        <Reveal>
          <p className="label text-antique">{u("shubhamastu")}</p>
          <h2 className="gold-text mt-2 font-script text-5xl leading-snug sm:text-7xl">{u("celebrations")}</h2>
          <Divider className="mt-5" />
          <p className="mt-5 italic text-ink/70">{u("celebrationsSub")}</p>
        </Reveal>
      </section>
      {events.map((e, i) => (
        <EventSection key={e.id} e={e} index={i} />
      ))}
    </>
  );
}
