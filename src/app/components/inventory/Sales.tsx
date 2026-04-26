import { useState } from 'react';
import { useInventory } from '../../contexts/InventoryContext';
import { Search, ShoppingCart, DollarSign, Plus, Trash2, X } from 'lucide-react';

interface CartItem {
  productoId: string;
  productoNombre: string;
  productoCodigo: string;
  cantidad: number;
  precioUnitario: number;
  stockDisponible: number;
}

export function Sales() {
  const { products, sales, addSale } = useInventory();
  const [selectedProduct, setSelectedProduct] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [precioVenta, setPrecioVenta] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);

  const filteredSales = sales.filter(
    (s) =>
      s.productoNombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.productoCodigo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddToCart = () => {
    if (!selectedProduct || !cantidad || !precioVenta) {
      alert('Por favor complete todos los campos');
      return;
    }

    const product = products.find(p => p.id === selectedProduct);
    if (!product) return;

    const cantidadNum = parseInt(cantidad);
    const precioNum = parseFloat(precioVenta);

    if (cantidadNum <= 0 || precioNum <= 0) {
      alert('La cantidad y el precio deben ser mayores a 0');
      return;
    }

    // Verificar si el producto ya está en el carrito
    const existingItem = cart.find(item => item.productoId === product.id);
    const totalEnCarrito = existingItem ? existingItem.cantidad + cantidadNum : cantidadNum;

    if (totalEnCarrito > product.cantidad) {
      alert(`Stock insuficiente. Disponible: ${product.cantidad}, En carrito: ${existingItem?.cantidad || 0}`);
      return;
    }

    if (existingItem) {
      setCart(cart.map(item =>
        item.productoId === product.id
          ? { ...item, cantidad: item.cantidad + cantidadNum }
          : item
      ));
    } else {
      setCart([...cart, {
        productoId: product.id,
        productoNombre: product.nombre,
        productoCodigo: product.codigo,
        cantidad: cantidadNum,
        precioUnitario: precioNum,
        stockDisponible: product.cantidad
      }]);
    }

    setSelectedProduct('');
    setCantidad('');
    setPrecioVenta('');
  };

  const handleRemoveFromCart = (productoId: string) => {
    setCart(cart.filter(item => item.productoId !== productoId));
  };

  const handleCompleteSale = () => {
    if (cart.length === 0) {
      alert('El carrito está vacío');
      return;
    }

    let allSuccess = true;
    for (const item of cart) {
      const success = addSale({
        productoId: item.productoId,
        productoNombre: item.productoNombre,
        productoCodigo: item.productoCodigo,
        cantidad: item.cantidad,
        precioUnitario: item.precioUnitario,
        total: item.cantidad * item.precioUnitario
      });

      if (!success) {
        allSuccess = false;
        alert(`Error al registrar: ${item.productoNombre}`);
        break;
      }
    }

    if (allSuccess) {
      alert('Venta completada exitosamente');
      setCart([]);
    }
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.cantidad * item.precioUnitario), 0);
  const totalSalesToday = sales
    .filter(s => s.fecha === new Date().toISOString().split('T')[0])
    .reduce((sum, s) => sum + s.total, 0);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="mb-2" style={{ fontSize: '2.5rem', fontWeight: 700 }}>
          VENTAS
        </h2>
        <p className="font-mono uppercase tracking-wider text-[#666]" style={{ fontSize: '0.75rem' }}>
          Registro de Ventas del Sistema
        </p>
      </div>

      {/* Stats */}
      <div className="mb-8 grid gap-6 md:grid-cols-3">
        <div className="border border-[#ddd] bg-white p-6">
          <div className="mb-4 flex items-start justify-between">
            <ShoppingCart size={28} className="text-[#666]" />
            <span className="font-mono text-[#999]" style={{ fontSize: '0.75rem' }}>
              TOTAL VENTAS
            </span>
          </div>
          <p className="mb-1" style={{ fontSize: '2.5rem', fontWeight: 700 }}>
            {sales.length}
          </p>
          <p className="text-[#666]" style={{ fontSize: '0.9rem' }}>
            Ventas registradas
          </p>
        </div>

        <div className="border border-[#ddd] bg-white p-6">
          <div className="mb-4 flex items-start justify-between">
            <DollarSign size={28} className="text-[#28ca42]" />
            <span className="font-mono text-[#28ca42]" style={{ fontSize: '0.75rem' }}>
              HOY
            </span>
          </div>
          <p className="mb-1 text-[#28ca42]" style={{ fontSize: '2.5rem', fontWeight: 700 }}>
            ${totalSalesToday.toFixed(2)}
          </p>
          <p className="text-[#666]" style={{ fontSize: '0.9rem' }}>
            Ingresos del día
          </p>
        </div>

        <div className="border border-[#ddd] bg-white p-6">
          <div className="mb-4 flex items-start justify-between">
            <DollarSign size={28} className="text-[#666]" />
            <span className="font-mono text-[#999]" style={{ fontSize: '0.75rem' }}>
              TOTAL
            </span>
          </div>
          <p className="mb-1" style={{ fontSize: '2.5rem', fontWeight: 700 }}>
            ${sales.reduce((sum, s) => sum + s.total, 0).toFixed(2)}
          </p>
          <p className="text-[#666]" style={{ fontSize: '0.9rem' }}>
            Ingresos totales
          </p>
        </div>
      </div>

      <div className="mb-8 grid gap-6 md:grid-cols-3">
        {/* Add Product to Cart Form */}
        <div className="md:col-span-2 border border-[#ddd] bg-white p-6">
          <h3 className="mb-4" style={{ fontSize: '1.5rem', fontWeight: 700 }}>
            AGREGAR PRODUCTOS A LA VENTA
          </h3>
          <div className="grid gap-4 md:grid-cols-4">
            <div>
              <label className="mb-2 block font-mono uppercase tracking-wider text-[#666]" style={{ fontSize: '0.75rem' }}>
                Producto *
              </label>
              <select
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
                className="w-full border border-[#ddd] bg-white px-4 py-3 focus:border-[#FF5722] focus:outline-none"
              >
                <option value="">Seleccione...</option>
                {products.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.codigo} - {product.nombre} (Stock: {product.cantidad})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block font-mono uppercase tracking-wider text-[#666]" style={{ fontSize: '0.75rem' }}>
                Cantidad *
              </label>
              <input
                type="number"
                min="1"
                value={cantidad}
                onChange={(e) => setCantidad(e.target.value)}
                className="w-full border border-[#ddd] bg-white px-4 py-3 focus:border-[#FF5722] focus:outline-none"
                placeholder="0"
              />
            </div>

            <div>
              <label className="mb-2 block font-mono uppercase tracking-wider text-[#666]" style={{ fontSize: '0.75rem' }}>
                Precio ($) *
              </label>
              <input
                type="number"
                step="0.01"
                min="0.01"
                value={precioVenta}
                onChange={(e) => setPrecioVenta(e.target.value)}
                className="w-full border border-[#ddd] bg-white px-4 py-3 focus:border-[#FF5722] focus:outline-none"
                placeholder="0.00"
              />
            </div>

            <div className="flex items-end">
              <button
                type="button"
                onClick={handleAddToCart}
                className="flex w-full items-center justify-center gap-2 bg-[#28ca42] px-4 py-3 text-white transition-all hover:bg-[#239537]"
                style={{ fontSize: '0.9rem', fontWeight: 600 }}
              >
                <Plus size={18} />
                Agregar
              </button>
            </div>
          </div>
        </div>

        {/* Cart Summary */}
        <div className="border border-[#FF5722] bg-white p-6">
          <h3 className="mb-4 flex items-center gap-2" style={{ fontSize: '1.25rem', fontWeight: 700 }}>
            <ShoppingCart size={20} />
            CARRITO
          </h3>
          <div className="mb-4 border-b border-[#e0e0e0] pb-4">
            <p className="mb-2 text-[#666]" style={{ fontSize: '0.9rem' }}>
              Productos: {cart.length}
            </p>
            <p className="mb-2 text-[#666]" style={{ fontSize: '0.9rem' }}>
              Unidades: {cart.reduce((sum, item) => sum + item.cantidad, 0)}
            </p>
          </div>
          <p className="mb-4 text-[#FF5722]" style={{ fontSize: '2rem', fontWeight: 700 }}>
            ${cartTotal.toFixed(2)}
          </p>
          <button
            onClick={handleCompleteSale}
            disabled={cart.length === 0}
            className="w-full bg-[#FF5722] px-6 py-3 text-white transition-all hover:bg-[#e64a19] disabled:bg-[#ccc] disabled:cursor-not-allowed"
            style={{ fontSize: '0.95rem', fontWeight: 600 }}
          >
            COMPLETAR VENTA
          </button>
        </div>
      </div>

      {/* Cart Items */}
      {cart.length > 0 && (
        <div className="mb-8 border border-[#ddd] bg-white p-6">
          <h3 className="mb-4" style={{ fontSize: '1.25rem', fontWeight: 700 }}>
            PRODUCTOS EN EL CARRITO
          </h3>
          <div className="space-y-3">
            {cart.map((item) => (
              <div key={item.productoId} className="flex items-center justify-between border-b border-[#e0e0e0] pb-3 last:border-0">
                <div className="flex-1">
                  <p style={{ fontSize: '1rem', fontWeight: 600 }}>
                    {item.productoNombre}
                  </p>
                  <p className="font-mono text-[#666]" style={{ fontSize: '0.85rem' }}>
                    {item.productoCodigo} | {item.cantidad} x ${item.precioUnitario.toFixed(2)}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <p className="font-mono" style={{ fontSize: '1.25rem', fontWeight: 700 }}>
                    ${(item.cantidad * item.precioUnitario).toFixed(2)}
                  </p>
                  <button
                    onClick={() => handleRemoveFromCart(item.productoId)}
                    className="border border-[#FF5722] p-2 text-[#FF5722] transition-all hover:bg-[#FF5722] hover:text-white"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sales History */}
      <div className="mb-6">
        <h3 className="mb-4" style={{ fontSize: '1.5rem', fontWeight: 700 }}>
          HISTORIAL DE VENTAS
        </h3>
        <div className="mb-4 flex items-center gap-3 border border-[#ddd] bg-white px-4 py-3">
          <Search size={20} className="text-[#999]" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar ventas..."
            className="flex-1 bg-transparent focus:outline-none"
            style={{ fontSize: '0.95rem' }}
          />
        </div>
      </div>

      <div className="overflow-x-auto border border-[#ddd] bg-white">
        <table className="w-full">
          <thead className="bg-[#3a3a3a] text-white">
            <tr>
              <th className="px-6 py-4 text-left font-mono uppercase tracking-wider" style={{ fontSize: '0.75rem' }}>
                Fecha/Hora
              </th>
              <th className="px-6 py-4 text-left font-mono uppercase tracking-wider" style={{ fontSize: '0.75rem' }}>
                Código
              </th>
              <th className="px-6 py-4 text-left font-mono uppercase tracking-wider" style={{ fontSize: '0.75rem' }}>
                Producto
              </th>
              <th className="px-6 py-4 text-left font-mono uppercase tracking-wider" style={{ fontSize: '0.75rem' }}>
                Cantidad
              </th>
              <th className="px-6 py-4 text-left font-mono uppercase tracking-wider" style={{ fontSize: '0.75rem' }}>
                Precio Unit.
              </th>
              <th className="px-6 py-4 text-left font-mono uppercase tracking-wider" style={{ fontSize: '0.75rem' }}>
                Total
              </th>
              <th className="px-6 py-4 text-left font-mono uppercase tracking-wider" style={{ fontSize: '0.75rem' }}>
                Usuario
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredSales.map((sale, index) => (
              <tr
                key={sale.id}
                className="border-b border-[#e0e0e0] hover:bg-[#fafafa]"
                style={{ backgroundColor: index % 2 === 0 ? '#ffffff' : '#f9f9f9' }}
              >
                <td className="px-6 py-4">
                  <div>
                    <p className="font-mono" style={{ fontSize: '0.9rem' }}>
                      {sale.fecha}
                    </p>
                    <p className="font-mono text-[#999]" style={{ fontSize: '0.8rem' }}>
                      {sale.hora}
                    </p>
                  </div>
                </td>
                <td className="px-6 py-4 font-mono" style={{ fontSize: '0.9rem' }}>
                  {sale.productoCodigo}
                </td>
                <td className="px-6 py-4" style={{ fontSize: '0.95rem', fontWeight: 500 }}>
                  {sale.productoNombre}
                </td>
                <td className="px-6 py-4 font-mono" style={{ fontSize: '0.9rem' }}>
                  {sale.cantidad}
                </td>
                <td className="px-6 py-4 font-mono" style={{ fontSize: '0.9rem' }}>
                  ${sale.precioUnitario.toFixed(2)}
                </td>
                <td className="px-6 py-4 font-mono text-[#28ca42]" style={{ fontSize: '1rem', fontWeight: 600 }}>
                  ${sale.total.toFixed(2)}
                </td>
                <td className="px-6 py-4 text-[#666]" style={{ fontSize: '0.9rem' }}>
                  {sale.usuario}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredSales.length === 0 && (
          <div className="p-12 text-center">
            <p className="text-[#999]" style={{ fontSize: '1rem' }}>
              No se encontraron ventas
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
