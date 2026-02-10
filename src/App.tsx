import { useEffect, useMemo, useState } from "react";
import { fetchCycles } from "./data";
import type { Cycle } from "./types";
import { uniqueTanks } from "./utils";
import { Filters } from "./components/Filters";
import KpiCards from "./components/KpiCards";

export default function App() {
  // 1) Data loading state
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 2) Filter state
  const [selectedTanks, setSelectedTanks] = useState<string[]>([]);
  const [lastN, setLastN] = useState(250);
  const [dateWindowDays, setDateWindowDays] = useState(0); // 0 = all

  // 3) Load data once when page opens
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

  // 4) Tanks list for filter UI
  const tanks = useMemo(() => uniqueTanks(cycles), [cycles]);

  // 5) Apply filters
  const filteredCycles = useMemo(() => {
    let result = [...cycles];

    // Filter by selected tanks
    if (selectedTanks.length > 0) {
      result = result.filter((c) => selectedTanks.includes(c.tank_name));
    }

    // Sort by start time
    result.sort((a, b) => a.start_time - b.start_time);

    // Filter to last X days (based on latest cycle)
    if (dateWindowDays > 0 && result.length > 0) {
      const latestTime = result[result.length - 1].start_time;
      const cutoff = latestTime - dateWindowDays * 24 * 60 * 60;
      result = result.filter((c) => c.start_time >= cutoff);
    }

    // Keep only the most recent N cycles
    if (result.length > lastN) {
      result = result.slice(result.length - lastN);
    }

    return result;
  }, [cycles, selectedTanks, lastN, dateWindowDays]);

  const onReset = () => {
    setSelectedTanks([]);
    setLastN(250);
    setDateWindowDays(0);
  };

  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(135deg, rgba(31,163,157,0.06), #ffffff 55%, rgba(120,184,15,0.06))",
        color: "var(--text)",
      }}
    >
      <header
        className="border-b"
        style={{ background: "var(--surface)", borderColor: "var(--border)" }}
      >
        <div className="mx-auto max-w-6xl px-4 py-5">
          <h1 className="text-xl font-semibold">
            Tank Operations{" "}
            <span style={{ color: "var(--brand)" }}>Dashboard</span>
          </h1>
          <p className="mt-1 text-sm" style={{ color: "var(--muted)" }}>
            KPIs and filters for tank operation cycles
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6 space-y-4">
        {/* Status card */}
        <div
          className="rounded-xl border p-4 shadow-sm"
          style={{ background: "var(--surface)", borderColor: "var(--border)" }}
        >
          {loading && (
            <p className="text-sm" style={{ color: "var(--muted)" }}>
              Loading dataset…
            </p>
          )}

          {!loading && error && (
            <div className="space-y-1">
              <p className="text-sm font-medium" style={{ color: "#dc2626" }}>
                Failed to load
              </p>
              <p className="text-sm" style={{ color: "var(--muted)" }}>
                {error}
              </p>
            </div>
          )}

          {!loading && !error && (
            <div className="flex flex-wrap gap-3">
              <span
                className="rounded-full px-3 py-1 text-xs"
                style={{
                  background: "rgba(31,163,157,0.10)",
                  color: "rgba(19,104,100,1)",
                  border: "1px solid rgba(31,163,157,0.18)",
                }}
              >
                Cycles: <b>{filteredCycles.length}</b> (filtered)
              </span>

              <span
                className="rounded-full px-3 py-1 text-xs"
                style={{
                  background: "rgba(120,184,15,0.12)",
                  color: "rgba(74,114,11,1)",
                  border: "1px solid rgba(120,184,15,0.18)",
                }}
              >
                Tanks: <b>{tanks.length}</b>
              </span>
            </div>
          )}
        </div>

        <Filters
          tanks={tanks}
          selectedTanks={selectedTanks}
          setSelectedTanks={setSelectedTanks}
          lastN={lastN}
          setLastN={setLastN}
          dateWindowDays={dateWindowDays}
          setDateWindowDays={setDateWindowDays}
          onReset={onReset}
        />

        <KpiCards cycles={filteredCycles} />
      </main>
    </div>
  );
}
