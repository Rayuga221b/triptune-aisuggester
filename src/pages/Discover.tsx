
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, MapPin, Filter, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Navbar from '@/components/Navbar';
import DestinationCard, { Destination } from '@/components/DestinationCard';
import PreferenceSelector, { defaultPreferences } from '@/components/PreferenceSelector';
import { AIRecommendationService } from '@/services/AIRecommendationService';
import { toast } from "sonner";
import { useToast } from "@/components/ui/use-toast";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
};

const Discover = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [filteredDestinations, setFilteredDestinations] = useState<Destination[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [preferences, setPreferences] = useState(defaultPreferences);
  const [previousSelections, setPreviousSelections] = useState<string[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  useEffect(() => {
    // Get initial destinations from AI service
    const initialDestinations = AIRecommendationService.getRecommendations(preferences, previousSelections);
    setDestinations(initialDestinations);
    setFilteredDestinations(initialDestinations);
    
    // Check if there's a destination ID in query params
    const params = new URLSearchParams(location.search);
    const destinationId = params.get('destination');
    
    if (destinationId) {
      const destination = initialDestinations.find(d => d.id === destinationId);
      if (destination) {
        setSelectedDestination(destination);
      }
    }
  }, [location.search]);
  
  // Update recommendations when preferences change
  useEffect(() => {
    updateRecommendations();
  }, [preferences, previousSelections]);
  
  // Handle search
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredDestinations(destinations);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = destinations.filter(
        dest => 
          dest.name.toLowerCase().includes(query) || 
          dest.location.toLowerCase().includes(query) ||
          dest.tags.some(tag => tag.toLowerCase().includes(query))
      );
      setFilteredDestinations(filtered);
    }
  }, [searchQuery, destinations]);
  
  const updateRecommendations = () => {
    const recommendedDestinations = AIRecommendationService.getRecommendations(
      preferences,
      previousSelections
    );
    setDestinations(recommendedDestinations);
    setFilteredDestinations(recommendedDestinations);
  };
  
  const handleDestinationSelect = (destination: Destination) => {
    setSelectedDestination(destination);
    
    // Add to previous selections (learning component)
    if (!previousSelections.includes(destination.id)) {
      setPreviousSelections([...previousSelections, destination.id]);
    }
    
    // Show a success message
    toast({
      title: "Destination Selected",
      description: `${destination.name}, ${destination.location} has been selected.`,
      duration: 3000,
    });
  };
  
  const handleViewItinerary = () => {
    if (selectedDestination) {
      navigate(`/itineraries?destination=${selectedDestination.id}`);
    }
  };
  
  const handleFavoriteToggle = (id: string) => {
    const updatedDestinations = destinations.map(dest => 
      dest.id === id 
        ? { ...dest, isFavorite: !dest.isFavorite } 
        : dest
    );
    setDestinations(updatedDestinations);
    setFilteredDestinations(
      filteredDestinations.map(dest => 
        dest.id === id 
          ? { ...dest, isFavorite: !dest.isFavorite } 
          : dest
      )
    );
    
    toast({
      title: updatedDestinations.find(d => d.id === id)?.isFavorite 
        ? "Added to Favorites" 
        : "Removed from Favorites",
      duration: 2000,
    });
  };
  
  const handlePreferenceToggle = (id: string) => {
    setPreferences(
      preferences.map(pref => 
        pref.id === id 
          ? { ...pref, selected: !pref.selected } 
          : pref
      )
    );
  };
  
  const handleImportanceChange = (id: string, value: number) => {
    setPreferences(
      preferences.map(pref => 
        pref.id === id 
          ? { ...pref, importance: value } 
          : pref
      )
    );
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <motion.main 
        className="flex-1 pt-24 pb-16 px-6"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={fadeIn}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <h1 className="text-3xl font-semibold">Discover Destinations</h1>
              <p className="text-muted-foreground mt-2">
                Explore destinations tailored to your preferences
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search destinations..."
                  className="pl-9 w-full sm:w-[260px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Preferences
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-full sm:max-w-lg">
                  <SheetHeader>
                    <SheetTitle>Travel Preferences</SheetTitle>
                    <SheetDescription>
                      Customize your preferences to get tailored destination recommendations.
                    </SheetDescription>
                  </SheetHeader>
                  
                  <div className="mt-6">
                    <PreferenceSelector
                      preferences={preferences}
                      onPreferenceToggle={handlePreferenceToggle}
                      onImportanceChange={handleImportanceChange}
                    />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            <div className="lg:col-span-2 xl:col-span-3">
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center">
                  <Sparkles className="h-4 w-4 text-primary mr-2" />
                  <span className="text-sm font-medium text-primary">AI-Recommended</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  Showing {filteredDestinations.length} destinations
                </span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredDestinations.map((destination) => (
                  <DestinationCard
                    key={destination.id}
                    destination={destination}
                    onFavorite={handleFavoriteToggle}
                    onSelect={handleDestinationSelect}
                  />
                ))}
                
                {filteredDestinations.length === 0 && (
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
                      onClick={handleViewItinerary}
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
          </div>
        </div>
      </motion.main>
    </div>
  );
};

export default Discover;
