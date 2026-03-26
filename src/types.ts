export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: 'Outerwear' | 'Tops' | 'Bottoms' | 'Dresses';
  images: string[];
  sizes: string[];
  details: {
    fabric: string;
    care: string;
    fit: string;
  };
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: 'admin' | 'customer';
}

export interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  size: string;
  product?: Product;
}
