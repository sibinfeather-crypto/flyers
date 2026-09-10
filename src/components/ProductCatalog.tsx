import React, { useState, useMemo } from 'react';
import { PRODUCTS_CATALOG, CATEGORIES } from '../data/catalog';
import { ProductItem } from '../types';
import { getWhatsAppOrderUrl, getWhatsAppGeneralInquiryUrl } from '../utils/whatsapp';
import { Search, Filter, MessageCircle, Check, ArrowUpDown, Sparkles, ExternalLink } from 'lucide-react';

interface ProductCatalogProps {
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onSelectProduct: (product: ProductItem) => void;
  onOpenInquiry: (topic?: string) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  onSelectProduct,
  onOpenInquiry,
}) => {
  const [sortBy, setSortBy] = useState<'featured' | 'low-to-high' | 'high-to-low'>('featured');

  const filterTabs = [
    { id: 'all', label: 'ALL GEAR & SPARES' },
    { id: 'helmets', label: 'HELMETS' },
    { id: 'jackets', label: 'JACKETS' },
    { id: 'gloves', label: 'GLOVES' },
    { id: 'tyres', label: 'TRACK TYRES' },
    { id: 'bike-accessories', label: 'BIKE ACCESSORIES' },
    { id: 'car-accessories', label: 'CAR ACCESSORIES' },
    { id: 'spares', label: 'SPARES' },
  ];

  const filteredProducts = useMemo(() => {
    return PRODUCTS_CATALOG.filter((item) => {
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesCat = item.categoryLabel.toLowerCase().includes(query);
        const matchesFitment = item.vehicleCompatibility?.toLowerCase().includes(query);
        return matchesName || matchesDesc || matchesCat || matchesFitment;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'low-to-high') return a.price - b.price;
      if (sortBy === 'high-to-low') return b.price - a.price;
      return 0;
    });
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <section id="catalog" className="py-20 bg-[#070709] border-b border-[#222227] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 text-[#E8302B] text-xs font-tech tracking-widest uppercase mb-2">
              <span className="w-6 h-0.5 bg-[#E8302B]" />
              <span>LIVE INVENTORY CATALOGUE</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-racing font-black uppercase text-white tracking-wide">
              ALL ACCESSORIES & <span className="text-[#E8302B]">PERFORMANCE SPARES</span>
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-tech text-neutral-400">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#111114] border border-neutral-700 text-neutral-200 text-xs font-tech py-2 px-3 focus:outline-none focus:border-[#E8302B]"
            >
              <option value="featured">Featured Drops</option>
              <option value="low-to-high">Price: Low to High</option>
              <option value="high-to-low">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Category Tabs Strip */}
        <div className="flex overflow-x-auto pb-3 mb-8 scrollbar-none gap-2 border-b border-neutral-800">
          {filterTabs.map((tab) => {
            const isActive = selectedCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onSelectCategory(tab.id)}
                className={`px-4 py-2 text-xs sm:text-sm font-racing tracking-wider uppercase whitespace-nowrap clip-slant-button transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#E8302B] text-white font-bold red-glow-sm'
                    : 'bg-[#121215] text-neutral-300 hover:text-white hover:bg-neutral-800 border border-neutral-800'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Results Counter & Search Indicator */}
        <div className="flex items-center justify-between mb-6 text-xs font-tech text-neutral-400">
          <span>Showing {filteredProducts.length} items in catalogue</span>
          {searchQuery && (
            <div className="flex items-center gap-2">
              <span>Filtered by: "{searchQuery}"</span>
              <button
                onClick={() => onSearchChange('')}
                className="text-[#E8302B] hover:underline cursor-pointer"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((item) => {
              const whatsappUrl = getWhatsAppOrderUrl(item.name, item.price, item.categoryLabel);

              return (
                <div
                  key={item.id}
                  className="bg-[#111114] border border-[#222227] hover:border-[#E8302B] transition-all duration-300 clip-corner-cut flex flex-col justify-between group shadow-lg hover:shadow-xl hover:shadow-black"
                >
                  {/* Image & Badges */}
                  <div className="relative h-48 w-full overflow-hidden bg-neutral-950">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111114] via-transparent to-transparent" />

                    {item.badge && (
                      <span className="absolute top-3 left-3 px-2 py-0.5 bg-[#E8302B] text-white text-[10px] font-racing font-bold tracking-wider clip-badge-slant">
                        {item.badge}
                      </span>
                    )}

                    <span className="absolute bottom-2 left-3 text-[11px] font-tech text-neutral-300 bg-black/80 px-2 py-0.5 rounded border border-neutral-800">
                      {item.categoryLabel}
                    </span>
                  </div>

                  {/* Body Info */}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      {item.vehicleCompatibility && (
                        <div className="text-[10px] font-tech text-[#E8302B] uppercase truncate mb-1">
                          Fit: {item.vehicleCompatibility}
                        </div>
                      )}

                      <h3 className="text-lg sm:text-xl font-racing font-bold text-white uppercase group-hover:text-[#E8302B] transition-colors leading-snug line-clamp-2">
                        {item.name}
                      </h3>

                      <p className="mt-1 text-xs text-neutral-400 line-clamp-2">
                        {item.description}
                      </p>
                    </div>

                    {/* Price & Buttons */}
                    <div className="mt-4 pt-3 border-t border-neutral-800/80">
                      <div className="flex items-baseline justify-between mb-3">
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-xl sm:text-2xl font-racing font-black text-white">
                            ₹{item.price.toLocaleString('en-IN')}
                          </span>
                          {item.originalPrice && (
                            <span className="text-[11px] text-neutral-500 line-through font-tech">
                              ₹{item.originalPrice.toLocaleString('en-IN')}
                            </span>
                          )}
                        </div>

                        <button
                          onClick={() => onSelectProduct(item)}
                          className="text-[11px] font-tech text-neutral-400 hover:text-white underline cursor-pointer"
                        >
                          Specs
                        </button>
                      </div>

                      {/* WhatsApp Order Button */}
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2.5 bg-[#E8302B] hover:bg-[#cf2520] text-white font-racing text-base font-bold tracking-wider clip-slant-button flex items-center justify-center space-x-1.5 transition-colors"
                      >
                        <MessageCircle className="w-3.5 h-3.5 fill-white" />
                        <span>ORDER VIA WHATSAPP</span>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty Search State */
          <div className="py-16 text-center bg-[#111114] border border-dashed border-neutral-800 p-8 clip-corner-cut max-w-xl mx-auto">
            <h3 className="text-2xl font-racing text-white uppercase mb-2">No direct matches found for "{searchQuery}"</h3>
            <p className="text-xs text-neutral-400 mb-6 font-tech">
              We stock hundreds of unlisted KTM, Triumph, Yamaha, superbike, and performance car parts directly sourced on order.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <button
                onClick={() => onOpenInquiry(searchQuery)}
                className="px-6 py-3 bg-[#E8302B] text-white font-racing text-lg font-bold clip-slant-button flex items-center justify-center space-x-2"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>INQUIRE "{searchQuery}" ON WHATSAPP</span>
              </button>
              <button
                onClick={() => {
                  onSearchChange('');
                  onSelectCategory('all');
                }}
                className="px-4 py-3 bg-neutral-900 text-neutral-300 font-tech text-xs border border-neutral-700 hover:bg-neutral-800"
              >
                Reset Filter
              </button>
            </div>
          </div>
        )}

        {/* Custom Sourcing Bar */}
        <div className="mt-12 p-6 bg-[#111114] border border-neutral-800 clip-corner-cut flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3 text-left">
            <div className="p-3 bg-[#E8302B]/15 border border-[#E8302B]/30 rounded-none clip-badge-slant">
              <Sparkles className="w-6 h-6 text-[#E8302B]" />
            </div>
            <div>
              <h4 className="text-lg font-racing font-bold text-white uppercase">Looking for a specific spare or custom part?</h4>
              <p className="text-xs text-neutral-400 font-tech">Send us a photo of the part or your RC details on WhatsApp — we source & deliver pan-India.</p>
            </div>
          </div>

          <button
            onClick={() => onOpenInquiry()}
            className="shrink-0 px-6 py-3 bg-neutral-900 hover:bg-neutral-800 text-white font-tech text-xs tracking-wider uppercase border border-neutral-700 flex items-center space-x-2"
          >
            <span>Request Specific Part</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#E8302B]" />
          </button>
        </div>

      </div>
    </section>
  );
};
