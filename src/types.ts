export type Metrics = {
  water_gallons: number;
  energy_kwh: number;
  time_seconds: number;
};

export type Cycle = {
  id: number;
  tank_name: string;

  // normalized to epoch seconds so charts & duration are easy
  start_time: number;
  end_time: number;

  // treat savings as water saved (gallons)
  savings: number;
  
  metrics: Metrics;
};
