
import { Preference } from "@/components/PreferenceSelector";
import { Destination } from "@/components/DestinationCard";
import { ItineraryDay, ItineraryActivity } from "@/components/ItineraryBuilder";
import { v4 as uuidv4 } from 'uuid';

// Sample destination data
export const destinations: Destination[] = [
  {
    id: '1',
    name: 'Kyoto',
    location: 'Japan',
    description: 'Ancient temples, traditional geisha districts, and serene bamboo forests make Kyoto a cultural treasure.',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1000&auto=format&fit=crop',
    duration: '5-7 days',
    rating: 4.8,
    tags: ['Culture', 'History', 'Temples']
  },
  {
    id: '2',
    name: 'Barcelona',
    location: 'Spain',
    description: 'A vibrant city known for stunning architecture, beautiful beaches, and a world-class dining scene.',
    image: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?q=80&w=1000&auto=format&fit=crop',
    duration: '4-6 days',
    rating: 4.7,
    tags: ['Architecture', 'Beach', 'Food']
  },
  {
    id: '3',
    name: 'Santorini',
    location: 'Greece',
    description: 'Famous for its dramatic views, stunning sunsets, white-washed houses, and blue-domed churches.',
    image: 'https://images.unsplash.com/photo-1571406384450-b2fork0b2d1f?q=80&w=1000&auto=format&fit=crop',
    duration: '3-5 days',
    rating: 4.9,
    tags: ['Scenic', 'Beach', 'Romantic']
  },
  {
    id: '4',
    name: 'New York City',
    location: 'USA',
    description: 'The ultimate urban adventure with iconic skyscrapers, world-class museums, and diverse neighborhoods.',
    image: 'https://images.unsplash.com/photo-1496588152823-86ff7695a68j?q=80&w=1000&auto=format&fit=crop',
    duration: '5-8 days',
    rating: 4.6,
    tags: ['Urban', 'Culture', 'Shopping']
  },
  {
    id: '5',
    name: 'Bali',
    location: 'Indonesia',
    description: 'A paradise island offering incredible beaches, lush rice terraces, and spiritual experiences.',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1000&auto=format&fit=crop',
    duration: '7-10 days',
    rating: 4.5,
    tags: ['Beach', 'Adventure', 'Nature']
  },
  {
    id: '6',
    name: 'Rome',
    location: 'Italy',
    description: 'The Eternal City combines ancient ruins, awe-inspiring art, and vibrant street life with modern culture.',
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=1000&auto=format&fit=crop',
    duration: '4-6 days',
    rating: 4.7,
    tags: ['History', 'Food', 'Art']
  },
  {
    id: '7',
    name: 'Marrakech',
    location: 'Morocco',
    description: 'A magical place filled with markets, gardens, palaces, and mosques in vibrant North Africa.',
    image: 'https://images.unsplash.com/photo-1535530992830-e25d07cfa780?q=80&w=1000&auto=format&fit=crop',
    duration: '3-5 days',
    rating: 4.4,
    tags: ['Culture', 'Shopping', 'Architecture']
  },
  {
    id: '8',
    name: 'Swiss Alps',
    location: 'Switzerland',
    description: 'Spectacular mountain scenery with world-class skiing, hiking, and charming alpine villages.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1000&auto=format&fit=crop',
    duration: '5-7 days',
    rating: 4.8,
    tags: ['Nature', 'Adventure', 'Scenic']
  }
];

// Sample itinerary activities
const sampleActivities: Record<string, ItineraryActivity[]> = {
  '1': [ // Kyoto
    {
      id: uuidv4(),
      time: '09:00',
      title: 'Fushimi Inari Shrine',
      description: 'Walk through thousands of vermilion torii gates leading into the wooded forest of the sacred Mount Inari.',
      location: 'Fushimi Ward, Kyoto',
      duration: '2h'
    },
    {
      id: uuidv4(),
      time: '12:00',
      title: 'Lunch at Nishiki Market',
      description: 'Sample local street food and delicacies at Kyoto\'s famous food market.',
      location: 'Central Kyoto',
      duration: '1h 30m'
    },
    {
      id: uuidv4(),
      time: '14:30',
      title: 'Arashiyama Bamboo Grove',
      description: 'Experience the surreal landscape of towering bamboo stalks swaying in the wind.',
      location: 'Arashiyama District',
      duration: '1h'
    },
    {
      id: uuidv4(),
      time: '16:30',
      title: 'Tea Ceremony',
      description: 'Participate in a traditional Japanese tea ceremony with a local master.',
      location: 'Gion District',
      duration: '1h 30m'
    },
  ],
  '2': [ // Barcelona
    {
      id: uuidv4(),
      time: '09:30',
      title: 'Sagrada Familia',
      description: 'Marvel at Gaudí\'s masterpiece, the unfinished Sagrada Familia basilica.',
      location: 'Eixample District',
      duration: '2h'
    },
    {
      id: uuidv4(),
      time: '12:00',
      title: 'Lunch at La Boqueria Market',
      description: 'Enjoy fresh tapas and local specialties at this famous market.',
      location: 'Las Ramblas',
      duration: '1h 30m'
    },
    {
      id: uuidv4(),
      time: '14:30',
      title: 'Park Güell',
      description: 'Explore this colorful park with amazing views, designed by Antoni Gaudí.',
      location: 'Carmel Hill',
      duration: '2h'
    },
    {
      id: uuidv4(),
      time: '17:30',
      title: 'Beach Time at Barceloneta',
      description: 'Relax at Barcelona\'s most popular urban beach.',
      location: 'Barceloneta',
      duration: '2h'
    },
  ],
  // Add more destinations as needed
};

// Preference weights for destinations (simplified)
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
  // Add weights for other destinations
};

export class AIRecommendationService {
  // Get personalized destination recommendations based on preferences
  static getRecommendations(userPreferences: Preference[], previousSelections: string[] = []): Destination[] {
    // Filter active preferences and get their IDs and importance
    const activePrefs = userPreferences
      .filter(p => p.selected)
      .map(p => ({ id: p.id, importance: p.importance || 50 }));
    
    if (activePrefs.length === 0) {
      // No preferences selected, return a default order
      return [...destinations].sort((a, b) => b.rating - a.rating);
    }
    
    // Score each destination based on user preferences
    const scoredDestinations = destinations.map(destination => {
      const weights = destinationPreferenceWeights[destination.id] || {};
      
      // Calculate score using preference importance and weights
      let score = activePrefs.reduce((total, pref) => {
        const weight = weights[pref.id] || 0.3; // Default weight if not defined
        const importance = pref.importance / 100; // Convert to 0-1 scale
        return total + (weight * importance);
      }, 0);
      
      // Boost the score if it was previously selected (simulating learning)
      if (previousSelections.includes(destination.id)) {
        score *= 1.2;
      }
      
      return { ...destination, score };
    });
    
    // Return sorted destinations by score
    return scoredDestinations.sort((a, b) => {
      const scoreA = a.score || 0;
      const scoreB = b.score || 0;
      return scoreB - scoreA;
    });
  }
  
  // Generate an itinerary based on a destination and preferences
  static generateItinerary(destinationId: string, userPreferences: Preference[], days: number = 3): ItineraryDay[] {
    // Get sample activities for this destination
    const activities = sampleActivities[destinationId] || [];
    
    // If no activities found, generate some generic ones
    const destinationData = destinations.find(d => d.id === destinationId);
    const destinationName = destinationData?.name || 'your destination';
    const itineraryDays: ItineraryDay[] = [];
    
    // Create days with activities
    for (let i = 1; i <= days; i++) {
      const dailyActivities: ItineraryActivity[] = [];
      
      // For each day, add 3-5 activities
      const numActivities = activities.length > 0 
        ? Math.min(4, activities.length) 
        : 4;
      
      // If we have sample activities, use them
      if (activities.length > 0) {
        // Rotate through available activities (simple approach)
        const startIdx = ((i - 1) * numActivities) % activities.length;
        
        for (let j = 0; j < numActivities; j++) {
          const activityIdx = (startIdx + j) % activities.length;
          dailyActivities.push({
            ...activities[activityIdx],
            id: uuidv4() // New ID for each instance
          });
        }
      } else {
        // Generic activities if none are available
        dailyActivities.push(
          {
            id: uuidv4(),
            time: '09:00',
            title: `Morning exploration in ${destinationName}`,
            description: 'Explore the main attractions and landmarks.',
            location: destinationName,
            duration: '3h'
          },
          {
            id: uuidv4(),
            time: '12:30',
            title: 'Local lunch experience',
            description: 'Try authentic local cuisine at a recommended restaurant.',
            location: 'City center',
            duration: '1h 30m'
          },
          {
            id: uuidv4(),
            time: '14:30',
            title: 'Cultural activity',
            description: 'Visit a museum, gallery, or historical site.',
            location: destinationName,
            duration: '2h'
          },
          {
            id: uuidv4(),
            time: '17:30',
            title: 'Evening relaxation',
            description: 'Enjoy scenic views and local atmosphere.',
            location: 'Various locations',
            duration: '2h'
          }
        );
      }
      
      // Create the day object
      itineraryDays.push({
        id: uuidv4(),
        dayNumber: i,
        activities: dailyActivities
      });
    }
    
    return itineraryDays;
  }
}
