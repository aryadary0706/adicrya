'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import TrendingSection from '../components/TrendingSection';
import { 
  MapPin, Calendar, Activity, Smile, Clock, Users, Plane 
} from 'lucide-react';
import { useItineraryStore } from '@/store/ItinerarySystem';
import { Pace, TravelMood } from '@/store/types';

function InputField({
  id,
  label,
  icon,
  placeholder,
  value,
  onChange,
}: {
  id: string;
  label: string;
  icon: React.ReactNode;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-slate-700 mb-2">
        <span className="flex items-center gap-2">{icon} {label}</span>
      </label>
      <input
        type="text"
        id={id}
        required
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-lg placeholder:text-slate-400"
      />
    </div>
  );
}

function DateRangeInput({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
}: any) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
        <Calendar className="w-4 h-4 text-emerald-600" /> Travel Dates
      </label>
      <div className="flex items-center gap-2">
        <input
          type="date"
          required
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-slate-300"
        />
        <span className="text-slate-400">to</span>
        <input
          type="date"
          required
          min={startDate}
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-slate-300"
        />
      </div>
    </div>
  );
}

function PeopleInput({ value, onChange }: any) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
        <Users className="w-4 h-4 text-emerald-600" /> Travelers
      </label>
      <input
        type="number"
        min="1"
        max="50"
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="w-full px-4 py-3 rounded-xl border border-slate-300 text-lg"
      />
    </div>
  );
}

function TimeInput({ startTime, setStartTime, endTime, setEndTime }: any) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
          <Clock className="w-4 h-4 text-emerald-600" /> Start Day At
        </label>
        <input
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-slate-300 text-lg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
          <Clock className="w-4 h-4 text-emerald-600" /> End Day At
        </label>
        <input
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-slate-300 text-lg"
        />
      </div>
    </div>
  );
}

function SelectButtons({
  title,
  icon,
  items,
  selected,
  onSelect,
  columns = "grid-cols-3",
}: any) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
        {icon} {title}
      </label>
      <div className={`grid ${columns} gap-2`}>
        {items.map((item: string) => (
          <button
            key={item}
            type="button"
            onClick={() => onSelect(item)}
            className={`px-3 py-3 text-sm rounded-xl border transition-all ${
              selected === item
                ? 'bg-emerald-50 border-emerald-500 text-emerald-700 font-medium'
                : 'border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}

function DescribeByUser({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) {
  return (
    <div className="flex flex-col gap-2 mt-4">
      <label className="text-sm font-medium text-slate-700">
        Tambahan / rencana yang ingin kamu ceritakan ke AI?
      </label>

      <textarea
        className="w-full h-32 p-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        placeholder="Ceritakan apa yang ingin kamu lakukan di liburan ini!"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}


export default function PlanPage() {
  const router = useRouter();
  const params = useSearchParams();
  const destCity = params.get("city") ?? "";
  const { setSearchParams, setCurrentItinerary } = useItineraryStore();
  
  const [originCity, setOriginCity] = useState('');
  const [city, setCity] = useState(destCity || "");
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [peopleCount, setPeopleCount] = useState(1);
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('20:00');
  const [pace, setPace] = useState<Pace>(Pace.Moderate);
  const [mood, setMood] = useState<TravelMood>(TravelMood.Culture);
  const [describe, setDescribe] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({ 
      originCity,
      city, 
      startDate,
      endDate,
      pace, 
      mood, 
      startTime, 
      endTime, 
      peopleCount 
    });
    setCurrentItinerary(null);
    router.push('/result');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
        <div className="bg-emerald-600 px-8 py-6">
          <h2 className="text-2xl font-bold text-white">Create Your Trip</h2>
          <p className="text-emerald-100 mt-1">Tell us where and how you want to travel.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          
          {/* Location Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <InputField
              id="originCity"
              label="Flying From"
              icon={<Plane className="w-4 h-4 text-emerald-600" />}
              value={originCity}
              onChange={setOriginCity}
              placeholder="e.g. Jakarta, London"
            />
            <InputField
              id="city"
              label="Destination City"
              icon={<MapPin className="w-4 h-4 text-emerald-600" />}
              value={city}
              onChange={setCity}
              placeholder="e.g. Kyoto, Paris, Ubud"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Date Inputs */}
            <DateRangeInput 
              startDate={startDate}
              endDate={endDate}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
            />

            {/* People Count Input */}
            <PeopleInput 
              value={peopleCount}
              onChange={setPeopleCount}
            />
          </div>

          {/* Time Preference */}
          <TimeInput
            startTime={startTime}
            setStartTime={setStartTime}
            endTime={endTime}
            setEndTime={setEndTime}
          />

          {/* Pace Select */}
          <SelectButtons
            title="Pace"
            icon={<Activity className="w-4 h-4 text-emerald-600" />}
            items={Object.values(Pace)}
            selected={pace}
            onSelect={setPace}
          />

          {/* Mood Select */}
          <SelectButtons
            title="Travel Mood"
            icon={<Smile className="w-4 h-4 text-emerald-600" />}
            items={Object.values(TravelMood)}
            selected={mood}
            onSelect={setMood}
            columns="grid-cols-2 sm:grid-cols-3 lg:grid-cols-5"
          />

          <DescribeByUser
            value={describe}
            onChange={setDescribe}
          />

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-emerald-700 focus:ring-4 focus:ring-emerald-200 transition-all shadow-lg"
            >
              Generate Itinerary
            </button>
          </div>
        </form>
      </div>

      {/* Recommendations */}
      <TrendingSection router={router} />
    </div>
  );
}
