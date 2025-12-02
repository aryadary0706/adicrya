import { 
  MapPin, Calendar, Activity, Smile, Clock, Users, Plane, ArrowRight 
} from 'lucide-react';
import DestinationCard from './DestinationCard';

export default function TrendingSection({ router }: any) {
  return (
    <div className="mt-16">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-slate-900">
          Trending Sustainable Destinations
        </h3>
        <button
          onClick={() => router.push('/recommendations')}
          className="text-emerald-600 font-medium hover:text-emerald-700 flex items-center gap-1"
        >
          View All <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DestinationCard
          img="https://picsum.photos/400/250?random=1"
          name="Kyoto, Japan"
          tag="Culture"
          onClick={() => router.push('/recommendations')}
        />
        <DestinationCard
          img="https://picsum.photos/400/250?random=2"
          name="Ubud, Bali"
          tag="Nature"
          onClick={() => router.push('/recommendations')}
        />
        <DestinationCard
          img="https://picsum.photos/400/250?random=3"
          name="Copenhagen, Denmark"
          tag="Urban"
          onClick={() => router.push('/recommendations')}
        />
      </div>
    </div>
  );
}
