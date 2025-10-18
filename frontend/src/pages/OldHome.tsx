import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, ShoppingCart } from 'lucide-react';
import { productsApi, categoriesApi } from '@/services/api';
import { useCartStore } from '@/store/useCartStore';
import type { Product, Category } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import toast from 'react-hot-toast';

export function OldHome() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>();
  const [minPrice, setMinPrice] = useState<number | undefined>();
  const [maxPrice, setMaxPrice] = useState<number | undefined>();

  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    loadCategories();
    loadProducts();
  }, []);

  useEffect(() => {
    loadProducts();
  }, [selectedCategory, minPrice, maxPrice]);

  const loadCategories = async () => {
    try {
      const data = await categoriesApi.getAll();
      setCategories(data);
    } catch (error) {
      console.error('Failed to load categories:', error);
      toast.error('Failed to load categories');
    }
  };

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await productsApi.getAll({
        category: selectedCategory,
        search: search || undefined,
        min_price: minPrice,
        max_price: maxPrice,
      });
      setProducts(data);
    } catch (error) {
      console.error('Failed to load products:', error);
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    loadProducts();
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
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Our Products</h1>
        <p className="text-muted-foreground">Browse our collection of quality products</p>
      </div>

      {/* Filters */}
      <div className="mb-8 space-y-4">
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button type="submit">Search</Button>
        </form>

        {/* Category and Price Filters */}
        <div className="flex flex-wrap gap-4">
          {/* Categories */}
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={selectedCategory === undefined ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(undefined)}
            >
              All Categories
            </Button>
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </Button>
            ))}
          </div>

          {/* Price Range */}
          <div className="flex gap-2 items-center">
            <Input
              type="number"
              placeholder="Min Price"
              value={minPrice || ''}
              onChange={(e) => setMinPrice(e.target.value ? Number(e.target.value) : undefined)}
              className="w-32"
            />
            <span className="text-muted-foreground">-</span>
            <Input
              type="number"
              placeholder="Max Price"
              value={maxPrice || ''}
              onChange={(e) => setMaxPrice(e.target.value ? Number(e.target.value) : undefined)}
              className="w-32"
            />
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No products found</p>
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow">
                <CardHeader className="p-0">
                  <Link to={`/product/${product.id}`}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </Link>
                </CardHeader>
                <CardContent className="flex-1 p-4">
                  <Link to={`/product/${product.id}`}>
                    <h3 className="font-semibold text-lg mb-2 hover:text-primary transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">${product.price.toFixed(2)}</span>
                    <span className="text-sm text-muted-foreground">
                      {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                    </span>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex gap-2">
                  <Button
                    className="flex-1"
                    onClick={() => handleAddToCart(product)}
                    disabled={product.stock === 0}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                  <Link to={`/product/${product.id}`} className="flex-1">
                    <Button variant="outline" className="w-full">
                      View Details
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
