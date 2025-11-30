import { Tour } from '../data/tours';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { MapPin, Clock, TrendingUp, Navigation } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface RoutesPageProps {
  tours: Tour[];
  onTourSelect: (tourId: number) => void;
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

export function RoutesPage({ tours, onTourSelect }: RoutesPageProps) {
  const { t, language } = useLanguage();
  
  const difficultyMap: Record<string, { ru: string; en: string; az: string }> = {
    'easy': { ru: 'Легкий', en: 'Easy', az: 'Asan' },
    'medium': { ru: 'Средний', en: 'Medium', az: 'Orta' },
    'hard': { ru: 'Сложный', en: 'Hard', az: 'Çətin' },
  };
  
  const getDifficultyText = (difficulty: string) => {
    return difficultyMap[difficulty]?.[language] || difficulty;
  };
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'medium':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400';
      case 'hard':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-200';
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl mb-4 text-slate-100">
            {t.routesTitle}
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            {t.routesSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tours.map((tour) => (
            <div 
              key={tour.id} 
              className="bg-slate-900 rounded-xl shadow-lg overflow-hidden border border-slate-800 hover:border-[#2275d4] transition-all duration-300 hover:shadow-2xl hover:shadow-[#2275d4]/20"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden group">
                <ImageWithFallback
                  src={tourImages[tour.id]}
                  alt={t[tour.nameKey as keyof typeof t] as string}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-sm ${getDifficultyColor(tour.difficultyKey)}`}>
                    {getDifficultyText(tour.difficultyKey)}
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-6">
                <h2 className="text-2xl mb-3 text-slate-100">{t[tour.nameKey as keyof typeof t] as string}</h2>
                
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-slate-400">
                    <MapPin className="w-4 h-4 text-[#2275d4]" />
                    <span className="text-sm">{t[tour.locationKey as keyof typeof t] as string}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400">
                    <Clock className="w-4 h-4 text-[#2275d4]" />
                    <span className="text-sm">{t[tour.durationKey as keyof typeof t] as string}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400">
                    <TrendingUp className="w-4 h-4 text-[#2275d4]" />
                    <span className="text-sm">{t[tour.elevationKey as keyof typeof t] as string}</span>
                  </div>
                </div>

                <p className="text-slate-400 mb-6 leading-relaxed text-sm line-clamp-3">
                  {t[tour.descriptionKey as keyof typeof t] as string}
                </p>

                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div>
                      <span className="text-3xl text-[#2275d4]">{t.currency}{tour.price}</span>
                      <span className="text-slate-400 text-sm ml-1">{t.perPerson}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => onTourSelect(tour.id)}
                      className="flex-1 bg-[#2275d4] text-white px-4 py-3 rounded-lg hover:bg-[#1b5daa] transition-colors"
                    >
                      {t.viewDetails}
                    </button>
                    <a
                      href={tour.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-slate-800 text-slate-200 px-4 py-3 rounded-lg hover:bg-slate-700 transition-colors flex items-center gap-2"
                      title={t.openInMaps}
                    >
                      <Navigation className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
