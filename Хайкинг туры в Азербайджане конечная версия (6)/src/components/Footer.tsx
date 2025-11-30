import { Mountain, Mail, Phone, MapPin, Instagram, Facebook, Map } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface FooterProps {
  onRoutesClick: () => void;
  onContactClick: () => void;
  onAboutClick: () => void;
}

export function Footer({ onRoutesClick, onContactClick, onAboutClick }: FooterProps) {
  const { t } = useLanguage();
  
  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Mountain className="w-8 h-8 text-emerald-500" />
              <div className="flex flex-col">
                <span className="text-white">HikeAzerbaijan</span>
                <span className="text-xs text-slate-400">Горные приключения</span>
              </div>
            </div>
            <p className="text-slate-400 mb-4">
              Организуем незабываемые хайкинг-туры по самым красивым горным маршрутам Азербайджана. 
              Профессиональные гиды, безопасность и комфорт на каждом шагу.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-emerald-600 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-emerald-600 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-white">{t.quickLinks}</h3>
            <ul className="space-y-2">
              <li>
                <a href="#tours" className="text-slate-400 hover:text-emerald-500 transition-colors">
                  {t.tours}
                </a>
              </li>
              <li>
                <button 
                  onClick={onRoutesClick}
                  className="text-slate-400 hover:text-emerald-500 transition-colors flex items-center gap-2"
                >
                  <Map className="w-4 h-4" />
                  {t.routes}
                </button>
              </li>
              <li>
                <button
                  onClick={onAboutClick}
                  className="text-slate-400 hover:text-emerald-500 transition-colors"
                >
                  {t.about}
                </button>
              </li>
              <li>
                <button 
                  onClick={onContactClick}
                  className="text-slate-400 hover:text-emerald-500 transition-colors"
                >
                  {t.contact}
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 text-white">{t.contactInfo}</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-slate-400">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span className="text-sm">Баку, Азербайджан</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-emerald-500" />
                <a href="tel:+994123456789" className="text-slate-400 hover:text-emerald-500 transition-colors text-sm">
                  +994 12 345 67 89
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-emerald-500" />
                <a href="mailto:info@hikeazerbaijan.az" className="text-slate-400 hover:text-emerald-500 transition-colors text-sm">
                  info@hikeazerbaijan.az
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8">
          <p className="text-center text-slate-400 text-sm">
            © 2025 {t.companyName}. {t.allRightsReserved}
          </p>
        </div>
      </div>
    </footer>
  );
}
