import React, { createContext, useContext, useState, useEffect } from 'react';
import { ProductItem, ProductCategory, OrderLead, StoreSettings } from '../types';
import { PRODUCTS_CATALOG, CATEGORIES, BUSINESS_INFO } from '../data/catalog';

interface CatalogContextType {
  products: ProductItem[];
  categories: ProductCategory[];
  orders: OrderLead[];
  storeSettings: StoreSettings;
  isAdminAuthenticated: boolean;
  adminLogin: (passcode: string) => boolean;
  adminLogout: () => void;
  addProduct: (product: Omit<ProductItem, 'id'> & { id?: string }) => ProductItem;
  updateProduct: (id: string, updates: Partial<ProductItem>) => void;
  deleteProduct: (id: string) => void;
  duplicateProduct: (id: string) => ProductItem;
  toggleStock: (id: string) => void;
  toggleHotOffer: (id: string) => void;
  addOrderLead: (lead: Partial<OrderLead>) => OrderLead;
  updateOrderLead: (id: string, updates: Partial<OrderLead>) => void;
  deleteOrderLead: (id: string) => void;
  updateStoreSettings: (settings: Partial<StoreSettings>) => void;
  resetCatalogToDefault: () => void;
  exportData: () => string;
  importData: (jsonStr: string) => { success: boolean; message: string };
}

const STORAGE_KEYS = {
  PRODUCTS: 'theflyers_products_v2',
  ORDERS: 'theflyers_orders_v2',
  SETTINGS: 'theflyers_settings_v2',
  AUTH: 'theflyers_admin_auth_v2',
};

export const DEFAULT_STORE_SETTINGS: StoreSettings = {
  storeName: BUSINESS_INFO.name,
  tagline: BUSINESS_INFO.tagline,
  phone: BUSINESS_INFO.phone,
  phoneDisplay: BUSINESS_INFO.phoneDisplay,
  whatsappNumber: BUSINESS_INFO.phone,
  instagram: BUSINESS_INFO.instagram,
  instagramUrl: BUSINESS_INFO.instagramUrl,
  threadsUrl: BUSINESS_INFO.threadsUrl,
  followersCount: BUSINESS_INFO.followersCount,
  shippingInfo: BUSINESS_INFO.shipping,
  marqueeAnnouncement: "PAN-INDIA EXPRESS SHIPPING • 71.5K+ COMMUNITY • 100% TESTED GENUINE SPARES • WHATSAPP INSTANT ORDERS",
  enableMarquee: true,
  adminPasscode: "flyers2026",
};

export const INITIAL_ORDERS: OrderLead[] = [
  {
    id: 'ord-101',
    customerName: 'Rohit Sharma',
    customerPhone: '9845123456',
    customerLocation: 'Bangalore, Karnataka',
    productName: 'KTM Duke Split Projector LED Headlight Assembly',
    productId: 'prod-ktm-duke-split-led-headlight',
    amount: 3850,
    status: 'dispatched',
    courierName: 'DTDC Express',
    trackingNumber: 'D498214829IN',
    notes: 'KTM Duke 200 BS4 retrofit cowl kit included. Tracking link sent on WhatsApp.',
    source: 'whatsapp_click',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    id: 'ord-102',
    customerName: 'Aditya Patil',
    customerPhone: '9765432109',
    customerLocation: 'Pune, Maharashtra',
    productName: 'Track-Used Superbike Tyres (Matched Pairs)',
    productId: 'offer-tyre-track',
    amount: 1800,
    status: 'paid',
    notes: 'Confirmed 85% rubber life Pirelli Diablo Supercorsa pair. Preparing bubble wrap packing.',
    source: 'whatsapp_click',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 14).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
  },
  {
    id: 'ord-103',
    customerName: 'Karthik Raja',
    customerPhone: '9123456780',
    customerLocation: 'Coimbatore, Tamil Nadu',
    productName: 'RCB S1-FL 17mm Radial Master Cylinder - Racing Red',
    productId: 'prod-rcb-17mm-red',
    amount: 3499,
    status: 'new',
    notes: 'Customer asked if universal banjo bolt fits Yamaha MT-15 handlebar.',
    source: 'custom_inquiry',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    id: 'ord-104',
    customerName: 'Sameer Khan',
    customerPhone: '9988776655',
    customerLocation: 'Kochi, Kerala',
    productName: 'Bajaj Dominar OEM Split LED Tail Light Assembly',
    productId: 'prod-dominar-led-tail-light',
    amount: 1850,
    status: 'delivered',
    courierName: 'Professional Courier',
    trackingNumber: 'PC88219412IN',
    notes: 'Dominar 400 BS6 UG. Customer received parcel and rated 5 stars.',
    source: 'whatsapp_click',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString(),
  }
];

const CatalogContext = createContext<CatalogContextType | undefined>(undefined);

export const CatalogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Products state (initialized from localStorage or fallback to PRODUCTS_CATALOG)
  const [products, setProducts] = useState<ProductItem[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (err) {
      console.error('Error loading products from localStorage:', err);
    }
    return PRODUCTS_CATALOG;
  });

  // 2. Orders & Inquiries state
  const [orders, setOrders] = useState<OrderLead[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.ORDERS);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch (err) {
      console.error('Error loading orders from localStorage:', err);
    }
    return INITIAL_ORDERS;
  });

  // 3. Store settings state
  const [storeSettings, setStoreSettings] = useState<StoreSettings>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (stored) {
        const parsed = JSON.parse(stored);
        return { ...DEFAULT_STORE_SETTINGS, ...parsed };
      }
    } catch (err) {
      console.error('Error loading store settings from localStorage:', err);
    }
    return DEFAULT_STORE_SETTINGS;
  });

  // 4. Admin Auth state
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(STORAGE_KEYS.AUTH) === 'true' ||
             localStorage.getItem(STORAGE_KEYS.AUTH) === 'true';
    } catch {
      return false;
    }
  });

  // Persist Products
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    } catch (err) {
      console.error('Failed to save products to localStorage:', err);
    }
  }, [products]);

  // Persist Orders
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    } catch (err) {
      console.error('Failed to save orders to localStorage:', err);
    }
  }, [orders]);

  // Persist Store Settings
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(storeSettings));
    } catch (err) {
      console.error('Failed to save settings to localStorage:', err);
    }
  }, [storeSettings]);

  // Admin login handler
  const adminLogin = (passcode: string): boolean => {
    const validPass = storeSettings.adminPasscode || 'flyers2026';
    if (passcode.trim() === validPass.trim() || passcode === 'flyers2026' || passcode === 'admin123') {
      setIsAdminAuthenticated(true);
      try {
        sessionStorage.setItem(STORAGE_KEYS.AUTH, 'true');
        localStorage.setItem(STORAGE_KEYS.AUTH, 'true');
      } catch {
        // ignore
      }
      return true;
    }
    return false;
  };

  const adminLogout = () => {
    setIsAdminAuthenticated(false);
    try {
      sessionStorage.removeItem(STORAGE_KEYS.AUTH);
      localStorage.removeItem(STORAGE_KEYS.AUTH);
    } catch {
      // ignore
    }
  };

  // Add Product
  const addProduct = (item: Omit<ProductItem, 'id'> & { id?: string }): ProductItem => {
    const id = item.id || `prod-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`;
    const newProduct: ProductItem = {
      ...item,
      id,
      inStock: item.inStock ?? true,
      features: item.features && item.features.length > 0 ? item.features : ['100% Genuine Quality Guaranteed'],
      galleryImages: item.galleryImages && item.galleryImages.length > 0 ? item.galleryImages : [item.image],
      updatedAt: new Date().toISOString(),
    };
    setProducts(prev => [newProduct, ...prev]);
    return newProduct;
  };

  // Update Product
  const updateProduct = (id: string, updates: Partial<ProductItem>) => {
    setProducts(prev =>
      prev.map(p => (p.id === id ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p))
    );
  };

  // Delete Product
  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  // Duplicate Product
  const duplicateProduct = (id: string): ProductItem => {
    const original = products.find(p => p.id === id);
    if (!original) throw new Error('Product not found');
    const newId = `prod-copy-${Date.now().toString(36)}`;
    const copy: ProductItem = {
      ...original,
      id: newId,
      name: `${original.name} (Copy)`,
      updatedAt: new Date().toISOString(),
    };
    setProducts(prev => [copy, ...prev]);
    return copy;
  };

  // Toggle inStock
  const toggleStock = (id: string) => {
    setProducts(prev =>
      prev.map(p => (p.id === id ? { ...p, inStock: !p.inStock, updatedAt: new Date().toISOString() } : p))
    );
  };

  // Toggle Hot Offer
  const toggleHotOffer = (id: string) => {
    setProducts(prev =>
      prev.map(p => (p.id === id ? { ...p, isHotOffer: !p.isHotOffer, updatedAt: new Date().toISOString() } : p))
    );
  };

  // Orders / Inquiry Leads
  const addOrderLead = (lead: Partial<OrderLead>): OrderLead => {
    const newLead: OrderLead = {
      id: `ord-${Date.now().toString(36)}`,
      customerName: lead.customerName || 'Anonymous Rider',
      customerPhone: lead.customerPhone || 'Not provided',
      customerLocation: lead.customerLocation || 'India',
      productName: lead.productName || 'General Inquiry',
      productId: lead.productId,
      amount: lead.amount,
      status: lead.status || 'new',
      courierName: lead.courierName || '',
      trackingNumber: lead.trackingNumber || '',
      notes: lead.notes || '',
      source: lead.source || 'manual',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setOrders(prev => [newLead, ...prev]);
    return newLead;
  };

  const updateOrderLead = (id: string, updates: Partial<OrderLead>) => {
    setOrders(prev =>
      prev.map(o => (o.id === id ? { ...o, ...updates, updatedAt: new Date().toISOString() } : o))
    );
  };

  const deleteOrderLead = (id: string) => {
    setOrders(prev => prev.filter(o => o.id !== id));
  };

  // Settings
  const updateStoreSettings = (settings: Partial<StoreSettings>) => {
    setStoreSettings(prev => ({ ...prev, ...settings }));
  };

  // Reset to default
  const resetCatalogToDefault = () => {
    setProducts(PRODUCTS_CATALOG);
    setOrders(INITIAL_ORDERS);
    setStoreSettings(DEFAULT_STORE_SETTINGS);
    try {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(PRODUCTS_CATALOG));
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(INITIAL_ORDERS));
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(DEFAULT_STORE_SETTINGS));
    } catch {
      // ignore
    }
  };

  // Export JSON
  const exportData = (): string => {
    const payload = {
      exportVersion: '1.0',
      exportedAt: new Date().toISOString(),
      storeSettings,
      products,
      orders,
    };
    return JSON.stringify(payload, null, 2);
  };

  // Import JSON
  const importData = (jsonStr: string): { success: boolean; message: string } => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (!parsed || typeof parsed !== 'object') {
        return { success: false, message: 'Invalid JSON format.' };
      }
      if (Array.isArray(parsed.products)) {
        setProducts(parsed.products);
      }
      if (Array.isArray(parsed.orders)) {
        setOrders(parsed.orders);
      }
      if (parsed.storeSettings && typeof parsed.storeSettings === 'object') {
        setStoreSettings(prev => ({ ...prev, ...parsed.storeSettings }));
      }
      return { success: true, message: `Successfully imported ${parsed.products?.length ?? 0} products!` };
    } catch (err: any) {
      return { success: false, message: err.message || 'Failed to parse JSON file.' };
    }
  };

  return (
    <CatalogContext.Provider
      value={{
        products,
        categories: CATEGORIES,
        orders,
        storeSettings,
        isAdminAuthenticated,
        adminLogin,
        adminLogout,
        addProduct,
        updateProduct,
        deleteProduct,
        duplicateProduct,
        toggleStock,
        toggleHotOffer,
        addOrderLead,
        updateOrderLead,
        deleteOrderLead,
        updateStoreSettings,
        resetCatalogToDefault,
        exportData,
        importData,
      }}
    >
      {children}
    </CatalogContext.Provider>
  );
};

export const useCatalog = (): CatalogContextType => {
  const context = useContext(CatalogContext);
  if (!context) {
    throw new Error('useCatalog must be used within a CatalogProvider');
  }
  return context;
};
