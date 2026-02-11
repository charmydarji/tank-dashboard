import type { Cycle } from "../../types";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

type Point = { water: number; savings: number; tank: string };

const GRID = "var(--grid)";
const AXIS = "var(--muted)";
const DOT = "var(--brand)";

function getWater(c: any) {
  return c?.metrics?.water_gallons ?? c?.metrics?.Water ?? 0;
}

function getSavings(c: any) {
  return c?.savings?.Water ?? c?.savings?.water ?? c?.savings ?? 0;
}

export function SavingsVsWaterScatter({ cycles }: { cycles: Cycle[] }) {
  const data: Point[] = (cycles as any[]).map((c) => ({
    water: Number(getWater(c)) || 0,
    savings: Number(getSavings(c)) || 0,
    tank: c.tank_name,
  }));

  return (
    <div
      className="rounded-xl border p-4 shadow-sm"
      style={{ background: "var(--surface)", borderColor: "var(--border)" }}
    >
      <p className="text-sm font-medium" style={{ color: "var(--text)" }}>
        Savings vs water usage
      </p>

      <div className="mt-3 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
            <CartesianGrid stroke={GRID} strokeDasharray="3 3" />

            <XAxis
              type="number"
              dataKey="water"
              tick={{ fill: AXIS, fontSize: 12 }}
              tickFormatter={(v) => Number(v).toLocaleString()}
              label={{ value: "Water (gal)", position: "insideBottom", offset: -2, fill: AXIS }}
            />

            <YAxis
              type="number"
              dataKey="savings"
              tick={{ fill: AXIS, fontSize: 12 }}
              tickFormatter={(v) => Number(v).toLocaleString()}
              label={{ value: "Saved (gal)", angle: -90, position: "insideLeft", fill: AXIS }}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: 12,
                color: "var(--text)",
              }}
              labelStyle={{ color: "var(--muted)" }}
              formatter={(value: any, name: any, item: any) => {
                const tank = item?.payload?.tank ? ` (${item.payload.tank})` : "";
                const label = name === "water" ? "Water Used" : "Water Saved";
                return [`${Number(value).toLocaleString()} gal${tank}`, label];
              }}
            />

            <Scatter data={data} fill={DOT} fillOpacity={0.55} />
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      <p className="mt-2 text-xs" style={{ color: "var(--muted)" }}>
        Each dot is one cycle.
      </p>
    </div>
  );
}
