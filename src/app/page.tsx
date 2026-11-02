import Link from "next/link";
import { DemoStrip, Jar, Logo } from "@/components/ui";
import { whatsappLink } from "@/lib/config";

const PAINS = [
  { bn: "\"আসল তো?\" প্রশ্নের শেষ নেই", en: "Every buyer asks if it's pure, and words don't prove it" },
  { bn: "আপনার নামে নকল বোতল", en: "Others copy your label and sell fake jars" },
  { bn: "ল্যাব রিপোর্ট আছে, দেখানোর জায়গা নেই", en: "You paid for a test, but buyers never see it" },
  { bn: "একবার কিনে আর ফেরে না", en: "Happy buyers forget your page and don't re-order" },
];

const STEPS = [
  { t: "Add a batch", d: "Product, source, dates and test report. Takes 2 minutes." },
  { t: "Print QR stickers", d: "Each jar gets its own number. Stick one on every jar." },
  { t: "Buyer scans", d: "They see it's genuine, where it came from, and the test result." },
  { t: "Re-order + alerts", d: "One tap to order again on WhatsApp. You get alerts if a QR is copied." },
];

const FOR = ["Honey", "Ghee", "Mustard oil", "Dates", "Tea", "Dried fish", "Organic rice", "Achar / pickles", "Spices", "Skin care"];

export default function Home() {
  return (
    <div className="min-h-screen">
      <DemoStrip />
      <header className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <div className="flex items-center gap-2">
          <Logo />
          <span className="hidden text-sm text-stone-500 sm:inline">by WebNest Studio</span>
        </div>
        <Link href="/b/MK-H-2610" className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white">
          Scan a sample jar
        </Link>
      </header>

      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-16 pt-8 md:grid-cols-[1.2fr_1fr] md:pt-14">
        <div>
          <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
            For honey, ghee and oil sellers
          </span>
          <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl">
            আপনার পণ্য খাঁটি।
            <br />
            <span className="text-brand">এক স্ক্যানে প্রমাণ দিন।</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg text-stone-600">
            Put a QR sticker on every jar. When a buyer scans it, they see the batch source, packing date, test report,
            and a warning if the code is fake or copied.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/b/MK-H-2610" className="rounded-2xl bg-brand px-6 py-3.5 font-semibold text-white shadow-sm">
              See what buyers see
            </Link>
            <Link href="/dashboard" className="rounded-2xl border border-stone-300 bg-white px-6 py-3.5 font-semibold">
              Seller dashboard
            </Link>
          </div>
          <p className="mt-3 text-sm text-stone-500">No sign-up. The demo uses a sample seller and made-up data.</p>
        </div>

        <div className="relative mx-auto flex items-end gap-3">
          <div className="absolute inset-x-0 bottom-0 h-24 rounded-full bg-amber-200/50 blur-2xl" />
          <div className="relative"><Jar kind="oil" size={92} /></div>
          <div className="relative"><Jar kind="honey" size={130} /></div>
          <div className="relative"><Jar kind="ghee" size={100} /></div>
          <div className="pop-in absolute -right-4 -top-6 rounded-2xl bg-white px-4 py-3 shadow-xl sm:-right-10">
            <p className="text-xs text-stone-500">Scan result</p>
            <p className="font-semibold text-brand">✓ আসল পণ্য</p>
            <p className="text-xs text-stone-500">Batch MK-H-2610 · jar #0147</p>
          </div>
        </div>
      </section>

      <section className="border-t border-stone-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="text-2xl font-bold">Sound familiar?</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PAINS.map((p) => (
              <div key={p.en} className="rounded-3xl border border-stone-200 p-5">
                <p className="text-lg font-semibold">{p.bn}</p>
                <p className="mt-1 text-stone-600">{p.en}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="text-2xl font-bold">How it works</h2>
        <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <li key={s.t} className="rounded-3xl bg-white p-5 shadow-sm">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-brand font-bold text-white">{i + 1}</span>
              <p className="mt-3 font-semibold">{s.t}</p>
              <p className="mt-1 text-stone-600">{s.d}</p>
            </li>
          ))}
        </ol>
        <div className="mt-6 flex flex-wrap gap-3 text-sm">
          <Link href="/label" className="rounded-full bg-stone-900 px-4 py-2 font-medium text-white">Try the sticker maker</Link>
          <Link href="/b/MK-H-2610?demo=copied" className="rounded-full bg-amber-100 px-4 py-2 font-medium text-amber-900">See a copied-QR warning</Link>
          <Link href="/b/MK-H-9999" className="rounded-full bg-red-100 px-4 py-2 font-medium text-red-800">See a fake code</Link>
        </div>
      </section>

      <section className="border-t border-stone-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="text-2xl font-bold">Works for any product where trust matters</h2>
          <div className="mt-5 flex flex-wrap gap-2">
            {FOR.map((f) => (
              <span key={f} className="rounded-full bg-stone-100 px-4 py-2 text-stone-700">{f}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="rounded-3xl bg-brand-dark px-6 py-10 text-center text-white sm:px-12">
          <h2 className="text-3xl font-bold">আপনার পেজের জন্য চান?</h2>
          <p className="mx-auto mt-3 max-w-xl text-green-100">
            Set up with your brand name, your products and your own link. Your buyers scan, trust, and order again.
          </p>
          <a
            href={whatsappLink("Hi WebNest Studio, I saw the Khati QR demo. I sell ____. Can we talk?")}
            className="mt-6 inline-block rounded-2xl bg-green-400 px-7 py-3.5 font-semibold text-green-950"
          >
            Talk on WhatsApp
          </a>
        </div>
      </section>

      <footer className="pb-10 text-center text-sm text-stone-500">Khati QR is a demo by WebNest Studio, Dhaka.</footer>
    </div>
  );
}
