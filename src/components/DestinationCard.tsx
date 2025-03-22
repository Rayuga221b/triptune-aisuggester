
import React from 'react';
import { cn } from '@/lib/utils';
import { Heart, Clock, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Destination } from '@/types/itinerary';

interface DestinationCardProps {
  destination: Destination;
  onFavorite?: (id: string) => void;
  onSelect?: (destination: Destination) => void;
  className?: string;
}

const DestinationCard = ({
  destination,
  onFavorite,
  onSelect,
  className
}: DestinationCardProps) => {
  const {
    id,
    name,
    location,
    description,
    image,
    duration,
    tags,
    rating,
    isFavorite = false
  } = destination;

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onFavorite) {
      onFavorite(id);
    }
  };

  return (
    <div 
      className={cn(
        'relative overflow-hidden rounded-xl card-hover bg-card',
        className
      )}
      onClick={() => onSelect && onSelect(destination)}
    >
      <div className="absolute top-3 right-3 z-10">
        <button
          className={cn(
            'h-8 w-8 rounded-full flex items-center justify-center transition-all duration-300',
            isFavorite 
              ? 'bg-white/90 text-red-500' 
              : 'bg-black/20 text-white hover:bg-white/90 hover:text-foreground'
          )}
          onClick={handleFavorite}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart className={cn('h-4 w-4', isFavorite && 'fill-current')} />
        </button>
      </div>
      
      <div className="aspect-[4/3] w-full relative">
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-[1]" />
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute bottom-4 left-4 z-[2]">
          {tags.map((tag, index) => (
            <span 
              key={index}
              className="inline-block px-2 py-1 mr-2 mb-2 text-xs font-medium bg-black/30 text-white rounded-full backdrop-blur-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      
      <div className="p-4 space-y-2">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold line-clamp-1">{name}</h3>
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="h-3.5 w-3.5 mr-1" />
            <span>{duration}</span>
          </div>
        </div>
        
        <div className="flex items-center text-sm text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
          <span className="truncate">{location}</span>
        </div>
        
        <p className="text-sm text-foreground/80 line-clamp-2">{description}</p>
        
        <Button 
          className="w-full mt-2"
          onClick={() => onSelect && onSelect(destination)}
        >
          Explore
        </Button>
      </div>
    </div>
  );
};

export default DestinationCard;
