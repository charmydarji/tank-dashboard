import type { Cycle } from "../../types";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

// Use CSS variables so charts follow the global theme
const GRID = "var(--grid)";
const AXIS = "var(--muted)";
const LINE = "var(--brand)";

// Convert epoch seconds → short date label for the X axis
function formatDateLabel(startSeconds: number) {
  const d = new Date(startSeconds * 1000);
  return d.toLocaleDateString(undefined, {
    month: "short",
    day: "2-digit",
  });
}

export function WaterTrendLine({ cycles }: { cycles: Cycle[] }) {
  // Map normalized Cycle data into chart-friendly rows
  // (keep charts dumb; normalization happens upstream)
  const data = cycles.map((c) => ({
    label: formatDateLabel(c.start_time),
    water: c.metrics.water_gallons,
  }));

  return (
    <div
      className="rounded-xl border p-4 shadow-sm"
      style={{ background: "var(--surface)", borderColor: "var(--border)" }}
    >
      <p className="text-sm font-medium" style={{ color: "var(--text)" }}>
        Water usage over time
      </p>

      <div className="mt-3 h-64">
        {/* Responsive container keeps chart fluid across screen sizes */}
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid stroke={GRID} strokeDasharray="3 3" />

            <XAxis dataKey="label" tick={{ fill: AXIS, fontSize: 12 }} />
            <YAxis tick={{ fill: AXIS, fontSize: 12 }} />

            {/* Tooltip styled to match dashboard theme */}
            <Tooltip
              formatter={(v: any) => [`${Number(v).toLocaleString()} gal`, "Water"]}
              contentStyle={{
                backgroundColor: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: 12,
                color: "var(--text)",
              }}
              labelStyle={{ color: "var(--muted)" }}
            />

            {/* Single line = water usage per cycle */}
            <Line
              dataKey="water"
              stroke={LINE}
              strokeWidth={2.5}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <p className="mt-2 text-xs" style={{ color: "var(--muted)" }}>
        Each point represents one tank operation cycle.
      </p>
    </div>
  );
}
