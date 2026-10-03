import React, { useState, useEffect, useRef } from 'react';
import { ProductItem } from '../../types';
import { useCatalog } from '../../context/CatalogContext';
import { 
  X, 
  Upload, 
  Plus, 
  Trash2, 
  Check, 
  Flame, 
  Image as ImageIcon, 
  Tag, 
  Wrench, 
  Sparkles,
  Percent
} from 'lucide-react';

interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: ProductItem | null;
}

const STOCK_SHOP_ASSETS = [
  { label: 'Duke Split LED Headlight 1', path: '/assets/duke-led-headlight-1.jpeg' },
  { label: 'Duke Split LED Headlight 2', path: '/assets/duke-led-headlight-2.jpeg' },
  { label: 'Duke Split LED Headlight 3', path: '/assets/duke-led-headlight-3.jpeg' },
  { label: 'Duke Headlight Conversion Kit', path: '/assets/duke-led-headlight-conversion-kit.jpeg' },
  { label: 'RCB 17mm Master Cylinder (Original)', path: '/assets/rcb-17mm-master-1.jpeg' },
  { label: 'RCB 17mm Master - Red Edition', path: '/assets/rcb-17mm-master-2.jpeg' },
  { label: 'RCB 17mm Master - Matte Black', path: '/assets/rcb-17mm-master-3.jpeg' },
  { label: 'RCB 17mm Master - Gold', path: '/assets/rcb-17mm-master-4.jpeg' },
  { label: 'Dominar LED Tail Light 1', path: '/assets/dominar-led-tail-light-1.jpeg' },
  { label: 'Dominar LED Tail Light 2', path: '/assets/dominar-led-tail-light-2.jpeg' },
  { label: 'Duke Gen 2 Tail Light 1', path: '/assets/duke-gen2-tail-light-1.jpeg' },
  { label: 'Duke Gen 2 Tail Light 2', path: '/assets/duke-gen2-tail-light-2.jpeg' },
  { label: 'Duke TFT Meter Display Shell', path: '/assets/duke-tft-shell.jpeg' },
  { label: 'KTM OEM Sleek Indicators', path: '/assets/ktm-original-indicator.jpeg' },
  { label: 'Mojo Petal Disc Plate', path: '/assets/mojo-disc-plate.jpeg' },
  { label: 'KTM Gen 3 Rear Alloy (Orange)', path: '/assets/ktm-gen3-rear-alloy-1.jpeg' },
  { label: 'Duke Gen 3 Front Alloy', path: '/assets/duke-gen3-front-alloy.jpeg' },
  { label: 'Duke Gen 3 Meter Console', path: '/assets/duke-gen3-meter-1.jpeg' },
  { label: 'KTM RC Halo RGB Ring Light', path: '/assets/ktm-rc-rgb-ring-light-1.jpeg' },
  { label: 'Aero Winglet Mirrors 1', path: '/assets/wing-mirror-naked-bikes-1.jpeg' },
  { label: 'Aero Winglet Mirrors 2', path: '/assets/wing-mirror-naked-bikes-2.jpeg' },
  { label: 'Track Tyres Stock Photo', path: 'https://images.unsplash.com/photo-1578844251758-2f71da64c96f?auto=format&fit=crop&w=800&q=80' },
  { label: 'Sport Helmet Stock Photo', path: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80' },
  { label: 'Riding Jacket Stock Photo', path: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&w=800&q=80' },
  { label: 'Riding Gloves Stock Photo', path: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=800&q=80' },
];

const POPULAR_BADGES = [
  'OEM GENUINE',
  'LIMITED STOCK',
  'NEW ARRIVAL',
  'CONVERSION KIT',
  'RCB SPECIAL',
  'RGB CUSTOM',
  'WAVE ROTOR',
  'BESTSELLER',
  'GEN 3 OEM',
];

export const ProductFormModal: React.FC<ProductFormModalProps> = ({
  isOpen,
  onClose,
  product,
}) => {
  const { addProduct, updateProduct, categories } = useCatalog();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState('');
  const [category, setCategory] = useState<ProductItem['category']>('spares');
  const [categoryLabel, setCategoryLabel] = useState('Spares');
  const [price, setPrice] = useState<number>(1999);
  const [originalPrice, setOriginalPrice] = useState<number | undefined>(3499);
  const [badge, setBadge] = useState('OEM GENUINE');
  const [description, setDescription] = useState('');
  const [features, setFeatures] = useState<string[]>(['']);
  const [vehicleCompatibility, setVehicleCompatibility] = useState('');
  const [image, setImage] = useState('/assets/duke-led-headlight-1.jpeg');
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [inStock, setInStock] = useState(true);
  const [isHotOffer, setIsHotOffer] = useState(false);
  const [sku, setSku] = useState('');
  const [showAssetPicker, setShowAssetPicker] = useState(false);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setCategory(product.category);
      setCategoryLabel(product.categoryLabel || 'Spares');
      setPrice(product.price);
      setOriginalPrice(product.originalPrice);
      setBadge(product.badge || '');
      setDescription(product.description || '');
      setFeatures(product.features && product.features.length > 0 ? product.features : ['']);
      setVehicleCompatibility(product.vehicleCompatibility || '');
      setImage(product.image || '/assets/duke-led-headlight-1.jpeg');
      setGalleryImages(product.galleryImages || []);
      setInStock(product.inStock);
      setIsHotOffer(!!product.isHotOffer);
      setSku(product.sku || '');
    } else {
      // Default blank product
      setName('');
      setCategory('spares');
      setCategoryLabel('Spares');
      setPrice(1999);
      setOriginalPrice(3499);
      setBadge('OEM GENUINE');
      setDescription('');
      setFeatures(['100% Genuine factory-grade materials', 'Direct bolt-on fitment']);
      setVehicleCompatibility('Universal / Check Bike Model');
      setImage('/assets/duke-led-headlight-1.jpeg');
      setGalleryImages([]);
      setInStock(true);
      setIsHotOffer(false);
      setSku(`FLY-${Math.floor(1000 + Math.random() * 9000)}`);
    }
  }, [product, isOpen]);

  if (!isOpen) return null;

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value as ProductItem['category'];
    setCategory(val);
    const catObj = categories.find(c => c.id === val);
    if (catObj) {
      setCategoryLabel(catObj.name);
    }
  };

  const handleAddFeature = () => {
    setFeatures(prev => [...prev, '']);
  };

  const handleFeatureChange = (index: number, val: string) => {
    setFeatures(prev => {
      const copy = [...prev];
      copy[index] = val;
      return copy;
    });
  };

  const handleRemoveFeature = (index: number) => {
    setFeatures(prev => prev.filter((_, i) => i !== index));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const discountPercent = originalPrice && originalPrice > price
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      return;
    }

    const cleanedFeatures = features.map(f => f.trim()).filter(Boolean);

    const productData = {
      name: name.trim(),
      category,
      categoryLabel: categoryLabel || 'Spares',
      price: Number(price),
      originalPrice: originalPrice ? Number(originalPrice) : undefined,
      badge: badge.trim() || undefined,
      description: description.trim(),
      features: cleanedFeatures.length > 0 ? cleanedFeatures : ['100% Genuine Tested Stock'],
      vehicleCompatibility: vehicleCompatibility.trim() || undefined,
      image: image.trim(),
      galleryImages: galleryImages.length > 0 ? galleryImages : [image.trim()],
      inStock,
      isHotOffer,
      sku: sku.trim() || undefined,
    };

    if (product) {
      updateProduct(product.id, productData);
    } else {
      addProduct(productData);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-4xl bg-[#111116] border border-[#2c2c36] shadow-2xl rounded-lg my-8 max-h-[90vh] flex flex-col font-tech text-xs"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-[#16161c] rounded-t-lg shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded bg-[#E8302B]/20 border border-[#E8302B]/40 flex items-center justify-center text-[#E8302B]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] text-[#E8302B] uppercase font-bold tracking-widest">
                CATALOG EDITOR
              </span>
              <h3 className="text-xl font-racing font-bold text-white uppercase tracking-wider">
                {product ? 'EDIT PRODUCT SPECIFICATION' : 'ADD NEW PRODUCT TO CATALOG'}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* 1. Basic Information */}
          <div className="bg-[#15151b] border border-neutral-800/80 p-4 rounded-md space-y-4">
            <h4 className="text-sm font-racing font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-neutral-800 pb-2">
              <Tag className="w-4 h-4 text-[#E8302B]" />
              <span>Basic Information & Classification</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label className="block text-neutral-300 uppercase tracking-wider mb-1 font-semibold">
                  Product Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. KTM Duke Split Projector LED Headlight Assembly"
                  className="w-full px-3 py-2.5 bg-[#1e1e26] border border-[#33333f] focus:border-[#E8302B] rounded text-white text-sm outline-none"
                />
              </div>

              <div>
                <label className="block text-neutral-300 uppercase tracking-wider mb-1 font-semibold">
                  Category *
                </label>
                <select
                  value={category}
                  onChange={handleCategoryChange}
                  className="w-full px-3 py-2.5 bg-[#1e1e26] border border-[#33333f] focus:border-[#E8302B] rounded text-white text-sm outline-none uppercase"
                >
                  <option value="spares">Spares</option>
                  <option value="bike-accessories">Bike Accessories</option>
                  <option value="car-accessories">Car Accessories</option>
                  <option value="tyres">Track-Used Tyres</option>
                  <option value="helmets">Helmets</option>
                  <option value="jackets">Riding Jackets</option>
                  <option value="gloves">Riding Gloves</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-neutral-300 uppercase tracking-wider mb-1 font-semibold">
                  SKU / Stock ID
                </label>
                <input
                  type="text"
                  value={sku}
                  onChange={(e) => setSku(e.target.value)}
                  placeholder="e.g. FLY-KTM-01"
                  className="w-full px-3 py-2 bg-[#1e1e26] border border-[#33333f] focus:border-[#E8302B] rounded text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-neutral-300 uppercase tracking-wider mb-1 font-semibold">
                  Promotional Badge
                </label>
                <input
                  type="text"
                  value={badge}
                  onChange={(e) => setBadge(e.target.value)}
                  placeholder="e.g. OEM GENUINE, LIMITED STOCK"
                  className="w-full px-3 py-2 bg-[#1e1e26] border border-[#33333f] focus:border-[#E8302B] rounded text-white outline-none"
                />
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {POPULAR_BADGES.slice(0, 5).map(b => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setBadge(b)}
                      className="px-1.5 py-0.5 bg-neutral-800 hover:bg-[#E8302B]/20 text-[10px] text-neutral-300 hover:text-white rounded"
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-neutral-300 uppercase tracking-wider mb-1 font-semibold">
                  Vehicle Compatibility
                </label>
                <input
                  type="text"
                  value={vehicleCompatibility}
                  onChange={(e) => setVehicleCompatibility(e.target.value)}
                  placeholder="e.g. KTM Duke 250 / 390 (BS4 & BS6)"
                  className="w-full px-3 py-2 bg-[#1e1e26] border border-[#33333f] focus:border-[#E8302B] rounded text-white outline-none"
                />
              </div>
            </div>
          </div>

          {/* 2. Pricing & Stock Flags */}
          <div className="bg-[#15151b] border border-neutral-800/80 p-4 rounded-md space-y-4">
            <h4 className="text-sm font-racing font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-neutral-800 pb-2">
              <Percent className="w-4 h-4 text-[#E8302B]" />
              <span>Pricing, Discount & Availability</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
              <div>
                <label className="block text-neutral-300 uppercase tracking-wider mb-1 font-semibold">
                  Selling Price (₹) *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 font-bold">₹</span>
                  <input
                    type="number"
                    min="0"
                    required
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full pl-8 pr-3 py-2 bg-[#1e1e26] border border-[#33333f] focus:border-[#E8302B] rounded text-white font-bold text-base outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-300 uppercase tracking-wider mb-1 font-semibold">
                  Original / MRP Price (₹)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 font-bold">₹</span>
                  <input
                    type="number"
                    min="0"
                    value={originalPrice || ''}
                    onChange={(e) => setOriginalPrice(e.target.value ? Number(e.target.value) : undefined)}
                    placeholder="Optional MRP"
                    className="w-full pl-8 pr-3 py-2 bg-[#1e1e26] border border-[#33333f] focus:border-[#E8302B] rounded text-neutral-300 outline-none"
                  />
                </div>
              </div>

              <div>
                <span className="block text-neutral-400 uppercase tracking-wider mb-1">
                  Computed Savings
                </span>
                <div className="px-3 py-2 bg-[#1e1e26] border border-neutral-800 rounded flex items-center justify-between">
                  <span className="text-neutral-400">Discount:</span>
                  <span className={`font-bold ${discountPercent > 0 ? 'text-emerald-400' : 'text-neutral-500'}`}>
                    {discountPercent > 0 ? `${discountPercent}% OFF` : 'None'}
                  </span>
                </div>
              </div>

              {/* Toggles */}
              <div className="flex flex-col gap-2 pt-1">
                <label className="flex items-center space-x-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={inStock}
                    onChange={(e) => setInStock(e.target.checked)}
                    className="w-4 h-4 rounded bg-[#1e1e26] border-neutral-700 text-[#E8302B] focus:ring-0"
                  />
                  <span className={`font-semibold ${inStock ? 'text-emerald-400' : 'text-red-400'}`}>
                    {inStock ? 'In Stock (Available)' : 'Out of Stock'}
                  </span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={isHotOffer}
                    onChange={(e) => setIsHotOffer(e.target.checked)}
                    className="w-4 h-4 rounded bg-[#1e1e26] border-neutral-700 text-[#E8302B] focus:ring-0"
                  />
                  <span className="text-[#E8302B] font-semibold flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 fill-[#E8302B]" />
                    <span>Featured Hot Offer</span>
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* 3. Product Media & Assets */}
          <div className="bg-[#15151b] border border-neutral-800/80 p-4 rounded-md space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
              <h4 className="text-sm font-racing font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-[#E8302B]" />
                <span>Product Media & Imagery</span>
              </h4>
              <button
                type="button"
                onClick={() => setShowAssetPicker(!showAssetPicker)}
                className="text-[11px] text-[#E8302B] hover:underline"
              >
                {showAssetPicker ? 'Hide Asset Library' : 'Browse Local Assets Library'}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
              {/* Image Preview */}
              <div className="flex flex-col items-center">
                <span className="text-neutral-400 uppercase text-[10px] mb-2 font-semibold">
                  Main Image Preview
                </span>
                <div className="w-44 h-44 rounded-lg bg-black border border-neutral-700 overflow-hidden flex items-center justify-center p-2 relative group">
                  {image ? (
                    <img
                      src={image}
                      alt="Product preview"
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        (e.target as any).src = '/assets/duke-led-headlight-1.jpeg';
                      }}
                    />
                  ) : (
                    <span className="text-neutral-600 text-xs">No image</span>
                  )}
                  {badge && (
                    <span className="absolute top-2 left-2 bg-[#E8302B] text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                      {badge}
                    </span>
                  )}
                </div>
              </div>

              {/* URL or Upload Input */}
              <div className="md:col-span-2 space-y-3">
                <div>
                  <label className="block text-neutral-300 uppercase tracking-wider mb-1 font-semibold">
                    Primary Image URL or Path *
                  </label>
                  <input
                    type="text"
                    required
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="/assets/duke-led-headlight-1.jpeg or https://..."
                    className="w-full px-3 py-2 bg-[#1e1e26] border border-[#33333f] focus:border-[#E8302B] rounded text-white outline-none"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3 py-2 bg-[#22222c] hover:bg-[#2b2b38] border border-neutral-700 text-white rounded flex items-center gap-1.5 transition-colors"
                  >
                    <Upload className="w-3.5 h-3.5 text-[#E8302B]" />
                    <span>Upload from Device</span>
                  </button>
                  <span className="text-neutral-500 text-[11px]">
                    PNG, JPG, WebP supported
                  </span>
                </div>

                {/* Built-in Asset Library Grid */}
                {showAssetPicker && (
                  <div className="p-3 bg-[#111116] border border-neutral-800 rounded-lg max-h-56 overflow-y-auto">
                    <span className="block text-neutral-400 font-bold mb-2">
                      Click an asset to set as Primary Image:
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {STOCK_SHOP_ASSETS.map((asset) => (
                        <button
                          key={asset.path}
                          type="button"
                          onClick={() => {
                            setImage(asset.path);
                            setShowAssetPicker(false);
                          }}
                          className={`p-1.5 rounded border text-left flex items-center gap-2 hover:border-[#E8302B] transition-colors ${
                            image === asset.path ? 'border-[#E8302B] bg-[#E8302B]/10' : 'border-neutral-800 bg-[#171720]'
                          }`}
                        >
                          <img
                            src={asset.path}
                            alt={asset.label}
                            className="w-8 h-8 rounded object-cover shrink-0 bg-neutral-900"
                          />
                          <span className="truncate text-[10px] text-neutral-300">
                            {asset.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 4. Description & Key Features */}
          <div className="bg-[#15151b] border border-neutral-800/80 p-4 rounded-md space-y-4">
            <h4 className="text-sm font-racing font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-neutral-800 pb-2">
              <Wrench className="w-4 h-4 text-[#E8302B]" />
              <span>Detailed Description & Bullet Features</span>
            </h4>

            <div>
              <label className="block text-neutral-300 uppercase tracking-wider mb-1 font-semibold">
                Product Description
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe material, construction, build quality, and rider benefits..."
                className="w-full px-3 py-2 bg-[#1e1e26] border border-[#33333f] focus:border-[#E8302B] rounded text-white outline-none leading-relaxed"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-neutral-300 uppercase tracking-wider font-semibold">
                  Specification Bullet Points
                </label>
                <button
                  type="button"
                  onClick={handleAddFeature}
                  className="text-[11px] text-[#E8302B] hover:underline flex items-center gap-1 font-bold"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Bullet Point</span>
                </button>
              </div>

              <div className="space-y-2">
                {features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="text-neutral-500 w-4 text-right">{idx + 1}.</span>
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => handleFeatureChange(idx, e.target.value)}
                      placeholder="e.g. Die-cast aluminum cooling heat sink"
                      className="flex-1 px-3 py-1.5 bg-[#1e1e26] border border-[#33333f] focus:border-[#E8302B] rounded text-white outline-none"
                    />
                    {features.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveFeature(idx)}
                        className="p-1.5 text-neutral-500 hover:text-red-400"
                        aria-label="Remove feature"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-neutral-800">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-7 py-2.5 rounded bg-[#E8302B] hover:bg-[#cf2520] text-white font-racing font-bold text-base uppercase tracking-wider red-glow flex items-center space-x-2 transition-all"
            >
              <Check className="w-4 h-4" />
              <span>{product ? 'SAVE CHANGES' : 'CREATE PRODUCT'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
