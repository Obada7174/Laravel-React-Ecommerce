import axios from 'axios';
import type {
  Product,
  Category,
  Order,
  CheckoutData,
  LoginCredentials,
  ProductFilters
} from '../types';

const API_BASE_URL = 'http://localhost:8000/api';

// Laravel API Resource wrapper type
interface ApiResponse<T> {
  data: T;
}

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true, // Important for Sanctum cookie-based auth
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 errors (unauthorized)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
      if (!window.location.pathname.includes('/admin/login')) {
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

// Public API endpoints
export const productsApi = {
  getAll: async (filters?: ProductFilters) => {
    const params = new URLSearchParams();
    if (filters?.category) params.append('category', filters.category.toString());
    if (filters?.search) params.append('search', filters.search);
    if (filters?.min_price) params.append('min_price', filters.min_price.toString());
    if (filters?.max_price) params.append('max_price', filters.max_price.toString());
    if (filters?.page) params.append('page', filters.page.toString());
    if (filters?.per_page) params.append('per_page', filters.per_page.toString());

    const response = await api.get<ApiResponse<Product[]>>(`/products?${params.toString()}`);
    return response.data.data;
  },

  getById: async (id: number) => {
    const response = await api.get<ApiResponse<Product>>(`/products/${id}`);
    return response.data.data;
  },
};

export const categoriesApi = {
  getAll: async () => {
    const response = await api.get<ApiResponse<Category[]>>('/categories');
    return response.data.data;
  },
};

export const checkoutApi = {
  create: async (checkoutData: CheckoutData) => {
    const response = await api.post<ApiResponse<Order>>('/checkout', checkoutData);
    return response.data.data;
  },
};

// Auth API endpoints
export const authApi = {
  login: async (credentials: LoginCredentials) => {
    // First, get CSRF cookie
    await axios.get('http://localhost:8000/sanctum/csrf-cookie', {
      withCredentials: true,
    });

    // Then login
    const { data } = await api.post('/login', credentials);
    return data;
  },

  logout: async () => {
    const { data } = await api.post('/logout');
    return data;
  },
};

// Admin API endpoints (protected)
export const adminProductsApi = {
  getAll: async () => {
    const response = await api.get<ApiResponse<Product[]>>('/admin/products');
    return response.data.data;
  },

  create: async (productData: Partial<Product>) => {
    const response = await api.post<ApiResponse<Product>>('/admin/products', productData);
    return response.data.data;
  },

  update: async (id: number, productData: Partial<Product>) => {
    const response = await api.put<ApiResponse<Product>>(`/admin/products/${id}`, productData);
    return response.data.data;
  },

  delete: async (id: number) => {
    const { data } = await api.delete(`/admin/products/${id}`);
    return data;
  },
};

export const adminOrdersApi = {
  getAll: async () => {
    const response = await api.get<ApiResponse<Order[]>>('/admin/orders');
    return response.data.data;
  },
};

export default api;
