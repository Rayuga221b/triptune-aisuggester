
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { 
  Paintbrush, 
  UtensilsCrossed, 
  Mountain, 
  Building2, 
  Tent, 
  Waves, 
  Music, 
  Users, 
  Luggage, 
  Wine
} from 'lucide-react';

export interface Preference {
  id: string;
  name: string;
  icon: React.ReactNode;
  selected: boolean;
  importance?: number;
}

interface PreferenceSelectorProps {
  preferences: Preference[];
  onPreferenceToggle: (id: string) => void;
  onImportanceChange: (id: string, value: number) => void;
  className?: string;
}

const PreferenceSelector = ({
  preferences,
  onPreferenceToggle,
  onImportanceChange,
  className
}: PreferenceSelectorProps) => {
  
  return (
    <div className={cn('space-y-6', className)}>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {preferences.map((preference) => (
          <button
            key={preference.id}
            className={cn(
              'flex flex-col items-center justify-center p-4 rounded-lg transition-all duration-300',
              preference.selected 
                ? 'bg-primary/10 border-2 border-primary shadow-md'
                : 'bg-secondary hover:bg-secondary/80 border-2 border-transparent'
            )}
            onClick={() => onPreferenceToggle(preference.id)}
          >
            <div 
              className={cn(
                'h-10 w-10 rounded-full flex items-center justify-center mb-3 transition-colors',
                preference.selected ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
              )}
            >
              {preference.icon}
            </div>
            <span className={cn(
              'text-sm font-medium transition-colors',
              preference.selected ? 'text-primary' : 'text-foreground'
            )}>
              {preference.name}
            </span>
          </button>
        ))}
      </div>
      
      <div className="p-5 rounded-lg bg-card space-y-4">
        <h3 className="text-lg font-medium">Preference Importance</h3>
        <p className="text-sm text-muted-foreground">
          Adjust how important each preference is to you
        </p>
        
        <div className="space-y-4 mt-4">
          {preferences.filter(p => p.selected).map((preference) => (
            <div key={preference.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3 text-primary">
                    {preference.icon}
                  </div>
                  <span className="font-medium">{preference.name}</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {preference.importance ? 
                    preference.importance <= 33 ? 'Low' :
                    preference.importance <= 66 ? 'Medium' : 'High'
                  : 'Not set'}
                </span>
              </div>
              
              <Slider
                defaultValue={[preference.importance || 50]}
                max={100}
                step={1}
                onValueChange={(values) => onImportanceChange(preference.id, values[0])}
                className="py-2"
              />
            </div>
          ))}
          
          {preferences.filter(p => p.selected).length === 0 && (
            <div className="text-center py-6 text-muted-foreground">
              Select preferences above to set their importance
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const defaultPreferences: Preference[] = [
  { id: '1', name: 'Art & Culture', icon: <Paintbrush className="h-5 w-5" />, selected: false },
  { id: '2', name: 'Food & Dining', icon: <UtensilsCrossed className="h-5 w-5" />, selected: false },
  { id: '3', name: 'Nature & Outdoors', icon: <Mountain className="h-5 w-5" />, selected: false },
  { id: '4', name: 'Architecture', icon: <Building2 className="h-5 w-5" />, selected: false },
  { id: '5', name: 'Adventure', icon: <Tent className="h-5 w-5" />, selected: false },
  { id: '6', name: 'Beach & Water', icon: <Waves className="h-5 w-5" />, selected: false },
  { id: '7', name: 'Nightlife', icon: <Music className="h-5 w-5" />, selected: false },
  { id: '8', name: 'Local Experience', icon: <Users className="h-5 w-5" />, selected: false },
  { id: '9', name: 'Shopping', icon: <Luggage className="h-5 w-5" />, selected: false },
  { id: '10', name: 'Wine & Drinks', icon: <Wine className="h-5 w-5" />, selected: false },
];

export default PreferenceSelector;
