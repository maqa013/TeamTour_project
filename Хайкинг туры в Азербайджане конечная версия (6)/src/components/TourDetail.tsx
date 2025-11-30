import { useState, useEffect } from 'react';
import { Tour } from '../data/tours';
import { 
  ArrowLeft, 
  Clock, 
  MapPin, 
  TrendingUp, 
  Users, 
  Calendar,
  CheckCircle2
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface TourDetailProps {
  tour: Tour;
  onBack: () => void;
  onBookNow: (tourId: number) => void;
}

export function TourDetail({ tour, onBack, onBookNow }: TourDetailProps) {
  const { t } = useLanguage();
  const [imageUrl, setImageUrl] = useState('');
  
  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch(
          `https://api.unsplash.com/search/photos?query=${encodeURIComponent(tour.imageQuery)}&per_page=1&client_id=YOUR_UNSPLASH_ACCESS_KEY`
        );
        if (response.ok) {
          const data = await response.json();
          if (data.results && data.results.length > 0) {
            setImageUrl(data.results[0].urls.regular);
          }
        }
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    };

    fetchImage();
  }, [tour.imageQuery]);
  
  const getDifficultyColor = (difficultyKey: string) => {
    switch (difficultyKey) {
      case 'easy':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'medium':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400';
      case 'hard':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300';
    }
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="relative h-[500px] overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={t[tour.nameKey as keyof typeof t] as string}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60" />
        
        <button
          onClick={onBack}
          className="absolute top-8 left-8 flex items-center gap-2 text-white bg-black/30 backdrop-blur-sm px-4 py-2 rounded-lg hover:bg-black/50 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>{t.back}</span>
        </button>

        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="max-w-7xl mx-auto">
            <span className={`px-3 py-1 rounded-full text-sm ${getDifficultyColor(tour.difficultyKey)} mb-4 inline-block`}>
              {t[tour.difficultyKey as keyof typeof t] as string}
            </span>
            <h1 className="text-5xl mb-4">{t[tour.nameKey as keyof typeof t] as string}</h1>
            <div className="flex items-center gap-2 text-white/90">
              <MapPin className="w-5 h-5" />
              <span className="text-xl">{t[tour.locationKey as keyof typeof t] as string}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="mb-8">
              <h2 className="text-3xl mb-4 text-slate-900 dark:text-white">{t.aboutTour}</h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                {t[tour.descriptionKey as keyof typeof t] as string}
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-3xl mb-4 text-slate-900 dark:text-white">{t.highlights}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {tour.highlightsKeys.map((key, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-1" />
                    <span className="text-slate-700 dark:text-slate-300">{t[key as keyof typeof t] as string}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-3xl mb-4 text-slate-900 dark:text-white">{t.included}</h2>
              <div className="space-y-3">
                {tour.includedKeys.map((key, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-emerald-600 dark:bg-emerald-400 rounded-full"></div>
                    <span className="text-slate-700 dark:text-slate-300">{t[key as keyof typeof t] as string}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-6 sticky top-24 border border-slate-200 dark:border-slate-700">
              <div className="space-y-6 mb-6">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{t.duration}</p>
                    <p className="text-slate-900 dark:text-white">{t[tour.durationKey as keyof typeof t] as string}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{t.elevation}</p>
                    <p className="text-slate-900 dark:text-white">{t[tour.elevationKey as keyof typeof t] as string}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{t.maxGroup}</p>
                    <p className="text-slate-900 dark:text-white">{tour.maxGroupSize} {t.people}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{t.season}</p>
                    <p className="text-slate-900 dark:text-white">{t[tour.seasonKey as keyof typeof t] as string}</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-200 dark:border-slate-700 pt-6 mb-6">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-slate-900 dark:text-white">{tour.price}{t.currency}</span>
                  <span className="text-sm text-slate-600 dark:text-slate-400">{t.perPerson}</span>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400">{t.freeCancel}</p>
              </div>

              <button
                onClick={() => onBookNow(tour.id)}
                className="w-full bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors"
              >
                {t.bookNow}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
