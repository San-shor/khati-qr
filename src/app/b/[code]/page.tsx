import { Suspense } from "react";
import { BATCHES, findBatch } from "@/lib/data";
import BatchView from "@/components/BatchView";

// Pre-build the sample batches. Any other code is checked at request time
// and shows the "not in our records" warning.
export function generateStaticParams() {
  return BATCHES.map((b) => ({ code: b.code }));
}

async function Loader({ params, searchParams }: PageProps<"/b/[code]">) {
  const [{ code }, sp] = await Promise.all([params, searchParams]);
  const clean = decodeURIComponent(code).toUpperCase();
  // ?demo=copied shows the copied-QR warning (demo only; the real version
  // decides this from the scan log).
  const mode = sp.demo === "copied" ? "copied" : "genuine";
  return <BatchView code={clean} batch={findBatch(clean) ?? null} mode={mode} />;
}

export default function Page(props: PageProps<"/b/[code]">) {
  return (
    <Suspense fallback={<div className="p-10 text-center text-stone-500">Checking code…</div>}>
      <Loader {...props} />
    </Suspense>
  );
}
