'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useItineraryStore } from '@/store/ItinerarySystem';
import { Itinerary } from '@/store/types';
import { MapPin, Calendar, ArrowRight, Trash2, ClipboardCheck } from 'lucide-react';

const SavedPage: React.FC = () => {
  const router = useRouter();
  const { savedItineraries, setCurrentItinerary, deleteItinerary } = useItineraryStore();

  const handleSelect = (itinerary: Itinerary) => {
    setCurrentItinerary(itinerary);
    router.push('/result');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-slate-900 mb-8">Saved Trips</h1>

      {savedItineraries.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-slate-100">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
            <MapPin className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-medium text-slate-900">No saved trips yet</h3>
          <p className="text-slate-500 mt-1 mb-6">Plan your first sustainable adventure today.</p>
          <button 
            onClick={() => router.push('/plan')}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700"
          >
            Create New Plan
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedItineraries.map((itinerary) => (
            <div key={itinerary.id} className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-all flex flex-col h-full">
              <div className="h-2 bg-emerald-500 w-full"></div>
              <div className="p-6 grow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-slate-900 line-clamp-1">{itinerary.destination}</h3>
                  <div className='flex gap-2 '>
                  <button onClick={(e) => { e.stopPropagation(); deleteItinerary(itinerary.id); }} className="text-slate-300 hover:text-red-500 transition-colors">
                     <Trash2 className="w-5 h-5" />
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); deleteItinerary(itinerary.id); }} className="text-slate-300 hover:text-green-600 transition-colors">
                     <ClipboardCheck className="w-5 h-5" />
                  </button>
                  </div>
                </div>
                <h4 className="text-sm font-medium text-emerald-600 mb-3 line-clamp-1">{itinerary.title}</h4>
                <p className="text-slate-500 text-sm mb-4 line-clamp-2">{itinerary.summary}</p>
                
                <div className="flex items-center gap-4 text-xs text-slate-400 mb-4">
                   <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {itinerary.days.length} Days</span>
                   <span>•</span>
                   <span>Created {new Date(itinerary.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 mt-auto">
                 <button 
                   onClick={() => handleSelect(itinerary)}
                   className="w-full flex justify-center items-center text-emerald-700 font-medium text-sm hover:text-emerald-800"
                 >
                   View Rundown <ArrowRight className="w-4 h-4 ml-1" />
                 </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedPage;