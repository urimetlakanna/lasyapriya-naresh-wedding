import { useEffect, useState } from "react";
import { useLang } from "../i18n";
import { couple, type Lang } from "../data";
import { Mandala, Petals } from "../ornaments";

const doorBg =
  "radial-gradient(ellipse at 50% 40%, #7a2234 0%, #5a1424 45%, #3f0e19 100%)";

export function Gate({ onOpen }: { onOpen: (l: Lang) => void }) {
  const { setLang } = useLang();
  const [stage, setStage] = useState<"idle" | "opening" | "gone">("idle");

  useEffect(() => {
    document.body.style.overflow = stage === "gone" ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [stage]);

  if (stage === "gone") return null;
  const opening = stage === "opening";

  const go = (l: Lang) => {
    if (opening) return;
    setLang(l);
    onOpen(l);
    setStage("opening");
    window.setTimeout(() => setStage("gone"), 2900);
  };

  const door = (side: "left" | "right") => (
    <div
      className={`absolute inset-y-0 w-1/2 overflow-hidden ${side === "left" ? "left-0" : "right-0"}`}
      style={{
        background: doorBg,
        transform: opening ? `translateX(${side === "left" ? "-102%" : "102%"})` : "none",
        transition: "transform 1900ms cubic-bezier(.76,0,.18,1) 650ms",
        boxShadow: side === "left" ? "inset -2px 0 0 rgba(231,211,161,.55)" : "inset 2px 0 0 rgba(231,211,161,.55)",
      }}
    >
      <Mandala
        className="absolute top-1/2 text-gold/45"
        style={{
          width: "min(165vw, 135vh)",
          height: "min(165vw, 135vh)",
          [side === "left" ? "right" : "left"]: 0,
          transform: `translate(${side === "left" ? "50%" : "-50%"}, -50%)`,
          animation: "spin-slow 140s linear infinite",
        }}
      />
      <div
        className={`absolute inset-y-4 ${side === "left" ? "left-4" : "right-4"} ${side === "left" ? "right-0" : "left-0"} rounded-[2px] border border-gold/40`}
        style={{ [side === "left" ? "borderRight" : "borderLeft"]: "none" }}
      />
    </div>
  );

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden" role="dialog" aria-label="Wedding invitation — choose language">
      {/* soft glow behind the doors */}
      <div className="absolute inset-0 bg-wine" />
      {door("left")}
      {door("right")}

      {/* Seal & welcome */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-ivory"
        style={{
          opacity: opening ? 0 : 1,
          transform: opening ? "scale(1.12)" : "none",
          transition: "opacity 700ms ease, transform 900ms ease",
          pointerEvents: opening ? "none" : "auto",
        }}
      >
        <Petals count={10} />
        <p className="label hero-go hero-anim text-champagne" style={{ animation: "rise-in 1.4s .2s both" }}>
          శుభమస్తు · Shubhamastu
        </p>

        <div className="relative my-5 h-28 w-28 sm:h-36 sm:w-36" style={{ animation: "rise-in 1.6s .4s both" }}>
          <span className="absolute inset-0 rounded-full border border-gold/60" style={{ animation: "pulse-ring 3s ease-out infinite" }} />
          <Mandala className="absolute inset-0 text-gold" style={{ animation: "spin-slow 60s linear infinite" }} />
          <div
            className="absolute inset-[17%] flex items-center justify-center rounded-full border border-gold/70"
            style={{ background: "radial-gradient(circle at 35% 30%, #8a2a3d, #4a1020)" }}
          >
            <span className="gold-text font-script text-3xl sm:text-4xl">L&nbsp;&amp;&nbsp;N</span>
          </div>
        </div>

        <h1 className="max-w-[92vw] font-script gold-text text-3xl leading-tight sm:text-5xl lg:text-6xl" style={{ animation: "rise-in 1.6s .6s both" }}>
          {couple.bride.full.en} <span className="text-champagne">&amp;</span> {couple.groom.full.en}
        </h1>
        <p className="mt-1 font-telugu text-xl text-champagne/95 sm:text-2xl" style={{ animation: "rise-in 1.6s .8s both" }}>
          {couple.bride.full.te} &amp; {couple.groom.full.te}
        </p>
        <p className="label mt-4 text-ivory/80" style={{ animation: "rise-in 1.6s 1s both" }}>
          The Wedding Invitation · శుభ వివాహ ఆహ్వానం
        </p>

        <div className="mt-8 flex flex-col items-center gap-3" style={{ animation: "rise-in 1.6s 1.2s both" }}>
          <p className="text-sm italic text-champagne/80">భాషను ఎంచుకోండి · Choose your language</p>
          <div className="flex gap-3">
            <button
              onClick={() => go("te")}
              className="group relative overflow-hidden rounded-full border border-gold bg-gradient-to-b from-[#f6e7b4] to-[#c9a24a] px-7 py-3 font-telugu text-lg text-wine shadow-[0_8px_30px_-8px_rgba(231,200,115,.6)] transition hover:scale-[1.04] active:scale-95"
            >
              తెలుగు
            </button>
            <button
              onClick={() => go("en")}
              className="rounded-full border border-gold bg-transparent px-7 py-3 text-lg tracking-wide text-champagne transition hover:scale-[1.04] hover:bg-gold/15 active:scale-95"
            >
              English
            </button>
          </div>
          <p className="mt-1 text-xs text-ivory/55">♪ Opens with soft music · సంగీతంతో ప్రారంభమవుతుంది</p>
        </div>
      </div>
    </div>
  );
}
