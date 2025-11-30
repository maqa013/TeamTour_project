import { useState, useEffect } from 'react';
import { Review, User } from '../types';
import { tours } from '../data/tours';
import { defaultReviews } from '../data/defaultReviews';
import { Star, Filter, MessageSquare } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ReviewsPageProps {
  user: User | null;
}

export function ReviewsPage({ user }: ReviewsPageProps) {
  const { t, language } = useLanguage();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [filterTourId, setFilterTourId] = useState<number | null>(null);
  const [filterRating, setFilterRating] = useState<number | null>(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [newReview, setNewReview] = useState({
    tourId: 0,
    rating: 5,
    comment: '',
  });

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = () => {
    const savedReviews = JSON.parse(localStorage.getItem('reviews') || '[]');
    
    // If no reviews in localStorage, initialize with default reviews
    if (savedReviews.length === 0) {
      localStorage.setItem('reviews', JSON.stringify(defaultReviews));
      setReviews(defaultReviews);
    } else {
      setReviews(savedReviews);
    }
  };

  const submitReview = () => {
    if (!user || !newReview.tourId || !newReview.comment.trim()) return;

    const tour = tours.find(t => t.id === newReview.tourId);
    if (!tour) return;

    const review: Review = {
      id: Date.now().toString(),
      userId: user.id,
      userName: user.fullName,
      tourId: newReview.tourId,
      tourName: getTourName(tour),
      rating: newReview.rating,
      comment: newReview.comment,
      createdAt: new Date().toISOString(),
      difficulty: tour.difficultyKey as 'easy' | 'medium' | 'hard',
    };

    const updatedReviews = [...reviews, review];
    localStorage.setItem('reviews', JSON.stringify(updatedReviews));
    setReviews(updatedReviews);
    setShowReviewModal(false);
    setNewReview({ tourId: 0, rating: 5, comment: '' });
  };

  const getTourName = (tour: typeof tours[0]) => {
    return t[tour.nameKey as keyof typeof t] as string;
  };

  const filteredReviews = reviews.filter(review => {
    if (filterTourId && review.tourId !== filterTourId) return false;
    if (filterRating && review.rating < filterRating) return false;
    return true;
  });

  const renderStars = (rating: number, interactive: boolean = false, onRate?: (rating: number) => void) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map(star => (
          <Star
            key={star}
            className={`w-5 h-5 ${
              star <= rating 
                ? 'fill-yellow-400 text-yellow-400' 
                : 'text-slate-300 dark:text-slate-600'
            } ${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : ''}`}
            onClick={() => interactive && onRate && onRate(star)}
          />
        ))}
      </div>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(language === 'ru' ? 'ru-RU' : language === 'az' ? 'az-AZ' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl mb-4 text-slate-100">
            {t.reviewsTitle}
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            {t.reviewsSubtitle}
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-4 mb-8">
          {/* Filters */}
          <div className="flex items-center gap-4 flex-1 flex-wrap">
            <Filter className="w-5 h-5 text-slate-400" />
            
            {/* Tour Filter */}
            <select
              value={filterTourId || ''}
              onChange={(e) => setFilterTourId(e.target.value ? Number(e.target.value) : null)}
              className="px-4 py-2 border border-slate-700 rounded-lg bg-slate-900 text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#2275d4]"
            >
              <option value="">{t.allTours}</option>
              {tours.map(tour => (
                <option key={tour.id} value={tour.id}>
                  {getTourName(tour)}
                </option>
              ))}
            </select>

            {/* Rating Filter */}
            <select
              value={filterRating || ''}
              onChange={(e) => setFilterRating(e.target.value ? Number(e.target.value) : null)}
              className="px-4 py-2 border border-slate-700 rounded-lg bg-slate-900 text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#2275d4]"
            >
              <option value="">{t.allRatings}</option>
              <option value="4">4+ {t.starsAndAbove}</option>
              <option value="3">3+ {t.starsAndAbove}</option>
              <option value="2">2+ {t.starsAndAbove}</option>
            </select>
          </div>

          {/* Write Review Button */}
          <button
            onClick={() => {
              if (!user) {
                alert(t.loginToReview || 'Please login to write a review');
                return;
              }
              setShowReviewModal(true);
            }}
            className="bg-[#2275d4] text-white px-6 py-2 rounded-lg hover:bg-[#1b5daa] transition-colors flex items-center gap-2"
          >
            <MessageSquare className="w-5 h-5" />
            {t.writeReview}
          </button>
        </div>

        {/* Reviews List */}
        <div className="space-y-6">
          {filteredReviews.length > 0 ? (
            filteredReviews.map(review => (
              <div key={review.id} className="bg-slate-900 rounded-xl shadow-md p-6 border border-slate-800">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl mb-1 text-slate-100">{review.userName}</h3>
                    <p className="text-sm text-slate-400">
                      {formatDate(review.createdAt)}
                    </p>
                  </div>
                  {renderStars(review.rating)}
                </div>

                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-[#2275d4]/20 text-[#3b8ff3] rounded-full text-sm">
                    {review.tourName}
                  </span>
                </div>

                <p className="text-slate-300 leading-relaxed">{review.comment}</p>
              </div>
            ))
          ) : (
            <div className="bg-slate-900 rounded-xl shadow-md p-12 text-center border border-slate-800">
              <MessageSquare className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <h3 className="text-2xl mb-2 text-slate-100">{t.noReviews}</h3>
              <p className="text-slate-400">{t.noReviewsDesc}</p>
            </div>
          )}
        </div>

        {/* Review Modal */}
        {showReviewModal && user && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
            <div className="bg-slate-900 rounded-2xl max-w-lg w-full p-8 border border-slate-800">
              <h2 className="text-2xl mb-6 text-slate-100">{t.writeReview}</h2>

              {/* Tour Select */}
              <div className="mb-4">
                <label className="block text-slate-300 mb-2">{t.selectTour}</label>
                <select
                  value={newReview.tourId}
                  onChange={(e) => setNewReview({ ...newReview, tourId: Number(e.target.value) })}
                  className="w-full px-4 py-2 border border-slate-700 rounded-lg bg-slate-800 text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#2275d4]"
                >
                  <option value={0}>{t.selectTour}</option>
                  {tours.map(tour => (
                    <option key={tour.id} value={tour.id}>
                      {getTourName(tour)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Rating */}
              <div className="mb-4">
                <label className="block text-slate-300 mb-2">{t.yourRating}</label>
                {renderStars(newReview.rating, true, (rating) => setNewReview({ ...newReview, rating }))}
              </div>

              {/* Comment */}
              <div className="mb-6">
                <label className="block text-slate-300 mb-2">{t.yourReview}</label>
                <textarea
                  value={newReview.comment}
                  onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                  placeholder={t.writeYourReview}
                  rows={5}
                  className="w-full px-4 py-2 border border-slate-700 rounded-lg bg-slate-800 text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#2275d4] resize-none placeholder:text-slate-500"
                />
              </div>

              {/* Actions */}
              <div className="flex gap-4">
                <button
                  onClick={() => {
                    setShowReviewModal(false);
                    setNewReview({ tourId: 0, rating: 5, comment: '' });
                  }}
                  className="flex-1 px-6 py-3 border border-slate-700 rounded-lg text-slate-300 hover:bg-slate-800 transition-colors"
                >
                  {t.close}
                </button>
                <button
                  onClick={submitReview}
                  disabled={!newReview.tourId || !newReview.comment.trim()}
                  className="flex-1 px-6 py-3 bg-[#2275d4] text-white rounded-lg hover:bg-[#1b5daa] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {t.submitReview}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
