import React from 'react';
import { ProductItem } from '../types';
import { getWhatsAppOrderUrl } from '../utils/whatsapp';
import { X, MessageCircle, Check, ShieldCheck, Truck, Clock, Sparkles } from 'lucide-react';

interface ProductDetailModalProps {
  product: ProductItem | null;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
  const [selectedImage, setSelectedImage] = React.useState<string>(product?.image || '');

  React.useEffect(() => {
    if (product) {
      setSelectedImage(product.image);
    }
  }, [product]);

  if (!product) return null;

  const whatsappUrl = getWhatsAppOrderUrl(product.name, product.price, product.categoryLabel);
  const savings = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  const allImages = product.galleryImages && product.galleryImages.length > 0 
    ? product.galleryImages 
    : [product.image];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-3xl bg-[#111115] border border-[#27272e] clip-corner-cut shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-[#0d0d10]">
          <div className="flex items-center space-x-2">
            <span className="text-[#E8302B] font-racing text-lg font-bold">THE FLYER'S</span>
            <span className="text-neutral-600">/</span>
            <span className="text-xs font-tech text-neutral-400 uppercase">{product.categoryLabel}</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Left: Product Image & Gallery */}
            <div className="flex flex-col gap-3">
              <div className="relative rounded bg-neutral-950 overflow-hidden border border-neutral-800 h-64 md:h-72 flex items-center justify-center">
                <img
                  src={selectedImage}
                  alt={product.name}
                  className="w-full h-full object-cover transition-opacity duration-200"
                />
                {product.badge && (
                  <div className="absolute top-3 left-3 px-3 py-1 bg-[#E8302B] text-white text-xs font-racing font-bold tracking-wider clip-badge-slant shadow-lg">
                    {product.badge}
                  </div>
                )}
              </div>

              {allImages.length > 1 && (
                <div className="flex items-center gap-2">
                  {allImages.map((imgUrl, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedImage(imgUrl)}
                      className={`relative w-16 h-16 rounded overflow-hidden border-2 transition-all cursor-pointer ${
                        selectedImage === imgUrl 
                          ? 'border-[#E8302B] ring-2 ring-[#E8302B]/30 scale-105' 
                          : 'border-neutral-800 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={imgUrl} alt={`View angle ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                  <span className="text-[11px] font-tech text-neutral-400 ml-1">
                    {allImages.length} views available
                  </span>
                </div>
              )}
            </div>

            {/* Right: Info & Pricing */}
            <div className="space-y-4">
              <div>
                {product.vehicleCompatibility && (
                  <div className="text-xs font-tech text-[#E8302B] uppercase font-semibold mb-1">
                    Compatible: {product.vehicleCompatibility}
                  </div>
                )}
                <h3 className="text-2xl sm:text-3xl font-racing font-bold text-white uppercase leading-tight">
                  {product.name}
                </h3>
              </div>

              {/* Price Box */}
              <div className="p-4 bg-neutral-900/80 border border-neutral-800 rounded">
                <div className="text-[11px] font-tech text-neutral-400 uppercase">Special WhatsApp Offer Price</div>
                <div className="flex items-baseline gap-3 mt-0.5">
                  <span className="text-3xl font-racing font-black text-white">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-neutral-500 line-through font-tech">
                      ₹{product.originalPrice.toLocaleString('en-IN')}
                    </span>
                  )}
                  {savings > 0 && (
                    <span className="text-xs font-tech text-emerald-400 font-bold bg-emerald-950/80 px-2 py-0.5 border border-emerald-800 rounded">
                      {savings}% OFF
                    </span>
                  )}
                </div>
              </div>

              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                {product.description}
              </p>

              {/* Key Features */}
              <div>
                <h4 className="text-xs font-tech text-neutral-400 uppercase tracking-wider mb-2">
                  Key Specifications:
                </h4>
                <ul className="space-y-1.5">
                  {product.features.map((feat, i) => (
                    <li key={i} className="flex items-start text-xs text-neutral-200 font-tech">
                      <Check className="w-3.5 h-3.5 text-[#E8302B] mr-2 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Shipping & Delivery Guarantees */}
              <div className="grid grid-cols-2 gap-2 pt-2 text-[11px] font-tech text-neutral-400">
                <div className="flex items-center space-x-1.5 p-2 bg-neutral-900 border border-neutral-800 rounded">
                  <Truck className="w-3.5 h-3.5 text-[#E8302B]" />
                  <span>Pan-India Courier</span>
                </div>
                <div className="flex items-center space-x-1.5 p-2 bg-neutral-900 border border-neutral-800 rounded">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#E8302B]" />
                  <span>Verified Genuine</span>
                </div>
              </div>

              {/* Direct WhatsApp Purchase Action */}
              <div className="pt-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 bg-[#E8302B] hover:bg-[#cf2520] text-white font-racing text-xl font-bold tracking-wider clip-slant-button flex items-center justify-center space-x-2 transition-transform hover:scale-[1.02] red-glow-sm"
                >
                  <MessageCircle className="w-5 h-5 fill-white" />
                  <span>ORDER ON WHATSAPP (+91 90257 19644)</span>
                </a>
                <p className="text-center text-[11px] font-tech text-neutral-500 mt-2">
                  Pre-fills product name and offer price directly to WhatsApp for instant verification.
                </p>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
