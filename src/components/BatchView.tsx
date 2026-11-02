
import Link from "next/link";
import { BATCHES, SELLER, taka, type Batch } from "@/lib/data";
import { whatsappLink } from "@/lib/config";
import { DemoStrip, Jar } from "./ui";

export type Mode = "genuine" | "copied";

export default function BatchView({ code, batch, mode }: { code: string; batch: Batch | null; mode: Mode }) {
  return (
    <div className="min-h-screen bg-stone-100">
      <DemoStrip />
      <main className="mx-auto max-w-md px-4 pb-16 pt-5">
        <header className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-stone-500">Seller</p>
            <p className="font-semibold">{SELLER.name}</p>
          </div>
          <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-stone-600 shadow-sm">
            ✓ Khati QR
          </span>
        </header>

        {batch ? <Found batch={batch} mode={mode} /> : <NotFound code={code} />}

        <DemoSwitch current={batch ? mode : "fake"} />
      </main>
    </div>
  );
}

function Found({ batch, mode }: { batch: Batch; mode: Mode }) {
  const jarNo = mode === "copied" ? 188 : 147;
  return (
    <div className="space-y-4">
      {mode === "genuine" ? (
        <section className="pop-in rounded-3xl bg-brand p-5 text-white shadow-lg shadow-green-900/20">
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white text-2xl text-brand">✓</span>
            <div>
              <p className="text-2xl font-bold leading-tight">আসল পণ্য</p>
              <p className="text-green-100">Genuine batch from {SELLER.name}</p>
            </div>
          </div>
          <p className="mt-4 rounded-2xl bg-white/15 px-4 py-2.5 text-sm">
            You are the <b>2nd</b> person to scan this jar. First scan: 2 days ago, Khulna.
          </p>
        </section>
      ) : (
        <section className="pop-in rounded-3xl bg-amber-500 p-5 text-amber-950 shadow-lg shadow-amber-900/20">
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white text-2xl">⚠</span>
            <div>
              <p className="text-2xl font-bold leading-tight">সাবধান! কোডটি কপি হতে পারে</p>
              <p>This QR was scanned 27 times</p>
            </div>
          </div>
          <p className="mt-4 rounded-2xl bg-white/40 px-4 py-2.5 text-sm">
            Scans came from <b>Dhaka, Chattogram, Sylhet, Bogura and Cumilla</b> in 3 days. A real jar is scanned 1–3
            times. Check the seal, and ask the seller before you eat it.
          </p>
          <a
            href={whatsappLink(`Assalamualaikum. I scanned ${batch.code} jar #0${jarNo} and got a copy warning. Can you check?`, SELLER.phone)}
            className="mt-3 block rounded-2xl bg-amber-950 py-3 text-center font-semibold text-white"
          >
            Report to seller on WhatsApp
          </a>
        </section>
      )}

      <section className="rounded-3xl bg-white p-5 shadow-sm">
        <div className="flex gap-4">
          <div className="shrink-0 rounded-2xl bg-amber-50 px-2 pt-2">
            <Jar kind={batch.kind} size={84} />
          </div>
          <div className="min-w-0">
            <p className="text-lg font-semibold leading-snug">{batch.productBn}</p>
            <p className="text-stone-600">{batch.product}</p>
            <p className="mt-2 text-sm text-stone-500">
              {batch.size} · <b className="text-stone-800">{taka(batch.price)}</b>
            </p>
            <p className="mt-1 font-mono text-xs text-stone-500">
              Batch {batch.code} · jar #0{jarNo} of {batch.jars}
            </p>
          </div>
        </div>
        <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
          <Fact label="Source" value={batch.sourceBn} sub={batch.source} wide />
          <Fact label={batch.kind === "honey" ? "Collected" : "Made"} value={batch.made} />
          <Fact label="Packed" value={batch.packed} />
          <Fact label="Best before" value={batch.bestBefore} />
          <Fact label="Rating" value={`★ ${batch.rating}`} sub={`${batch.reviews} reviews`} />
        </dl>
      </section>

      <section className="rounded-3xl bg-white p-5 shadow-sm">
        <div className="flex items-baseline justify-between">
          <h2 className="font-semibold">Test report</h2>
          <span className="rounded-full bg-stone-100 px-2.5 py-0.5 text-xs text-stone-500">{batch.lab}</span>
        </div>
        <ul className="mt-3 divide-y divide-stone-100">
          {batch.tests.map((t) => (
            <li key={t.name} className="flex items-center justify-between gap-3 py-2.5 text-sm">
              <span>
                {t.name}
                <span className="block text-xs text-stone-400">{t.limit}</span>
              </span>
              <span className="shrink-0 rounded-full bg-green-50 px-2.5 py-1 font-medium text-green-700">✓ {t.result}</span>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-xs text-stone-400">In the real version, the seller uploads the lab PDF here.</p>
      </section>

      <section className="rounded-3xl bg-white p-5 shadow-sm">
        <h2 className="font-semibold">From source to your jar</h2>
        <ol className="mt-4 space-y-4">
          {batch.journey.map((s, i) => (
            <li key={s.title} className="relative flex gap-3">
              <span className="z-10 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-green-100 text-xs font-bold text-green-800">
                {i + 1}
              </span>
              {i < batch.journey.length - 1 && <span className="absolute left-3.5 top-7 h-full w-px bg-green-200" />}
              <div>
                <p className="text-sm font-medium">
                  {s.title} <span className="font-normal text-stone-400">· {s.date}</span>
                </p>
                <p className="text-sm text-stone-500">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="rounded-3xl bg-white p-5 shadow-sm">
        <h2 className="font-semibold">Before you open</h2>
        <ul className="mt-2 space-y-1.5 text-sm text-stone-600">
          <li>☐ The seal under the lid is not broken</li>
          <li>☐ The jar number on the sticker matches: <b>#0{jarNo}</b></li>
          <li>☐ You bought it from {SELLER.name} or a listed shop</li>
        </ul>
      </section>

      <div className="grid gap-2">
        <a
          href={whatsappLink(`Assalamualaikum, I want to order again: ${batch.product} (${batch.size}). Batch ${batch.code}.`, SELLER.phone)}
          className="rounded-2xl bg-green-600 py-3.5 text-center font-semibold text-white shadow-sm"
        >
          আবার অর্ডার করুন · WhatsApp
        </a>
        <p className="text-center text-xs text-stone-500">
          {batch.reorders} people re-ordered from this page
        </p>
      </div>
    </div>
  );
}

function Fact({ label, value, sub, wide }: { label: string; value: string; sub?: string; wide?: boolean }) {
  return (
    <div className={`rounded-2xl bg-stone-50 px-3 py-2.5 ${wide ? "col-span-2" : ""}`}>
      <dt className="text-xs text-stone-500">{label}</dt>
      <dd className="font-medium">{value}</dd>
      {sub && <dd className="text-xs text-stone-500">{sub}</dd>}
    </div>
  );
}

function NotFound({ code }: { code: string }) {
  return (
    <div className="space-y-4">
      <section className="pop-in rounded-3xl bg-red-600 p-5 text-white shadow-lg shadow-red-900/20">
        <div className="flex items-center gap-3">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white text-2xl text-red-600">✕</span>
          <div>
            <p className="text-2xl font-bold leading-tight">এই কোড আমাদের রেকর্ডে নেই</p>
            <p className="text-red-100">This code is not from {SELLER.name}</p>
          </div>
        </div>
        <p className="mt-4 rounded-2xl bg-white/15 px-4 py-2.5 font-mono text-sm">Code: {code}</p>
      </section>
      <section className="rounded-3xl bg-white p-5 text-sm shadow-sm">
        <h2 className="font-semibold">What this means</h2>
        <p className="mt-2 text-stone-600">
          The product may be a fake using this brand name. Please don&apos;t eat it until you check with the seller.
        </p>
        <a
          href={whatsappLink(`Assalamualaikum. I scanned a jar with code ${code} and it says not found. Is this your product?`, SELLER.phone)}
          className="mt-4 block rounded-2xl bg-stone-900 py-3 text-center font-semibold text-white"
        >
          Ask the seller on WhatsApp
        </a>
      </section>
    </div>
  );
}

function DemoSwitch({ current }: { current: "genuine" | "copied" | "fake" }) {
  const first = BATCHES[0].code;
  const items = [
    { key: "genuine", label: "Real jar", href: `/b/${first}` },
    { key: "copied", label: "Copied QR", href: `/b/${first}?demo=copied` },
    { key: "fake", label: "Fake code", href: "/b/MK-H-9999" },
  ];
  return (
    <nav className="no-print mt-8 rounded-3xl border border-dashed border-stone-300 p-4">
      <p className="text-center text-xs font-medium uppercase tracking-wide text-stone-500">Demo: see each case</p>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {items.map((i) => (
          <Link
            key={i.key}
            href={i.href}
            className={`rounded-xl px-2 py-2 text-center text-sm font-medium ${
              current === i.key ? "bg-stone-900 text-white" : "bg-white text-stone-700 shadow-sm"
            }`}
          >
            {i.label}
          </Link>
        ))}
      </div>
      <div className="mt-3 flex justify-center gap-4 text-sm">
        <Link href="/" className="text-brand underline">About Khati QR</Link>
        <Link href="/dashboard" className="text-brand underline">Seller dashboard</Link>
      </div>
    </nav>
  );
}
