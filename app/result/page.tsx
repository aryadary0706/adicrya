'use client';

import React, { useEffect, useState } from 'react';
import { generateItinerary } from '@/app/api/generateItinerary/route';
import { Activity } from '@/store/types';
import { useItineraryStore } from '@/store/ItinerarySystem';
import { Loader2, Save, ArrowLeft, Leaf, Info, Calendar, MoveUp, MoveDown, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ResultPage() {
  const { searchParams, currentItinerary, setCurrentItinerary, saveItinerary } = useItineraryStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (currentItinerary) return;

    if (searchParams) {
      const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
          const result = await generateItinerary(searchParams);
          setCurrentItinerary(result);
        } catch (err) {
          setError(err instanceof Error ? err.message : "An unknown error occurred");
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    } else {
      // No params, redirect to home
      router.push('/plan');
    }
  }, [searchParams, currentItinerary, setCurrentItinerary, router]);

  const handleSave = () => {
    if (currentItinerary) {
      saveItinerary(currentItinerary);
      router.push('/saved');
    }
  };

  // Simple Drag & Drop Simulation (Swap Logic)
  const moveActivity = (dayIndex: number, activityIndex: number, direction: 'up' | 'down') => {
    if (!currentItinerary) return;
    
    const newItinerary = { ...currentItinerary };
    const day = { ...newItinerary.days[dayIndex] };
    const activities = [...day.activities];

    const swapIndex = direction === 'up' ? activityIndex - 1 : activityIndex + 1;
    
    if (swapIndex >= 0 && swapIndex < activities.length) {
      [activities[activityIndex], activities[swapIndex]] = [activities[swapIndex], activities[activityIndex]];
      day.activities = activities;
      newItinerary.days[dayIndex] = day;
      setCurrentItinerary(newItinerary);
    }
  };

  const deleteActivity = (dayIndex: number, activityIndex: number) => {
      if (!currentItinerary) return;
      const newItinerary = { ...currentItinerary };
      const day = { ...newItinerary.days[dayIndex] };
      day.activities = day.activities.filter((_, idx) => idx !== activityIndex);
      newItinerary.days[dayIndex] = day;
      setCurrentItinerary(newItinerary);
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4">
        <Loader2 className="w-12 h-12 text-emerald-600 animate-spin mb-4" />
        <h2 className="text-xl font-semibold text-slate-800">Generating your eco-friendly trip...</h2>
        <p className="text-slate-500 mt-2 text-center max-w-md">Our AI is finding the best sustainable spots, calculating routes, and organizing your schedule.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <div className="bg-red-50 text-red-600 p-6 rounded-xl max-w-md text-center border border-red-100">
          <h2 className="text-lg font-bold mb-2">Oops! Something went wrong.</h2>
          <p>{error}</p>
          <button onClick={() => router.push('/plan')} className="mt-4 bg-white border border-red-200 px-4 py-2 rounded-lg hover:bg-red-100 transition">Try Again</button>
        </div>
      </div>
    );
  }

  if (!currentItinerary) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <button onClick={() => router.push('/plan')} className="flex items-center text-slate-500 hover:text-emerald-600">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Search
        </button>
        <button onClick={handleSave} className="flex items-center gap-2 bg-emerald-600 text-white px-5 py-2.5 rounded-full hover:bg-emerald-700 transition shadow-sm font-medium">
          <Save className="w-4 h-4" /> Save Itinerary
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Timeline */}
        <div className="lg:col-span-2 space-y-10">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h1 className="text-3xl font-bold text-slate-900">{currentItinerary.title}</h1>
            <p className="text-slate-600 mt-2">{currentItinerary.summary}</p>
            <div className="flex flex-wrap gap-2 mt-4">
              {currentItinerary.seasonalEvents.map((event, i) => (
                <span key={i} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                  <Calendar className="w-3 h-3 mr-1" /> {event}
                </span>
              ))}
            </div>
          </div>

          {currentItinerary.days.map((day, dayIndex) => (
            <div key={dayIndex} className="relative border-l-2 border-emerald-200 pl-8 pb-4">
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white"></div>
              <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
                Day {day.dayNumber}: <span className="font-normal text-slate-600 ml-2">{day.theme}</span>
              </h2>

              <div className="space-y-4">
                {day.activities.map((activity, actIndex) => (
                  <ActivityCard 
                    key={actIndex} 
                    activity={activity} 
                    onUp={() => moveActivity(dayIndex, actIndex, 'up')}
                    onDown={() => moveActivity(dayIndex, actIndex, 'down')}
                    onDelete={() => deleteActivity(dayIndex, actIndex)}
                    isFirst={actIndex === 0}
                    isLast={actIndex === day.activities.length - 1}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          {/* Local Etiquette */}
          <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100 sticky top-24">
            <div className="flex items-center gap-2 mb-4">
              <Info className="w-5 h-5 text-emerald-700" />
              <h3 className="font-bold text-emerald-900">Local Etiquette Guide</h3>
            </div>
            <ul className="space-y-3">
              {currentItinerary.localEtiquette.map((rule, i) => (
                <li key={i} className="flex items-start text-sm text-emerald-800">
                  <span className="mr-2">•</span> {rule}
                </li>
              ))}
            </ul>
          </div>
          
           {/* Summary Stats */}
           <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h3 className="font-bold text-slate-900 mb-4">Trip Overview</h3>
              <div className="space-y-3 text-sm text-slate-600">
                 <div className="flex justify-between">
                    <span>Duration</span>
                    <span className="font-medium">{currentItinerary.days.length} Days</span>
                 </div>
                 <div className="flex justify-between">
                    <span>Destination</span>
                    <span className="font-medium">{currentItinerary.destination}</span>
                 </div>
                 <div className="flex justify-between">
                    <span>Focus</span>
                    <span className="font-medium text-emerald-600">Sustainable Travel</span>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

interface ActivityCardProps {
  activity: Activity;
  onUp: () => void;
  onDown: () => void;
  onDelete: () => void;
  isFirst: boolean;
  isLast: boolean;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ activity, onUp, onDown, onDelete, isFirst, isLast }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow group relative">
      {/* Editor Controls */}
      <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 p-1 rounded-lg">
          <button onClick={onUp} disabled={isFirst} className="p-1 hover:bg-slate-100 rounded disabled:opacity-30"><MoveUp className="w-3 h-3 text-slate-500"/></button>
          <button onClick={onDown} disabled={isLast} className="p-1 hover:bg-slate-100 rounded disabled:opacity-30"><MoveDown className="w-3 h-3 text-slate-500"/></button>
          <button onClick={onDelete} className="p-1 hover:bg-red-50 rounded"><Trash2 className="w-3 h-3 text-red-500"/></button>
      </div>

      <div className="flex gap-4">
        <div className="flex flex-col items-center w-16 pt-1 flex-shrink-0">
          <span className="font-mono text-sm font-bold text-slate-500">{activity.time}</span>
          {activity.durationHint && <span className="text-xs text-slate-400 mt-1">{activity.durationHint}</span>}
        </div>
        <div className="flex-grow">
          <div className="flex items-start justify-between">
            <h4 className="font-semibold text-slate-800">{activity.title}</h4>
            <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
              activity.type === 'meal' ? 'bg-orange-100 text-orange-700' :
              activity.type === 'transit' ? 'bg-blue-100 text-blue-700' :
              activity.type === 'rest' ? 'bg-gray-100 text-gray-600' :
              'bg-emerald-100 text-emerald-700'
            }`}>
              {activity.type}
            </span>
          </div>
          <p className="text-sm text-slate-600 mt-1 leading-relaxed">{activity.description}</p>
          
          {activity.ecoTip && (
            <div className="mt-3 flex items-start gap-2 bg-emerald-50/50 p-2 rounded-lg">
              <Leaf className="w-3 h-3 text-emerald-600 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-emerald-700 italic">{activity.ecoTip}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};