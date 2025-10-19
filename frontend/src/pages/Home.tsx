import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ShoppingBag,
  TrendingUp,
  Star,
  ArrowRight,
  Sparkles,
  Tag,
  Grid3x3,
  Truck,
  Shield,
  CreditCard,
  HeadphonesIcon,
  Quote
} from 'lucide-react';
import { productsApi, categoriesApi } from '@/services/api';
import { useCartStore } from '@/store/useCartStore';
import type { Product, Category } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import toast from 'react-hot-toast';

export function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [productsData, categoriesData] = await Promise.all([
        productsApi.getAll(),
        categoriesApi.getAll()
      ]);

      setProducts(productsData);
      setCategories(categoriesData);

      // Get random featured products
      const shuffled = [...productsData].sort(() => 0.5 - Math.random());
      setFeaturedProducts(shuffled.slice(0, 3));
    } catch (error) {
      console.error('Failed to load data:', error);
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product: Product) => {
    if (product.stock > 0) {
      addItem(product);
      toast.success(`Added ${product.name} to cart`);
    } else {
      toast.error('Product out of stock');
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 min-h-[90vh] flex items-center">
        {/* Animated Grid Background */}
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25" />

        {/* Animated Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-emerald-500/5 to-amber-500/5 animate-gradient" />

        <div className="container relative mx-auto px-4 py-20 md:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center lg:text-left"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <Badge className="mb-6 bg-gradient-to-r from-amber-500/20 to-emerald-500/20 text-amber-700 dark:text-amber-400 border-amber-500/30 backdrop-blur-sm px-4 py-2">
                  <Sparkles className="mr-2 h-4 w-4 animate-pulse" />
                  New Collection 2025
                </Badge>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="mb-6 text-5xl font-black tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
              >
                <span className="block bg-gradient-to-r from-gray-900 via-amber-800 to-gray-900 dark:from-white dark:via-amber-200 dark:to-white bg-clip-text text-transparent leading-tight">
                  Discover Your
                </span>
                <span className="block mt-2 bg-gradient-to-r from-amber-600 via-emerald-600 to-amber-600 dark:from-amber-400 dark:via-emerald-400 dark:to-amber-400 bg-clip-text text-transparent animate-gradient">
                  Perfect Style
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="mb-8 text-lg text-muted-foreground md:text-xl max-w-2xl mx-auto lg:mx-0 leading-relaxed"
              >
                Explore our curated collection of premium products, handpicked just for you.
                <span className="block mt-2 font-semibold text-foreground">Quality meets affordability.</span>
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8"
              >
                <Link to="/products">
                  <Button size="lg" className="group bg-gradient-to-r from-amber-600 to-emerald-600 hover:from-amber-700 hover:to-emerald-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 px-8 py-6 text-lg">
                    <ShoppingBag className="mr-2 h-5 w-5" />
                    Shop Now
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-2" />
                  </Button>
                </Link>

                <Link to="/products">
                  <Button size="lg" variant="outline" className="border-2 hover:bg-accent px-8 py-6 text-lg backdrop-blur-sm">
                    Browse Categories
                  </Button>
                </Link>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-muted-foreground"
              >
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-emerald-400 border-2 border-background flex items-center justify-center text-white text-xs font-bold">
                        {String.fromCharCode(64 + i)}
                      </div>
                    ))}
                  </div>
                  <span className="font-medium">50K+ Happy Customers</span>
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="ml-1 font-medium">4.9/5 Rating</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column - Visual Elements */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
              className="relative hidden lg:flex items-center justify-center"
            >
              {/* Central Gradient Orb */}
              <div className="relative w-[500px] h-[500px]">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-400 via-emerald-400 to-amber-500 rounded-full blur-3xl opacity-30 animate-pulse" />

                {/* Floating Product Cards */}
                <motion.div
                  animate={{
                    y: [0, -20, 0],
                    rotate: [0, 5, 0]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-white to-amber-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-2xl border border-border/50 backdrop-blur-sm p-4"
                >
                  <div className="w-full h-24 bg-gradient-to-br from-amber-200 to-emerald-200 rounded-xl mb-2" />
                  <div className="h-2 bg-muted rounded w-3/4 mb-1" />
                  <div className="h-2 bg-muted rounded w-1/2" />
                </motion.div>

                <motion.div
                  animate={{
                    y: [0, 20, 0],
                    rotate: [0, -5, 0]
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5
                  }}
                  className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-br from-white to-emerald-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-2xl border border-border/50 backdrop-blur-sm p-4"
                >
                  <div className="w-full h-24 bg-gradient-to-br from-emerald-200 to-amber-200 rounded-xl mb-2" />
                  <div className="h-2 bg-muted rounded w-3/4 mb-1" />
                  <div className="h-2 bg-muted rounded w-1/2" />
                </motion.div>

                <motion.div
                  animate={{
                    y: [0, -15, 0],
                    x: [0, 10, 0]
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-to-br from-white to-white dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-2xl border border-border/50 backdrop-blur-sm p-4"
                >
                  <div className="w-full h-32 bg-gradient-to-br from-amber-300 via-emerald-300 to-amber-300 rounded-xl mb-2" />
                  <div className="h-2 bg-muted rounded w-3/4 mb-1" />
                  <div className="h-2 bg-muted rounded w-2/3" />
                </motion.div>

                {/* Decorative Icons */}
                <motion.div
                  animate={{
                    rotate: 360,
                    scale: [1, 1.2, 1]
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="absolute top-10 left-10 w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center backdrop-blur-sm"
                >
                  <Sparkles className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                </motion.div>

                <motion.div
                  animate={{
                    rotate: -360,
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="absolute bottom-10 right-10 w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center backdrop-blur-sm"
                >
                  <ShoppingBag className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Enhanced Decorative Blobs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-amber-300/30 dark:bg-amber-500/20 rounded-full mix-blend-multiply dark:mix-blend-overlay filter blur-3xl opacity-70 animate-blob" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-emerald-300/30 dark:bg-emerald-500/20 rounded-full mix-blend-multiply dark:mix-blend-overlay filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-20 left-1/2 w-96 h-96 bg-amber-300/30 dark:bg-amber-500/20 rounded-full mix-blend-multiply dark:mix-blend-overlay filter blur-3xl opacity-70 animate-blob animation-delay-4000" />
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-slate-50 to-white dark:from-gray-900 dark:to-gray-800/50">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Badge className="mb-4 bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400 border-amber-200 dark:border-amber-500/20">
                Why Choose Us
              </Badge>
              <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                Built for Your Convenience
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Experience shopping the way it should be - simple, secure, and satisfying
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Truck,
                title: 'Free Shipping',
                description: 'Free delivery on orders over $50',
                iconBg: 'bg-amber-100 dark:bg-amber-500/20',
                iconColor: 'text-amber-600 dark:text-amber-400'
              },
              {
                icon: Shield,
                title: 'Secure Payment',
                description: '100% secure transactions',
                iconBg: 'bg-emerald-100 dark:bg-emerald-500/20',
                iconColor: 'text-emerald-600 dark:text-emerald-400'
              },
              {
                icon: CreditCard,
                title: 'Easy Returns',
                description: '30-day money back guarantee',
                iconBg: 'bg-blue-100 dark:bg-blue-500/20',
                iconColor: 'text-blue-600 dark:text-blue-400'
              },
              {
                icon: HeadphonesIcon,
                title: '24/7 Support',
                description: 'Dedicated customer service',
                iconBg: 'bg-purple-100 dark:bg-purple-500/20',
                iconColor: 'text-purple-600 dark:text-purple-400'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="relative overflow-hidden h-full hover:shadow-lg transition-all duration-300 group border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                  <CardContent className="p-6 text-center relative z-10">
                    <div className="mb-4 flex justify-center">
                      <div className={`p-4 rounded-xl ${feature.iconBg} group-hover:scale-110 transition-transform duration-300`}>
                        <feature.icon className={`h-7 w-7 ${feature.iconColor}`} />
                      </div>
                    </div>
                    <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">{feature.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{feature.description}</p>
                  </CardContent>
                  {/* Decorative gradient - animates from center outward */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-1 w-0 bg-gradient-to-r from-amber-500 via-emerald-500 to-amber-500 group-hover:w-full transition-all duration-700 ease-out" />
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold mb-3">Shop by Category</h2>
            <p className="text-muted-foreground">Find exactly what you're looking for</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Link to={`/products?category=${category.id}`}>
                  <Card className="group hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer border-2 hover:border-primary/50">
                    <CardContent className="p-6 text-center">
                      <div className="mb-4 flex justify-center">
                        <div className="p-4 rounded-full bg-gradient-to-br from-amber-100 to-emerald-100 dark:from-amber-900/20 dark:to-emerald-900/20 group-hover:scale-110 transition-transform">
                          <Grid3x3 className="h-8 w-8 text-amber-600 dark:text-amber-400" />
                        </div>
                      </div>
                      <h3 className="font-semibold text-lg mb-1">{category.name}</h3>
                      <p className="text-sm text-muted-foreground">Explore Collection</p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="mb-12 flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold mb-2 flex items-center gap-2">
                  <TrendingUp className="h-7 w-7 text-amber-600" />
                  Featured Products
                </h2>
                <p className="text-muted-foreground">Handpicked favorites</p>
              </div>
              <Link to="/products">
                <Button variant="ghost">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {featuredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                >
                  <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-300">
                    <div className="relative overflow-hidden">
                      <Link to={`/product/${product.id}`}>
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </Link>
                      {product.stock < 10 && product.stock > 0 && (
                        <Badge className="absolute top-3 right-3 bg-amber-500">
                          <Tag className="h-3 w-3 mr-1" />
                          Low Stock
                        </Badge>
                      )}
                    </div>

                    <CardContent className="p-6">
                      <Link to={`/product/${product.id}`}>
                        <h3 className="font-semibold text-xl mb-2 hover:text-primary transition-colors line-clamp-2">
                          {product.name}
                        </h3>
                      </Link>

                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {product.description}
                      </p>

                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <span className="text-3xl font-bold text-primary">
                            ${product.price.toFixed(2)}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-amber-500">
                          <Star className="h-4 w-4 fill-current" />
                          <Star className="h-4 w-4 fill-current" />
                          <Star className="h-4 w-4 fill-current" />
                          <Star className="h-4 w-4 fill-current" />
                          <Star className="h-4 w-4" />
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          className="flex-1"
                          onClick={() => handleAddToCart(product)}
                          disabled={product.stock === 0}
                        >
                          <ShoppingBag className="h-4 w-4 mr-2" />
                          Add to Cart
                        </Button>
                        <Link to={`/product/${product.id}`} className="flex-1">
                          <Button variant="outline" className="w-full">
                            Details
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Products Preview */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold mb-3">All Products</h2>
            <p className="text-muted-foreground">Discover our complete collection</p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent" />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.slice(0, 8).map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                    <Card className="group h-full flex flex-col hover:shadow-lg transition-all duration-300">
                      <div className="relative overflow-hidden">
                        <Link to={`/product/${product.id}`}>
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </Link>
                      </div>

                      <CardContent className="flex-1 p-4 flex flex-col">
                        <Link to={`/product/${product.id}`}>
                          <h3 className="font-semibold mb-2 hover:text-primary transition-colors line-clamp-2">
                            {product.name}
                          </h3>
                        </Link>

                        <div className="mt-auto">
                          <p className="text-2xl font-bold mb-3">${product.price.toFixed(2)}</p>

                          <Button
                            size="sm"
                            className="w-full"
                            onClick={() => handleAddToCart(product)}
                            disabled={product.stock === 0}
                          >
                            <ShoppingBag className="h-4 w-4 mr-2" />
                            {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <div className="mt-12 text-center">
                <Link to="/products">
                  <Button size="lg">
                    View All Products
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Badge className="mb-4 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20">
                Testimonials
              </Badge>
              <h2 className="text-4xl font-bold mb-4">What Our Customers Say</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Don't just take our word for it - hear from our satisfied customers
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah Johnson',
                role: 'Verified Buyer',
                content: 'Amazing quality products and fast shipping! The customer service team was incredibly helpful when I had questions. Will definitely shop here again.',
                rating: 5
              },
              {
                name: 'Michael Chen',
                role: 'Regular Customer',
                content: 'Best online shopping experience I\'ve had. The website is easy to navigate, prices are competitive, and my orders always arrive on time.',
                rating: 5
              },
              {
                name: 'Emily Rodriguez',
                role: 'Happy Shopper',
                content: 'I love the variety of products available! Found exactly what I was looking for at a great price. The checkout process was smooth and secure.',
                rating: 5
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
                  <CardContent className="p-8">
                    <div className="mb-6">
                      <Quote className="h-10 w-10 text-amber-500/30 dark:text-amber-400/30" />
                    </div>

                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>

                    <p className="text-muted-foreground mb-6 italic leading-relaxed">
                      "{testimonial.content}"
                    </p>

                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-emerald-400 flex items-center justify-center text-white font-bold text-lg">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>

                  {/* Decorative gradient - animates from center outward */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-1 w-0 bg-gradient-to-r from-amber-500 via-emerald-500 to-amber-500 group-hover:w-full transition-all duration-700 ease-out" />
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-amber-500 to-emerald-500 dark:from-amber-600 dark:to-emerald-600 relative overflow-hidden">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-blob" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-blob animation-delay-2000" />
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Ready to Start Shopping?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of happy customers and discover amazing products at unbeatable prices.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/products">
                <Button size="lg" variant="secondary" className="shadow-xl hover:shadow-2xl transition-shadow group">
                  <ShoppingBag className="mr-2 h-5 w-5 group-hover:animate-bounce" />
                  Start Shopping Now
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white/20 backdrop-blur-sm">
                  Learn More About Us
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
