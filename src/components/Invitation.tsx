import { useLang } from "../i18n";
import { couple, ui } from "../data";
import { Corners, Divider, Mandala, Reveal } from "../ornaments";

export function Invitation() {
  const { lang, t, u } = useLang();
  const te = (
    <p key="te" className="font-telugu text-xl leading-[2.1] text-ink/90 sm:text-2xl sm:leading-[2.1]">
      {ui.inviteTe}
    </p>
  );
  const en = (
    <p key="en" className="text-xl italic leading-relaxed text-ink/85 sm:text-2xl">
      {ui.inviteEn}
    </p>
  );
  const ordered = lang === "te" ? [te, en] : [en, te];

  return (
    <section id="invitation" className="paper relative overflow-hidden px-6 py-24 sm:py-32">
      <Corners className="text-gold/60" />
      <Mandala
        className="absolute left-1/2 top-1/2 h-[120vmin] w-[120vmin] -translate-x-1/2 -translate-y-1/2 text-gold/[0.07]"
        style={{ animation: "spin-slow 300s linear infinite" }}
      />
      <div className="relative mx-auto max-w-3xl text-center">
        <Reveal variant="zoom">
          <Mandala className="mx-auto h-16 w-16 text-gold" />
        </Reveal>
        <Reveal delay={100}>
          <p className="label mt-5 text-antique">{u("shubhamastu")}</p>
          <h2 className="gold-text mt-2 font-script text-5xl leading-snug sm:text-6xl">
            {lang === "te" ? "ఆశీస్సులతో, ఆనందంతో" : "With Blessings & Joy"}
          </h2>
        </Reveal>
        <Reveal delay={150} className="mt-6">
          <Divider />
        </Reveal>

        <Reveal delay={200} className="mt-10">
          {ordered[0]}
        </Reveal>
        <Reveal delay={150} className="my-8">
          <Divider className="opacity-70" />
        </Reveal>
        <Reveal delay={200}>
          <div className="opacity-90">{ordered[1]}</div>
        </Reveal>

        <Reveal delay={200} className="mt-14">
          <p className="label text-antique">{lang === "te" ? "ఇట్లు" : "Joyfully, "}</p>
          <p className="mt-3 font-script text-4xl text-burgundy sm:text-5xl">
            {t(couple.bride.name)} <span className="text-gold">&amp;</span> {t(couple.groom.name)}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
