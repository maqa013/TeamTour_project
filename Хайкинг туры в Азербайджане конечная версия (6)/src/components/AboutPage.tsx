import { ImageWithFallback } from './figma/ImageWithFallback';
import { Mountain, Users, Award, Shield, Heart, Target } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export function AboutPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Hero Section */}
      <div className="relative h-96 bg-slate-900">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1597434429739-2574d7e06807?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGhpa2luZyUyMGxhbmRzY2FwZXxlbnwxfHx8fDE3NjQ0Mzc5NjB8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="About us"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl md:text-6xl mb-4">{t.aboutPageTitle}</h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto px-4">
              {t.aboutPageSubtitle}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Our Story */}
        <div className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl mb-6 text-slate-900 dark:text-slate-100">{t.ourStory}</h2>
              <div className="space-y-4 text-slate-600 dark:text-slate-400 leading-relaxed">
                <p>{t.storyParagraph1}</p>
                <p>{t.storyParagraph2}</p>
                <p>{t.storyParagraph3}</p>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1758618131833-70f14f9e869a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwaGlraW5nJTIwbW91bnRhaW5zfGVufDF8fHx8MTc2NDQzNzk2MHww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Mountain hiking"
                className="w-full h-96 object-cover"
              />
            </div>
          </div>
        </div>

        {/* Our Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-[#2275d4]/10 dark:bg-[#2275d4]/20 rounded-2xl p-8">
            <div className="w-16 h-16 bg-[#2275d4]/20 dark:bg-[#2275d4]/30 rounded-full flex items-center justify-center mb-6">
              <Target className="w-8 h-8 text-[#2275d4] dark:text-[#3b8ff3]" />
            </div>
            <h3 className="text-2xl mb-4 text-slate-900 dark:text-slate-100">{t.ourMission}</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{t.missionText}</p>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-8">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-800/30 rounded-full flex items-center justify-center mb-6">
              <Heart className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-2xl mb-4 text-slate-900 dark:text-slate-100">{t.ourVision}</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{t.visionText}</p>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4 text-slate-900 dark:text-slate-100">{t.whyChooseUs}</h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">{t.whyChooseUsSubtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-[#2275d4]/10 dark:bg-[#2275d4]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mountain className="w-10 h-10 text-[#2275d4] dark:text-[#3b8ff3]" />
              </div>
              <h3 className="text-xl mb-3 text-slate-900 dark:text-slate-100">{t.localExpertise}</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">{t.localExpertiseDesc}</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-[#2275d4]/10 dark:bg-[#2275d4]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-10 h-10 text-[#2275d4] dark:text-[#3b8ff3]" />
              </div>
              <h3 className="text-xl mb-3 text-slate-900 dark:text-slate-100">{t.professionalGuides}</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">{t.professionalGuidesDesc}</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-[#2275d4]/10 dark:bg-[#2275d4]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-10 h-10 text-[#2275d4] dark:text-[#3b8ff3]" />
              </div>
              <h3 className="text-xl mb-3 text-slate-900 dark:text-slate-100">{t.safetyFirst}</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">{t.safetyFirstDesc}</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-[#2275d4]/10 dark:bg-[#2275d4]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-10 h-10 text-[#2275d4] dark:text-[#3b8ff3]" />
              </div>
              <h3 className="text-xl mb-3 text-slate-900 dark:text-slate-100">{t.bestExperience}</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">{t.bestExperienceDesc}</p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4 text-slate-900 dark:text-slate-100">{t.ourTeam}</h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">{t.ourTeamSubtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Team Member 1 */}
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&h=400&fit=crop"
                alt="Team member"
                className="w-full h-64 object-cover"
              />
              <div className="p-6 text-center">
                <h3 className="text-xl mb-1 text-slate-900 dark:text-slate-100">Rashad Aliyev</h3>
                <p className="text-[#2275d4] dark:text-[#3b8ff3] mb-3">{t.founderCEO}</p>
                <p className="text-slate-600 dark:text-slate-400 text-sm">{t.founderDesc}</p>
              </div>
            </div>

            {/* Team Member 2 */}
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop"
                alt="Team member"
                className="w-full h-64 object-cover"
              />
              <div className="p-6 text-center">
                <h3 className="text-xl mb-1 text-slate-900 dark:text-slate-100">Leyla Mammadova</h3>
                <p className="text-[#2275d4] dark:text-[#3b8ff3] mb-3">{t.headGuide}</p>
                <p className="text-slate-600 dark:text-slate-400 text-sm">{t.headGuideDesc}</p>
              </div>
            </div>

            {/* Team Member 3 */}
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop"
                alt="Team member"
                className="w-full h-64 object-cover"
              />
              <div className="p-6 text-center">
                <h3 className="text-xl mb-1 text-slate-900 dark:text-slate-100">Elvin Huseynov</h3>
                <p className="text-[#2275d4] dark:text-[#3b8ff3] mb-3">{t.tourCoordinator}</p>
                <p className="text-slate-600 dark:text-slate-400 text-sm">{t.tourCoordinatorDesc}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-[#2275d4] dark:bg-[#1b5daa] rounded-2xl p-12 text-white">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl mb-2">8+</div>
              <div className="text-blue-100 dark:text-blue-200">{t.yearsInBusiness}</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl mb-2">5000+</div>
              <div className="text-blue-100 dark:text-blue-200">{t.happyHikers}</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl mb-2">15+</div>
              <div className="text-blue-100 dark:text-blue-200">{t.uniqueRoutes}</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl mb-2">20+</div>
              <div className="text-blue-100 dark:text-blue-200">{t.expertGuides}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
