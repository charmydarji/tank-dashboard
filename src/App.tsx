import { useEffect, useState } from "react";
import { fetchCycles } from "./data";
import type { Cycle } from "./types";
import KpiCards from "./components/KpiCards";

export default function App() {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const data = await fetchCycles();
        setCycles(data);
        setError(null);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="min-h-screen" style={{ background: "var(--surface)", color: "var(--text)" }}>
      <header className="border-b" style={{ borderColor: "var(--border)" }}>
        <div className="mx-auto max-w-6xl px-4 py-5">
          <h1 className="text-xl font-semibold">Tank Operations Dashboard</h1>
          <p className="mt-1 text-sm" style={{ color: "var(--muted)" }}>
            KPIs for tank operation cycles
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6 space-y-4">
        <div className="rounded-xl border p-4 shadow-sm" style={{ borderColor: "var(--border)" }}>
          {loading && <p className="text-sm" style={{ color: "var(--muted)" }}>Loading dataset…</p>}
          {!loading && error && <p className="text-sm text-red-600">Failed to load: {error}</p>}
          {!loading && !error && (
            <p className="text-sm" style={{ color: "var(--muted)" }}>
              Loaded {cycles.length} cycles
            </p>
          )}
        </div>

        <KpiCards cycles={cycles} />
      </main>
    </div>
  );
}
