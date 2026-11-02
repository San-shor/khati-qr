# Khati QR

**A QR sticker on every jar that proves the product is genuine.**

Khati QR (*khati* = "pure" in Bangla) is a demo for small food brands in Bangladesh that sell honey, ghee, mustard oil and similar products online. The buyer scans the QR on the jar with their phone camera. They see where the batch came from, when it was packed, its test report, and a warning if the code is fake or has been copied onto other jars.

**Live demo:** _coming soon_

> This is a demo. The seller ("Modhukunja Naturals"), batches, test results and scan numbers are made up.

## The problem

- Buyers keep asking "is it real?", and a seller's word alone doesn't prove it.
- Other sellers copy a brand's label and sell fake jars under its name.
- Sellers pay for lab tests, but buyers never see the results.
- Happy buyers forget the page and don't order again.

## What it does

### For the buyer: one scan, three answers

| Result | When | What the buyer sees |
| --- | --- | --- |
| ✅ Genuine | The code is in the seller's records and has only a few scans | Source, dates, test report, batch story, re-order button |
| ⚠️ Possibly copied | The same jar number is scanned many times from many districts | A warning and a button to report it to the seller |
| ❌ Not found | The code isn't in the seller's records | "This code is not from this seller" |

The buyer doesn't need an app. Any phone camera opens the page. The re-order button opens Messenger with the product and batch already filled in.

### For the seller

- **Sticker maker:** enter the batch details once and print a sheet of QR stickers. Each sticker has its own jar number, which is how copied codes get caught.
- **Dashboard:** scans this month, re-orders from the QR page, copy alerts, the cities where buyers scan from, and the latest scans.

## Pages

| Route | What it is |
| --- | --- |
| `/` | Landing page |
| `/b/MK-H-2610` | Buyer page for a genuine jar |
| `/b/MK-H-2610?demo=copied` | Buyer page with the copied-QR warning |
| `/b/MK-H-9999` | Buyer page for an unknown (fake) code |
| `/label` | QR sticker maker with print layout |
| `/dashboard` | Seller dashboard |

The other sample batches are `/b/MK-G-2609` (ghee) and `/b/MK-O-2610` (mustard oil).

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router) with React 19 and TypeScript
- [Tailwind CSS 4](https://tailwindcss.com)
- [qrcode](https://www.npmjs.com/package/qrcode) for generating the sticker QR codes
- Geist and Hind Siliguri fonts (for Bangla text)

There's no database or external API. The sample data lives in `src/lib/data.ts`.

## Run it locally

You need Node.js 20 or newer.

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

For a production build:

```bash
npm run build
npm start
```

## Project structure

```
src/
  app/
    page.tsx              landing page
    b/[code]/page.tsx     buyer scan page (reads the code from the URL)
    label/page.tsx        sticker maker
    dashboard/page.tsx    seller dashboard
    layout.tsx            fonts and site metadata
    globals.css           theme colours and print styles
  components/
    BatchView.tsx         buyer page: genuine / copied / not-found views
    LabelMaker.tsx        sticker form, QR generation, print sheet
    ui.tsx                logo, demo strip, drawn jar
  lib/
    data.ts               sample seller and batches
    config.ts             studio name and Facebook page for Messenger
```

To make it look like another brand, edit `src/lib/data.ts` and `src/lib/config.ts`.

## The real version

A version for a real seller adds:

- **Supabase** for the database (sellers, batches, scans) and storage (lab report PDFs, product photos)
- Seller login, so sellers can add batches themselves
- A scan log per jar number. A copy alert fires when one jar is scanned too many times or from too many places.
- Deployment on Vercel with the seller's own domain

