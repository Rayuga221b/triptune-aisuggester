import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useToast } from "@/components/ui/use-toast";
import { toast } from "sonner";
import Navbar from '@/components/Navbar';
import { defaultPreferences } from '@/components/PreferenceSelector';
import { AIRecommendationService } from '@/services/AIRecommendationService';
import { Destination } from '@/types/itinerary';
import SearchAndFilterBar from '@/components/discover/SearchAndFilterBar';
import DestinationList from '@/components/discover/DestinationList';
import DestinationDetail from '@/components/discover/DestinationDetail';

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
  const { toast: uiToast } = useToast();
  
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
  
  useEffect(() => {
    updateRecommendations();
  }, [preferences, previousSelections]);
  
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
    uiToast({
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
            
            <SearchAndFilterBar 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              preferences={preferences}
              onPreferenceToggle={handlePreferenceToggle}
              onImportanceChange={handleImportanceChange}
            />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            <DestinationList 
              destinations={filteredDestinations}
              onFavoriteToggle={handleFavoriteToggle}
              onDestinationSelect={handleDestinationSelect}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
            
            <DestinationDetail 
              selectedDestination={selectedDestination}
              onViewItinerary={handleViewItinerary}
            />
          </div>
        </div>
      </motion.main>
    </div>
  );
};

export default Discover;
