import type { CSSProperties } from "react";
import { useLang } from "../i18n";
import { couple, crops, events } from "../data";
import { Crop } from "../photos";
import { Garland, Mandala, Petals } from "../ornaments";
import { cn } from "../utils/cn";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

export function Hero({ started }: { started: boolean }) {
  const { lang, t, u } = useLang();
  const wedding = events.find((e) => e.id === "wedding")!;
  const te = lang === "te";

  return (
    <header
      id="top"
      className={cn("relative isolate min-h-[100svh] overflow-hidden text-ivory", started && "hero-go")}
      style={{
        background:
          "radial-gradient(ellipse at 50% 30%, #7a2234 0%, #55131f 42%, #330a14 100%)",
      }}
    >
      <Mandala
        className="absolute left-1/2 top-[44%] -z-10 h-[150vmax] w-[150vmax] -translate-x-1/2 -translate-y-1/2 text-gold/[0.13] lg:left-[72%] lg:h-[120vmin] lg:w-[120vmin]"
        style={{ animation: "spin-slow 240s linear infinite" }}
      />
      <Garland className="absolute left-0 top-0 z-20 h-12 sm:h-16" />
      <Petals count={16} className="z-10" />

      <div className="relative z-10 mx-auto grid min-h-[100svh] max-w-6xl items-center gap-8 px-6 pb-16 pt-24 lg:grid-cols-2 lg:gap-12">
        {/* Photo */}
        <div className="hero-anim flex justify-center lg:order-2" style={d(500)}>
          <div className="relative w-[min(68vw,300px)] lg:w-[400px]">
            <div className="absolute -inset-4 rounded-[999px_999px_26px_26px] border border-gold/30" />
            <div
              className="absolute -inset-8 rounded-[999px_999px_36px_36px] border border-gold/15"
              style={{ animation: "float-y 7s ease-in-out infinite" }}
            />
            <div
              className="arch relative overflow-hidden p-[5px] shadow-[0_30px_80px_-20px_rgba(0,0,0,.8)]"
              style={{ background: "linear-gradient(135deg,#8c6b26,#f6e7b4,#b8923f,#f0dc9a,#8c6b26)" }}
            >
              <Crop spec={crops.hero} eager className="arch" alt="Lasyapriya and Naresh" />
              <div className="pointer-events-none absolute inset-[5px] arch bg-gradient-to-t from-wine/45 via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-gold/70 bg-wine px-5 py-1.5 text-champagne shadow-xl">
              <span className="text-gold">❖</span>
              <span className="label !text-[0.62rem]">2026</span>
              <span className="text-gold">❖</span>
            </div>
          </div>
        </div>

        {/* Text */}
        <div className="text-center lg:order-1 lg:text-left">
          <p className="label hero-anim text-champagne" style={d(300)}>
            {u("shubhamastu")} &nbsp;✦&nbsp; {u("weddingInvite")}
          </p>

          <h1 className="mt-5">
            <span
              className={cn(
                "hero-anim gold-text block font-script leading-[1.25]",
                te ? "text-5xl sm:text-6xl lg:text-7xl" : "text-6xl sm:text-7xl lg:text-8xl",
              )}
              style={d(600)}
            >
              {t(couple.bride.name)}
            </span>
            <span className="hero-anim block font-script text-4xl text-champagne" style={d(800)}>
              &amp;
            </span>
            <span
              className={cn(
                "hero-anim gold-text block font-script leading-[1.25]",
                te ? "text-5xl sm:text-6xl lg:text-7xl" : "text-6xl sm:text-7xl lg:text-8xl",
              )}
              style={d(1000)}
            >
              {t(couple.groom.name)}
            </span>
          </h1>

          <p className="hero-anim mt-2 italic text-champagne/80" style={d(1100)}>
            {t(couple.bride.nick) && `(${t(couple.bride.nick)})`} · {t(couple.groom.surname)}
          </p>

          <div
            className="hero-anim mx-auto mt-7 inline-flex flex-col items-center gap-1 rounded-2xl border border-gold/50 bg-black/15 px-8 py-4 backdrop-blur-sm lg:mx-0 lg:items-start"
            style={d(1300)}
          >
            <span className="label text-champagne/90">{t(wedding.weekday)}</span>
            <span className="font-display text-3xl tracking-wide sm:text-4xl">
              <span className="gold-text font-semibold">{wedding.day}</span>{" "}
              <span>{t(wedding.month)}</span>{" "}
              <span className="text-champagne">{wedding.year}</span>
            </span>
            <span className="text-sm italic text-ivory/75">
              {t({ en: "Muhurtham 10:12 AM · Ramakrishnapur", te: "ముహూర్తం ఉదయం 10:12 · రామకృష్ణాపూర్" })}
            </span>
          </div>

          <div className="hero-anim mt-8" style={d(1500)}>
            <a
              href="#invitation"
              className="group inline-flex flex-col items-center gap-2 text-champagne/80 transition hover:text-champagne lg:items-start"
            >
              <span className="label !text-[0.65rem]">{u("scroll")}</span>
              <span className="relative h-10 w-px overflow-hidden bg-champagne/30">
                <span className="absolute inset-x-0 top-0 h-4 bg-champagne" style={{ animation: "float-y 1.6s ease-in-out infinite" }} />
              </span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
