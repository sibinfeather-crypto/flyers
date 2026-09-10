import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { BUSINESS_INFO } from '../data/catalog';
import { getWhatsAppGeneralInquiryUrl } from '../utils/whatsapp';
import { Phone, MessageCircle, Instagram, MapPin, Truck, ShieldCheck, Mail, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050507] text-neutral-400 border-t-2 border-[#E8302B] relative overflow-hidden font-tech">
      
      {/* Upper Footer Action Ribbon */}
      <div className="bg-gradient-to-r from-neutral-950 via-[#141418] to-neutral-950 border-b border-neutral-800 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <span className="text-xs text-[#E8302B] uppercase font-bold tracking-widest">
              FASTEST DISPATCH IN THE INDUSTRY
            </span>
            <h3 className="text-2xl sm:text-4xl font-racing font-black text-white uppercase mt-1">
              READY TO UPGRADE YOUR MACHINE?
            </h3>
            <p className="text-xs text-neutral-400 mt-1 max-w-xl">
              Tap below to connect directly with our workshop team on WhatsApp. Share your vehicle model or part photo for instant stock check.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`tel:${BUSINESS_INFO.phone}`}
              className="px-5 py-3 bg-neutral-900 hover:bg-neutral-800 text-white font-racing text-lg font-bold tracking-wider clip-slant-button flex items-center space-x-2 border border-neutral-700"
            >
              <Phone className="w-4 h-4 text-[#E8302B]" />
              <span>CALL: {BUSINESS_INFO.phoneDisplay}</span>
            </a>

            <a
              href={getWhatsAppGeneralInquiryUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3.5 bg-[#E8302B] hover:bg-[#cf2520] text-white font-racing text-xl font-bold tracking-wider clip-slant-button flex items-center space-x-2 red-glow transition-all hover:scale-105"
            >
              <MessageCircle className="w-5 h-5 fill-white" />
              <span>SHOP ON WHATSAPP</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/">
              <Logo size="md" />
            </Link>
            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm mt-3">
              THE FLYER'S is India's leading automotive & motorcycle accessories dealer. Specializing in high-performance track-used tyres, riding gear, aesthetic body mods, and genuine spares.
            </p>

            <div className="flex items-center space-x-3 pt-2">
              <a
                href={BUSINESS_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded bg-neutral-900 hover:bg-[#E8302B] text-neutral-300 hover:text-white flex items-center justify-center transition-colors border border-neutral-800"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href={BUSINESS_INFO.threadsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded bg-neutral-900 hover:bg-[#E8302B] text-neutral-300 hover:text-white flex items-center justify-center transition-colors border border-neutral-800 font-bold text-sm"
                aria-label="Threads"
              >
                @
              </a>
              <a
                href={getWhatsAppGeneralInquiryUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded bg-neutral-900 hover:bg-[#E8302B] text-neutral-300 hover:text-white flex items-center justify-center transition-colors border border-neutral-800"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>

            <div className="pt-2 text-xs text-neutral-500">
              Instagram: <strong className="text-neutral-300">@__theflyers__</strong> (71.5K+ Followers)
            </div>
          </div>

          {/* Categories Col */}
          <div>
            <h4 className="text-sm font-racing font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-[#E8302B] pl-2">
              SEPARATE DEPARTMENTS
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/catalog?category=helmets" className="hover:text-[#E8302B] transition-colors">Sport Helmets (₹1,950)</Link></li>
              <li><Link to="/catalog?category=jackets" className="hover:text-[#E8302B] transition-colors">Riding Jackets (₹1,799)</Link></li>
              <li><Link to="/track-tyres" className="hover:text-[#E8302B] transition-colors text-[#E8302B] font-bold">Track-Used Tyres (From ₹1,800)</Link></li>
              <li><Link to="/catalog?category=gloves" className="hover:text-[#E8302B] transition-colors">Riding Gloves (₹799)</Link></li>
              <li><Link to="/catalog?category=bike-accessories" className="hover:text-[#E8302B] transition-colors">Speed 400 & Duke Parts</Link></li>
              <li><Link to="/catalog?category=car-accessories" className="hover:text-[#E8302B] transition-colors">Fortuner Batman Mirrors</Link></li>
              <li><Link to="/catalog?category=spares" className="hover:text-[#E8302B] transition-colors">Paddock Stands & Spares</Link></li>
            </ul>
          </div>

          {/* Quick Links Col */}
          <div>
            <h4 className="text-sm font-racing font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-[#E8302B] pl-2">
              SITE PAGES
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/" className="hover:text-[#E8302B] transition-colors">Home Page</Link></li>
              <li><Link to="/catalog" className="hover:text-[#E8302B] transition-colors">Live Catalog (All Products)</Link></li>
              <li><Link to="/track-tyres" className="hover:text-[#E8302B] transition-colors">Track Tyres Special</Link></li>
              <li><Link to="/about" className="hover:text-[#E8302B] transition-colors">About The Flyer's</Link></li>
              <li><Link to="/contact" className="hover:text-[#E8302B] transition-colors">Contact & Order Concierge</Link></li>
            </ul>
          </div>

          {/* Direct Contact Col */}
          <div>
            <h4 className="text-sm font-racing font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-[#E8302B] pl-2">
              CONTACT & DISPATCH
            </h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start space-x-2">
                <Phone className="w-4 h-4 text-[#E8302B] shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white">9025719644</div>
                  <div className="text-[11px] text-neutral-500">Mon - Sun (9 AM - 9 PM)</div>
                </div>
              </li>

              <li className="flex items-start space-x-2">
                <MessageCircle className="w-4 h-4 text-[#E8302B] shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white">WhatsApp Direct</div>
                  <div className="text-[11px] text-neutral-500">Instant Order & Fitment Support</div>
                </div>
              </li>

              <li className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-[#E8302B] shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white">Location: India</div>
                  <div className="text-[11px] text-neutral-500">Dispatches nationwide daily</div>
                </div>
              </li>

              <li className="flex items-start space-x-2">
                <Truck className="w-4 h-4 text-[#E8302B] shrink-0 mt-0.5" />
                <span className="text-[11px] text-neutral-400">Doorstep delivery via DTDC / Speed Express</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
          <div>
            © {new Date().getFullYear()} <strong className="text-neutral-300">THE FLYER'S</strong> — Accessories & Spares. All rights reserved.
          </div>

          <div className="flex items-center space-x-6">
            <span className="text-neutral-600">Built for Enthusiasts, Track Riders & Customizers</span>
            <button
              onClick={scrollToTop}
              className="p-2 bg-neutral-900 hover:bg-[#E8302B] text-neutral-400 hover:text-white rounded transition-colors"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
