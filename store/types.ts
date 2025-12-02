export enum Pace {
  Relaxed = 'Relaxed',
  Moderate = 'Moderate',
  FastPaced = 'Fast-Paced'
}

export enum TravelMood {
  Adventure = 'Adventure',
  Culture = 'Culture & History',
  Culinary = 'Culinary',
  Nature = 'Nature & Scenery',
  Family = 'Family Friendly'
}

export interface SearchParams {
  originCity: string;
  city: string;
  startDate: string;
  endDate: string;
  pace: Pace;
  mood: TravelMood;
  startTime: string;
  endTime: string;
  peopleCount: number | String;
  describe ?: String;
}

export interface Activity {
  time: string;
  title: string;
  description: string;
  type: 'activity' | 'meal' | 'transit' | 'rest';
  location?: string;
  ecoTip?: string; // Sustainable travel tip specific to this activity
  durationHint?: string;
}

export interface DaySchedule {
  dayNumber: number;
  date?: string; // Optional display date
  theme: string;
  activities: Activity[];
}

export interface Itinerary {
  id: string; // Unique ID
  destination: string;
  title: string;
  summary: string;
  days: DaySchedule[];
  localEtiquette: string[]; // List of cultural rules
  seasonalEvents: string[]; // List of current/seasonal events
  createdAt: number;
}