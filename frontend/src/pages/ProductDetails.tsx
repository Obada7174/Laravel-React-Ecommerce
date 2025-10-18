import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingCart, Minus, Plus } from 'lucide-react';
import { productsApi } from '@/services/api';
import { useCartStore } from '@/store/useCartStore';
import type { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import toast from 'react-hot-toast';

export function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    if (id) {
      loadProduct(Number(id));
    }
  }, [id]);

  const loadProduct = async (productId: number) => {
    try {
      setLoading(true);
      const data = await productsApi.getById(productId);
      setProduct(data);
    } catch (error) {
      console.error('Failed to load product:', error);
      toast.error('Failed to load product');
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (product && product.stock >= quantity) {
      addItem(product, quantity);
      toast.success(`Added ${quantity} x ${product.name} to cart`);
    } else {
      toast.error('Not enough stock available');
    }
  };

  const increaseQuantity = () => {
    if (product && quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <p className="text-muted-foreground">Product not found</p>
          <Link to="/">
            <Button className="mt-4">Back to Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={() => navigate('/')}
        className="mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Products
      </Button>

      {/* Product Details */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Product Image */}
              <div>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full rounded-lg shadow-lg"
                />
              </div>

              {/* Product Info */}
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                  {product.category && (
                    <p className="text-sm text-muted-foreground">
                      Category: {product.category.name}
                    </p>
                  )}
                </div>

                <div className="text-4xl font-bold text-primary">
                  ${product.price.toFixed(2)}
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Description</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Availability</h3>
                  <p className={product.stock > 0 ? 'text-green-600' : 'text-red-600'}>
                    {product.stock > 0
                      ? `${product.stock} units in stock`
                      : 'Out of stock'}
                  </p>
                </div>

                {product.stock > 0 && (
                  <>
                    {/* Quantity Selector */}
                    <div>
                      <h3 className="font-semibold mb-2">Quantity</h3>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={decreaseQuantity}
                          disabled={quantity <= 1}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="text-xl font-semibold w-12 text-center">
                          {quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={increaseQuantity}
                          disabled={quantity >= product.stock}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Add to Cart Button */}
                    <Button
                      size="lg"
                      className="w-full"
                      onClick={handleAddToCart}
                    >
                      <ShoppingCart className="h-5 w-5 mr-2" />
                      Add to Cart
                    </Button>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
