import React from 'react';
import { BUSINESS_INFO, INSTAGRAM_HIGHLIGHTS } from '../data/catalog';
import { getWhatsAppGeneralInquiryUrl } from '../utils/whatsapp';
import { ShieldCheck, Truck, Instagram, Award, CheckCircle2, MessageCircle, Package, ArrowRight } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-[#09090c] border-b border-[#222227] relative overflow-hidden">
      {/* Subtle Background Racing Watermark */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 text-[140px] font-racing font-black text-white/[0.02] select-none pointer-events-none tracking-tighter">
        THE FLYER'S
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Business Story & Authority */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#E8302B]/10 border border-[#E8302B]/30 text-[#E8302B] text-xs font-tech tracking-widest uppercase clip-badge-slant">
              <Award className="w-3.5 h-3.5" />
              <span>ABOUT THE FLYER'S</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-racing font-black uppercase text-white tracking-wide leading-tight">
              INDIA'S GO-TO DESTINATION FOR <span className="text-[#E8302B]">TRACK-PROVEN SPARES</span> & RIDER GEAR
            </h2>

            <p className="text-neutral-300 text-base sm:text-lg leading-relaxed font-normal">
              Founded by passionate motorsport enthusiasts, <strong className="text-white">THE FLYER'S</strong> has grown into an established powerhouse with over <strong className="text-[#E8302B]">71.5K+ loyal riders and car builders</strong> across India. We bridge the gap between premium performance equipment and fair, transparent pricing.
            </p>

            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
              Whether you need corner-gripping track-used tyres for your trackday weapon, authentic KTM & superbike spares, high-output LED conversion kits, or custom Batman styling kits for your car — every single part is personally inspected, video-verified, and packed with heavy-duty protection for pan-India courier dispatch.
            </p>

            {/* Core Trust Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start space-x-3 p-3.5 rounded bg-neutral-900/60 border border-neutral-800">
                <ShieldCheck className="w-6 h-6 text-[#E8302B] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white font-tech uppercase">Rigorous Inspection</h4>
                  <p className="text-xs text-neutral-400 mt-0.5">Every tyre, electrical assembly, and armor jacket is tested before dispatch.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3.5 rounded bg-neutral-900/60 border border-neutral-800">
                <Truck className="w-6 h-6 text-[#E8302B] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white font-tech uppercase">Pan-India Shipping</h4>
                  <p className="text-xs text-neutral-400 mt-0.5">Dispatches via DTDC, Professional & Speed Post with real-time tracking IDs.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3.5 rounded bg-neutral-900/60 border border-neutral-800">
                <Package className="w-6 h-6 text-[#E8302B] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white font-tech uppercase">Indestructible Packing</h4>
                  <p className="text-xs text-neutral-400 mt-0.5">Multi-layer bubble wrapping & reinforced corner cartons safeguard your order.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3.5 rounded bg-neutral-900/60 border border-neutral-800">
                <MessageCircle className="w-6 h-6 text-[#E8302B] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white font-tech uppercase">Direct WhatsApp Support</h4>
                  <p className="text-xs text-neutral-400 mt-0.5">Direct chat with the owner at 9025719644 for fitment checks and video walkarounds.</p>
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-4 items-center">
              <a
                href={getWhatsAppGeneralInquiryUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-[#E8302B] hover:bg-[#cf2520] text-white font-racing text-lg font-bold tracking-wider clip-slant-button flex items-center space-x-2 transition-transform hover:scale-105"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>CHAT WITH US ON WHATSAPP</span>
              </a>

              <a
                href={BUSINESS_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 bg-neutral-900 hover:bg-neutral-800 text-white font-tech text-xs tracking-wider uppercase border border-neutral-700 flex items-center space-x-2"
              >
                <Instagram className="w-4 h-4 text-[#E8302B]" />
                <span>Follow @__theflyers__</span>
              </a>
            </div>
          </div>

          {/* Right Column: Visual Showcase & Instagram Proof Card */}
          <div className="lg:col-span-5">
            <div className="bg-[#121216] border border-[#27272e] p-6 clip-corner-cut relative shadow-2xl">
              {/* Corner Racing Accent */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[#E8302B] to-transparent opacity-20 pointer-events-none" />

              {/* Instagram Profile Header Simulation */}
              <div className="flex items-center space-x-4 pb-6 border-b border-neutral-800">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full p-0.5 bg-gradient-to-tr from-yellow-500 via-[#E8302B] to-purple-600">
                    <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden p-1">
                      <span className="font-racing text-white font-black text-xs text-center leading-none">
                        THE<br/><span className="text-[#E8302B]">FLYER'S</span>
                      </span>
                    </div>
                  </div>
                  <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-500 border-2 border-black" title="Active" />
                </div>

                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-tech font-bold text-white text-base">__theflyers__</h3>
                    <CheckCircle2 className="w-4 h-4 text-[#E8302B] fill-[#E8302B]/20" />
                  </div>
                  <p className="text-xs text-neutral-400">Theflyers • Accessories & Spares</p>
                  <p className="text-[11px] text-[#E8302B] font-tech font-semibold">C_N: 9025719644</p>
                </div>
              </div>

              {/* Instagram Stats Row */}
              <div className="grid grid-cols-3 gap-2 py-4 border-b border-neutral-800 text-center font-tech">
                <div>
                  <div className="font-bold text-white text-lg">1,044</div>
                  <div className="text-[11px] text-neutral-400 uppercase">Posts</div>
                </div>
                <div className="border-x border-neutral-800">
                  <div className="font-bold text-[#E8302B] text-lg">71.5K</div>
                  <div className="text-[11px] text-neutral-400 uppercase">Followers</div>
                </div>
                <div>
                  <div className="font-bold text-white text-lg">Pan-India</div>
                  <div className="text-[11px] text-neutral-400 uppercase">Shipping</div>
                </div>
              </div>

              {/* Highlights Chips */}
              <div className="py-4">
                <div className="text-xs font-tech text-neutral-400 uppercase tracking-wider mb-2.5">
                  Featured Story Highlights:
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {INSTAGRAM_HIGHLIGHTS.map((item, idx) => (
                    <div
                      key={idx}
                      className="px-2.5 py-1.5 rounded bg-neutral-900 border border-neutral-800 flex items-center justify-between text-neutral-300"
                    >
                      <span className="font-tech text-[11px] truncate">⭕ {item.name}</span>
                      <span className="text-[10px] text-[#E8302B] font-semibold">{item.count}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dispatch guarantee notice */}
              <div className="mt-4 p-3 bg-neutral-900/90 border-l-2 border-[#E8302B] text-xs text-neutral-300 font-tech">
                <span className="text-[#E8302B] font-bold">100% TRANSPARENCY:</span> We send dispatch photos, package weight slips, and live tracking links before parcel handover.
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
