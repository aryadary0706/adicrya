'use client';

import { create } from 'zustand';
import { Itinerary, SearchParams } from './types';

interface ItineraryStore {
  currentItinerary: Itinerary | null;
  searchParams: SearchParams | null;
  savedItineraries: Itinerary[];

  setCurrentItinerary: (it: Itinerary | null) => void;
  setSearchParams: (params: SearchParams | null) => void;

  saveItinerary: (it: Itinerary) => void;
  deleteItinerary: (id: string) => void;
}

// Zustand store with localStorage persistence
export const useItineraryStore = create<ItineraryStore>((set, get) => ({
  currentItinerary: null,
  searchParams: null,
  savedItineraries: typeof window !== 'undefined'
    ? JSON.parse(localStorage.getItem('ecoTravel_saved') || '[]')
    : [],

  setCurrentItinerary: (it) => set({ currentItinerary: it }),

  setSearchParams: (params) => set({ searchParams: params }),

  saveItinerary: (it) => {
    const existing = get().savedItineraries;
    if (!existing.find(i => i.id === it.id)) {
      const updated = [it, ...existing];
      set({ savedItineraries: updated });
      if (typeof window !== 'undefined')
        localStorage.setItem('ecoTravel_saved', JSON.stringify(updated));
    }
  },

  deleteItinerary: (id) => {
    const updated = get().savedItineraries.filter(i => i.id !== id);
    set({ savedItineraries: updated });
    if (typeof window !== 'undefined')
      localStorage.setItem('ecoTravel_saved', JSON.stringify(updated));
  },
}));
