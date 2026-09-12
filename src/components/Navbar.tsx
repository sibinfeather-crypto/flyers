import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { getWhatsAppGeneralInquiryUrl } from '../utils/whatsapp';
import { MessageCircle, Menu, X, ShieldCheck, Truck, Sparkles } from 'lucide-react';

interface NavbarProps {
  onOpenInquiry: (topic?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenInquiry }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'HOME', to: '/' },
    { label: 'CATALOG', to: '/catalog' },
    { label: 'TRACK TYRES', to: '/track-tyres' },
    { label: 'ABOUT US', to: '/about' },
    { label: 'CONTACT', to: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#070709]/95 backdrop-blur-md border-b border-[#222227]">
      {/* High-Octane Top Announcement Bar - Continuous Loop Scrolling */}
      <div className="bg-gradient-to-r from-[#8a1410] via-[#E8302B] to-[#8a1410] text-white text-xs py-1.5 font-tech tracking-wider uppercase overflow-hidden whitespace-nowrap select-none border-b border-[#E8302B]/30">
        <div className="animate-marquee flex items-center">
          {/* First loop track */}
          <div className="flex items-center space-x-6 shrink-0 pr-6">
            {[1, 2, 3, 4].map((idx) => (
              <div key={`track-1-${idx}`} className="flex items-center space-x-4 shrink-0">
                <span className="flex items-center space-x-1.5 font-bold">
                  <Truck className="w-3.5 h-3.5 shrink-0" />
                  <span>PAN-INDIA EXPRESS SHIPPING</span>
                </span>
                <span className="text-white/40">|</span>
                <span className="flex items-center space-x-1.5 text-neutral-100 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                  <span>71.5K+ COMMUNITY • 100% TESTED GENUINE SPARES</span>
                </span>
                <span className="text-white/40">★</span>
              </div>
            ))}
          </div>

          {/* Second duplicate track for seamless infinite transition */}
          <div className="flex items-center space-x-6 shrink-0 pr-6" aria-hidden="true">
            {[1, 2, 3, 4].map((idx) => (
              <div key={`track-2-${idx}`} className="flex items-center space-x-4 shrink-0">
                <span className="flex items-center space-x-1.5 font-bold">
                  <Truck className="w-3.5 h-3.5 shrink-0" />
                  <span>PAN-INDIA EXPRESS SHIPPING</span>
                </span>
                <span className="text-white/40">|</span>
                <span className="flex items-center space-x-1.5 text-neutral-100 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                  <span>71.5K+ COMMUNITY • 100% TESTED GENUINE SPARES</span>
                </span>
                <span className="text-white/40">★</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center group py-2 focus:outline-none" aria-label="The Flyer's Home">
            <img
              src="/assets/theflyers.logo.png"
              alt="The Flyer's"
              className="h-10 sm:h-12 md:h-14 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-5 xl:space-x-7 font-racing text-base xl:text-lg tracking-wider">
            {navLinks.map((link) => (
              <NavLink
                key={link.label}
                to={link.to}
                className={({ isActive }) =>
                  `relative py-1 transition-colors group ${
                    isActive
                      ? 'text-[#E8302B] font-bold'
                      : 'text-neutral-300 hover:text-[#E8302B]'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{link.label}</span>
                    <span
                      className={`absolute bottom-0 left-0 h-0.5 bg-[#E8302B] transition-all duration-200 ${
                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center space-x-3">
            <button
              onClick={() => onOpenInquiry()}
              className="px-3 py-2 rounded bg-[#18181b] hover:bg-[#27272a] text-neutral-200 text-xs font-tech uppercase tracking-wider border border-neutral-700 transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#E8302B]" />
              <span className="hidden xl:inline">Custom Spare</span>
              <span className="xl:hidden">Inquiry</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center space-x-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-neutral-300 hover:text-white bg-[#18181b] border border-[#27272a] rounded-md focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0c0c0f] border-b border-[#27272a] px-4 pt-3 pb-6 space-y-4">
          <nav className="flex flex-col space-y-1 font-racing text-xl">
            {navLinks.map((link) => (
              <NavLink
                key={link.label}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `py-2.5 px-2 border-b border-neutral-800/60 transition-colors flex items-center justify-between ${
                    isActive
                      ? 'text-[#E8302B] font-bold bg-[#141418]'
                      : 'text-neutral-300 hover:text-[#E8302B]'
                  }`
                }
              >
                <span>{link.label}</span>
                <span className="text-xs font-tech text-neutral-500">→</span>
              </NavLink>
            ))}
          </nav>

          <div className="pt-2 flex flex-col space-y-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenInquiry();
              }}
              className="w-full py-2.5 rounded bg-neutral-900 border border-neutral-700 text-sm font-tech tracking-wider uppercase text-neutral-200 text-center"
            >
              Request Custom Part / Spare
            </button>

            <a
              href={getWhatsAppGeneralInquiryUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 bg-[#E8302B] text-white font-racing text-xl tracking-wider font-bold text-center flex items-center justify-center space-x-2 clip-slant-button shadow-lg shadow-[#E8302B]/30"
            >
              <MessageCircle className="w-5 h-5 fill-white" />
              <span>SHOP ON WHATSAPP</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
