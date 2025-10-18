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
  Grid3x3
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
      <section className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25" />

        <div className="container relative mx-auto px-4 py-20 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-4xl text-center"
          >
            <Badge className="mb-4 bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20">
              <Sparkles className="mr-1 h-3 w-3" />
              New Collection
            </Badge>

            <h1 className="mb-6 text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-100 dark:to-white bg-clip-text text-transparent">
              Discover Your Perfect Style
            </h1>

            <p className="mb-8 text-lg text-muted-foreground md:text-xl max-w-2xl mx-auto">
              Explore our curated collection of premium products, handpicked just for you. Quality meets affordability.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/products">
                <Button size="lg" className="group">
                  Shop Now
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>

              <Link to="/products">
                <Button size="lg" variant="outline">
                  Browse Categories
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
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

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-amber-500 to-emerald-500 dark:from-amber-600 dark:to-emerald-600">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to Start Shopping?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of happy customers and discover amazing products at unbeatable prices.
            </p>
            <Link to="/products">
              <Button size="lg" variant="secondary" className="shadow-xl">
                <ShoppingBag className="mr-2 h-5 w-5" />
                Start Shopping Now
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
