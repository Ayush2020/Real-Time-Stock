import { Holding } from "@/lib/types";

export async function fetchPortfolio(): Promise<Holding[]> {
  try {
    const res = await fetch("/api/stocks", { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch portfolio");
    return res.json();
  } catch (err) {
    console.error("fetchPortfolio error:", err);
    return [];
  }
}
