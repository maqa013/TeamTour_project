import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../locales/translations';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface AIAssistantProps {
  onNavigate?: (page: string) => void;
}

export function AIAssistant({ onNavigate }: AIAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();
  const t = translations[language];

  useEffect(() => {
    if (messages.length === 0 && isOpen) {
      // Welcome message
      setMessages([
        {
          id: 1,
          text: t.aiWelcome,
          sender: 'ai',
          timestamp: new Date(),
        },
      ]);
    }
  }, [isOpen, t.aiWelcome]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const getAIResponse = (userMessage: string): string => {
    const msg = userMessage.toLowerCase();

    // Booking questions
    if (
      msg.includes('бронир') ||
      msg.includes('book') ||
      msg.includes('rezerv') ||
      msg.includes('заказ')
    ) {
      return language === 'ru'
        ? 'Для бронирования тура: 1) Выберите тур из каталога 2) Нажмите "Забронировать" 3) Войдите в систему или зарегистрируйтесь 4) Заполните форму бронирования. Наш менеджер свяжется с вами в течение 24 часов!'
        : language === 'en'
        ? 'To book a tour: 1) Choose a tour from the catalog 2) Click "Book Now" 3) Log in or register 4) Fill out the booking form. Our manager will contact you within 24 hours!'
        : 'Turu rezerv etmək üçün: 1) Kataloqdan turu seçin 2) "Rezerv Et" düyməsinə klikləyin 3) Sistemə daxil olun və ya qeydiyyatdan keçin 4) Rezervasiya formasını doldurun. Menecerımiz 24 saat ərzində sizinlə əlaqə saxlayacaq!';
    }

    // Tour information
    if (
      msg.includes('тур') ||
      msg.includes('tour') ||
      msg.includes('маршрут') ||
      msg.includes('route') ||
      msg.includes('marşrut')
    ) {
      return language === 'ru'
        ? 'У нас есть туры различной сложности: Шахдаг, Туфандаг, Хыналыг, Лагич и другие маршруты. Цены от 90₼ до 250₼. Все туры включают профессионального гида, питание, страховку и трансфер из Баку. Посмотрите раздел "Туры" на главной странице!'
        : language === 'en'
        ? 'We offer tours of various difficulty levels: Shahdag, Tufandag, Khinalug, Lahij and other routes. Prices from 90₼ to 250₼. All tours include a professional guide, meals, insurance and transfer from Baku. Check out the "Tours" section on the main page!'
        : 'Bizim müxtəlif çətinlik səviyyəli turlarımız var: Şahdağ, Tufandağ, Xınalıq, Lahıc və digər marşrutlar. Qiymətlər 90₼-dən 250₼-ə qədər. Bütün turlara peşəkar bələdçi, qida, sığorta və Bakıdan transfer daxildir. Əsas səhifədə "Turlar" bölməsinə baxın!';
    }

    // Registration/Login
    if (
      msg.includes('регистр') ||
      msg.includes('войт') ||
      msg.includes('вход') ||
      msg.includes('register') ||
      msg.includes('login') ||
      msg.includes('account') ||
      msg.includes('qeydiyyat') ||
      msg.includes('daxil')
    ) {
      return language === 'ru'
        ? 'Для регистрации нажмите кнопку "Войти" в правом верхнем углу, затем выберите "Зарегистрироваться". Вам нужен только username, email и пароль. Регистрация мгновенная, без подтверждения email. После регистрации вы сможете бронировать туры и отслеживать их в своем профиле!'
        : language === 'en'
        ? 'To register, click the "Login" button in the top right corner, then select "Register". You only need a username, email and password. Registration is instant, no email confirmation required. After registration, you can book tours and track them in your profile!'
        : 'Qeydiyyatdan keçmək üçün sağ yuxarı küncdə "Daxil ol" düyməsinə klikləyin, sonra "Qeydiyyatdan keç" seçin. Sizə yalnız istifadəçi adı, e-poçt və şifrə lazımdır. Qeydiyyat ani olur, e-poçt təsdiqi tələb olunmur. Qeydiyyatdan sonra turları rezerv edə və profilinizdə izləyə bilərsiniz!';
    }

    // Routes/Maps
    if (
      msg.includes('карт') ||
      msg.includes('map') ||
      msg.includes('траектори') ||
      msg.includes('trajectory') ||
      msg.includes('xəritə')
    ) {
      return language === 'ru'
        ? 'Для просмотра интерактивных карт маршрутов перейдите в раздел "Маршруты" в верхнем меню. Там вы найдете траектории всех наших туров с ключевыми точками, стартом и финишем. Также карты доступны в профиле после авторизации!'
        : language === 'en'
        ? 'To view interactive route maps, go to the "Routes" section in the top menu. There you will find trajectories of all our tours with key points, start and finish. Maps are also available in your profile after logging in!'
        : 'İnteraktiv marşrut xəritələrinə baxmaq üçün yuxarı menyuda "Marşrutlar" bölməsinə keçin. Orada bütün turlarımızın əsas nöqtələr, başlanğıc və son ilə trayektoriyalarını tapa bilərsiniz. Xəritələr sistemə daxil olduqdan sonra profilinizdə də mövcuddur!';
    }

    // Price questions
    if (
      msg.includes('цен') ||
      msg.includes('стоимост') ||
      msg.includes('price') ||
      msg.includes('cost') ||
      msg.includes('qiymət') ||
      msg.includes('ödəniş')
    ) {
      return language === 'ru'
        ? 'Цены на туры варьируются от 90₼ до 250₼ на человека. В стоимость входит: профессиональный гид, все питание, палатки и снаряжение, трансфер из Баку и страховка. Групповые скидки доступны для групп от 8 человек!'
        : language === 'en'
        ? 'Tour prices range from 90₼ to 250₼ per person. The price includes: professional guide, all meals, tents and equipment, transfer from Baku and insurance. Group discounts available for groups of 8 or more!'
        : 'Tur qiymətləri nəfər başına 90₼-dən 250₼-ə qədər dəyişir. Qiymətə daxildir: peşəkar bələdçi, bütün qidalar, çadırlar və avadanlıq, Bakıdan transfer və sığorta. 8 və ya daha çox nəfərlik qruplar üçün qrup endirimlər mövcuddur!';
    }

    // Contact information
    if (
      msg.includes('контакт') ||
      msg.includes('телефон') ||
      msg.includes('phone') ||
      msg.includes('contact') ||
      msg.includes('əlaqə') ||
      msg.includes('telefon')
    ) {
      return language === 'ru'
        ? 'Связаться с нами можно по телефону: +994 50 123 45 67, email: info@hikeazerbaijan.az. Наш офис в Баку: ул. Низами 15. Рабочие часы: Пн-Пт 9:00-18:00, Сб 10:00-15:00. Также посетите страницу "Контакты" для отправки сообщения!'
        : language === 'en'
        ? 'Contact us by phone: +994 50 123 45 67, email: info@hikeazerbaijan.az. Our office in Baku: Nizami str. 15. Working hours: Mon-Fri 9:00-18:00, Sat 10:00-15:00. Also visit the "Contact" page to send a message!'
        : 'Bizimlə əlaqə: telefon: +994 50 123 45 67, e-poçt: info@hikeazerbaijan.az. Bakıdakı ofisimiz: Nizami küç. 15. İş saatları: B.e-Cü 9:00-18:00, Şə 10:00-15:00. Mesaj göndərmək üçün "Əlaqə" səhifəsinə də baxa bilərsiniz!';
    }

    // About us
    if (
      msg.includes('о нас') ||
      msg.includes('компани') ||
      msg.includes('about') ||
      msg.includes('company') ||
      msg.includes('haqqı')
    ) {
      return language === 'ru'
        ? 'HikeAzerbaijan основана в 2016 году. За 8 лет мы провели более 5000 туристов по горам Азербайджана. У нас 15+ уникальных маршрутов и команда сертифицированных гидов. Подробнее читайте на странице "О нас"!'
        : language === 'en'
        ? 'HikeAzerbaijan was founded in 2016. Over 8 years, we have guided more than 5000 tourists through the mountains of Azerbaijan. We have 15+ unique routes and a team of certified guides. Read more on the "About" page!'
        : 'HikeAzerbaijan 2016-cı ildə təsis edilmişdir. 8 il ərzində 5000-dən çox turisti Azərbaycan dağları ilə gəzdirdik. Bizim 15+ unikal marşrutumuz və sertifikatlı bələdçilər komandamız var. Daha ətraflı "Haqqımızda" səhifəsində oxuyun!';
    }

    // Equipment questions
    if (
      msg.includes('снаряжен') ||
      msg.includes('equipment') ||
      msg.includes('gear') ||
      msg.includes('avadanlıq')
    ) {
      return language === 'ru'
        ? 'Все необходимое снаряжение включено: палатки, спальные мешки, треккинговые палки. Вам нужна только удобная обувь, одежда по погоде и личные вещи. Полный список вышлем после бронирования!'
        : language === 'en'
        ? 'All necessary equipment is included: tents, sleeping bags, trekking poles. You only need comfortable shoes, weather-appropriate clothing and personal items. We\'ll send you a complete list after booking!'
        : 'Bütün lazımi avadanlıq daxildir: çadırlar, yataq kisələri, trekinq çubuqları. Sizə yalnız rahat ayaqqabı, hava şəraitinə uyğun geyim və şəxsi əşyalar lazımdır. Rezervasiyadan sonra tam siyahını göndərəcəyik!';
    }

    // Difficulty/Fitness level
    if (
      msg.includes('сложност') ||
      msg.includes('подготовк') ||
      msg.includes('difficulty') ||
      msg.includes('fitness') ||
      msg.includes('çətinlik') ||
      msg.includes('hazırlıq')
    ) {
      return language === 'ru'
        ? 'У нас туры трех уровней: Легкий (для начинающих), Средний (средняя физическая форма) и Сложный (хорошая подготовка). Выбирайте исходя из вашего опыта. Наши гиды всегда помогут и поддержат вас!'
        : language === 'en'
        ? 'We have tours of three levels: Easy (for beginners), Medium (moderate fitness) and Hard (good preparation). Choose based on your experience. Our guides will always help and support you!'
        : 'Bizim üç səviyyəli turlarımız var: Asan (yeni başlayanlar üçün), Orta (orta fiziki forma) və Çətin (yaxşı hazırlıq). Təcrübənizə əsasən seçin. Bələdçilərimiz həmişə sizə kömək edəcək və dəstək göstərəcək!';
    }

    // Season/Weather
    if (
      msg.includes('сезон') ||
      msg.includes('погод') ||
      msg.includes('season') ||
      msg.includes('weather') ||
      msg.includes('mövsüm') ||
      msg.includes('hava')
    ) {
      return language === 'ru'
        ? 'Основной сезон для походов: май-октябрь. Летом температура комфортная (+15-25°C), осенью живописные пейзажи. Зимние туры доступны для опытных туристов. Проверяйте сезонность каждого тура в описании!'
        : language === 'en'
        ? 'Main hiking season: May-October. Summer temperatures are comfortable (+15-25°C), autumn landscapes are picturesque. Winter tours available for experienced hikers. Check seasonality of each tour in the description!'
        : 'Əsas yürüyüş mövsümü: may-oktyabr. Yayda temperatur rahatdır (+15-25°C), payızda mənzərələr təsvirlidir. Qış turları təcrübəli turistlər üçün mövcuddur. Hər turun mövsümiliyini təsvirində yoxlayın!';
    }

    // Group tours
    if (
      msg.includes('групп') ||
      msg.includes('group') ||
      msg.includes('qrup')
    ) {
      return language === 'ru'
        ? 'Максимальный размер группы обычно 12 человек для комфортного опыта. Мы организуем как групповые, так и индивидуальные туры. Для групп от 8 человек доступны специальные скидки. Свяжитесь с нами для деталей!'
        : language === 'en'
        ? 'Maximum group size is usually 12 people for a comfortable experience. We organize both group and private tours. Special discounts available for groups of 8 or more. Contact us for details!'
        : 'Rahat təcrübə üçün maksimum qrup ölçüsü adətən 12 nəfərdir. Biz həm qrup, həm də fərdi turlar təşkil edirik. 8 və ya daha çox nəfərdən ibarət qruplar üçün xüsusi endirimlər mövcuddur. Təfərrüatlar üçün bizimlə əlaqə saxlayın!';
    }

    // Cancellation policy
    if (
      msg.includes('отмен') ||
      msg.includes('cancel') ||
      msg.includes('возврат') ||
      msg.includes('refund') ||
      msg.includes('ləğv')
    ) {
      return language === 'ru'
        ? 'Бесплатная отмена возможна за 48 часов до начала тура. При отмене позже взимается 50% стоимости. При форс-мажорных обстоятельствах возврат полной суммы. Все детали в условиях бронирования!'
        : language === 'en'
        ? 'Free cancellation available 48 hours before tour start. Later cancellation incurs 50% charge. Full refund in case of force majeure. All details in booking terms!'
        : 'Turun başlamazdan 48 saat əvvəl pulsuz ləğv mümkündür. Sonrakı ləğv halında 50% ödəniş tələb olunur. Fors-major hallarda tam geri ödəmə. Bütün təfərrüatlar rezervasiya şərtlərində!';
    }

    // Navigation help
    if (
      msg.includes('навигац') ||
      msg.includes('navigate') ||
      msg.includes('где') ||
      msg.includes('where') ||
      msg.includes('найт') ||
      msg.includes('find') ||
      msg.includes('harda') ||
      msg.includes('haraya')
    ) {
      return language === 'ru'
        ? 'Навигация по сайту: "Туры" - каталог всех туров, "Маршруты" - интерактивные карты, "О нас" - информация о компании, "Контакты" - связаться с нами. После входа доступен "Профиль" с вашими бронированиями!'
        : language === 'en'
        ? 'Site navigation: "Tours" - tour catalog, "Routes" - interactive maps, "About" - company info, "Contact" - get in touch. After login, access "Profile" with your bookings!'
        : 'Sayt naviqasiyası: "Turlar" - tur kataloqu, "Marşrutlar" - interaktiv xəritələr, "Haqqımızda" - şirkət haqqında, "Əlaqə" - bizimlə əlaqə. Sistemə daxil olduqdan sonra rezervasiyalarınızla "Profil" əlçatandır!';
    }

    // Default response
    return language === 'ru'
      ? 'Извините, я не совсем понял ваш вопрос. Попробуйте спросить о турах, бронировании, регистрации, маршрутах или ценах. Или напишите "контакты" для связи с нашей командой!'
      : language === 'en'
      ? 'Sorry, I didn\'t quite understand your question. Try asking about tours, booking, registration, routes or prices. Or type "contact" to get in touch with our team!'
      : 'Bağışlayın, sualınızı tam başa düşmədim. Turlar, rezervasiya, qeydiyyat, marşrutlar və ya qiymətlər haqqında soruşmağa çalışın. Və ya komandamızla əlaqə saxlamaq üçün "əlaqə" yazın!';
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking
    setTimeout(() => {
      const aiResponse = getAIResponse(input);
      const aiMessage: Message = {
        id: messages.length + 2,
        text: aiResponse,
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 800);
  };

  const handleSuggestedQuestion = (question: string) => {
    setInput(question);
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-br from-[#2275d4] to-[#1a5fb0] text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        aria-label={t.aiAssistant}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-slate-700 flex flex-col h-[600px] max-h-[calc(100vh-8rem)] overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#2275d4] to-[#1a5fb0] text-white p-4 rounded-t-2xl">
            <h3 className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              {t.aiAssistant}
            </h3>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-slate-700">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    message.sender === 'user'
                      ? 'bg-[#2275d4] text-white rounded-br-none'
                      : 'bg-white dark:bg-slate-600 text-gray-800 dark:text-white border border-gray-200 dark:border-slate-500 rounded-bl-none'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-slate-600 text-gray-800 dark:text-white border border-gray-200 dark:border-slate-500 p-3 rounded-2xl rounded-bl-none">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 dark:bg-gray-300 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 dark:bg-gray-300 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-gray-400 dark:bg-gray-300 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}

            {/* Suggested Questions - only show at start */}
            {messages.length === 1 && (
              <div className="pt-2">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{t.aiSuggestedQuestions}</p>
                <div className="space-y-2">
                  <button
                    onClick={() => handleSuggestedQuestion(t.aiQ1)}
                    className="w-full text-left text-sm bg-white dark:bg-slate-600 hover:bg-gray-50 dark:hover:bg-slate-500 text-gray-700 dark:text-white p-2 rounded-lg border border-gray-200 dark:border-slate-500 transition-colors"
                  >
                    {t.aiQ1}
                  </button>
                  <button
                    onClick={() => handleSuggestedQuestion(t.aiQ2)}
                    className="w-full text-left text-sm bg-white dark:bg-slate-600 hover:bg-gray-50 dark:hover:bg-slate-500 text-gray-700 dark:text-white p-2 rounded-lg border border-gray-200 dark:border-slate-500 transition-colors"
                  >
                    {t.aiQ2}
                  </button>
                  <button
                    onClick={() => handleSuggestedQuestion(t.aiQ3)}
                    className="w-full text-left text-sm bg-white dark:bg-slate-600 hover:bg-gray-50 dark:hover:bg-slate-500 text-gray-700 dark:text-white p-2 rounded-lg border border-gray-200 dark:border-slate-500 transition-colors"
                  >
                    {t.aiQ3}
                  </button>
                  <button
                    onClick={() => handleSuggestedQuestion(t.aiQ4)}
                    className="w-full text-left text-sm bg-white dark:bg-slate-600 hover:bg-gray-50 dark:hover:bg-slate-500 text-gray-700 dark:text-white p-2 rounded-lg border border-gray-200 dark:border-slate-500 transition-colors"
                  >
                    {t.aiQ4}
                  </button>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-white dark:bg-slate-800 border-t border-gray-200 dark:border-slate-700">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder={t.aiPlaceholder}
                className="flex-1 px-4 py-2 bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 text-slate-900 dark:text-white rounded-full focus:outline-none focus:border-[#2275d4] text-sm"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className="bg-[#2275d4] text-white p-2 rounded-full hover:bg-[#1a5fb0] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label={t.aiSend}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
