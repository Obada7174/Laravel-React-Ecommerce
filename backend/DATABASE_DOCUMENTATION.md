# E-Commerce Database Implementation Documentation

## Database Engineer Deliverable

This document provides comprehensive information about the database implementation for the Laravel 11 E-commerce application.

---

## Table of Contents

1. [Database Schema Overview](#database-schema-overview)
2. [Migration Files](#migration-files)
3. [Model Files](#model-files)
4. [Seeder Files](#seeder-files)
5. [Database Optimization](#database-optimization)
6. [Usage Instructions](#usage-instructions)
7. [Query Examples](#query-examples)
8. [Performance Considerations](#performance-considerations)

---

## Database Schema Overview

### Entity Relationship Diagram (Textual)

```
users (1) ─── (authentication)

categories (1) ──< (many) products (many) >── (many) order_items

orders (1) ──< (many) order_items
```

### Tables Summary

| Table | Purpose | Key Relationships |
|-------|---------|-------------------|
| **users** | Admin authentication | None |
| **categories** | Product categorization | Has many products |
| **products** | E-commerce inventory | Belongs to category, has many order_items |
| **orders** | Customer purchases | Has many order_items |
| **order_items** | Order line items | Belongs to order and product |

---

## Migration Files

All migration files are located in `database/migrations/`

### 1. Users Table
**File:** `2024_01_01_000001_create_users_table.php`

```sql
-- Columns
id (BIGINT, PRIMARY KEY, AUTO_INCREMENT)
name (VARCHAR 100)
email (VARCHAR 150, UNIQUE)
email_verified_at (TIMESTAMP, NULLABLE)
password (VARCHAR 255)
remember_token (VARCHAR 100, NULLABLE)
created_at (TIMESTAMP)
updated_at (TIMESTAMP)

-- Indexes
PRIMARY KEY (id)
UNIQUE INDEX (email)
```

### 2. Categories Table
**File:** `2024_01_01_000002_create_categories_table.php`

```sql
-- Columns
id (BIGINT, PRIMARY KEY, AUTO_INCREMENT)
name (VARCHAR 100)
slug (VARCHAR 150, UNIQUE)
created_at (TIMESTAMP)
updated_at (TIMESTAMP)

-- Indexes
PRIMARY KEY (id)
UNIQUE INDEX (slug)
INDEX (name)
```

### 3. Products Table
**File:** `2024_01_01_000003_create_products_table.php`

```sql
-- Columns
id (BIGINT, PRIMARY KEY, AUTO_INCREMENT)
category_id (BIGINT, FOREIGN KEY)
name (VARCHAR 200)
description (TEXT)
price (DECIMAL 10,2)
image (VARCHAR 500)
stock (UNSIGNED INT, DEFAULT 0)
created_at (TIMESTAMP)
updated_at (TIMESTAMP)

-- Indexes
PRIMARY KEY (id)
FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
INDEX (name)
INDEX (category_id, price) -- Composite index
INDEX (stock)
```

### 4. Orders Table
**File:** `2024_01_01_000004_create_orders_table.php`

```sql
-- Columns
id (BIGINT, PRIMARY KEY, AUTO_INCREMENT)
user_name (VARCHAR 150)
user_email (VARCHAR 150)
address (TEXT)
total (DECIMAL 10,2)
created_at (TIMESTAMP)
updated_at (TIMESTAMP)

-- Indexes
PRIMARY KEY (id)
INDEX (user_email)
INDEX (created_at)
INDEX (user_email, created_at) -- Composite index
```

### 5. Order Items Table
**File:** `2024_01_01_000005_create_order_items_table.php`

```sql
-- Columns
id (BIGINT, PRIMARY KEY, AUTO_INCREMENT)
order_id (BIGINT, FOREIGN KEY)
product_id (BIGINT, FOREIGN KEY)
quantity (UNSIGNED INT)
price (DECIMAL 10,2)
created_at (TIMESTAMP)
updated_at (TIMESTAMP)

-- Indexes
PRIMARY KEY (id)
FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE RESTRICT
INDEX (order_id, product_id) -- Composite index
INDEX (product_id)
```

---

## Model Files

All model files are located in `app/Models/`

### 1. User Model
**File:** `app/Models/User.php`

**Features:**
- Extends `Illuminate\Foundation\Auth\User`
- Password hashing via `casts()`
- Mass assignable: name, email, password
- Hidden attributes: password, remember_token

**Relationships:** None

### 2. Category Model
**File:** `app/Models/Category.php`

**Features:**
- Mass assignable: name, slug
- Route key: slug (for SEO-friendly URLs)
- Datetime casting for timestamps

**Relationships:**
- `products()` - hasMany relationship with Product model

**Methods:**
```php
$category->products; // Get all products in category
```

### 3. Product Model
**File:** `app/Models/Product.php`

**Features:**
- Mass assignable: category_id, name, description, price, image, stock
- Decimal casting for price (2 decimal places)
- Helper methods for stock management

**Relationships:**
- `category()` - belongsTo relationship with Category model
- `orderItems()` - hasMany relationship with OrderItem model

**Methods:**
```php
$product->category; // Get product's category
$product->orderItems; // Get all order items for this product
$product->isInStock(); // Check if product is in stock
$product->hasSufficientStock($quantity); // Check sufficient stock
```

**Query Scopes:**
```php
Product::byCategory($categoryId)->get(); // Filter by category
Product::inStock()->get(); // Filter products in stock
```

### 4. Order Model
**File:** `app/Models/Order.php`

**Features:**
- Mass assignable: user_name, user_email, address, total
- Decimal casting for total (2 decimal places)
- Computed attribute for total items

**Relationships:**
- `orderItems()` - hasMany relationship with OrderItem model

**Methods:**
```php
$order->orderItems; // Get all items in order
$order->total_items; // Get total quantity of items
```

**Query Scopes:**
```php
Order::byCustomer($email)->get(); // Filter by customer email
Order::recent($days)->get(); // Get orders from last N days (default 30)
```

### 5. OrderItem Model
**File:** `app/Models/OrderItem.php`

**Features:**
- Mass assignable: order_id, product_id, quantity, price
- Decimal casting for price (2 decimal places)
- Computed attribute for subtotal

**Relationships:**
- `order()` - belongsTo relationship with Order model
- `product()` - belongsTo relationship with Product model

**Methods:**
```php
$orderItem->order; // Get the order
$orderItem->product; // Get the product
$orderItem->subtotal; // Get line item subtotal (quantity * price)
```

**Query Scopes:**
```php
OrderItem::byOrder($orderId)->get(); // Filter by order
OrderItem::byProduct($productId)->get(); // Filter by product
```

---

## Seeder Files

All seeder files are located in `database/seeders/`

### 1. UserSeeder
**File:** `database/seeders/UserSeeder.php`

Creates 1 admin user:
- **Email:** admin@example.com
- **Password:** password
- **Name:** Admin User

### 2. CategorySeeder
**File:** `database/seeders/CategorySeeder.php`

Creates 4 categories:
1. Electronics (slug: electronics)
2. Clothing (slug: clothing)
3. Books (slug: books)
4. Accessories (slug: accessories)

### 3. ProductSeeder
**File:** `database/seeders/ProductSeeder.php`

Creates 12 products (3 per category):

**Electronics:**
- Wireless Bluetooth Headphones ($149.99, stock: 45)
- Smart Watch Pro ($299.99, stock: 30)
- Portable Power Bank 20000mAh ($39.99, stock: 100)

**Clothing:**
- Classic Cotton T-Shirt ($24.99, stock: 150)
- Denim Jeans - Slim Fit ($79.99, stock: 80)
- Winter Wool Jacket ($189.99, stock: 35)

**Books:**
- The Art of Programming ($49.99, stock: 60)
- Mystery at Midnight Manor ($16.99, stock: 120)
- Mastering Digital Photography ($34.99, stock: 55)

**Accessories:**
- Leather Wallet - RFID Protected ($44.99, stock: 90)
- Polarized Sunglasses ($89.99, stock: 70)
- Stainless Steel Water Bottle ($27.99, stock: 110)

### 4. DatabaseSeeder
**File:** `database/seeders/DatabaseSeeder.php`

Orchestrates all seeders in correct order:
1. UserSeeder
2. CategorySeeder
3. ProductSeeder

---

## Database Optimization

### Indexing Strategy

#### 1. Primary Keys
All tables use auto-incrementing BIGINT primary keys for optimal performance.

#### 2. Foreign Key Indexes
- `products.category_id` - Indexed for join operations
- `order_items.order_id` - Indexed for order detail queries
- `order_items.product_id` - Indexed for product sales analysis

#### 3. Unique Indexes
- `users.email` - Prevents duplicates, speeds up authentication
- `categories.slug` - SEO-friendly URLs, fast category lookups

#### 4. Single Column Indexes
- `categories.name` - Category search and filtering
- `products.name` - Product search operations
- `products.stock` - Inventory management queries
- `orders.user_email` - Customer order history
- `orders.created_at` - Recent orders and reporting

#### 5. Composite Indexes
- `products(category_id, price)` - Category filtering with price sorting
- `orders(user_email, created_at)` - Customer order history with date filtering
- `order_items(order_id, product_id)` - Order detail queries

### Data Type Optimization

| Column Type | Usage | Rationale |
|-------------|-------|-----------|
| DECIMAL(10,2) | Prices, totals | Exact precision for financial calculations |
| TEXT | Descriptions, addresses | Variable length content up to 65,535 chars |
| VARCHAR | Names, emails, slugs | Fixed-max length strings |
| UNSIGNED INT | Stock, quantities | Non-negative integers, saves storage |
| TIMESTAMP | Dates | Automatic timezone handling |

### Referential Integrity

**Cascade Deletes:**
- When category deleted → Products auto-deleted
- When order deleted → Order items auto-deleted

**Restrict Deletes:**
- When product deleted → Prevented if in order history (data preservation)

---

## Usage Instructions

### Step 1: Run Migrations

```bash
php artisan migrate
```

This creates all 5 tables with proper structure, indexes, and constraints.

### Step 2: Run Seeders

```bash
php artisan db:seed
```

Or run specific seeders:

```bash
php artisan db:seed --class=UserSeeder
php artisan db:seed --class=CategorySeeder
php artisan db:seed --class=ProductSeeder
```

### Step 3: Fresh Migration with Seeding (Development)

```bash
php artisan migrate:fresh --seed
```

This drops all tables, recreates them, and seeds data.

---

## Query Examples

### Category Queries

```php
// Get all categories with product count
$categories = Category::withCount('products')->get();

// Get category by slug with products
$category = Category::where('slug', 'electronics')
    ->with('products')
    ->first();

// Get category with in-stock products only
$category = Category::with(['products' => function($query) {
    $query->where('stock', '>', 0);
}])->find($id);
```

### Product Queries

```php
// Get products by category
$products = Product::byCategory($categoryId)->get();

// Get in-stock products sorted by price
$products = Product::inStock()
    ->orderBy('price', 'asc')
    ->get();

// Get product with category
$product = Product::with('category')->find($id);

// Search products by name
$products = Product::where('name', 'like', '%headphones%')
    ->inStock()
    ->get();

// Get low stock products (inventory alert)
$lowStock = Product::where('stock', '<', 10)
    ->with('category')
    ->get();
```

### Order Queries

```php
// Get customer orders
$orders = Order::byCustomer('customer@example.com')
    ->with('orderItems.product')
    ->orderBy('created_at', 'desc')
    ->get();

// Get recent orders with items
$recentOrders = Order::recent(7) // Last 7 days
    ->with(['orderItems.product.category'])
    ->get();

// Get order with full details
$order = Order::with(['orderItems' => function($query) {
    $query->with('product.category');
}])->find($id);

// Calculate total revenue (last 30 days)
$revenue = Order::recent(30)->sum('total');
```

### Order Item Queries

```php
// Get order items for specific order
$items = OrderItem::byOrder($orderId)
    ->with('product')
    ->get();

// Get sales for specific product
$sales = OrderItem::byProduct($productId)
    ->with('order')
    ->get();

// Calculate total quantity sold for product
$totalSold = OrderItem::byProduct($productId)->sum('quantity');
```

### Advanced Queries

```php
// Get best-selling products
$bestSellers = Product::withCount('orderItems')
    ->orderBy('order_items_count', 'desc')
    ->limit(10)
    ->get();

// Get category revenue
$categoryRevenue = Category::with(['products.orderItems'])
    ->get()
    ->map(function($category) {
        return [
            'category' => $category->name,
            'revenue' => $category->products->sum(function($product) {
                return $product->orderItems->sum('subtotal');
            })
        ];
    });

// Get customer lifetime value
$customerValue = Order::byCustomer($email)->sum('total');
```

---

## Performance Considerations

### 1. Query Optimization

**Use Eager Loading:**
```php
// BAD - N+1 Query Problem
$products = Product::all();
foreach ($products as $product) {
    echo $product->category->name; // 1 query per product
}

// GOOD - Eager Loading
$products = Product::with('category')->all(); // 2 queries total
foreach ($products as $product) {
    echo $product->category->name;
}
```

**Use Lazy Eager Loading:**
```php
$products = Product::all();
if ($needCategories) {
    $products->load('category'); // Load relationships conditionally
}
```

### 2. Indexing Best Practices

- Composite index `(category_id, price)` on products enables efficient queries like:
  ```php
  Product::where('category_id', $id)->orderBy('price')->get();
  ```

- Composite index `(user_email, created_at)` on orders enables:
  ```php
  Order::where('user_email', $email)
      ->whereBetween('created_at', [$start, $end])
      ->get();
  ```

### 3. Pagination

Always paginate large result sets:
```php
$products = Product::inStock()->paginate(20);
$orders = Order::recent(90)->paginate(50);
```

### 4. Select Specific Columns

When you don't need all columns:
```php
$products = Product::select('id', 'name', 'price', 'stock')->get();
```

### 5. Caching Strategies

Cache frequently accessed data:
```php
// Cache categories (rarely change)
$categories = Cache::remember('categories', 3600, function() {
    return Category::withCount('products')->get();
});

// Cache best sellers (update hourly)
$bestSellers = Cache::remember('best-sellers', 3600, function() {
    return Product::withCount('orderItems')
        ->orderBy('order_items_count', 'desc')
        ->limit(10)
        ->get();
});
```

### 6. Database Connection Pooling

Ensure `.env` configuration optimizes connections:
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=ecommerce
DB_USERNAME=root
DB_PASSWORD=
```

---

## Security Considerations

### 1. Mass Assignment Protection

All models use `$fillable` properties to prevent mass assignment vulnerabilities.

### 2. SQL Injection Prevention

Always use Eloquent ORM or query builder parameter binding:
```php
// SAFE
Product::where('category_id', $request->category_id)->get();

// UNSAFE - Never use raw queries with user input
DB::select("SELECT * FROM products WHERE category_id = " . $request->category_id);
```

### 3. Password Security

User model automatically hashes passwords via `casts()`:
```php
protected function casts(): array
{
    return [
        'password' => 'hashed', // Automatic bcrypt hashing
    ];
}
```

### 4. Data Validation

Always validate data before database insertion:
```php
$validated = $request->validate([
    'name' => 'required|string|max:200',
    'price' => 'required|numeric|min:0|max:99999999.99',
    'stock' => 'required|integer|min:0',
]);

Product::create($validated);
```

---

## Backup and Maintenance

### Database Backup

```bash
# Export database
mysqldump -u root -p ecommerce > backup.sql

# Import database
mysql -u root -p ecommerce < backup.sql
```

### Optimization Commands

```bash
# Optimize tables (run periodically)
php artisan db:optimize

# Clear query cache
php artisan cache:clear
```

---

## Monitoring and Analytics

### Key Metrics to Monitor

1. **Inventory Levels:**
   ```php
   $lowStock = Product::where('stock', '<', 10)->count();
   ```

2. **Sales Performance:**
   ```php
   $todaySales = Order::whereDate('created_at', today())->sum('total');
   ```

3. **Popular Products:**
   ```php
   $popular = Product::withCount('orderItems')
       ->orderBy('order_items_count', 'desc')
       ->limit(10)
       ->get();
   ```

4. **Category Performance:**
   ```php
   $categoryStats = Category::withCount('products')
       ->with(['products' => function($query) {
           $query->withCount('orderItems');
       }])
       ->get();
   ```

---

## Integration Notes for Backend Engineer

### Transaction Management

For order creation, use database transactions:

```php
use Illuminate\Support\Facades\DB;

DB::beginTransaction();
try {
    // Create order
    $order = Order::create([
        'user_name' => $request->name,
        'user_email' => $request->email,
        'address' => $request->address,
        'total' => $total,
    ]);

    // Create order items and update stock
    foreach ($cartItems as $item) {
        OrderItem::create([
            'order_id' => $order->id,
            'product_id' => $item['product_id'],
            'quantity' => $item['quantity'],
            'price' => $item['price'],
        ]);

        // Decrease stock
        $product = Product::find($item['product_id']);
        $product->decrement('stock', $item['quantity']);
    }

    DB::commit();
    return $order;
} catch (\Exception $e) {
    DB::rollBack();
    throw $e;
}
```

### API Resource Integration

Create API resources for clean JSON responses:

```php
// app/Http/Resources/ProductResource.php
class ProductResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'price' => $this->price,
            'image' => $this->image,
            'stock' => $this->stock,
            'in_stock' => $this->isInStock(),
            'category' => new CategoryResource($this->whenLoaded('category')),
        ];
    }
}
```

---

## Testing Data

After running seeders, you can test with:

**Admin Login:**
- Email: admin@example.com
- Password: password

**Sample Product IDs:** 1-12
**Sample Category IDs:** 1-4

**Test Queries:**
```php
// Get Electronics category products
Category::where('slug', 'electronics')->first()->products;

// Check stock for Smart Watch Pro
Product::where('name', 'like', '%Smart Watch%')->first()->stock;

// Calculate total inventory value
Product::all()->sum(function($p) { return $p->price * $p->stock; });
```

---

## Database File Structure

```
meridiangroup-ecommerce/
├── app/
│   └── Models/
│       ├── User.php
│       ├── Category.php
│       ├── Product.php
│       ├── Order.php
│       └── OrderItem.php
└── database/
    ├── migrations/
    │   ├── 2024_01_01_000001_create_users_table.php
    │   ├── 2024_01_01_000002_create_categories_table.php
    │   ├── 2024_01_01_000003_create_products_table.php
    │   ├── 2024_01_01_000004_create_orders_table.php
    │   └── 2024_01_01_000005_create_order_items_table.php
    └── seeders/
        ├── DatabaseSeeder.php
        ├── UserSeeder.php
        ├── CategorySeeder.php
        └── ProductSeeder.php
```

---

## Support and Next Steps

### For Backend Engineer:

1. Review all model relationships and methods
2. Implement API controllers using provided models
3. Use transaction management for complex operations
4. Implement caching for frequently accessed data
5. Add validation rules for all database operations
6. Create API resources for consistent JSON responses

### For Frontend Engineer:

1. Use provided admin credentials for authentication testing
2. Reference product IDs 1-12 for frontend display
3. Category slugs available: electronics, clothing, books, accessories
4. All products have placeholder images from picsum.photos

---

## Database Schema Validation

All migrations include:
- Proper data types for all fields
- Foreign key constraints with appropriate cascade/restrict rules
- Indexes on frequently queried columns
- Composite indexes for common query patterns
- Default values where appropriate
- Timestamp fields for audit trails

All models include:
- Mass assignment protection via $fillable
- Proper type casting for data integrity
- Relationship methods for data access
- Helpful query scopes
- Utility methods for common operations

---

## Questions and Troubleshooting

**Q: Migration fails with foreign key error?**
A: Ensure migrations run in order. Use `php artisan migrate:fresh` to reset.

**Q: Seeder fails with unique constraint violation?**
A: Run `php artisan migrate:fresh --seed` to start with clean database.

**Q: How to add more sample data?**
A: Modify `ProductSeeder.php` and add more products to the `$products` array.

**Q: How to change admin password?**
A: Modify `UserSeeder.php` and change `Hash::make('password')` to your desired password.

---

**Database Implementation Complete**

All files are ready for immediate use in Laravel 11. The Backend Engineer can now implement controllers, routes, and business logic using these optimized database foundations.
