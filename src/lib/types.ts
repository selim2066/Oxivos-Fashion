export interface Product {
  id: number;
  name: string;
  category: string; // 'Men' | 'Women' | 'Kids'
  price: number;
  image: string; // Main display image
  images: string[]; // High-res image gallery
  rating: number;
  colors: string[]; // Supported colors
  sizes: string[]; // Supported sizes
  inStock: boolean;
  description: string;
  subtitle?: string; // Short detail like 'Black / Technical Shell'
  details?: string[]; // Bulleted lists of features
  materials?: string; // Materials and care text
}

export interface CartItem {
  id: string; // Unique combination of product.id + selectedColor + selectedSize
  product: Product;
  quantity: number;
  selectedColor: string;
  selectedSize: string;
}
