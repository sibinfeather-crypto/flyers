import React from 'react';
import { BUSINESS_INFO } from '../data/catalog';
import { getWhatsAppGeneralInquiryUrl } from '../utils/whatsapp';
import { Instagram, Heart, MessageCircle, CheckCircle, Package, Truck, Star } from 'lucide-react';

export const InstagramProof: React.FC = () => {
  const proofCards = [
    {
      title: 'Track-Used Tyres Fresh Batch',
      category: 'Track Tyres',
      desc: '110/70 & 150/60 matched compound pairs for KTM 390 & R15 riders. Zero puncture guarantee.',
      likes: '1,616',
      tag: '#TrackTyresIndia',
      image: 'https://images.unsplash.com/photo-1578844251758-2f71da64c96f?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'Scimitar Armor Jackets Offer',
      category: 'Riding Gear',
      desc: 'Scimitar Cordura mesh riding jackets with CE Level 2 armor. Offer price ₹1,799/- only.',
      likes: '2,140',
      tag: '#RiderCommunity',
      image: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'Pan-India Parcel Dispatches',
      category: 'Shipping Proof',
      desc: 'Heavy-duty bubble wrapped orders ready for courier dispatch to Kerala, TN, Maharashtra & Delhi.',
      likes: '945',
      tag: '#PanIndiaShipping',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'Batman Mirror Covers for Fortuner',
      category: 'Car Accessories',
      desc: 'Piano gloss aerodynamic wing mirror covers installed on Fortuner & Scorpio-N.',
      likes: '1,832',
      tag: '#FortunerAccessories',
      image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80',
    },
  ];

  const riderReviews = [
    {
      name: 'Adarsh R.',
      bike: 'KTM Duke 390',
      location: 'Bangalore',
      rating: 5,
      comment: 'Ordered track-used Metzeler tyres and a tail tidy. The tyres had almost full tread depth on edges and delivery took just 3 days to Bangalore. The Flyer\'s is the real deal!',
    },
    {
      name: 'Vipin Kumar',
      bike: 'Triumph Speed 400',
      location: 'Kochi, Kerala',
      rating: 5,
      comment: 'Bought the rugged headlight grille and paddock stand for ₹1,550 offer. High quality build and heavy gauge steel. Ordered through WhatsApp in 2 minutes.',
    },
    {
      name: 'Rohit Sharma',
      bike: 'Toyota Fortuner',
      location: 'Pune',
      rating: 5,
      comment: 'Batman mirror covers fit exactly like OEM clips. Packing was super secure with zero scratches. Very satisfied with customer service on WhatsApp.',
    }
  ];

  return (
    <section id="proof" className="py-20 bg-[#09090c] border-b border-[#222227] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header with Instagram Stats */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-neutral-900 border border-neutral-800 text-white text-xs font-tech tracking-widest uppercase mb-3 clip-badge-slant">
            <Instagram className="w-3.5 h-3.5 text-[#E8302B]" />
            <span>COMMUNITY & SOCIAL PROOF</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-racing font-black uppercase text-white tracking-wide">
            BACKED BY <span className="text-[#E8302B]">71.5K+ RIDERS</span> ACROSS INDIA
          </h2>

          <p className="mt-3 text-neutral-400 text-sm sm:text-base font-normal">
            Real inventory drops, live customer video reviews, and transparent parcel dispatches posted daily on our official Instagram page <a href={BUSINESS_INFO.instagramUrl} target="_blank" rel="noopener noreferrer" className="text-[#E8302B] font-bold hover:underline">@__theflyers__</a>.
          </p>

          <div className="mt-6 flex flex-wrap justify-center items-center gap-4">
            <a
              href={BUSINESS_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 bg-gradient-to-r from-purple-600 via-pink-600 to-[#E8302B] text-white font-racing text-lg font-bold tracking-wider clip-slant-button flex items-center space-x-2 shadow-lg hover:opacity-95 transition-all"
            >
              <Instagram className="w-4 h-4" />
              <span>FOLLOW @__THEFLYERS__ (71.5K+)</span>
            </a>

            <a
              href={getWhatsAppGeneralInquiryUrl('Hi! I want to view latest reels / customer dispatch proofs.')}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white font-tech text-xs tracking-wider uppercase border border-neutral-700 flex items-center space-x-2"
            >
              <MessageCircle className="w-4 h-4 text-[#E8302B]" />
              <span>Ask for Video Proofs</span>
            </a>
          </div>
        </div>

        {/* Real Post Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {proofCards.map((card, idx) => (
            <div
              key={idx}
              className="bg-[#121216] border border-[#222227] clip-corner-cut overflow-hidden group hover:border-[#E8302B]/60 transition-all shadow-xl"
            >
              <div className="relative h-52 w-full overflow-hidden bg-neutral-950">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121216] via-transparent to-transparent" />
                
                <span className="absolute top-3 left-3 text-[10px] font-tech text-white bg-black/80 px-2 py-0.5 rounded border border-neutral-800">
                  {card.category}
                </span>

                <div className="absolute bottom-2 right-3 flex items-center space-x-1 text-xs text-white/90 font-tech bg-black/60 px-2 py-0.5 rounded">
                  <Heart className="w-3 h-3 text-[#E8302B] fill-[#E8302B]" />
                  <span>{card.likes}</span>
                </div>
              </div>

              <div className="p-4">
                <h4 className="font-racing font-bold text-white text-lg uppercase group-hover:text-[#E8302B] transition-colors truncate">
                  {card.title}
                </h4>
                <p className="text-xs text-neutral-400 mt-1 line-clamp-2">
                  {card.desc}
                </p>
                <div className="mt-3 pt-2 border-t border-neutral-800/60 flex items-center justify-between text-[11px] font-tech text-[#E8302B]">
                  <span>{card.tag}</span>
                  <span className="text-neutral-500">Verified Post</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Verified Rider Testimonials */}
        <div className="bg-[#111114] border border-[#222227] p-8 clip-corner-cut">
          <div className="text-center mb-8">
            <h3 className="text-2xl sm:text-3xl font-racing font-black uppercase text-white">
              WHAT RIDERS & CAR BUILDERS SAY
            </h3>
            <p className="text-xs text-neutral-400 font-tech">Real feedback from motorcycle and performance car owners across India</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {riderReviews.map((rev, i) => (
              <div key={i} className="bg-neutral-900/70 p-5 rounded border border-neutral-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center space-x-1 text-[#E8302B] mb-3">
                    {[...Array(rev.rating)].map((_, idx) => (
                      <Star key={idx} className="w-3.5 h-3.5 fill-[#E8302B]" />
                    ))}
                  </div>
                  <p className="text-xs text-neutral-300 italic leading-relaxed">
                    "{rev.comment}"
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-neutral-800 flex items-center justify-between">
                  <div>
                    <h5 className="text-sm font-bold text-white font-tech">{rev.name}</h5>
                    <p className="text-[11px] text-[#E8302B] font-tech">{rev.bike}</p>
                  </div>
                  <span className="text-[10px] text-neutral-500 font-tech">{rev.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
