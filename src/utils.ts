import type { Cycle } from "./types";

export function durationSeconds(c: Cycle): number {
  const fromMetrics = c.metrics.time_seconds;
  if (Number.isFinite(fromMetrics) && fromMetrics > 0) return fromMetrics;
  return Math.max(0, c.end_time - c.start_time);
}

export function uniqueTanks(cycles: Cycle[]): string[] {
  return Array.from(new Set(cycles.map((c) => c.tank_name))).sort();
}

export function sum(nums: number[]): number {
  return nums.reduce((a, b) => a + b, 0);
}

export function formatNumber(n: number): string {
  return Intl.NumberFormat(undefined, { maximumFractionDigits: 2 }).format(n);
}

export function formatMinutes(seconds: number): string {
  return Intl.NumberFormat(undefined, { maximumFractionDigits: 1 }).format(seconds / 60);
}
