import type { Cycle } from "../../types";
import { durationSeconds } from "../../utils";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

type Bucket = { label: string; count: number };

const BAR_COLOR = "var(--accent)";
const GRID = "var(--grid)";
const AXIS = "var(--muted)";

const LABELS = ["0–5m", "5–10m", "10–15m", "15–20m", "20m+"];

function getBucketIndex(minutes: number) {
  if (minutes < 5) return 0;
  if (minutes < 10) return 1;
  if (minutes < 15) return 2;
  if (minutes < 20) return 3;
  return 4;
}

export function DurationHistogram({ cycles }: { cycles: Cycle[] }) {
  // start with 5 empty buckets
  const data: Bucket[] = LABELS.map((label) => ({ label, count: 0 }));

  // count cycles into buckets
  for (const c of cycles) {
    const minutes = durationSeconds(c) / 60;
    const i = getBucketIndex(minutes);
    data[i].count += 1;
  }

  return (
    <div
      className="rounded-xl border p-4 shadow-sm"
      style={{ borderColor: "var(--border)", background: "var(--surface)" }}
    >
      <p className="text-sm font-medium" style={{ color: "var(--text)" }}>
        Cycle duration distribution
      </p>

      <div className="mt-3 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
            <CartesianGrid stroke={GRID} strokeDasharray="3 3" />
            <XAxis dataKey="label" tick={{ fill: AXIS, fontSize: 12 }} />
            <YAxis allowDecimals={false} tick={{ fill: AXIS, fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: 12,
                color: "var(--text)",
              }}
              labelStyle={{ color: "var(--muted)" }}
            />
            <Bar dataKey="count" fill={BAR_COLOR} opacity={0.9} radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
