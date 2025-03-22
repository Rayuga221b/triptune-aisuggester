
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, ChevronRight, Heart, Calendar, Info, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { toast } from "sonner";
import Navbar from '@/components/Navbar';
import PreferenceSelector, { defaultPreferences, Preference } from '@/components/PreferenceSelector';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
};

const Preferences = () => {
  const [preferences, setPreferences] = useState<Preference[]>(defaultPreferences);
  const [profileProgress, setProfileProgress] = useState(20);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Calculate profile completion based on preference selections
    const selectedCount = preferences.filter(p => p.selected).length;
    const withImportanceCount = preferences.filter(p => p.selected && p.importance !== undefined).length;
    
    // Simple calculation: base 20% for having an account + up to 80% based on preferences
    const progressPercentage = 
      20 + // Base percentage
      (selectedCount > 0 ? 40 : 0) + // Having any preferences selected
      (withImportanceCount > 0 ? Math.min(40, (withImportanceCount / selectedCount) * 40) : 0); // Setting importance
    
    setProfileProgress(Math.round(progressPercentage));
  }, [preferences]);
  
  // Handler to toggle preference selection
  const handlePreferenceToggle = (id: string) => {
    setPreferences(
      preferences.map(pref => 
        pref.id === id 
          ? { ...pref, selected: !pref.selected } 
          : pref
      )
    );
  };
  
  // Handler to change preference importance
  const handleImportanceChange = (id: string, value: number) => {
    setPreferences(
      preferences.map(pref => 
        pref.id === id 
          ? { ...pref, importance: value } 
          : pref
      )
    );
  };
  
  // Handler to save preferences
  const handleSavePreferences = () => {
    localStorage.setItem('userPreferences', JSON.stringify(preferences));
    toast.success("Your preferences have been saved!");
  };
  
  // Handler to continue to recommendations
  const handleContinue = () => {
    handleSavePreferences();
    navigate('/discover');
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
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-semibold">Your Travel Preferences</h1>
            <p className="text-muted-foreground mt-2">
              Tell us what you love, and we'll create the perfect travel recommendations
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3 space-y-10">
              <div className="glass rounded-xl p-6 shadow-subtle">
                <h2 className="text-xl font-semibold mb-5">What do you enjoy most when traveling?</h2>
                
                <PreferenceSelector
                  preferences={preferences}
                  onPreferenceToggle={handlePreferenceToggle}
                  onImportanceChange={handleImportanceChange}
                />
                
                <div className="mt-8 flex justify-end">
                  <Button 
                    size="lg"
                    onClick={handleContinue}
                  >
                    Continue to Recommendations
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Tips for better recommendations</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-5 rounded-xl bg-card shadow-subtle">
                    <div className="flex items-start">
                      <div className="bg-primary/10 text-primary rounded-full p-2 mr-4">
                        <Heart className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-2">Select Multiple Interests</h3>
                        <p className="text-sm text-muted-foreground">
                          Choose at least 3-5 interests to help our AI understand your preferences better.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-5 rounded-xl bg-card shadow-subtle">
                    <div className="flex items-start">
                      <div className="bg-primary/10 text-primary rounded-full p-2 mr-4">
                        <Calendar className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-2">Set Importance Levels</h3>
                        <p className="text-sm text-muted-foreground">
                          Adjust the sliders to indicate how important each preference is to you.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <div className="sticky top-28 glass rounded-xl p-6 shadow-subtle space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium">Profile Completion</h3>
                    <span className="text-sm font-medium">{profileProgress}%</span>
                  </div>
                  <Progress value={profileProgress} className="h-2" />
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="font-medium">Your Preferences</h3>
                  
                  {preferences.filter(p => p.selected).length > 0 ? (
                    <div className="space-y-2">
                      {preferences.filter(p => p.selected).map((pref) => (
                        <div key={pref.id} className="flex items-center text-sm">
                          <Check className="h-4 w-4 text-primary mr-2" />
                          <span>{pref.name}</span>
                          
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <button className="ml-1.5 text-muted-foreground">
                                  <Info className="h-3.5 w-3.5" />
                                </button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>
                                  Importance: {
                                    pref.importance 
                                      ? pref.importance <= 33 
                                        ? 'Low' 
                                        : pref.importance <= 66 
                                          ? 'Medium' 
                                          : 'High' 
                                      : 'Not set'
                                  }
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-sm text-muted-foreground flex items-center">
                      <HelpCircle className="h-4 w-4 mr-2" />
                      No preferences selected yet
                    </div>
                  )}
                </div>
                
                <Separator />
                
                <Button 
                  onClick={handleSavePreferences}
                  className="w-full"
                >
                  Save Preferences
                </Button>
              </div>
            </div>
          </div>
        </div>
      </motion.main>
    </div>
  );
};

export default Preferences;
