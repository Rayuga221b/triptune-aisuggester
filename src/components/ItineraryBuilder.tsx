
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Calendar, Clock, MapPin, Trash2, PlusCircle, MoveVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Destination } from '@/types/itinerary';

export interface ItineraryDay {
  id: string;
  dayNumber: number;
  activities: ItineraryActivity[];
}

export interface ItineraryActivity {
  id: string;
  time: string;
  title: string;
  description: string;
  location: string;
  duration: string;
  isCustom?: boolean;
}

interface ItineraryBuilderProps {
  days: ItineraryDay[];
  selectedDestination?: Destination;
  onAddActivity?: (dayId: string, activity: Partial<ItineraryActivity>) => void;
  onRemoveActivity?: (dayId: string, activityId: string) => void;
  onAddDay?: () => void;
  onRemoveDay?: (dayId: string) => void;
  onReorderActivities?: (dayId: string, activities: ItineraryActivity[]) => void;
  className?: string;
}

const ItineraryBuilder = ({
  days,
  selectedDestination,
  onAddActivity,
  onRemoveActivity,
  onAddDay,
  onRemoveDay,
  onReorderActivities,
  className
}: ItineraryBuilderProps) => {
  const [expandedDay, setExpandedDay] = useState<string | null>(days[0]?.id || null);
  
  const toggleDay = (dayId: string) => {
    setExpandedDay(expandedDay === dayId ? null : dayId);
  };
  
  return (
    <div className={cn('space-y-6', className)}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold">Your Itinerary</h2>
          {selectedDestination && (
            <div className="flex items-center mt-1 text-sm text-muted-foreground">
              <MapPin className="h-3.5 w-3.5 mr-1.5 text-primary" />
              <span>{selectedDestination.name}, {selectedDestination.location}</span>
            </div>
          )}
        </div>
        
        <Button onClick={onAddDay} className="flex-shrink-0">
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Day
        </Button>
      </div>
      
      <Separator />
      
      <div className="space-y-4">
        {days.length > 0 ? (
          days.map((day) => (
            <Card key={day.id} className="overflow-hidden">
              <div 
                className={cn(
                  'px-4 py-3 flex items-center justify-between cursor-pointer bg-muted/50 hover:bg-muted/80 transition-colors',
                )}
                onClick={() => toggleDay(day.id)}
              >
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-primary" />
                  <h3 className="font-medium">Day {day.dayNumber}</h3>
                  <span className="ml-2 text-sm text-muted-foreground">
                    ({day.activities.length} {day.activities.length === 1 ? 'activity' : 'activities'})
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive hover:text-destructive"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onRemoveDay) onRemoveDay(day.id);
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <MoveVertical className={cn(
                    'h-4 w-4 transition-transform duration-300',
                    expandedDay === day.id ? 'rotate-180' : ''
                  )} />
                </div>
              </div>
              
              {expandedDay === day.id && (
                <CardContent className="pt-4">
                  <div className="space-y-3">
                    {day.activities.map((activity) => (
                      <div 
                        key={activity.id}
                        className="p-3 rounded-md bg-secondary/50 hover:bg-secondary transition-colors group relative"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center">
                              <span className="font-medium text-sm text-primary">
                                {activity.time}
                              </span>
                              <span className="mx-2 text-muted-foreground">•</span>
                              <span className="text-sm text-muted-foreground flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                {activity.duration}
                              </span>
                            </div>
                            
                            <h4 className="font-medium mt-1">{activity.title}</h4>
                            
                            {activity.location && (
                              <div className="flex items-center mt-1 text-xs text-muted-foreground">
                                <MapPin className="h-3 w-3 mr-1" />
                                <span>{activity.location}</span>
                              </div>
                            )}
                            
                            <p className="text-sm text-foreground/80 mt-1.5">{activity.description}</p>
                          </div>
                          
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive"
                            onClick={() => onRemoveActivity && onRemoveActivity(day.id, activity.id)}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </div>
                    ))}
                    
                    <Button 
                      variant="outline" 
                      className="w-full mt-2 border-dashed"
                      onClick={() => onAddActivity && onAddActivity(day.id, {
                        time: '12:00',
                        title: 'New Activity',
                        description: 'Add a description',
                        location: 'Location',
                        duration: '1h',
                        isCustom: true
                      })}
                    >
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Add Activity
                    </Button>
                  </div>
                </CardContent>
              )}
            </Card>
          ))
        ) : (
          <div className="text-center py-8 bg-secondary/50 rounded-lg">
            <p className="text-muted-foreground">No days added to your itinerary yet.</p>
            <Button 
              className="mt-3"
              onClick={onAddDay}
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Add First Day
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItineraryBuilder;
