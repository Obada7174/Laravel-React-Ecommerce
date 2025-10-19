import axios from 'axios';
import type {
  Product,
  Category,
  Order,
  CheckoutData,
  LoginCredentials,
  RegisterCredentials,
  ProductFilters,
  PaginatedResponse,
  AdminFilters,
  User
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

  // If sending FormData, let browser set Content-Type with boundary
  if (config.data instanceof FormData) {
    delete config.headers['Content-Type'];
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
      if (!window.location.pathname.includes('/login') && !window.location.pathname.includes('/register')) {
        window.location.href = '/login';
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

    const response = await api.get<{ data: Product[] }>(`/products?${params.toString()}`);
    return response.data.data;
  },

  getById: async (id: number) => {
    const response = await api.get<Product>(`/products/${id}`);
    return response.data;
  },
};

export const categoriesApi = {
  getAll: async () => {
    const response = await api.get<Category[]>('/categories');
    return response.data;
  },
};

export const checkoutApi = {
  create: async (checkoutData: CheckoutData) => {
    const response = await api.post<Order>('/checkout', checkoutData);
    return response.data;
  },
};

// Auth API endpoints
export const authApi = {
  register: async (credentials: RegisterCredentials) => {
    // First, get CSRF cookie
    await axios.get('http://localhost:8000/sanctum/csrf-cookie', {
      withCredentials: true,
    });

    // Then register
    const { data } = await api.post('/register', credentials);
    return data;
  },

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
  getAll: async (filters?: AdminFilters) => {
    const params = new URLSearchParams();
    if (filters?.search) params.append('search', filters.search);
    if (filters?.category_id) params.append('category_id', filters.category_id.toString());
    if (filters?.sort) params.append('sort', filters.sort);
    if (filters?.order) params.append('order', filters.order);
    if (filters?.page) params.append('page', filters.page.toString());
    if (filters?.per_page) params.append('per_page', filters.per_page.toString());

    const response = await api.get<PaginatedResponse<Product>>(`/admin/products?${params.toString()}`);
    return response.data;
  },

  getById: async (id: number) => {
    const response = await api.get<Product>(`/admin/products/${id}`);
    return response.data;
  },

  create: async (productData: Partial<Product> | FormData) => {
    const response = await api.post('/admin/products', productData);
    return response.data;
  },

  update: async (id: number, productData: Partial<Product> | FormData) => {
    // Use POST with _method override for FormData since PUT doesn't work well with FormData
    if (productData instanceof FormData) {
      productData.append('_method', 'PUT');
      const response = await api.post(`/admin/products/${id}`, productData);
      return response.data;
    }
    const response = await api.put(`/admin/products/${id}`, productData);
    return response.data;
  },

  delete: async (id: number) => {
    const { data } = await api.delete(`/admin/products/${id}`);
    return data;
  },
};

export const adminCategoriesApi = {
  getAll: async (filters?: AdminFilters) => {
    const params = new URLSearchParams();
    if (filters?.search) params.append('search', filters.search);
    if (filters?.sort) params.append('sort', filters.sort);
    if (filters?.order) params.append('order', filters.order);
    if (filters?.page) params.append('page', filters.page.toString());
    if (filters?.per_page) params.append('per_page', filters.per_page.toString());

    const response = await api.get<PaginatedResponse<Category>>(`/admin/categories?${params.toString()}`);
    return response.data;
  },

  getById: async (id: number) => {
    const response = await api.get<Category>(`/admin/categories/${id}`);
    return response.data;
  },

  create: async (categoryData: Partial<Category>) => {
    const response = await api.post('/admin/categories', categoryData);
    return response.data;
  },

  update: async (id: number, categoryData: Partial<Category>) => {
    const response = await api.put(`/admin/categories/${id}`, categoryData);
    return response.data;
  },

  delete: async (id: number) => {
    const { data } = await api.delete(`/admin/categories/${id}`);
    return data;
  },
};

export const adminUsersApi = {
  getAll: async (filters?: AdminFilters) => {
    const params = new URLSearchParams();
    if (filters?.search) params.append('search', filters.search);
    if (filters?.sort) params.append('sort', filters.sort);
    if (filters?.order) params.append('order', filters.order);
    if (filters?.page) params.append('page', filters.page.toString());
    if (filters?.per_page) params.append('per_page', filters.per_page.toString());

    const response = await api.get<PaginatedResponse<User>>(`/admin/users?${params.toString()}`);
    return response.data;
  },

  getById: async (id: number) => {
    const response = await api.get<User>(`/admin/users/${id}`);
    return response.data;
  },

  create: async (userData: Partial<User> & { password: string }) => {
    const response = await api.post('/admin/users', userData);
    return response.data;
  },

  update: async (id: number, userData: Partial<User> & { password?: string }) => {
    const response = await api.put(`/admin/users/${id}`, userData);
    return response.data;
  },

  delete: async (id: number) => {
    const { data } = await api.delete(`/admin/users/${id}`);
    return data;
  },
};

export const adminOrdersApi = {
  getAll: async (filters?: AdminFilters) => {
    const params = new URLSearchParams();
    if (filters?.search) params.append('search', filters.search);
    if (filters?.sort) params.append('sort', filters.sort);
    if (filters?.order) params.append('order', filters.order);
    if (filters?.page) params.append('page', filters.page.toString());
    if (filters?.per_page) params.append('per_page', filters.per_page.toString());

    const response = await api.get<PaginatedResponse<Order>>(`/admin/orders?${params.toString()}`);
    return response.data;
  },
};

export default api;
