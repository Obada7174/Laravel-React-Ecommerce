<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $products = [
            // Electronics (category_id: 1)
            [
                'category_id' => 1,
                'name' => 'Wireless Bluetooth Headphones',
                'slug' => 'wireless-bluetooth-headphones',
                'description' => 'Premium noise-cancelling wireless headphones with 30-hour battery life and superior sound quality. Features include active noise cancellation, comfortable ear cushions, and premium audio drivers for an immersive listening experience.',
                'price' => 149.99,
                'image' => 'https://picsum.photos/400/300?random=1',
                'stock' => 50,
            ],
            [
                'category_id' => 1,
                'name' => 'Smart Watch Pro',
                'slug' => 'smart-watch-pro',
                'description' => 'Advanced fitness tracking smartwatch with heart rate monitor, GPS, and smartphone notifications. Water-resistant design with customizable watch faces and week-long battery life. Perfect for fitness enthusiasts and busy professionals.',
                'price' => 299.99,
                'image' => 'https://picsum.photos/400/300?random=2',
                'stock' => 35,
            ],
            [
                'category_id' => 1,
                'name' => 'Portable Wireless Speaker',
                'slug' => 'portable-wireless-speaker',
                'description' => '360-degree sound portable Bluetooth speaker with waterproof design and 12-hour playtime. Features deep bass, crisp highs, and built-in microphone for hands-free calls. Perfect for outdoor adventures and parties.',
                'price' => 79.99,
                'image' => 'https://picsum.photos/400/300?random=3',
                'stock' => 75,
            ],
            // Clothing (category_id: 2)
            [
                'category_id' => 2,
                'name' => 'Classic Denim Jacket',
                'slug' => 'classic-denim-jacket',
                'description' => 'Timeless denim jacket with a comfortable fit and durable construction. Made from premium cotton denim with brass buttons and reinforced stitching. Available in multiple washes and sizes for men and women.',
                'price' => 89.99,
                'image' => 'https://picsum.photos/400/300?random=4',
                'stock' => 60,
            ],
            [
                'category_id' => 2,
                'name' => 'Premium Cotton T-Shirt',
                'slug' => 'premium-cotton-tshirt',
                'description' => 'Soft, breathable 100% organic cotton t-shirt with a modern fit. Pre-shrunk fabric ensures lasting quality and comfort. Available in a variety of colors and sizes. Perfect for everyday wear or layering.',
                'price' => 29.99,
                'image' => 'https://picsum.photos/400/300?random=5',
                'stock' => 100,
            ],
            [
                'category_id' => 2,
                'name' => 'Athletic Running Shoes',
                'slug' => 'athletic-running-shoes',
                'description' => 'High-performance running shoes with advanced cushioning and breathable mesh upper. Features responsive foam midsole and durable rubber outsole for superior traction. Designed for runners seeking comfort and speed.',
                'price' => 129.99,
                'image' => 'https://picsum.photos/400/300?random=6',
                'stock' => 45,
            ],
            // Books (category_id: 3)
            [
                'category_id' => 3,
                'name' => 'The Art of Programming',
                'slug' => 'the-art-of-programming',
                'description' => 'Comprehensive guide to modern software development practices and design patterns. Written by industry experts with real-world examples and practical exercises. Essential reading for developers at all levels.',
                'price' => 49.99,
                'image' => 'https://picsum.photos/400/300?random=7',
                'stock' => 40,
            ],
            [
                'category_id' => 3,
                'name' => 'Mindful Living: A Practical Guide',
                'slug' => 'mindful-living-practical-guide',
                'description' => 'Transform your daily life with practical mindfulness techniques and meditation practices. Includes guided exercises, scientific insights, and inspiring stories from practitioners worldwide. Start your journey to inner peace today.',
                'price' => 24.99,
                'image' => 'https://picsum.photos/400/300?random=8',
                'stock' => 65,
            ],
            [
                'category_id' => 3,
                'name' => 'World History: Complete Edition',
                'slug' => 'world-history-complete-edition',
                'description' => 'Comprehensive overview of human civilization from ancient times to the present day. Features detailed maps, timelines, and engaging narratives. Beautifully illustrated with photographs and artwork from major museums.',
                'price' => 59.99,
                'image' => 'https://picsum.photos/400/300?random=9',
                'stock' => 30,
            ],
            // Accessories (category_id: 4)
            [
                'category_id' => 4,
                'name' => 'Leather Wallet with RFID Protection',
                'slug' => 'leather-wallet-rfid-protection',
                'description' => 'Genuine leather bifold wallet with built-in RFID blocking technology to protect your cards from electronic theft. Features multiple card slots, bill compartment, and ID window. Compact design that fits comfortably in any pocket.',
                'price' => 39.99,
                'image' => 'https://picsum.photos/400/300?random=10',
                'stock' => 80,
            ],
            [
                'category_id' => 4,
                'name' => 'Designer Sunglasses',
                'slug' => 'designer-sunglasses',
                'description' => 'Stylish UV400 polarized sunglasses with lightweight metal frame and premium lenses. Provides 100% UV protection while reducing glare. Comes with protective case and cleaning cloth. Perfect for driving and outdoor activities.',
                'price' => 119.99,
                'image' => 'https://picsum.photos/400/300?random=11',
                'stock' => 55,
            ],
            [
                'category_id' => 4,
                'name' => 'Stainless Steel Water Bottle',
                'slug' => 'stainless-steel-water-bottle',
                'description' => 'Insulated stainless steel water bottle keeps drinks cold for 24 hours or hot for 12 hours. Leak-proof lid with easy-carry handle. BPA-free and dishwasher safe. Available in multiple colors and sizes.',
                'price' => 34.99,
                'image' => 'https://picsum.photos/400/300?random=12',
                'stock' => 90,
            ],
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}
