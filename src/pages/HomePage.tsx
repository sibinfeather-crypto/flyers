import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { FeaturedOffers } from '../components/FeaturedOffers';
import { CATEGORIES, BUSINESS_INFO } from '../data/catalog';
import { ProductItem } from '../types';
import { getWhatsAppGeneralInquiryUrl } from '../utils/whatsapp';
import { 
  ArrowRight, 
  Disc, 
  ShieldCheck, 
  Truck, 
  Sparkles, 
  MessageCircle, 
  Instagram, 
  Package, 
  ChevronRight,
  Shield,
  Shirt,
  Hand,
  Wrench,
  Car,
  Cog,
  Zap
} from 'lucide-react';

interface HomePageProps {
  onSelectProduct: (product: ProductItem) => void;
  onOpenInquiry: (topic?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onSelectProduct, onOpenInquiry }) => {
  const navigate = useNavigate();

  const handleHeroSearch = (query: string) => {
    if (query.trim()) {
      navigate(`/catalog?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const getCategoryIcon = (iconName: string) => {
    const props = { className: "w-5 h-5 text-[#E8302B]" };
    switch (iconName) {
      case 'Shield': return <Shield {...props} />;
      case 'Shirt': return <Shirt {...props} />;
      case 'Hand': return <Hand {...props} />;
      case 'Disc': return <Disc {...props} />;
      case 'Wrench': return <Wrench {...props} />;
      case 'Car': return <Car {...props} />;
      case 'Cog': return <Cog {...props} />;
      default: return <Zap {...props} />;
    }
  };

  return (
    <div className="flex flex-col">
      {/* 1. Hero Section */}
      <Hero
        onSearchChange={handleHeroSearch}
        searchQuery=""
        onOpenInquiry={onOpenInquiry}
      />

      {/* 2. Quick Value Proposition Strip */}
      <section className="bg-[#0b0b0e] border-y border-[#222227] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center md:text-left">
            <div className="flex items-center space-x-3 p-3 bg-neutral-900/40 border border-neutral-800/80 clip-badge-slant">
              <div className="p-2 bg-[#E8302B]/10 text-[#E8302B] rounded">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-racing font-bold text-white uppercase text-sm">Pan-India Express</h4>
                <p className="text-[11px] font-tech text-neutral-400">DTDC & Speed Post to all pincodes</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-neutral-900/40 border border-neutral-800/80 clip-badge-slant">
              <div className="p-2 bg-[#E8302B]/10 text-[#E8302B] rounded">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-racing font-bold text-white uppercase text-sm">Workshop Tested</h4>
                <p className="text-[11px] font-tech text-neutral-400">Pressure & quality bench checked</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-neutral-900/40 border border-neutral-800/80 clip-badge-slant">
              <div className="p-2 bg-[#E8302B]/10 text-[#E8302B] rounded">
                <Package className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-racing font-bold text-white uppercase text-sm">Multi-Layer Wrap</h4>
                <p className="text-[11px] font-tech text-neutral-400">Heavy bubble & corner armor</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-neutral-900/40 border border-neutral-800/80 clip-badge-slant">
              <div className="p-2 bg-[#E8302B]/10 text-[#E8302B] rounded">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-racing font-bold text-white uppercase text-sm">1-on-1 WhatsApp</h4>
                <p className="text-[11px] font-tech text-neutral-400">Instant fitment check & photos</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Featured Categories Snapshot */}
      <section className="py-16 bg-[#070709] border-b border-[#222227]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <div className="inline-flex items-center space-x-2 text-[#E8302B] text-xs font-tech tracking-widest uppercase mb-1">
                <span className="w-5 h-0.5 bg-[#E8302B]" />
                <span>POPULAR DEPARTMENTS</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-racing font-black uppercase text-white">
                EXPLORE <span className="text-[#E8302B]">CATEGORIES</span>
              </h2>
            </div>

            <Link
              to="/catalog"
              className="inline-flex items-center space-x-2 text-[#E8302B] hover:text-white font-racing text-lg tracking-wider uppercase transition-colors"
            >
              <span>Explore All In Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                to={`/catalog?category=${cat.id}`}
                className="group bg-[#111115] border border-[#222227] hover:border-[#E8302B] clip-corner-cut overflow-hidden transition-all duration-300 flex flex-col justify-between p-5"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2.5 bg-neutral-900 rounded border border-neutral-800 group-hover:border-[#E8302B]/40 transition-colors">
                      {getCategoryIcon(cat.iconName)}
                    </div>
                    <span className="text-[11px] font-tech text-[#E8302B] font-bold bg-[#E8302B]/10 px-2 py-0.5 rounded">
                      From {cat.startingPrice}
                    </span>
                  </div>

                  <h3 className="text-xl font-racing font-bold text-white uppercase group-hover:text-[#E8302B] transition-colors">
                    {cat.name}
                  </h3>

                  <p className="text-xs text-neutral-400 mt-1 font-tech line-clamp-2">
                    {cat.shortDesc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-neutral-800/80 flex items-center justify-between text-xs font-tech text-neutral-400 group-hover:text-white">
                  <span>{cat.itemCount}</span>
                  <ChevronRight className="w-4 h-4 text-[#E8302B] group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Live Drops & Featured Offers */}
      <FeaturedOffers onSelectProduct={onSelectProduct} />

      {/* 5. Special Feature Banner: Track-Used Tyres Hub */}
      <section className="py-16 bg-gradient-to-r from-[#120808] via-[#1a0c0c] to-[#0d0707] border-y border-[#3a1514] relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-20 bg-cover bg-center mix-blend-screen pointer-events-none hidden md:block"
             style={{ backgroundImage: `url('https://images.unsplash.com/photo-1578844251758-2f71da64c96f?auto=format&fit=crop&w=1200&q=80')` }} 
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#E8302B]/20 border border-[#E8302B]/40 text-[#E8302B] text-xs font-tech tracking-widest uppercase mb-3 clip-badge-slant">
              <Disc className="w-3.5 h-3.5" />
              <span>THE FLYER'S SPECIALITY</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-racing font-black text-white uppercase tracking-wide">
              TRACK-USED TYRES <span className="text-[#E8302B]">CENTRE</span>
            </h2>

            <p className="mt-3 text-neutral-300 text-sm sm:text-base font-tech leading-relaxed">
              Why spend ₹14,000+ on brand new street tyres when you can get race-compound track rubber with 80%+ usable center tread for under ₹3,500? Tested for air leaks, zero punctures, and packed for safe pan-India courier delivery.
            </p>

            <div className="mt-5 flex flex-wrap gap-2 text-xs font-tech">
              <span className="px-2.5 py-1 bg-neutral-900/80 border border-neutral-700 text-white rounded">
                Duke 390 (110/70 + 150/60)
              </span>
              <span className="px-2.5 py-1 bg-neutral-900/80 border border-neutral-700 text-white rounded">
                Yamaha R15 / MT-15
              </span>
              <span className="px-2.5 py-1 bg-neutral-900/80 border border-neutral-700 text-white rounded">
                Superbikes (180/55 & 190/55)
              </span>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/track-tyres"
                className="px-6 py-3 bg-[#E8302B] hover:bg-[#cf2520] text-white font-racing text-xl font-bold tracking-wider clip-slant-button flex items-center space-x-2 red-glow transition-transform hover:scale-105"
              >
                <span>OPEN TYRE SIZE SELECTOR</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <button
                onClick={() => onOpenInquiry('Track Tyres Fitment & Stock')}
                className="px-5 py-3 bg-neutral-900 hover:bg-neutral-800 text-white font-tech text-xs tracking-wider uppercase border border-neutral-700 flex items-center space-x-2"
              >
                <MessageCircle className="w-4 h-4 text-[#E8302B]" />
                <span>Ask Size Availability</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Instagram & Dispatch Proof Preview */}
      <section className="py-16 bg-[#08080a] border-b border-[#222227]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <div className="inline-flex items-center space-x-2 text-[#E8302B] text-xs font-tech tracking-widest uppercase mb-1">
                <Instagram className="w-3.5 h-3.5" />
                <span>VERIFIED RIDERS COMMUNITY</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-racing font-black uppercase text-white">
                BACKED BY <span className="text-[#E8302B]">{BUSINESS_INFO.followersCount} RIDERS</span>
              </h2>
            </div>

            <a
              href={BUSINESS_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 text-[#E8302B] hover:text-white font-racing text-lg tracking-wider uppercase transition-colors"
            >
              <span>Follow @__theflyers__ on Instagram</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#111114] border border-[#222227] p-6 clip-corner-cut">
              <div className="text-[#E8302B] font-racing text-3xl font-black mb-1">71,500+</div>
              <h4 className="text-white font-racing uppercase text-lg">Active Instagram Riders</h4>
              <p className="text-xs text-neutral-400 mt-2 font-tech">
                Follow our official page <a href={BUSINESS_INFO.instagramUrl} target="_blank" rel="noopener noreferrer" className="text-[#E8302B] font-bold underline">@__theflyers__</a> for daily reel drops, unboxing stories, and inventory restocks.
              </p>
            </div>

            <div className="bg-[#111114] border border-[#222227] p-6 clip-corner-cut">
              <div className="text-[#E8302B] font-racing text-3xl font-black mb-1">1,040+</div>
              <h4 className="text-white font-racing uppercase text-lg">Reels & Dispatch Videos</h4>
              <p className="text-xs text-neutral-400 mt-2 font-tech">
                Every parcel dispatch is documented with live courier tracking receipts, bubble-protection checks, and customer feedback.
              </p>
            </div>

            <div className="bg-[#111114] border border-[#222227] p-6 clip-corner-cut">
              <div className="text-[#E8302B] font-racing text-3xl font-black mb-1">100%</div>
              <h4 className="text-white font-racing uppercase text-lg">Doorstep Delivery Guarantee</h4>
              <p className="text-xs text-neutral-400 mt-2 font-tech">
                From Kerala to Jammu, Tamil Nadu to Maharashtra — orders dispatched within 24 hours with live tracking on WhatsApp.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Bottom Call to Action */}
      <section className="py-14 bg-gradient-to-r from-neutral-950 via-[#131317] to-neutral-950 text-center border-b border-[#222227]">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-racing font-black text-white uppercase">
            LOOKING FOR A SPECIFIC MOTORCYCLE OR CAR PART?
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-neutral-400 font-tech">
            We stock over 200+ fast-moving items, performance bodykits, and racing accessories. If it's on two or four wheels, we can arrange it.
          </p>
          <div className="mt-6 flex flex-wrap justify-center items-center gap-4">
            <Link
              to="/catalog"
              className="px-6 py-3 bg-neutral-900 hover:bg-neutral-800 text-white font-racing text-lg font-bold tracking-wider clip-slant-button border border-neutral-700"
            >
              BROWSE ALL PRODUCTS
            </Link>

            <button
              onClick={() => onOpenInquiry()}
              className="px-7 py-3 bg-[#E8302B] hover:bg-[#cf2520] text-white font-racing text-lg font-bold tracking-wider clip-slant-button flex items-center space-x-2 red-glow"
            >
              <Sparkles className="w-4 h-4" />
              <span>CUSTOM SPARE INQUIRY</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
