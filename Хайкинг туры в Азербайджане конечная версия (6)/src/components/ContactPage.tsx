import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export function ContactPage() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save message to localStorage
    const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
    messages.push({
      ...formData,
      id: Date.now().toString(),
      submittedAt: new Date().toISOString()
    });
    localStorage.setItem('contactMessages', JSON.stringify(messages));

    setIsSubmitted(true);
    
    // Reset after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl mb-4 text-slate-900 dark:text-slate-100">
            {t.contactTitle}
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            {t.contactSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info Cards */}
          <div className="lg:col-span-1 space-y-6">
            {/* Phone Card */}
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-md p-6">
              <div className="w-12 h-12 bg-[#2275d4]/10 dark:bg-[#2275d4]/20 rounded-lg flex items-center justify-center mb-4">
                <Phone className="w-6 h-6 text-[#2275d4] dark:text-[#3b8ff3]" />
              </div>
              <h3 className="mb-2 text-slate-900 dark:text-slate-100">{t.phoneTitle}</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mb-3">
                {t.phoneDesc}
              </p>
              <a 
                href="tel:+994508507919" 
                className="text-[#2275d4] dark:text-[#3b8ff3] hover:text-[#1b5daa] dark:hover:text-[#5aa4f7] transition-colors"
              >
                +994 50 850 79 19
              </a>
            </div>

            {/* Email Card */}
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-md p-6">
              <div className="w-12 h-12 bg-[#2275d4]/10 dark:bg-[#2275d4]/20 rounded-lg flex items-center justify-center mb-4">
                <Mail className="w-6 h-6 text-[#2275d4] dark:text-[#3b8ff3]" />
              </div>
              <h3 className="mb-2 text-slate-900 dark:text-slate-100">{t.emailTitle}</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mb-3">
                {t.emailDesc}
              </p>
              <a 
                href="mailto:info@hikeazerbaijan.az" 
                className="text-[#2275d4] dark:text-[#3b8ff3] hover:text-[#1b5daa] dark:hover:text-[#5aa4f7] transition-colors"
              >
                info@hikeazerbaijan.az
              </a>
            </div>

            {/* Office Card */}
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-md p-6">
              <div className="w-12 h-12 bg-[#2275d4]/10 dark:bg-[#2275d4]/20 rounded-lg flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-[#2275d4] dark:text-[#3b8ff3]" />
              </div>
              <h3 className="mb-2 text-slate-900 dark:text-slate-100">{t.officeTitle}</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mb-3">
                {t.officeDesc}
              </p>
              <address className="text-slate-700 dark:text-slate-300 not-italic">
                Port Baku South Tower, Floor 15<br />
                Баку, Азербайджан<br />
                AZ1000
              </address>
            </div>

            {/* Working Hours Card */}
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-md p-6">
              <div className="w-12 h-12 bg-[#2275d4]/10 dark:bg-[#2275d4]/20 rounded-lg flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-[#2275d4] dark:text-[#3b8ff3]" />
              </div>
              <h3 className="mb-2 text-slate-900 dark:text-slate-100">{t.workingHours}</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">{t.monday}</span>
                  <span className="text-slate-900 dark:text-slate-100">9:00 - 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">{t.saturday}</span>
                  <span className="text-slate-900 dark:text-slate-100">10:00 - 16:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">{t.sunday}</span>
                  <span className="text-slate-900 dark:text-slate-100">{t.closed}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-md p-8">
              <h2 className="text-2xl mb-6 text-slate-900 dark:text-slate-100">{t.sendMessage}</h2>
              
              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="w-20 h-20 bg-[#2275d4]/10 dark:bg-[#2275d4]/20 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle className="w-12 h-12 text-[#2275d4] dark:text-[#3b8ff3]" />
                  </div>
                  <h3 className="text-2xl mb-2 text-slate-900 dark:text-slate-100">{t.messageSent}</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-center">
                    {t.messageSentDesc}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="space-y-5">
                    <div>
                      <label htmlFor="name" className="block text-sm mb-2 text-slate-700 dark:text-slate-300">
                        {t.name} *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#2275d4]"
                        placeholder="Ваше имя"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
                          placeholder="email@example.com"
                        />
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-sm mb-2 text-slate-700 dark:text-slate-300">
                          {t.phone}
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#2275d4]"
                          placeholder="+994 50 850 79 19"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm mb-2 text-slate-700 dark:text-slate-300">
                        {t.subject} *
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#2275d4]"
                      >
                        <option value="">{t.selectSubject}</option>
                        <option value="booking">{t.bookingQuestion}</option>
                        <option value="tour-info">{t.tourInfo}</option>
                        <option value="custom-tour">{t.customTour}</option>
                        <option value="equipment">{t.equipment}</option>
                        <option value="group">{t.groupBooking}</option>
                        <option value="feedback">{t.feedback}</option>
                        <option value="other">{t.other}</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm mb-2 text-slate-700 dark:text-slate-300">
                        {t.message} *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleChange}
                        rows={6}
                        className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#2275d4] resize-none"
                        placeholder="Расскажите нам о вашем запросе..."
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="mt-6 w-full bg-[#2275d4] text-white py-4 rounded-lg hover:bg-[#1b5daa] transition-colors flex items-center justify-center gap-2"
                  >
                    <Send className="w-5 h-5" />
                    <span>{t.sendButton}</span>
                  </button>

                  <p className="text-xs text-slate-500 dark:text-slate-400 text-center mt-4">
                    Мы обрабатываем ваши данные в соответствии с нашей политикой конфиденциальности
                  </p>
                </form>
              )}
            </div>

            {/* Map Placeholder */}
            <div className="mt-8 bg-white dark:bg-slate-900 rounded-xl shadow-md overflow-hidden">
              <div className="relative h-96 bg-slate-200 dark:bg-slate-800">
                {/* Simple map representation */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-16 h-16 text-[#2275d4] dark:text-[#3b8ff3] mx-auto mb-4" />
                    <h3 className="text-xl mb-2 text-slate-900 dark:text-slate-100">Наше расположение</h3>
                    <p className="text-slate-600 dark:text-slate-400">Баку, Азербайджан</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">Port Baku South Tower, Floor 15, AZ1000</p>
                  </div>
                </div>
                {/* Decorative grid */}
                <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#2275d4" strokeWidth="1"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl mb-4 text-slate-900 dark:text-slate-100">{t.faqTitle}</h2>
            <p className="text-slate-600 dark:text-slate-400">{t.faqSubtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-md p-6">
              <h3 className="mb-3 text-slate-900 dark:text-slate-100">Как забронировать тур?</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                Выберите интересующий вас тур на главной странице, нажмите "Забронировать" и заполните форму. 
                После получения заявки наш менеджер свяжется с вами для подтверждения.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-md p-6">
              <h3 className="mb-3 text-slate-900 dark:text-slate-100">Какое снаряжение предоставляется?</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                Мы предоставляем все необходимое снаряжение: палатки, спальные мешки, треккинговые палки. 
                Вам нужна только личная одежда и обувь для хайкинга.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-md p-6">
              <h3 className="mb-3 text-slate-900 dark:text-slate-100">Можно ли отменить бронирование?</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                Да, бесплатная отмена возможна за 48 часов до начала тура. 
                При более поздней отмене возвращается 50% стоимости.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-md p-6">
              <h3 className="mb-3 text-slate-900 dark:text-slate-100">Нужна ли специальная подготовка?</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                Это зависит от выбранного тура. Для легких маршрутов достаточно базовой физической формы. 
                Для сложных туров рекомендуем предварительную подготовку.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
