import { useCallback, useEffect, useState } from "react";
import { useLang } from "../i18n";
import { gallery } from "../data";
import { Crop } from "../photos";
import { Divider, Reveal } from "../ornaments";

export function Gallery() {
  const { t, u } = useLang();
  const [open, setOpen] = useState<number | null>(null);

  const step = useCallback((dir: 1 | -1) => setOpen((i) => (i === null ? i : (i + dir + gallery.length) % gallery.length)), []);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, step]);

  const cur = open !== null ? gallery[open] : null;

  return (
    <section id="gallery" className="paper relative overflow-hidden px-4 py-24 sm:px-6 sm:py-28">
      <div className="relative mx-auto max-w-5xl">
        <Reveal className="text-center">
          <p className="label text-antique">{u("gallerySub")}</p>
          <h2 className="gold-text mt-2 font-script text-5xl leading-snug sm:text-7xl">{u("gallery")}</h2>
          <Divider className="mt-5" />
        </Reveal>

        <div className="mt-12 columns-2 gap-3 sm:gap-5 md:columns-3">
          {gallery.map((g, i) => (
            <Reveal key={i} delay={(i % 3) * 120} variant="zoom" className="mb-3 break-inside-avoid sm:mb-5">
              <button
                onClick={() => setOpen(i)}
                className="group relative block w-full overflow-hidden rounded-xl p-[3px] text-left shadow-[0_18px_40px_-22px_rgba(63,14,25,.7)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_26px_50px_-20px_rgba(63,14,25,.8)]"
                style={{ background: "linear-gradient(135deg,#8c6b26,#f6e7b4,#b8923f,#f0dc9a,#8c6b26)" }}
                aria-label={t(g.label)}
              >
                <div className="overflow-hidden rounded-[9px]">
                  <div className="transition duration-700 group-hover:scale-[1.06]">
                    <Crop spec={g.crop} alt={t(g.label)} />
                  </div>
                </div>
                <div className="pointer-events-none absolute inset-[3px] flex items-end rounded-[9px] bg-gradient-to-t from-wine/80 via-transparent to-transparent p-3 opacity-90 sm:opacity-0 sm:transition sm:duration-500 sm:group-hover:opacity-100">
                  <span className="text-sm leading-tight text-ivory sm:text-base">{t(g.label)}</span>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {cur && (
        <div
          className="fixed inset-0 z-[90] flex flex-col items-center justify-center bg-wine/95 p-4 backdrop-blur-md"
          style={{ animation: "rise-in .5s both" }}
          onClick={() => setOpen(null)}
          role="dialog"
          aria-modal
        >
          <button className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-gold/60 text-2xl text-champagne" aria-label="Close" onClick={() => setOpen(null)}>
            ×
          </button>
          <div onClick={(e) => e.stopPropagation()} className="p-1" style={{ background: "linear-gradient(135deg,#8c6b26,#f6e7b4,#b8923f,#f0dc9a,#8c6b26)", width: `min(92vw, calc(74svh * ${cur.crop.r}))` }}>
            <Crop spec={cur.crop} eager alt={t(cur.label)} />
          </div>
          <p className="mt-5 font-script text-3xl text-champagne">{t(cur.label)}</p>
          <div className="mt-3 flex items-center gap-6" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => step(-1)} aria-label="Previous" className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/60 text-2xl text-champagne hover:bg-gold/15">
              ‹
            </button>
            <span className="label text-champagne/70">
              {(open ?? 0) + 1} / {gallery.length}
            </span>
            <button onClick={() => step(1)} aria-label="Next" className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/60 text-2xl text-champagne hover:bg-gold/15">
              ›
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
