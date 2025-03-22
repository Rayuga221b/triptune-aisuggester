
import { Preference } from "@/components/PreferenceSelector";
import { 
  Destination, 
  ItineraryDay, 
  ItineraryActivity,
  UserFeedback,
  TravelHistory,
  PreferenceWeight
} from "@/types/itinerary";
import { v4 as uuidv4 } from 'uuid';

// Enhanced sample destination data with additional fields
export const destinations: Destination[] = [
  {
    id: '1',
    name: 'Kyoto',
    location: 'Japan',
    description: 'Ancient temples, traditional geisha districts, and serene bamboo forests make Kyoto a cultural treasure.',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1000&auto=format&fit=crop',
    duration: '5-7 days',
    rating: 4.8,
    popularity: 0.85,
    bestTimeToVisit: ['March', 'April', 'October', 'November'],
    tags: ['Culture', 'History', 'Temples', 'Gardens', 'Traditional']
  },
  {
    id: '2',
    name: 'Barcelona',
    location: 'Spain',
    description: 'A vibrant city known for stunning architecture, beautiful beaches, and a world-class dining scene.',
    image: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?q=80&w=1000&auto=format&fit=crop',
    duration: '4-6 days',
    rating: 4.7,
    popularity: 0.9,
    bestTimeToVisit: ['May', 'June', 'September', 'October'],
    tags: ['Architecture', 'Beach', 'Food', 'Nightlife', 'Art']
  },
  {
    id: '3',
    name: 'Santorini',
    location: 'Greece',
    description: 'Famous for its dramatic views, stunning sunsets, white-washed houses, and blue-domed churches.',
    image: 'https://images.unsplash.com/photo-1571406384450-b2fork0b2d1f?q=80&w=1000&auto=format&fit=crop',
    duration: '3-5 days',
    rating: 4.9,
    popularity: 0.8,
    bestTimeToVisit: ['April', 'May', 'June', 'September', 'October'],
    tags: ['Scenic', 'Beach', 'Romantic', 'Architecture', 'Islands']
  },
  {
    id: '4',
    name: 'New York City',
    location: 'USA',
    description: 'The ultimate urban adventure with iconic skyscrapers, world-class museums, and diverse neighborhoods.',
    image: 'https://images.unsplash.com/photo-1496588152823-86ff7695a68j?q=80&w=1000&auto=format&fit=crop',
    duration: '5-8 days',
    rating: 4.6,
    popularity: 0.95,
    bestTimeToVisit: ['April', 'May', 'September', 'October', 'December'],
    tags: ['Urban', 'Culture', 'Shopping', 'Museums', 'Food']
  },
  {
    id: '5',
    name: 'Bali',
    location: 'Indonesia',
    description: 'A paradise island offering incredible beaches, lush rice terraces, and spiritual experiences.',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1000&auto=format&fit=crop',
    duration: '7-10 days',
    rating: 4.5,
    popularity: 0.85,
    bestTimeToVisit: ['April', 'May', 'June', 'September'],
    tags: ['Beach', 'Adventure', 'Nature', 'Spiritual', 'Culture']
  },
  {
    id: '6',
    name: 'Rome',
    location: 'Italy',
    description: 'The Eternal City combines ancient ruins, awe-inspiring art, and vibrant street life with modern culture.',
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=1000&auto=format&fit=crop',
    duration: '4-6 days',
    rating: 4.7,
    popularity: 0.9,
    bestTimeToVisit: ['April', 'May', 'September', 'October'],
    tags: ['History', 'Food', 'Art', 'Architecture', 'Ancient']
  },
  {
    id: '7',
    name: 'Marrakech',
    location: 'Morocco',
    description: 'A magical place filled with markets, gardens, palaces, and mosques in vibrant North Africa.',
    image: 'https://images.unsplash.com/photo-1535530992830-e25d07cfa780?q=80&w=1000&auto=format&fit=crop',
    duration: '3-5 days',
    rating: 4.4,
    popularity: 0.7,
    bestTimeToVisit: ['March', 'April', 'October', 'November'],
    tags: ['Culture', 'Shopping', 'Architecture', 'Markets', 'Food']
  },
  {
    id: '8',
    name: 'Swiss Alps',
    location: 'Switzerland',
    description: 'Spectacular mountain scenery with world-class skiing, hiking, and charming alpine villages.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1000&auto=format&fit=crop',
    duration: '5-7 days',
    rating: 4.8,
    popularity: 0.75,
    bestTimeToVisit: ['December', 'January', 'February', 'July', 'August'],
    tags: ['Nature', 'Adventure', 'Scenic', 'Mountains', 'Winter']
  }
];

// Expanded activities with categories and ratings
const sampleActivities: Record<string, ItineraryActivity[]> = {
  '1': [ // Kyoto
    {
      id: uuidv4(),
      time: '09:00',
      title: 'Fushimi Inari Shrine',
      description: 'Walk through thousands of vermilion torii gates leading into the wooded forest of the sacred Mount Inari.',
      location: 'Fushimi Ward, Kyoto',
      duration: '2h',
      category: 'Cultural',
      rating: 4.9
    },
    {
      id: uuidv4(),
      time: '12:00',
      title: 'Lunch at Nishiki Market',
      description: 'Sample local street food and delicacies at Kyoto\'s famous food market.',
      location: 'Central Kyoto',
      duration: '1h 30m',
      category: 'Food',
      rating: 4.7
    },
    {
      id: uuidv4(),
      time: '14:30',
      title: 'Arashiyama Bamboo Grove',
      description: 'Experience the surreal landscape of towering bamboo stalks swaying in the wind.',
      location: 'Arashiyama District',
      duration: '1h',
      category: 'Nature',
      rating: 4.8
    },
    {
      id: uuidv4(),
      time: '16:30',
      title: 'Tea Ceremony',
      description: 'Participate in a traditional Japanese tea ceremony with a local master.',
      location: 'Gion District',
      duration: '1h 30m',
      category: 'Cultural',
      rating: 4.6
    },
    {
      id: uuidv4(),
      time: '19:00',
      title: 'Gion District Evening Stroll',
      description: 'Walk through the historic geisha district and possibly spot geiko and maiko.',
      location: 'Gion District',
      duration: '2h',
      category: 'Cultural',
      rating: 4.7
    },
    {
      id: uuidv4(),
      time: '09:30',
      title: 'Kinkaku-ji (Golden Pavilion)',
      description: 'Visit the famous Zen Buddhist temple covered in gold leaf.',
      location: 'Northern Kyoto',
      duration: '1h 30m',
      category: 'Cultural',
      rating: 4.9
    },
    {
      id: uuidv4(),
      time: '13:00',
      title: 'Kyoto Imperial Palace',
      description: 'Explore the former residence of Japan\'s Imperial Family.',
      location: 'Central Kyoto',
      duration: '2h',
      category: 'Historical',
      rating: 4.5
    },
  ],
  '2': [ // Barcelona
    {
      id: uuidv4(),
      time: '09:30',
      title: 'Sagrada Familia',
      description: 'Marvel at Gaudí\'s masterpiece, the unfinished Sagrada Familia basilica.',
      location: 'Eixample District',
      duration: '2h',
      category: 'Architecture',
      rating: 4.9
    },
    {
      id: uuidv4(),
      time: '12:00',
      title: 'Lunch at La Boqueria Market',
      description: 'Enjoy fresh tapas and local specialties at this famous market.',
      location: 'Las Ramblas',
      duration: '1h 30m',
      category: 'Food',
      rating: 4.7
    },
    {
      id: uuidv4(),
      time: '14:30',
      title: 'Park Güell',
      description: 'Explore this colorful park with amazing views, designed by Antoni Gaudí.',
      location: 'Carmel Hill',
      duration: '2h',
      category: 'Art',
      rating: 4.8
    },
    {
      id: uuidv4(),
      time: '17:30',
      title: 'Beach Time at Barceloneta',
      description: 'Relax at Barcelona\'s most popular urban beach.',
      location: 'Barceloneta',
      duration: '2h',
      category: 'Beach',
      rating: 4.5
    },
    {
      id: uuidv4(),
      time: '20:00',
      title: 'Tapas Tour in El Born',
      description: 'Go bar hopping trying various tapas in this trendy neighborhood.',
      location: 'El Born',
      duration: '3h',
      category: 'Food',
      rating: 4.8
    },
    {
      id: uuidv4(),
      time: '10:00',
      title: 'Gothic Quarter Walking Tour',
      description: 'Explore medieval streets and historic buildings in Barcelona\'s oldest neighborhood.',
      location: 'Gothic Quarter',
      duration: '2h',
      category: 'Historical',
      rating: 4.6
    },
  ],
  // Add more destinations with activities
};

// Enhanced preference weights for destinations
const destinationPreferenceWeights: Record<string, Record<string, number>> = {
  '1': { // Kyoto
    '1': 0.9, // Art & Culture
    '2': 0.7, // Food & Dining
    '3': 0.5, // Nature & Outdoors
    '4': 0.8, // Architecture
    '5': 0.3, // Adventure
    '6': 0.2, // Beach & Water
    '7': 0.4, // Nightlife
    '8': 0.8, // Local Experience
    '9': 0.6, // Shopping
    '10': 0.5, // Wine & Drinks
  },
  '2': { // Barcelona
    '1': 0.7, // Art & Culture
    '2': 0.9, // Food & Dining
    '3': 0.4, // Nature & Outdoors
    '4': 0.9, // Architecture
    '5': 0.5, // Adventure
    '6': 0.8, // Beach & Water
    '7': 0.8, // Nightlife
    '8': 0.7, // Local Experience
    '9': 0.8, // Shopping
    '10': 0.7, // Wine & Drinks
  },
  '3': { // Santorini
    '1': 0.6, // Art & Culture
    '2': 0.7, // Food & Dining
    '3': 0.5, // Nature & Outdoors
    '4': 0.7, // Architecture
    '5': 0.4, // Adventure
    '6': 0.9, // Beach & Water
    '7': 0.6, // Nightlife
    '8': 0.8, // Local Experience
    '9': 0.5, // Shopping
    '10': 0.7, // Wine & Drinks
  },
  '4': { // New York City
    '1': 0.9, // Art & Culture
    '2': 0.9, // Food & Dining
    '3': 0.3, // Nature & Outdoors
    '4': 0.8, // Architecture
    '5': 0.5, // Adventure
    '6': 0.3, // Beach & Water
    '7': 0.9, // Nightlife
    '8': 0.7, // Local Experience
    '9': 0.9, // Shopping
    '10': 0.8, // Wine & Drinks
  },
  '5': { // Bali
    '1': 0.6, // Art & Culture
    '2': 0.7, // Food & Dining
    '3': 0.9, // Nature & Outdoors
    '4': 0.5, // Architecture
    '5': 0.8, // Adventure
    '6': 0.9, // Beach & Water
    '7': 0.6, // Nightlife
    '8': 0.8, // Local Experience
    '9': 0.7, // Shopping
    '10': 0.5, // Wine & Drinks
  },
  '6': { // Rome
    '1': 0.9, // Art & Culture
    '2': 0.9, // Food & Dining
    '3': 0.4, // Nature & Outdoors
    '4': 0.9, // Architecture
    '5': 0.3, // Adventure
    '6': 0.2, // Beach & Water
    '7': 0.7, // Nightlife
    '8': 0.8, // Local Experience
    '9': 0.7, // Shopping
    '10': 0.9, // Wine & Drinks
  },
  '7': { // Marrakech
    '1': 0.8, // Art & Culture
    '2': 0.7, // Food & Dining
    '3': 0.5, // Nature & Outdoors
    '4': 0.7, // Architecture
    '5': 0.6, // Adventure
    '6': 0.1, // Beach & Water
    '7': 0.6, // Nightlife
    '8': 0.9, // Local Experience
    '9': 0.9, // Shopping
    '10': 0.4, // Wine & Drinks
  },
  '8': { // Swiss Alps
    '1': 0.4, // Art & Culture
    '2': 0.6, // Food & Dining
    '3': 0.9, // Nature & Outdoors
    '4': 0.5, // Architecture
    '5': 0.9, // Adventure
    '6': 0.3, // Beach & Water
    '7': 0.3, // Nightlife
    '8': 0.7, // Local Experience
    '9': 0.4, // Shopping
    '10': 0.6, // Wine & Drinks
  },
};

// Activity preference weights - matching activities to user preferences
const activityPreferenceWeights: Record<string, Record<string, number>> = {
  'Cultural': {
    '1': 0.9, // Art & Culture
    '8': 0.8, // Local Experience
  },
  'Food': {
    '2': 0.9, // Food & Dining
    '8': 0.7, // Local Experience
    '10': 0.6, // Wine & Drinks
  },
  'Nature': {
    '3': 0.9, // Nature & Outdoors
    '5': 0.6, // Adventure
  },
  'Architecture': {
    '1': 0.7, // Art & Culture
    '4': 0.9, // Architecture
  },
  'Historical': {
    '1': 0.8, // Art & Culture
    '4': 0.6, // Architecture
  },
  'Beach': {
    '6': 0.9, // Beach & Water
    '3': 0.5, // Nature & Outdoors
  },
  'Art': {
    '1': 0.9, // Art & Culture
    '9': 0.5, // Shopping
  },
};

// Seasonal weights for destinations
const seasonalDestinationWeights: Record<string, Record<string, number>> = {
  'Spring': {
    '1': 0.9, // Kyoto (cherry blossoms)
    '3': 0.8, // Santorini
    '4': 0.7, // New York
    '7': 0.8, // Marrakech
  },
  'Summer': {
    '2': 0.7, // Barcelona (hot but beach season)
    '3': 0.6, // Santorini (very crowded)
    '8': 0.9, // Swiss Alps (hiking)
    '5': 0.6, // Bali (dry season)
  },
  'Fall': {
    '1': 0.9, // Kyoto (autumn colors)
    '2': 0.8, // Barcelona
    '6': 0.9, // Rome
    '7': 0.8, // Marrakech
  },
  'Winter': {
    '8': 0.9, // Swiss Alps (skiing)
    '4': 0.7, // New York (Christmas)
    '5': 0.5, // Bali (rainy season)
  }
};

export class AIRecommendationService {
  // Get current season based on northern hemisphere
  private static getCurrentSeason(): string {
    const month = new Date().getMonth();
    if (month >= 2 && month <= 4) return 'Spring';
    if (month >= 5 && month <= 7) return 'Summer';
    if (month >= 8 && month <= 10) return 'Fall';
    return 'Winter';
  }
  
  // Apply seasonal boosting to recommendations
  private static applySeasonalBoosting(destinations: Destination[]): Destination[] {
    const currentSeason = this.getCurrentSeason();
    const seasonalWeights = seasonalDestinationWeights[currentSeason] || {};
    
    return destinations.map(destination => {
      const seasonalBoost = seasonalWeights[destination.id] || 0.5;
      return {
        ...destination,
        score: (destination.score || 0) * seasonalBoost
      };
    });
  }
  
  // Get feedback weighted destinations
  private static getWeightedDestinations(
    userPreferences: Preference[], 
    userFeedback: UserFeedback[] = [],
    previousSelections: string[] = []
  ): Destination[] {
    // Filter active preferences and get their IDs and importance
    const activePrefs = userPreferences
      .filter(p => p.selected)
      .map(p => ({ id: p.id, importance: p.importance || 50 }));
    
    if (activePrefs.length === 0) {
      // No preferences selected, return default ordering with seasonal boosting
      return this.applySeasonalBoosting([...destinations].sort((a, b) => b.rating - a.rating));
    }
    
    // Score each destination based on user preferences and feedback
    const scoredDestinations = destinations.map(destination => {
      const weights = destinationPreferenceWeights[destination.id] || {};
      
      // Calculate base score using preference importance and weights
      let score = activePrefs.reduce((total, pref) => {
        const weight = weights[pref.id] || 0.3; // Default weight if not defined
        const importance = pref.importance / 100; // Convert to 0-1 scale
        return total + (weight * importance);
      }, 0);
      
      // Apply feedback boost if available
      const destinationFeedback = userFeedback.find(f => f.destinationId === destination.id);
      if (destinationFeedback) {
        // Boost score based on previous user rating (1-5 scale)
        const feedbackBoost = destinationFeedback.rating / 5;
        score *= (1 + (feedbackBoost * 0.5)); // Up to 50% boost for 5-star ratings
      }
      
      // Boost the score if it was previously selected (simulating learning)
      if (previousSelections.includes(destination.id)) {
        score *= 1.2;
      }
      
      // Apply popularity factor (more popular = higher base score)
      if (destination.popularity) {
        score *= (0.5 + (destination.popularity * 0.5)); // Max 50% boost based on popularity
      }
      
      return { ...destination, score };
    });
    
    // Apply seasonal boosting
    const seasonallyBoostedDestinations = this.applySeasonalBoosting(scoredDestinations);
    
    // Return sorted destinations by score
    return seasonallyBoostedDestinations.sort((a, b) => {
      const scoreA = a.score || 0;
      const scoreB = b.score || 0;
      return scoreB - scoreA;
    });
  }
  
  // Get personalized destination recommendations
  static getRecommendations(
    userPreferences: Preference[], 
    previousSelections: string[] = [],
    userFeedback: UserFeedback[] = []
  ): Destination[] {
    return this.getWeightedDestinations(userPreferences, userFeedback, previousSelections);
  }
  
  // Match activities to user preferences
  private static matchActivitiesToPreferences(
    activities: ItineraryActivity[],
    userPreferences: Preference[]
  ): ItineraryActivity[] {
    // No preferences, return activities sorted by rating
    if (!userPreferences.some(p => p.selected)) {
      return [...activities].sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }
    
    // Get active preferences
    const activePrefs = userPreferences
      .filter(p => p.selected)
      .map(p => ({ id: p.id, importance: p.importance || 50 }));
    
    // Score activities based on preferences
    return activities.map(activity => {
      let score = 0;
      
      if (activity.category) {
        const categoryWeights = activityPreferenceWeights[activity.category] || {};
        
        // Calculate score based on preference weights for this category
        score = activePrefs.reduce((total, pref) => {
          const weight = categoryWeights[pref.id] || 0.1;
          const importance = pref.importance / 100;
          return total + (weight * importance);
        }, 0);
      }
      
      // Also factor in the activity rating
      if (activity.rating) {
        score *= (activity.rating / 5);
      }
      
      return { ...activity, score };
    })
    .sort((a, b) => (b.score || 0) - (a.score || 0));
  }
  
  // Generate time-aware itinerary (morning, afternoon, evening activities)
  private static generateTimeAwareActivities(
    activities: ItineraryActivity[],
    dayNumber: number
  ): ItineraryActivity[] {
    // Make a copy of activities to work with
    const availableActivities = [...activities];
    const dailyActivities: ItineraryActivity[] = [];
    
    // Get highest scoring activities for each time period
    const getMorningActivity = () => {
      const index = dayNumber % availableActivities.length;
      const activity = availableActivities[index];
      availableActivities.splice(index, 1);
      return {
        ...activity,
        id: uuidv4(),
        time: '09:00'
      };
    };
    
    const getLunchActivity = () => {
      const lunchActivities = availableActivities.filter(a => a.category === 'Food');
      if (lunchActivities.length > 0) {
        const index = dayNumber % lunchActivities.length;
        const activity = lunchActivities[index];
        const activityIndex = availableActivities.findIndex(a => a.id === activity.id);
        availableActivities.splice(activityIndex, 1);
        return {
          ...activity,
          id: uuidv4(),
          time: '12:30'
        };
      }
      
      // Fallback
      const index = (dayNumber + 1) % availableActivities.length;
      const activity = availableActivities[index];
      availableActivities.splice(index, 1);
      return {
        ...activity,
        id: uuidv4(),
        time: '12:30',
        title: `Lunch in ${activity.location}`,
        description: 'Enjoy local cuisine for lunch.',
        category: 'Food',
        duration: '1h 30m'
      };
    };
    
    const getAfternoonActivity = () => {
      const index = (dayNumber + 2) % availableActivities.length;
      const activity = availableActivities[index];
      availableActivities.splice(index, 1);
      return {
        ...activity,
        id: uuidv4(),
        time: '14:30'
      };
    };
    
    const getEveningActivity = () => {
      // Prefer evening/nightlife activities
      const eveningActivities = availableActivities.filter(
        a => a.category === 'Nightlife' || a.title.toLowerCase().includes('evening')
      );
      
      if (eveningActivities.length > 0) {
        const index = dayNumber % eveningActivities.length;
        const activity = eveningActivities[index];
        const activityIndex = availableActivities.findIndex(a => a.id === activity.id);
        availableActivities.splice(activityIndex, 1);
        return {
          ...activity,
          id: uuidv4(),
          time: '19:00'
        };
      }
      
      // Fallback
      if (availableActivities.length > 0) {
        const index = (dayNumber + 3) % availableActivities.length;
        const activity = availableActivities[index < availableActivities.length ? index : 0];
        
        // Only remove if we still have activities left
        if (availableActivities.length > 1) {
          const activityIndex = availableActivities.findIndex(a => a.id === activity.id);
          availableActivities.splice(activityIndex, 1);
        }
        
        return {
          ...activity,
          id: uuidv4(),
          time: '19:00',
          title: `Evening in ${activity.location}`,
          description: 'Enjoy dinner and local atmosphere.',
          duration: '2h'
        };
      }
    };
    
    // Add activities for different times of day
    if (activities.length > 0) {
      dailyActivities.push(getMorningActivity());
      dailyActivities.push(getLunchActivity());
      dailyActivities.push(getAfternoonActivity());
      
      // Evening activity is optional
      const eveningActivity = getEveningActivity();
      if (eveningActivity) {
        dailyActivities.push(eveningActivity);
      }
    } else {
      // Generic activities if none are available
      dailyActivities.push(
        {
          id: uuidv4(),
          time: '09:00',
          title: `Morning exploration - Day ${dayNumber}`,
          description: 'Explore the main attractions and landmarks.',
          location: 'City center',
          duration: '3h',
          category: 'Sightseeing'
        },
        {
          id: uuidv4(),
          time: '12:30',
          title: 'Local lunch experience',
          description: 'Try authentic local cuisine at a recommended restaurant.',
          location: 'City center',
          duration: '1h 30m',
          category: 'Food'
        },
        {
          id: uuidv4(),
          time: '14:30',
          title: 'Cultural activity',
          description: 'Visit a museum, gallery, or historical site.',
          location: 'Various locations',
          duration: '2h',
          category: 'Cultural'
        },
        {
          id: uuidv4(),
          time: '19:00',
          title: 'Evening relaxation',
          description: 'Enjoy scenic views and local atmosphere.',
          location: 'Various locations',
          duration: '2h',
          category: 'Nightlife'
        }
      );
    }
    
    return dailyActivities;
  }
  
  // Generate an itinerary based on a destination and preferences
  static generateItinerary(
    destinationId: string, 
    userPreferences: Preference[], 
    days: number = 3
  ): ItineraryDay[] {
    // Get destination data
    const destinationData = destinations.find(d => d.id === destinationId);
    const destinationName = destinationData?.name || 'your destination';
    
    // Get sample activities for this destination
    const activities = sampleActivities[destinationId] || [];
    
    // Match activities to user preferences
    const matchedActivities = this.matchActivitiesToPreferences(activities, userPreferences);
    
    const itineraryDays: ItineraryDay[] = [];
    
    // Create days with time-aware activities
    for (let i = 1; i <= days; i++) {
      // Generate daily activities based on preferences and time of day
      const dailyActivities = this.generateTimeAwareActivities(matchedActivities, i);
      
      // Create the day object
      itineraryDays.push({
        id: uuidv4(),
        dayNumber: i,
        activities: dailyActivities
      });
    }
    
    return itineraryDays;
  }
  
  // Add user feedback to improve future recommendations
  static addUserFeedback(feedback: UserFeedback): void {
    // In a real app, this would save to a database
    // For now, we'll just log it
    console.log('User feedback received:', feedback);
    
    // This would update a user profile or preferences in a real app
    // You could save this to localStorage as a simple implementation
    const existingFeedback = localStorage.getItem('userFeedback');
    const feedbackArray: UserFeedback[] = existingFeedback 
      ? JSON.parse(existingFeedback) 
      : [];
    
    // Add new feedback
    feedbackArray.push(feedback);
    
    // Save back to localStorage
    localStorage.setItem('userFeedback', JSON.stringify(feedbackArray));
  }
  
  // Get personalized activity recommendations for a specific destination
  static getActivityRecommendations(
    destinationId: string,
    userPreferences: Preference[]
  ): ItineraryActivity[] {
    const activities = sampleActivities[destinationId] || [];
    return this.matchActivitiesToPreferences(activities, userPreferences);
  }
}
