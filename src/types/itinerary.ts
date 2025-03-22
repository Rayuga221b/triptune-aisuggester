
export interface ItineraryActivity {
  id: string;
  time: string;
  title: string;
  description: string;
  location: string;
  duration: string;
  isCustom?: boolean;
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
}
