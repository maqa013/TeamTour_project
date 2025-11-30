import { Tour } from '../data/tours';
import { TourCard } from './TourCard';
import { useLanguage } from '../context/LanguageContext';

interface ToursGridProps {
  tours: Tour[];
  onTourSelect: (tourId: number) => void;
}

export function ToursGrid({ tours, onTourSelect }: ToursGridProps) {
  const { t } = useLanguage();
  
  return (
    <section id="tours" className="py-16 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl mb-4 text-white">
            {t.ourTours}
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            {t.toursSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tours.map((tour) => (
            <TourCard 
              key={tour.id} 
              tour={tour} 
              onSelect={() => onTourSelect(tour.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
