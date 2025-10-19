import { useState, useEffect } from 'react';
import { Search, Eye } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Modal } from '../../components/ui/modal';
import { Table } from '../../components/ui/table';
import { AdminNav } from '../../components/layout/AdminNav';
import { adminOrdersApi } from '../../services/api';
import type { Order, PaginatedResponse } from '../../types';
import toast from 'react-hot-toast';

export default function AdminOrders() {
  const [orders, setOrders] = useState<PaginatedResponse<Order> | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState('created_at');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Modal states
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await adminOrdersApi.getAll({
        search: searchTerm || undefined,
        sort: sortField,
        order: sortOrder,
        page: currentPage,
        per_page: 15,
      });
      setOrders(data);
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [searchTerm, currentPage, sortField, sortOrder]);

  const handleSort = (key: string) => {
    if (sortField === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(key);
      setSortOrder('asc');
    }
  };

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsDetailsModalOpen(true);
  };

  const columns = [
    {
      key: 'id',
      header: 'Order #',
      sortable: false,
      render: (order: Order) => <span className="font-semibold">#{order.id}</span>,
    },
    {
      key: 'user_name',
      header: 'Customer',
      sortable: true,
      render: (order: Order) => (
        <div>
          <div className="font-medium">{order.user_name}</div>
          <div className="text-sm text-muted-foreground">{order.user_email}</div>
        </div>
      ),
    },
    {
      key: 'total',
      header: 'Total',
      sortable: true,
      render: (order: Order) => (
        <span className="font-semibold">${order.total.toFixed(2)}</span>
      ),
    },
    {
      key: 'items',
      header: 'Items',
      render: (order: Order) => (
        <span className="text-muted-foreground">
          {order.order_items?.length || 0} item(s)
        </span>
      ),
    },
    {
      key: 'created_at',
      header: 'Date',
      sortable: true,
      render: (order: Order) => (
        <div>
          <div>{new Date(order.created_at).toLocaleDateString()}</div>
          <div className="text-sm text-muted-foreground">
            {new Date(order.created_at).toLocaleTimeString()}
          </div>
        </div>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (order: Order) => (
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleViewDetails(order)}
        >
          <Eye className="h-4 w-4 mr-2" />
          View
        </Button>
      ),
    },
  ];

  return (
    <>
      <AdminNav />
      <div className="min-h-screen bg-background p-8">
        <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-foreground">Orders</h1>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by customer name or email..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-10"
            />
          </div>
        </div>

        <Table
          data={orders?.data || []}
          columns={columns}
          pagination={orders ? {
            current_page: orders.current_page,
            last_page: orders.last_page,
            per_page: orders.per_page,
            total: orders.total,
            from: orders.from,
            to: orders.to,
          } : undefined}
          onPageChange={setCurrentPage}
          onSort={handleSort}
          sortField={sortField}
          sortOrder={sortOrder}
          loading={loading}
        />

        {/* Order Details Modal */}
        <Modal
          isOpen={isDetailsModalOpen}
          onClose={() => setIsDetailsModalOpen(false)}
          title={`Order #${selectedOrder?.id}`}
          size="lg"
        >
          {selectedOrder && (
            <div className="space-y-6">
              {/* Customer Information */}
              <div>
                <h3 className="font-semibold text-lg mb-2">Customer Information</h3>
                <div className="space-y-1 text-sm">
                  <p>
                    <span className="font-medium">Name:</span> {selectedOrder.user_name}
                  </p>
                  <p>
                    <span className="font-medium">Email:</span> {selectedOrder.user_email}
                  </p>
                  <p>
                    <span className="font-medium">Date:</span>{' '}
                    {new Date(selectedOrder.created_at).toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Shipping Address */}
              <div>
                <h3 className="font-semibold text-lg mb-2">Shipping Address</h3>
                <p className="text-sm whitespace-pre-line text-muted-foreground">
                  {selectedOrder.address}
                </p>
              </div>

              {/* Order Items */}
              <div>
                <h3 className="font-semibold text-lg mb-2">Order Items</h3>
                <div className="space-y-2">
                  {selectedOrder.order_items && selectedOrder.order_items.length > 0 ? (
                    selectedOrder.order_items.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between items-center p-3 bg-muted/50 rounded-lg"
                      >
                        <div className="flex-1">
                          <p className="font-medium">
                            {item.product?.name || `Product ID: ${item.product_id}`}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {item.quantity} × ${item.price.toFixed(2)}
                          </p>
                        </div>
                        <div className="font-semibold">
                          ${(item.quantity * item.price).toFixed(2)}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">No items found</p>
                  )}
                </div>
              </div>

              {/* Total */}
              <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-xl">Total</span>
                  <span className="font-bold text-xl">
                    ${selectedOrder.total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          )}
        </Modal>
        </div>
      </div>
    </>
  );
}
