import { useState } from "react";
import { useLang } from "../i18n";
import { shareMessage } from "../data";
import { Corners, Divider, IconLink, IconShare, IconWhatsApp, Reveal } from "../ornaments";

const pageUrl = () => window.location.href.split("#")[0];

export function Share() {
  const { u } = useLang();
  const [copied, setCopied] = useState(false);
  const canNative = typeof navigator !== "undefined" && "share" in navigator;

  const wa = () => `https://wa.me/?text=${encodeURIComponent(shareMessage(pageUrl()))}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(pageUrl());
    } catch {
      const ta = document.createElement("textarea");
      ta.value = pageUrl();
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2200);
  };

  const native = () =>
    navigator
      .share({ title: "Lasya Priya & Naresh — Wedding Invitation", text: shareMessage(""), url: pageUrl() })
      .catch(() => undefined);

  return (
    <section id="share" className="relative overflow-hidden bg-cream px-5 py-24" style={{ ["--card-bg" as string]: "#fbf6ea" }}>
      <Corners className="text-gold/50" />
      <Reveal className="relative mx-auto max-w-xl text-center">
        <div className="gold-border rounded-[28px] px-6 py-12 shadow-[0_30px_60px_-30px_rgba(63,14,25,.5)] sm:px-10">
          <p className="label text-antique">{u("shubhamastu")}</p>
          <h2 className="gold-text mt-2 font-script text-5xl leading-snug">{u("shareTitle")}</h2>
          <Divider className="mt-4" />
          <p className="mt-5 italic text-ink/75">{u("shareSub")}</p>

          <div className="mt-8 flex flex-col items-center gap-3">
            <a
              href={wa()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full max-w-xs items-center justify-center gap-3 rounded-full bg-[#25D366] px-6 py-3.5 text-lg font-medium text-white shadow-lg shadow-green-900/20 transition hover:brightness-105 active:scale-95"
            >
              <IconWhatsApp className="h-6 w-6" />
              {u("shareWa")}
            </a>
            <div className="flex w-full max-w-xs gap-3">
              <button
                onClick={copy}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-burgundy/50 px-4 py-3 text-burgundy transition hover:bg-burgundy/10 active:scale-95"
              >
                <IconLink className="h-5 w-5" />
                {copied ? u("copied") : u("copyLink")}
              </button>
              {canNative && (
                <button
                  onClick={native}
                  aria-label={u("shareMore")}
                  title={u("shareMore")}
                  className="inline-flex items-center justify-center rounded-full border border-burgundy/50 px-4 py-3 text-burgundy transition hover:bg-burgundy/10 active:scale-95"
                >
                  <IconShare className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
