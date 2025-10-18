# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Meridian Group E-commerce platform - Laravel 11 REST API backend for an e-commerce application. The architecture follows a decoupled monolithic pattern with plans for a separate React frontend communicating via RESTful API.

**Working Directory**: All commands should be run from `backend/` directory unless otherwise specified.

## Development Commands

### Initial Setup
```bash
cd backend
composer setup
```
This runs: `composer install`, creates `.env`, generates key, runs migrations, and builds assets.

### Development Server
```bash
composer dev
```
Runs concurrently: Laravel server (`:8000`), queue worker, log viewer (Laravel Pail), and Vite dev server. All processes terminate together.

### Database Operations
```bash
# Reset database with fresh migrations and seed data
php artisan migrate:fresh --seed

# Run only seeders (without dropping tables)
php artisan db:seed

# Run specific seeder
php artisan db:seed --class=ProductSeeder
```

### Testing
```bash
composer test
# Or directly:
php artisan test

# Run specific test file
php artisan test tests/Feature/ProductTest.php

# Run specific test method
php artisan test --filter test_can_create_product
```

### Code Quality
```bash
# Laravel Pint (code formatter)
./vendor/bin/pint

# Run Pint on specific files
./vendor/bin/pint app/Models
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

### API Structure

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

### Controller Organization

```
app/Http/Controllers/
├── Api/
│   ├── AuthController.php          # Login/logout
│   ├── CategoryController.php      # Public category listing
│   ├── ProductController.php       # Public product browsing
│   ├── OrderController.php         # Guest checkout
│   └── Admin/
│       ├── ProductController.php   # Admin product management
│       └── OrderController.php     # Admin order management
```

**Pattern**: Public controllers return data for customer-facing features. Admin controllers require authentication and provide management capabilities.

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

### Database Queries

**Always use eager loading** to prevent N+1 queries:
```php
// Good - 2 queries
Product::with('category')->get();

// Bad - N+1 queries
Product::all(); // Then accessing $product->category in loop
```

**Use query scopes** defined in models:
```php
Product::inStock()->byCategory($id)->get();
Order::byCustomer($email)->recent(30)->paginate(10);
```

**Wrap multi-step operations in transactions**:
```php
use Illuminate\Support\Facades\DB;

DB::beginTransaction();
try {
    $order = Order::create([...]);
    OrderItem::create([...]);
    // Update stock, etc.
    DB::commit();
} catch (\Exception $e) {
    DB::rollBack();
    throw $e;
}
```

### API Resource Pattern

When creating new API endpoints:
1. Create controller in appropriate namespace (`Api/` or `Api/Admin/`)
2. Use Form Request classes for validation (create in `app/Http/Requests/`)
3. Return API Resources for consistent serialization (create in `app/Http/Resources/`)
4. Apply proper middleware in route definition

### File Locations

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
├── DATABASE_DOCUMENTATION.md       # Complete DB schema documentation
├── DATABASE_QUICK_START.md         # Quick reference for DB operations
└── TECHNICAL_ARCHITECTURE.md       # Full system architecture
```

## Important Configuration

### Environment Setup

Key `.env` variables (see `.env.example`):
- `DB_CONNECTION=mysql` - Database type
- `DB_DATABASE=laravel` - Database name
- `SANCTUM_STATEFUL_DOMAINS` - Frontend domain for CORS
- `SESSION_DRIVER=database` - Required for Sanctum SPA auth

### CORS Configuration

When connecting frontend: Update `config/cors.php` and `SANCTUM_STATEFUL_DOMAINS` in `.env` to include frontend URL.

## Testing Notes

- PHPUnit configuration: `backend/phpunit.xml`
- Test database configured to use SQLite in memory (`:memory:`)
- Feature tests should test full request/response cycle
- Use database transactions in tests for cleanup: `use RefreshDatabase;`

## Common Operations

### Adding a New API Endpoint

1. Define route in `routes/api.php`
2. Create controller method or new controller in `app/Http/Controllers/Api/`
3. Create Form Request for validation if needed
4. Create API Resource for response transformation if needed
5. Add feature test in `tests/Feature/`

### Adding a New Model

1. Create migration: `php artisan make:migration create_tablename_table`
2. Create model: `php artisan make:model ModelName`
3. Define relationships in model
4. Add query scopes for common queries
5. Create factory for testing: `php artisan make:factory ModelNameFactory`
6. Create seeder if needed: `php artisan make:seeder ModelNameSeeder`

### Modifying Database Schema

1. Create new migration: `php artisan make:migration description_of_change`
2. Update model if relationships/attributes changed
3. Update seeders if sample data affected
4. Run migration: `php artisan migrate` (or `migrate:fresh --seed` in development)

## Frontend Integration Notes

This backend is designed to be consumed by a React SPA (not yet implemented). When working with frontend:

- API base URL: `http://localhost:8000/api`
- Sanctum CSRF cookie: `GET /sanctum/csrf-cookie` before authentication
- All API responses use consistent JSON structure via API Resources
- Image URLs in seeded data use `picsum.photos` placeholders
- Stock levels in `products.stock` field should control purchase availability

## Reference Documentation

For detailed information, see:
- `backend/TECHNICAL_ARCHITECTURE.md` - Complete technical architecture
- `backend/DATABASE_DOCUMENTATION.md` - Full database schema and optimization details
- `backend/DATABASE_QUICK_START.md` - Quick reference for database operations and sample queries
- `backend/README.md` - Standard Laravel documentation
