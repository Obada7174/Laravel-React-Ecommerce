import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react';
import { adminOrdersApi } from '@/services/api';
import type { Order } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import toast from 'react-hot-toast';

export function AdminOrders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrders, setExpandedOrders] = useState<Set<number>>(new Set());

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const data = await adminOrdersApi.getAll();
      setOrders(data);
    } catch (error) {
      console.error('Failed to load orders:', error);
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const toggleOrder = (orderId: number) => {
    const newExpanded = new Set(expandedOrders);
    if (newExpanded.has(orderId)) {
      newExpanded.delete(orderId);
    } else {
      newExpanded.add(orderId);
    }
    setExpandedOrders(newExpanded);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Button
        variant="ghost"
        onClick={() => navigate('/admin/dashboard')}
        className="mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Dashboard
      </Button>

      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Orders</h1>
        <p className="text-muted-foreground">View and manage customer orders</p>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent" />
        </div>
      ) : orders.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            No orders yet.
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {orders.map((order, index) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Card>
                <CardContent className="p-4">
                  <div
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => toggleOrder(order.id)}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-4">
                        <div>
                          <span className="font-semibold">Order #{order.id}</span>
                          <p className="text-sm text-muted-foreground">
                            {formatDate(order.created_at)}
                          </p>
                        </div>
                        <div>
                          <p className="font-medium">{order.user_name}</p>
                          <p className="text-sm text-muted-foreground">{order.user_email}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-bold text-lg">${order.total.toFixed(2)}</p>
                        <p className="text-sm text-muted-foreground">
                          {order.order_items?.length || 0} item(s)
                        </p>
                      </div>
                      {expandedOrders.has(order.id) ? (
                        <ChevronUp className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                  </div>

                  {expandedOrders.has(order.id) && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="mt-4 pt-4 border-t"
                    >
                      <div className="space-y-4">
                        {/* Shipping Address */}
                        <div>
                          <h4 className="font-semibold mb-2">Shipping Address</h4>
                          <p className="text-sm text-muted-foreground whitespace-pre-line">
                            {order.address}
                          </p>
                        </div>

                        {/* Order Items */}
                        <div>
                          <h4 className="font-semibold mb-2">Order Items</h4>
                          {order.order_items && order.order_items.length > 0 ? (
                            <div className="space-y-2">
                              {order.order_items.map((item) => (
                                <div
                                  key={item.id}
                                  className="flex justify-between items-center text-sm bg-muted/50 p-3 rounded-lg"
                                >
                                  <div className="flex-1">
                                    <p className="font-medium">
                                      {item.product?.name || `Product ID: ${item.product_id}`}
                                    </p>
                                    <p className="text-muted-foreground">
                                      Quantity: {item.quantity} × ${item.price.toFixed(2)}
                                    </p>
                                  </div>
                                  <div className="font-semibold">
                                    ${(item.quantity * item.price).toFixed(2)}
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-sm text-muted-foreground">No items found</p>
                          )}
                        </div>

                        {/* Total */}
                        <div className="border-t pt-3">
                          <div className="flex justify-between items-center">
                            <span className="font-bold text-lg">Total</span>
                            <span className="font-bold text-lg">${order.total.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
