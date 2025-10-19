import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, FolderOpen, Users, ShoppingCart } from 'lucide-react';
import { cn } from '@/lib/utils';

export function AdminNav() {
  const location = useLocation();

  const navItems = [
    {
      title: 'Dashboard',
      href: '/admin/dashboard',
      icon: LayoutDashboard,
    },
    {
      title: 'Products',
      href: '/admin/products',
      icon: Package,
    },
    {
      title: 'Categories',
      href: '/admin/categories',
      icon: FolderOpen,
    },
    {
      title: 'Orders',
      href: '/admin/orders',
      icon: ShoppingCart,
    },
    {
      title: 'Users',
      href: '/admin/users',
      icon: Users,
    },
  ];

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-border sticky top-16 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-1 overflow-x-auto py-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                )}
              >
                <Icon className="h-4 w-4" />
                {item.title}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
