import { useCallback, useEffect, useRef, useState } from "react";
import { useLang } from "../i18n";
import { cn } from "../utils/cn";
import { createPlayer, type Player } from "../music";
import { IconMusic } from "../ornaments";

export function useMusic() {
  const ref = useRef<Player | null>(null);
  const [playing, setPlaying] = useState(false);
  const wantRef = useRef(false);

  const get = () => (ref.current ??= createPlayer());

  const start = useCallback(async () => {
    try {
      await get().play();
      wantRef.current = true;
      setPlaying(true);
    } catch {
      setPlaying(false); // autoplay blocked — user can press the button
    }
  }, []);

  const stop = useCallback(() => {
    ref.current?.pause();
    wantRef.current = false;
    setPlaying(false);
  }, []);

  const toggle = useCallback(() => {
    if (ref.current?.playing) stop();
    else void start();
  }, [start, stop]);

  // pause when the tab/app is hidden, resume when back
  useEffect(() => {
    const onVis = () => {
      if (!ref.current) return;
      if (document.hidden) ref.current.pause();
      else if (wantRef.current) void ref.current.play().catch(() => undefined);
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  return { playing, start, toggle };
}

export function Controls({ visible, playing, onToggle }: { visible: boolean; playing: boolean; onToggle: () => void }) {
  const { lang, setLang, u } = useLang();
  return (
    <div
      className={cn(
        "fixed right-3 top-3 z-50 flex items-center gap-2 transition-all duration-1000 sm:right-5 sm:top-5",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-4 opacity-0",
      )}
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      <div
        role="group"
        aria-label="Language"
        className="flex overflow-hidden rounded-full border border-gold/60 bg-wine/75 p-0.5 text-sm text-champagne shadow-lg backdrop-blur-md"
      >
        {(["te", "en"] as const).map((l) => (
          <button
            key={l}
            onClick={() => setLang(l)}
            aria-pressed={lang === l}
            className={cn(
              "rounded-full px-3 py-1.5 transition",
              l === "te" && "font-telugu",
              lang === l ? "bg-gradient-to-b from-[#f6e7b4] to-[#c9a24a] text-wine" : "hover:bg-white/10",
            )}
          >
            {l === "te" ? "తెలుగు" : "EN"}
          </button>
        ))}
      </div>

      <button
        onClick={onToggle}
        aria-label={playing ? u("musicOn") : u("musicOff")}
        title={playing ? u("musicOn") : u("musicOff")}
        className="relative flex h-10 w-10 items-center justify-center rounded-full border border-gold/60 bg-wine/75 text-champagne shadow-lg backdrop-blur-md transition hover:scale-105 active:scale-95"
      >
        {playing ? (
          <span className="flex h-4 items-end gap-[2px]" aria-hidden>
            {[0, 0.25, 0.5, 0.15].map((d, i) => (
              <span key={i} className="eq-bar w-[3px] rounded-full bg-champagne" style={{ height: "100%", animationDelay: `${d}s` }} />
            ))}
          </span>
        ) : (
          <span className="relative">
            <IconMusic className="h-5 w-5" />
            <span className="absolute left-1/2 top-1/2 h-px w-7 -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-champagne" />
          </span>
        )}
      </button>
    </div>
  );
}
