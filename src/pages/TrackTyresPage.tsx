import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS_CATALOG, BUSINESS_INFO } from '../data/catalog';
import { ProductItem } from '../types';
import { getWhatsAppOrderUrl, getWhatsAppGeneralInquiryUrl } from '../utils/whatsapp';
import { 
  Disc, 
  ShieldCheck, 
  Check, 
  Sparkles, 
  MessageCircle, 
  ExternalLink, 
  ChevronRight, 
  Bike, 
  Gauge, 
  Package, 
  Flame 
} from 'lucide-react';

interface TrackTyresPageProps {
  onSelectProduct: (product: ProductItem) => void;
  onOpenInquiry: (topic?: string) => void;
}

export const TrackTyresPage: React.FC<TrackTyresPageProps> = ({
  onSelectProduct,
  onOpenInquiry,
}) => {
  const [selectedSize, setSelectedSize] = useState<string>('all');

  const tyreSizes = [
    { id: 'all', label: 'All Sizes' },
    { id: '110/70', label: '110/70-17 (Front)' },
    { id: '150/60', label: '150/60-17 (Rear 300-400cc)' },
    { id: '140/70', label: '140/70-17 (Rear 150-250cc)' },
    { id: '120/70', label: '120/70-17 (Superbike Front)' },
    { id: '180/55', label: '180/55-17 (Superbike Rear)' },
    { id: 'pair', label: 'Matched Track Pairs' },
  ];

  const tyreProducts = useMemo(() => {
    return PRODUCTS_CATALOG.filter(item => {
      if (item.category !== 'tyres') return false;
      if (selectedSize === 'all') return true;
      if (selectedSize === 'pair') return item.name.toLowerCase().includes('pair') || item.name.toLowerCase().includes('matched');
      return item.name.includes(selectedSize) || item.description.includes(selectedSize) || item.vehicleCompatibility?.includes(selectedSize);
    });
  }, [selectedSize]);

  return (
    <div className="py-12 bg-[#070709] min-h-screen relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Header */}
        <div className="mb-10 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#E8302B]/15 border border-[#E8302B]/30 text-[#E8302B] text-xs font-tech tracking-widest uppercase mb-3 clip-badge-slant">
            <Disc className="w-3.5 h-3.5" />
            <span>THE FLYER'S RACE HUB</span>
          </div>

          <h1 className="text-3xl sm:text-6xl font-racing font-black uppercase text-white tracking-wide">
            TRACK-USED <span className="text-[#E8302B]">TYRES CENTRE</span>
          </h1>

          <p className="mt-3 text-sm sm:text-base text-neutral-300 font-tech leading-relaxed max-w-2xl mx-auto">
            Get race-grade soft and medium compound motorcycle tyres at a fraction of brand-new prices. 80%+ center tread life, zero punctures, and pressure bench-tested before shipping.
          </p>
        </div>

        {/* 3 Pillars of The Flyer's Track Tyres */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-[#111115] border border-[#222227] p-6 clip-corner-cut">
            <div className="flex items-center space-x-3 text-[#E8302B] mb-3">
              <Gauge className="w-6 h-6" />
              <h3 className="text-lg font-racing font-bold uppercase text-white">80% to 90% Usable Tread</h3>
            </div>
            <p className="text-xs text-neutral-400 font-tech leading-relaxed">
              Track racers only use rubber for 1-2 sessions on side lean angles. The central strip maintains almost full depth, making them ideal for high-speed highway touring and aggressive street cornering.
            </p>
          </div>

          <div className="bg-[#111115] border border-[#222227] p-6 clip-corner-cut">
            <div className="flex items-center space-x-3 text-[#E8302B] mb-3">
              <ShieldCheck className="w-6 h-6" />
              <h3 className="text-lg font-racing font-bold uppercase text-white">Zero Puncture Guarantee</h3>
            </div>
            <p className="text-xs text-neutral-400 font-tech leading-relaxed">
              Every single tyre is inflated to high PSI on an inspection rim, submerged in water, and thoroughly inspected for leaks, bead damage, or sidewall imperfections before dispatch.
            </p>
          </div>

          <div className="bg-[#111115] border border-[#222227] p-6 clip-corner-cut">
            <div className="flex items-center space-x-3 text-[#E8302B] mb-3">
              <Flame className="w-6 h-6" />
              <h3 className="text-lg font-racing font-bold uppercase text-white">Unbeatable Pricing</h3>
            </div>
            <p className="text-xs text-neutral-400 font-tech leading-relaxed">
              New Metzeler Sportec, Pirelli Diablo Rosso, or Dunlop Alpha cost ₹14,000 to ₹28,000 per set. Our verified track-used stock ranges from only ₹1,800 to ₹4,500!
            </p>
          </div>
        </div>

        {/* Tyre Size Filter Strip */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-tech text-neutral-400 uppercase tracking-wider font-bold">
              FILTER BY TYRE DIMENSION / FITMENT:
            </span>
            <span className="text-xs font-tech text-[#E8302B]">
              Showing {tyreProducts.length} sizes in stock
            </span>
          </div>

          <div className="flex overflow-x-auto pb-2 gap-2 scrollbar-none">
            {tyreSizes.map((size) => {
              const isActive = selectedSize === size.id;
              return (
                <button
                  key={size.id}
                  onClick={() => setSelectedSize(size.id)}
                  className={`px-4 py-2 text-xs font-tech font-bold uppercase tracking-wider whitespace-nowrap clip-badge-slant transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#E8302B] text-white'
                      : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
                  }`}
                >
                  {size.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tyre Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {tyreProducts.map((prod) => {
            const whatsappUrl = getWhatsAppOrderUrl(prod);

            return (
              <div
                key={prod.id}
                className="bg-[#111114] border border-[#222227] hover:border-[#E8302B] clip-corner-cut overflow-hidden transition-all duration-300 flex flex-col justify-between group"
              >
                <div 
                  className="relative h-64 w-full bg-neutral-950 overflow-hidden cursor-pointer"
                  onClick={() => onSelectProduct(prod)}
                >
                  {prod.image ? (
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                      loading="lazy"
                    />
                  ) : null}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111114] via-transparent to-transparent" />

                  <div className="absolute top-3 left-3 flex flex-col gap-1">
                    <span className="px-2.5 py-0.5 bg-[#E8302B] text-white text-[10px] font-racing font-bold uppercase tracking-wider clip-badge-slant">
                      TRACK COMPOUND
                    </span>
                    <span className="px-2 py-0.5 bg-black/80 text-emerald-400 text-[10px] font-tech uppercase border border-neutral-800">
                      Zero Puncture Tested
                    </span>
                  </div>

                  <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="px-2.5 py-1 bg-black/80 text-white text-[11px] font-tech uppercase flex items-center space-x-1 border border-neutral-700">
                      <span>View Tread & Fitment</span>
                      <ExternalLink className="w-3 h-3 text-[#E8302B]" />
                    </span>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {prod.vehicleCompatibility && (
                      <div className="text-[10px] font-tech text-[#E8302B] uppercase tracking-wider font-semibold mb-1">
                        FIT: {prod.vehicleCompatibility}
                      </div>
                    )}

                    <h3
                      onClick={() => onSelectProduct(prod)}
                      className="text-xl font-racing font-bold text-white uppercase group-hover:text-[#E8302B] transition-colors cursor-pointer"
                    >
                      {prod.name}
                    </h3>

                    <p className="text-xs text-neutral-400 mt-1 font-tech leading-relaxed">
                      {prod.description}
                    </p>

                    {prod.features && (
                      <div className="mt-3 space-y-1">
                        {prod.features.slice(0, 3).map((sp, idx) => (
                          <div key={idx} className="flex items-center space-x-1.5 text-[11px] font-tech text-neutral-400">
                            <Check className="w-3 h-3 text-[#E8302B] shrink-0" />
                            <span>{sp}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="mt-5 pt-3 border-t border-neutral-800">
                    <div className="flex items-baseline justify-between mb-3">
                      <div>
                        <span className="text-2xl font-racing font-black text-white">
                          ₹{prod.price.toLocaleString('en-IN')}
                        </span>
                        {prod.originalPrice && (
                          <span className="text-xs font-tech text-neutral-500 line-through ml-2">
                            ₹{prod.originalPrice.toLocaleString('en-IN')}
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] font-tech text-neutral-400 uppercase">
                        Heavy Bubble Packaged
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => onSelectProduct(prod)}
                        className="py-2.5 px-3 bg-neutral-900 hover:bg-neutral-800 text-white font-tech text-xs uppercase tracking-wider border border-neutral-800 transition-colors"
                      >
                        Inspect Specs
                      </button>

                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2.5 px-3 bg-[#E8302B] hover:bg-[#cf2520] text-white font-racing text-base font-bold tracking-wider clip-slant-button flex items-center justify-center space-x-1.5 transition-all shadow-md shadow-[#E8302B]/20"
                      >
                        <MessageCircle className="w-3.5 h-3.5 fill-white" />
                        <span>BUY ON WA</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Custom Tyre Size Inquiry Section */}
        <div className="bg-gradient-to-r from-neutral-950 via-[#161214] to-neutral-950 border border-neutral-800 p-8 clip-corner-cut text-center">
          <Bike className="w-10 h-10 text-[#E8302B] mx-auto mb-3" />
          <h2 className="text-2xl sm:text-4xl font-racing font-black text-white uppercase">
            NEED A SPECIFIC TYRE SIZE OR BRAND?
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-neutral-400 font-tech max-w-xl mx-auto">
            New tyre batches arrive weekly from track racing weekends. If you need Pirelli Supercorsa, Metzeler M9RR, Dunlop Alpha 13/14, or Michelin Power Cup, reach out directly on WhatsApp!
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => onOpenInquiry('Track Tyres Custom Size Check')}
              className="px-6 py-3 bg-[#E8302B] hover:bg-[#cf2520] text-white font-racing text-lg font-bold tracking-wider clip-slant-button flex items-center space-x-2"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>CHECK SIZE AVAILABILITY ON WHATSAPP</span>
            </button>
            <Link
              to="/catalog"
              className="px-5 py-3 bg-neutral-900 hover:bg-neutral-800 text-white font-tech text-xs tracking-wider uppercase border border-neutral-700"
            >
              Back to Full Catalog
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};
