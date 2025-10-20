# Technical Architecture Document
## Meridian Group E-commerce Application

**Version:** 1.0.0
**Last Updated:** 2025-10-18
**Tech Lead:** Senior Technical Architect
**Status:** Production-Ready

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [System Overview](#system-overview)
3. [Technology Stack](#technology-stack)
4. [Project Structure](#project-structure)
5. [API Architecture](#api-architecture)
6. [Database Architecture](#database-architecture)
7. [Authentication & Security](#authentication--security)
8. [State Management](#state-management)
9. [Performance & Scalability](#performance--scalability)
10. [Development Workflow](#development-workflow)
11. [Deployment Strategy](#deployment-strategy)
12. [Testing Strategy](#testing-strategy)
13. [Monitoring & Logging](#monitoring--logging)

---

## 1. Executive Summary

### Project Overview
A modern, scalable e-commerce platform built with Laravel 11 backend and React frontend, designed for high performance, maintainability, and exceptional user experience.

### Architecture Pattern
**Decoupled Monolithic Architecture** - Separate frontend and backend applications communicating via RESTful API with the ability to scale independently.

### Key Technical Decisions

| Decision | Technology | Rationale |
|----------|-----------|-----------|
| Backend Framework | Laravel 11 | Mature ecosystem, excellent ORM, built-in security features |
| Frontend Framework | React 18 + Vite + TypeScript | Type safety, fast development, excellent tooling |
| Database | MySQL 8.0+ | ACID compliance, proven scalability, rich feature set |
| Authentication | Laravel Sanctum | SPA-optimized, secure, stateful session management |
| State Management | Zustand | Lightweight, simple API, excellent TypeScript support |
| UI Framework | TailwindCSS + ShadCN UI | Utility-first, customizable, accessible components |
| Animations | Framer Motion | Performance-optimized, declarative animations |

---

## 2. System Overview

### Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                         CLIENT TIER                          │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  React SPA (Vite + TypeScript)                         │ │
│  │  - Zustand Store (Cart Management)                     │ │
│  │  - React Router (Navigation)                           │ │
│  │  - TanStack Query (API State Management)              │ │
│  │  - ShadCN UI + TailwindCSS (UI Components)            │ │
│  │  - Framer Motion (Animations)                          │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                            ↕ HTTPS/JSON
┌─────────────────────────────────────────────────────────────┐
│                      APPLICATION TIER                        │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Laravel 11 API Server                                 │ │
│  │  - RESTful API Endpoints                               │ │
│  │  - Sanctum Authentication Middleware                   │ │
│  │  - Request Validation & Transformation                 │ │
│  │  - API Resource Serialization                          │ │
│  │  - Rate Limiting & Throttling                          │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                            ↕ Eloquent ORM
┌─────────────────────────────────────────────────────────────┐
│                         DATA TIER                            │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  MySQL 8.0+ Database                                   │ │
│  │  - InnoDB Engine (ACID Transactions)                   │ │
│  │  - Optimized Indexes                                   │ │
│  │  - Foreign Key Constraints                             │ │
│  └────────────────────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  File Storage                                          │ │
│  │  - Local Storage (Development)                         │ │
│  │  - S3 Compatible Storage (Production)                  │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### Communication Flow

1. **Client → API**: JSON over HTTPS with CSRF token for state-changing operations
2. **API → Database**: Eloquent ORM with query optimization and eager loading
3. **Authentication**: Cookie-based session with Sanctum for SPA authentication

---

## 3. Technology Stack

### Backend Stack

#### Core Framework
```json
{
  "php": "^8.2",
  "laravel/framework": "^11.0",
  "laravel/sanctum": "^4.0"
}
```

#### Required Laravel Packages
```json
{
  "spatie/laravel-query-builder": "^5.8",
  "spatie/laravel-fractal": "^6.2",
  "spatie/laravel-medialibrary": "^11.0",
  "intervention/image": "^3.5",
  "laravel/pint": "^1.13",
  "barryvdh/laravel-cors": "^3.0"
}
```

**Package Justifications:**

- **spatie/laravel-query-builder**: Elegant filtering, sorting, and including relationships via URL parameters
- **spatie/laravel-fractal**: Consistent API response transformation and serialization
- **spatie/laravel-medialibrary**: Professional media handling with optimization and conversions
- **intervention/image**: Image manipulation and optimization
- **laravel/pint**: Code style enforcement based on Laravel conventions
- **barryvdh/laravel-cors**: Simplified CORS configuration for API

### Frontend Stack

#### Core Dependencies
```json
{
  "react": "^18.3.0",
  "react-dom": "^18.3.0",
  "typescript": "^5.5.3",
  "vite": "^5.4.0"
}
```

#### State Management & Data Fetching
```json
{
  "zustand": "^4.5.0",
  "@tanstack/react-query": "^5.51.0",
  "axios": "^1.7.0"
}
```

#### Routing & Navigation
```json
{
  "react-router-dom": "^6.26.0"
}
```

#### UI & Styling
```json
{
  "tailwindcss": "^3.4.0",
  "@radix-ui/react-*": "Latest stable versions",
  "class-variance-authority": "^0.7.0",
  "clsx": "^2.1.0",
  "tailwind-merge": "^2.5.0",
  "framer-motion": "^11.3.0",
  "lucide-react": "^0.428.0"
}
```

#### Form Handling & Validation
```json
{
  "react-hook-form": "^7.52.0",
  "zod": "^3.23.0",
  "@hookform/resolvers": "^3.9.0"
}
```

#### Notifications & UI Feedback
```json
{
  "sonner": "^1.5.0"
}
```

**Package Justifications:**

- **@tanstack/react-query**: Server state management, caching, and synchronization
- **zustand**: Lightweight client state (cart) with localStorage persistence
- **react-hook-form + zod**: Type-safe form validation with excellent DX
- **sonner**: Beautiful toast notifications with minimal setup
- **ShadCN UI (@radix-ui)**: Accessible, customizable, production-ready components

### Database

**Primary Database:** MySQL 8.0+

**Alternative (Development):** SQLite 3.35+

**Selection Rationale:**
- MySQL for production: proven scalability, rich indexing, full-text search
- SQLite for rapid development and testing
- Laravel's database abstraction allows seamless switching

### Development Tools

```json
{
  "Backend Tools": {
    "laravel/telescope": "^5.0",
    "laravel/tinker": "^2.9",
    "barryvdh/laravel-debugbar": "^3.13",
    "fakerphp/faker": "^1.23"
  },
  "Frontend Tools": {
    "@vitejs/plugin-react-swc": "^3.7.0",
    "eslint": "^8.57.0",
    "prettier": "^3.3.0",
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0"
  }
}
```

---

## 4. Project Structure

### Root Directory Structure

```
meridiangroup-ecommerce/
├── backend/                      # Laravel 11 API
├── frontend/                     # React SPA
├── docker/                       # Docker configuration (optional)
├── docs/                         # Documentation
├── .github/                      # GitHub Actions CI/CD
├── TECHNICAL_ARCHITECTURE.md     # This document
├── README.md                     # Project overview
└── docker-compose.yml            # Local development orchestration
```

### Backend Structure (Laravel 11)

```
backend/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── Api/
│   │   │   │   ├── V1/
│   │   │   │   │   ├── Admin/
│   │   │   │   │   │   ├── AuthController.php
│   │   │   │   │   │   ├── CategoryController.php
│   │   │   │   │   │   ├── ProductController.php
│   │   │   │   │   │   ├── OrderController.php
│   │   │   │   │   │   └── DashboardController.php
│   │   │   │   │   └── Public/
│   │   │   │   │       ├── CategoryController.php
│   │   │   │   │       ├── ProductController.php
│   │   │   │   │       └── OrderController.php
│   │   ├── Middleware/
│   │   │   ├── EnsureAdmin.php
│   │   │   ├── ForceJsonResponse.php
│   │   │   └── HandleApiExceptions.php
│   │   ├── Requests/
│   │   │   ├── Auth/
│   │   │   │   ├── LoginRequest.php
│   │   │   │   └── LogoutRequest.php
│   │   │   ├── Category/
│   │   │   │   ├── StoreCategoryRequest.php
│   │   │   │   └── UpdateCategoryRequest.php
│   │   │   ├── Product/
│   │   │   │   ├── StoreProductRequest.php
│   │   │   │   └── UpdateProductRequest.php
│   │   │   └── Order/
│   │   │       └── StoreOrderRequest.php
│   │   └── Resources/
│   │       ├── CategoryResource.php
│   │       ├── ProductResource.php
│   │       ├── ProductDetailResource.php
│   │       ├── OrderResource.php
│   │       ├── OrderDetailResource.php
│   │       └── UserResource.php
│   ├── Models/
│   │   ├── User.php
│   │   ├── Category.php
│   │   ├── Product.php
│   │   ├── Order.php
│   │   └── OrderItem.php
│   ├── Services/
│   │   ├── OrderService.php
│   │   ├── ProductService.php
│   │   └── ImageService.php
│   ├── Repositories/
│   │   ├── Contracts/
│   │   │   ├── CategoryRepositoryInterface.php
│   │   │   ├── ProductRepositoryInterface.php
│   │   │   └── OrderRepositoryInterface.php
│   │   └── Eloquent/
│   │       ├── CategoryRepository.php
│   │       ├── ProductRepository.php
│   │       └── OrderRepository.php
│   ├── Exceptions/
│   │   ├── Handler.php
│   │   ├── ApiException.php
│   │   ├── ResourceNotFoundException.php
│   │   └── ValidationException.php
│   └── Providers/
│       ├── AppServiceProvider.php
│       └── RepositoryServiceProvider.php
├── bootstrap/
├── config/
│   ├── app.php
│   ├── database.php
│   ├── sanctum.php
│   ├── cors.php
│   └── filesystems.php
├── database/
│   ├── factories/
│   │   ├── UserFactory.php
│   │   ├── CategoryFactory.php
│   │   ├── ProductFactory.php
│   │   └── OrderFactory.php
│   ├── migrations/
│   │   ├── 2024_01_01_000001_create_users_table.php
│   │   ├── 2024_01_01_000002_create_categories_table.php
│   │   ├── 2024_01_01_000003_create_products_table.php
│   │   ├── 2024_01_01_000004_create_orders_table.php
│   │   ├── 2024_01_01_000005_create_order_items_table.php
│   │   └── 2024_01_01_000006_create_personal_access_tokens_table.php
│   └── seeders/
│       ├── DatabaseSeeder.php
│       ├── UserSeeder.php
│       ├── CategorySeeder.php
│       └── ProductSeeder.php
├── public/
│   ├── index.php
│   └── storage/           # Symlinked from storage/app/public
├── resources/
├── routes/
│   ├── api.php
│   └── web.php
├── storage/
│   ├── app/
│   │   ├── public/
│   │   │   └── products/
│   │   └── private/
│   ├── framework/
│   └── logs/
├── tests/
│   ├── Feature/
│   │   ├── Api/
│   │   │   ├── Auth/
│   │   │   ├── Category/
│   │   │   ├── Product/
│   │   │   └── Order/
│   └── Unit/
├── .env.example
├── .gitignore
├── artisan
├── composer.json
├── phpunit.xml
└── README.md
```

### Frontend Structure (React + Vite)

```
frontend/
├── public/
│   ├── vite.svg
│   └── favicon.ico
├── src/
│   ├── assets/
│   │   ├── images/
│   │   └── icons/
│   ├── components/
│   │   ├── ui/                    # ShadCN UI components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── form.tsx
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   ├── select.tsx
│   │   │   ├── table.tsx
│   │   │   ├── toast.tsx
│   │   │   └── toaster.tsx
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Navbar.tsx
│   │   │   ├── AdminLayout.tsx
│   │   │   └── PublicLayout.tsx
│   │   ├── products/
│   │   │   ├── ProductCard.tsx
│   │   │   ├── ProductGrid.tsx
│   │   │   ├── ProductDetail.tsx
│   │   │   ├── ProductFilters.tsx
│   │   │   └── ProductSkeleton.tsx
│   │   ├── cart/
│   │   │   ├── CartDrawer.tsx
│   │   │   ├── CartItem.tsx
│   │   │   ├── CartSummary.tsx
│   │   │   └── MiniCart.tsx
│   │   ├── checkout/
│   │   │   ├── CheckoutForm.tsx
│   │   │   ├── OrderSummary.tsx
│   │   │   └── CheckoutSuccess.tsx
│   │   ├── admin/
│   │   │   ├── Dashboard.tsx
│   │   │   ├── CategoryManager.tsx
│   │   │   ├── ProductManager.tsx
│   │   │   ├── ProductForm.tsx
│   │   │   ├── OrderList.tsx
│   │   │   └── OrderDetail.tsx
│   │   └── common/
│   │       ├── LoadingSpinner.tsx
│   │       ├── ErrorBoundary.tsx
│   │       ├── Pagination.tsx
│   │       ├── SearchBar.tsx
│   │       └── ImageUpload.tsx
│   ├── pages/
│   │   ├── public/
│   │   │   ├── HomePage.tsx
│   │   │   ├── ProductsPage.tsx
│   │   │   ├── ProductDetailPage.tsx
│   │   │   ├── CheckoutPage.tsx
│   │   │   └── NotFoundPage.tsx
│   │   └── admin/
│   │       ├── LoginPage.tsx
│   │       ├── DashboardPage.tsx
│   │       ├── CategoriesPage.tsx
│   │       ├── ProductsPage.tsx
│   │       └── OrdersPage.tsx
│   ├── hooks/
│   │   ├── api/
│   │   │   ├── useAuth.ts
│   │   │   ├── useCategories.ts
│   │   │   ├── useProducts.ts
│   │   │   └── useOrders.ts
│   │   ├── useCart.ts
│   │   ├── useLocalStorage.ts
│   │   ├── useDebounce.ts
│   │   └── useIntersectionObserver.ts
│   ├── store/
│   │   ├── cartStore.ts
│   │   └── authStore.ts
│   ├── services/
│   │   ├── api/
│   │   │   ├── axios.ts
│   │   │   ├── authApi.ts
│   │   │   ├── categoryApi.ts
│   │   │   ├── productApi.ts
│   │   │   └── orderApi.ts
│   │   └── utils/
│   │       ├── apiClient.ts
│   │       └── errorHandler.ts
│   ├── types/
│   │   ├── api.types.ts
│   │   ├── product.types.ts
│   │   ├── category.types.ts
│   │   ├── order.types.ts
│   │   ├── cart.types.ts
│   │   └── user.types.ts
│   ├── lib/
│   │   ├── utils.ts               # cn() and utility functions
│   │   ├── constants.ts
│   │   └── validation.ts
│   ├── routes/
│   │   ├── index.tsx
│   │   ├── PublicRoutes.tsx
│   │   ├── AdminRoutes.tsx
│   │   └── ProtectedRoute.tsx
│   ├── App.tsx
│   ├── main.tsx
│   └── vite-env.d.ts
├── .env.example
├── .env.development
├── .env.production
├── .eslintrc.cjs
├── .prettierrc
├── .gitignore
├── components.json            # ShadCN UI configuration
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
└── README.md
```

---

## 5. API Architecture

### RESTful API Design Principles

#### 1. Resource Naming Conventions

```
GET    /api/v1/categories              # List all categories
GET    /api/v1/categories/{id}         # Get single category
POST   /api/v1/categories              # Create category (Admin)
PUT    /api/v1/categories/{id}         # Update category (Admin)
DELETE /api/v1/categories/{id}         # Delete category (Admin)

GET    /api/v1/products                # List products (paginated)
GET    /api/v1/products/{id}           # Get product details
POST   /api/v1/products                # Create product (Admin)
PUT    /api/v1/products/{id}           # Update product (Admin)
DELETE /api/v1/products/{id}           # Delete product (Admin)

POST   /api/v1/orders                  # Create order (Public)
GET    /api/v1/admin/orders            # List all orders (Admin)
GET    /api/v1/admin/orders/{id}       # Get order details (Admin)
PUT    /api/v1/admin/orders/{id}       # Update order status (Admin)

POST   /api/v1/admin/login             # Admin login
POST   /api/v1/admin/logout            # Admin logout
GET    /api/v1/admin/me                # Get authenticated admin
```

#### 2. API Versioning Strategy

**Current Version:** v1
**Location:** URL path (`/api/v1/`)
**Migration Plan:** Maintain v1 for 12 months after v2 release

#### 3. Standard Response Format

**Success Response:**
```json
{
  "success": true,
  "data": {
    // Resource data or array
  },
  "meta": {
    "current_page": 1,
    "per_page": 15,
    "total": 150,
    "last_page": 10
  },
  "links": {
    "first": "http://api.example.com/products?page=1",
    "last": "http://api.example.com/products?page=10",
    "prev": null,
    "next": "http://api.example.com/products?page=2"
  }
}
```

**Error Response:**
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "The given data was invalid.",
    "errors": {
      "email": ["The email field is required."],
      "password": ["The password must be at least 8 characters."]
    }
  },
  "meta": {
    "timestamp": "2025-10-18T12:34:56Z",
    "request_id": "uuid-here"
  }
}
```

#### 4. HTTP Status Code Standards

| Status Code | Usage | Example |
|-------------|-------|---------|
| 200 OK | Successful GET, PUT, PATCH | Product retrieved |
| 201 Created | Successful POST | Product created |
| 204 No Content | Successful DELETE | Product deleted |
| 400 Bad Request | Client error in request | Invalid JSON |
| 401 Unauthorized | Missing or invalid authentication | No token |
| 403 Forbidden | Authenticated but not authorized | Non-admin accessing admin route |
| 404 Not Found | Resource doesn't exist | Product ID not found |
| 422 Unprocessable Entity | Validation failed | Invalid product data |
| 429 Too Many Requests | Rate limit exceeded | Too many API calls |
| 500 Internal Server Error | Server error | Database connection failed |

#### 5. Query Parameters Standards

**Filtering:**
```
GET /api/v1/products?filter[category_id]=5
GET /api/v1/products?filter[price_min]=10&filter[price_max]=100
GET /api/v1/products?filter[in_stock]=true
```

**Sorting:**
```
GET /api/v1/products?sort=-created_at          # Descending
GET /api/v1/products?sort=price                # Ascending
GET /api/v1/products?sort=-price,name          # Multiple
```

**Pagination:**
```
GET /api/v1/products?page=2&per_page=20
```

**Searching:**
```
GET /api/v1/products?search=laptop
```

**Including Relationships:**
```
GET /api/v1/products?include=category
GET /api/v1/orders?include=items,items.product
```

#### 6. Request/Response Examples

**Create Product (Admin):**
```http
POST /api/v1/products HTTP/1.1
Host: api.meridiangroup.com
Content-Type: application/json
Authorization: Bearer {token}
X-CSRF-TOKEN: {csrf-token}

{
  "name": "Premium Laptop",
  "description": "High-performance laptop for professionals",
  "price": 1299.99,
  "stock_quantity": 50,
  "category_id": 3,
  "image": "base64-encoded-image-or-file-upload"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 42,
    "name": "Premium Laptop",
    "slug": "premium-laptop",
    "description": "High-performance laptop for professionals",
    "price": 1299.99,
    "stock_quantity": 50,
    "category": {
      "id": 3,
      "name": "Electronics",
      "slug": "electronics"
    },
    "image_url": "https://cdn.meridiangroup.com/products/42/image.jpg",
    "created_at": "2025-10-18T12:34:56Z",
    "updated_at": "2025-10-18T12:34:56Z"
  }
}
```

**Create Order (Public):**
```http
POST /api/v1/orders HTTP/1.1
Host: api.meridiangroup.com
Content-Type: application/json
X-CSRF-TOKEN: {csrf-token}

{
  "customer_name": "John Doe",
  "customer_email": "john@example.com",
  "customer_phone": "+1234567890",
  "shipping_address": "123 Main St, City, State 12345",
  "items": [
    {
      "product_id": 42,
      "quantity": 2,
      "price": 1299.99
    },
    {
      "product_id": 15,
      "quantity": 1,
      "price": 49.99
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1001,
    "order_number": "ORD-2025-1001",
    "customer_name": "John Doe",
    "customer_email": "john@example.com",
    "total_amount": 2649.97,
    "status": "pending",
    "items": [
      {
        "id": 2001,
        "product": {
          "id": 42,
          "name": "Premium Laptop",
          "image_url": "https://cdn.meridiangroup.com/products/42/image.jpg"
        },
        "quantity": 2,
        "price": 1299.99,
        "subtotal": 2599.98
      },
      {
        "id": 2002,
        "product": {
          "id": 15,
          "name": "Wireless Mouse",
          "image_url": "https://cdn.meridiangroup.com/products/15/image.jpg"
        },
        "quantity": 1,
        "price": 49.99,
        "subtotal": 49.99
      }
    ],
    "created_at": "2025-10-18T12:35:22Z"
  }
}
```

### CORS Configuration

**Development (backend/config/cors.php):**
```php
<?php

return [
    'paths' => ['api/*', 'sanctum/csrf-cookie'],
    'allowed_methods' => ['*'],
    'allowed_origins' => [
        'http://localhost:5173',  // Vite dev server
        'http://localhost:3000',  // Alternative dev port
    ],
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => true,
];
```

**Production:**
```php
<?php

return [
    'paths' => ['api/*', 'sanctum/csrf-cookie'],
    'allowed_methods' => ['*'],
    'allowed_origins' => [
        env('FRONTEND_URL', 'https://meridiangroup.com'),
    ],
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => true,
];
```

### Error Handling Strategy

**Backend Exception Handling (app/Exceptions/Handler.php):**

```php
<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Throwable;

class Handler extends ExceptionHandler
{
    public function register(): void
    {
        $this->renderable(function (ModelNotFoundException $e, $request) {
            if ($request->is('api/*')) {
                return response()->json([
                    'success' => false,
                    'error' => [
                        'code' => 'RESOURCE_NOT_FOUND',
                        'message' => 'The requested resource was not found.',
                    ],
                ], 404);
            }
        });

        $this->renderable(function (ValidationException $e, $request) {
            if ($request->is('api/*')) {
                return response()->json([
                    'success' => false,
                    'error' => [
                        'code' => 'VALIDATION_ERROR',
                        'message' => 'The given data was invalid.',
                        'errors' => $e->errors(),
                    ],
                ], 422);
            }
        });

        $this->renderable(function (HttpException $e, $request) {
            if ($request->is('api/*')) {
                return response()->json([
                    'success' => false,
                    'error' => [
                        'code' => 'HTTP_ERROR',
                        'message' => $e->getMessage() ?: 'An error occurred.',
                    ],
                ], $e->getStatusCode());
            }
        });

        $this->renderable(function (Throwable $e, $request) {
            if ($request->is('api/*')) {
                $statusCode = method_exists($e, 'getStatusCode')
                    ? $e->getStatusCode()
                    : 500;

                return response()->json([
                    'success' => false,
                    'error' => [
                        'code' => 'INTERNAL_ERROR',
                        'message' => config('app.debug')
                            ? $e->getMessage()
                            : 'An internal error occurred.',
                    ],
                ], $statusCode);
            }
        });
    }
}
```

**Frontend Error Handling:**

```typescript
// src/services/utils/errorHandler.ts
import { toast } from 'sonner';
import { AxiosError } from 'axios';

export interface ApiError {
  code: string;
  message: string;
  errors?: Record<string, string[]>;
}

export const handleApiError = (error: unknown): ApiError => {
  if (error instanceof AxiosError) {
    const apiError = error.response?.data?.error;

    if (apiError) {
      // Show user-friendly error message
      toast.error(apiError.message);

      return apiError;
    }
  }

  // Fallback error
  const fallbackError = {
    code: 'UNKNOWN_ERROR',
    message: 'An unexpected error occurred. Please try again.',
  };

  toast.error(fallbackError.message);
  return fallbackError;
};
```

### Rate Limiting

**Configuration (routes/api.php):**
```php
Route::middleware(['throttle:60,1'])->group(function () {
    // Public API routes - 60 requests per minute
});

Route::middleware(['auth:sanctum', 'throttle:120,1'])->group(function () {
    // Admin routes - 120 requests per minute
});
```

---

## 6. Database Architecture

### Entity Relationship Diagram

```
┌─────────────────┐
│     users       │
├─────────────────┤
│ id (PK)         │
│ name            │
│ email (UNIQUE)  │
│ password        │
│ is_admin        │
│ created_at      │
│ updated_at      │
└─────────────────┘

┌─────────────────┐
│   categories    │
├─────────────────┤
│ id (PK)         │
│ name (UNIQUE)   │
│ slug (UNIQUE)   │────────┐
│ description     │        │
│ created_at      │        │
│ updated_at      │        │
└─────────────────┘        │
                           │ 1:N
                           │
┌─────────────────┐        │
│    products     │◄───────┘
├─────────────────┤
│ id (PK)         │
│ category_id (FK)│
│ name            │
│ slug (UNIQUE)   │────────┐
│ description     │        │
│ price           │        │
│ stock_quantity  │        │
│ image_path      │        │
│ created_at      │        │
│ updated_at      │        │
└─────────────────┘        │
                           │ 1:N
                           │
┌─────────────────┐        │
│  order_items    │◄───────┘
├─────────────────┤
│ id (PK)         │
│ order_id (FK)   │◄───────┐
│ product_id (FK) │        │
│ quantity        │        │
│ price           │        │
│ created_at      │        │
│ updated_at      │        │
└─────────────────┘        │
                           │ 1:N
                           │
┌─────────────────┐        │
│     orders      │────────┘
├─────────────────┤
│ id (PK)         │
│ order_number    │
│ customer_name   │
│ customer_email  │
│ customer_phone  │
│ shipping_address│
│ total_amount    │
│ status          │
│ created_at      │
│ updated_at      │
└─────────────────┘
```

### Table Schemas

#### users
```sql
CREATE TABLE users (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    is_admin BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    INDEX idx_email (email),
    INDEX idx_is_admin (is_admin)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

#### categories
```sql
CREATE TABLE categories (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    INDEX idx_slug (slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

#### products
```sql
CREATE TABLE products (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    category_id BIGINT UNSIGNED NOT NULL,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT NULL,
    price DECIMAL(10, 2) NOT NULL,
    stock_quantity INTEGER NOT NULL DEFAULT 0,
    image_path VARCHAR(255) NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE RESTRICT,
    INDEX idx_category_id (category_id),
    INDEX idx_slug (slug),
    INDEX idx_price (price),
    INDEX idx_stock_quantity (stock_quantity),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

#### orders
```sql
CREATE TABLE orders (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    order_number VARCHAR(50) NOT NULL UNIQUE,
    customer_name VARCHAR(255) NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(50) NOT NULL,
    shipping_address TEXT NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    status ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    INDEX idx_order_number (order_number),
    INDEX idx_customer_email (customer_email),
    INDEX idx_status (status),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

#### order_items
```sql
CREATE TABLE order_items (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    order_id BIGINT UNSIGNED NOT NULL,
    product_id BIGINT UNSIGNED NOT NULL,
    quantity INTEGER NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE RESTRICT,
    INDEX idx_order_id (order_id),
    INDEX idx_product_id (product_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

### Indexing Strategy

**Performance Optimization Indexes:**

1. **Primary Keys**: Auto-indexed on all `id` columns
2. **Foreign Keys**: Indexed for JOIN optimization
3. **Unique Constraints**: `email`, `slug`, `order_number` for fast lookups
4. **Search Fields**: `category_id`, `status`, `created_at` for filtering
5. **Sort Fields**: `price`, `created_at` for ORDER BY optimization

**Composite Index Considerations:**
```sql
-- For product filtering by category and price range
CREATE INDEX idx_category_price ON products(category_id, price);

-- For order management filtering
CREATE INDEX idx_status_created ON orders(status, created_at);
```

### Data Integrity Constraints

1. **Foreign Key Constraints**:
   - `products.category_id` → `categories.id` (RESTRICT on delete)
   - `order_items.order_id` → `orders.id` (CASCADE on delete)
   - `order_items.product_id` → `products.id` (RESTRICT on delete)

2. **Validation Rules**:
   - Price: Must be positive decimal(10,2)
   - Stock: Must be non-negative integer
   - Email: Must be valid email format
   - Status: Must be one of defined enum values

3. **Business Logic Constraints**:
   - Cannot delete category if products exist
   - Cannot delete product if in active orders
   - Order total must match sum of order items

---

## 7. Authentication & Security

### Laravel Sanctum SPA Authentication

#### Authentication Flow

```
┌──────────┐                 ┌──────────┐                 ┌──────────┐
│  React   │                 │  Laravel │                 │  MySQL   │
│   SPA    │                 │   API    │                 │  Database│
└────┬─────┘                 └────┬─────┘                 └────┬─────┘
     │                            │                            │
     │ 1. GET /sanctum/csrf-cookie│                            │
     ├───────────────────────────>│                            │
     │                            │                            │
     │ 2. Set-Cookie: XSRF-TOKEN  │                            │
     │<───────────────────────────┤                            │
     │                            │                            │
     │ 3. POST /api/v1/admin/login│                            │
     │    { email, password }     │                            │
     │    X-XSRF-TOKEN: {token}   │                            │
     ├───────────────────────────>│                            │
     │                            │ 4. Verify credentials      │
     │                            ├───────────────────────────>│
     │                            │                            │
     │                            │ 5. Return user             │
     │                            │<───────────────────────────┤
     │                            │                            │
     │ 6. Set-Cookie: session_id  │                            │
     │    { success, user }       │                            │
     │<───────────────────────────┤                            │
     │                            │                            │
     │ 7. GET /api/v1/admin/me    │                            │
     │    Cookie: session_id      │                            │
     ├───────────────────────────>│                            │
     │                            │ 8. Verify session          │
     │                            ├───────────────────────────>│
     │                            │                            │
     │ 9. { user }                │                            │
     │<───────────────────────────┤                            │
     │                            │                            │
```

#### Backend Configuration

**config/sanctum.php:**
```php
<?php

return [
    'stateful' => explode(',', env('SANCTUM_STATEFUL_DOMAINS', sprintf(
        '%s%s',
        'localhost,localhost:3000,localhost:5173,127.0.0.1,127.0.0.1:8000,::1',
        env('APP_URL') ? ','.parse_url(env('APP_URL'), PHP_URL_HOST) : ''
    ))),

    'guard' => ['web'],

    'expiration' => null,

    'middleware' => [
        'verify_csrf_token' => App\Http\Middleware\VerifyCsrfToken::class,
        'encrypt_cookies' => App\Http\Middleware\EncryptCookies::class,
    ],
];
```

**.env Configuration:**
```env
SESSION_DRIVER=database
SESSION_LIFETIME=120
SESSION_DOMAIN=localhost
SESSION_SECURE_COOKIE=false

SANCTUM_STATEFUL_DOMAINS=localhost:5173
```

**Production .env:**
```env
SESSION_DRIVER=redis
SESSION_LIFETIME=120
SESSION_DOMAIN=.meridiangroup.com
SESSION_SECURE_COOKIE=true

SANCTUM_STATEFUL_DOMAINS=meridiangroup.com,www.meridiangroup.com
```

#### Frontend Authentication Service

**src/services/api/authApi.ts:**
```typescript
import apiClient from './axios';
import type { User, LoginCredentials } from '@/types/user.types';

export const authApi = {
  // Get CSRF cookie before login
  async getCsrfCookie(): Promise<void> {
    await apiClient.get('/sanctum/csrf-cookie');
  },

  async login(credentials: LoginCredentials): Promise<User> {
    await this.getCsrfCookie();
    const response = await apiClient.post('/api/v1/admin/login', credentials);
    return response.data.data;
  },

  async logout(): Promise<void> {
    await apiClient.post('/api/v1/admin/logout');
  },

  async getCurrentUser(): Promise<User> {
    const response = await apiClient.get('/api/v1/admin/me');
    return response.data.data;
  },
};
```

**src/services/api/axios.ts:**
```typescript
import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // Critical for Sanctum
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

// Request interceptor for CSRF token
apiClient.interceptors.request.use((config) => {
  const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
  if (token) {
    config.headers['X-XSRF-TOKEN'] = token;
  }
  return config;
});

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Redirect to login
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;
```

### Security Best Practices

#### 1. Input Validation

**Backend (Form Request):**
```php
<?php

namespace App\Http\Requests\Product;

use Illuminate\Foundation\Http\FormRequest;

class StoreProductRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->is_admin;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'price' => ['required', 'numeric', 'min:0', 'max:999999.99'],
            'stock_quantity' => ['required', 'integer', 'min:0'],
            'category_id' => ['required', 'exists:categories,id'],
            'image' => ['nullable', 'image', 'max:2048', 'mimes:jpg,jpeg,png,webp'],
        ];
    }

    public function messages(): array
    {
        return [
            'category_id.exists' => 'The selected category does not exist.',
            'image.max' => 'Image must not exceed 2MB.',
        ];
    }
}
```

**Frontend (Zod Schema):**
```typescript
import { z } from 'zod';

export const productSchema = z.object({
  name: z.string().min(1, 'Name is required').max(255),
  description: z.string().optional(),
  price: z.number().min(0.01, 'Price must be positive').max(999999.99),
  stock_quantity: z.number().int().min(0, 'Stock cannot be negative'),
  category_id: z.number().int().positive('Category is required'),
  image: z.instanceof(File).optional(),
});

export type ProductFormData = z.infer<typeof productSchema>;
```

#### 2. SQL Injection Prevention

- **Use Eloquent ORM exclusively** - parameterized queries by default
- **Avoid raw SQL** unless absolutely necessary
- **Use query builder** with parameter binding for complex queries

```php
// Good - Eloquent
Product::where('category_id', $categoryId)->get();

// Good - Query Builder with bindings
DB::table('products')->where('price', '>', $minPrice)->get();

// Avoid - Raw SQL (use only when necessary with bindings)
DB::select('SELECT * FROM products WHERE id = ?', [$id]);
```

#### 3. XSS Prevention

**Backend:**
- Laravel automatically escapes output in Blade (not applicable for API)
- API Resources should return raw data (React will handle escaping)

**Frontend:**
- React automatically escapes JSX content
- Use `dangerouslySetInnerHTML` only with sanitized content
- Install and use `dompurify` for rich text:

```typescript
import DOMPurify from 'dompurify';

const sanitizedHTML = DOMPurify.sanitize(userInput);
```

#### 4. CSRF Protection

- **Backend**: CSRF token verification for state-changing requests (POST, PUT, DELETE)
- **Frontend**: Automatically included in Axios requests via interceptor
- **Configuration**: Sanctum handles CSRF token management

#### 5. File Upload Security

**Backend (ImageService.php):**
```php
<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;

class ImageService
{
    public function uploadProductImage(UploadedFile $file, int $productId): string
    {
        // Validate file type
        $allowedMimes = ['image/jpeg', 'image/png', 'image/webp'];
        if (!in_array($file->getMimeType(), $allowedMimes)) {
            throw new \InvalidArgumentException('Invalid file type');
        }

        // Generate unique filename
        $filename = sprintf(
            '%d_%s.%s',
            $productId,
            uniqid(),
            $file->getClientOriginalExtension()
        );

        // Optimize and resize image
        $image = Image::make($file)
            ->fit(800, 800, function ($constraint) {
                $constraint->upsize();
            })
            ->encode('webp', 85);

        // Store in products directory
        Storage::disk('public')->put("products/{$filename}", $image);

        return "products/{$filename}";
    }

    public function deleteProductImage(string $path): void
    {
        if (Storage::disk('public')->exists($path)) {
            Storage::disk('public')->delete($path);
        }
    }
}
```

#### 6. Environment Variables Security

**Never commit:**
- `.env` files
- API keys, secrets, passwords
- Database credentials

**Use:**
- `.env.example` with placeholder values
- Environment-specific variables
- Secret management systems in production (AWS Secrets Manager, etc.)

---

## 8. State Management

### Frontend State Architecture

#### State Categories

1. **Server State**: Data from API (products, categories, orders)
   - **Tool**: TanStack Query (React Query)
   - **Reason**: Built-in caching, refetching, optimistic updates

2. **Client State**: Local application state (cart, UI preferences)
   - **Tool**: Zustand
   - **Reason**: Lightweight, simple API, excellent TypeScript support

3. **Form State**: Form inputs and validation
   - **Tool**: React Hook Form + Zod
   - **Reason**: Performance, validation, minimal re-renders

4. **URL State**: Route parameters, query strings
   - **Tool**: React Router
   - **Reason**: Standard routing solution, type-safe

### Cart State Management (Zustand)

**src/store/cartStore.ts:**
```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem, Product } from '@/types';

interface CartState {
  items: CartItem[];
  addItem: (product: Product, quantity: number) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, quantity) => {
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.product.id === product.id
          );

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.product.id === product.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          }

          return {
            items: [...state.items, { product, quantity }],
          };
        });
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== productId),
        }));
      },

      updateQuantity: (productId, quantity) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item
          ),
        }));
      },

      clearCart: () => {
        set({ items: [] });
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        );
      },
    }),
    {
      name: 'meridian-cart-storage',
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name);
          return str ? JSON.parse(str) : null;
        },
        setItem: (name, value) => {
          localStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => {
          localStorage.removeItem(name);
        },
      },
    }
  )
);
```

### Server State Management (TanStack Query)

**src/hooks/api/useProducts.ts:**
```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { productApi } from '@/services/api/productApi';
import type { Product, ProductFilters } from '@/types';
import { toast } from 'sonner';

export const useProducts = (filters?: ProductFilters) => {
  return useQuery({
    queryKey: ['products', filters],
    queryFn: () => productApi.getAll(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useProduct = (id: number) => {
  return useQuery({
    queryKey: ['products', id],
    queryFn: () => productApi.getById(id),
    staleTime: 5 * 60 * 1000,
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: productApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Product created successfully');
    },
    onError: (error) => {
      toast.error('Failed to create product');
      console.error(error);
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Product> }) =>
      productApi.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['products', variables.id] });
      toast.success('Product updated successfully');
    },
    onError: () => {
      toast.error('Failed to update product');
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: productApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Product deleted successfully');
    },
    onError: () => {
      toast.error('Failed to delete product');
    },
  });
};
```

**Query Client Configuration (src/main.tsx):**
```typescript
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 1 * 60 * 1000, // 1 minute default
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* Your app */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
```

---

## 9. Performance & Scalability

### Backend Performance Strategies

#### 1. Database Query Optimization

**Eager Loading to Prevent N+1 Queries:**
```php
// Bad - N+1 problem
$products = Product::all();
foreach ($products as $product) {
    echo $product->category->name; // Executes N queries
}

// Good - Eager loading
$products = Product::with('category')->get(); // Single query with JOIN
```

**Query Optimization in Controllers:**
```php
<?php

namespace App\Http\Controllers\Api\V1\Public;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Spatie\QueryBuilder\QueryBuilder;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $products = QueryBuilder::for(Product::class)
            ->allowedFilters([
                'name',
                'category_id',
                'price_min',
                'price_max',
            ])
            ->allowedSorts(['price', 'created_at', 'name'])
            ->allowedIncludes(['category'])
            ->defaultSort('-created_at')
            ->paginate($request->get('per_page', 15))
            ->withQueryString();

        return ProductResource::collection($products);
    }
}
```

#### 2. API Response Caching

**Route-level Caching:**
```php
use Illuminate\Support\Facades\Cache;

Route::get('/categories', function () {
    return Cache::remember('categories', 3600, function () {
        return Category::all();
    });
});
```

**Model-level Caching:**
```php
<?php

namespace App\Services;

use App\Models\Category;
use Illuminate\Support\Facades\Cache;

class CategoryService
{
    public function getAllCached()
    {
        return Cache::tags(['categories'])
            ->remember('all_categories', 3600, function () {
                return Category::orderBy('name')->get();
            });
    }

    public function clearCache()
    {
        Cache::tags(['categories'])->flush();
    }
}
```

#### 3. Pagination Strategy

**Standard Pagination:**
```php
// Returns 15 items per page with pagination metadata
Product::paginate(15);
```

**Cursor Pagination (for large datasets):**
```php
// More efficient for large datasets, prevents skip/offset overhead
Product::cursorPaginate(15);
```

**API Resource with Pagination:**
```php
<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'price' => $this->price,
            'stock_quantity' => $this->stock_quantity,
            'image_url' => $this->image_path
                ? asset('storage/' . $this->image_path)
                : null,
            'category' => $this->whenLoaded('category', function () {
                return new CategoryResource($this->category);
            }),
        ];
    }
}
```

#### 4. Image Optimization

**Storage Configuration (config/filesystems.php):**
```php
'disks' => [
    'public' => [
        'driver' => 'local',
        'root' => storage_path('app/public'),
        'url' => env('APP_URL').'/storage',
        'visibility' => 'public',
    ],

    's3' => [
        'driver' => 's3',
        'key' => env('AWS_ACCESS_KEY_ID'),
        'secret' => env('AWS_SECRET_ACCESS_KEY'),
        'region' => env('AWS_DEFAULT_REGION'),
        'bucket' => env('AWS_BUCKET'),
        'url' => env('AWS_URL'),
        'endpoint' => env('AWS_ENDPOINT'),
    ],
],
```

**Image Processing:**
```php
use Intervention\Image\Facades\Image;

// Optimize and resize on upload
$image = Image::make($file)
    ->fit(800, 800)
    ->encode('webp', 85);

Storage::disk('public')->put($path, $image);
```

### Frontend Performance Strategies

#### 1. Code Splitting

**Route-based Code Splitting:**
```typescript
import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoadingSpinner from '@/components/common/LoadingSpinner';

// Lazy load page components
const HomePage = lazy(() => import('@/pages/public/HomePage'));
const ProductsPage = lazy(() => import('@/pages/public/ProductsPage'));
const ProductDetailPage = lazy(() => import('@/pages/public/ProductDetailPage'));
const CheckoutPage = lazy(() => import('@/pages/public/CheckoutPage'));

const AdminDashboard = lazy(() => import('@/pages/admin/DashboardPage'));
const AdminProducts = lazy(() => import('@/pages/admin/ProductsPage'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />

          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/products" element={<AdminProducts />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
```

#### 2. Image Lazy Loading

```typescript
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface ProductImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function ProductImage({ src, alt, className }: ProductImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative overflow-hidden bg-gray-100">
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={cn(
          'transition-opacity duration-300',
          isLoaded ? 'opacity-100' : 'opacity-0',
          className
        )}
        onLoad={() => setIsLoaded(true)}
      />
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600" />
        </div>
      )}
    </div>
  );
}
```

#### 3. Virtual Scrolling (for large lists)

```typescript
import { useVirtualizer } from '@tanstack/react-virtual';
import { useRef } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
}

interface VirtualProductListProps {
  products: Product[];
}

export function VirtualProductList({ products }: VirtualProductListProps) {
  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: products.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 100,
    overscan: 5,
  });

  return (
    <div ref={parentRef} className="h-[600px] overflow-auto">
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {virtualizer.getVirtualItems().map((virtualItem) => {
          const product = products[virtualItem.index];
          return (
            <div
              key={virtualItem.key}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: `${virtualItem.size}px`,
                transform: `translateY(${virtualItem.start}px)`,
              }}
            >
              <ProductCard product={product} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
```

#### 4. Debouncing Search Inputs

**src/hooks/useDebounce.ts:**
```typescript
import { useEffect, useState } from 'react';

export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
```

**Usage in Search Component:**
```typescript
import { useState } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import { useProducts } from '@/hooks/api/useProducts';

export function ProductSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 500);

  const { data: products, isLoading } = useProducts({
    search: debouncedSearch,
  });

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search products..."
      />
      {isLoading ? <div>Loading...</div> : <ProductList products={products} />}
    </div>
  );
}
```

#### 5. Memoization

```typescript
import { useMemo } from 'react';
import type { Product } from '@/types';

interface ProductListProps {
  products: Product[];
  categoryId?: number;
}

export function ProductList({ products, categoryId }: ProductListProps) {
  // Expensive filtering calculation memoized
  const filteredProducts = useMemo(() => {
    if (!categoryId) return products;
    return products.filter((p) => p.category_id === categoryId);
  }, [products, categoryId]);

  // Expensive calculation memoized
  const averagePrice = useMemo(() => {
    if (filteredProducts.length === 0) return 0;
    const total = filteredProducts.reduce((sum, p) => sum + p.price, 0);
    return total / filteredProducts.length;
  }, [filteredProducts]);

  return (
    <div>
      <p>Average Price: ${averagePrice.toFixed(2)}</p>
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

### Scalability Considerations

#### 1. Horizontal Scaling

**Load Balancer Configuration (Production):**
- Multiple Laravel API instances behind load balancer
- Sticky sessions for Sanctum authentication
- Shared Redis for session storage
- Shared database (MySQL with read replicas)

#### 2. Caching Layers

```
Client (Browser Cache)
    ↓
CDN (CloudFront/CloudFlare)
    ↓
Application Cache (Redis)
    ↓
Database Query Cache
    ↓
MySQL Database
```

#### 3. Database Scaling

**Read Replicas:**
```php
// config/database.php
'mysql' => [
    'read' => [
        'host' => [env('DB_READ_HOST_1'), env('DB_READ_HOST_2')],
    ],
    'write' => [
        'host' => [env('DB_WRITE_HOST')],
    ],
    // ... other configuration
],
```

**Connection Pooling:**
- Use persistent connections in production
- Configure proper pool sizes based on traffic

#### 4. CDN Integration

**Static Assets:**
- Serve images from CDN (CloudFront, CloudFlare)
- Configure S3 bucket with CloudFront distribution
- Set aggressive caching headers for immutable assets

**Frontend Deployment:**
- Deploy React build to CDN
- Enable Brotli/Gzip compression
- Set proper cache headers

---

## 10. Development Workflow

### Local Development Setup

#### Backend Setup (Laravel)

**Prerequisites:**
- PHP 8.2+
- Composer 2.x
- MySQL 8.0+ or SQLite
- Node.js 18+ (for asset compilation if needed)

**Step-by-Step Setup:**

```bash
# 1. Navigate to backend directory
cd backend

# 2. Install PHP dependencies
composer install

# 3. Copy environment file
cp .env.example .env

# 4. Generate application key
php artisan key:generate

# 5. Configure database in .env
# For MySQL:
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=meridian_ecommerce
DB_USERNAME=root
DB_PASSWORD=your_password

# For SQLite (development):
DB_CONNECTION=sqlite
DB_DATABASE=database/database.sqlite

# 6. Create database (if using SQLite)
touch database/database.sqlite

# 7. Run migrations
php artisan migrate

# 8. Seed database with sample data
php artisan db:seed

# 9. Create storage symlink
php artisan storage:link

# 10. Start development server
php artisan serve
# Server running at http://https://ecommerceback.obada-almaghribi.com
```

#### Frontend Setup (React)

**Prerequisites:**
- Node.js 18+
- npm or pnpm

**Step-by-Step Setup:**

```bash
# 1. Navigate to frontend directory
cd frontend

# 2. Install dependencies
npm install
# or
pnpm install

# 3. Copy environment file
cp .env.example .env.development

# 4. Configure API URL in .env.development
VITE_API_URL=http://https://ecommerceback.obada-almaghribi.com
VITE_APP_NAME="Meridian Group E-commerce"

# 5. Start development server
npm run dev
# or
pnpm dev

# Server running at http://localhost:5173
```

### Environment Variables

#### Backend (.env.example)

```env
# Application
APP_NAME="Meridian Group E-commerce API"
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_URL=http://https://ecommerceback.obada-almaghribi.com

# Frontend URL for CORS
FRONTEND_URL=http://localhost:5173

# Database
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=meridian_ecommerce
DB_USERNAME=root
DB_PASSWORD=

# Session
SESSION_DRIVER=database
SESSION_LIFETIME=120
SESSION_DOMAIN=localhost

# Cache
CACHE_DRIVER=file
QUEUE_CONNECTION=sync

# Sanctum
SANCTUM_STATEFUL_DOMAINS=localhost:5173,localhost:3000

# Filesystem
FILESYSTEM_DISK=public

# AWS S3 (Production)
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=us-east-1
AWS_BUCKET=
AWS_URL=

# Mail (for order notifications)
MAIL_MAILER=smtp
MAIL_HOST=mailhog
MAIL_PORT=1025
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null
MAIL_FROM_ADDRESS="noreply@meridiangroup.com"
MAIL_FROM_NAME="${APP_NAME}"
```

#### Frontend (.env.example)

```env
# API Configuration
VITE_API_URL=http://https://ecommerceback.obada-almaghribi.com
VITE_API_VERSION=v1

# Application
VITE_APP_NAME="Meridian Group E-commerce"
VITE_APP_DESCRIPTION="Modern e-commerce platform"

# Features
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_ERROR_TRACKING=false

# Pagination
VITE_PRODUCTS_PER_PAGE=15
VITE_ORDERS_PER_PAGE=20
```

#### Production Environment Variables

**Backend (.env.production):**
```env
APP_ENV=production
APP_DEBUG=false
APP_URL=https://api.meridiangroup.com

FRONTEND_URL=https://meridiangroup.com

DB_CONNECTION=mysql
DB_HOST=production-db-host
DB_PORT=3306
DB_DATABASE=meridian_prod
DB_USERNAME=prod_user
DB_PASSWORD=secure_password

SESSION_DRIVER=redis
SESSION_DOMAIN=.meridiangroup.com
SESSION_SECURE_COOKIE=true

CACHE_DRIVER=redis
QUEUE_CONNECTION=redis

REDIS_HOST=production-redis-host
REDIS_PASSWORD=redis_password
REDIS_PORT=6379

SANCTUM_STATEFUL_DOMAINS=meridiangroup.com,www.meridiangroup.com

FILESYSTEM_DISK=s3

AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_DEFAULT_REGION=us-east-1
AWS_BUCKET=meridian-products
AWS_URL=https://cdn.meridiangroup.com

MAIL_MAILER=ses
MAIL_FROM_ADDRESS="noreply@meridiangroup.com"
```

**Frontend (.env.production):**
```env
VITE_API_URL=https://api.meridiangroup.com
VITE_API_VERSION=v1

VITE_APP_NAME="Meridian Group"
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_ERROR_TRACKING=true

VITE_PRODUCTS_PER_PAGE=15
VITE_ORDERS_PER_PAGE=20
```

### Git Workflow

**Branch Strategy:**
```
main (production-ready)
  ├── develop (integration branch)
  │   ├── feature/product-filtering
  │   ├── feature/checkout-flow
  │   ├── bugfix/cart-calculation
  │   └── enhancement/image-optimization
```

**Commit Message Convention:**
```
feat: Add product filtering by category
fix: Correct cart total calculation
docs: Update API documentation
refactor: Simplify order service logic
test: Add unit tests for cart store
chore: Update dependencies
```

### Code Quality Tools

#### Backend (Laravel Pint)

**Configuration (.pint.json):**
```json
{
    "preset": "laravel",
    "rules": {
        "simplified_null_return": true,
        "braces": false,
        "new_with_braces": true,
        "method_argument_space": {
            "on_multiline": "ensure_fully_multiline"
        }
    }
}
```

**Usage:**
```bash
# Format all files
./vendor/bin/pint

# Check without fixing
./vendor/bin/pint --test
```

#### Frontend (ESLint + Prettier)

**ESLint Configuration (.eslintrc.cjs):**
```javascript
module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'prettier',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
  },
};
```

**Prettier Configuration (.prettierrc):**
```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 80,
  "arrowParens": "always"
}
```

**Usage:**
```bash
# Lint
npm run lint

# Format
npm run format

# Type check
npm run type-check
```

### Development Scripts

#### Backend (composer.json scripts)

```json
{
  "scripts": {
    "dev": "php artisan serve",
    "test": "php artisan test",
    "format": "./vendor/bin/pint",
    "format:test": "./vendor/bin/pint --test",
    "fresh": [
      "php artisan migrate:fresh",
      "php artisan db:seed"
    ]
  }
}
```

#### Frontend (package.json scripts)

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "format": "prettier --write \"src/**/*.{ts,tsx,css}\"",
    "type-check": "tsc --noEmit"
  }
}
```

---

## 11. Deployment Strategy

### Production Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      CloudFlare CDN                          │
│            (SSL, DDoS Protection, Caching)                   │
└──────────────────────┬──────────────────────────────────────┘
                       │
         ┌─────────────┴─────────────┐
         │                           │
         ▼                           ▼
┌────────────────┐         ┌────────────────────┐
│  Static Assets │         │  Application Load  │
│  (S3 + CF)     │         │  Balancer          │
└────────────────┘         └─────────┬──────────┘
                                     │
                      ┌──────────────┴──────────────┐
                      │                             │
                      ▼                             ▼
              ┌───────────────┐           ┌───────────────┐
              │ Laravel API   │           │ Laravel API   │
              │ Instance 1    │           │ Instance 2    │
              │ (EC2/ECS)     │           │ (EC2/ECS)     │
              └───────┬───────┘           └───────┬───────┘
                      │                           │
                      └──────────┬────────────────┘
                                 │
                      ┌──────────┴──────────┐
                      │                     │
                      ▼                     ▼
              ┌──────────────┐      ┌─────────────┐
              │ RDS MySQL    │      │ ElastiCache │
              │ (Master +    │      │ Redis       │
              │  Replicas)   │      │             │
              └──────────────┘      └─────────────┘
```

### Backend Deployment (Laravel API)

#### Option 1: Traditional VPS (DigitalOcean, Linode)

**Server Requirements:**
- Ubuntu 22.04 LTS
- PHP 8.2 with extensions (mbstring, xml, curl, zip, gd, mysql)
- Nginx or Apache
- MySQL 8.0+
- Redis (optional, recommended)
- Supervisor (for queue workers)

**Deployment Steps:**

```bash
# 1. Install dependencies
sudo apt update
sudo apt install -y php8.2 php8.2-fpm php8.2-mysql php8.2-xml php8.2-mbstring \
  php8.2-curl php8.2-zip php8.2-gd nginx mysql-server redis-server supervisor

# 2. Install Composer
curl -sS https://getcomposer.org/installer | php
sudo mv composer.phar /usr/local/bin/composer

# 3. Clone repository
git clone https://github.com/yourorg/meridian-ecommerce.git /var/www/meridian
cd /var/www/meridian/backend

# 4. Install dependencies
composer install --optimize-autoloader --no-dev

# 5. Set permissions
sudo chown -R www-data:www-data /var/www/meridian
sudo chmod -R 755 /var/www/meridian/backend/storage
sudo chmod -R 755 /var/www/meridian/backend/bootstrap/cache

# 6. Configure environment
cp .env.example .env
nano .env  # Update production values

# 7. Generate key and optimize
php artisan key:generate
php artisan config:cache
php artisan route:cache
php artisan view:cache

# 8. Run migrations
php artisan migrate --force

# 9. Create storage link
php artisan storage:link
```

**Nginx Configuration (/etc/nginx/sites-available/meridian):**

```nginx
server {
    listen 80;
    server_name api.meridiangroup.com;
    root /var/www/meridian/backend/public;

    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";

    index index.php;

    charset utf-8;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location = /favicon.ico { access_log off; log_not_found off; }
    location = /robots.txt  { access_log off; log_not_found off; }

    error_page 404 /index.php;

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.2-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }

    location ~ /\.(?!well-known).* {
        deny all;
    }
}
```

**SSL with Let's Encrypt:**
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d api.meridiangroup.com
```

#### Option 2: AWS Elastic Beanstalk

**Configuration (.ebextensions/01-laravel.config):**

```yaml
option_settings:
  aws:elasticbeanstalk:container:php:phpini:
    document_root: /public
    memory_limit: 256M
    max_execution_time: 60

  aws:elasticbeanstalk:application:environment:
    APP_ENV: production
    APP_DEBUG: false

container_commands:
  01_install_composer:
    command: "curl -sS https://getcomposer.org/installer | php"
  02_install_dependencies:
    command: "php composer.phar install --optimize-autoloader --no-dev"
  03_optimize:
    command: "php artisan config:cache && php artisan route:cache"
  04_migrate:
    command: "php artisan migrate --force"
    leader_only: true
  05_storage_link:
    command: "php artisan storage:link"
```

#### Option 3: Docker Deployment

**Dockerfile (backend/Dockerfile):**

```dockerfile
FROM php:8.2-fpm

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip

# Install PHP extensions
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www

# Copy application files
COPY . .

# Install dependencies
RUN composer install --optimize-autoloader --no-dev

# Set permissions
RUN chown -R www-data:www-data /var/www

EXPOSE 9000
CMD ["php-fpm"]
```

**docker-compose.yml:**

```yaml
version: '3.8'

services:
  app:
    build:
      context: ./backend
      dockerfile: Dockerfile
    container_name: meridian-api
    volumes:
      - ./backend:/var/www
      - ./backend/storage:/var/www/storage
    networks:
      - meridian-network
    depends_on:
      - db
      - redis

  nginx:
    image: nginx:alpine
    container_name: meridian-nginx
    ports:
      - "8000:80"
    volumes:
      - ./backend:/var/www
      - ./docker/nginx/conf.d:/etc/nginx/conf.d
    networks:
      - meridian-network
    depends_on:
      - app

  db:
    image: mysql:8.0
    container_name: meridian-db
    environment:
      MYSQL_DATABASE: ${DB_DATABASE}
      MYSQL_ROOT_PASSWORD: ${DB_PASSWORD}
    volumes:
      - db-data:/var/lib/mysql
    networks:
      - meridian-network

  redis:
    image: redis:alpine
    container_name: meridian-redis
    networks:
      - meridian-network

networks:
  meridian-network:
    driver: bridge

volumes:
  db-data:
```

### Frontend Deployment (React SPA)

#### Option 1: Static Hosting (Vercel, Netlify)

**Vercel Deployment:**

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd frontend
vercel --prod
```

**vercel.json:**
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "env": {
    "VITE_API_URL": "https://api.meridiangroup.com"
  }
}
```

**Netlify Deployment:**

**netlify.toml:**
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  VITE_API_URL = "https://api.meridiangroup.com"
```

#### Option 2: AWS S3 + CloudFront

**Build and Upload:**

```bash
# 1. Build production bundle
cd frontend
npm run build

# 2. Upload to S3
aws s3 sync dist/ s3://meridian-frontend --delete

# 3. Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id DISTRIBUTION_ID --paths "/*"
```

**CloudFront Configuration:**
- Origin: S3 bucket
- Default Root Object: index.html
- Error Pages: 404 → /index.html (for SPA routing)
- SSL Certificate: ACM certificate for custom domain
- Behaviors: Cache static assets, no-cache for index.html

#### Option 3: Traditional Web Server

**Build:**
```bash
npm run build
```

**Nginx Configuration:**

```nginx
server {
    listen 80;
    server_name meridiangroup.com www.meridiangroup.com;
    root /var/www/meridian-frontend/dist;

    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # No cache for index.html
    location = /index.html {
        add_header Cache-Control "no-cache";
    }
}
```

### CI/CD Pipeline (GitHub Actions)

**Backend CI/CD (.github/workflows/backend.yml):**

```yaml
name: Backend CI/CD

on:
  push:
    branches: [main, develop]
    paths:
      - 'backend/**'
  pull_request:
    branches: [main, develop]
    paths:
      - 'backend/**'

jobs:
  test:
    runs-on: ubuntu-latest

    services:
      mysql:
        image: mysql:8.0
        env:
          MYSQL_DATABASE: testing
          MYSQL_ROOT_PASSWORD: password
        ports:
          - 3306:3306
        options: --health-cmd="mysqladmin ping" --health-interval=10s --health-timeout=5s --health-retries=3

    steps:
      - uses: actions/checkout@v3

      - name: Setup PHP
        uses: shivammathur/setup-php@v2
        with:
          php-version: '8.2'
          extensions: mbstring, xml, curl, zip, gd, mysql

      - name: Install Dependencies
        working-directory: ./backend
        run: composer install --prefer-dist --no-progress

      - name: Copy .env
        working-directory: ./backend
        run: cp .env.example .env

      - name: Generate Key
        working-directory: ./backend
        run: php artisan key:generate

      - name: Run Tests
        working-directory: ./backend
        env:
          DB_CONNECTION: mysql
          DB_HOST: 127.0.0.1
          DB_PORT: 3306
          DB_DATABASE: testing
          DB_USERNAME: root
          DB_PASSWORD: password
        run: php artisan test

      - name: Code Style Check
        working-directory: ./backend
        run: ./vendor/bin/pint --test

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'

    steps:
      - uses: actions/checkout@v3

      - name: Deploy to Production
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.PROD_HOST }}
          username: ${{ secrets.PROD_USERNAME }}
          key: ${{ secrets.PROD_SSH_KEY }}
          script: |
            cd /var/www/meridian/backend
            git pull origin main
            composer install --optimize-autoloader --no-dev
            php artisan migrate --force
            php artisan config:cache
            php artisan route:cache
            php artisan view:cache
            sudo systemctl reload php8.2-fpm
```

**Frontend CI/CD (.github/workflows/frontend.yml):**

```yaml
name: Frontend CI/CD

on:
  push:
    branches: [main, develop]
    paths:
      - 'frontend/**'
  pull_request:
    branches: [main, develop]
    paths:
      - 'frontend/**'

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
          cache-dependency-path: frontend/package-lock.json

      - name: Install Dependencies
        working-directory: ./frontend
        run: npm ci

      - name: Type Check
        working-directory: ./frontend
        run: npm run type-check

      - name: Lint
        working-directory: ./frontend
        run: npm run lint

      - name: Build
        working-directory: ./frontend
        env:
          VITE_API_URL: ${{ secrets.VITE_API_URL }}
        run: npm run build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install Dependencies
        working-directory: ./frontend
        run: npm ci

      - name: Build
        working-directory: ./frontend
        env:
          VITE_API_URL: https://api.meridiangroup.com
        run: npm run build

      - name: Deploy to S3
        uses: jakejarvis/s3-sync-action@master
        with:
          args: --delete
        env:
          AWS_S3_BUCKET: ${{ secrets.AWS_S3_BUCKET }}
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          AWS_REGION: 'us-east-1'
          SOURCE_DIR: 'frontend/dist'

      - name: Invalidate CloudFront
        uses: chetan/invalidate-cloudfront-action@v2
        env:
          DISTRIBUTION: ${{ secrets.CLOUDFRONT_DISTRIBUTION_ID }}
          PATHS: '/*'
          AWS_REGION: 'us-east-1'
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
```

---

## 12. Testing Strategy

### Backend Testing (PHPUnit)

#### Test Structure

```
tests/
├── Feature/
│   ├── Api/
│   │   ├── Auth/
│   │   │   ├── LoginTest.php
│   │   │   └── LogoutTest.php
│   │   ├── Category/
│   │   │   ├── ListCategoriesTest.php
│   │   │   ├── CreateCategoryTest.php
│   │   │   ├── UpdateCategoryTest.php
│   │   │   └── DeleteCategoryTest.php
│   │   ├── Product/
│   │   │   ├── ListProductsTest.php
│   │   │   ├── GetProductTest.php
│   │   │   ├── CreateProductTest.php
│   │   │   ├── UpdateProductTest.php
│   │   │   └── DeleteProductTest.php
│   │   └── Order/
│   │       ├── CreateOrderTest.php
│   │       ├── ListOrdersTest.php
│   │       └── UpdateOrderStatusTest.php
└── Unit/
    ├── Services/
    │   ├── OrderServiceTest.php
    │   └── ImageServiceTest.php
    └── Models/
        ├── ProductTest.php
        └── OrderTest.php
```

#### Example Test Cases

**Feature Test (tests/Feature/Api/Product/ListProductsTest.php):**

```php
<?php

namespace Tests\Feature\Api\Product;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ListProductsTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_list_all_products()
    {
        $category = Category::factory()->create();
        Product::factory()->count(5)->create(['category_id' => $category->id]);

        $response = $this->getJson('/api/v1/products');

        $response->assertStatus(200)
            ->assertJsonStructure([
                'success',
                'data' => [
                    '*' => ['id', 'name', 'slug', 'price', 'stock_quantity', 'category']
                ],
                'meta' => ['current_page', 'per_page', 'total'],
            ])
            ->assertJsonPath('success', true)
            ->assertJsonCount(5, 'data');
    }

    public function test_can_filter_products_by_category()
    {
        $category1 = Category::factory()->create();
        $category2 = Category::factory()->create();

        Product::factory()->count(3)->create(['category_id' => $category1->id]);
        Product::factory()->count(2)->create(['category_id' => $category2->id]);

        $response = $this->getJson("/api/v1/products?filter[category_id]={$category1->id}");

        $response->assertStatus(200)
            ->assertJsonCount(3, 'data');
    }

    public function test_can_search_products_by_name()
    {
        Product::factory()->create(['name' => 'Premium Laptop']);
        Product::factory()->create(['name' => 'Wireless Mouse']);

        $response = $this->getJson('/api/v1/products?search=laptop');

        $response->assertStatus(200)
            ->assertJsonCount(1, 'data')
            ->assertJsonPath('data.0.name', 'Premium Laptop');
    }

    public function test_products_are_paginated()
    {
        Product::factory()->count(30)->create();

        $response = $this->getJson('/api/v1/products?per_page=15');

        $response->assertStatus(200)
            ->assertJsonPath('meta.per_page', 15)
            ->assertJsonPath('meta.total', 30)
            ->assertJsonCount(15, 'data');
    }
}
```

**Unit Test (tests/Unit/Services/OrderServiceTest.php):**

```php
<?php

namespace Tests\Unit\Services;

use App\Models\Order;
use App\Models\Product;
use App\Services\OrderService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class OrderServiceTest extends TestCase
{
    use RefreshDatabase;

    protected OrderService $orderService;

    protected function setUp(): void
    {
        parent::setUp();
        $this->orderService = new OrderService();
    }

    public function test_calculates_order_total_correctly()
    {
        $product1 = Product::factory()->create(['price' => 100.00]);
        $product2 = Product::factory()->create(['price' => 50.00]);

        $orderData = [
            'customer_name' => 'John Doe',
            'customer_email' => 'john@example.com',
            'customer_phone' => '1234567890',
            'shipping_address' => '123 Main St',
            'items' => [
                ['product_id' => $product1->id, 'quantity' => 2, 'price' => 100.00],
                ['product_id' => $product2->id, 'quantity' => 1, 'price' => 50.00],
            ],
        ];

        $order = $this->orderService->createOrder($orderData);

        $this->assertEquals(250.00, $order->total_amount);
        $this->assertCount(2, $order->items);
    }

    public function test_generates_unique_order_number()
    {
        $order1 = Order::factory()->create();
        $order2 = Order::factory()->create();

        $this->assertNotEquals($order1->order_number, $order2->order_number);
        $this->assertMatchesRegularExpression('/^ORD-\d{4}-\d+$/', $order1->order_number);
    }
}
```

**Running Tests:**
```bash
# Run all tests
php artisan test

# Run specific test
php artisan test --filter=ListProductsTest

# Run with coverage
php artisan test --coverage

# Run tests in parallel
php artisan test --parallel
```

### Frontend Testing

#### Testing Libraries

```json
{
  "devDependencies": {
    "@testing-library/react": "^14.0.0",
    "@testing-library/jest-dom": "^6.1.0",
    "@testing-library/user-event": "^14.5.0",
    "vitest": "^1.0.0",
    "@vitest/ui": "^1.0.0",
    "jsdom": "^23.0.0"
  }
}
```

#### Test Configuration (vitest.config.ts)

```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    coverage: {
      reporter: ['text', 'html'],
      exclude: ['node_modules/', 'src/test/'],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

#### Example Tests

**Component Test (src/components/products/__tests__/ProductCard.test.tsx):**

```typescript
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { ProductCard } from '../ProductCard';
import type { Product } from '@/types/product.types';

const mockProduct: Product = {
  id: 1,
  name: 'Test Product',
  slug: 'test-product',
  description: 'Test description',
  price: 99.99,
  stock_quantity: 10,
  category_id: 1,
  category: {
    id: 1,
    name: 'Electronics',
    slug: 'electronics',
  },
  image_url: 'https://example.com/image.jpg',
};

describe('ProductCard', () => {
  it('renders product information correctly', () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$99.99')).toBeInTheDocument();
    expect(screen.getByText('Electronics')).toBeInTheDocument();
  });

  it('calls onAddToCart when button is clicked', async () => {
    const user = userEvent.setup();
    const onAddToCart = vi.fn();

    render(<ProductCard product={mockProduct} onAddToCart={onAddToCart} />);

    const addButton = screen.getByRole('button', { name: /add to cart/i });
    await user.click(addButton);

    expect(onAddToCart).toHaveBeenCalledWith(mockProduct);
  });

  it('displays out of stock message when stock is 0', () => {
    const outOfStockProduct = { ...mockProduct, stock_quantity: 0 };

    render(<ProductCard product={outOfStockProduct} />);

    expect(screen.getByText(/out of stock/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add to cart/i })).toBeDisabled();
  });
});
```

**Hook Test (src/hooks/__tests__/useCart.test.ts):**

```typescript
import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { useCartStore } from '@/store/cartStore';
import type { Product } from '@/types/product.types';

const mockProduct: Product = {
  id: 1,
  name: 'Test Product',
  slug: 'test-product',
  price: 99.99,
  stock_quantity: 10,
  category_id: 1,
};

describe('useCartStore', () => {
  beforeEach(() => {
    useCartStore.getState().clearCart();
  });

  it('adds item to cart', () => {
    const { result } = renderHook(() => useCartStore());

    act(() => {
      result.current.addItem(mockProduct, 2);
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].quantity).toBe(2);
  });

  it('increments quantity when adding existing item', () => {
    const { result } = renderHook(() => useCartStore());

    act(() => {
      result.current.addItem(mockProduct, 1);
      result.current.addItem(mockProduct, 2);
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].quantity).toBe(3);
  });

  it('calculates total price correctly', () => {
    const { result } = renderHook(() => useCartStore());

    act(() => {
      result.current.addItem(mockProduct, 2);
    });

    expect(result.current.getTotalPrice()).toBe(199.98);
  });

  it('removes item from cart', () => {
    const { result } = renderHook(() => useCartStore());

    act(() => {
      result.current.addItem(mockProduct, 1);
      result.current.removeItem(mockProduct.id);
    });

    expect(result.current.items).toHaveLength(0);
  });
});
```

**Running Frontend Tests:**

```bash
# Run all tests
npm run test

# Run in watch mode
npm run test:watch

# Run with coverage
npm run test:coverage

# Run with UI
npm run test:ui
```

---

## 13. Monitoring & Logging

### Backend Monitoring

#### Laravel Telescope (Development)

**Installation:**
```bash
composer require laravel/telescope --dev
php artisan telescope:install
php artisan migrate
```

**Configuration (config/telescope.php):**
```php
<?php

return [
    'enabled' => env('TELESCOPE_ENABLED', true),
    'storage' => [
        'database' => [
            'connection' => env('DB_CONNECTION', 'mysql'),
            'chunk' => 1000,
        ],
    ],
    'watchers' => [
        Watchers\QueryWatcher::class => env('TELESCOPE_QUERY_WATCHER', true),
        Watchers\RequestWatcher::class => env('TELESCOPE_REQUEST_WATCHER', true),
        Watchers\ExceptionWatcher::class => true,
        // ... other watchers
    ],
];
```

**Access:** `http://https://ecommerceback.obada-almaghribi.com/telescope`

#### Application Logging

**Log Channels (config/logging.php):**
```php
<?php

return [
    'default' => env('LOG_CHANNEL', 'stack'),

    'channels' => [
        'stack' => [
            'driver' => 'stack',
            'channels' => ['daily', 'slack'],
            'ignore_exceptions' => false,
        ],

        'daily' => [
            'driver' => 'daily',
            'path' => storage_path('logs/laravel.log'),
            'level' => env('LOG_LEVEL', 'debug'),
            'days' => 14,
        ],

        'slack' => [
            'driver' => 'slack',
            'url' => env('LOG_SLACK_WEBHOOK_URL'),
            'username' => 'Laravel Log',
            'emoji' => ':boom:',
            'level' => 'critical',
        ],
    ],
];
```

**Usage in Code:**
```php
use Illuminate\Support\Facades\Log;

Log::info('Product created', ['product_id' => $product->id]);
Log::warning('Low stock alert', ['product_id' => $product->id, 'stock' => $product->stock_quantity]);
Log::error('Order creation failed', ['error' => $exception->getMessage()]);
```

#### Performance Monitoring (Production)

**New Relic Integration:**

```bash
# Install New Relic PHP agent
sudo apt install newrelic-php5
sudo newrelic-install install
```

**Alternative: Sentry for Error Tracking**

```bash
composer require sentry/sentry-laravel
php artisan sentry:publish --dsn=your-dsn-here
```

### Frontend Monitoring

#### Error Tracking (Sentry)

**Installation:**
```bash
npm install @sentry/react @sentry/tracing
```

**Configuration (src/main.tsx):**
```typescript
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';

if (import.meta.env.PROD) {
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    integrations: [new BrowserTracing()],
    tracesSampleRate: 1.0,
    environment: import.meta.env.MODE,
  });
}
```

#### Analytics (Google Analytics)

**Installation:**
```bash
npm install react-ga4
```

**Configuration:**
```typescript
import ReactGA from 'react-ga4';

if (import.meta.env.VITE_ENABLE_ANALYTICS === 'true') {
  ReactGA.initialize(import.meta.env.VITE_GA_MEASUREMENT_ID);
}

// Track page views
ReactGA.send({ hitType: 'pageview', page: window.location.pathname });
```

### Health Checks

**Backend Health Endpoint (routes/api.php):**
```php
Route::get('/health', function () {
    return response()->json([
        'status' => 'healthy',
        'timestamp' => now()->toIso8601String(),
        'services' => [
            'database' => DB::connection()->getPdo() ? 'up' : 'down',
            'cache' => Cache::has('health_check') ? 'up' : 'down',
        ],
    ]);
});
```

**Uptime Monitoring:**
- Use services like UptimeRobot, Pingdom, or StatusCake
- Monitor both frontend and backend endpoints
- Set up alerting for downtime

---

## Appendix

### A. Glossary

| Term | Definition |
|------|------------|
| **SPA** | Single Page Application - web app that loads once and dynamically updates |
| **API** | Application Programming Interface - contract for communication between systems |
| **ORM** | Object-Relational Mapping - database abstraction layer (Eloquent in Laravel) |
| **CSRF** | Cross-Site Request Forgery - security vulnerability prevented by token validation |
| **CORS** | Cross-Origin Resource Sharing - mechanism for allowing cross-domain requests |
| **Sanctum** | Laravel's SPA authentication system |
| **Zustand** | Lightweight React state management library |
| **TanStack Query** | Server state management library (formerly React Query) |
| **Eager Loading** | Loading related data in a single query to prevent N+1 problems |
| **N+1 Problem** | Database performance issue from executing N additional queries in a loop |

### B. Useful Resources

**Laravel Documentation:**
- [Laravel 11 Docs](https://laravel.com/docs/11.x)
- [Laravel Sanctum](https://laravel.com/docs/11.x/sanctum)
- [Eloquent ORM](https://laravel.com/docs/11.x/eloquent)

**React & TypeScript:**
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)

**UI Libraries:**
- [TailwindCSS](https://tailwindcss.com/docs)
- [ShadCN UI](https://ui.shadcn.com/)
- [Framer Motion](https://www.framer.com/motion/)

**State Management:**
- [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction)
- [TanStack Query](https://tanstack.com/query/latest)

### C. Contact & Support

**Technical Lead:** [Your Name]
**Project Repository:** [GitHub URL]
**Issue Tracker:** [GitHub Issues URL]
**Documentation:** [Wiki/Confluence URL]

---

## Document Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0 | 2025-10-18 | Tech Lead | Initial technical architecture document |

---

**Document Status:** APPROVED FOR IMPLEMENTATION
**Next Review Date:** 2025-11-18
**Distribution:** Database Engineer, Backend Engineer, Frontend Engineer, UX Engineer, Project Manager

---

*This document represents the technical foundation for the Meridian Group E-commerce platform. All implementation decisions should reference and align with the specifications outlined herein.*
