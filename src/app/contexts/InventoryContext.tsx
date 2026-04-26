import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Product {
  id: string;
  nombre: string;
  codigo: string;
  cantidad: number;
  stockMinimo: number;
  proveedor: string;
  costo: number;
  fechaRegistro: string;
}

export interface Sale {
  id: string;
  productoId: string;
  productoNombre: string;
  productoCodigo: string;
  cantidad: number;
  precioUnitario: number;
  total: number;
  usuario: string;
  fecha: string;
  hora: string;
}

export interface Movement {
  id: string;
  productoId: string;
  productoNombre: string;
  productoCodigo: string;
  tipo: 'entrada' | 'salida';
  cantidad: number;
  usuario: string;
  fecha: string;
  hora: string;
  motivo?: string;
}

interface InventoryContextType {
  products: Product[];
  movements: Movement[];
  sales: Sale[];
  currentUser: string | null;
  addProduct: (product: Omit<Product, 'id' | 'fechaRegistro'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  updateProductStock: (productId: string, cantidad: number, tipo: 'entrada' | 'salida', motivo?: string) => boolean;
  addSale: (sale: Omit<Sale, 'id' | 'fecha' | 'hora' | 'usuario'>) => boolean;
  getProductById: (id: string) => Product | undefined;
  getMovementsByProduct: (productId: string) => Movement[];
  getLowStockProducts: () => Product[];
  getHighRotationProducts: () => Product[];
  getTotalInventoryValue: () => number;
  getTotalSales: () => number;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const InventoryContext = createContext<InventoryContextType | undefined>(undefined);

const MOCK_USERS = [
  { username: 'admin', password: 'admin123' },
  { username: 'usuario', password: 'user123' }
];

export function InventoryProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [movements, setMovements] = useState<Movement[]>([]);
  const [sales, setSales] = useState<Sale[]>([]);
  const [currentUser, setCurrentUser] = useState<string | null>(null);

  useEffect(() => {
    const savedProducts = localStorage.getItem('inventory_products');
    const savedMovements = localStorage.getItem('inventory_movements');
    const savedSales = localStorage.getItem('inventory_sales');
    const savedUser = localStorage.getItem('inventory_user');

    if (savedProducts) setProducts(JSON.parse(savedProducts));
    if (savedMovements) setMovements(JSON.parse(savedMovements));
    if (savedSales) setSales(JSON.parse(savedSales));
    if (savedUser) setCurrentUser(savedUser);

    if (!savedProducts) {
      const initialProducts: Product[] = [
        {
          id: '1',
          nombre: 'Filtro de Aceite',
          codigo: 'FO-001',
          cantidad: 45,
          stockMinimo: 20,
          proveedor: 'AutoPartes SA',
          costo: 150,
          fechaRegistro: new Date().toISOString()
        },
        {
          id: '2',
          nombre: 'Pastillas de Freno',
          codigo: 'PF-002',
          cantidad: 15,
          stockMinimo: 25,
          proveedor: 'Frenos MX',
          costo: 450,
          fechaRegistro: new Date().toISOString()
        },
        {
          id: '3',
          nombre: 'Aceite Motor 5W-30',
          codigo: 'AM-003',
          cantidad: 80,
          stockMinimo: 30,
          proveedor: 'Lubricantes Pro',
          costo: 220,
          fechaRegistro: new Date().toISOString()
        }
      ];
      setProducts(initialProducts);
      localStorage.setItem('inventory_products', JSON.stringify(initialProducts));
    }
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem('inventory_products', JSON.stringify(products));
    }
  }, [products]);

  useEffect(() => {
    if (movements.length > 0) {
      localStorage.setItem('inventory_movements', JSON.stringify(movements));
    }
  }, [movements]);

  useEffect(() => {
    if (sales.length > 0) {
      localStorage.setItem('inventory_sales', JSON.stringify(sales));
    }
  }, [sales]);

  const login = (username: string, password: string): boolean => {
    const user = MOCK_USERS.find(u => u.username === username && u.password === password);
    if (user) {
      setCurrentUser(username);
      localStorage.setItem('inventory_user', username);
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('inventory_user');
  };

  const addProduct = (product: Omit<Product, 'id' | 'fechaRegistro'>) => {
    const newProduct: Product = {
      ...product,
      id: Date.now().toString(),
      fechaRegistro: new Date().toISOString()
    };
    setProducts(prev => [...prev, newProduct]);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev =>
      prev.map(p => (p.id === id ? { ...p, ...updates } : p))
    );
  };

  const addSale = (sale: Omit<Sale, 'id' | 'fecha' | 'hora' | 'usuario'>): boolean => {
    const product = products.find(p => p.id === sale.productoId);
    if (!product || product.cantidad < sale.cantidad) return false;

    const newCantidad = product.cantidad - sale.cantidad;
    setProducts(prev =>
      prev.map(p =>
        p.id === sale.productoId ? { ...p, cantidad: newCantidad } : p
      )
    );

    const now = new Date();
    const newSale: Sale = {
      ...sale,
      id: Date.now().toString(),
      usuario: currentUser || 'Sistema',
      fecha: now.toISOString().split('T')[0],
      hora: now.toTimeString().split(' ')[0]
    };

    setSales(prev => [newSale, ...prev]);

    const newMovement: Movement = {
      id: (Date.now() + 1).toString(),
      productoId: sale.productoId,
      productoNombre: sale.productoNombre,
      productoCodigo: sale.productoCodigo,
      tipo: 'salida',
      cantidad: sale.cantidad,
      usuario: currentUser || 'Sistema',
      fecha: now.toISOString().split('T')[0],
      hora: now.toTimeString().split(' ')[0],
      motivo: 'Venta'
    };

    setMovements(prev => [newMovement, ...prev]);
    return true;
  };

  const getTotalInventoryValue = () =>
    products.reduce((sum, p) => sum + (p.cantidad * p.costo), 0);

  const getTotalSales = () =>
    sales.reduce((sum, s) => sum + s.total, 0);

  const updateProductStock = (
    productId: string,
    cantidad: number,
    tipo: 'entrada' | 'salida',
    motivo?: string
  ): boolean => {
    const product = products.find(p => p.id === productId);
    if (!product) return false;

    const newCantidad = tipo === 'entrada'
      ? product.cantidad + cantidad
      : product.cantidad - cantidad;

    if (newCantidad < 0) return false;

    setProducts(prev =>
      prev.map(p =>
        p.id === productId ? { ...p, cantidad: newCantidad } : p
      )
    );

    const now = new Date();
    const newMovement: Movement = {
      id: Date.now().toString(),
      productoId: product.id,
      productoNombre: product.nombre,
      productoCodigo: product.codigo,
      tipo,
      cantidad,
      usuario: currentUser || 'Sistema',
      fecha: now.toISOString().split('T')[0],
      hora: now.toTimeString().split(' ')[0],
      motivo
    };

    setMovements(prev => [newMovement, ...prev]);
    return true;
  };

  const getProductById = (id: string) => products.find(p => p.id === id);

  const getMovementsByProduct = (productId: string) =>
    movements.filter(m => m.productoId === productId);

  const getLowStockProducts = () =>
    products.filter(p => p.cantidad <= p.stockMinimo);

  const getHighRotationProducts = () => {
    const last30Days = new Date();
    last30Days.setDate(last30Days.getDate() - 30);

    const productMovements = products.map(product => {
      const recentMovements = movements.filter(
        m => m.productoId === product.id && new Date(m.fecha) >= last30Days
      );
      const totalMovements = recentMovements.reduce((sum, m) => sum + m.cantidad, 0);
      return { product, totalMovements };
    });

    return productMovements
      .filter(pm => pm.totalMovements > 0)
      .sort((a, b) => b.totalMovements - a.totalMovements)
      .slice(0, 5)
      .map(pm => pm.product);
  };

  return (
    <InventoryContext.Provider
      value={{
        products,
        movements,
        sales,
        currentUser,
        addProduct,
        updateProduct,
        updateProductStock,
        addSale,
        getProductById,
        getMovementsByProduct,
        getLowStockProducts,
        getHighRotationProducts,
        getTotalInventoryValue,
        getTotalSales,
        login,
        logout,
        isAuthenticated: currentUser !== null
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
}

export function useInventory() {
  const context = useContext(InventoryContext);
  if (!context) {
    throw new Error('useInventory debe usarse dentro de InventoryProvider');
  }
  return context;
}
