import type React from "react";

type FiltersProps = {
  tanks: string[];
  selectedTanks: string[];
  setSelectedTanks: React.Dispatch<React.SetStateAction<string[]>>;

  lastN: number;
  setLastN: React.Dispatch<React.SetStateAction<number>>;

  dateWindowDays: number;
  setDateWindowDays: React.Dispatch<React.SetStateAction<number>>;

  onReset: () => void;
};

export function Filters({
  tanks,
  selectedTanks,
  setSelectedTanks,
  lastN,
  setLastN,
  dateWindowDays,
  setDateWindowDays,
  onReset,
}: FiltersProps) {
  function toggleTank(tank: string) {
    setSelectedTanks((prev) => {
      if (prev.includes(tank)) return prev.filter((t) => t !== tank);
      return [...prev, tank];
    });
  }

  return (
    <div
      className="rounded-xl border p-4 shadow-sm space-y-4"
      style={{ background: "var(--surface)", borderColor: "var(--border)" }}
    >
      {/* Tanks */}
      <div>
        <p className="mb-2 text-xs font-medium" style={{ color: "var(--muted)" }}>
          Tanks (select one or more)
        </p>

        <div className="flex flex-wrap gap-3">
          {tanks.map((tank) => (
            <label
              key={tank}
              className="flex items-center gap-2 text-sm select-none"
              style={{ color: "var(--text)" }}
            >
              <input
                type="checkbox"
                checked={selectedTanks.includes(tank)}
                onChange={() => toggleTank(tank)}
                style={{ accentColor: "var(--brand)" }}
              />
              {tank}
            </label>
          ))}
        </div>

        {selectedTanks.length === 0 && (
          <p className="mt-2 text-xs" style={{ color: "var(--muted)" }}>
            All tanks selected
          </p>
        )}
      </div>

      {/* Dropdowns */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <div>
          <label className="text-xs font-medium" style={{ color: "var(--muted)" }}>
            Date range
          </label>
          <select
            value={dateWindowDays}
            onChange={(e) => setDateWindowDays(Number(e.target.value))}
            className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
            style={{
              background: "var(--surface)",
              borderColor: "var(--border)",
              color: "var(--text)",
            }}
          >
            <option value={0}>All</option>
            <option value={7}>Last 7 days</option>
            <option value={14}>Last 14 days</option>
            <option value={30}>Last 30 days</option>
          </select>
        </div>

        <div>
          <label className="text-xs font-medium" style={{ color: "var(--muted)" }}>
            Recent cycles
          </label>
          <select
            value={lastN}
            onChange={(e) => setLastN(Number(e.target.value))}
            className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
            style={{
              background: "var(--surface)",
              borderColor: "var(--border)",
              color: "var(--text)",
            }}
          >
            {[5, 10, 25, 50, 100, 250].map((n) => (
              <option key={n} value={n}>
                Last {n}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Reset */}
      <div className="flex justify-end">
        <button
          onClick={onReset}
          className="rounded-lg border px-3 py-2 text-sm"
          style={{
            borderColor: "rgba(31,163,157,0.25)",
            background: "rgba(31,163,157,0.08)",
            color: "rgba(19,104,100,1)",
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
