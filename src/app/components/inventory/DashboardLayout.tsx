import { useEffect } from 'react';
import { Outlet, useNavigate, NavLink } from 'react-router';
import { useInventory } from '../../contexts/InventoryContext';
import { LayoutDashboard, Package, ShoppingCart, History, Plus, LogOut } from 'lucide-react';

export function DashboardLayout() {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useInventory();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!isAuthenticated) {
    return null;
  }

  const navItems = [
    { path: '/inicio', icon: LayoutDashboard, label: 'Inicio' },
    { path: '/inventario', icon: Package, label: 'Inventario' },
    { path: '/ventas', icon: ShoppingCart, label: 'Ventas' },
    { path: '/movimientos', icon: History, label: 'Movimientos' },
    { path: '/agregar-refaccion', icon: Plus, label: 'Agregar Refacción' }
  ];

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      {/* Header */}
      <header className="bg-[#3a3a3a] px-8 py-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="mb-1" style={{ fontSize: '1.75rem', fontWeight: 700, letterSpacing: '0.02em' }}>
              SISTEMA DE INVENTARIO
            </h1>
            <p className="font-mono uppercase tracking-widest text-[#999]" style={{ fontSize: '0.7rem' }}>
              Refaccionaria
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 border border-white/20 px-6 py-2 transition-all hover:bg-white/10"
            style={{ fontSize: '0.9rem' }}
          >
            <LogOut size={18} />
            Cerrar Sesión
          </button>
        </div>
      </header>

      {/* Navigation */}
      <nav className="border-b-2 border-[#FF5722] bg-white">
        <div className="flex px-8">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-2 border-b-2 px-6 py-4 transition-all ${
                  isActive
                    ? 'border-[#FF5722] text-[#FF5722]'
                    : 'border-transparent text-[#666] hover:text-[#FF5722]'
                }`
              }
              style={{ fontSize: '0.95rem', fontWeight: 500 }}
            >
              <item.icon size={18} />
              {item.label}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main className="min-h-[calc(100vh-180px)]">
        <Outlet />
      </main>
    </div>
  );
}
