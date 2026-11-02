"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { BATCHES, SELLER, taka } from "@/lib/data";

type Form = {
  code: string;
  productBn: string;
  product: string;
  size: string;
  price: number;
  packed: string;
  bestBefore: string;
};

const fromBatch = (i: number): Form => {
  const b = BATCHES[i];
  return {
    code: b.code,
    productBn: b.productBn,
    product: b.product,
    size: b.size,
    price: b.price,
    packed: b.packed,
    bestBefore: b.bestBefore,
  };
};

const SHEET = 6;
const jarNo = (n: number) => String(n).padStart(4, "0");

export default function LabelMaker() {
  const [preset, setPreset] = useState(0);
  const [form, setForm] = useState<Form>(fromBatch(0));
  const [qrs, setQrs] = useState<string[]>([]);

  useEffect(() => {
    const origin = window.location.origin;
    let alive = true;
    Promise.all(
      Array.from({ length: SHEET }, (_, i) =>
        QRCode.toString(`${origin}/b/${encodeURIComponent(form.code)}?j=${jarNo(i + 1)}`, {
          type: "svg",
          margin: 0,
          errorCorrectionLevel: "M",
          color: { dark: "#1c1917", light: "#ffffff" },
        }),
      ),
    ).then((list) => {
      // The library gives no size; make each QR fill its box.
      if (alive) setQrs(list.map((s) => s.replace("<svg ", "<svg width=\"100%\" height=\"100%\" style=\"display:block\" ")));
    });
    return () => {
      alive = false;
    };
  }, [form.code]);

  const set = <K extends keyof Form>(k: K, v: Form[K]) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
      <section className="no-print h-fit rounded-3xl bg-white p-5 shadow-sm">
        <h2 className="font-semibold">1. Batch details</h2>
        <div className="mt-3 flex gap-2">
          {BATCHES.map((b, i) => (
            <button
              key={b.code}
              onClick={() => {
                setPreset(i);
                setForm(fromBatch(i));
              }}
              className={`rounded-full px-3 py-1 text-sm ${preset === i ? "bg-brand text-white" : "bg-stone-100 text-stone-700"}`}
            >
              {b.kind === "honey" ? "Honey" : b.kind === "ghee" ? "Ghee" : "Oil"}
            </button>
          ))}
        </div>
        <div className="mt-4 grid gap-3 text-sm">
          <Field label="Product (Bangla)" value={form.productBn} onChange={(v) => set("productBn", v)} />
          <Field label="Product (English)" value={form.product} onChange={(v) => set("product", v)} />
          <div className="grid grid-cols-2 gap-3">
            <Field label="Size" value={form.size} onChange={(v) => set("size", v)} />
            <Field label="Price (৳)" value={String(form.price)} onChange={(v) => set("price", Number(v.replace(/\D/g, "")) || 0)} />
            <Field label="Packed" value={form.packed} onChange={(v) => set("packed", v)} />
            <Field label="Best before" value={form.bestBefore} onChange={(v) => set("bestBefore", v)} />
          </div>
          <Field label="Batch code" value={form.code} onChange={(v) => set("code", v.toUpperCase().replace(/[^A-Z0-9-]/g, ""))} mono />
        </div>
        <p className="mt-4 rounded-2xl bg-amber-50 p-3 text-xs text-amber-900">
          Each sticker gets its own jar number, so the system can spot a QR that is copied onto many jars.
        </p>
        <button
          onClick={() => window.print()}
          className="mt-4 w-full rounded-2xl bg-stone-900 py-3 font-semibold text-white"
        >
          2. Print sticker sheet
        </button>
      </section>

      <section className="print-area rounded-3xl bg-white p-5 shadow-sm">
        <h2 className="no-print mb-4 font-semibold">Preview · first {SHEET} stickers of the batch</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {Array.from({ length: SHEET }, (_, i) => (
            <Sticker key={i} form={form} n={i + 1} qr={qrs[i]} />
          ))}
        </div>
      </section>
    </div>
  );
}

function Sticker({ form, n, qr }: { form: Form; n: number; qr?: string }) {
  return (
    <div className="flex gap-3 rounded-2xl border-2 border-stone-900 bg-[#fffbeb] p-3 break-inside-avoid">
      <div className="flex w-[104px] shrink-0 flex-col items-center">
        <div
          className="h-[96px] w-[96px] bg-white p-1"
          // QR SVG made locally by the qrcode library from our own URL.
          dangerouslySetInnerHTML={{ __html: qr ?? "" }}
        />
        <p className="mt-1 text-center text-[10px] font-semibold leading-tight">স্ক্যান করে আসল কিনা দেখুন</p>
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-brand">{SELLER.name}</p>
        <p className="font-semibold leading-snug">{form.productBn}</p>
        <p className="text-xs text-stone-600">{form.product}</p>
        <p className="mt-1 text-xs">
          {form.size} · <b>{taka(form.price)}</b>
        </p>
        <div className="mt-1.5 grid grid-cols-2 gap-x-2 text-[10px] leading-tight text-stone-600">
          <span>Packed: {form.packed}</span>
          <span>Best before: {form.bestBefore}</span>
        </div>
        <p className="mt-1.5 font-mono text-[10px]">
          {form.code} · <b>#{jarNo(n)}</b>
        </p>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  mono,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  mono?: boolean;
}) {
  return (
    <label className="grid gap-1">
      <span className="text-xs text-stone-500">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full min-w-0 rounded-xl border border-stone-200 px-3 py-2 outline-none focus:border-brand ${mono ? "font-mono" : ""}`}
      />
    </label>
  );
}
