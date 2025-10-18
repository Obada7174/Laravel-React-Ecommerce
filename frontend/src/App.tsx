import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from '@/hooks/useTheme';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ProtectedRoute } from '@/components/ProtectedRoute';

// Pages
import { Home } from '@/pages/Home';
import { ProductDetails } from '@/pages/ProductDetails';
import { Cart } from '@/pages/Cart';
import { Checkout } from '@/pages/Checkout';
import { AdminLogin } from '@/pages/Admin/Login';
import { AdminDashboard } from '@/pages/Admin/Dashboard';
import { AdminOrders } from '@/pages/Admin/Orders';

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="meridian-theme">
      <Router>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />

              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/orders"
                element={
                  <ProtectedRoute>
                    <AdminOrders />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>

        {/* Toast Notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: 'hsl(var(--background))',
              color: 'hsl(var(--foreground))',
              border: '1px solid hsl(var(--border))',
            },
            success: {
              iconTheme: {
                primary: 'hsl(var(--primary))',
                secondary: 'hsl(var(--primary-foreground))',
              },
            },
          }}
        />
      </Router>
    </ThemeProvider>
  );
}

export default App;
