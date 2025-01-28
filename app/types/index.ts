export interface TimeZoneData {
  state: string;
  timeZones: string[];
}

export interface ActivityLevel {
  type: "inactive" | "moderate" | "active";
  color: string;
  label: string;
}

export interface TimeRange {
  start: number;
  end: number;
  level: ActivityLevel;
}
