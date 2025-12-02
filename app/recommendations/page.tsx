'use client';

import { useRouter } from 'next/navigation';
import { Calendar, ArrowRight, Flag } from 'lucide-react';

interface CityRec {
  name: string;
  country: string;
  image: string;
  description: string;
  events: string[];
  tags: string[];
}

const recommendations: CityRec[] = [
  {
    name: "Kyoto",
    country: "Japan",
    image: "https://picsum.photos/800/400?random=10",
    description: "The cultural heart of Japan, famous for its classical Buddhist temples, gardens, imperial palaces, Shinto shrines and traditional wooden houses. It's a leader in preserving cultural heritage while managing tourism sustainably.",
    events: ["Gion Matsuri (July)", "Cherry Blossom Viewing (April)", "Jidai Matsuri (October)"],
    tags: ["Culture", "History", "Nature"]
  },
  {
    name: "Ubud",
    country: "Indonesia",
    image: "https://picsum.photos/800/400?random=11",
    description: "A town on the Indonesian island of Bali, known as a center for traditional crafts and dance. Surrounded by rainforest and terraced rice paddies, dotted with Hindu temples and shrines, it promotes eco-wellness.",
    events: ["Bali Spirit Festival (May)", "Ubud Writers Festival (October)", "Galungan (Variable)"],
    tags: ["Wellness", "Nature", "Art"]
  },
  {
    name: "Copenhagen",
    country: "Denmark",
    image: "https://picsum.photos/800/400?random=12",
    description: "Often ranked as one of the world's most sustainable cities. Known for its biking culture, clean harbor baths, and New Nordic cuisine that emphasizes local and seasonal produce.",
    events: ["Copenhagen Jazz Festival (July)", "Distortion (June)", "Christmas at Tivoli (Dec)"],
    tags: ["Urban", "Eco-City", "Design"]
  },
  {
    name: "Reykjavik",
    country: "Iceland",
    image: "https://picsum.photos/800/400?random=13",
    description: "Runs almost entirely on geothermal energy. A gateway to dramatic landscapes, hot springs, and the Northern Lights, offering a unique blend of urban culture and raw nature.",
    events: ["Dark Music Days (Jan)", "Winter Lights Festival (Feb)", "Secret Solstice (June)"],
    tags: ["Adventure", "Energy", "Nature"]
  }
];

const RecommendationsPage: React.FC = () => {
  const router = useRouter();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">Discover Sustainable Destinations</h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Explore cities that are leading the way in eco-tourism, cultural preservation, and green living.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-12">
        {recommendations.map((city, index) => (
          <div key={index} className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden flex flex-col md:flex-row hover:shadow-lg transition-shadow">
            <div className="md:w-1/2 h-64 md:h-auto relative">
              <img src={city.image} alt={city.name} className="w-full h-full object-cover" />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-sm font-bold text-slate-800 flex items-center gap-1">
                <Flag className="w-3 h-3 text-emerald-600" /> {city.country}
              </div>
            </div>
            
            <div className="md:w-1/2 p-8 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {city.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-md uppercase tracking-wide">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <h2 className="text-3xl font-bold text-slate-900 mb-3">{city.name}</h2>
                <p className="text-slate-600 leading-relaxed mb-6">{city.description}</p>
                
                <div className="mb-6">
                  <h3 className="font-semibold text-slate-800 flex items-center gap-2 mb-3">
                    <Calendar className="w-4 h-4 text-emerald-600" /> Seasonal Highlights
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {city.events.map((event, i) => (
                      <span key={i} className="inline-block bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm">
                        {event}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <button 
                onClick={() => router.push(`/plan?city=${city.name}`)}
                className="self-start inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl font-medium hover:bg-emerald-600 transition-colors"
              >
                Plan a Trip to {city.name} <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendationsPage;