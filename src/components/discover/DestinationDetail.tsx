
import React from 'react';
import { MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Destination } from '@/types/itinerary';

interface DestinationDetailProps {
  selectedDestination: Destination | null;
  onViewItinerary: () => void;
}

const DestinationDetail = ({
  selectedDestination,
  onViewItinerary
}: DestinationDetailProps) => {
  return (
    <div className="lg:col-span-1 row-start-1 lg:row-auto">
      <div className="sticky top-28 glass rounded-xl p-6 shadow-subtle">
        <h2 className="text-xl font-semibold mb-4">Selected Destination</h2>
        
        {selectedDestination ? (
          <div className="space-y-4">
            <div className="aspect-[4/3] rounded-lg overflow-hidden">
              <img 
                src={selectedDestination.image} 
                alt={selectedDestination.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div>
              <h3 className="text-lg font-medium">{selectedDestination.name}</h3>
              <div className="flex items-center text-sm text-muted-foreground mt-1">
                <MapPin className="h-3.5 w-3.5 mr-1" />
                <span>{selectedDestination.location}</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-1.5">
              {selectedDestination.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="px-2 py-1 text-xs bg-secondary rounded-full text-foreground/80"
                >
                  {tag}
                </span>
              ))}
            </div>
            
            <Separator />
            
            <p className="text-sm text-foreground/80">
              {selectedDestination.description}
            </p>
            
            <Button 
              className="w-full"
              onClick={onViewItinerary}
            >
              View Itinerary
            </Button>
          </div>
        ) : (
          <div className="py-8 text-center">
            <MapPin className="h-10 w-10 text-muted-foreground/50 mx-auto mb-3" />
            <p className="text-muted-foreground">
              Select a destination to view details and create an itinerary
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DestinationDetail;
