import React from 'react';
import { CATEGORIES } from '../data/catalog';
import { Shield, Shirt, Hand, Disc, Wrench, Car, Cog, ArrowUpRight, ChevronRight, Zap } from 'lucide-react';

interface CategoriesProps {
  onSelectCategory: (categoryId: string) => void;
  selectedCategory: string;
}

export const Categories: React.FC<CategoriesProps> = ({ onSelectCategory, selectedCategory }) => {
  const getCategoryIcon = (iconName: string) => {
    const props = { className: "w-6 h-6 text-[#E8302B]" };
    switch (iconName) {
      case 'Shield': return <Shield {...props} />;
      case 'Shirt': return <Shirt {...props} />;
      case 'Hand': return <Hand {...props} />;
      case 'Disc': return <Disc {...props} />;
      case 'Wrench': return <Wrench {...props} />;
      case 'Car': return <Car {...props} />;
      case 'Cog': return <Cog {...props} />;
      default: return <Zap {...props} />;
    }
  };

  const handleCardClick = (catId: string) => {
    onSelectCategory(catId);
    const catalogElement = document.getElementById('catalog');
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="categories" className="py-20 bg-[#070709] border-b border-[#222227] relative">
      {/* Background Racing Grid */}
      <div className="absolute inset-0 racing-grid-bg opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 text-[#E8302B] text-xs font-tech tracking-widest uppercase mb-2">
              <span className="w-6 h-0.5 bg-[#E8302B]" />
              <span>EXPLORE BY CATEGORY</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-racing font-black uppercase text-white tracking-wide">
              MOTORCYCLE & AUTOMOTIVE <span className="text-[#E8302B]">CATEGORIES</span>
            </h2>
          </div>
          <p className="text-neutral-400 text-sm max-w-md font-normal">
            Click any category to filter our live inventory, inspect part specs, or request immediate WhatsApp price verification.
          </p>
        </div>

        {/* Categories Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {CATEGORIES.map((cat, idx) => {
            const isSelected = selectedCategory === cat.id;

            return (
              <div
                key={cat.id}
                onClick={() => handleCardClick(cat.id)}
                className={`group relative cursor-pointer bg-[#101013] border transition-all duration-300 overflow-hidden clip-corner-cut flex flex-col justify-between ${
                  isSelected 
                    ? 'border-[#E8302B] shadow-lg shadow-[#E8302B]/20 bg-[#151214]' 
                    : 'border-[#222227] hover:border-[#E8302B]/70 hover:shadow-xl hover:shadow-black'
                }`}
              >
                {/* Image Top Half with Dark Gradient Overlay */}
                <div className="relative h-44 w-full overflow-hidden bg-neutral-900">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-70 group-hover:opacity-90"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#101013] via-[#101013]/50 to-transparent" />

                  {/* Starting Price Tag */}
                  <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-md border border-[#E8302B]/40 px-2.5 py-1 text-xs font-tech font-bold text-white clip-badge-slant flex items-center space-x-1">
                    <span className="text-neutral-400 text-[10px]">FROM</span>
                    <span className="text-[#E8302B]">{cat.startingPrice}</span>
                  </div>

                  {/* Icon Box */}
                  <div className="absolute bottom-3 left-4 p-2 rounded bg-black/90 border border-neutral-700 shadow-md">
                    {getCategoryIcon(cat.iconName)}
                  </div>
                </div>

                {/* Content Bottom Half */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl sm:text-2xl font-racing font-bold text-white uppercase group-hover:text-[#E8302B] transition-colors">
                        {cat.name}
                      </h3>
                      <ArrowUpRight className="w-5 h-5 text-neutral-500 group-hover:text-[#E8302B] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </div>

                    <p className="mt-1 text-xs text-neutral-400 line-clamp-2">
                      {cat.shortDesc}
                    </p>

                    {/* Popular Items Pills */}
                    <div className="mt-3 flex flex-wrap gap-1">
                      {cat.popularItems.map((item, i) => (
                        <span
                          key={i}
                          className="text-[10px] font-tech px-2 py-0.5 rounded bg-neutral-900 text-neutral-300 border border-neutral-800"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Action Strip */}
                  <div className="mt-4 pt-3 border-t border-neutral-800/80 flex items-center justify-between text-xs font-tech">
                    <span className="text-neutral-400">{cat.itemCount}</span>
                    <span className="text-[#E8302B] font-bold flex items-center gap-1 group-hover:underline">
                      VIEW STOCK <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>

                {/* Active Red Strip on Bottom */}
                <div className={`h-1 w-full bg-[#E8302B] transition-opacity ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
