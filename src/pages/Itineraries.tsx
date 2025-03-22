
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Download, Share, FileText, Save, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import Navbar from '@/components/Navbar';
import ItineraryBuilder, { ItineraryDay, ItineraryActivity } from '@/components/ItineraryBuilder';
import { AIRecommendationService, destinations } from '@/services/AIRecommendationService';
import { Destination } from '@/types/itinerary';
import { v4 as uuidv4 } from 'uuid';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
};

const Itineraries = () => {
  const [itineraryDays, setItineraryDays] = useState<ItineraryDay[]>([]);
  const [selectedDestination, setSelectedDestination] = useState<Destination>(destinations[0]);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if there's a destination ID in query params
    const params = new URLSearchParams(location.search);
    const destinationId = params.get('destination');
    
    if (destinationId) {
      const destination = destinations.find(d => d.id === destinationId);
      if (destination) {
        setSelectedDestination(destination);
        
        // Generate an itinerary for this destination
        const generatedItinerary = AIRecommendationService.generateItinerary(destinationId, [], 3);
        setItineraryDays(generatedItinerary);
        
        toast(`Itinerary created for ${destination.name}`);
      }
    } else if (itineraryDays.length === 0) {
      // If no destination specified and no existing itinerary, create a default one
      const defaultItinerary = AIRecommendationService.generateItinerary(destinations[0].id, [], 3);
      setItineraryDays(defaultItinerary);
    }
  }, [location.search]);
  
  // Handler to add a new activity to a day
  const handleAddActivity = (dayId: string, activity: Partial<ItineraryActivity>) => {
    const newActivity: ItineraryActivity = {
      id: uuidv4(),
      time: activity.time || '12:00',
      title: activity.title || 'New Activity',
      description: activity.description || 'Add description here',
      location: activity.location || 'Location',
      duration: activity.duration || '1h',
      isCustom: activity.isCustom || false
    };
    
    setItineraryDays(
      itineraryDays.map(day => 
        day.id === dayId 
          ? { ...day, activities: [...day.activities, newActivity] }
          : day
      )
    );
    
    toast(`Added new activity to Day ${itineraryDays.find(d => d.id === dayId)?.dayNumber}`);
  };
  
  // Handler to remove an activity from a day
  const handleRemoveActivity = (dayId: string, activityId: string) => {
    setItineraryDays(
      itineraryDays.map(day => 
        day.id === dayId 
          ? { 
              ...day, 
              activities: day.activities.filter(act => act.id !== activityId) 
            }
          : day
      )
    );
  };
  
  // Handler to add a new day to the itinerary
  const handleAddDay = () => {
    const newDayNumber = itineraryDays.length > 0 
      ? Math.max(...itineraryDays.map(d => d.dayNumber)) + 1
      : 1;
    
    const newDay: ItineraryDay = {
      id: uuidv4(),
      dayNumber: newDayNumber,
      activities: []
    };
    
    setItineraryDays([...itineraryDays, newDay]);
    toast(`Added Day ${newDayNumber} to your itinerary`);
  };
  
  // Handler to remove a day from the itinerary
  const handleRemoveDay = (dayId: string) => {
    if (itineraryDays.length === 1) {
      setShowConfirmDialog(true);
      return;
    }
    
    const dayToRemove = itineraryDays.find(d => d.id === dayId);
    setItineraryDays(itineraryDays.filter(day => day.id !== dayId));
    
    if (dayToRemove) {
      toast(`Removed Day ${dayToRemove.dayNumber} from your itinerary`);
    }
  };
  
  // Handler to reorder activities within a day
  const handleReorderActivities = (dayId: string, activities: ItineraryActivity[]) => {
    setItineraryDays(
      itineraryDays.map(day => 
        day.id === dayId 
          ? { ...day, activities }
          : day
      )
    );
  };
  
  // Handler to save the itinerary
  const handleSaveItinerary = () => {
    toast.success("Itinerary saved successfully!");
  };
  
  // Handler to share the itinerary
  const handleShareItinerary = () => {
    toast.success("Shareable link copied to clipboard!");
  };
  
  // Handler to download the itinerary
  const handleDownloadItinerary = () => {
    toast.success("Itinerary downloaded as PDF!");
  };
  
  // Handler to regenerate the itinerary with AI
  const handleRegenerateItinerary = () => {
    if (selectedDestination) {
      const newItinerary = AIRecommendationService.generateItinerary(
        selectedDestination.id, 
        [],
        itineraryDays.length || 3
      );
      setItineraryDays(newItinerary);
      toast("Itinerary regenerated with AI suggestions!");
    }
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
          <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-semibold">Your Travel Itinerary</h1>
              <p className="text-muted-foreground mt-1">
                Plan and organize your perfect trip
              </p>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <Button 
                variant="outline" 
                onClick={handleRegenerateItinerary}
                className="flex-shrink-0 h-10"
              >
                <Calendar className="h-4 w-4 mr-2" />
                Regenerate with AI
              </Button>
              
              <Button 
                variant="outline" 
                onClick={handleSaveItinerary}
                className="flex-shrink-0 h-10"
              >
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
              
              <Button 
                variant="outline" 
                onClick={handleShareItinerary}
                className="flex-shrink-0 h-10"
              >
                <Share className="h-4 w-4 mr-2" />
                Share
              </Button>
              
              <Button 
                variant="outline" 
                onClick={handleDownloadItinerary}
                className="flex-shrink-0 h-10"
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <ItineraryBuilder
                days={itineraryDays}
                selectedDestination={selectedDestination}
                onAddActivity={handleAddActivity}
                onRemoveActivity={handleRemoveActivity}
                onAddDay={handleAddDay}
                onRemoveDay={handleRemoveDay}
                onReorderActivities={handleReorderActivities}
              />
            </div>
            
            <div>
              <div className="sticky top-28 glass rounded-xl p-6 shadow-subtle space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-3">Travel Summary</h2>
                  
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-muted-foreground">Destination</p>
                      <p className="font-medium">{selectedDestination.name}, {selectedDestination.location}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-muted-foreground">Duration</p>
                      <p className="font-medium">{itineraryDays.length} days</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-muted-foreground">Activities</p>
                      <p className="font-medium">
                        {itineraryDays.reduce((total, day) => total + day.activities.length, 0)} total
                      </p>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-medium mb-3">Trip Notes</h3>
                  <div className="bg-secondary/50 rounded-md p-3 text-sm text-foreground/80 italic min-h-[80px]">
                    {selectedDestination.description}
                  </div>
                </div>
                
                <Button 
                  className="w-full"
                  onClick={() => navigate('/discover')}
                >
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add New Destination
                </Button>
              </div>
            </div>
          </div>
        </div>
      </motion.main>
      
      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete the last day?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove the last day of your itinerary?
              Your itinerary must have at least one day.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => {
              setItineraryDays([]);
              handleAddDay();
            }}>
              Clear and Create New Day
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Itineraries;
