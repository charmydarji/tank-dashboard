import type { Cycle } from "./types";

const DATASET_URL =
  "https://gist.githubusercontent.com/anuragmitra4/438023264eeb039fe2e7280176c7a0a3/raw";

// Convert ISO string → epoch seconds (number)
function toSeconds(iso: unknown): number {
  if (typeof iso !== "string") return 0;
  const ms = Date.parse(iso);
  return Number.isFinite(ms) ? Math.floor(ms / 1000) : 0;
}

// Convert any value → number safely
function toNumber(value: unknown): number {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}

export async function fetchCycles(): Promise<Cycle[]> {
  const response = await fetch(DATASET_URL);

  if (!response.ok) throw new Error(`Failed to fetch dataset: ${response.status}`);

  const json = await response.json();
  if (!Array.isArray(json)) throw new Error("Unexpected dataset format (expected an array).");

  // Convert raw JSON rows into our clean Cycle shape
  return json.map((row: any): Cycle => ({
    id: toNumber(row.id),
    tank_name: String(row.tank_name ?? "Unknown"),
    start_time: toSeconds(row.start_time),
    end_time: toSeconds(row.end_time),

    // We treat "savings" as water saved (gallons)
    savings: toNumber(row?.savings?.Water ?? row?.savings?.water ?? row?.savings),

    metrics: {
      time_seconds: toNumber(row?.metrics?.time),
      energy_kwh: toNumber(row?.metrics?.energy),
      water_gallons: toNumber(
        row?.metrics?.Water ?? row?.metrics?.water ?? row?.metrics?.water_gallons
      ),
    },
  }));
}
