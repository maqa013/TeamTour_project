import { useState, useEffect } from 'react';
import { User, Booking, Achievement, UserStats } from '../types';
import { tours } from '../data/tours';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Calendar, MapPin, Users, Clock, ChevronRight, Award, TrendingUp, Mountain, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ProfileProps {
  user: User;
  onTourSelect: (tourId: number) => void;
}

export function Profile({ user, onTourSelect }: ProfileProps) {
  const { t, language } = useLanguage();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [stats, setStats] = useState<UserStats>({
    totalTours: 0,
    completedPeaks: 0,
    totalDistance: 0,
    achievements: [],
  });
  const [cancellingBookingId, setCancellingBookingId] = useState<string | null>(null);

  const achievementDefinitions: Achievement[] = [
    { id: '1', type: 'peaks', level: 1, nameKey: 'achievementFirstPeak', descriptionKey: 'achievementFirstPeakDesc', iconKey: '🏔️', requirement: 1 },
    { id: '2', type: 'peaks', level: 2, nameKey: 'achievementThreePeaks', descriptionKey: 'achievementThreePeaksDesc', iconKey: '⛰️', requirement: 3 },
    { id: '3', type: 'peaks', level: 3, nameKey: 'achievementFivePeaks', descriptionKey: 'achievementFivePeaksDesc', iconKey: '🗻', requirement: 5 },
    { id: '4', type: 'peaks', level: 4, nameKey: 'achievementTenPeaks', descriptionKey: 'achievementTenPeaksDesc', iconKey: '🏔️', requirement: 10 },
    { id: '5', type: 'distance', level: 1, nameKey: 'achievementDistance50', descriptionKey: 'achievementDistance50Desc', iconKey: '🥾', requirement: 50 },
    { id: '6', type: 'distance', level: 2, nameKey: 'achievementDistance100', descriptionKey: 'achievementDistance100Desc', iconKey: '🎯', requirement: 100 },
    { id: '7', type: 'distance', level: 3, nameKey: 'achievementDistance200', descriptionKey: 'achievementDistance200Desc', iconKey: '🏆', requirement: 200 },
  ];

  useEffect(() => {
    loadUserData();
  }, [user.id]);

  const loadUserData = () => {
    // Load bookings
    const allBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const userBookings = allBookings.filter((b: Booking) => b.userId === user.id);
    setBookings(userBookings);

    // Calculate stats
    const completedBookings = userBookings.filter((b: Booking) => b.status === 'completed');
    const totalTours = completedBookings.length;
    const completedPeaks = completedBookings.length;
    
    // Calculate total distance
    let totalDistance = 0;
    completedBookings.forEach((booking: Booking) => {
      const tour = tours.find(t => t.id === booking.tourId);
      if (tour) {
        totalDistance += tour.distance;
      }
    });

    // Calculate achievements
    const unlockedAchievements = achievementDefinitions
      .filter(achievement => {
        if (achievement.type === 'peaks') {
          return completedPeaks >= achievement.requirement;
        } else {
          return totalDistance >= achievement.requirement;
        }
      })
      .map(achievement => ({
        ...achievement,
        unlockedAt: new Date().toISOString(),
      }));

    setStats({
      totalTours,
      completedPeaks,
      totalDistance: Math.round(totalDistance * 10) / 10,
      achievements: unlockedAchievements,
    });
  };

  const cancelBooking = (bookingId: string) => {
    const allBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const updatedBookings = allBookings.map((b: Booking) => 
      b.id === bookingId ? { ...b, status: 'cancelled' as const } : b
    );
    localStorage.setItem('bookings', JSON.stringify(updatedBookings));
    loadUserData();
    setCancellingBookingId(null);
  };

  const upcomingBookings = bookings.filter(b => b.status === 'upcoming');
  const pastBookings = bookings.filter(b => b.status === 'completed');
  const cancelledBookings = bookings.filter(b => b.status === 'cancelled');

  const getTourById = (tourId: number) => {
    return tours.find(t => t.id === tourId);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(language === 'ru' ? 'ru-RU' : language === 'az' ? 'az-AZ' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getTourName = (tour: typeof tours[0]) => {
    const translationsMap: any = {
      ru: require('../locales/translations').translations.ru,
      en: require('../locales/translations').translations.en,
      az: require('../locales/translations').translations.az,
    };
    return translationsMap[language][tour.nameKey] || tour.nameKey;
  };

  const getTourLocation = (tour: typeof tours[0]) => {
    const translationsMap: any = {
      ru: require('../locales/translations').translations.ru,
      en: require('../locales/translations').translations.en,
      az: require('../locales/translations').translations.az,
    };
    return translationsMap[language][tour.locationKey] || tour.locationKey;
  };

  const getTourDuration = (tour: typeof tours[0]) => {
    const translationsMap: any = {
      ru: require('../locales/translations').translations.ru,
      en: require('../locales/translations').translations.en,
      az: require('../locales/translations').translations.az,
    };
    return translationsMap[language][tour.durationKey] || tour.durationKey;
  };

  const BookingCard = ({ booking }: { booking: Booking }) => {
    const tour = getTourById(booking.tourId);
    if (!tour) return null;

    return (
      <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3 relative">
            <ImageWithFallback
              src={`https://source.unsplash.com/600x400/?${tour.imageQuery}`}
              alt={getTourName(tour)}
              className="w-full h-48 md:h-full object-cover"
            />
          </div>
          <div className="md:w-2/3 p-6">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="text-xl mb-1 text-slate-900">{getTourName(tour)}</h3>
                <div className="flex items-center gap-2 text-slate-600 text-sm">
                  <MapPin className="w-4 h-4" />
                  <span>{getTourLocation(tour)}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <span className={`px-3 py-1 rounded-full text-sm ${
                  booking.status === 'upcoming' 
                    ? 'bg-emerald-100 text-emerald-800' 
                    : booking.status === 'cancelled'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-slate-100 text-slate-800'
                }`}>
                  {booking.status === 'upcoming' ? t.upcoming : booking.status === 'cancelled' ? t.cancelled : t.completed}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center gap-2 text-slate-600">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">{formatDate(booking.date)}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <Users className="w-4 h-4" />
                <span className="text-sm">{booking.participants} {t.people}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <Clock className="w-4 h-4" />
                <span className="text-sm">{getTourDuration(tour)}</span>
              </div>
              <div>
                <span className="text-emerald-600">{t.currency}{booking.totalPrice}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-200">
              <span className="text-sm text-slate-500">
                {t.bookedOn} {formatDate(booking.bookedAt)}
              </span>
              <div className="flex gap-2">
                {booking.status === 'upcoming' && (
                  <button
                    onClick={() => setCancellingBookingId(booking.id)}
                    className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm"
                  >
                    {t.cancel}
                  </button>
                )}
                <button 
                  onClick={() => onTourSelect(booking.tourId)}
                  className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 transition-colors"
                >
                  <span className="text-sm">{t.viewDetails}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* User Info */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center">
              <span className="text-3xl text-emerald-600">
                {user.fullName.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h1 className="text-3xl mb-2 text-slate-900">{user.fullName}</h1>
              <p className="text-slate-600">@{user.username}</p>
              <p className="text-slate-500 text-sm">{user.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 pt-8 border-t border-slate-200">
            <div className="text-center">
              <div className="text-3xl text-emerald-600 mb-1">{bookings.length}</div>
              <div className="text-slate-600 text-sm">{t.totalTours}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl text-emerald-600 mb-1">{upcomingBookings.length}</div>
              <div className="text-slate-600 text-sm">{t.upcomingTours}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl text-emerald-600 mb-1">{pastBookings.length}</div>
              <div className="text-slate-600 text-sm">{t.completedTours}</div>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-xl shadow-md p-8 mb-8 text-white">
          <h2 className="text-2xl mb-6 flex items-center gap-2">
            <TrendingUp className="w-6 h-6" />
            {t.statistics}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-2">
                <Calendar className="w-5 h-5" />
                <span className="text-sm opacity-90">{t.toursCompleted}</span>
              </div>
              <div className="text-3xl">{stats.totalTours}</div>
            </div>
            <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-2">
                <Mountain className="w-5 h-5" />
                <span className="text-sm opacity-90">{t.peaksReached}</span>
              </div>
              <div className="text-3xl">{stats.completedPeaks}</div>
            </div>
            <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp className="w-5 h-5" />
                <span className="text-sm opacity-90">{t.distanceTraveled}</span>
              </div>
              <div className="text-3xl">{stats.totalDistance} {t.km}</div>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <h2 className="text-2xl mb-6 flex items-center gap-2 text-slate-900">
            <Award className="w-6 h-6 text-yellow-500" />
            {t.yourAchievements}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievementDefinitions.map(achievement => {
              const isUnlocked = stats.achievements.some(a => a.id === achievement.id);
              return (
                <div
                  key={achievement.id}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    isUnlocked
                      ? 'border-yellow-400 bg-yellow-50'
                      : 'border-slate-200 bg-slate-50 opacity-60'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="text-3xl">{achievement.iconKey}</div>
                    <div className="flex-1">
                      <h3 className="text-slate-900 mb-1">
                        {(t as any)[achievement.nameKey]}
                      </h3>
                      <p className="text-sm text-slate-600">
                        {(t as any)[achievement.descriptionKey]}
                      </p>
                      <div className="mt-2">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          isUnlocked
                            ? 'bg-yellow-200 text-yellow-800'
                            : 'bg-slate-200 text-slate-600'
                        }`}>
                          {isUnlocked ? t.unlocked : t.locked}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Upcoming Tours */}
        {upcomingBookings.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl mb-6 text-slate-900">{t.upcomingTours}</h2>
            <div className="space-y-4">
              {upcomingBookings.map(booking => (
                <BookingCard key={booking.id} booking={booking} />
              ))}
            </div>
          </div>
        )}

        {/* Past Tours */}
        {pastBookings.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl mb-6 text-slate-900">{t.completedTours}</h2>
            <div className="space-y-4">
              {pastBookings.map(booking => (
                <BookingCard key={booking.id} booking={booking} />
              ))}
            </div>
          </div>
        )}

        {/* Cancelled Tours */}
        {cancelledBookings.length > 0 && (
          <div>
            <h2 className="text-2xl mb-6 text-slate-900">{t.cancelled}</h2>
            <div className="space-y-4">
              {cancelledBookings.map(booking => (
                <BookingCard key={booking.id} booking={booking} />
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {bookings.length === 0 && (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Calendar className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-2xl mb-2 text-slate-900">{t.noBookings}</h3>
            <p className="text-slate-600 mb-6">
              {t.noBookingsDesc}
            </p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="bg-emerald-600 text-white px-8 py-3 rounded-lg hover:bg-emerald-700 transition-colors"
            >
              {t.viewTours}
            </button>
          </div>
        )}

        {/* Cancel Confirmation Modal */}
        {cancellingBookingId && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-md w-full p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl text-slate-900">{t.cancelConfirm}</h2>
                <button
                  onClick={() => setCancellingBookingId(null)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <p className="text-slate-600 mb-8">{t.cancelConfirmMessage}</p>
              <div className="flex gap-4">
                <button
                  onClick={() => setCancellingBookingId(null)}
                  className="flex-1 px-6 py-3 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  {t.keepBooking}
                </button>
                <button
                  onClick={() => cancelBooking(cancellingBookingId)}
                  className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  {t.cancelBooking}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
