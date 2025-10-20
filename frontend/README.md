# Meridian E-commerce Frontend

A modern, responsive React frontend for the Meridian E-commerce platform, built with Vite, TypeScript, and TailwindCSS.

## Features

- 🛍️ **Product Browsing**: Browse products with category filters, search, and price range filtering
- 🛒 **Shopping Cart**: Add products to cart, update quantities, and manage items
- 💳 **Checkout**: Complete purchase with shipping information form
- 👤 **Admin Dashboard**: Manage products (CRUD operations) and view orders
- 🌓 **Dark/Light Mode**: Toggle between themes with persistent preference
- 📱 **Responsive Design**: Fully responsive across all devices
- ✨ **Smooth Animations**: Framer Motion powered transitions and animations
- 🎨 **Modern UI**: Clean, minimalist design with ShadCN UI components

## Tech Stack

- **Framework**: React 18 + Vite + TypeScript
- **Styling**: TailwindCSS 4.0
- **UI Components**: ShadCN UI (custom components)
- **State Management**: Zustand (with localStorage persistence)
- **Routing**: React Router v6
- **API Client**: Axios
- **Animations**: Framer Motion
- **Notifications**: React Hot Toast
- **Icons**: Lucide React

## Prerequisites

Before running the frontend, ensure you have:

- **Node.js**: v18 or higher
- **npm**: v9 or higher
- **Laravel Backend**: Running and accessible

## Installation

1. **Navigate to the frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:

   Copy the example environment file and configure it:

   ```bash
   cp .env.example .env
   ```

   Update the `.env` file with your backend API URL:

   ```env
   VITE_API_BASE_URL=https://ecommerceback.obada-almaghribi.com
   ```

   For local development, use:

   ```env
   VITE_API_BASE_URL=http://localhost:8000
   ```

   **Note**: The `/api` suffix is automatically appended. Do not include it in the `VITE_API_BASE_URL`.

## Running the Application

### Development Mode

Start the development server:

```bash
npm run dev
```

The application will be available at: **http://localhost:5173**

### Build for Production

Create an optimized production build:

```bash
npm run build
```

The build output will be in the `dist/` directory.

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

## Project Structure

```
frontend/
├── src/
│   ├── components/          # Reusable components
│   │   ├── ui/             # ShadCN UI components (Button, Card, Input, etc.)
│   │   ├── layout/         # Layout components (Navbar, Footer)
│   │   ├── ThemeToggle.tsx # Dark/Light mode toggle
│   │   └── ProtectedRoute.tsx # Auth route guard
│   ├── pages/              # Page components
│   │   ├── Home.tsx        # Products listing with filters
│   │   ├── ProductDetails.tsx  # Single product view
│   │   ├── Cart.tsx        # Shopping cart
│   │   ├── Checkout.tsx    # Checkout form
│   │   └── Admin/          # Admin pages
│   │       ├── Login.tsx   # Admin login
│   │       ├── Dashboard.tsx  # Products management (CRUD)
│   │       └── Orders.tsx  # Orders management
│   ├── services/           # API service layer
│   │   └── api.ts          # Axios instance and API calls
│   ├── store/              # Zustand stores
│   │   ├── useCartStore.ts    # Cart state management
│   │   └── useAuthStore.ts    # Authentication state
│   ├── hooks/              # Custom React hooks
│   │   └── useTheme.tsx    # Theme management hook
│   ├── lib/                # Utility functions
│   │   └── utils.ts        # cn() utility for class merging
│   ├── types/              # TypeScript types
│   │   └── index.ts        # All type definitions
│   ├── App.tsx             # Main app component with routes
│   ├── main.tsx            # App entry point
│   └── index.css           # Global styles and Tailwind imports
├── public/                 # Static assets
├── index.html             # HTML entry point
├── package.json           # Dependencies and scripts
├── tailwind.config.js     # Tailwind configuration
├── tsconfig.json          # TypeScript configuration
└── vite.config.ts         # Vite configuration
```

## Available Pages

### Public Pages

| Route | Description |
|-------|-------------|
| `/` | Home page with all products, filters, and search |
| `/product/:id` | Product details page |
| `/cart` | Shopping cart page |
| `/checkout` | Checkout form page |

### Admin Pages (Protected)

| Route | Description |
|-------|-------------|
| `/admin/login` | Admin login page |
| `/admin/dashboard` | Product management (CRUD) |
| `/admin/orders` | View all customer orders |

## Admin Credentials

Default admin credentials (seeded from Laravel backend):

- **Email**: `admin@example.com`
- **Password**: `password`

## Features in Detail

### 1. Product Browsing
- Grid layout with product cards
- Category filtering (All, Electronics, Clothing, Books, Accessories)
- Search by product name or description
- Price range filtering (min/max)
- Pagination support (configurable)
- Smooth animations on load

### 2. Product Details
- Large product image
- Full description
- Stock availability indicator
- Quantity selector
- Add to cart functionality
- Back navigation

### 3. Shopping Cart
- View all cart items
- Update item quantities
- Remove items
- Real-time total calculation
- Persistent cart (localStorage)
- Badge showing item count in navbar

### 4. Checkout
- Customer information form (name, email, address)
- Order summary with item breakdown
- Form validation
- Success confirmation
- Auto-clear cart after order
- Redirect to home after success

### 5. Admin Dashboard
- Quick stats (total products, orders link)
- Product list with edit/delete actions
- Add new product form
- Edit existing products
- Delete products with confirmation
- Real-time updates

### 6. Admin Orders
- View all customer orders
- Expandable order details
- Customer information
- Order items with products
- Total calculations
- Order timestamps

### 7. Dark/Light Mode
- Theme toggle in navbar
- Persistent preference
- Smooth transitions
- ShadCN theme variables

## State Management

### Cart Store (Zustand)
```typescript
- items: CartItem[]
- addItem(product, quantity)
- removeItem(productId)
- updateQuantity(productId, quantity)
- clearCart()
- getTotal()
- getItemCount()
```

### Auth Store (Zustand)
```typescript
- user: User | null
- token: string | null
- isAuthenticated: boolean
- setAuth(user, token)
- logout()
```

Both stores persist to localStorage automatically.

## API Integration

The frontend connects to the Laravel backend via the `VITE_API_BASE_URL` environment variable (configured in `.env`):

### Public Endpoints
- `GET /products` - List products with filters
- `GET /products/{id}` - Get product details
- `GET /categories` - List all categories
- `POST /checkout` - Create order

### Auth Endpoints
- `POST /login` - Admin login
- `POST /logout` - Admin logout

### Admin Endpoints (Protected)
- `GET /admin/products` - List all products
- `POST /admin/products` - Create product
- `PUT /admin/products/{id}` - Update product
- `DELETE /admin/products/{id}` - Delete product
- `GET /admin/orders` - List all orders

## Authentication Flow

1. Admin visits `/admin/login`
2. Submits credentials
3. Backend returns user object and token
4. Token stored in localStorage
5. Token automatically added to subsequent requests
6. Protected routes check authentication status
7. Logout clears token and redirects

## Styling Approach

- **TailwindCSS** for utility-first styling
- **CSS Variables** for theme colors (light/dark)
- **ShadCN Components** for consistent UI patterns
- **Framer Motion** for smooth animations
- **Responsive Design** with mobile-first approach

## Development Tips

### Adding a New Page
1. Create component in `src/pages/`
2. Add route in `src/App.tsx`
3. Add navigation link if needed

### Adding a New API Endpoint
1. Define TypeScript type in `src/types/index.ts`
2. Add API function in `src/services/api.ts`
3. Use in component with try/catch

### Adding a New UI Component
1. Create in `src/components/ui/`
2. Follow ShadCN patterns
3. Use `cn()` utility for conditional classes
4. Add TypeScript types

## Troubleshooting

### CORS Issues
If you encounter CORS errors, ensure:
- Laravel backend has correct CORS configuration
- `withCredentials: true` is set in Axios
- Sanctum stateful domains are configured

### Authentication Not Working
- Check that Laravel backend is running
- Verify CSRF cookie endpoint is accessible
- Clear localStorage and try logging in again
- Check browser console for errors

### Styles Not Loading
- Run `npm install` to ensure all dependencies are installed
- Verify Tailwind is configured correctly
- Check that `index.css` imports are present

### Build Errors
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Check TypeScript errors: `npm run build`
- Verify all imports use correct paths

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint (if configured) |

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

When contributing to this project:

1. Follow the existing code structure
2. Use TypeScript for type safety
3. Follow React best practices
4. Use Tailwind for styling (no custom CSS)
5. Test on multiple devices
6. Ensure accessibility compliance

## License

This project is part of the Meridian E-commerce platform.

---

**Built with ❤️ using React, Vite, TypeScript, and TailwindCSS**
