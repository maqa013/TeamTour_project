import { useState } from 'react';
import { Tour } from '../data/tours';
import { User, Booking } from '../types';
import { X, CheckCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface BookingModalProps {
  tour: Tour;
  user: User;
  onClose: () => void;
  onBookingComplete: (booking: Booking) => void;
}

export function BookingModal({ tour, user, onClose, onBookingComplete }: BookingModalProps) {
  const { t } = useLanguage();
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [formData, setFormData] = useState({
    fullName: user.fullName,
    email: user.email,
    phone: '',
    participants: '1',
    date: '',
    comments: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const booking: Booking = {
      id: Date.now().toString(),
      userId: user.id,
      tourId: tour.id,
      tourName: tour.name,
      date: formData.date,
      participants: parseInt(formData.participants),
      totalPrice: tour.price * parseInt(formData.participants),
      status: new Date(formData.date) > new Date() ? 'upcoming' : 'completed',
      bookedAt: new Date().toISOString(),
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      comments: formData.comments
    };

    onBookingComplete(booking);
    setStep('success');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const totalPrice = tour.price * parseInt(formData.participants || '1');

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {step === 'form' ? (
          <>
            <div className="sticky top-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 p-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl text-slate-900 dark:text-slate-100">{t.bookingTitle}</h2>
                <p className="text-slate-600 dark:text-slate-400">{tour.name}</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors text-slate-900 dark:text-slate-100"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-4 mb-6">
                <div>
                  <label htmlFor="fullName" className="block text-sm mb-2 text-slate-700 dark:text-slate-300">
                    {t.fullName} *
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#2275d4]"
                    placeholder="Иван Иванов"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-sm mb-2 text-slate-700 dark:text-slate-300">
                      {t.email} *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#2275d4]"
                      placeholder="ivan@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm mb-2 text-slate-700 dark:text-slate-300">
                      {t.phone} *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#2275d4]"
                      placeholder="+994 50 850 79 19"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="participants" className="block text-sm mb-2 text-slate-700 dark:text-slate-300">
                      {t.participants} *
                    </label>
                    <select
                      id="participants"
                      name="participants"
                      required
                      value={formData.participants}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#2275d4]"
                    >
                      {Array.from({ length: tour.maxGroupSize }, (_, i) => i + 1).map(num => (
                        <option key={num} value={num}>{num} {t.people}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="date" className="block text-sm mb-2 text-slate-700 dark:text-slate-300">
                      {t.date} *
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      required
                      value={formData.date}
                      onChange={handleChange}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#2275d4]"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="comments" className="block text-sm mb-2 text-slate-700 dark:text-slate-300">
                    {t.comments}
                  </label>
                  <textarea
                    id="comments"
                    name="comments"
                    value={formData.comments}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#2275d4]"
                    placeholder="Особые требования, диетические предпочтения и т.д."
                  />
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-4 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-slate-600 dark:text-slate-400">{t.pricePerPerson}</span>
                  <span className="text-slate-900 dark:text-slate-100">{t.currency}{tour.price}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-slate-600 dark:text-slate-400">{t.participants}:</span>
                  <span className="text-slate-900 dark:text-slate-100">{formData.participants}</span>
                </div>
                <div className="border-t border-slate-200 dark:border-slate-600 pt-2 mt-2 flex justify-between items-center">
                  <span className="text-slate-900 dark:text-slate-100">{t.total}</span>
                  <span className="text-2xl text-[#2275d4] dark:text-[#3b8ff3]">{t.currency}{totalPrice}</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#2275d4] text-white py-4 rounded-lg hover:bg-[#1b5daa] transition-colors"
              >
                {t.submitBooking}
              </button>

              <p className="text-xs text-slate-500 dark:text-slate-400 text-center mt-4">
                {t.bookingMessage}
              </p>
            </form>
          </>
        ) : (
          <div className="p-12 text-center">
            <div className="w-20 h-20 bg-[#2275d4]/10 dark:bg-[#2275d4]/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-[#2275d4] dark:text-[#3b8ff3]" />
            </div>
            <h2 className="text-3xl mb-4 text-slate-900 dark:text-slate-100">{t.bookingSuccess}</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
              {t.bookingMessage}
            </p>
            <button
              onClick={onClose}
              className="bg-[#2275d4] text-white px-8 py-3 rounded-lg hover:bg-[#1b5daa] transition-colors"
            >
              {t.close}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
