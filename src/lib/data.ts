// Sample seller and batches for the demo. All names and numbers are made up.

export type Kind = "honey" | "ghee" | "oil";

export type Test = { name: string; result: string; limit: string };
export type Step = { date: string; title: string; text: string };

export type Batch = {
  code: string;
  kind: Kind;
  product: string;
  productBn: string;
  size: string;
  price: number;
  jars: number;
  source: string;
  sourceBn: string;
  made: string; // collected / made date
  packed: string;
  bestBefore: string;
  tests: Test[];
  lab: string;
  journey: Step[];
  scans: number;
  reorders: number;
  rating: number;
  reviews: number;
};

export const SELLER = {
  name: "Modhukunja Naturals",
  nameBn: "মধুকুঞ্জ ন্যাচারালস",
  city: "Khulna",
  since: 2021,
  page: "61594388112794", // demo: goes to the studio Facebook page
};

export const BATCHES: Batch[] = [
  {
    code: "MK-H-2610",
    kind: "honey",
    product: "Sundarbans Khalisha Honey",
    productBn: "সুন্দরবনের খলিশা ফুলের মধু",
    size: "500 g",
    price: 850,
    jars: 240,
    source: "Shyamnagar, Satkhira (Sundarbans edge)",
    sourceBn: "শ্যামনগর, সাতক্ষীরা",
    made: "18 Apr 2026",
    packed: "12 Oct 2026",
    bestBefore: "Oct 2028",
    lab: "Sample report",
    tests: [
      { name: "Moisture", result: "18.4%", limit: "max 20%" },
      { name: "Added sugar (C4 test)", result: "Not found", limit: "must be none" },
      { name: "HMF (freshness)", result: "12 mg/kg", limit: "max 40" },
      { name: "Main pollen", result: "Khalisha", limit: "matches label" },
    ],
    journey: [
      { date: "18 Apr", title: "Collected from the forest", text: "Mowal team, Burigoalini range. Wild hives, no feeding." },
      { date: "20 Apr", title: "Filtered by cloth", text: "No heat, no machine. Wax and pieces removed." },
      { date: "3 Oct", title: "Lab test done", text: "Moisture, sugar and freshness checked." },
      { date: "12 Oct", title: "Packed in glass jars", text: "240 jars, each with its own sealed QR sticker." },
    ],
    scans: 412,
    reorders: 38,
    rating: 4.8,
    reviews: 96,
  },
  {
    code: "MK-G-2609",
    kind: "ghee",
    product: "Gawa Ghee (cow milk)",
    productBn: "গাওয়া ঘি",
    size: "400 g",
    price: 780,
    jars: 120,
    source: "Shahjadpur, Sirajganj",
    sourceBn: "শাহজাদপুর, সিরাজগঞ্জ",
    made: "28 Sep 2026",
    packed: "30 Sep 2026",
    bestBefore: "Mar 2027",
    lab: "Sample report",
    tests: [
      { name: "Moisture", result: "0.2%", limit: "max 0.5%" },
      { name: "Dalda / vegetable fat", result: "Not found", limit: "must be none" },
      { name: "Free fatty acid", result: "1.1%", limit: "max 3%" },
    ],
    journey: [
      { date: "25 Sep", title: "Milk from 14 farms", text: "Local cows, Shahjadpur milk area." },
      { date: "28 Sep", title: "Cooked the old way", text: "Cream to butter to ghee on a slow fire." },
      { date: "29 Sep", title: "Lab test done", text: "Checked for dalda and vegetable fat." },
      { date: "30 Sep", title: "Packed", text: "120 jars, sealed with QR." },
    ],
    scans: 233,
    reorders: 27,
    rating: 4.9,
    reviews: 51,
  },
  {
    code: "MK-O-2610",
    kind: "oil",
    product: "Ghani-pressed Mustard Oil",
    productBn: "ঘানি ভাঙা সরিষার তেল",
    size: "1 L",
    price: 390,
    jars: 300,
    source: "Kalihati, Tangail",
    sourceBn: "কালিহাতী, টাঙ্গাইল",
    made: "6 Oct 2026",
    packed: "8 Oct 2026",
    bestBefore: "Apr 2027",
    lab: "Sample report",
    tests: [
      { name: "Argemone oil", result: "Not found", limit: "must be none" },
      { name: "Palm / soybean mix", result: "Not found", limit: "must be none" },
      { name: "Acid value", result: "3.2", limit: "max 6" },
    ],
    journey: [
      { date: "2 Oct", title: "Mustard seed bought", text: "Local seed from Tangail farmers." },
      { date: "6 Oct", title: "Pressed in a wooden ghani", text: "Slow and cold. No chemical, no extra smell." },
      { date: "7 Oct", title: "Lab test done", text: "Checked for argemone and mixed oils." },
      { date: "8 Oct", title: "Bottled", text: "300 bottles, sealed with QR." },
    ],
    scans: 639,
    reorders: 21,
    rating: 4.7,
    reviews: 73,
  },
];

export const findBatch = (code: string) =>
  BATCHES.find((b) => b.code.toLowerCase() === code.toLowerCase());

export const KIND_STYLE: Record<Kind, { label: string; jar: [string, string]; lid: string }> = {
  honey: { label: "Honey", jar: ["#f59e0b", "#b45309"], lid: "#78350f" },
  ghee: { label: "Ghee", jar: ["#fde68a", "#eab308"], lid: "#a16207" },
  oil: { label: "Mustard oil", jar: ["#facc15", "#ca8a04"], lid: "#3f6212" },
};

export const taka = (n: number) => `৳${n.toLocaleString("en-IN")}`;
