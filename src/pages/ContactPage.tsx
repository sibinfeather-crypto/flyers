import React, { useState } from 'react';
import { BUSINESS_INFO } from '../data/catalog';
import { getWhatsAppGeneralInquiryUrl } from '../utils/whatsapp';
import { 
  Phone, 
  MessageCircle, 
  Instagram, 
  MapPin, 
  Clock, 
  Truck, 
  ShieldCheck, 
  Send, 
  Bike, 
  Car, 
  PackageCheck,
  Sparkles
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [vehicleType, setVehicleType] = useState<'bike' | 'car'>('bike');
  const [model, setModel] = useState('');
  const [partRequired, setPartRequired] = useState('');
  const [pincode, setPincode] = useState('');

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let message = `Hi The Flyer's! 🏁\n\nI want to place an inquiry through your website:`;
    message += `\n- *Vehicle Type*: ${vehicleType === 'bike' ? 'Motorcycle' : 'Car'}`;
    if (model.trim()) message += `\n- *Model*: ${model.trim()}`;
    if (partRequired.trim()) message += `\n- *Part Needed*: ${partRequired.trim()}`;
    if (pincode.trim()) message += `\n- *Delivery Pincode*: ${pincode.trim()}`;
    message += `\n\nPlease let me know availability, photos, and dispatch time. Thank you!`;

    const whatsappUrl = `https://wa.me/91${BUSINESS_INFO.phone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="py-12 bg-[#070709] min-h-screen relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center space-x-2 text-[#E8302B] text-xs font-tech tracking-widest uppercase mb-2">
            <span className="w-6 h-0.5 bg-[#E8302B]" />
            <span>DIRECT CONNECT</span>
            <span className="w-6 h-0.5 bg-[#E8302B]" />
          </div>
          <h1 className="text-3xl sm:text-5xl font-racing font-black uppercase text-white tracking-wide">
            CONTACT & <span className="text-[#E8302B]">ORDER CONCIERGE</span>
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-neutral-400 font-tech">
            Connect directly with our workshop team. Whether you need a quote on track-used tyres, a custom tail tidy, or high-octane styling accessories, we reply promptly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
          
          {/* Left: Contact Info & Delivery Estimates */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick WhatsApp & Call card */}
            <div className="bg-[#111115] border border-[#222227] p-6 clip-corner-cut">
              <h3 className="font-racing font-bold text-white text-xl uppercase mb-4 border-l-2 border-[#E8302B] pl-2">
                DIRECT CONTACT CHANNELS
              </h3>

              <div className="space-y-4 font-tech text-xs">
                <a
                  href={`tel:${BUSINESS_INFO.phone}`}
                  className="flex items-start space-x-3 p-3 bg-neutral-900/70 border border-neutral-800 hover:border-[#E8302B] transition-colors rounded"
                >
                  <Phone className="w-5 h-5 text-[#E8302B] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-neutral-400 uppercase text-[10px]">Call Us Directly</div>
                    <div className="text-white font-bold text-sm">{BUSINESS_INFO.phoneDisplay}</div>
                    <div className="text-neutral-500 text-[11px]">Instant phone support (9 AM - 9 PM IST)</div>
                  </div>
                </a>

                <a
                  href={getWhatsAppGeneralInquiryUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start space-x-3 p-3 bg-neutral-900/70 border border-neutral-800 hover:border-emerald-500 transition-colors rounded"
                >
                  <MessageCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-neutral-400 uppercase text-[10px]">WhatsApp Storefront</div>
                    <div className="text-emerald-400 font-bold text-sm">+91 {BUSINESS_INFO.phone}</div>
                    <div className="text-neutral-500 text-[11px]">Photos, video proofs & courier tracking</div>
                  </div>
                </a>

                <a
                  href={BUSINESS_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start space-x-3 p-3 bg-neutral-900/70 border border-neutral-800 hover:border-pink-500 transition-colors rounded"
                >
                  <Instagram className="w-5 h-5 text-pink-500 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-neutral-400 uppercase text-[10px]">Official Instagram</div>
                    <div className="text-white font-bold text-sm">@__theflyers__ (71.5K+ Followers)</div>
                    <div className="text-neutral-500 text-[11px]">Daily inventory reels, drops & customer stories</div>
                  </div>
                </a>
              </div>
            </div>

            {/* Delivery Timelines Card */}
            <div className="bg-[#111115] border border-[#222227] p-6 clip-corner-cut">
              <div className="flex items-center space-x-2 text-[#E8302B] mb-3">
                <Truck className="w-5 h-5" />
                <h3 className="font-racing font-bold text-white text-lg uppercase">
                  ESTIMATED COURIER TIMELINES
                </h3>
              </div>

              <div className="space-y-3 font-tech text-xs text-neutral-300">
                <div className="flex items-center justify-between py-2 border-b border-neutral-800/80">
                  <span className="text-neutral-400">South India (TN, KL, KA, AP, TS)</span>
                  <span className="font-bold text-white">1 - 3 Days</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-neutral-800/80">
                  <span className="text-neutral-400">West & Central (MH, GJ, MP)</span>
                  <span className="font-bold text-white">2 - 4 Days</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-neutral-800/80">
                  <span className="text-neutral-400">North India (DL, PB, HR, UP, RJ)</span>
                  <span className="font-bold text-white">3 - 5 Days</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-neutral-400">East & Northeast States</span>
                  <span className="font-bold text-white">4 - 6 Days</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-neutral-800 flex items-center space-x-2 text-[11px] font-tech text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
                <span>All shipments dispatched with live tracking ID</span>
              </div>
            </div>

          </div>

          {/* Right: Interactive WhatsApp Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#111115] border border-[#222227] p-6 sm:p-8 clip-corner-cut">
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-neutral-800">
                <div>
                  <span className="text-[11px] font-tech text-[#E8302B] uppercase font-bold tracking-widest">
                    DIRECT DISPATCH DESK
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-racing font-bold text-white uppercase mt-0.5">
                    SUBMIT INQUIRY TO WHATSAPP
                  </h2>
                </div>
                <Sparkles className="w-6 h-6 text-[#E8302B]" />
              </div>

              <p className="text-xs text-neutral-400 font-tech mb-6">
                Fill in your requirements below and tap the button to start a pre-filled WhatsApp conversation with our parts specialist.
              </p>

              <form onSubmit={handleFormSubmit} className="space-y-4 font-tech text-xs">
                {/* Vehicle Selection */}
                <div>
                  <label className="block text-neutral-400 uppercase tracking-wider mb-2 font-semibold">
                    Vehicle Type
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setVehicleType('bike')}
                      className={`py-2.5 px-4 flex items-center justify-center gap-2 border font-bold uppercase transition-all clip-badge-slant ${
                        vehicleType === 'bike'
                          ? 'bg-[#E8302B] text-white border-[#E8302B]'
                          : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:bg-neutral-800'
                      }`}
                    >
                      <Bike className="w-4 h-4" />
                      <span>Motorcycle</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setVehicleType('car')}
                      className={`py-2.5 px-4 flex items-center justify-center gap-2 border font-bold uppercase transition-all clip-badge-slant ${
                        vehicleType === 'car'
                          ? 'bg-[#E8302B] text-white border-[#E8302B]'
                          : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:bg-neutral-800'
                      }`}
                    >
                      <Car className="w-4 h-4" />
                      <span>Performance Car</span>
                    </button>
                  </div>
                </div>

                {/* Model Name */}
                <div>
                  <label className="block text-neutral-400 uppercase tracking-wider mb-1 font-semibold">
                    Vehicle Model & Manufacturing Year
                  </label>
                  <input
                    type="text"
                    required
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    placeholder="e.g. KTM Duke 390 (2022), Yamaha R15 V4, Fortuner (2021)..."
                    className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 focus:border-[#E8302B] text-white focus:outline-none rounded-none"
                  />
                </div>

                {/* Part Needed */}
                <div>
                  <label className="block text-neutral-400 uppercase tracking-wider mb-1 font-semibold">
                    Part / Spares / Tyre Size Needed
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={partRequired}
                    onChange={(e) => setPartRequired(e.target.value)}
                    placeholder="e.g. Need track tyre 150/60-17 + tail tidy + riding jacket offer..."
                    className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 focus:border-[#E8302B] text-white focus:outline-none rounded-none resize-none"
                  />
                </div>

                {/* Pincode */}
                <div>
                  <label className="block text-neutral-400 uppercase tracking-wider mb-1 font-semibold">
                    Delivery Pincode / City (For Courier Calculation)
                  </label>
                  <input
                    type="text"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    placeholder="e.g. 560001 Bangalore / 600028 Chennai / 400001 Mumbai..."
                    className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 focus:border-[#E8302B] text-white focus:outline-none rounded-none"
                  />
                </div>

                {/* Submit button */}
                <div className="pt-3">
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#E8302B] hover:bg-[#cf2520] text-white font-racing text-xl font-bold tracking-wider clip-slant-button flex items-center justify-center space-x-2 transition-transform hover:scale-[1.01] shadow-lg shadow-[#E8302B]/30"
                  >
                    <MessageCircle className="w-5 h-5 fill-white" />
                    <span>LAUNCH WHATSAPP INQUIRY (+91 9025719644)</span>
                  </button>
                  <p className="text-center text-[10px] text-neutral-500 mt-2 font-tech">
                    Directly initiates a WhatsApp conversation with pre-compiled details. No spam guarantee.
                  </p>
                </div>
              </form>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
