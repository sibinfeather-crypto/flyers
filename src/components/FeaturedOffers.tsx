import React from 'react';
import { FEATURED_OFFERS } from '../data/catalog';
import { ProductItem } from '../types';
import { getWhatsAppOrderUrl } from '../utils/whatsapp';
import { Flame, MessageCircle, Tag, Check, ShieldAlert, Sparkles, ArrowRight } from 'lucide-react';

interface FeaturedOffersProps {
  onSelectProduct: (product: ProductItem) => void;
}

export const FeaturedOffers: React.FC<FeaturedOffersProps> = ({ onSelectProduct }) => {
  return (
    <section id="offers" className="py-20 bg-[#09090c] border-b border-[#222227] relative overflow-hidden">
      {/* Red Ambient Glow Elements */}
      <div className="absolute top-1/3 -left-32 w-80 h-80 bg-[#E8302B]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 right-1/4 w-96 h-96 bg-[#E8302B]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#E8302B]/15 border border-[#E8302B]/30 text-[#E8302B] text-xs font-tech tracking-widest uppercase mb-2 clip-badge-slant">
              <Flame className="w-3.5 h-3.5 fill-[#E8302B]" />
              <span>LIMITED TIME RACING DEALS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-racing font-black uppercase text-white tracking-wide">
              FEATURED OFFERS & <span className="text-[#E8302B]">HOT DROPS</span>
            </h2>
          </div>
          <div className="flex items-center space-x-2 text-xs font-tech text-neutral-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>Prices verified from active Instagram catalogue drops</span>
          </div>
        </div>

        {/* Offers Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURED_OFFERS.map((offer) => {
            const savings = offer.originalPrice 
              ? Math.round(((offer.originalPrice - offer.price) / offer.originalPrice) * 100) 
              : 0;

            const whatsappUrl = getWhatsAppOrderUrl(offer.name, offer.price, offer.categoryLabel);

            return (
              <div
                key={offer.id}
                className="bg-[#111114] border border-[#27272e] hover:border-[#E8302B] transition-all duration-300 clip-corner-cut flex flex-col justify-between group shadow-xl hover:shadow-2xl hover:shadow-black"
              >
                {/* Product Image & Badges */}
                <div className="relative h-56 w-full overflow-hidden bg-neutral-950">
                  {offer.image ? (
                    <img
                      src={offer.image}
                      alt={offer.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                      loading="lazy"
                    />
                  ) : null}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111114] via-transparent to-black/40" />

                  {/* Top Badge: Hot Offer / Discount */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                    {offer.badge && (
                      <span className="px-2.5 py-1 bg-[#E8302B] text-white text-xs font-racing font-bold tracking-wider clip-badge-slant shadow-md shadow-[#E8302B]/40">
                        {offer.badge}
                      </span>
                    )}
                    {savings > 0 && (
                      <span className="px-2 py-0.5 bg-black/80 text-emerald-400 text-[11px] font-tech font-bold border border-emerald-500/40 rounded-sm">
                        SAVE {savings}%
                      </span>
                    )}
                  </div>

                  {/* Category Tag */}
                  <span className="absolute bottom-3 left-4 text-xs font-tech text-neutral-300 bg-black/70 backdrop-blur-sm px-2 py-0.5 rounded border border-neutral-700">
                    {offer.categoryLabel}
                  </span>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Compatibility Notice */}
                    {offer.vehicleCompatibility && (
                      <div className="text-[11px] font-tech text-[#E8302B] uppercase tracking-wider mb-1 flex items-center gap-1">
                        <span>Fitment:</span>
                        <span className="text-neutral-300">{offer.vehicleCompatibility}</span>
                      </div>
                    )}

                    <h3 className="text-xl sm:text-2xl font-racing font-bold text-white uppercase group-hover:text-[#E8302B] transition-colors leading-tight">
                      {offer.name}
                    </h3>

                    <p className="mt-2 text-xs text-neutral-400 line-clamp-2">
                      {offer.description}
                    </p>

                    {/* Features List */}
                    <ul className="mt-3 space-y-1">
                      {offer.features.slice(0, 3).map((feat, i) => (
                        <li key={i} className="flex items-center text-xs text-neutral-300 font-tech">
                          <Check className="w-3.5 h-3.5 text-[#E8302B] mr-1.5 shrink-0" />
                          <span className="truncate">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Pricing & CTA Section */}
                  <div className="mt-6 pt-4 border-t border-neutral-800">
                    <div className="flex items-baseline justify-between mb-4">
                      <div>
                        <div className="text-xs text-neutral-400 font-tech">OFFER PRICE</div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl sm:text-3xl font-racing font-black text-white">
                            ₹{offer.price.toLocaleString('en-IN')}
                          </span>
                          {offer.originalPrice && (
                            <span className="text-xs text-neutral-500 line-through font-tech">
                              ₹{offer.originalPrice.toLocaleString('en-IN')}
                            </span>
                          )}
                        </div>
                      </div>

                      <button
                        onClick={() => onSelectProduct(offer)}
                        className="text-xs font-tech text-neutral-400 hover:text-white underline underline-offset-4 cursor-pointer"
                      >
                        Specs & Gallery
                      </button>
                    </div>

                    {/* WhatsApp Action Button */}
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 bg-[#E8302B] hover:bg-[#cf2520] text-white font-racing text-lg font-bold tracking-wider clip-slant-button flex items-center justify-center space-x-2 transition-all group-hover:shadow-lg group-hover:shadow-[#E8302B]/30"
                    >
                      <MessageCircle className="w-4 h-4 fill-white" />
                      <span>ORDER ON WHATSAPP</span>
                    </a>
                  </div>
                </div>

                {/* Bottom Diagonal Strip */}
                <div className="h-1 bg-gradient-to-r from-[#E8302B] via-neutral-700 to-transparent" />
              </div>
            );
          })}
        </div>

        {/* Track-Used Tyres Special Banner */}
        <div className="mt-12 bg-gradient-to-r from-neutral-900 via-[#16161b] to-neutral-900 border border-[#27272e] p-6 sm:p-8 clip-corner-cut relative flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="px-2.5 py-0.5 bg-[#E8302B] text-white text-[11px] font-racing font-bold tracking-widest uppercase clip-badge-slant">
              HOT CATEGORY
            </span>
            <h3 className="text-2xl sm:text-3xl font-racing font-black uppercase text-white">
              NEED TRACK-USED TYRES FOR YOUR SPORT BIKE / SUPERBIKE?
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 max-w-2xl">
              110/70-17, 140/70-17, 150/60-17, 180/55-17 & 190/55-17 available. Premium soft track rubber from Metzeler, Pirelli & Michelin with 80%+ rubber life at unbelievable prices.
            </p>
          </div>

          <a
            href={getWhatsAppOrderUrl('Track-Used Tyres (Specific Size Inquiry)', 1800, 'Tyres')}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-6 py-3.5 bg-white hover:bg-neutral-200 text-black font-racing text-lg font-black tracking-wider clip-slant-button flex items-center space-x-2 transition-transform hover:scale-105"
          >
            <MessageCircle className="w-4 h-4 fill-black" />
            <span>INQUIRE TYRE SIZES</span>
          </a>
        </div>

      </div>
    </section>
  );
};
