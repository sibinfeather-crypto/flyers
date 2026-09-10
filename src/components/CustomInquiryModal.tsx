import React, { useState, useEffect } from 'react';
import { BUSINESS_INFO } from '../data/catalog';
import { X, MessageCircle, Send, Bike, Car, Wrench, Shield } from 'lucide-react';

interface CustomInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTopic?: string;
}

export const CustomInquiryModal: React.FC<CustomInquiryModalProps> = ({
  isOpen,
  onClose,
  initialTopic = '',
}) => {
  const [vehicleType, setVehicleType] = useState<'bike' | 'car'>('bike');
  const [model, setModel] = useState('');
  const [partRequired, setPartRequired] = useState(initialTopic);
  const [pincode, setPincode] = useState('');

  useEffect(() => {
    if (initialTopic) {
      setPartRequired(initialTopic);
    }
  }, [initialTopic]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let message = `Hi The Flyer's! 🏁\n\nI have a custom part inquiry:`;
    message += `\n- *Vehicle Type*: ${vehicleType === 'bike' ? 'Motorcycle' : 'Car'}`;
    if (model.trim()) message += `\n- *Model*: ${model.trim()}`;
    if (partRequired.trim()) message += `\n- *Part Needed*: ${partRequired.trim()}`;
    if (pincode.trim()) message += `\n- *Pincode / Location*: ${pincode.trim()}`;
    message += `\n\nPlease let me know price, availability, and dispatch options. Thanks!`;

    const whatsappUrl = `https://wa.me/91${BUSINESS_INFO.phone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div 
        className="relative w-full max-w-lg bg-[#111115] border border-[#27272e] clip-corner-cut shadow-2xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
          <div>
            <div className="text-[11px] font-tech text-[#E8302B] uppercase tracking-widest font-bold">
              DIRECT WHATSAPP CONCIERGE
            </div>
            <h3 className="text-2xl font-racing font-bold text-white uppercase">
              CUSTOM SPARE & ACCESSORY REQUEST
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-neutral-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4 font-tech text-xs">
          {/* Vehicle Type Toggle */}
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
              Vehicle Model & Year
            </label>
            <input
              type="text"
              required
              value={model}
              onChange={(e) => setModel(e.target.value)}
              placeholder="e.g. KTM Duke 390 (2022), Triumph Speed 400, Fortuner..."
              className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 focus:border-[#E8302B] text-white focus:outline-none rounded-none"
            />
          </div>

          {/* Part Required */}
          <div>
            <label className="block text-neutral-400 uppercase tracking-wider mb-1 font-semibold">
              Part / Spares / Tyre Size Needed
            </label>
            <textarea
              rows={3}
              required
              value={partRequired}
              onChange={(e) => setPartRequired(e.target.value)}
              placeholder="e.g. Need track tyre 150/60-17 + tail tidy + riding jacket offer..."
              className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 focus:border-[#E8302B] text-white focus:outline-none rounded-none resize-none"
            />
          </div>

          {/* Location / Pincode */}
          <div>
            <label className="block text-neutral-400 uppercase tracking-wider mb-1 font-semibold">
              Delivery Pincode / City (For Courier Estimate)
            </label>
            <input
              type="text"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              placeholder="e.g. 600028 Chennai / 560001 Bangalore / 400001 Mumbai"
              className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 focus:border-[#E8302B] text-white focus:outline-none rounded-none"
            />
          </div>

          {/* Submit CTA */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 bg-[#E8302B] hover:bg-[#cf2520] text-white font-racing text-xl font-bold tracking-wider clip-slant-button flex items-center justify-center space-x-2 transition-transform hover:scale-[1.01] shadow-lg shadow-[#E8302B]/30"
            >
              <MessageCircle className="w-5 h-5 fill-white" />
              <span>SEND INQUIRY TO WHATSAPP (9025719644)</span>
            </button>
            <p className="text-center text-[10px] text-neutral-500 mt-2 font-tech">
              Opens WhatsApp chat with pre-written request. We respond with pricing & images promptly.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
