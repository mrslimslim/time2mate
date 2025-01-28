'use client';

import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { TimeRange } from '../types';

interface TimeBarProps {
    timezone: string;
    ranges: TimeRange[];
    label: string;
}

export default function TimeBar({ timezone, ranges, label }: TimeBarProps) {
    const [currentTime, setCurrentTime] = useState(dayjs().tz(timezone));

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(dayjs().tz(timezone));
        }, 1000);

        return () => clearInterval(timer);
    }, [timezone]);

    const currentHour = currentTime.hour();
    const currentMinute = currentTime.minute();
    const position = (currentHour * 60 + currentMinute) / (24 * 60) * 100;

    const getCurrentActivityEmoji = () => {
        const currentRange = ranges[currentHour];
        switch (currentRange.level.type) {
            case "active":
                return "🌞";
            case "moderate":
                return "🌤️";
            case "inactive":
                return "🌙";
        }
    };

    return (
        <div className="w-full p-3 bg-gray-800/50 rounded-lg">
            <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                    <span className="text-base font-semibold text-gray-200">{label}</span>
                    <span className="text-lg" title={ranges[currentHour].level.label}>
                        {getCurrentActivityEmoji()}
                    </span>
                </div>
                <div className="text-sm text-gray-400 font-mono">
                    {currentTime.format('HH:mm A')}
                </div>
            </div>
            <div className="relative h-10 flex rounded-lg overflow-hidden">
                {ranges.map((range, index) => (
                    <div
                        key={index}
                        className={`flex-1 ${range.level.color} border-r border-gray-700/50 last:border-r-0`}
                        title={`${range.start}:00 - ${range.end}:00 (${range.level.label})`}
                    />
                ))}
                <div
                    className="absolute top-0 w-0.5 h-full bg-white/90 shadow-[0_0_8px_rgba(255,255,255,0.5)]"
                    style={{ left: `${position}%` }}
                />
            </div>
        </div>
    );
} 