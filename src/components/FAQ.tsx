import React, { useState } from 'react';
import { FAQ_ITEMS } from '../data/catalog';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';
import { getWhatsAppGeneralInquiryUrl } from '../utils/whatsapp';

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 bg-[#070709] border-b border-[#222227] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 text-[#E8302B] text-xs font-tech tracking-widest uppercase mb-2">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>COMMONLY ASKED QUESTIONS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-racing font-black uppercase text-white tracking-wide">
            FREQUENTLY ASKED <span className="text-[#E8302B]">QUESTIONS</span>
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-neutral-400 font-tech">
            Got questions about fitment, courier tracking, or track tyre condition? Everything is answered below.
          </p>
        </div>

        <div className="space-y-3">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-[#111114] border border-[#222227] rounded-none clip-corner-cut overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-tech cursor-pointer hover:bg-neutral-900/60"
                >
                  <span className="text-base sm:text-lg font-bold text-white uppercase tracking-wide">
                    {item.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#E8302B] transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-neutral-300 font-normal leading-relaxed border-t border-neutral-800/80 pt-3">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-10 p-6 bg-gradient-to-r from-neutral-950 via-[#131318] to-neutral-950 border border-neutral-800 text-center clip-corner-cut">
          <p className="text-xs sm:text-sm text-neutral-300 font-tech">
            Have a custom query or want live photos of any part before placing an order?
          </p>
          <a
            href={getWhatsAppGeneralInquiryUrl('Hi! I have a question before placing an order.')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 mt-3 px-6 py-2.5 bg-[#E8302B] hover:bg-[#cf2520] text-white font-racing text-lg font-bold tracking-wider clip-slant-button"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>ASK US DIRECTLY ON WHATSAPP</span>
          </a>
        </div>

      </div>
    </section>
  );
};
