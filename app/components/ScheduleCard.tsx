import { Activity } from '@/store/types';
import { Leaf, MoveUp, MoveDown, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';


interface ActivityCardProps {
  activity: Activity;
  onUp: () => void;
  onDown: () => void;
  onDelete: () => void;
  isFirst: boolean;
  isLast: boolean;
}

export function ActivityCard({ activity, onUp, onDown, onDelete, isFirst, isLast }: ActivityCardProps)  {
  const [open, setOpen] = useState(false)
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow group relative">
      {/* Editor Controls */}
      <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 p-1 rounded-lg">
          <button onClick={onUp} disabled={isFirst} className="p-1 hover:bg-slate-100 rounded disabled:opacity-30"><MoveUp className="w-3 h-3 text-slate-500"/></button>
          <button onClick={onDown} disabled={isLast} className="p-1 hover:bg-slate-100 rounded disabled:opacity-30"><MoveDown className="w-3 h-3 text-slate-500"/></button>
          <button onClick={onDelete} className="p-1 hover:bg-red-50 rounded"><Trash2 className="w-3 h-3 text-red-500"/></button>
      </div>

      <div className="flex gap-4">
        <div className="flex flex-col items-center w-16 pt-1 shrink-0">
          <span className="font-mono text-sm font-bold text-slate-500">{activity.time}</span>
          {activity.durationHint && <span className="text-xs text-slate-400 mt-1">{activity.durationHint}</span>}
        </div>
        <div className="grow">
          <div className="flex items-start justify-between">
            <div className='flex gap-1'>
              <h4 className="font-semibold text-slate-800">{activity.title}</h4>
              <button
                onClick={() => setOpen(!open)}
                className="p-2 rounded hover:bg-slate-100 transition"
              >
                {open ? (
                  <ChevronUp className="w-4 h-4 text-slate-600" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-600" />
                )}
              </button>
            </div>
            <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
              activity.type === 'meal' ? 'bg-orange-100 text-orange-700' :
              activity.type === 'transit' ? 'bg-blue-100 text-blue-700' :
              activity.type === 'rest' ? 'bg-gray-100 text-gray-600' :
              'bg-emerald-100 text-emerald-700'
            }`}>
              {activity.type}
            </span>
          </div>
          {/* Collapsible Detail */}
          <div
            className={`
              overflow-hidden transition-all duration-300 
              ${open ? "max-h-[600px] mt-3" : "max-h-0"} 
            `}
          >
            <DetailContent activity={activity} />
          </div>
        </div>
      </div>
    </div>
  );
};

function DetailContent({ activity }: { activity: Activity }) {
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
      <p className="text-sm text-slate-700 leading-relaxed">
        {activity.description}
      </p>

      {activity.ecoTip && (
        <div className="mt-3 bg-emerald-50 p-2 rounded-lg flex gap-2">
          <Leaf className="w-3 h-3 text-emerald-600 mt-0.5" />
          <span className="text-xs text-emerald-700 italic">
            {activity.ecoTip}
          </span>
        </div>
      )}
    </div>
  );
}
