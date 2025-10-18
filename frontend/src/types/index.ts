export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  category_id: number;
  image: string;
  created_at: string;
  updated_at: string;
  category?: Category;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  created_at: string;
  updated_at: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: number;
  user_name: string;
  user_email: string;
  address: string;
  total: number;
  created_at: string;
  updated_at: string;
  order_items?: OrderItem[];
}

export interface OrderItem {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  price: number;
  product?: Product;
}

export interface CheckoutData {
  user_name: string;
  user_email: string;
  address: string;
  items: Array<{
    product_id: number;
    quantity: number;
    price: number;
  }>;
}

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface ProductFilters {
  category?: number;
  search?: string;
  min_price?: number;
  max_price?: number;
  page?: number;
  per_page?: number;
}
