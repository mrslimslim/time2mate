import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { ActivityLevel, TimeRange } from "../types";

dayjs.extend(utc);
dayjs.extend(timezone);

export const getActivityLevel = (hour: number): ActivityLevel => {
  // Inactive time: 1:00 - 8:00
  if (hour >= 1 && hour < 8) {
    return {
      type: "inactive",
      color: "bg-gray-700/50",
      label: "Inactive Time",
    };
  }
  // Moderate activity: 9:00 - 18:00
  else if (hour >= 9 && hour < 18) {
    return {
      type: "moderate",
      color: "bg-indigo-600/50",
      label: "Moderate Activity",
    };
  }
  // Active time: other hours
  return {
    type: "active",
    color: "bg-blue-500/50",
    label: "Active Time",
  };
};

export const getTimeRanges = (): TimeRange[] => {
  const ranges: TimeRange[] = [];
  for (let hour = 0; hour < 24; hour++) {
    ranges.push({
      start: hour,
      end: hour + 1,
      level: getActivityLevel(hour),
    });
  }
  return ranges;
};

export const getCurrentActivityLevel = (timezone: string): ActivityLevel => {
  const hour = dayjs().tz(timezone).hour();
  return getActivityLevel(hour);
};

export const getActivityStatus = (
  usActivity: ActivityLevel,
  chinaActivity: ActivityLevel
): {
  status: "optimal" | "moderate" | "poor";
  message: string;
} => {
  if (usActivity.type === "active" && chinaActivity.type === "active") {
    return {
      status: "optimal",
      message: "Perfect timing! Both regions are in active hours.",
    };
  } else if (
    (usActivity.type === "active" && chinaActivity.type === "moderate") ||
    (usActivity.type === "moderate" && chinaActivity.type === "active")
  ) {
    return {
      status: "moderate",
      message:
        "Good timing - one region is active while the other is moderately active.",
    };
  } else if (
    usActivity.type === "inactive" ||
    chinaActivity.type === "inactive"
  ) {
    return {
      status: "poor",
      message: "Not recommended - one or both regions are in inactive hours.",
    };
  } else {
    return {
      status: "moderate",
      message:
        "Acceptable timing - both regions are in moderate activity hours.",
    };
  }
};
