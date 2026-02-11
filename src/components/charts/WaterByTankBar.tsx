import type { Cycle } from "../../types";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from "recharts";

type Row = { tank: string; water: number };

const GRID = "var(--grid)";
const AXIS = "var(--muted)";

// Simple palette (repeats if more tanks)
const COLORS = [
  "rgba(31,163,157,0.90)", // teal
  "rgba(120,184,15,0.85)", // green
  "rgba(31,163,157,0.65)", // light teal
  "rgba(120,184,15,0.60)", // light green
  "rgba(31,163,157,0.45)", // softer teal
  "rgba(120,184,15,0.40)", // softer green
];

// supports both schemas
function getWater(c: any) {
  return c?.metrics?.water_gallons ?? c?.metrics?.Water ?? c?.metrics?.water ?? 0;
}

export function WaterByTankBar({ cycles }: { cycles: Cycle[] }) {
  // 1) Sum water per tank
  const totals: Record<string, number> = {};

  for (const c of cycles as any[]) {
    const tank = c.tank_name;
    totals[tank] = (totals[tank] ?? 0) + (Number(getWater(c)) || 0);
  }

  // 2) Convert to chart rows + sort
  const data: Row[] = Object.entries(totals)
    .map(([tank, water]) => ({ tank, water }))
    .sort((a, b) => b.water - a.water);

  return (
    <div
      className="rounded-xl border p-4 shadow-sm"
      style={{ background: "var(--surface)", borderColor: "var(--border)" }}
    >
      <p className="text-sm font-medium" style={{ color: "var(--text)" }}>
        Water by tank
      </p>

      <div className="mt-3 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 10, right: 20, left: 20, bottom: 0 }}
          >
            <CartesianGrid stroke={GRID} strokeDasharray="3 3" />

            <XAxis
              type="number"
              tick={{ fill: AXIS, fontSize: 12 }}
              tickFormatter={(v) => Number(v).toLocaleString()}
            />

            <YAxis
              type="category"
              dataKey="tank"
              width={70}
              tick={{ fill: AXIS, fontSize: 12 }}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: 12,
                color: "var(--text)",
              }}
              labelStyle={{ color: "var(--muted)" }}
              formatter={(v: any) => [`${Number(v).toLocaleString()} gal`, "Water"]}
            />

            <Bar dataKey="water" radius={[6, 6, 6, 6]}>
              {data.map((row, index) => (
                <Cell key={row.tank} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p className="mt-2 text-xs" style={{ color: "var(--muted)" }}>
        Total measured water usage per tank (sorted high → low).
      </p>
    </div>
  );
}
