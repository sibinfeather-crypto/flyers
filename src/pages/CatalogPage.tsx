import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PRODUCTS_CATALOG, CATEGORIES, BUSINESS_INFO } from '../data/catalog';
import { ProductItem } from '../types';
import { getWhatsAppOrderUrl, getWhatsAppGeneralInquiryUrl } from '../utils/whatsapp';
import { 
  Search, 
  Filter, 
  MessageCircle, 
  Check, 
  ArrowUpDown, 
  Sparkles, 
  ExternalLink,
  RotateCcw,
  SlidersHorizontal
} from 'lucide-react';

interface CatalogPageProps {
  onSelectProduct: (product: ProductItem) => void;
  onOpenInquiry: (topic?: string) => void;
}

export const CatalogPage: React.FC<CatalogPageProps> = ({
  onSelectProduct,
  onOpenInquiry,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Read initial values from URL params
  const categoryParam = searchParams.get('category') || 'all';
  const queryParam = searchParams.get('q') || '';
  const sortParam = searchParams.get('sort') || 'featured';

  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam);
  const [searchQuery, setSearchQuery] = useState<string>(queryParam);
  const [sortBy, setSortBy] = useState<'featured' | 'low-to-high' | 'high-to-low'>(
    (sortParam as any) || 'featured'
  );
  const [priceMax, setPriceMax] = useState<number>(10000);

  // Sync state when URL params change
  useEffect(() => {
    if (searchParams.get('category')) {
      setSelectedCategory(searchParams.get('category')!);
    }
    if (searchParams.get('q') !== null) {
      setSearchQuery(searchParams.get('q') || '');
    }
  }, [searchParams]);

  const updateFilters = (newCat?: string, newQ?: string, newSort?: string) => {
    const params = new URLSearchParams(searchParams);
    if (newCat !== undefined) {
      if (newCat === 'all') params.delete('category');
      else params.set('category', newCat);
      setSelectedCategory(newCat);
    }
    if (newQ !== undefined) {
      if (!newQ) params.delete('q');
      else params.set('q', newQ);
      setSearchQuery(newQ);
    }
    if (newSort !== undefined) {
      if (newSort === 'featured') params.delete('sort');
      else params.set('sort', newSort);
      setSortBy(newSort as any);
    }
    setSearchParams(params);
  };

  const filterTabs = [
    { id: 'all', label: 'ALL INVENTORY' },
    { id: 'helmets', label: 'HELMETS' },
    { id: 'jackets', label: 'RIDING JACKETS' },
    { id: 'gloves', label: 'RIDING GLOVES' },
    { id: 'tyres', label: 'TRACK TYRES' },
    { id: 'bike-accessories', label: 'BIKE ACCESSORIES' },
    { id: 'car-accessories', label: 'CAR ACCESSORIES' },
    { id: 'spares', label: 'SPARES & LEVERS' },
  ];

  const filteredProducts = useMemo(() => {
    return PRODUCTS_CATALOG.filter((item) => {
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      // Price ceiling filter
      if (item.price > priceMax) {
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
  }, [selectedCategory, searchQuery, sortBy, priceMax]);

  const handleClearFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setSortBy('featured');
    setPriceMax(10000);
    setSearchParams({});
  };

  return (
    <div className="py-12 bg-[#070709] min-h-screen relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Title & Breadcrumbs */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 text-xs font-tech text-neutral-400 uppercase tracking-wider mb-2">
            <span>The Flyer's</span>
            <span>/</span>
            <span className="text-[#E8302B] font-bold">Catalog</span>
            {selectedCategory !== 'all' && (
              <>
                <span>/</span>
                <span className="text-white capitalize">{selectedCategory.replace('-', ' ')}</span>
              </>
            )}
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-5xl font-racing font-black uppercase text-white tracking-wide">
                SPARE PARTS & <span className="text-[#E8302B]">ACCESSORIES CATALOG</span>
              </h1>
              <p className="mt-1 text-xs sm:text-sm text-neutral-400 font-tech">
                Live inventory of motorcycle gear, track-tested rubber, custom bike fittings & performance car styling.
              </p>
            </div>

            {/* Direct Custom Part Inquiry CTA */}
            <button
              onClick={() => onOpenInquiry()}
              className="px-4 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white font-tech text-xs tracking-wider uppercase border border-neutral-700 flex items-center gap-2 self-start md:self-auto clip-badge-slant"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#E8302B]" />
              <span>Can't Find Your Part? Request on WhatsApp</span>
            </button>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-[#111115] border border-[#222227] p-4 clip-corner-cut mb-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            
            {/* Search Input */}
            <div className="md:col-span-5 relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => updateFilters(undefined, e.target.value, undefined)}
                placeholder="Search bike, car, part name, size (e.g. Duke 390, Fortuner, 150/60)..."
                className="w-full pl-10 pr-4 py-2.5 bg-[#09090c] border border-neutral-800 text-white placeholder-neutral-500 text-xs font-tech focus:border-[#E8302B] focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => updateFilters(undefined, '', undefined)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white text-xs font-tech"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Sort By Dropdown */}
            <div className="md:col-span-4 flex items-center space-x-2">
              <span className="text-xs font-tech text-neutral-400 whitespace-nowrap">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => updateFilters(undefined, undefined, e.target.value)}
                className="w-full bg-[#09090c] border border-neutral-800 text-white text-xs font-tech py-2.5 px-3 focus:outline-none focus:border-[#E8302B]"
              >
                <option value="featured">Featured Drops & Best Sellers</option>
                <option value="low-to-high">Price: Low to High</option>
                <option value="high-to-low">Price: High to Low</option>
              </select>
            </div>

            {/* Price Max Slider */}
            <div className="md:col-span-3 flex items-center space-x-3">
              <span className="text-xs font-tech text-neutral-400 whitespace-nowrap">
                Max ₹{priceMax.toLocaleString('en-IN')}:
              </span>
              <input
                type="range"
                min="500"
                max="10000"
                step="500"
                value={priceMax}
                onChange={(e) => setPriceMax(Number(e.target.value))}
                className="w-full accent-[#E8302B] cursor-pointer"
              />
            </div>

          </div>
        </div>

        {/* Category Tabs Strip */}
        <div className="flex overflow-x-auto pb-3 mb-8 scrollbar-none gap-2 border-b border-neutral-800">
          {filterTabs.map((tab) => {
            const isActive = selectedCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => updateFilters(tab.id, undefined, undefined)}
                className={`px-4 py-2.5 text-xs sm:text-sm font-racing tracking-wider uppercase whitespace-nowrap clip-slant-button transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#E8302B] text-white font-bold red-glow-sm'
                    : 'bg-[#121215] text-neutral-400 hover:text-white hover:bg-neutral-800 border border-neutral-800'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Active Filters Summary & Result Count */}
        <div className="flex flex-wrap items-center justify-between mb-6 text-xs font-tech text-neutral-400 gap-3">
          <div>
            Showing <strong className="text-white">{filteredProducts.length}</strong> items in inventory
            {selectedCategory !== 'all' && (
              <span> for category <strong className="text-[#E8302B] uppercase">{selectedCategory}</strong></span>
            )}
            {searchQuery && (
              <span> matching "<strong className="text-white">{searchQuery}</strong>"</span>
            )}
          </div>

          {(selectedCategory !== 'all' || searchQuery || sortBy !== 'featured' || priceMax < 10000) && (
            <button
              onClick={handleClearFilters}
              className="inline-flex items-center space-x-1 text-[#E8302B] hover:text-white transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset all filters</span>
            </button>
          )}
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const whatsappOrderUrl = getWhatsAppOrderUrl(product);

              return (
                <div
                  key={product.id}
                  className="bg-[#111114] border border-[#222227] hover:border-[#E8302B]/70 clip-corner-cut transition-all duration-300 flex flex-col justify-between group shadow-lg"
                >
                  {/* Image & Badges */}
                  <div 
                    className="relative h-60 w-full overflow-hidden bg-neutral-950 cursor-pointer"
                    onClick={() => onSelectProduct(product)}
                  >
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                        loading="lazy"
                      />
                    ) : null}
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111114] via-transparent to-transparent" />

                    {/* Tag Badges */}
                    <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5">
                      {product.badge && (
                        <span className="px-2 py-0.5 bg-[#E8302B] text-white text-[10px] font-racing font-bold uppercase tracking-wider clip-badge-slant">
                          {product.badge}
                        </span>
                      )}
                      <span className="px-2 py-0.5 bg-black/70 backdrop-blur-sm text-neutral-300 text-[10px] font-tech uppercase border border-neutral-800">
                        {product.categoryLabel}
                      </span>
                    </div>

                    {/* Quick View trigger */}
                    <div className="absolute bottom-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="px-2.5 py-1 bg-black/80 backdrop-blur-sm text-white text-[11px] font-tech uppercase flex items-center space-x-1 border border-neutral-700">
                        <span>Details</span>
                        <ExternalLink className="w-3 h-3 text-[#E8302B]" />
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      {product.vehicleCompatibility && (
                        <div className="text-[10px] font-tech text-[#E8302B] uppercase tracking-wider font-semibold mb-1 truncate">
                          FIT: {product.vehicleCompatibility}
                        </div>
                      )}

                      <h3
                        onClick={() => onSelectProduct(product)}
                        className="font-racing font-bold text-white text-lg uppercase tracking-wide group-hover:text-[#E8302B] transition-colors cursor-pointer line-clamp-2"
                      >
                        {product.name}
                      </h3>

                      <p className="text-xs text-neutral-400 mt-1 font-normal line-clamp-2">
                        {product.description}
                      </p>

                      {/* Features bullets */}
                      {product.features && product.features.length > 0 && (
                        <div className="mt-2.5 space-y-1">
                          {product.features.slice(0, 2).map((sp, idx) => (
                            <div key={idx} className="flex items-center space-x-1.5 text-[11px] font-tech text-neutral-400">
                              <Check className="w-3 h-3 text-[#E8302B] shrink-0" />
                              <span className="truncate">{sp}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Price and WhatsApp Buy CTA */}
                    <div className="mt-4 pt-3 border-t border-neutral-800">
                      <div className="flex items-baseline justify-between mb-3">
                        <div>
                          <span className="text-2xl font-racing font-black text-white">
                            ₹{product.price.toLocaleString('en-IN')}
                          </span>
                          {product.originalPrice && (
                            <span className="text-xs font-tech text-neutral-500 line-through ml-2">
                              ₹{product.originalPrice.toLocaleString('en-IN')}
                            </span>
                          )}
                        </div>

                        <span className="text-[10px] font-tech text-emerald-400 uppercase tracking-wider font-bold">
                          ● In Stock
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => onSelectProduct(product)}
                          className="py-2.5 px-3 bg-neutral-900 hover:bg-neutral-800 text-white font-tech text-xs uppercase tracking-wider border border-neutral-800 transition-colors"
                        >
                          Specs & Fit
                        </button>

                        <a
                          href={whatsappOrderUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="py-2.5 px-3 bg-[#E8302B] hover:bg-[#cf2520] text-white font-racing text-sm font-bold tracking-wider clip-slant-button flex items-center justify-center space-x-1.5 transition-all shadow-md shadow-[#E8302B]/20"
                        >
                          <MessageCircle className="w-3.5 h-3.5 fill-white" />
                          <span>ORDER</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty Search State */
          <div className="text-center py-16 bg-[#111114] border border-neutral-800 clip-corner-cut p-8">
            <Search className="w-10 h-10 text-neutral-600 mx-auto mb-3" />
            <h3 className="text-2xl font-racing font-bold text-white uppercase">
              NO PARTS MATCHED "{searchQuery || selectedCategory}"
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 font-tech max-w-md mx-auto mt-2">
              We stock many rare vehicle spares and motorcycle track parts that may not be displayed online yet. Send us a quick WhatsApp inquiry!
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button
                onClick={handleClearFilters}
                className="px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white font-tech text-xs tracking-wider uppercase border border-neutral-700"
              >
                Clear Search & Filters
              </button>
              <button
                onClick={() => onOpenInquiry(searchQuery || selectedCategory)}
                className="px-6 py-2.5 bg-[#E8302B] hover:bg-[#cf2520] text-white font-racing text-lg font-bold tracking-wider clip-slant-button flex items-center space-x-2"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>INQUIRE FOR THIS PART ON WHATSAPP</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
