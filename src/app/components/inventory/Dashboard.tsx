import { useInventory } from '../../contexts/InventoryContext';
import { Package, DollarSign, AlertTriangle, TrendingUp, ShoppingCart } from 'lucide-react';

export function Dashboard() {
  const { products, movements, sales, getLowStockProducts, getHighRotationProducts, getTotalInventoryValue, getTotalSales } = useInventory();

  const lowStockProducts = getLowStockProducts();
  const highRotationProducts = getHighRotationProducts();
  const totalValue = getTotalInventoryValue();
  const totalSalesValue = getTotalSales();
  const todayMovements = movements.filter(m => m.fecha === new Date().toISOString().split('T')[0]).length;
  const todaySales = sales.filter(s => s.fecha === new Date().toISOString().split('T')[0]);
  const todaySalesCount = todaySales.length;
  const todaySalesTotal = todaySales.reduce((sum, s) => sum + s.total, 0);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="mb-2" style={{ fontSize: '2.5rem', fontWeight: 700 }}>
          INICIO
        </h2>
        <p className="font-mono uppercase tracking-wider text-[#666]" style={{ fontSize: '0.75rem' }}>
          Vista General del Inventario y Ventas
        </p>
      </div>

      {/* Main Stats */}
      <div className="mb-8 grid gap-6 md:grid-cols-4">
        <div className="border border-[#ddd] bg-white p-6">
          <div className="mb-4 flex items-start justify-between">
            <Package size={28} className="text-[#666]" />
            <span className="font-mono text-[#999]" style={{ fontSize: '0.75rem' }}>
              TOTAL
            </span>
          </div>
          <p className="mb-1" style={{ fontSize: '2.5rem', fontWeight: 700 }}>
            {products.length}
          </p>
          <p className="text-[#666]" style={{ fontSize: '0.9rem' }}>
            Refacciones
          </p>
        </div>

        <div className="border border-[#ddd] bg-white p-6">
          <div className="mb-4 flex items-start justify-between">
            <DollarSign size={28} className="text-[#666]" />
            <span className="font-mono text-[#999]" style={{ fontSize: '0.75rem' }}>
              VALOR
            </span>
          </div>
          <p className="mb-1" style={{ fontSize: '2.5rem', fontWeight: 700 }}>
            ${totalValue.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
          </p>
          <p className="text-[#666]" style={{ fontSize: '0.9rem' }}>
            Inventario total
          </p>
        </div>

        <div className="border border-[#FF5722] bg-white p-6">
          <div className="mb-4 flex items-start justify-between">
            <AlertTriangle size={28} className="text-[#FF5722]" />
            <span className="font-mono text-[#FF5722]" style={{ fontSize: '0.75rem' }}>
              ALERTAS
            </span>
          </div>
          <p className="mb-1 text-[#FF5722]" style={{ fontSize: '2.5rem', fontWeight: 700 }}>
            {lowStockProducts.length}
          </p>
          <p className="text-[#666]" style={{ fontSize: '0.9rem' }}>
            Stock bajo
          </p>
        </div>

        <div className="border border-[#ddd] bg-white p-6">
          <div className="mb-4 flex items-start justify-between">
            <TrendingUp size={28} className="text-[#666]" />
            <span className="font-mono text-[#999]" style={{ fontSize: '0.75rem' }}>
              24H
            </span>
          </div>
          <p className="mb-1" style={{ fontSize: '2.5rem', fontWeight: 700 }}>
            {todayMovements}
          </p>
          <p className="text-[#666]" style={{ fontSize: '0.9rem' }}>
            Movimientos
          </p>
        </div>
      </div>

      {/* Sales Stats */}
      <div className="mb-8">
        <h3 className="mb-4" style={{ fontSize: '1.5rem', fontWeight: 700 }}>
          ESTADÍSTICAS DE VENTAS
        </h3>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="border border-[#ddd] bg-white p-6">
            <div className="mb-4 flex items-start justify-between">
              <ShoppingCart size={28} className="text-[#666]" />
              <span className="font-mono text-[#999]" style={{ fontSize: '0.75rem' }}>
                HOY
              </span>
            </div>
            <p className="mb-1" style={{ fontSize: '2.5rem', fontWeight: 700 }}>
              {todaySalesCount}
            </p>
            <p className="text-[#666]" style={{ fontSize: '0.9rem' }}>
              Ventas / ${todaySalesTotal.toFixed(2)}
            </p>
          </div>

          <div className="border border-[#ddd] bg-white p-6">
            <div className="mb-4 flex items-start justify-between">
              <DollarSign size={28} className="text-[#666]" />
              <span className="font-mono text-[#999]" style={{ fontSize: '0.75rem' }}>
                INGRESOS
              </span>
            </div>
            <p className="mb-1" style={{ fontSize: '2.5rem', fontWeight: 700 }}>
              ${totalSalesValue.toFixed(2)}
            </p>
            <p className="text-[#666]" style={{ fontSize: '0.9rem' }}>
              Total de {sales.length} ventas
            </p>
          </div>

          <div className="border border-[#ddd] bg-white p-6">
            <div className="mb-4 flex items-start justify-between">
              <TrendingUp size={28} className="text-[#28ca42]" />
              <span className="font-mono text-[#28ca42]" style={{ fontSize: '0.75rem' }}>
                UTILIDAD
              </span>
            </div>
            <p className="mb-1 text-[#28ca42]" style={{ fontSize: '2.5rem', fontWeight: 700 }}>
              ${(totalSalesValue * 0.3).toFixed(2)}
            </p>
            <p className="text-[#666]" style={{ fontSize: '0.9rem' }}>
              Ganancia total
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Low Stock Alerts */}
        <div className="border border-[#ddd] bg-white p-6">
          <div className="mb-4 flex items-center gap-2">
            <AlertTriangle size={20} className="text-[#FF5722]" />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>
              ALERTAS DE STOCK MÍNIMO
            </h3>
          </div>
          {lowStockProducts.length > 0 ? (
            <div className="space-y-3">
              {lowStockProducts.slice(0, 5).map((product) => (
                <div key={product.id} className="border-l-4 border-[#FF5722] bg-[#fff5f5] p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p style={{ fontSize: '0.95rem', fontWeight: 600 }}>
                        {product.nombre}
                      </p>
                      <p className="font-mono text-[#666]" style={{ fontSize: '0.8rem' }}>
                        {product.codigo} | Stock: {product.cantidad} | Mín: {product.stockMinimo}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="py-8 text-center text-[#999]" style={{ fontSize: '0.95rem' }}>
              No hay alertas de stock bajo
            </p>
          )}
        </div>

        {/* High Rotation */}
        <div className="border border-[#ddd] bg-white p-6">
          <div className="mb-4 flex items-center gap-2">
            <TrendingUp size={20} className="text-[#28ca42]" />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>
              PRODUCTOS DE ALTA ROTACIÓN
            </h3>
          </div>
          {highRotationProducts.length > 0 ? (
            <div className="space-y-4">
              {highRotationProducts.map((product, index) => (
                <div key={product.id} className="flex items-center justify-between border-b border-[#f0f0f0] pb-3 last:border-0">
                  <div className="flex items-start gap-3">
                    <span className="font-mono text-[#999]" style={{ fontSize: '1.25rem', fontWeight: 700 }}>
                      #{index + 1}
                    </span>
                    <div>
                      <p className="font-mono text-[#999]" style={{ fontSize: '0.75rem' }}>
                        {product.codigo}
                      </p>
                      <p style={{ fontSize: '0.95rem', fontWeight: 600 }}>
                        {product.nombre}
                      </p>
                      <p className="text-[#666]" style={{ fontSize: '0.8rem' }}>
                        {movements.filter(m => m.productoId === product.id).length} movimientos
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p style={{ fontSize: '1.5rem', fontWeight: 700 }}>
                      {product.cantidad}
                    </p>
                    <p className="text-[#666]" style={{ fontSize: '0.8rem' }}>
                      en stock
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="py-8 text-center text-[#999]" style={{ fontSize: '0.95rem' }}>
              No hay datos suficientes
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
