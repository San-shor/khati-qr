import Link from "next/link";
import { KIND_STYLE, type Kind } from "@/lib/data";
import { STUDIO, messengerLink } from "@/lib/config";

export function Logo({ small = false }: { small?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <span
        className={`grid place-items-center rounded-xl bg-brand text-white font-bold ${small ? "h-8 w-8 text-sm" : "h-9 w-9"}`}
        aria-hidden
      >
        ✓
      </span>
      <span className={`font-semibold tracking-tight ${small ? "text-base" : "text-lg"}`}>Khati QR</span>
    </Link>
  );
}

export function DemoStrip() {
  return (
    <div className="no-print bg-stone-900 px-4 py-2 text-center text-xs text-stone-200 sm:text-sm">
      Demo by <b className="text-white">{STUDIO.name}</b> · sample seller and made-up data{" "}
      <a
        href={messengerLink("Hi WebNest Studio, I want Khati QR for my products.")}
        className="ml-2 inline-block rounded-full bg-green-500 px-3 py-0.5 font-semibold text-green-950"
      >
        Want this? Message us
      </a>
    </div>
  );
}

/** A simple drawn jar, so the demo needs no photos. */
export function Jar({ kind, size = 120 }: { kind: Kind; size?: number }) {
  const s = KIND_STYLE[kind];
  const id = `jar-${kind}`;
  const bottle = kind === "oil";
  return (
    <svg width={size} height={size * 1.25} viewBox="0 0 100 125" aria-hidden>
      <defs>
        <linearGradient id={id} x1="0" x2="1">
          <stop offset="0" stopColor={s.jar[0]} />
          <stop offset="1" stopColor={s.jar[1]} />
        </linearGradient>
      </defs>
      {bottle ? (
        <>
          <rect x="40" y="4" width="20" height="12" rx="3" fill={s.lid} />
          <path d="M42 16h16v14c10 6 16 12 16 24v58a9 9 0 0 1-9 9H35a9 9 0 0 1-9-9V54c0-12 6-18 16-24z" fill={`url(#${id})`} />
        </>
      ) : (
        <>
          <rect x="18" y="6" width="64" height="16" rx="4" fill={s.lid} />
          <rect x="14" y="20" width="72" height="100" rx="14" fill={`url(#${id})`} />
        </>
      )}
      <rect x="24" y="58" width="52" height="40" rx="5" fill="#fffbeb" />
      <rect x="30" y="64" width="22" height="22" rx="2" fill="#1c1917" />
      <rect x="33" y="67" width="6" height="6" fill="#fffbeb" />
      <rect x="43" y="67" width="6" height="6" fill="#fffbeb" />
      <rect x="33" y="77" width="6" height="6" fill="#fffbeb" />
      <rect x="42" y="76" width="3" height="3" fill="#fffbeb" />
      <rect x="46" y="80" width="3" height="3" fill="#fffbeb" />
      <rect x="56" y="66" width="15" height="3" rx="1.5" fill="#15803d" />
      <rect x="56" y="72" width="12" height="3" rx="1.5" fill="#a8a29e" />
      <rect x="56" y="78" width="14" height="3" rx="1.5" fill="#a8a29e" />
      <rect x="30" y="90" width="40" height="3" rx="1.5" fill="#d6d3d1" />
      <path d="M22 30c2 20 2 60 0 80" stroke="#fff" strokeOpacity=".35" strokeWidth="5" fill="none" strokeLinecap="round" />
    </svg>
  );
}
