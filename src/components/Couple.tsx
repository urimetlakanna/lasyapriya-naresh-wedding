import { useLang } from "../i18n";
import { couple, crops, type CropSpec } from "../data";
import { Crop } from "../photos";
import { Divider, Reveal } from "../ornaments";

function Person({
  role,
  name,
  sub,
  qual,
  crop,
  delay,
  variant,
}: {
  role: string;
  name: string;
  sub: string;
  qual: string;
  crop: CropSpec;
  delay: number;
  variant: "left" | "right";
}) {
  return (
    <Reveal variant={variant} delay={delay} className="text-center">
      <div className="relative mx-auto w-full max-w-[300px]">
        <div className="absolute -inset-2 rounded-[999px_999px_20px_20px] border border-gold/40 sm:-inset-3" />
        <div
          className="arch relative overflow-hidden p-[3px] shadow-[0_24px_50px_-22px_rgba(63,14,25,.6)] sm:p-1"
          style={{ background: "linear-gradient(135deg,#8c6b26,#f6e7b4,#b8923f,#f0dc9a,#8c6b26)" }}
        >
          <Crop spec={crop} className="arch" alt={name} />
        </div>
      </div>
      <p className="label mt-7 text-antique sm:mt-9">{role}</p>
      <h3 className="mt-1 font-script text-4xl leading-[1.3] text-burgundy sm:text-6xl">{name}</h3>
      <p className="min-h-[1.5em] italic text-ink/70">{sub}</p>
      <span className="gold-border mt-3 inline-flex items-center gap-2 rounded-full px-4 py-1 text-sm text-burgundy sm:text-base">
        <span className="text-gold">✦</span>
        {qual}
      </span>
    </Reveal>
  );
}

export function CoupleSection() {
  const { t, u, lang } = useLang();
  const b = couple.bride;
  const g = couple.groom;
  return (
    <section id="couple" className="relative overflow-hidden bg-cream px-5 py-24 sm:py-32" style={{ ["--card-bg" as string]: "#f4ead2" }}>
      <div className="pointer-events-none absolute inset-0 opacity-60" style={{ background: "radial-gradient(circle at 50% 0%, #fbf6ea, transparent 60%)" }} />
      <div className="relative mx-auto max-w-4xl">
        <Reveal className="text-center">
          <p className="label text-antique">{u("theCouple")}</p>
          <h2 className="mt-2 font-display text-4xl font-medium text-wine sm:text-5xl">
            {lang === "te" ? "ఇద్దరి హృదయాలు, ఒకే బంధం" : "Two souls, one beautiful bond"}
          </h2>
          <Divider className="mt-5" />
        </Reveal>

        <div className="relative mt-14 grid grid-cols-2 gap-5 sm:gap-16">
          <Person
            role={u("bride")}
            name={t(b.name)}
            sub={`(${t(b.nick)})`}
            qual={t(b.qual)}
            crop={crops.bride}
            delay={0}
            variant="left"
          />
          <Person
            role={u("groom")}
            name={t(g.name)}
            sub={t(g.surname)}
            qual={t(g.qual)}
            crop={crops.groom}
            delay={150}
            variant="right"
          />
          <div className="pointer-events-none absolute left-1/2 top-[34%] z-10 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gold bg-wine font-script text-2xl text-champagne shadow-xl sm:h-16 sm:w-16 sm:text-4xl">
            &amp;
          </div>
        </div>

        {/* Together */}
        <Reveal variant="zoom" className="mt-24">
          <figure className="relative mx-auto max-w-3xl">
            <div className="absolute -inset-3 border border-gold/40 sm:-inset-4" />
            <div
              className="relative p-1 shadow-[0_30px_60px_-25px_rgba(63,14,25,.6)]"
              style={{ background: "linear-gradient(135deg,#8c6b26,#f6e7b4,#b8923f,#f0dc9a,#8c6b26)" }}
            >
              <Crop spec={crops.together} alt="Lasya Priya and Naresh together" />
            </div>
            <figcaption className="mt-9 text-center font-script text-3xl text-burgundy sm:text-4xl">{u("togetherCaption")}</figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}

