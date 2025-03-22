
import React from 'react';
import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DestinationCard from '@/components/DestinationCard';
import { Destination } from '@/types/itinerary';

interface DestinationListProps {
  destinations: Destination[];
  onFavoriteToggle: (id: string) => void;
  onDestinationSelect: (destination: Destination) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const DestinationList = ({
  destinations,
  onFavoriteToggle,
  onDestinationSelect,
  searchQuery,
  setSearchQuery
}: DestinationListProps) => {
  return (
    <div className="lg:col-span-2 xl:col-span-3">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center">
          <Sparkles className="h-4 w-4 text-primary mr-2" />
          <span className="text-sm font-medium text-primary">AI-Recommended</span>
        </div>
        <span className="text-sm text-muted-foreground">
          Showing {destinations.length} destinations
        </span>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {destinations.map((destination) => (
          <DestinationCard
            key={destination.id}
            destination={destination}
            onFavorite={onFavoriteToggle}
            onSelect={onDestinationSelect}
          />
        ))}
        
        {destinations.length === 0 && (
          <div className="col-span-full py-12 text-center">
            <p className="text-muted-foreground">
              No destinations found matching your search.
            </p>
            <Button 
              variant="link" 
              className="mt-2"
              onClick={() => setSearchQuery('')}
            >
              Clear search
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DestinationList;
