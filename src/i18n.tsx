import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { ui, type Bi, type Lang, type UiKey } from "./data";

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (b: Bi) => string;
  u: (k: UiKey) => string;
};

const LangCtx = createContext<Ctx>(null as unknown as Ctx);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    try {
      const s = localStorage.getItem("wedding-lang");
      if (s === "en" || s === "te") return s;
    } catch {
      /* ignore */
    }
    return "te";
  });

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem("wedding-lang", l);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo<Ctx>(
    () => ({
      lang,
      setLang,
      t: (b) => b[lang],
      u: (k) => (ui[k] as Bi)[lang],
    }),
    [lang, setLang],
  );

  return <LangCtx.Provider value={value}>{children}</LangCtx.Provider>;
}

export const useLang = () => useContext(LangCtx);
