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
