
export interface ItineraryActivity {
  id: string;
  time: string;
  title: string;
  description: string;
  location: string;
  duration: string;
  isCustom?: boolean;
  category?: string; // Added category for better preference matching
  rating?: number;   // Added rating for better recommendations
}

export interface ItineraryDay {
  id: string;
  dayNumber: number;
  activities: ItineraryActivity[];
}

export interface Destination {
  id: string;
  name: string;
  location: string;
  description: string;
  image: string;
  tags: string[];
  duration: string;
  rating?: number;     // Added rating for destinations
  popularity?: number; // Added popularity metric
  bestTimeToVisit?: string[]; // Added seasonal recommendation
  isFavorite?: boolean;
  score?: number;      // Internal score for recommendation algorithm
}

// New interface for user feedback
export interface UserFeedback {
  destinationId: string;
  rating: number;
  timestamp: Date;
  activityIds?: string[]; // Activities the user liked
}

// New interface for travel history
export interface TravelHistory {
  destinationId: string;
  visitDate: Date;
  duration: number; // Days
  feedback?: UserFeedback;
}

// Enhanced preference weighting interface
export interface PreferenceWeight {
  preferenceId: string;
  weight: number; // 0-1 value
  context?: string; // e.g., "summer", "winter", "family", "solo"
}
