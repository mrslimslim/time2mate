interface TimezoneMapping {
  [key: string]: string;
}

export const utcToIANA: TimezoneMapping = {
  "UTC-5": "America/New_York",
  "UTC-6": "America/Chicago",
  "UTC-7": "America/Denver",
  "UTC-8": "America/Los_Angeles",
  "UTC-9": "America/Anchorage",
  "UTC-10": "Pacific/Honolulu",
};
