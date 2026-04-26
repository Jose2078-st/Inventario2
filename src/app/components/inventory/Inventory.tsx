import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useInventory, Product } from '../../contexts/InventoryContext';
import { Search, Plus, Minus, Edit2, FileText } from 'lucide-react';
import { EditProductModal } from './EditProductModal';

export function Inventory() {
  const { products, updateProductStock, updateProduct } = useInventory();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const filteredProducts = products.filter(
    (p) =>
      p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.proveedor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleQuickAdjust = (productId: string, tipo: 'entrada' | 'salida') => {
    const cantidad = prompt(tipo === 'entrada' ? 'Cantidad a agregar:' : 'Cantidad a retirar:');
    if (cantidad && !isNaN(parseInt(cantidad))) {
      updateProductStock(productId, parseInt(cantidad), tipo, tipo === 'entrada' ? 'Entrada rápida' : 'Salida rápida');
    }
  };

  return (
    <>
      {editingProduct && (
        <EditProductModal
          product={editingProduct}
          onSave={updateProduct}
          onClose={() => setEditingProduct(null)}
        />
      )}
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="mb-2" style={{ fontSize: '2.5rem', fontWeight: 700 }}>
            INVENTARIO
          </h2>
          <p className="font-mono uppercase tracking-wider text-[#666]" style={{ fontSize: '0.75rem' }}>
            {products.length} Refacciones en Sistema
          </p>
        </div>
        <button
          onClick={() => navigate('/agregar-refaccion')}
          className="flex items-center gap-2 bg-[#FF5722] px-6 py-3 text-white transition-all hover:bg-[#e64a19]"
          style={{ fontSize: '0.95rem', fontWeight: 600 }}
        >
          <Plus size={20} />
          AGREGAR REFACCIÓN
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="flex items-center gap-3 border border-[#ddd] bg-white px-4 py-3">
          <Search size={20} className="text-[#999]" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por nombre, código o proveedor..."
            className="flex-1 bg-transparent focus:outline-none"
            style={{ fontSize: '0.95rem' }}
          />
        </div>
      </div>

      {/* Table */}
      <div className="mb-6 overflow-x-auto border border-[#ddd] bg-white">
        <table className="w-full">
          <thead className="bg-[#3a3a3a] text-white">
            <tr>
              <th className="px-6 py-4 text-left font-mono uppercase tracking-wider" style={{ fontSize: '0.75rem' }}>
                Código
              </th>
              <th className="px-6 py-4 text-left font-mono uppercase tracking-wider" style={{ fontSize: '0.75rem' }}>
                Nombre
              </th>
              <th className="px-6 py-4 text-left font-mono uppercase tracking-wider" style={{ fontSize: '0.75rem' }}>
                Proveedor
              </th>
              <th className="px-6 py-4 text-left font-mono uppercase tracking-wider" style={{ fontSize: '0.75rem' }}>
                Cantidad
              </th>
              <th className="px-6 py-4 text-left font-mono uppercase tracking-wider" style={{ fontSize: '0.75rem' }}>
                Costo Unit.
              </th>
              <th className="px-6 py-4 text-left font-mono uppercase tracking-wider" style={{ fontSize: '0.75rem' }}>
                Valor Total
              </th>
              <th className="px-6 py-4 text-center font-mono uppercase tracking-wider" style={{ fontSize: '0.75rem' }}>
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product, index) => (
              <tr
                key={product.id}
                className="border-b border-[#e0e0e0] hover:bg-[#fafafa]"
                style={{ backgroundColor: index % 2 === 0 ? '#ffffff' : '#f9f9f9' }}
              >
                <td className="px-6 py-4 font-mono" style={{ fontSize: '0.9rem' }}>
                  {product.codigo}
                </td>
                <td className="px-6 py-4" style={{ fontSize: '0.95rem', fontWeight: 500 }}>
                  {product.nombre}
                </td>
                <td className="px-6 py-4 text-[#666]" style={{ fontSize: '0.9rem' }}>
                  {product.proveedor}
                </td>
                <td className="px-6 py-4">
                  <div>
                    <p
                      className="font-mono"
                      style={{
                        fontSize: '1.25rem',
                        fontWeight: 700,
                        color: product.cantidad <= product.stockMinimo ? '#FF5722' : '#000'
                      }}
                    >
                      {product.cantidad}
                    </p>
                    <p className="font-mono text-[#999]" style={{ fontSize: '0.75rem' }}>
                      MÍN: {product.stockMinimo}
                    </p>
                  </div>
                </td>
                <td className="px-6 py-4 font-mono" style={{ fontSize: '0.9rem' }}>
                  ${product.costo.toFixed(2)}
                </td>
                <td className="px-6 py-4 font-mono" style={{ fontSize: '1rem', fontWeight: 600 }}>
                  ${(product.cantidad * product.costo).toFixed(2)}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => handleQuickAdjust(product.id, 'entrada')}
                      className="border border-[#28ca42] bg-white p-2 text-[#28ca42] transition-all hover:bg-[#28ca42] hover:text-white"
                      title="Agregar stock"
                    >
                      <Plus size={18} />
                    </button>
                    <button
                      onClick={() => handleQuickAdjust(product.id, 'salida')}
                      className="border border-[#FF5722] bg-white p-2 text-[#FF5722] transition-all hover:bg-[#FF5722] hover:text-white"
                      title="Retirar stock"
                    >
                      <Minus size={18} />
                    </button>
                    <button
                      onClick={() => setEditingProduct(product)}
                      className="border border-[#666] bg-white p-2 text-[#666] transition-all hover:bg-[#666] hover:text-white"
                      title="Editar producto"
                    >
                      <Edit2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredProducts.length === 0 && (
          <div className="p-12 text-center">
            <p className="text-[#999]" style={{ fontSize: '1rem' }}>
              No se encontraron productos
            </p>
          </div>
        )}
      </div>

      {/* Generate Reports Button */}
      <div className="flex justify-end">
        <button
          onClick={() => navigate('/reportes')}
          className="flex items-center gap-2 bg-[#FF5722] px-8 py-4 text-white transition-all hover:bg-[#e64a19]"
          style={{ fontSize: '1rem', fontWeight: 600 }}
        >
          <FileText size={20} />
          GENERAR REPORTES
        </button>
      </div>
    </div>
    </>
  );
}
