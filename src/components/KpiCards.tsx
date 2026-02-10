import type { Cycle } from "../types";
import { durationSeconds, formatMinutes, formatNumber, sum } from "../utils";

type KpiCardsProps = {
  cycles: Cycle[];
};

type CardProps = {
  label: string;
  value: string;
  description?: string;
  color?: string;
};

function Card({ label, value, description, color }: CardProps) {
  return (
    <div
      className="rounded-xl border p-4 shadow-sm"
      style={{
        background: "var(--surface)",
        borderColor: "var(--border)",
      }}
    >
      <p className="text-xs font-medium" style={{ color: "var(--muted)" }}>
        {label}
      </p>

      <p
        className="mt-2 text-2xl font-semibold"
        style={{ color: color ?? "var(--text)" }}
      >
        {value}
      </p>

      {description && (
        <p className="mt-1 text-xs" style={{ color: "var(--muted)" }}>
          {description}
        </p>
      )}
    </div>
  );
}

export default function KpiCards({ cycles }: KpiCardsProps) {
  // Total water used across all cycles
  const totalWater = sum(cycles.map((c) => c.metrics.water_gallons));

  // Total energy used across all cycles
  const totalEnergy = sum(cycles.map((c) => c.metrics.energy_kwh));

  // Total water saved across all cycles
  const totalWaterSaved = sum(cycles.map((c) => c.savings));

  // Average cycle duration (in seconds → minutes)
  const averageDurationSeconds =
    cycles.length === 0
      ? 0
      : sum(cycles.map(durationSeconds)) / cycles.length;

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
      <Card
        label="Total Water"
        value={`${formatNumber(totalWater)} gal`}
        color="var(--brand)"
      />

      <Card
        label="Total Energy"
        value={`${formatNumber(totalEnergy)} kWh`}
      />

      <Card
        label="Avg Cycle Duration"
        value={`${formatMinutes(averageDurationSeconds)} min`}
      />

      <Card
        label="Water Saved"
        value={`${formatNumber(totalWaterSaved)} gal`}
        description="Estimated water savings"
        color="var(--accent)"
      />
    </div>
  );
}
