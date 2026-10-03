import React, { useState } from 'react';
import { useCatalog } from '../../context/CatalogContext';
import { ProductItem } from '../../types';
import { 
  Disc, 
  Plus, 
  Trash2, 
  Edit3, 
  Check, 
  Flame, 
  Search, 
  ShieldCheck, 
  Sparkles,
  ExternalLink,
  MessageCircle
} from 'lucide-react';
import { ProductFormModal } from './ProductFormModal';

const TYRE_SIZES = [
  'All',
  '110/70-17',
  '140/70-17',
  '150/60-17',
  '120/70-17',
  '180/55-17',
  '190/55-17',
  'Matched Pairs'
];

export const TyresInventoryManager: React.FC = () => {
  const { products, toggleStock, toggleHotOffer, deleteProduct, addProduct } = useCatalog();
  const [selectedSizeFilter, setSelectedSizeFilter] = useState('All');
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isQuickAddOpen, setIsQuickAddOpen] = useState(false);

  // Quick Add Tyre form state
  const [brand, setBrand] = useState('Pirelli Diablo Supercorsa');
  const [size, setSize] = useState('150/60-17');
  const [rubberLife, setRubberLife] = useState('85%+');
  const [compound, setCompound] = useState('SC1 Soft-Medium Track Compound');
  const [price, setPrice] = useState(2400);
  const [originalPrice, setOriginalPrice] = useState(8500);
  const [vehicle, setVehicle] = useState('KTM Duke 390 / RC 390 / Dominar 400');

  // Filter tyres
  const tyreProducts = products.filter(p => p.category === 'tyres');

  const filteredTyres = tyreProducts.filter(p => {
    if (selectedSizeFilter === 'All') return true;
    if (selectedSizeFilter === 'Matched Pairs') {
      return p.name.toLowerCase().includes('pair') || p.name.toLowerCase().includes('matched');
    }
    return p.name.includes(selectedSizeFilter) || p.description.includes(selectedSizeFilter) || p.vehicleCompatibility?.includes(selectedSizeFilter);
  });

  const handleQuickAddTyre = (e: React.FormEvent) => {
    e.preventDefault();
    const productName = `${brand} (${size}) - ${rubberLife} Rubber Life`;

    addProduct({
      name: productName,
      category: 'tyres',
      categoryLabel: 'Track Tyres',
      price: Number(price),
      originalPrice: originalPrice ? Number(originalPrice) : undefined,
      badge: `${rubberLife} RUBBER LIFE`,
      description: `Track-inspected high-compound racing tyre (${size}). Retains ${rubberLife} rubber life with exceptional edge cornering grip. Compound: ${compound}. Thoroughly inspected for zero punctures, cuts, or bead stress.`,
      features: [
        `${rubberLife} Deep Tread & Sticky Side Edge Rubber Remaining`,
        `Direct from Competitive Track Days & Superbike Sessions`,
        `Thorough Multi-Point High-Pressure Inspection (Zero Punctures)`,
        `Pan-India Fast Bubble-Crated Doorstep Shipping`,
      ],
      vehicleCompatibility: vehicle,
      image: 'https://images.unsplash.com/photo-1578844251758-2f71da64c96f?auto=format&fit=crop&w=800&q=80',
      galleryImages: ['https://images.unsplash.com/photo-1578844251758-2f71da64c96f?auto=format&fit=crop&w=800&q=80'],
      inStock: true,
      isHotOffer: true,
      sku: `TYRE-${size.replace(/\//g, '-').replace(/-17/g, '')}`,
    });

    setIsQuickAddOpen(false);
  };

  return (
    <div className="space-y-6 font-tech text-xs">
      {/* Tyres Header Banner */}
      <div className="bg-gradient-to-r from-[#171720] via-[#121217] to-[#171720] border border-neutral-800 p-5 rounded-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 bg-[#E8302B]/20 text-[#E8302B] rounded text-[10px] font-bold uppercase tracking-wider mb-1">
            <Disc className="w-3.5 h-3.5" />
            <span>TRACK TYRES HUB SPECIAL</span>
          </div>
          <h3 className="text-xl font-racing font-bold text-white uppercase tracking-wider">
            TRACK-USED SUPERBIKE & SPORTBIKE TYRE INVENTORY
          </h3>
          <p className="text-neutral-400 text-xs mt-0.5">
            Manage high-compound soft/medium tyre batches, matched front/rear pairs, and cornering grip profiles.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsQuickAddOpen(true)}
            className="px-4 py-2.5 bg-[#E8302B] hover:bg-[#cf2520] text-white font-racing font-bold uppercase tracking-wider rounded red-glow flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Add Tyre Batch</span>
          </button>
        </div>
      </div>

      {/* Size Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {TYRE_SIZES.map((sz) => {
          const count = sz === 'All' 
            ? tyreProducts.length 
            : tyreProducts.filter(p => {
                if (sz === 'Matched Pairs') return p.name.toLowerCase().includes('pair');
                return p.name.includes(sz) || p.description.includes(sz);
              }).length;

          return (
            <button
              key={sz}
              onClick={() => setSelectedSizeFilter(sz)}
              className={`px-3 py-1.5 rounded-full uppercase text-[11px] font-bold tracking-wider shrink-0 transition-all ${
                selectedSizeFilter === sz
                  ? 'bg-[#E8302B] text-white'
                  : 'bg-[#15151b] border border-neutral-800 text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <span>{sz}</span>
              <span className={`ml-1.5 px-1.5 py-0.2 rounded-full text-[10px] ${
                selectedSizeFilter === sz ? 'bg-white/20 text-white' : 'bg-neutral-800 text-neutral-400'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Tyre Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTyres.map((tyre) => (
          <div
            key={tyre.id}
            className="bg-[#111116] border border-neutral-800 hover:border-neutral-700 rounded-lg p-4 flex flex-col justify-between transition-all"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="w-16 h-16 rounded bg-black border border-neutral-800 overflow-hidden shrink-0">
                  <img
                    src={tyre.image}
                    alt={tyre.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-1">
                    {tyre.badge && (
                      <span className="px-1.5 py-0.5 rounded bg-[#E8302B]/20 text-[#E8302B] text-[9px] font-bold">
                        {tyre.badge}
                      </span>
                    )}
                    {tyre.isHotOffer && (
                      <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 text-[9px] font-bold flex items-center gap-0.5">
                        <Flame className="w-3 h-3 fill-amber-400" />
                        <span>HOT</span>
                      </span>
                    )}
                  </div>
                  <h4 className="font-bold text-white text-sm leading-snug line-clamp-2">
                    {tyre.name}
                  </h4>
                </div>
              </div>

              <p className="text-[11px] text-neutral-400 line-clamp-2 mb-3">
                {tyre.description}
              </p>

              {tyre.vehicleCompatibility && (
                <div className="text-[10px] text-neutral-500 mb-3 bg-[#181820] p-1.5 rounded">
                  <strong className="text-neutral-400">Fits:</strong> {tyre.vehicleCompatibility}
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-neutral-800/80 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-neutral-500 block uppercase">Offer Price</span>
                <div className="flex items-baseline space-x-1.5">
                  <span className="text-base font-racing font-bold text-white">
                    ₹{tyre.price.toLocaleString('en-IN')}
                  </span>
                  {tyre.originalPrice && (
                    <span className="text-neutral-500 text-xs line-through">
                      ₹{tyre.originalPrice.toLocaleString('en-IN')}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-1.5">
                <button
                  onClick={() => toggleStock(tyre.id)}
                  className={`px-2 py-1 rounded text-[10px] font-bold border transition-colors ${
                    tyre.inStock
                      ? 'bg-emerald-950/40 border-emerald-800 text-emerald-400'
                      : 'bg-red-950/40 border-red-800 text-red-400'
                  }`}
                >
                  {tyre.inStock ? 'IN STOCK' : 'OUT'}
                </button>

                <button
                  onClick={() => {
                    setEditingProduct(tyre);
                    setIsEditModalOpen(true);
                  }}
                  className="p-1.5 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white"
                  title="Edit Tyre"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => {
                    if (confirm(`Delete tyre product ${tyre.name}?`)) {
                      deleteProduct(tyre.id);
                    }
                  }}
                  className="p-1.5 rounded bg-neutral-800 hover:bg-red-950/50 text-neutral-400 hover:text-red-400"
                  title="Delete Tyre"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Add Tyre Modal */}
      {isQuickAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div 
            className="w-full max-w-lg bg-[#111116] border border-neutral-700 p-6 rounded-lg shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <div>
                <span className="text-[10px] text-[#E8302B] uppercase font-bold tracking-widest">
                  TRACK SPECIFICATION
                </span>
                <h3 className="text-lg font-racing font-bold text-white uppercase">
                  ADD TRACK-USED TYRE BATCH
                </h3>
              </div>
              <button
                onClick={() => setIsQuickAddOpen(false)}
                className="text-neutral-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleQuickAddTyre} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-300 uppercase tracking-wider mb-1 font-semibold">
                    Tyre Brand & Model *
                  </label>
                  <select
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    className="w-full px-3 py-2 bg-[#181820] border border-neutral-700 rounded text-white text-xs outline-none"
                  >
                    <option value="Pirelli Diablo Supercorsa">Pirelli Diablo Supercorsa</option>
                    <option value="Metzeler Racetec RR">Metzeler Racetec RR</option>
                    <option value="Michelin Power Cup 2">Michelin Power Cup 2</option>
                    <option value="Dunlop Sportmax Q4">Dunlop Sportmax Q4</option>
                    <option value="Pirelli Diablo Rosso IV Corsa">Pirelli Diablo Rosso IV Corsa</option>
                    <option value="Metzeler Sportec M9 RR">Metzeler Sportec M9 RR</option>
                  </select>
                </div>

                <div>
                  <label className="block text-neutral-300 uppercase tracking-wider mb-1 font-semibold">
                    Tyre Size *
                  </label>
                  <select
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                    className="w-full px-3 py-2 bg-[#181820] border border-neutral-700 rounded text-white text-xs outline-none"
                  >
                    <option value="110/70-17">110/70-17 (Front)</option>
                    <option value="120/70-17">120/70-17 (Superbike Front)</option>
                    <option value="140/70-17">140/70-17 (Rear 150-250cc)</option>
                    <option value="150/60-17">150/60-17 (Rear 300-400cc)</option>
                    <option value="180/55-17">180/55-17 (Superbike Rear)</option>
                    <option value="190/55-17">190/55-17 (Superbike Rear)</option>
                    <option value="110/70 & 150/60 Matched Pair">110/70 & 150/60 Matched Pair</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-300 uppercase tracking-wider mb-1 font-semibold">
                    Rubber Life Remaining
                  </label>
                  <input
                    type="text"
                    value={rubberLife}
                    onChange={(e) => setRubberLife(e.target.value)}
                    placeholder="e.g. 85%+"
                    className="w-full px-3 py-2 bg-[#181820] border border-neutral-700 rounded text-white text-xs outline-none"
                  />
                </div>

                <div>
                  <label className="block text-neutral-300 uppercase tracking-wider mb-1 font-semibold">
                    Compound Type
                  </label>
                  <input
                    type="text"
                    value={compound}
                    onChange={(e) => setCompound(e.target.value)}
                    placeholder="e.g. SC1 Soft Track"
                    className="w-full px-3 py-2 bg-[#181820] border border-neutral-700 rounded text-white text-xs outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-300 uppercase tracking-wider mb-1 font-semibold">
                    Selling Price (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-[#181820] border border-neutral-700 rounded text-white text-xs outline-none font-bold"
                  />
                </div>

                <div>
                  <label className="block text-neutral-300 uppercase tracking-wider mb-1 font-semibold">
                    Original New MRP (₹)
                  </label>
                  <input
                    type="number"
                    value={originalPrice}
                    onChange={(e) => setOriginalPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-[#181820] border border-neutral-700 rounded text-white text-xs outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-300 uppercase tracking-wider mb-1 font-semibold">
                  Vehicle Fitment
                </label>
                <input
                  type="text"
                  value={vehicle}
                  onChange={(e) => setVehicle(e.target.value)}
                  placeholder="e.g. KTM Duke 390 / Yamaha R15 / Ninja"
                  className="w-full px-3 py-2 bg-[#181820] border border-neutral-700 rounded text-white text-xs outline-none"
                />
              </div>

              <div className="flex items-center justify-end space-x-2 pt-3 border-t border-neutral-800">
                <button
                  type="button"
                  onClick={() => setIsQuickAddOpen(false)}
                  className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#E8302B] hover:bg-[#cf2520] text-white font-racing font-bold uppercase rounded red-glow"
                >
                  Add to Tyre Inventory
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Tyre Modal */}
      {isEditModalOpen && (
        <ProductFormModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setEditingProduct(null);
          }}
          product={editingProduct}
        />
      )}
    </div>
  );
};
