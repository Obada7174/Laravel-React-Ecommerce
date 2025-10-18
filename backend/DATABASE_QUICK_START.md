# Database Quick Start Guide

## Database Engineer Deliverable - Ready to Use

---

## Complete File List

### Migration Files (5 files)
```
D:\codes-folder\meridiangroup-ecommerce\database\migrations\2024_01_01_000001_create_users_table.php
D:\codes-folder\meridiangroup-ecommerce\database\migrations\2024_01_01_000002_create_categories_table.php
D:\codes-folder\meridiangroup-ecommerce\database\migrations\2024_01_01_000003_create_products_table.php
D:\codes-folder\meridiangroup-ecommerce\database\migrations\2024_01_01_000004_create_orders_table.php
D:\codes-folder\meridiangroup-ecommerce\database\migrations\2024_01_01_000005_create_order_items_table.php
```

### Model Files (5 files)
```
D:\codes-folder\meridiangroup-ecommerce\app\Models\User.php
D:\codes-folder\meridiangroup-ecommerce\app\Models\Category.php
D:\codes-folder\meridiangroup-ecommerce\app\Models\Product.php
D:\codes-folder\meridiangroup-ecommerce\app\Models\Order.php
D:\codes-folder\meridiangroup-ecommerce\app\Models\OrderItem.php
```

### Seeder Files (4 files)
```
D:\codes-folder\meridiangroup-ecommerce\database\seeders\DatabaseSeeder.php
D:\codes-folder\meridiangroup-ecommerce\database\seeders\UserSeeder.php
D:\codes-folder\meridiangroup-ecommerce\database\seeders\CategorySeeder.php
D:\codes-folder\meridiangroup-ecommerce\database\seeders\ProductSeeder.php
```

---

## Installation Steps

### 1. Setup Database (One-Time)

Run migrations and seed data:
```bash
php artisan migrate:fresh --seed
```

This will:
- Create all 5 database tables
- Seed 1 admin user
- Seed 4 categories
- Seed 12 sample products

### 2. Admin Credentials

After seeding, you can login with:
```
Email: admin@example.com
Password: password
```

---

## Database Schema Summary

### Tables Created

| Table | Records | Purpose |
|-------|---------|---------|
| users | 1 | Admin authentication |
| categories | 4 | Product categorization |
| products | 12 | E-commerce inventory |
| orders | 0 | Customer purchases (empty initially) |
| order_items | 0 | Order line items (empty initially) |

### Relationships

```
users (authentication only)

categories (1) ──< (many) products

orders (1) ──< (many) order_items >─── (1) products
```

---

## Sample Data Overview

### Categories (4)
1. Electronics (slug: `electronics`)
2. Clothing (slug: `clothing`)
3. Books (slug: `books`)
4. Accessories (slug: `accessories`)

### Products (12 total - 3 per category)

**Electronics:**
- Wireless Bluetooth Headphones - $149.99 (45 in stock)
- Smart Watch Pro - $299.99 (30 in stock)
- Portable Power Bank 20000mAh - $39.99 (100 in stock)

**Clothing:**
- Classic Cotton T-Shirt - $24.99 (150 in stock)
- Denim Jeans - Slim Fit - $79.99 (80 in stock)
- Winter Wool Jacket - $189.99 (35 in stock)

**Books:**
- The Art of Programming - $49.99 (60 in stock)
- Mystery at Midnight Manor - $16.99 (120 in stock)
- Mastering Digital Photography - $34.99 (55 in stock)

**Accessories:**
- Leather Wallet - RFID Protected - $44.99 (90 in stock)
- Polarized Sunglasses - $89.99 (70 in stock)
- Stainless Steel Water Bottle - $27.99 (110 in stock)

---

## Quick Model Usage Examples

### Get All Categories with Products
```php
use App\Models\Category;

$categories = Category::with('products')->get();
```

### Get Products by Category
```php
use App\Models\Product;

$electronics = Product::whereHas('category', function($query) {
    $query->where('slug', 'electronics');
})->get();
```

### Get In-Stock Products
```php
$availableProducts = Product::inStock()->get();
```

### Create an Order
```php
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Support\Facades\DB;

DB::beginTransaction();
try {
    $order = Order::create([
        'user_name' => 'John Doe',
        'user_email' => 'john@example.com',
        'address' => '123 Main St, City, State 12345',
        'total' => 199.98,
    ]);

    OrderItem::create([
        'order_id' => $order->id,
        'product_id' => 1, // Wireless Bluetooth Headphones
        'quantity' => 1,
        'price' => 149.99,
    ]);

    OrderItem::create([
        'order_id' => $order->id,
        'product_id' => 3, // Portable Power Bank
        'quantity' => 1,
        'price' => 39.99,
    ]);

    DB::commit();
} catch (\Exception $e) {
    DB::rollBack();
    throw $e;
}
```

### Get Order with Items and Product Details
```php
use App\Models\Order;

$order = Order::with(['orderItems.product.category'])->find($orderId);

foreach ($order->orderItems as $item) {
    echo $item->product->name; // Product name
    echo $item->product->category->name; // Category name
    echo $item->subtotal; // Line item total
}
```

---

## Database Optimizations Implemented

### Indexes Created
- Primary keys on all tables (auto-indexed)
- Foreign keys on relationships (auto-indexed)
- Unique indexes: `users.email`, `categories.slug`
- Single column indexes: `categories.name`, `products.name`, `products.stock`, `orders.user_email`, `orders.created_at`
- Composite indexes: `products(category_id, price)`, `orders(user_email, created_at)`, `order_items(order_id, product_id)`

### Data Type Precision
- `DECIMAL(10,2)` for all prices and totals (exact precision)
- `TEXT` for descriptions and addresses (flexible length)
- `UNSIGNED INT` for stock and quantities (non-negative)

### Referential Integrity
- Cascade delete: Category → Products, Order → OrderItems
- Restrict delete: Products (if in order history)

---

## Performance Best Practices

### 1. Always Use Eager Loading
```php
// GOOD - 2 queries
$products = Product::with('category')->get();

// BAD - N+1 queries
$products = Product::all();
foreach ($products as $product) {
    $product->category; // Extra query per product
}
```

### 2. Use Query Scopes
```php
// Available scopes
Product::byCategory($categoryId)->get();
Product::inStock()->get();
Order::byCustomer($email)->get();
Order::recent($days)->get();
OrderItem::byOrder($orderId)->get();
OrderItem::byProduct($productId)->get();
```

### 3. Paginate Large Results
```php
$products = Product::paginate(20);
$orders = Order::recent(90)->paginate(50);
```

### 4. Select Only Needed Columns
```php
$products = Product::select('id', 'name', 'price')->get();
```

---

## Common Queries for Backend Integration

### Get All Products with Categories
```php
Product::with('category')->inStock()->paginate(20);
```

### Get Category with Its Products
```php
Category::where('slug', $slug)->with('products')->firstOrFail();
```

### Search Products
```php
Product::where('name', 'like', '%' . $search . '%')
    ->orWhere('description', 'like', '%' . $search . '%')
    ->inStock()
    ->paginate(20);
```

### Get Customer Order History
```php
Order::byCustomer($email)
    ->with(['orderItems.product'])
    ->orderBy('created_at', 'desc')
    ->paginate(10);
```

### Get Best Selling Products
```php
Product::withCount('orderItems')
    ->orderBy('order_items_count', 'desc')
    ->limit(10)
    ->get();
```

### Calculate Revenue
```php
// Today's revenue
Order::whereDate('created_at', today())->sum('total');

// Last 30 days
Order::recent(30)->sum('total');

// All time
Order::sum('total');
```

---

## Testing Commands

### Re-seed Database
```bash
php artisan db:seed
```

### Reset and Re-seed
```bash
php artisan migrate:fresh --seed
```

### Run Specific Seeder
```bash
php artisan db:seed --class=ProductSeeder
```

---

## File Locations Reference

```
meridiangroup-ecommerce/
├── app/
│   └── Models/                          # All 5 models ready
│       ├── User.php
│       ├── Category.php
│       ├── Product.php
│       ├── Order.php
│       └── OrderItem.php
│
├── database/
│   ├── migrations/                      # All 5 migrations ready
│   │   ├── 2024_01_01_000001_create_users_table.php
│   │   ├── 2024_01_01_000002_create_categories_table.php
│   │   ├── 2024_01_01_000003_create_products_table.php
│   │   ├── 2024_01_01_000004_create_orders_table.php
│   │   └── 2024_01_01_000005_create_order_items_table.php
│   │
│   └── seeders/                         # All 4 seeders ready
│       ├── DatabaseSeeder.php           # Main orchestrator
│       ├── UserSeeder.php
│       ├── CategorySeeder.php
│       └── ProductSeeder.php
│
├── DATABASE_DOCUMENTATION.md            # Complete documentation
└── DATABASE_QUICK_START.md              # This file
```

---

## Next Steps for Backend Engineer

1. **Review Models**: Check `app/Models/` for all relationships and methods
2. **Run Migrations**: Execute `php artisan migrate:fresh --seed`
3. **Test Queries**: Try the example queries above in Tinker (`php artisan tinker`)
4. **Implement Controllers**: Create API controllers using the models
5. **Add Validation**: Implement validation rules for all database operations
6. **Setup Transactions**: Use DB transactions for complex operations (see documentation)

---

## Next Steps for Frontend Engineer

1. **Test Admin Login**: Use credentials `admin@example.com` / `password`
2. **Fetch Categories**: Use category IDs 1-4 or slugs (electronics, clothing, books, accessories)
3. **Display Products**: Product IDs 1-12 available with realistic data
4. **Product Images**: All use placeholder images from picsum.photos
5. **Stock Checking**: Use `product.stock` field for availability

---

## Support Documentation

For complete documentation, see:
- `DATABASE_DOCUMENTATION.md` - Full technical documentation
- This file - Quick start guide

---

## Database Status: READY FOR USE

All migration files, models, and seeders are production-ready and can be used immediately in your Laravel 11 application.

**Created by:** Database Engineer
**Date:** 2025-10-18
**Status:** Complete and Ready for Integration
