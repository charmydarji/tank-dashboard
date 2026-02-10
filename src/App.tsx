import { useEffect, useState } from "react";
import { fetchCycles } from "./data";
import type { Cycle } from "./types";

export default function App() {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCycles()
      .then(setCycles)
      .catch((err) => setError(err.message));
  }, []);

  if (error) {
    return <div className="p-4 text-red-600">Error: {error}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">Tank Dashboard</h1>

      <p className="mt-2 text-gray-600">
        Loaded {cycles.length} tank cycles
      </p>
    </div>
  );
}
