import { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';
import { Product } from '../../contexts/InventoryContext';

interface EditProductModalProps {
  product: Product;
  onSave: (id: string, updates: Partial<Product>) => void;
  onClose: () => void;
}

export function EditProductModal({ product, onSave, onClose }: EditProductModalProps) {
  const [formData, setFormData] = useState({
    nombre: product.nombre,
    proveedor: product.proveedor,
    costo: product.costo.toString(),
    stockMinimo: product.stockMinimo.toString()
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSave(product.id, {
      nombre: formData.nombre,
      proveedor: formData.proveedor,
      costo: parseFloat(formData.costo),
      stockMinimo: parseInt(formData.stockMinimo)
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
      <div className="w-full max-w-2xl border border-[#ddd] bg-white p-8" onClick={(e) => e.stopPropagation()}>
        <div className="mb-6 flex items-center justify-between border-b border-[#ddd] pb-4">
          <div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700 }}>
              EDITAR REFACCIÓN
            </h3>
            <p className="font-mono text-[#999]" style={{ fontSize: '0.85rem' }}>
              {product.codigo}
            </p>
          </div>
          <button
            onClick={onClose}
            className="border border-[#ddd] p-2 transition-all hover:bg-[#f5f5f5]"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block font-mono uppercase tracking-wider text-[#666]" style={{ fontSize: '0.75rem' }}>
                Nombre *
              </label>
              <input
                type="text"
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                className="w-full border border-[#ddd] bg-white px-4 py-3 focus:border-[#FF5722] focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="mb-2 block font-mono uppercase tracking-wider text-[#666]" style={{ fontSize: '0.75rem' }}>
                Proveedor *
              </label>
              <input
                type="text"
                value={formData.proveedor}
                onChange={(e) => setFormData({ ...formData, proveedor: e.target.value })}
                className="w-full border border-[#ddd] bg-white px-4 py-3 focus:border-[#FF5722] focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="mb-2 block font-mono uppercase tracking-wider text-[#666]" style={{ fontSize: '0.75rem' }}>
                Costo Unitario ($) *
              </label>
              <input
                type="number"
                step="0.01"
                min="0.01"
                value={formData.costo}
                onChange={(e) => setFormData({ ...formData, costo: e.target.value })}
                className="w-full border border-[#ddd] bg-white px-4 py-3 focus:border-[#FF5722] focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="mb-2 block font-mono uppercase tracking-wider text-[#666]" style={{ fontSize: '0.75rem' }}>
                Stock Mínimo *
              </label>
              <input
                type="number"
                min="0"
                value={formData.stockMinimo}
                onChange={(e) => setFormData({ ...formData, stockMinimo: e.target.value })}
                className="w-full border border-[#ddd] bg-white px-4 py-3 focus:border-[#FF5722] focus:outline-none"
                required
              />
            </div>
          </div>

          <div className="border-l-4 border-[#FF5722] bg-[#fafafa] p-3">
            <p className="text-[#666]" style={{ fontSize: '0.85rem' }}>
              Nota: El código del producto no puede ser modificado. Para cambiar la cantidad, use los botones +/- en el inventario.
            </p>
          </div>

          <div className="flex gap-3 border-t border-[#ddd] pt-4">
            <button
              type="submit"
              className="flex items-center gap-2 bg-[#FF5722] px-6 py-3 text-white transition-all hover:bg-[#e64a19]"
              style={{ fontWeight: 600 }}
            >
              <Save size={18} />
              GUARDAR CAMBIOS
            </button>
            <button
              type="button"
              onClick={onClose}
              className="border border-[#ddd] px-6 py-3 text-[#666] transition-all hover:bg-[#f5f5f5]"
              style={{ fontWeight: 600 }}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
