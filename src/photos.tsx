import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { cn } from "./utils/cn";
import type { CropSpec } from "./data";
import { Mandala } from "./ornaments";

/**
 * Couple photographs
 * ------------------
 * Drop the two original photographs into  src/assets/photos/  (any file names,
 * .jpg / .jpeg / .png / .webp). The wide photo is detected as "landscape" and the
 * tall photo as "portrait" automatically. The originals are never altered —
 * every crop is simply a CSS framing of the real photo.
 */
const files = import.meta.glob("./assets/photos/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

type Photo = { src: string; a: number }; // a = width / height
type PhotoSet = { landscape?: Photo; portrait?: Photo; all: Photo[]; ready: boolean };

const PhotoCtx = createContext<PhotoSet>({ all: [], ready: false });

export function PhotosProvider({ children }: { children: ReactNode }) {
  const [set, setSet] = useState<PhotoSet>({ all: [], ready: false });

  useEffect(() => {
    const urls = Object.keys(files)
      .sort()
      .map((k) => files[k]);
    if (!urls.length) {
      setSet({ all: [], ready: true });
      return;
    }
    let alive = true;
    Promise.all(
      urls.map(
        (src) =>
          new Promise<Photo | null>((res) => {
            const im = new Image();
            im.onload = () => res({ src, a: im.naturalWidth / im.naturalHeight });
            im.onerror = () => res(null);
            im.src = src;
          }),
      ),
    ).then((list) => {
      if (!alive) return;
      const ok = list.filter(Boolean) as Photo[];
      setSet({
        landscape: ok.find((p) => p.a > 1),
        portrait: ok.find((p) => p.a <= 1),
        all: ok,
        ready: true,
      });
    });
    return () => {
      alive = false;
    };
  }, []);

  return <PhotoCtx.Provider value={set}>{children}</PhotoCtx.Provider>;
}

export const usePhotos = () => useContext(PhotoCtx);

function resolve(p: PhotoSet, source: "landscape" | "portrait") {
  return p[source] ?? p.landscape ?? p.portrait;
}

/** Elegant stand-in shown only until the real photographs are added. */
function Placeholder({ r, className }: { r: number; className?: string }) {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-burgundy via-wine to-burgundy",
        className,
      )}
      style={{ aspectRatio: r }}
      role="img"
      aria-label="Couple photograph"
    >
      <Mandala className="absolute inset-[-20%] h-[140%] w-[140%] text-gold/30" />
      <span className="gold-text relative font-script text-5xl">L &amp; N</span>
    </div>
  );
}

/**
 * Frames a region of an original photo inside a box of aspect ratio `r`.
 * fx, fy: focus point (0–1) · zoom: 1 = "cover".
 */
export function Crop({
  spec,
  className,
  alt = "Lasyapriya and Naresh",
  eager,
}: {
  spec: CropSpec;
  className?: string;
  alt?: string;
  eager?: boolean;
}) {
  const photos = usePhotos();
  const photo = (spec.index !== undefined ? photos.all[spec.index] : undefined) ?? resolve(photos, spec.source);
  const { r, fx, fy, zoom } = spec;
  if (!photo) return <Placeholder r={r} className={className} />;

  const a = photo.a;
  const w = Math.max(r, a) * zoom; // in units where frame height = 1
  const h = w / a;
  const left = Math.min(0, Math.max(r - w, r / 2 - fx * w));
  const top = Math.min(0, Math.max(1 - h, 0.5 - fy * h));

  return (
    <div className={cn("relative overflow-hidden bg-wine", className)} style={{ aspectRatio: r }}>
      <img
        src={photo.src}
        alt={alt}
        draggable={false}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        className="absolute max-w-none select-none"
        style={{ width: `${(w / r) * 100}%`, left: `${(left / r) * 100}%`, top: `${top * 100}%` }}
      />
    </div>
  );
}

/** Fills an arbitrary-sized container (backgrounds). */
export function Cover({
  source,
  position = "50% 40%",
  className,
  alt = "",
}: {
  source: "landscape" | "portrait";
  position?: string;
  className?: string;
  alt?: string;
}) {
  const photos = usePhotos();
  const photo = resolve(photos, source);
  if (!photo) return <div className={cn("bg-gradient-to-br from-burgundy to-wine", className)} />;
  return (
    <img
      src={photo.src}
      alt={alt}
      draggable={false}
      className={cn("h-full w-full object-cover", className)}
      style={{ objectPosition: position }}
    />
  );
}
