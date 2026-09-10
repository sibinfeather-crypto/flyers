import React, { useState } from 'react';
import { BUSINESS_INFO } from '../data/catalog';
import { getWhatsAppGeneralInquiryUrl } from '../utils/whatsapp';
import { MessageCircle, X } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2">
      {showTooltip && (
        <div className="relative bg-[#111115] border border-[#27272e] p-3 rounded shadow-2xl max-w-xs text-xs font-tech animate-bounce-subtle hidden sm:block">
          <button
            onClick={() => setShowTooltip(false)}
            className="absolute -top-2 -left-2 w-5 h-5 bg-neutral-800 text-neutral-400 hover:text-white rounded-full flex items-center justify-center text-[10px]"
            aria-label="Dismiss"
          >
            <X className="w-3 h-3" />
          </button>
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-bold text-white uppercase font-racing text-sm">Need Help / Live Stock Check?</span>
          </div>
          <p className="text-[11px] text-neutral-400 mt-1">
            Chat with us on WhatsApp at <strong className="text-white">9025719644</strong> for instant replies!
          </p>
        </div>
      )}

      <a
        href={getWhatsAppGeneralInquiryUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-full shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 red-glow"
        aria-label="Chat on WhatsApp"
      >
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#E8302B] rounded-full border-2 border-[#09090b]" />
        <MessageCircle className="w-8 h-8 fill-white" />
      </a>
    </div>
  );
};
