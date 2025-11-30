import { ImageWithFallback } from './figma/ImageWithFallback';
import { Mountain, Users, Shield } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface HeroProps {
  onExploreTours: () => void;
}

export function Hero({ onExploreTours }: HeroProps) {
  const { t } = useLanguage();
  
  return (
    <div className="relative">
      {/* Hero Image */}
      <div className="relative h-[600px] overflow-hidden">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1737821885725-0627937e35c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhemVyYmFpamFuJTIwbW91bnRhaW5zJTIwbGFuZHNjYXBlfGVufDF8fHx8MTc2NDMzMzQwOXww&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Azerbaijan Mountains"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
        
        {/* Hero Content */}
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-3xl text-white">
              <h1 className="text-5xl md:text-6xl lg:text-7xl mb-6">
                {t.heroTitle}
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-white/90">
                {t.heroSubtitle}
              </p>
              <button 
                onClick={onExploreTours}
                className="inline-block bg-[#2275d4] text-white px-8 py-4 rounded-lg hover:bg-[#1b5daa] transition-colors"
              >
                {t.exploreTours}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="bg-slate-900 py-12 border-t border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-[#2275d4]/20 rounded-full flex items-center justify-center mb-4">
                <Mountain className="w-8 h-8 text-[#2275d4]" />
              </div>
              <h3 className="mb-2 text-white">{t.routesCount}</h3>
              <p className="text-slate-400 text-sm">{t.routesDesc}</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-[#2275d4]/20 rounded-full flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-[#2275d4]" />
              </div>
              <h3 className="mb-2 text-white">{t.experiencedGuides}</h3>
              <p className="text-slate-400 text-sm">{t.guidesDesc}</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-[#2275d4]/20 rounded-full flex items-center justify-center mb-4">
                <Shield className="w-8 h-8 text-[#2275d4]" />
              </div>
              <h3 className="mb-2 text-white">{t.fullInsurance}</h3>
              <p className="text-slate-400 text-sm">{t.insuranceDesc}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
