import React from 'react';
import { Link } from 'react-router-dom';
import { BUSINESS_INFO } from '../data/catalog';
import { getWhatsAppGeneralInquiryUrl } from '../utils/whatsapp';
import { 
  ShieldCheck, 
  Truck, 
  Package, 
  Phone, 
  MessageCircle, 
  Instagram, 
  MapPin, 
  Clock, 
  Award, 
  CheckCircle2, 
  Wrench,
  Sparkles
} from 'lucide-react';

interface AboutPageProps {
  onOpenInquiry: (topic?: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenInquiry }) => {
  const steps = [
    {
      num: '01',
      title: 'Curated Sourcing',
      desc: 'We source directly from racing paddocks, motorsport events, and authorized component manufacturers, completely cutting out multi-tier retail markups.',
    },
    {
      num: '02',
      title: 'Rigorous Bench Inspection',
      desc: 'Every tyre undergoes high-PSI pressure immersion testing for zero leaks; electricals and mirrors are tested for exact OEM fitment on test chassis.',
    },
    {
      num: '03',
      title: 'Industrial Heavy Packaging',
      desc: 'Wrapped in multi-layered heavy-gauge bubble armor, reinforced cardboard edge guards, and waterproof industrial sealing film.',
    },
    {
      num: '04',
      title: 'Pan-India Express Dispatch',
      desc: 'Partnered with DTDC, Speed Post, and Professional Couriers. Your live tracking receipt is dispatched directly to your WhatsApp.',
    },
  ];

  return (
    <div className="py-12 bg-[#070709] min-h-screen relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center space-x-2 text-[#E8302B] text-xs font-tech tracking-widest uppercase mb-2">
            <span className="w-6 h-0.5 bg-[#E8302B]" />
            <span>ORIGIN & MISSION</span>
            <span className="w-6 h-0.5 bg-[#E8302B]" />
          </div>
          <h1 className="text-3xl sm:text-5xl font-racing font-black uppercase text-white tracking-wide">
            BUILT BY RIDERS, <span className="text-[#E8302B]">FOR RIDERS</span>
          </h1>
          <p className="mt-3 text-xs sm:text-sm text-neutral-300 font-tech leading-relaxed">
            The Flyer's is India's dedicated motorcycle and automotive enthusiast destination. We provide track-proven performance components, riding gear, and aesthetic body mods without retail markups.
          </p>
        </div>

        {/* Story & Visuals */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-20">
          <div className="lg:col-span-7 space-y-5 text-xs sm:text-sm text-neutral-300 font-tech leading-relaxed">
            <h2 className="text-2xl sm:text-3xl font-racing font-bold text-white uppercase tracking-wide">
              FROM THE TRACK TO YOUR DOORSTEP
            </h2>
            <p>
              Motorcycling in India has transformed rapidly. Modern riders on machines like the KTM Duke 390, Yamaha R15 V4, Triumph Speed 400, and Superbikes demand sticky, reliable rubber and high-grade armor. However, retail stores charge exorbitant prices for brand-new tires that wear down in thousands of kilometers, and standard spares often take weeks to arrive.
            </p>
            <p>
              <strong className="text-white">THE FLYER'S</strong> was created to solve this problem. By sourcing track-used tires with 80%+ center tread life, genuine motorcycle body kits, and CE-certified protective jackets directly, we make performance accessible to everyday riders, canyon enthusiasts, and track racers across India.
            </p>
            <p>
              Over the years, our transparent video unboxings and daily parcel dispatches have built an engaged community of <span className="text-[#E8302B] font-bold">71,500+ followers on Instagram (@__theflyers__)</span>, spanning every state from Kerala and Tamil Nadu to Maharashtra, Punjab, and the Northeast.
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <a
                href={BUSINESS_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-gradient-to-r from-purple-600 via-pink-600 to-[#E8302B] text-white font-racing text-base font-bold tracking-wider clip-slant-button inline-flex items-center space-x-2"
              >
                <Instagram className="w-4 h-4" />
                <span>Follow @__theflyers__</span>
              </a>

              <a
                href={getWhatsAppGeneralInquiryUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-[#E8302B] hover:bg-[#cf2520] text-white font-racing text-base font-bold tracking-wider clip-slant-button inline-flex items-center space-x-2"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative clip-corner-cut border border-[#222227] overflow-hidden bg-neutral-900 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80"
                alt="The Flyers Workshop"
                className="w-full h-80 object-cover opacity-85 hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#09090c] via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-md p-4 border border-neutral-800">
                <div className="text-white font-racing text-lg font-bold uppercase">
                  NATIONWIDE LOGISTICS OPERATION
                </div>
                <div className="text-xs font-tech text-[#E8302B] mt-0.5">
                  Over 1,040+ Dispatches Documented Live on Instagram
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Step Quality Process */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-4xl font-racing font-black text-white uppercase">
              THE FLYER'S QUALITY ASSURANCE WORKFLOW
            </h2>
            <p className="text-xs text-neutral-400 font-tech mt-1">Every part is inspected by technicians before it enters our packing line</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step) => (
              <div
                key={step.num}
                className="bg-[#111115] border border-[#222227] p-6 clip-corner-cut flex flex-col justify-between hover:border-[#E8302B]/60 transition-colors"
              >
                <div>
                  <div className="text-4xl font-racing font-black text-[#E8302B]/40 mb-3">
                    {step.num}
                  </div>
                  <h3 className="text-lg font-racing font-bold text-white uppercase">
                    {step.title}
                  </h3>
                  <p className="text-xs text-neutral-400 font-tech mt-2 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-neutral-800/80 flex items-center space-x-1.5 text-[11px] font-tech text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Quality Guaranteed</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact & Dispatch Hub Quick Card */}
        <div className="bg-[#111115] border border-[#222227] p-8 clip-corner-cut">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start space-x-3">
              <Phone className="w-5 h-5 text-[#E8302B] shrink-0 mt-1" />
              <div>
                <h4 className="font-racing font-bold text-white uppercase text-base">Direct Phone & WhatsApp</h4>
                <p className="text-sm font-tech text-neutral-300 font-bold mt-0.5">{BUSINESS_INFO.phoneDisplay}</p>
                <p className="text-[11px] font-tech text-neutral-500">Call or message for instant price quotes</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Clock className="w-5 h-5 text-[#E8302B] shrink-0 mt-1" />
              <div>
                <h4 className="font-racing font-bold text-white uppercase text-base">Operating Hours</h4>
                <p className="text-sm font-tech text-neutral-300 mt-0.5">Monday – Sunday: 9 AM to 9 PM</p>
                <p className="text-[11px] font-tech text-neutral-500">Same-day courier booking before 4 PM</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-[#E8302B] shrink-0 mt-1" />
              <div>
                <h4 className="font-racing font-bold text-white uppercase text-base">Dispatch Network</h4>
                <p className="text-sm font-tech text-neutral-300 mt-0.5">Pan-India Express Service</p>
                <p className="text-[11px] font-tech text-neutral-500">DTDC, Speed Post, & Professional Couriers</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
