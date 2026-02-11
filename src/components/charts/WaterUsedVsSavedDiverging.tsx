import type { Cycle } from "../../types";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
} from "recharts";

const GRID = "var(--grid)";
const AXIS = "var(--muted)";
const USED = "var(--brand)";
const SAVED = "var(--accent)";

// supports both schemas
function getUsedWater(c: any) {
  return Number(c?.metrics?.water_gallons ?? c?.metrics?.Water ?? 0) || 0;
}
function getSavedWater(c: any) {
  return Number(c?.savings?.Water ?? c?.savings?.water ?? c?.savings ?? 0) || 0;
}

export function WaterUsedVsSavedDiverging({ cycles }: { cycles: Cycle[] }) {
  // 1) Total up per tank
  const totals: Record<string, { used: number; saved: number }> = {};

  for (const c of cycles as any[]) {
    const tank = c.tank_name;
    const used = getUsedWater(c);
    const saved = getSavedWater(c);

    if (!totals[tank]) totals[tank] = { used: 0, saved: 0 };
    totals[tank].used += used;
    totals[tank].saved += saved;
  }

  // 2) Convert to chart rows
  const data = Object.entries(totals)
    .map(([tank, v]) => ({
      tank,
      used: v.used,
      saved: -v.saved, // negative → goes left
    }))
    .sort((a, b) => a.tank.localeCompare(b.tank));

  return (
    <div
      className="rounded-xl border p-4 shadow-sm"
      style={{ background: "var(--surface)", borderColor: "var(--border)" }}
    >
      <p className="text-sm font-medium" style={{ color: "var(--text)" }}>
        Water used vs water saved
      </p>

      <div className="mt-3 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 10, right: 20, left: 10, bottom: 0 }}>
            <CartesianGrid stroke={GRID} strokeDasharray="3 3" />
            <ReferenceLine x={0} stroke={GRID} />

            <YAxis
              type="category"
              dataKey="tank"
              width={70}
              tick={{ fill: AXIS, fontSize: 12 }}
            />

            <XAxis
              type="number"
              tick={{ fill: AXIS, fontSize: 12 }}
              tickFormatter={(v) => Math.abs(Number(v)).toLocaleString()}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: 12,
                color: "var(--text)",
              }}
              labelStyle={{ color: "var(--muted)" }}
              formatter={(v: any, name: any) => {
                const value = Math.abs(Number(v));
                const label = name === "saved" ? "Water Saved" : "Water Used";
                return [`${value.toLocaleString()} gal`, label];
              }}
            />

            {/* saved (left) */}
            <Bar dataKey="saved" fill={SAVED} radius={[0, 6, 6, 0]} />
            {/* used (right) */}
            <Bar dataKey="used" fill={USED} radius={[0, 6, 6, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p className="mt-2 text-xs" style={{ color: "var(--muted)" }}>
        Saved bars go left (negative values). Used bars go right.
      </p>
    </div>
  );
}
