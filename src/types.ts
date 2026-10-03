export interface ProductItem {
  id: string;
  name: string;
  category: 'helmets' | 'jackets' | 'gloves' | 'tyres' | 'bike-accessories' | 'car-accessories' | 'spares';
  categoryLabel: string;
  price: number;
  originalPrice?: number;
  badge?: string;
  description: string;
  features: string[];
  vehicleCompatibility?: string;
  image: string;
  galleryImages?: string[];
  inStock: boolean;
  isHotOffer?: boolean;
  sku?: string;
  stockCount?: number;
  updatedAt?: string;
}

export interface ProductCategory {
  id: string;
  name: string;
  shortDesc: string;
  itemCount: string;
  startingPrice: string;
  iconName: string;
  image: string;
  popularItems: string[];
}

export interface CustomerProof {
  id: string;
  title: string;
  subtitle: string;
  type: 'review' | 'shipping' | 'tyre' | 'bike';
  stat?: string;
}

export type OrderStatus = 'new' | 'contacted' | 'paid' | 'dispatched' | 'delivered' | 'cancelled';

export interface OrderLead {
  id: string;
  customerName: string;
  customerPhone: string;
  customerLocation?: string;
  productName: string;
  productId?: string;
  amount?: number;
  status: OrderStatus;
  courierName?: string;
  trackingNumber?: string;
  notes?: string;
  source: 'whatsapp_click' | 'custom_inquiry' | 'manual';
  createdAt: string;
  updatedAt?: string;
}

export interface StoreSettings {
  storeName: string;
  tagline: string;
  phone: string;
  phoneDisplay: string;
  whatsappNumber: string;
  instagram: string;
  instagramUrl: string;
  threadsUrl: string;
  followersCount: string;
  shippingInfo: string;
  marqueeAnnouncement: string;
  enableMarquee: boolean;
  adminPasscode: string;
}
