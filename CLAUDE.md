# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Meridian Group E-commerce platform - A full-stack monorepo with Laravel 11 REST API backend and React + TypeScript frontend. The architecture follows a decoupled pattern with API-based communication.

**Monorepo Structure**:
- `backend/` - Laravel 11 API server
- `frontend/` - React + TypeScript SPA with Vite

**Tech Stack**:
- Backend: Laravel 11, MySQL, Sanctum auth
- Frontend: React 19, TypeScript, Vite, TailwindCSS v4, Zustand, React Router, Framer Motion
- Development: Concurrent dev servers via composer scripts

## Development Commands

### Initial Setup

**Backend Setup**:
```bash
cd backend
composer setup
```
This runs: `composer install`, creates `.env`, generates key, runs migrations, npm install, and builds frontend assets.

**Frontend Setup** (if working separately):
```bash
cd frontend
npm install
```

**Database Setup**:
```bash
# Create database (MySQL)
mysql -u root -e "CREATE DATABASE IF NOT EXISTS meridian_ecommerce CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

# Run migrations and seeders
cd backend
php artisan migrate:fresh --seed
```

### Development Servers

**Full-Stack Development** (recommended):
```bash
cd backend
composer dev
```
Runs concurrently (all in one terminal):
- Laravel API server (`:8000`)
- Frontend Vite dev server (`:5173`)
- Queue worker
- Log viewer (Laravel Pail)

All processes terminate together with Ctrl+C.

**Frontend Only**:
```bash
cd frontend
npm run dev
```
Vite dev server on `http://localhost:5173`

**Backend Only**:
```bash
cd backend
php artisan serve
```
API server on `http://localhost:8000`

### Database Operations
```bash
# Reset database with fresh migrations and seed data
php artisan migrate:fresh --seed

# Run only seeders (without dropping tables)
php artisan db:seed

# Run specific seeder
php artisan db:seed --class=ProductSeeder
```

### Build & Production

**Frontend Build**:
```bash
cd frontend
npm run build        # TypeScript compile + Vite build
npm run preview      # Preview production build locally
```

**Frontend Linting**:
```bash
cd frontend
npm run lint         # ESLint check
```

### Testing

**Backend Tests** (from `backend/` directory):
```bash
composer test
# Or directly:
php artisan test

# Run specific test file
php artisan test tests/Feature/ProductTest.php

# Run specific test method
php artisan test --filter test_can_create_product
```

**Backend Code Quality**:
```bash
cd backend
./vendor/bin/pint              # Laravel Pint (code formatter)
./vendor/bin/pint app/Models   # Format specific directory
```

### Artisan Utilities
```bash
# Interactive shell with models loaded
php artisan tinker

# View real-time logs
php artisan pail

# Clear caches
php artisan config:clear
php artisan cache:clear
php artisan route:clear
```

## Architecture Overview

### Frontend Architecture

**Location**: `frontend/src/`

**Key Patterns**:
- **Routing**: React Router v7 with separate public/admin routes
- **State Management**: Zustand stores (cart, auth) with localStorage persistence
- **Styling**: TailwindCSS v4 with custom design system, dark mode support
- **Animations**: Framer Motion for page transitions and interactions
- **API Client**: Axios with interceptors for auth and error handling

**Directory Structure**:
```
frontend/src/
├── components/
│   ├── ui/              # Reusable UI components (Button, Card, Input, etc.)
│   ├── layout/          # Navbar, Footer
│   ├── ThemeToggle.tsx  # Dark mode toggle
│   └── ProtectedRoute.tsx
├── pages/
│   ├── Home.tsx         # Landing page with hero, categories, products
│   ├── Products.tsx     # Product listing with filters
│   ├── ProductDetails.tsx
│   ├── Cart.tsx
│   ├── Checkout.tsx
│   └── Admin/           # Admin dashboard, orders, products
├── store/
│   ├── useCartStore.ts  # Shopping cart state (Zustand)
│   └── useAuthStore.ts  # Authentication state (Zustand)
├── services/
│   └── api.ts           # API client and endpoints
├── hooks/
│   └── useTheme.tsx     # Theme provider and hook
├── types/
│   └── index.ts         # TypeScript type definitions
└── lib/
    └── utils.ts         # Utility functions (cn, clsx)
```

**State Management**:
- `useCartStore`: Cart items, add/remove/update, totals (persisted)
- `useAuthStore`: Admin user, token, login/logout (persisted)

**Theme System**:
- Light/dark mode with system preference detection
- Theme stored in localStorage
- CSS variables for consistent theming

### Backend API Structure

**Route Definitions**: `backend/routes/api.php`

All API routes are prefixed with `/api/`. Routes are organized into three groups:

1. **Public Routes** (no authentication):
   - `GET /api/categories` - List all categories
   - `GET /api/products` - List products (with filtering/pagination)
   - `GET /api/products/{id}` - Single product details
   - `POST /api/checkout` - Create order (guest checkout)

2. **Authentication Routes**:
   - `POST /api/login` - Admin login (returns Sanctum token)
   - `POST /api/logout` - Logout (requires auth)

3. **Admin Routes** (protected by `auth:sanctum`):
   - `GET|POST|PUT|DELETE /api/admin/products` - Full CRUD for products
   - `GET /api/admin/orders` - View all orders

**Controller Organization**:
```
backend/app/Http/Controllers/
├── Api/
│   ├── AuthController.php          # Login/logout
│   ├── CategoryController.php      # Public category listing
│   ├── ProductController.php       # Public product browsing
│   ├── OrderController.php         # Guest checkout
│   └── Admin/
│       ├── ProductController.php   # Admin product management
│       └── OrderController.php     # Admin order management
```

**Pattern**: Public controllers serve customer-facing features. Admin controllers require authentication via Sanctum tokens.

### Database Schema

**5 Core Tables** (see `backend/DATABASE_QUICK_START.md` for full details):

1. **users** - Admin authentication only
2. **categories** - Product categorization (4 seeded: Electronics, Clothing, Books, Accessories)
3. **products** - E-commerce inventory (12 sample products seeded)
4. **orders** - Customer purchases
5. **order_items** - Order line items with product snapshots

**Key Relationships**:
- `Category` → `hasMany` → `Product`
- `Product` → `belongsTo` → `Category`
- `Order` → `hasMany` → `OrderItem`
- `OrderItem` → `belongsTo` → `Product` and `Order`

**Models Location**: `backend/app/Models/`

All models include:
- Proper relationships configured
- Query scopes (e.g., `Product::inStock()`, `Order::recent($days)`)
- Computed attributes (e.g., `OrderItem::subtotal`)

### Authentication

**Laravel Sanctum** with SPA authentication pattern:
- Cookie-based sessions for same-domain frontend
- CSRF protection required for state-changing operations
- Admin credentials (seeded): `admin@example.com` / `password`
- Protected routes use `auth:sanctum` middleware

## Development Patterns

### Frontend Patterns

**Component Organization**:
- UI components in `components/ui/` use class-variance-authority for variants
- Page components consume API data via `services/api.ts`
- Use Zustand stores for global state (cart, auth)
- Local state with `useState` for component-specific data

**API Integration**:
```typescript
// services/api.ts exports organized API modules
import { productsApi, categoriesApi } from '@/services/api';

// Use in components
const products = await productsApi.getAll({ category: 1, search: 'laptop' });
const product = await productsApi.getById(5);
```

**State Management (Zustand)**:
```typescript
// Reading state
const items = useCartStore((state) => state.items);
const addItem = useCartStore((state) => state.addItem);

// Actions
addItem(product, quantity);
```

**Routing**:
- Public routes: `/`, `/products`, `/product/:id`, `/cart`, `/checkout`
- Admin routes: `/admin/login`, `/admin/dashboard`, `/admin/orders`
- Protected routes wrapped with `<ProtectedRoute>` component

**Styling**:
- Use Tailwind utility classes for styling
- Component variants via `class-variance-authority` (see `components/ui/button.tsx`)
- Animations with Framer Motion (`motion.div`, `initial`, `animate`, `transition`)
- Theme-aware via CSS variables (`bg-background`, `text-foreground`, etc.)

### Backend Patterns

**Database Queries**:
```php
// Always use eager loading to prevent N+1 queries
Product::with('category')->get();  // Good - 2 queries
Product::all();  // Bad if accessing $product->category in loop

// Use query scopes defined in models
Product::inStock()->byCategory($id)->get();
Order::byCustomer($email)->recent(30)->paginate(10);

// Wrap multi-step operations in transactions
use Illuminate\Support\Facades\DB;
DB::beginTransaction();
try {
    $order = Order::create([...]);
    OrderItem::create([...]);
    DB::commit();
} catch (\Exception $e) {
    DB::rollBack();
    throw $e;
}
```

**API Endpoint Pattern**:
1. Create controller in `Api/` or `Api/Admin/` namespace
2. Use Form Request classes for validation (`app/Http/Requests/`)
3. Return API Resources for serialization (`app/Http/Resources/`)
4. Apply proper middleware (`auth:sanctum` for admin routes)

### File Locations

**Monorepo Root**:
```
meridiangroup-ecommerce/
├── backend/                        # Laravel API
├── frontend/                       # React SPA
└── CLAUDE.md                       # This file
```

**Backend** (`backend/`):
```
backend/
├── app/
│   ├── Http/
│   │   ├── Controllers/Api/        # API controllers
│   │   ├── Requests/               # Form validation
│   │   └── Resources/              # API response transformers
│   ├── Models/                     # Eloquent models (5 core models)
│   └── Providers/
├── database/
│   ├── migrations/                 # 5 migration files
│   ├── seeders/                    # 4 seeder files
│   └── factories/                  # Model factories for testing
├── routes/
│   ├── api.php                     # All API routes
│   └── web.php                     # Minimal (serves SPA)
├── tests/
│   ├── Feature/                    # Integration tests
│   └── Unit/                       # Unit tests
├── composer.json                   # PHP dependencies + scripts
├── DATABASE_DOCUMENTATION.md
├── DATABASE_QUICK_START.md
└── TECHNICAL_ARCHITECTURE.md
```

**Frontend** (`frontend/`):
```
frontend/
├── src/
│   ├── components/                 # React components
│   ├── pages/                      # Route pages
│   ├── store/                      # Zustand stores
│   ├── services/                   # API client
│   ├── hooks/                      # Custom hooks
│   ├── types/                      # TypeScript types
│   ├── lib/                        # Utilities
│   ├── App.tsx                     # Root component
│   └── main.tsx                    # Entry point
├── package.json                    # npm dependencies + scripts
├── vite.config.ts                  # Vite configuration
├── tsconfig.json                   # TypeScript config
└── postcss.config.js               # PostCSS/Tailwind config
```

## Important Configuration

### Backend Environment (`backend/.env`)

Key variables (see `backend/.env.example`):
```env
DB_CONNECTION=mysql
DB_DATABASE=meridian_ecommerce
DB_USERNAME=root
DB_PASSWORD=

# For Sanctum SPA auth with frontend
SANCTUM_STATEFUL_DOMAINS=localhost:5173
SESSION_DRIVER=database
```

### Frontend API Configuration

API base URL is hardcoded in `frontend/src/services/api.ts`:
```typescript
const API_BASE_URL = 'http://localhost:8000/api';
```

**CORS**: Backend `config/cors.php` is configured for `localhost:5173` (Vite dev server).

### Authentication Flow

1. Frontend gets CSRF cookie: `GET /sanctum/csrf-cookie`
2. Login request: `POST /api/login` with credentials
3. Backend returns Sanctum token
4. Frontend stores token in localStorage
5. Subsequent requests include token in `Authorization: Bearer {token}` header
6. Admin routes protected by `auth:sanctum` middleware

## Testing Notes

- PHPUnit configuration: `backend/phpunit.xml`
- Test database configured to use SQLite in memory (`:memory:`)
- Feature tests should test full request/response cycle
- Use database transactions in tests for cleanup: `use RefreshDatabase;`

## Common Operations

### Adding a New Frontend Page

1. Create page component in `frontend/src/pages/` (e.g., `About.tsx`)
2. Add route in `frontend/src/App.tsx`:
   ```typescript
   <Route path="/about" element={<About />} />
   ```
3. Add navigation link in `frontend/src/components/layout/Navbar.tsx`
4. For admin pages, wrap with `<ProtectedRoute>` component

### Adding a New UI Component

1. Create component in `frontend/src/components/ui/` (e.g., `dialog.tsx`)
2. Use `class-variance-authority` for variants if needed
3. Import and use: `import { Dialog } from '@/components/ui/dialog'`
4. Follow existing patterns (Button, Card, Input examples)

### Adding a New Backend API Endpoint

1. Define route in `backend/routes/api.php`
2. Create controller method in `backend/app/Http/Controllers/Api/`
3. Create Form Request for validation (optional)
4. Create API Resource for response (optional)
5. Add frontend API function in `frontend/src/services/api.ts`
6. Add TypeScript types in `frontend/src/types/index.ts`
7. Add backend feature test in `backend/tests/Feature/`

### Adding a New Database Model

1. Create migration: `php artisan make:migration create_tablename_table` (from `backend/`)
2. Create model: `php artisan make:model ModelName`
3. Define relationships in model
4. Add query scopes for common queries
5. Create factory: `php artisan make:factory ModelNameFactory`
6. Create seeder: `php artisan make:seeder ModelNameSeeder`
7. Add TypeScript type in `frontend/src/types/index.ts`
8. Run migration: `php artisan migrate:fresh --seed`

### Modifying Database Schema

1. Create migration: `php artisan make:migration description_of_change` (from `backend/`)
2. Update model if relationships/attributes changed
3. Update seeders if sample data affected
4. Update TypeScript types in `frontend/src/types/index.ts`
5. Run migration: `php artisan migrate` (or `migrate:fresh --seed` in development)

## Key Dependencies

### Frontend
- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite 7** - Build tool and dev server
- **React Router 7** - Client-side routing
- **Zustand 5** - State management (cart, auth)
- **TailwindCSS 4** - Utility-first CSS framework
- **Framer Motion 12** - Animation library
- **Axios** - HTTP client with interceptors
- **React Hot Toast** - Toast notifications
- **Lucide React** - Icon library
- **class-variance-authority** - Component variant system

### Backend
- **Laravel 11** - PHP framework
- **Laravel Sanctum** - API authentication
- **Laravel Pail** - Log viewer
- **Laravel Tinker** - REPL
- **Laravel Pint** - Code formatter
- **PHPUnit** - Testing framework

## URLs and Ports

- **Frontend Dev Server**: `http://localhost:5173` (Vite)
- **Backend API Server**: `http://localhost:8000` (Laravel)
- **API Base URL**: `http://localhost:8000/api`
- **Admin Login**: `http://localhost:5173/admin/login`
  - Credentials: `admin@example.com` / `password`

## Reference Documentation

Backend-specific documentation in `backend/`:
- `TECHNICAL_ARCHITECTURE.md` - Complete technical architecture
- `DATABASE_DOCUMENTATION.md` - Full database schema and optimization details
- `DATABASE_QUICK_START.md` - Quick reference for database operations
- `README.md` - Standard Laravel documentation
