import { useState, useEffect } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ToursGrid } from './components/ToursGrid';
import { TourDetail } from './components/TourDetail';
import { BookingModal } from './components/BookingModal';
import { Footer } from './components/Footer';
import { LoginModal } from './components/LoginModal';
import { RegisterModal } from './components/RegisterModal';
import { Profile } from './components/Profile';
import { RoutesPage } from './components/RoutesPage';
import { ContactPage } from './components/ContactPage';
import { AboutPage } from './components/AboutPage';
import { ReviewsPage } from './components/ReviewsPage';
import { AIAssistant } from './components/AIAssistant';
import { tours } from './data/tours';
import { User, Booking } from './types';

type Page = 'home' | 'profile' | 'routes' | 'contact' | 'about' | 'reviews';

function AppContent() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedTour, setSelectedTour] = useState<number | null>(null);
  const [bookingTour, setBookingTour] = useState<number | null>(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  const handleTourSelect = (tourId: number) => {
    setSelectedTour(tourId);
    setCurrentPage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    setSelectedTour(null);
    setCurrentPage('home');
  };

  const handleBookNow = (tourId: number) => {
    if (!currentUser) {
      setShowLogin(true);
      return;
    }
    setBookingTour(tourId);
  };

  const handleCloseBooking = () => {
    setBookingTour(null);
  };

  const handleBookingComplete = (booking: Booking) => {
    if (!currentUser) return;

    // Save booking to localStorage
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    bookings.push(booking);
    localStorage.setItem('bookings', JSON.stringify(bookings));

    handleCloseBooking();
  };

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
    setShowLogin(false);
    setShowRegister(false);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    setCurrentPage('home');
    setSelectedTour(null);
  };

  const handleShowProfile = () => {
    setCurrentPage('profile');
    setSelectedTour(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShowRoutes = () => {
    setCurrentPage('routes');
    setSelectedTour(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShowContact = () => {
    setCurrentPage('contact');
    setSelectedTour(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShowAbout = () => {
    setCurrentPage('about');
    setSelectedTour(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShowReviews = () => {
    setCurrentPage('reviews');
    setSelectedTour(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateHome = () => {
    setCurrentPage('home');
    setSelectedTour(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentTour = selectedTour !== null ? tours.find(t => t.id === selectedTour) : null;
  const currentBookingTour = bookingTour !== null ? tours.find(t => t.id === bookingTour) : null;

  return (
    <div className="min-h-screen bg-slate-900 transition-colors">
      <Header 
        onLogoClick={handleNavigateHome}
        currentUser={currentUser}
        onLoginClick={() => setShowLogin(true)}
        onProfileClick={handleShowProfile}
        onLogout={handleLogout}
        onRoutesClick={handleShowRoutes}
        onContactClick={handleShowContact}
        onAboutClick={handleShowAbout}
        onReviewsClick={handleShowReviews}
        currentPage={currentPage}
      />
      
      {currentPage === 'home' && selectedTour === null && (
        <>
          <Hero onExploreTours={() => {
            const toursSection = document.getElementById('tours');
            toursSection?.scrollIntoView({ behavior: 'smooth' });
          }} />
          <ToursGrid tours={tours} onTourSelect={handleTourSelect} />
        </>
      )}

      {currentPage === 'home' && selectedTour !== null && currentTour && (
        <TourDetail 
          tour={currentTour} 
          onBack={handleBackToHome}
          onBookNow={handleBookNow}
        />
      )}

      {currentPage === 'profile' && currentUser && (
        <Profile 
          user={currentUser}
          onTourSelect={handleTourSelect}
        />
      )}

      {currentPage === 'routes' && (
        <RoutesPage 
          tours={tours}
          onTourSelect={handleTourSelect}
        />
      )}

      {currentPage === 'contact' && (
        <ContactPage />
      )}

      {currentPage === 'about' && (
        <AboutPage />
      )}

      {currentPage === 'reviews' && (
        <ReviewsPage user={currentUser} />
      )}

      {bookingTour !== null && currentBookingTour && currentUser && (
        <BookingModal 
          tour={currentBookingTour}
          user={currentUser}
          onClose={handleCloseBooking}
          onBookingComplete={handleBookingComplete}
        />
      )}

      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onLogin={handleLogin}
          onSwitchToRegister={() => {
            setShowLogin(false);
            setShowRegister(true);
          }}
        />
      )}

      {showRegister && (
        <RegisterModal
          onClose={() => setShowRegister(false)}
          onRegister={handleLogin}
          onSwitchToLogin={() => {
            setShowRegister(false);
            setShowLogin(true);
          }}
        />
      )}

      <Footer 
        onRoutesClick={handleShowRoutes}
        onContactClick={handleShowContact}
        onAboutClick={handleShowAbout}
      />

      <AIAssistant />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </ThemeProvider>
  );
}
