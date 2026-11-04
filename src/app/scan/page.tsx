import type { Metadata } from "next";
import ScanDemo from "@/components/ScanDemo";

export const metadata: Metadata = {
  title: "Scanning a sample jar · Khati QR",
};

export default function Page() {
  return <ScanDemo />;
}
