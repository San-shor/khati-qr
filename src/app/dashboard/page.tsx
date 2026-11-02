import type { Metadata } from "next";
import Link from "next/link";
import { BATCHES, SELLER, taka } from "@/lib/data";
import { DemoStrip, Jar, Logo } from "@/components/ui";

export const metadata: Metadata = { title: "Seller dashboard · Khati QR demo" };

const CITIES = [
  { name: "Dhaka", pct: 48 },
  { name: "Khulna", pct: 15 },
  { name: "Chattogram", pct: 13 },
  { name: "Sylhet", pct: 8 },
  { name: "Rajshahi", pct: 7 },
  { name: "Others", pct: 9 },
];

const RECENT = [
  { when: "2 min ago", city: "Mirpur, Dhaka", code: "MK-H-2610", jar: "#0147", ok: true },
  { when: "9 min ago", city: "Khulna", code: "MK-G-2609", jar: "#0031", ok: true },
  { when: "21 min ago", city: "Bogura", code: "MK-H-2610", jar: "#0188", ok: false },
  { when: "34 min ago", city: "Agrabad, Chattogram", code: "MK-H-2610", jar: "#0098", ok: true },
  { when: "1 hr ago", city: "Uttara, Dhaka", code: "MK-O-2610", jar: "#0005", ok: true },
];

export default function Page() {
  const totalScans = BATCHES.reduce((s, b) => s + b.scans, 0);
  const reorders = BATCHES.reduce((s, b) => s + b.reorders, 0);
  return (
    <div className="min-h-screen bg-stone-100">
      <DemoStrip />
      <header className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Logo />
        <nav className="flex gap-4 text-sm">
          <Link href="/label" className="rounded-full bg-brand px-4 py-1.5 font-medium text-white">+ New batch</Link>
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-4 pb-16">
        <p className="text-sm text-stone-500">Welcome back</p>
        <h1 className="text-2xl font-bold">{SELLER.name}</h1>

        <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
          <Stat label="QR scans (this month)" value={totalScans.toLocaleString("en-IN")} note="+18% vs last month" />
          <Stat label="Batches live" value={String(BATCHES.length)} note={`${BATCHES.reduce((s, b) => s + b.jars, 0)} jars out`} />
          <Stat label="Re-orders from QR page" value={String(reorders)} note="via Messenger button" />
          <Stat label="Copy alerts" value="1" note="needs a look" alert />
        </div>

        <section className="mt-5 rounded-3xl border-2 border-amber-400 bg-amber-50 p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="font-semibold text-amber-950">⚠ Possible copied QR: MK-H-2610 jar #0188</p>
              <p className="mt-1 text-sm text-amber-900">
                Scanned 27 times in 3 days from 5 districts (Dhaka, Chattogram, Sylhet, Bogura, Cumilla). A normal jar is
                scanned 1–3 times. Someone may be printing your sticker on fake bottles.
              </p>
            </div>
            <Link href="/b/MK-H-2610?demo=copied" className="rounded-full bg-amber-950 px-4 py-1.5 text-sm font-medium text-white">
              What buyers see
            </Link>
          </div>
        </section>

        <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_320px]">
          <section className="rounded-3xl bg-white p-5 shadow-sm">
            <h2 className="font-semibold">Batches</h2>
            <ul className="mt-3 divide-y divide-stone-100">
              {BATCHES.map((b) => (
                <li key={b.code} className="flex items-center gap-3 py-3">
                  <div className="shrink-0 rounded-xl bg-amber-50 px-1 pt-1">
                    <Jar kind={b.kind} size={36} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">{b.product}</p>
                    <p className="font-mono text-xs text-stone-500">
                      {b.code} · {b.jars} jars · {b.size} · {taka(b.price)}
                    </p>
                  </div>
                  <div className="hidden text-right text-sm sm:block">
                    <p className="font-semibold">{b.scans}</p>
                    <p className="text-xs text-stone-500">scans</p>
                  </div>
                  <div className="hidden text-right text-sm sm:block">
                    <p className="font-semibold">★ {b.rating}</p>
                    <p className="text-xs text-stone-500">{b.reviews} reviews</p>
                  </div>
                  <Link href={`/b/${b.code}`} className="rounded-full bg-stone-100 px-3 py-1 text-xs font-medium">
                    View
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-3xl bg-white p-5 shadow-sm">
            <h2 className="font-semibold">Where buyers scan from</h2>
            <ul className="mt-3 space-y-2.5">
              {CITIES.map((c) => (
                <li key={c.name} className="text-sm">
                  <div className="flex justify-between">
                    <span>{c.name}</span>
                    <span className="text-stone-500">{c.pct}%</span>
                  </div>
                  <div className="mt-1 h-2 rounded-full bg-stone-100">
                    <div className="h-2 rounded-full bg-brand" style={{ width: `${c.pct * 2}%` }} />
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section className="mt-5 rounded-3xl bg-white p-5 shadow-sm">
          <h2 className="font-semibold">Latest scans</h2>
          <ul className="mt-3 divide-y divide-stone-100 text-sm">
            {RECENT.map((r) => (
              <li key={r.when} className="flex flex-wrap items-center justify-between gap-2 py-2.5">
                <span className="w-24 text-stone-500">{r.when}</span>
                <span className="flex-1">{r.city}</span>
                <span className="font-mono text-xs text-stone-500">
                  {r.code} {r.jar}
                </span>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${r.ok ? "bg-green-50 text-green-700" : "bg-amber-100 text-amber-800"}`}
                >
                  {r.ok ? "Genuine" : "Copy alert"}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}

function Stat({ label, value, note, alert }: { label: string; value: string; note: string; alert?: boolean }) {
  return (
    <div className={`rounded-3xl p-4 shadow-sm ${alert ? "bg-amber-400 text-amber-950" : "bg-white"}`}>
      <p className={`text-xs ${alert ? "text-amber-900" : "text-stone-500"}`}>{label}</p>
      <p className="mt-1 text-3xl font-bold">{value}</p>
      <p className={`text-xs ${alert ? "text-amber-900" : "text-stone-500"}`}>{note}</p>
    </div>
  );
}
