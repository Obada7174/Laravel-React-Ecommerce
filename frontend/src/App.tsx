import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from '@/hooks/useTheme';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ProtectedRoute } from '@/components/ProtectedRoute';

// Pages
import { Home } from '@/pages/Home';
import { Products } from '@/pages/Products';
import { ProductDetails } from '@/pages/ProductDetails';
import { Cart } from '@/pages/Cart';
import { Checkout } from '@/pages/Checkout';
import { About } from '@/pages/About';
import { Contact } from '@/pages/Contact';
import { AdminLogin } from '@/pages/Admin/Login';
import { AdminDashboard } from '@/pages/Admin/Dashboard';
import AdminProducts from '@/pages/Admin/Products';
import AdminCategories from '@/pages/Admin/Categories';
import AdminUsers from '@/pages/Admin/Users';
import AdminOrders from './pages/Admin/Orders';

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
              <Route path="/products" element={<Products />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />

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
              <Route
                path="/admin/products"
                element={
                  <ProtectedRoute>
                    <AdminProducts />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/categories"
                element={
                  <ProtectedRoute>
                    <AdminCategories />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/users"
                element={
                  <ProtectedRoute>
                    <AdminUsers />
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
            duration: 4000,
            className: 'font-medium',
            style: {
              background: 'hsl(var(--background))',
              color: 'hsl(var(--foreground))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '0.75rem',
              padding: '1rem 1.25rem',
              boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
              maxWidth: '400px',
            },
            success: {
              duration: 3500,
              style: {
                background: 'hsl(var(--background))',
                border: '1px solid rgb(132 204 22 / 0.3)',
                color: 'hsl(var(--foreground))',
              },
              iconTheme: {
                primary: 'rgb(132 204 22)',
                secondary: 'hsl(var(--background))',
              },
            },
            error: {
              duration: 4500,
              style: {
                background: 'hsl(var(--background))',
                border: '1px solid rgb(239 68 68 / 0.3)',
                color: 'hsl(var(--foreground))',
              },
              iconTheme: {
                primary: 'rgb(239 68 68)',
                secondary: 'hsl(var(--background))',
              },
            },
            loading: {
              style: {
                background: 'hsl(var(--background))',
                border: '1px solid rgb(251 191 36 / 0.3)',
                color: 'hsl(var(--foreground))',
              },
              iconTheme: {
                primary: 'rgb(251 191 36)',
                secondary: 'hsl(var(--background))',
              },
            },
          }}
        />
      </Router>
    </ThemeProvider>
  );
}

export default App;
