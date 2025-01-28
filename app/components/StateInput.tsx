'use client';

import { useState } from 'react';
import { TimeZoneData } from '../types';

interface StateInputProps {
    timezoneData: TimeZoneData[];
    onStateSelect: (timezone: string[]) => void;
}

export default function StateInput({ timezoneData, onStateSelect }: StateInputProps) {
    const [input, setInput] = useState('');
    const [suggestions, setSuggestions] = useState<TimeZoneData[]>([]);

    const handleInputChange = (value: string) => {
        setInput(value);
        if (value.length > 0) {
            const filtered = timezoneData.filter(item =>
                item.state.toLowerCase().includes(value.toLowerCase())
            );
            setSuggestions(filtered);
        } else {
            setSuggestions([]);
        }
    };

    const handleStateSelect = (state: TimeZoneData) => {
        setInput(state.state);
        setSuggestions([]);
        onStateSelect(state.timeZones);
    };

    return (
        <div className="relative w-full max-w-md z-50">
            <input
                type="text"
                value={input}
                onChange={(e) => handleInputChange(e.target.value)}
                placeholder="Enter your state..."
                className="w-full p-3 border rounded-lg bg-gray-800 text-white border-gray-700 
                focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
            {suggestions.length > 0 && (
                <div className="absolute w-full mt-1 bg-gray-800 border border-gray-700 
                rounded-lg shadow-lg overflow-hidden">
                    {suggestions.map((state) => (
                        <div
                            key={state.state}
                            onClick={() => handleStateSelect(state)}
                            className="p-3 hover:bg-gray-700 cursor-pointer text-gray-200 
                            transition-colors duration-150"
                        >
                            {state.state}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
} 