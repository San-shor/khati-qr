"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import QRCode from "qrcode";
import { BATCHES, SELLER, taka } from "@/lib/data";

const batch = BATCHES[0];
const target = `/b/${batch.code}`;

const CHECKS = [
  "Reading the code",
  `Finding batch ${batch.code} in the seller's records`,
  "Checking the code is not copied",
];

// Time (ms) when each stage starts.
// 0 = searching, 1 = QR found, 2..4 = checks ticking, 5 = done -> open report.
const TIMES = [0, 1600, 2300, 2900, 3500, 4100];

/** Shows a phone-camera style scan of a sample jar, then opens the buyer page. */
export default function ScanDemo() {
  const router = useRouter();
  const [stage, setStage] = useState(0);
  const [qr, setQr] = useState("");

  useEffect(() => {
    router.prefetch(target);
    QRCode.toString(`${window.location.origin}${target}`, {
      type: "svg",
      margin: 0,
      errorCorrectionLevel: "M",
      color: { dark: "#1c1917", light: "#ffffff" },
    }).then((s) => setQr(s.replace("<svg ", '<svg width="100%" height="100%" style="display:block" ')));

    const timers = TIMES.slice(1).map((t, i) => setTimeout(() => setStage(i + 1), t));
    timers.push(setTimeout(() => router.replace(target), TIMES[5] + 500));
    return () => timers.forEach(clearTimeout);
  }, [router]);

  const found = stage >= 1;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-stone-950 px-4 py-8 text-white">
      <div className="w-full max-w-sm">
        <div className="mb-4 flex items-center justify-between text-sm text-stone-400">
          <span>📷 Camera</span>
          <Link href={target} replace className="rounded-full bg-white/10 px-3 py-1 text-stone-200">
            Skip →
          </Link>
        </div>

        {/* Camera view */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-stone-700 via-stone-800 to-amber-950 px-6 pb-24 pt-8">
          {/* Jar label close-up */}
          <div className={`mx-auto w-full max-w-[260px] rounded-2xl bg-[#fffbeb] p-4 text-stone-900 shadow-2xl ${found ? "" : "cam-shake"}`}>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-brand">{SELLER.name}</p>
            <p className="font-semibold leading-snug">{batch.productBn}</p>
            <p className="text-xs text-stone-600">
              {batch.size} · {taka(batch.price)}
            </p>
            <div className="relative mx-auto mt-3 h-36 w-36 bg-white p-1.5">
              <div className="h-full w-full" dangerouslySetInnerHTML={{ __html: qr }} />
              {/* Viewfinder corners */}
              <Corners color={found ? "#4ade80" : "#ffffff"} />
              {!found && <div className="scan-line absolute inset-x-0 top-0 h-0.5 bg-green-400 shadow-[0_0_12px_3px_rgba(74,222,128,.7)]" />}
            </div>
            <p className="mt-2 text-center text-[11px] font-semibold">স্ক্যান করে আসল কিনা দেখুন</p>
            <p className="text-center font-mono text-[10px] text-stone-500">{batch.code} · #0147</p>
          </div>

          {found && (
            <div className="pop-in absolute inset-x-4 bottom-3 rounded-2xl bg-white px-4 py-2.5 text-stone-900 shadow-xl">
              <p className="text-sm font-semibold text-brand">✓ QR found</p>
              <p className="truncate font-mono text-xs text-stone-500">khati-qr.vercel.app{target}</p>
            </div>
          )}
        </div>

        {/* Status */}
        <div className="mt-5 min-h-40 rounded-3xl bg-white/5 p-5">
          {!found ? (
            <p className="text-center text-stone-300">Point the camera at the QR sticker on the jar…</p>
          ) : (
            <ul className="grid gap-3">
              {CHECKS.map((c, i) => {
                const done = stage >= i + 2;
                const active = stage === i + 1;
                if (!done && !active) return null;
                return (
                  <li key={c} className="pop-in flex items-center gap-3 text-sm">
                    <span
                      className={`grid h-6 w-6 shrink-0 place-items-center rounded-full text-xs font-bold ${
                        done ? "bg-green-500 text-green-950" : "spin border-2 border-white/30 border-t-green-400"
                      }`}
                    >
                      {done ? "✓" : ""}
                    </span>
                    <span className={done ? "text-white" : "text-stone-300"}>{c}</span>
                  </li>
                );
              })}
              {stage >= 5 && (
                <li className="pop-in mt-1 text-center font-semibold text-green-400">Genuine. Opening the report…</li>
              )}
            </ul>
          )}
        </div>

        <p className="mt-4 text-center text-xs text-stone-500">
          Demo: this shows what a buyer&apos;s phone does after scanning the sticker.
        </p>
      </div>
    </div>
  );
}

function Corners({ color }: { color: string }) {
  const base = "absolute h-6 w-6 border-[3px] transition-colors";
  const style = { borderColor: color };
  return (
    <>
      <span className={`${base} -left-2 -top-2 rounded-tl-lg border-b-0 border-r-0`} style={style} />
      <span className={`${base} -right-2 -top-2 rounded-tr-lg border-b-0 border-l-0`} style={style} />
      <span className={`${base} -bottom-2 -left-2 rounded-bl-lg border-r-0 border-t-0`} style={style} />
      <span className={`${base} -bottom-2 -right-2 rounded-br-lg border-l-0 border-t-0`} style={style} />
    </>
  );
}
