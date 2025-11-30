import { MapPin, Clock, TrendingUp } from 'lucide-react';
import { Tour } from '../data/tours';
import { useLanguage } from '../context/LanguageContext';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface TourCardProps {
  tour: Tour;
  onSelect: (id: number) => void;
}

// Static image URLs for each tour
const tourImages: { [key: number]: string } = {
  1: 'https://images.unsplash.com/photo-1648122995273-bed9a8f8105d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  2: 'https://images.unsplash.com/photo-1621856292103-bf742b2e4c99?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  3: 'https://images.unsplash.com/photo-1720908675577-76d6a4113a56?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  4: 'https://images.unsplash.com/photo-1530488283937-97dd1667472f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  5: 'https://images.unsplash.com/photo-1562756131-51a05c378d9b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  6: 'https://images.unsplash.com/photo-1748877639638-5cf1c8f8b33e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  7: 'https://images.unsplash.com/photo-1652698752852-24bcf8ae1dcf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  8: 'https://images.unsplash.com/photo-1719131873893-bc8f4e745c21?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  9: 'https://images.unsplash.com/photo-1684929954083-f10c179ed96d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  10: 'https://images.unsplash.com/photo-1624648702303-da84cec99816?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  11: 'https://images.unsplash.com/photo-1762604307175-00693e81cead?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  12: 'https://images.unsplash.com/photo-1634541809780-ec96e72246aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  13: 'https://images.unsplash.com/photo-1652098694798-24be41faecbf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
};

export function TourCard({ tour, onSelect }: TourCardProps) {
  const { t } = useLanguage();

  const difficultyColor = {
    easy: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    medium: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    hard: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-800 hover:border-[#2275d4] hover:shadow-[#2275d4]/20">
      <div className="relative h-64 overflow-hidden group">
        <ImageWithFallback
          src={tourImages[tour.id]}
          alt={t[tour.nameKey as keyof typeof t] as string}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-xs ${difficultyColor[tour.difficultyKey as keyof typeof difficultyColor]}`}>
            {t[tour.difficultyKey as keyof typeof t] as string}
          </span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <div className="p-6">
        <h3 className="text-slate-900 dark:text-white mb-2">{t[tour.nameKey as keyof typeof t] as string}</h3>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 text-sm">
            <MapPin className="w-4 h-4 text-[#2275d4]" />
            <span>{t[tour.locationKey as keyof typeof t] as string}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 text-sm">
            <Clock className="w-4 h-4 text-[#2275d4]" />
            <span>{t[tour.durationKey as keyof typeof t] as string}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 text-sm">
            <TrendingUp className="w-4 h-4 text-[#2275d4]" />
            <span>{t[tour.elevationKey as keyof typeof t] as string}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
          <div>
            <span className="text-slate-900 dark:text-white">{tour.price}{t.currency}</span>
            <span className="text-slate-600 dark:text-slate-400 text-sm ml-1">{t.perPerson}</span>
          </div>
          <button
            onClick={() => onSelect(tour.id)}
            className="bg-[#2275d4] text-white px-4 py-2 rounded-lg hover:bg-[#1b5daa] transition-colors text-sm"
          >
            {t.viewDetails}
          </button>
        </div>
      </div>
    </div>
  );
}
