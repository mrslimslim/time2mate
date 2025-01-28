'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { Lock, Unlock } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import timezoneData from './timezone.json';
import StateInput from './components/StateInput';
import TimeBar from './components/TimeBar';
import ActivityConclusion from './components/ActivityConclusion';
import { getTimeRanges, getCurrentActivityLevel, getActivityStatus } from './utils/timeUtils';
import { utcToIANA } from './utils/timezoneMapping';

export default function Home() {
  const [selectedTimezones, setSelectedTimezones] = useState<string[]>([]);
  const [isLocked, setIsLocked] = useState(false);
  const { toast } = useToast();
  const chinaTimezone = 'Asia/Shanghai';

  useEffect(() => {
    const savedState = localStorage.getItem('savedTimezones');
    if (savedState) {
      const parsed = JSON.parse(savedState);
      setSelectedTimezones(parsed);
      setIsLocked(true);
    }
  }, []);

  const handleStateSelect = (utcTimezones: string[]) => {
    const ianaTimezones = utcTimezones.map(utc => utcToIANA[utc]).filter(Boolean);
    setSelectedTimezones(ianaTimezones);
  };

  const toggleLock = () => {
    if (!isLocked) {
      localStorage.setItem('savedTimezones', JSON.stringify(selectedTimezones));
      toast({
        description: "Your selection has been saved. It will be restored next time you visit.",
      });
    } else {
      localStorage.removeItem('savedTimezones');
      toast({
        description: "Your saved selection has been cleared.",
      });
    }
    setIsLocked(!isLocked);
  };

  const getConclusion = () => {
    if (selectedTimezones.length === 0) return null;
    const usActivity = getCurrentActivityLevel(selectedTimezones[0]);
    const chinaActivity = getCurrentActivityLevel(chinaTimezone);
    return getActivityStatus(usActivity, chinaActivity);
  };

  const conclusion = getConclusion();

  return (
    <main className="h-screen p-4 bg-gray-900 text-white flex items-center justify-center relative">
      {selectedTimezones.length > 0 && (
        <div className="absolute top-4 right-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleLock}
            className="hover:bg-gray-800"
          >
            {isLocked ? (
              <Lock className="h-4 w-4 text-blue-400" />
            ) : (
              <Unlock className="h-4 w-4 text-gray-400" />
            )}
          </Button>
        </div>
      )}

      <div className="w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-blue-500 to-purple-500 
        text-transparent bg-clip-text">Time2Mate</h1>
        <p className="text-center mb-6 text-gray-400 text-sm">
          Find the perfect time to connect with friends in China
        </p>

        <div className="flex justify-center mb-8">
          <StateInput
            timezoneData={timezoneData}
            onStateSelect={handleStateSelect}
          />
        </div>

        {selectedTimezones.length > 0 && (
          <div className="space-y-4">
            {conclusion && (
              <ActivityConclusion
                status={conclusion.status}
                message={conclusion.message}
              />
            )}
            <div className="space-y-3 bg-gray-800/30 p-4 rounded-xl">
              {selectedTimezones.map((timezone, index) => (
                <TimeBar
                  key={index}
                  timezone={timezone}
                  ranges={getTimeRanges(timezone)}
                  label={`US Time (${timezone.split('/')[1].replace('_', ' ')})`}
                />
              ))}
              <TimeBar
                timezone={chinaTimezone}
                ranges={getTimeRanges(chinaTimezone)}
                label="China Time"
              />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
