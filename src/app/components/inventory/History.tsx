import { useState } from 'react';
import { useInventory } from '../../contexts/InventoryContext';
import { Search, Filter, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';

export function History() {
  const { movements, products } = useInventory();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'entrada' | 'salida'>('all');
  const [selectedProduct, setSelectedProduct] = useState<string>('all');

  const filteredMovements = movements.filter((m) => {
    const matchesSearch =
      m.productoNombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.productoCodigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.usuario.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = filterType === 'all' || m.tipo === filterType;
    const matchesProduct = selectedProduct === 'all' || m.productoId === selectedProduct;

    return matchesSearch && matchesType && matchesProduct;
  });

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="mb-2" style={{ fontSize: '2.5rem', fontWeight: 700 }}>
          MOVIMIENTOS
        </h2>
        <p className="font-mono uppercase tracking-wider text-[#666]" style={{ fontSize: '0.75rem' }}>
          Historial completo de entradas y salidas
        </p>
      </div>

      {/* Filters */}
      <div className="mb-6 grid gap-4 md:grid-cols-3">
        {/* Search */}
        <div className="flex items-center gap-3 border border-[#ddd] bg-white px-4 py-3">
          <Search size={20} className="text-[#999]" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar movimientos..."
            className="flex-1 bg-transparent focus:outline-none"
          />
        </div>

        {/* Type Filter */}
        <div>
          <div className="flex items-center gap-3 border border-[#ddd] bg-white">
            <div className="flex items-center gap-2 px-4">
              <Filter size={20} className="text-[#999]" />
            </div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as 'all' | 'entrada' | 'salida')}
              className="flex-1 bg-transparent py-3 pr-4 focus:outline-none"
            >
              <option value="all">Todos los movimientos</option>
              <option value="entrada">Solo entradas</option>
              <option value="salida">Solo salidas</option>
            </select>
          </div>
        </div>

        {/* Product Filter */}
        <div>
          <select
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
            className="w-full border border-[#ddd] bg-white px-4 py-3 focus:outline-none"
          >
            <option value="all">Todos los productos</option>
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.nombre} ({product.codigo})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="mb-6 grid gap-4 md:grid-cols-3">
        <div className="border border-[#ddd] bg-white p-6">
          <p className="mb-2 font-mono uppercase tracking-wider text-[#999]" style={{ fontSize: '0.7rem' }}>
            Total Movimientos
          </p>
          <p style={{ fontSize: '2rem', fontWeight: 700 }}>
            {filteredMovements.length}
          </p>
        </div>
        <div className="border border-[#28ca42] bg-white p-6">
          <p className="mb-2 font-mono uppercase tracking-wider text-[#28ca42]" style={{ fontSize: '0.7rem' }}>
            Total Entradas
          </p>
          <p style={{ fontSize: '2rem', fontWeight: 700, color: '#28ca42' }}>
            {filteredMovements.filter(m => m.tipo === 'entrada').length}
          </p>
        </div>
        <div className="border border-[#FF5722] bg-white p-6">
          <p className="mb-2 font-mono uppercase tracking-wider text-[#FF5722]" style={{ fontSize: '0.7rem' }}>
            Total Salidas
          </p>
          <p style={{ fontSize: '2rem', fontWeight: 700, color: '#FF5722' }}>
            {filteredMovements.filter(m => m.tipo === 'salida').length}
          </p>
        </div>
      </div>

      {/* Movements Table */}
      <div className="overflow-x-auto border border-[#ddd] bg-white">
        <table className="w-full">
          <thead className="bg-[#3a3a3a] text-white">
            <tr>
              <th className="px-6 py-4 text-left font-mono uppercase tracking-wider" style={{ fontSize: '0.75rem' }}>
                Fecha/Hora
              </th>
              <th className="px-6 py-4 text-left font-mono uppercase tracking-wider" style={{ fontSize: '0.75rem' }}>
                Tipo
              </th>
              <th className="px-6 py-4 text-left font-mono uppercase tracking-wider" style={{ fontSize: '0.75rem' }}>
                Producto
              </th>
              <th className="px-6 py-4 text-left font-mono uppercase tracking-wider" style={{ fontSize: '0.75rem' }}>
                Código
              </th>
              <th className="px-6 py-4 text-left font-mono uppercase tracking-wider" style={{ fontSize: '0.75rem' }}>
                Cantidad
              </th>
              <th className="px-6 py-4 text-left font-mono uppercase tracking-wider" style={{ fontSize: '0.75rem' }}>
                Usuario
              </th>
              <th className="px-6 py-4 text-left font-mono uppercase tracking-wider" style={{ fontSize: '0.75rem' }}>
                Motivo
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredMovements.map((movement, index) => (
              <tr
                key={movement.id}
                className="border-b border-[#e0e0e0] hover:bg-[#fafafa]"
                style={{ backgroundColor: index % 2 === 0 ? '#ffffff' : '#f9f9f9' }}
              >
                <td className="px-6 py-4">
                  <div>
                    <p className="font-mono" style={{ fontSize: '0.9rem' }}>
                      {movement.fecha}
                    </p>
                    <p className="font-mono text-[#999]" style={{ fontSize: '0.8rem' }}>
                      {movement.hora}
                    </p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    {movement.tipo === 'entrada' ? (
                      <>
                        <ArrowUpCircle size={18} className="text-[#28ca42]" />
                        <span className="font-mono text-[#28ca42]" style={{ fontSize: '0.85rem', fontWeight: 600 }}>
                          ENTRADA
                        </span>
                      </>
                    ) : (
                      <>
                        <ArrowDownCircle size={18} className="text-[#FF5722]" />
                        <span className="font-mono text-[#FF5722]" style={{ fontSize: '0.85rem', fontWeight: 600 }}>
                          SALIDA
                        </span>
                      </>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4" style={{ fontSize: '0.95rem', fontWeight: 500 }}>
                  {movement.productoNombre}
                </td>
                <td className="px-6 py-4 font-mono text-[#666]" style={{ fontSize: '0.85rem' }}>
                  {movement.productoCodigo}
                </td>
                <td className="px-6 py-4">
                  <span
                    className="font-mono px-3 py-1"
                    style={{
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      backgroundColor: movement.tipo === 'entrada' ? '#28ca42' : '#FF5722',
                      color: '#ffffff'
                    }}
                  >
                    {movement.tipo === 'entrada' ? '+' : '-'}{movement.cantidad}
                  </span>
                </td>
                <td className="px-6 py-4 font-mono text-[#666]" style={{ fontSize: '0.85rem' }}>
                  {movement.usuario}
                </td>
                <td className="px-6 py-4 text-[#666]" style={{ fontSize: '0.9rem' }}>
                  {movement.motivo || '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredMovements.length === 0 && (
          <div className="p-12 text-center">
            <p className="text-[#999]" style={{ fontSize: '1rem' }}>
              No se encontraron movimientos con los filtros aplicados
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
