import { useLang } from "../i18n";
import { couple } from "../data";
import { Cover } from "../photos";
import { Divider, Mandala, Petals, Reveal } from "../ornaments";

export function Closing() {
  const { t, u } = useLang();
  return (
    <footer id="closing" className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden bg-wine text-ivory">
      <div className="absolute inset-0 -z-20">
        <Cover source="landscape" position="40% 40%" />
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-wine via-wine/80 to-wine/10 lg:bg-gradient-to-l lg:from-wine lg:via-wine/75 lg:to-transparent" />
      <Petals count={14} className="-z-[5]" />

      <div className="relative mx-auto flex w-full max-w-6xl flex-1 items-end px-6 pb-10 pt-40 lg:items-center">
        <div className="mx-auto text-center lg:ml-auto lg:mr-0 lg:w-[46%] lg:text-left">
          <Reveal>
            <Mandala className="mx-auto h-14 w-14 text-gold lg:mx-0" />
            <p className="label mt-4 text-champagne">{u("closingKicker")}</p>
            <h2 className="gold-text mt-3 font-script text-4xl leading-[1.35] sm:text-6xl">{u("closingTitle")}</h2>
          </Reveal>
          <Reveal delay={150}>
            <Divider light className="my-6 lg:justify-start" />
            <p className="text-xl italic text-ivory/90 sm:text-2xl">{u("closingBody")}</p>
          </Reveal>
          <Reveal delay={300} className="mt-8">
            <p className="font-script text-4xl text-champagne sm:text-5xl">
              {t(couple.bride.name)} &amp; {t(couple.groom.name)}
            </p>
            <p className="mt-3 text-ivory/75">{u("closingSign")}</p>
          </Reveal>
          <Reveal delay={400} className="mt-8">
            <a
              href="#top"
              className="label inline-flex items-center gap-2 rounded-full border border-gold/60 px-5 py-2.5 text-champagne transition hover:bg-gold/15"
            >
              ↑ {u("backToTop")}
            </a>
          </Reveal>
        </div>
      </div>

      <div className="relative border-t border-gold/25 px-6 py-5 text-center text-sm text-ivory/55">
        {t(couple.bride.name)} &amp; {t(couple.groom.name)} · 2026 · ❖
      </div>
    </footer>
  );
}
