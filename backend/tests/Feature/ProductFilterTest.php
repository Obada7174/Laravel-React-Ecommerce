<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProductFilterTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        // Create test categories
        $electronics = Category::create([
            'name' => 'Electronics',
            'slug' => 'electronics',
            'description' => 'Electronic devices'
        ]);

        $clothing = Category::create([
            'name' => 'Clothing',
            'slug' => 'clothing',
            'description' => 'Apparel and accessories'
        ]);

        // Create test products
        Product::create([
            'category_id' => $electronics->id,
            'name' => 'Laptop Computer',
            'slug' => 'laptop-computer',
            'description' => 'High-performance laptop for professionals',
            'price' => 999.99,
            'image' => 'https://example.com/laptop.jpg',
            'stock' => 10
        ]);

        Product::create([
            'category_id' => $electronics->id,
            'name' => 'Smartphone',
            'slug' => 'smartphone',
            'description' => 'Latest model smartphone with great camera',
            'price' => 699.99,
            'image' => 'https://example.com/phone.jpg',
            'stock' => 25
        ]);

        Product::create([
            'category_id' => $clothing->id,
            'name' => 'T-Shirt',
            'slug' => 't-shirt',
            'description' => 'Comfortable cotton t-shirt',
            'price' => 19.99,
            'image' => 'https://example.com/tshirt.jpg',
            'stock' => 100
        ]);

        Product::create([
            'category_id' => $electronics->id,
            'name' => 'Wireless Headphones',
            'slug' => 'wireless-headphones',
            'description' => 'Noise-cancelling wireless headphones',
            'price' => 199.99,
            'image' => 'https://example.com/headphones.jpg',
            'stock' => 15
        ]);
    }

    /** @test */
    public function it_can_search_products_by_name()
    {
        $response = $this->getJson('/api/products?search=laptop');

        $response->assertStatus(200);
        $response->assertJsonCount(1, 'data');
        $response->assertJsonFragment(['name' => 'Laptop Computer']);
    }

    /** @test */
    public function it_can_search_products_by_description()
    {
        $response = $this->getJson('/api/products?search=camera');

        $response->assertStatus(200);
        $response->assertJsonCount(1, 'data');
        $response->assertJsonFragment(['name' => 'Smartphone']);
    }

    /** @test */
    public function it_can_filter_by_category_id()
    {
        $electronics = Category::where('slug', 'electronics')->first();
        $response = $this->getJson('/api/products?category=' . $electronics->id);

        $response->assertStatus(200);
        $response->assertJsonCount(3, 'data'); // 3 electronics products
    }

    /** @test */
    public function it_can_filter_by_category_slug()
    {
        $response = $this->getJson('/api/products?category=clothing');

        $response->assertStatus(200);
        $response->assertJsonCount(1, 'data');
        $response->assertJsonFragment(['name' => 'T-Shirt']);
    }

    /** @test */
    public function it_can_filter_by_minimum_price()
    {
        $response = $this->getJson('/api/products?min_price=200');

        $response->assertStatus(200);
        $response->assertJsonCount(2, 'data'); // Laptop and Smartphone
    }

    /** @test */
    public function it_can_filter_by_maximum_price()
    {
        $response = $this->getJson('/api/products?max_price=200');

        $response->assertStatus(200);
        $response->assertJsonCount(2, 'data'); // T-Shirt and Headphones
    }

    /** @test */
    public function it_can_filter_by_price_range()
    {
        $response = $this->getJson('/api/products?min_price=100&max_price=300');

        $response->assertStatus(200);
        $response->assertJsonCount(1, 'data'); // Only Headphones
        $response->assertJsonFragment(['name' => 'Wireless Headphones']);
    }

    /** @test */
    public function it_can_combine_search_and_filters()
    {
        $electronics = Category::where('slug', 'electronics')->first();
        $response = $this->getJson('/api/products?search=wireless&category=' . $electronics->id . '&min_price=100');

        $response->assertStatus(200);
        $response->assertJsonCount(1, 'data');
        $response->assertJsonFragment(['name' => 'Wireless Headphones']);
    }

    /** @test */
    public function it_returns_all_products_when_no_filters_applied()
    {
        $response = $this->getJson('/api/products');

        $response->assertStatus(200);
        $response->assertJsonCount(4, 'data'); // All 4 products
    }

    /** @test */
    public function it_returns_empty_array_when_no_products_match()
    {
        $response = $this->getJson('/api/products?search=nonexistent');

        $response->assertStatus(200);
        $response->assertJsonCount(0, 'data');
    }

    /** @test */
    public function it_supports_backward_compatible_parameter_names()
    {
        // Test with old camelCase parameters
        $response = $this->getJson('/api/products?minPrice=100&maxPrice=300&q=headphones');

        $response->assertStatus(200);
        $response->assertJsonCount(1, 'data');
        $response->assertJsonFragment(['name' => 'Wireless Headphones']);
    }
}
