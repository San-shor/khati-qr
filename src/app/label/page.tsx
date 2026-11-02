import type { Metadata } from "next";
import LabelMaker from "@/components/LabelMaker";
import Link from "next/link";
import { DemoStrip, Logo } from "@/components/ui";

export const metadata: Metadata = { title: "Make QR stickers · Khati QR demo" };

export default function Page() {
  return (
    <div className="min-h-screen bg-stone-100">
      <DemoStrip />
      <header className="no-print mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Logo />
        <nav className="flex gap-4 text-sm">
          <Link href="/dashboard" className="text-stone-600 hover:text-stone-900">Dashboard</Link>
          <Link href="/b/MK-H-2610" className="text-stone-600 hover:text-stone-900">Customer page</Link>
        </nav>
      </header>
      <main className="mx-auto max-w-6xl px-4 pb-16">
        <h1 className="no-print mb-1 text-2xl font-bold">Make QR stickers for a batch</h1>
        <p className="no-print mb-6 text-stone-600">Fill the details once. Print. Stick one on every jar.</p>
        <LabelMaker />
      </main>
    </div>
  );
}
