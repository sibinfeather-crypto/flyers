import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Logo } from './Logo';
import { BUSINESS_INFO } from '../data/catalog';
import { getWhatsAppGeneralInquiryUrl } from '../utils/whatsapp';
import { MessageCircle, Shield, Truck, Zap, Flame, Award, ChevronRight, Search } from 'lucide-react';

interface HeroProps {
  onSearchChange: (query: string) => void;
  searchQuery: string;
  onOpenInquiry: (topic?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onSearchChange, searchQuery: initialSearch, onOpenInquiry }) => {
  const navigate = useNavigate();
  const [localSearch, setLocalSearch] = useState(initialSearch || '');

  const quickVehicleTags = [
    'KTM Duke / RC',
    'Triumph Speed 400',
    'Track Tyres',
    'Fortuner Batman Covers',
    'Scimitar Jackets',
    'Helmets under ₹2,000',
  ];

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (localSearch.trim()) {
      navigate(`/catalog?q=${encodeURIComponent(localSearch.trim())}`);
    } else {
      navigate('/catalog');
    }
  };

  const handleTagClick = (tag: string) => {
    navigate(`/catalog?q=${encodeURIComponent(tag)}`);
  };

  return (
    <section className="relative min-h-[88vh] flex items-center justify-center overflow-hidden border-b border-[#222227] bg-[#070709]">
      {/* Background Graphic Layers */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-luminosity scale-105 transition-transform duration-1000"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1920&q=80')`,
        }}
      />

      {/* Dark Vignette and Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-[#070709]/80 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#070709] via-transparent to-[#070709]" />
      
      {/* High-Octane Racing Accents */}
      <div className="absolute inset-0 racing-grid-bg opacity-30 pointer-events-none" />
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#E8302B]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-[#E8302B]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Hero Racing Diagonal Accent Ribbons */}
      <div className="absolute top-0 right-0 w-1/3 h-2 bg-gradient-to-l from-[#E8302B] to-transparent" />
      <div className="absolute top-12 right-12 w-48 h-1 bg-[#E8302B]/30 rotate-12 pointer-events-none hidden md:block" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center z-10 flex flex-col items-center">
        
        {/* Established Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-900/90 border border-neutral-800 text-neutral-300 text-xs sm:text-sm font-tech tracking-wider uppercase mb-6 shadow-xl backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-[#E8302B] animate-pulse" />
          <span>ESTABLISHED MOTORCYCLE & CAR SPECIALIST</span>
        </div>

        {/* Grand Brand Identity Logo */}
        <div className="mb-4">
          <Logo size="xl" />
        </div>

        {/* Main Pitch Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-racing font-black uppercase text-white tracking-wide max-w-4xl leading-[1.05] mt-3">
          PERFORMANCE SPARES, <span className="text-[#E8302B] underline decoration-[#E8302B]/40 decoration-4 underline-offset-8">TRACK TYRES</span> & RIDING
        </h1>

        {/* Subtitle with Value Propositions */}
        <p className="mt-4 text-base sm:text-xl text-neutral-300 max-w-2xl font-normal leading-relaxed">
          Premium automotive & motorcycle accessories, inspected track-used tyres, certified riding gear, and high-performance spares with pan-India doorstep delivery.
        </p>

        {/* Primary CTAs */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-md">
          {/* Main WhatsApp CTA */}
          <a
            href={getWhatsAppGeneralInquiryUrl()}
            target="_blank"
            rel="noopener noreferrer"
            id="hero-whatsapp-order-button"
            className="w-full sm:w-auto px-5 py-2.5 sm:px-6 sm:py-3 bg-[#E8302B] hover:bg-[#cf2520] text-white font-racing text-base sm:text-lg font-bold tracking-wider clip-slant-button flex items-center justify-center space-x-2 transition-all transform hover:-translate-y-0.5 red-glow active:scale-95"
          >
            <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 fill-white shrink-0" />
            <span>SHOP ON WHATSAPP</span>
          </a>

          {/* Secondary Explorer CTA */}
          <Link
            to="/catalog"
            className="w-full sm:w-auto px-5 py-2.5 sm:px-6 sm:py-3 bg-neutral-900/90 hover:bg-neutral-800 text-neutral-100 font-racing text-base sm:text-lg font-bold tracking-wider border border-neutral-700 clip-slant-button flex items-center justify-center space-x-2 transition-all hover:border-neutral-500"
          >
            <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-[#E8302B] shrink-0" />
            <span>VIEW CATALOG & OFFERS</span>
          </Link>
        </div>

        {/* Quick Search Input */}
        <div className="mt-8 w-full max-w-xl">
          <form onSubmit={handleSearchSubmit} className="relative flex items-center">
            <Search className="absolute left-4 w-5 h-5 text-neutral-400" />
            <input
              type="text"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              placeholder="Search helmets, jackets, KTM spares, tyre size, Fortuner covers..."
              className="w-full pl-12 pr-28 py-3.5 bg-neutral-950/90 border border-neutral-800 focus:border-[#E8302B] focus:ring-1 focus:ring-[#E8302B] rounded-none clip-corner-cut text-white placeholder-neutral-500 font-tech text-sm tracking-wide focus:outline-none transition-all shadow-2xl"
            />
            <button
              type="submit"
              className="absolute right-2 px-4 py-2 bg-[#E8302B] text-white text-xs font-racing font-bold tracking-wider clip-badge-slant hover:bg-[#cf2520] transition-colors cursor-pointer"
            >
              SEARCH
            </button>
          </form>

          {/* Quick Filter Pill Chips */}
          <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
            <span className="text-xs text-neutral-400 font-tech">Quick:</span>
            {quickVehicleTags.map((tag) => (
              <button
                key={tag}
                onClick={() => handleTagClick(tag)}
                className="text-[11px] sm:text-xs font-tech px-2.5 py-1 rounded bg-neutral-900/80 hover:bg-neutral-800 text-neutral-300 hover:text-[#E8302B] border border-neutral-800/80 transition-all cursor-pointer"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* High-Impact Stat Badges Bar */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 w-full max-w-4xl text-left">
          <div className="bg-[#111114]/90 p-4 border border-[#222227] border-l-4 border-l-[#E8302B] clip-corner-cut backdrop-blur-sm">
            <div className="text-2xl sm:text-3xl font-racing font-black text-white">71.5K+</div>
            <div className="text-xs text-neutral-400 font-tech tracking-wider uppercase">Instagram Followers</div>
            <div className="text-[10px] text-[#E8302B] font-semibold mt-0.5">@__theflyers__</div>
          </div>

          <div className="bg-[#111114]/90 p-4 border border-[#222227] border-l-4 border-l-[#E8302B] clip-corner-cut backdrop-blur-sm">
            <div className="text-2xl sm:text-3xl font-racing font-black text-white">1,040+</div>
            <div className="text-xs text-neutral-400 font-tech tracking-wider uppercase">Products & Reels</div>
            <div className="text-[10px] text-neutral-400 mt-0.5">Transparent Showcase</div>
          </div>

          <div className="bg-[#111114]/90 p-4 border border-[#222227] border-l-4 border-l-[#E8302B] clip-corner-cut backdrop-blur-sm">
            <div className="text-2xl sm:text-3xl font-racing font-black text-white">PAN-INDIA</div>
            <div className="text-xs text-neutral-400 font-tech tracking-wider uppercase">Doorstep Delivery</div>
            <div className="text-[10px] text-[#E8302B] font-semibold mt-0.5">DTDC / Express Courier</div>
          </div>

          <div className="bg-[#111114]/90 p-4 border border-[#222227] border-l-4 border-l-[#E8302B] clip-corner-cut backdrop-blur-sm">
            <div className="text-2xl sm:text-3xl font-racing font-black text-white">GENUINE</div>
            <div className="text-xs text-neutral-400 font-tech tracking-wider uppercase">Quality Tested</div>
            <div className="text-[10px] text-neutral-400 mt-0.5">Bikes & Performance Cars</div>
          </div>
        </div>

      </div>
    </section>
  );
};
