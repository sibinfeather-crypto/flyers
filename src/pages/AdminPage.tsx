import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCatalog } from '../context/CatalogContext';
import { AdminLogin } from '../components/admin/AdminLogin';
import { ProductFormModal } from '../components/admin/ProductFormModal';
import { OrdersManager } from '../components/admin/OrdersManager';
import { TyresInventoryManager } from '../components/admin/TyresInventoryManager';
import { StoreSettingsTab } from '../components/admin/StoreSettingsTab';
import { ProductItem } from '../types';
import { 
  Package, 
  Disc, 
  MessageCircle, 
  Settings, 
  LogOut, 
  Plus, 
  Search, 
  Filter, 
  ExternalLink, 
  Flame, 
  Edit3, 
  Trash2, 
  Copy, 
  LayoutGrid, 
  List, 
  Tag, 
  ShieldCheck, 
  Truck, 
  TrendingUp,
  AlertTriangle,
  ArrowRight,
  Layers,
  Sparkles,
  Gauge
} from 'lucide-react';

type AdminTab = 'overview' | 'products' | 'tyres' | 'orders' | 'settings';

export const AdminPage: React.FC = () => {
  const { 
    isAdminAuthenticated, 
    adminLogout, 
    products, 
    orders, 
    categories, 
    toggleStock, 
    toggleHotOffer, 
    duplicateProduct, 
    deleteProduct 
  } = useCatalog();

  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [productSearch, setProductSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [stockFilter, setStockFilter] = useState<'all' | 'instock' | 'outstock' | 'hotoffer'>('all');
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');

  // Product modal state
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null);

  // If not logged in, render the login screen
  if (!isAdminAuthenticated) {
    return <AdminLogin />;
  }

  // Filtered products
  const filteredProducts = products.filter((p) => {
    const matchesCat = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesStock = 
      stockFilter === 'all' ||
      (stockFilter === 'instock' && p.inStock) ||
      (stockFilter === 'outstock' && !p.inStock) ||
      (stockFilter === 'hotoffer' && p.isHotOffer);
    const matchesSearch = 
      p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      (p.vehicleCompatibility && p.vehicleCompatibility.toLowerCase().includes(productSearch.toLowerCase())) ||
      (p.badge && p.badge.toLowerCase().includes(productSearch.toLowerCase())) ||
      (p.sku && p.sku.toLowerCase().includes(productSearch.toLowerCase()));

    return matchesCat && matchesStock && matchesSearch;
  });

  // Calculate statistics
  const totalProducts = products.length;
  const inStockCount = products.filter(p => p.inStock).length;
  const outOfStockCount = totalProducts - inStockCount;
  const hotOfferCount = products.filter(p => p.isHotOffer).length;
  const newOrdersCount = orders.filter(o => o.status === 'new').length;
  const tyreProductsCount = products.filter(p => p.category === 'tyres').length;

  const handleOpenAddProduct = () => {
    setEditingProduct(null);
    setIsProductModalOpen(true);
  };

  const handleOpenEditProduct = (product: ProductItem) => {
    setEditingProduct(product);
    setIsProductModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#070709] text-neutral-100 flex flex-col font-tech">
      {/* Top Admin Bar */}
      <header className="sticky top-0 z-40 bg-[#0e0e13]/95 backdrop-blur-md border-b border-[#23232c] px-4 sm:px-6 lg:px-8 py-2.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Logo & Portal Identity */}
          <div className="flex items-center space-x-3">
            <Link to="/" className="flex items-center">
              <img
                src="/assets/theflyers.logo.png"
                alt="The Flyer's"
                className="h-6 sm:h-7 w-auto object-contain"
              />
            </Link>
            <div className="hidden sm:flex items-center space-x-1.5 px-2.5 py-0.5 rounded bg-[#E8302B]/20 border border-[#E8302B]/40 text-[#E8302B] text-[10px] font-bold tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E8302B] animate-pulse" />
              <span>ADMIN COMMAND</span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center space-x-3 text-xs">
            <Link
              to="/"
              className="px-3 py-1.5 rounded bg-[#171720] hover:bg-[#22222d] border border-neutral-700 text-neutral-300 hover:text-white flex items-center gap-1.5 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#E8302B]" />
              <span className="hidden sm:inline">View Live Store</span>
              <span className="sm:hidden">Store</span>
            </Link>

            <button
              onClick={handleOpenAddProduct}
              className="px-3.5 py-1.5 rounded bg-[#E8302B] hover:bg-[#cf2520] text-white font-racing font-bold uppercase tracking-wider red-glow flex items-center gap-1.5 transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Product</span>
            </button>

            <button
              onClick={adminLogout}
              className="p-1.5 text-neutral-400 hover:text-red-400 hover:bg-neutral-800 rounded transition-colors"
              title="Sign Out of Admin Portal"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Navigation Tabs */}
        <div className="flex items-center space-x-1 border-b border-neutral-800 overflow-x-auto pb-1 scrollbar-none text-xs">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2.5 rounded-t-lg font-racing text-sm font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 transition-all ${
              activeTab === 'overview'
                ? 'border-[#E8302B] text-white bg-[#14141c]'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Gauge className="w-4 h-4 text-[#E8302B]" />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2.5 rounded-t-lg font-racing text-sm font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 transition-all ${
              activeTab === 'products'
                ? 'border-[#E8302B] text-white bg-[#14141c]'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Package className="w-4 h-4 text-[#E8302B]" />
            <span>Catalog ({totalProducts})</span>
          </button>

          <button
            onClick={() => setActiveTab('tyres')}
            className={`px-4 py-2.5 rounded-t-lg font-racing text-sm font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 transition-all ${
              activeTab === 'tyres'
                ? 'border-[#E8302B] text-white bg-[#14141c]'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Disc className="w-4 h-4 text-[#E8302B]" />
            <span>Track Tyres ({tyreProductsCount})</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2.5 rounded-t-lg font-racing text-sm font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 transition-all ${
              activeTab === 'orders'
                ? 'border-[#E8302B] text-white bg-[#14141c]'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <MessageCircle className="w-4 h-4 text-[#E8302B]" />
            <span>WhatsApp Leads</span>
            {newOrdersCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-[#E8302B] text-white text-[10px] font-bold">
                {newOrdersCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2.5 rounded-t-lg font-racing text-sm font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 transition-all ${
              activeTab === 'settings'
                ? 'border-[#E8302B] text-white bg-[#14141c]'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Settings className="w-4 h-4 text-[#E8302B]" />
            <span>Store Settings & Backup</span>
          </button>
        </div>

        {/* 1. OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Top Stat Cards Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div 
                onClick={() => setActiveTab('products')} 
                className="bg-[#111116] border border-neutral-800 hover:border-[#E8302B]/60 p-4 rounded-lg cursor-pointer transition-all group"
              >
                <div className="flex items-center justify-between text-neutral-400 text-xs mb-2">
                  <span className="uppercase font-semibold tracking-wider">Catalog Products</span>
                  <Package className="w-4 h-4 text-[#E8302B] group-hover:scale-110 transition-transform" />
                </div>
                <div className="text-3xl font-racing font-bold text-white">{totalProducts}</div>
                <div className="text-[11px] text-neutral-400 mt-1 flex items-center gap-2">
                  <span className="text-emerald-400 font-semibold">{inStockCount} In Stock</span>
                  <span>•</span>
                  <span className="text-red-400 font-semibold">{outOfStockCount} Out</span>
                </div>
              </div>

              <div 
                onClick={() => setActiveTab('orders')} 
                className="bg-[#111116] border border-neutral-800 hover:border-emerald-600/60 p-4 rounded-lg cursor-pointer transition-all group"
              >
                <div className="flex items-center justify-between text-neutral-400 text-xs mb-2">
                  <span className="uppercase font-semibold tracking-wider">WhatsApp Leads</span>
                  <MessageCircle className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                </div>
                <div className="text-3xl font-racing font-bold text-white">{orders.length}</div>
                <div className="text-[11px] text-neutral-400 mt-1">
                  <span className="text-amber-400 font-semibold">{newOrdersCount} New Inquiries</span> to respond
                </div>
              </div>

              <div 
                onClick={() => setActiveTab('tyres')} 
                className="bg-[#111116] border border-neutral-800 hover:border-sky-600/60 p-4 rounded-lg cursor-pointer transition-all group"
              >
                <div className="flex items-center justify-between text-neutral-400 text-xs mb-2">
                  <span className="uppercase font-semibold tracking-wider">Track Tyres Stock</span>
                  <Disc className="w-4 h-4 text-sky-400 group-hover:scale-110 transition-transform" />
                </div>
                <div className="text-3xl font-racing font-bold text-white">{tyreProductsCount}</div>
                <div className="text-[11px] text-neutral-400 mt-1">
                  Pirelli, Metzeler & Michelin track batches
                </div>
              </div>

              <div 
                onClick={() => {
                  setStockFilter('hotoffer');
                  setActiveTab('products');
                }} 
                className="bg-[#111116] border border-neutral-800 hover:border-amber-600/60 p-4 rounded-lg cursor-pointer transition-all group"
              >
                <div className="flex items-center justify-between text-neutral-400 text-xs mb-2">
                  <span className="uppercase font-semibold tracking-wider">Hot Offers</span>
                  <Flame className="w-4 h-4 text-amber-500 group-hover:scale-110 transition-transform" />
                </div>
                <div className="text-3xl font-racing font-bold text-white">{hotOfferCount}</div>
                <div className="text-[11px] text-neutral-400 mt-1">
                  Featured on Homepage hero ribbon
                </div>
              </div>
            </div>

            {/* Quick Management Shortcuts */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-[#121217] border border-neutral-800 p-5 rounded-lg flex flex-col justify-between">
                <div>
                  <h4 className="text-sm font-racing font-bold text-white uppercase tracking-wider mb-1">
                    NEW PRODUCT LAUNCH
                  </h4>
                  <p className="text-xs text-neutral-400 mb-4">
                    Add new KTM spares, RCB radial pumps, Duke conversion headlights, or motorcycle riding gear.
                  </p>
                </div>
                <button
                  onClick={handleOpenAddProduct}
                  className="w-full py-2 bg-[#E8302B] hover:bg-[#cf2520] text-white font-racing font-bold uppercase rounded flex items-center justify-center gap-1.5 transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>Launch New Product</span>
                </button>
              </div>

              <div className="bg-[#121217] border border-neutral-800 p-5 rounded-lg flex flex-col justify-between">
                <div>
                  <h4 className="text-sm font-racing font-bold text-white uppercase tracking-wider mb-1">
                    TRACK TYRES RE-STOCK
                  </h4>
                  <p className="text-xs text-neutral-400 mb-4">
                    Log new 110/70, 140/70, 150/60 or Superbike 180/55 tyre arrivals with rubber life percentages.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('tyres')}
                  className="w-full py-2 bg-[#1b1b24] hover:bg-[#262633] border border-neutral-700 text-white font-racing font-bold uppercase rounded flex items-center justify-center gap-1.5 transition-all"
                >
                  <Disc className="w-4 h-4 text-[#E8302B]" />
                  <span>Manage Track Tyres</span>
                </button>
              </div>

              <div className="bg-[#121217] border border-neutral-800 p-5 rounded-lg flex flex-col justify-between">
                <div>
                  <h4 className="text-sm font-racing font-bold text-white uppercase tracking-wider mb-1">
                    WHATSAPP LEADS DESK
                  </h4>
                  <p className="text-xs text-neutral-400 mb-4">
                    Respond to fitment queries, dispatch customer orders, and update courier tracking AWBs.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('orders')}
                  className="w-full py-2 bg-emerald-950/60 hover:bg-emerald-900 border border-emerald-700 text-emerald-300 font-racing font-bold uppercase rounded flex items-center justify-center gap-1.5 transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Open WhatsApp Leads Desk</span>
                </button>
              </div>
            </div>

            {/* Recent Orders Overview */}
            <div className="bg-[#111116] border border-neutral-800 rounded-lg p-5">
              <div className="flex items-center justify-between mb-4 border-b border-neutral-800 pb-3">
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-[#E8302B]" />
                  <h4 className="text-sm font-racing font-bold text-white uppercase tracking-wider">
                    Recent Customer Inquiries & Orders
                  </h4>
                </div>
                <button
                  onClick={() => setActiveTab('orders')}
                  className="text-xs text-[#E8302B] hover:underline flex items-center gap-1 font-semibold"
                >
                  <span>View All Leads</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-2">
                {orders.slice(0, 4).map((order) => (
                  <div
                    key={order.id}
                    className="p-3 bg-[#16161f] border border-neutral-800/80 rounded flex items-center justify-between text-xs gap-3"
                  >
                    <div>
                      <div className="font-bold text-white flex items-center gap-2">
                        <span>{order.customerName}</span>
                        <span className="text-[10px] text-neutral-400 font-mono">({order.customerPhone})</span>
                      </div>
                      <div className="text-neutral-300 text-[11px] truncate max-w-sm mt-0.5">
                        {order.productName}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {order.amount && (
                        <span className="font-racing font-bold text-white">
                          ₹{order.amount.toLocaleString('en-IN')}
                        </span>
                      )}
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-neutral-800 text-neutral-300">
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 2. PRODUCTS CATALOG TAB */}
        {activeTab === 'products' && (
          <div className="space-y-4">
            {/* Filter Controls Bar */}
            <div className="bg-[#111116] border border-neutral-800 p-4 rounded-lg flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 text-xs">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type="text"
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  placeholder="Search products by name, compatibility, SKU..."
                  className="w-full pl-9 pr-4 py-2 bg-[#181820] border border-neutral-700 rounded text-neutral-200 text-xs focus:border-[#E8302B] outline-none"
                />
              </div>

              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 bg-[#181820] border border-neutral-700 rounded text-neutral-200 uppercase outline-none focus:border-[#E8302B]"
              >
                <option value="all">All Categories</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>

              {/* Stock Filter */}
              <select
                value={stockFilter}
                onChange={(e) => setStockFilter(e.target.value as any)}
                className="px-3 py-2 bg-[#181820] border border-neutral-700 rounded text-neutral-200 uppercase outline-none focus:border-[#E8302B]"
              >
                <option value="all">All Stock Status</option>
                <option value="instock">In Stock Only</option>
                <option value="outstock">Out of Stock</option>
                <option value="hotoffer">Hot Offers Only</option>
              </select>

              {/* View Switcher */}
              <div className="flex items-center space-x-1 border border-neutral-700 rounded p-0.5 bg-[#181820]">
                <button
                  onClick={() => setViewMode('table')}
                  className={`p-1.5 rounded ${viewMode === 'table' ? 'bg-[#E8302B] text-white' : 'text-neutral-400 hover:text-white'}`}
                  title="Table View"
                >
                  <List className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-[#E8302B] text-white' : 'text-neutral-400 hover:text-white'}`}
                  title="Grid View"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Products Table or Grid */}
            {viewMode === 'table' ? (
              <div className="bg-[#111116] border border-neutral-800 rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-[#16161c] border-b border-neutral-800 text-neutral-400 uppercase tracking-wider text-[11px]">
                        <th className="py-3 px-4">Item</th>
                        <th className="py-3 px-4">Category</th>
                        <th className="py-3 px-4">Price</th>
                        <th className="py-3 px-4">Badge</th>
                        <th className="py-3 px-4">Stock</th>
                        <th className="py-3 px-4">Hot Offer</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-800/80">
                      {filteredProducts.map((p) => (
                        <tr key={p.id} className="hover:bg-[#15151e] transition-colors">
                          <td className="py-3 px-4">
                            <div className="flex items-center space-x-3">
                              <img
                                src={p.image}
                                alt={p.name}
                                className="w-10 h-10 rounded object-cover bg-neutral-900 shrink-0 border border-neutral-800"
                                onError={(e) => {
                                  (e.target as any).src = '/assets/duke-led-headlight-1.jpeg';
                                }}
                              />
                              <div className="min-w-0 max-w-xs">
                                <div className="font-bold text-white truncate">{p.name}</div>
                                {p.vehicleCompatibility && (
                                  <div className="text-[10px] text-neutral-500 truncate">
                                    {p.vehicleCompatibility}
                                  </div>
                                )}
                              </div>
                            </div>
                          </td>

                          <td className="py-3 px-4 whitespace-nowrap">
                            <span className="uppercase text-[10px] font-bold text-neutral-400 bg-neutral-800/80 px-2 py-0.5 rounded">
                              {p.categoryLabel || p.category}
                            </span>
                          </td>

                          <td className="py-3 px-4 whitespace-nowrap">
                            <div className="font-racing font-bold text-white text-sm">
                              ₹{p.price.toLocaleString('en-IN')}
                            </div>
                            {p.originalPrice && (
                              <div className="text-[10px] text-neutral-500 line-through">
                                ₹{p.originalPrice.toLocaleString('en-IN')}
                              </div>
                            )}
                          </td>

                          <td className="py-3 px-4 whitespace-nowrap">
                            {p.badge ? (
                              <span className="px-1.5 py-0.5 rounded bg-[#E8302B]/20 text-[#E8302B] text-[9px] font-bold">
                                {p.badge}
                              </span>
                            ) : (
                              <span className="text-neutral-600">—</span>
                            )}
                          </td>

                          <td className="py-3 px-4 whitespace-nowrap">
                            <button
                              onClick={() => toggleStock(p.id)}
                              className={`px-2 py-0.5 rounded text-[10px] font-bold border transition-colors ${
                                p.inStock
                                  ? 'bg-emerald-950/40 border-emerald-800 text-emerald-400 hover:bg-emerald-900/60'
                                  : 'bg-red-950/40 border-red-800 text-red-400 hover:bg-red-900/60'
                              }`}
                            >
                              {p.inStock ? 'IN STOCK' : 'OUT'}
                            </button>
                          </td>

                          <td className="py-3 px-4 whitespace-nowrap">
                            <button
                              onClick={() => toggleHotOffer(p.id)}
                              className={`p-1.5 rounded transition-colors ${
                                p.isHotOffer
                                  ? 'text-amber-400 bg-amber-950/40 border border-amber-800'
                                  : 'text-neutral-600 hover:text-neutral-400'
                              }`}
                              title={p.isHotOffer ? 'Active Hot Offer' : 'Mark as Hot Offer'}
                            >
                              <Flame className="w-4 h-4 fill-current" />
                            </button>
                          </td>

                          <td className="py-3 px-4 whitespace-nowrap text-right">
                            <div className="flex items-center justify-end space-x-1.5">
                              <button
                                onClick={() => handleOpenEditProduct(p)}
                                className="p-1.5 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors"
                                title="Edit Product"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>

                              <button
                                onClick={() => duplicateProduct(p.id)}
                                className="p-1.5 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors"
                                title="Duplicate / Copy Product"
                              >
                                <Copy className="w-3.5 h-3.5" />
                              </button>

                              <button
                                onClick={() => {
                                  if (confirm(`Are you sure you want to delete ${p.name}?`)) {
                                    deleteProduct(p.id);
                                  }
                                }}
                                className="p-1.5 rounded bg-neutral-800 hover:bg-red-950/60 border hover:border-red-800 text-neutral-400 hover:text-red-400 transition-colors"
                                title="Delete Product"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              /* Grid View */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredProducts.map((p) => (
                  <div
                    key={p.id}
                    className="bg-[#111116] border border-neutral-800 rounded-lg p-3.5 flex flex-col justify-between hover:border-neutral-700 transition-all"
                  >
                    <div>
                      <div className="w-full h-40 rounded bg-black border border-neutral-800 overflow-hidden mb-3 relative">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-full h-full object-cover"
                        />
                        {p.badge && (
                          <span className="absolute top-2 left-2 bg-[#E8302B] text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                            {p.badge}
                          </span>
                        )}
                        {p.isHotOffer && (
                          <span className="absolute top-2 right-2 bg-amber-500 text-black text-[9px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5">
                            <Flame className="w-3 h-3 fill-black" />
                            <span>HOT</span>
                          </span>
                        )}
                      </div>

                      <div className="text-[10px] uppercase font-bold text-neutral-400 mb-1">
                        {p.categoryLabel || p.category}
                      </div>

                      <h4 className="font-bold text-white text-xs leading-snug line-clamp-2 mb-1.5">
                        {p.name}
                      </h4>

                      {p.vehicleCompatibility && (
                        <div className="text-[10px] text-neutral-500 line-clamp-1 mb-2">
                          Fits: {p.vehicleCompatibility}
                        </div>
                      )}
                    </div>

                    <div className="pt-2 border-t border-neutral-800 flex items-center justify-between">
                      <div>
                        <div className="font-racing font-bold text-white text-sm">
                          ₹{p.price.toLocaleString('en-IN')}
                        </div>
                      </div>

                      <div className="flex items-center space-x-1.5">
                        <button
                          onClick={() => toggleStock(p.id)}
                          className={`px-1.5 py-0.5 rounded text-[9px] font-bold border ${
                            p.inStock
                              ? 'bg-emerald-950/40 border-emerald-800 text-emerald-400'
                              : 'bg-red-950/40 border-red-800 text-red-400'
                          }`}
                        >
                          {p.inStock ? 'STOCK' : 'OUT'}
                        </button>
                        <button
                          onClick={() => handleOpenEditProduct(p)}
                          className="p-1 rounded bg-neutral-800 text-neutral-300 hover:text-white"
                        >
                          <Edit3 className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Delete ${p.name}?`)) deleteProduct(p.id);
                          }}
                          className="p-1 rounded bg-neutral-800 text-neutral-400 hover:text-red-400"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 3. TRACK TYRES TAB */}
        {activeTab === 'tyres' && <TyresInventoryManager />}

        {/* 4. ORDERS & LEADS TAB */}
        {activeTab === 'orders' && <OrdersManager />}

        {/* 5. STORE SETTINGS & BACKUP TAB */}
        {activeTab === 'settings' && <StoreSettingsTab />}

      </main>

      {/* Product Form Modal (Add / Edit) */}
      {isProductModalOpen && (
        <ProductFormModal
          isOpen={isProductModalOpen}
          onClose={() => {
            setIsProductModalOpen(false);
            setEditingProduct(null);
          }}
          product={editingProduct}
        />
      )}
    </div>
  );
};
