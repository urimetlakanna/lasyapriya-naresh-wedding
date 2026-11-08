import { useLang } from "../i18n";
import { families } from "../data";
import { Corners, Divider, Mandala, Reveal } from "../ornaments";

export function Families() {
  const { t, u } = useLang();
  return (
    <section id="families" className="relative overflow-hidden bg-wine px-5 py-24 text-ivory sm:py-28">
      <Mandala
        className="absolute -right-40 top-1/2 h-[90vmin] w-[90vmin] -translate-y-1/2 text-gold/[0.08]"
        style={{ animation: "spin-slow 260s linear infinite" }}
      />
      <Corners className="text-gold/40" />
      <div className="relative mx-auto max-w-3xl">
        <Reveal className="text-center">
          <p className="label text-champagne">{u("shubhamastu")}</p>
          <h2 className="gold-text mt-2 font-script text-5xl leading-snug sm:text-6xl">{u("familiesTitle")}</h2>
          <Divider light className="mt-5" />
        </Reveal>
        <Reveal variant="zoom" className="relative mx-auto mt-12 max-w-2xl rounded-[28px] border border-gold/35 bg-black/15 px-6 py-10 text-center backdrop-blur-sm sm:px-10">
          <Mandala className="mx-auto mb-4 h-12 w-12 text-gold/80" />
          <p className="label text-champagne">{u("invitedBy")}</p>
          <div className="mx-auto my-5 h-px w-20 bg-gradient-to-r from-transparent via-gold to-transparent" />
          <ul className="space-y-5">
            {families.bride.map((n) => (
              <li key={n.en} className="font-display text-xl leading-snug text-ivory sm:text-2xl">
                {t(n)}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
