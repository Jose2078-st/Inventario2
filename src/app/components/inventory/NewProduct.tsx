import { useState } from 'react';
import { useInventory } from '../../contexts/InventoryContext';
import { useNavigate } from 'react-router';
import { CheckCircle, AlertCircle, Save, X } from 'lucide-react';

export function NewProduct() {
  const { addProduct, products } = useInventory();
  const navigate = useNavigate();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [formData, setFormData] = useState({
    nombre: '',
    codigo: '',
    cantidad: '',
    stockMinimo: '',
    proveedor: '',
    costo: ''
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es obligatorio';
    }

    if (!formData.codigo.trim()) {
      newErrors.codigo = 'El código es obligatorio';
    } else if (products.some(p => p.codigo.toLowerCase() === formData.codigo.toLowerCase())) {
      newErrors.codigo = 'Este código ya existe en el sistema';
    }

    if (!formData.cantidad || parseInt(formData.cantidad) < 0) {
      newErrors.cantidad = 'La cantidad debe ser mayor o igual a 0';
    }

    if (!formData.stockMinimo || parseInt(formData.stockMinimo) < 0) {
      newErrors.stockMinimo = 'El stock mínimo debe ser mayor o igual a 0';
    }

    if (!formData.proveedor.trim()) {
      newErrors.proveedor = 'El proveedor es obligatorio';
    }

    if (!formData.costo || parseFloat(formData.costo) <= 0) {
      newErrors.costo = 'El costo debe ser mayor a 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      setMessage({
        type: 'error',
        text: 'Por favor corrija los errores en el formulario antes de continuar'
      });
      return;
    }

    addProduct({
      nombre: formData.nombre.trim(),
      codigo: formData.codigo.trim().toUpperCase(),
      cantidad: parseInt(formData.cantidad),
      stockMinimo: parseInt(formData.stockMinimo),
      proveedor: formData.proveedor.trim(),
      costo: parseFloat(formData.costo)
    });

    setMessage({
      type: 'success',
      text: `Refacción "${formData.nombre}" registrada exitosamente`
    });

    setTimeout(() => {
      navigate('/inventario');
    }, 1500);
  };

  const handleReset = () => {
    setFormData({
      nombre: '',
      codigo: '',
      cantidad: '',
      stockMinimo: '',
      proveedor: '',
      costo: ''
    });
    setErrors({});
    setMessage(null);
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="mb-2" style={{ fontSize: '2.5rem', fontWeight: 700 }}>
          AGREGAR REFACCIÓN
        </h2>
        <p className="font-mono uppercase tracking-wider text-[#666]" style={{ fontSize: '0.75rem' }}>
          Complete todos los campos obligatorios
        </p>
      </div>

      {/* Message Alert */}
      {message && (
        <div
          className={`mb-6 flex items-center gap-3 border p-4 ${
            message.type === 'success'
              ? 'border-[#28ca42] bg-[#f0fff4]'
              : 'border-[#FF5722] bg-[#fff5f5]'
          }`}
        >
          {message.type === 'success' ? (
            <CheckCircle size={20} className="text-[#28ca42]" />
          ) : (
            <AlertCircle size={20} className="text-[#FF5722]" />
          )}
          <p style={{ fontSize: '0.9rem', color: message.type === 'success' ? '#28ca42' : '#FF5722' }}>
            {message.text}
          </p>
        </div>
      )}

      <div className="border border-[#ddd] bg-white p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Código */}
            <div>
              <label className="mb-2 block font-mono uppercase tracking-wider text-[#666]" style={{ fontSize: '0.75rem' }}>
                Código del Producto *
              </label>
              <input
                type="text"
                value={formData.codigo}
                onChange={(e) => handleChange('codigo', e.target.value.toUpperCase())}
                className={`w-full border bg-white px-4 py-3 font-mono focus:outline-none ${
                  errors.codigo ? 'border-[#FF5722] focus:border-[#FF5722]' : 'border-[#ddd] focus:border-[#FF5722]'
                }`}
                placeholder="Ej: FO-001"
              />
              {errors.codigo && (
                <p className="mt-1 text-[#FF5722]" style={{ fontSize: '0.85rem' }}>
                  {errors.codigo}
                </p>
              )}
            </div>

            {/* Nombre */}
            <div>
              <label className="mb-2 block font-mono uppercase tracking-wider text-[#666]" style={{ fontSize: '0.75rem' }}>
                Nombre de la Refacción *
              </label>
              <input
                type="text"
                value={formData.nombre}
                onChange={(e) => handleChange('nombre', e.target.value)}
                className={`w-full border bg-white px-4 py-3 focus:outline-none ${
                  errors.nombre ? 'border-[#FF5722] focus:border-[#FF5722]' : 'border-[#ddd] focus:border-[#FF5722]'
                }`}
                placeholder="Ej: Filtro de Aceite"
              />
              {errors.nombre && (
                <p className="mt-1 text-[#FF5722]" style={{ fontSize: '0.85rem' }}>
                  {errors.nombre}
                </p>
              )}
            </div>

            {/* Proveedor */}
            <div>
              <label className="mb-2 block font-mono uppercase tracking-wider text-[#666]" style={{ fontSize: '0.75rem' }}>
                Proveedor *
              </label>
              <input
                type="text"
                value={formData.proveedor}
                onChange={(e) => handleChange('proveedor', e.target.value)}
                className={`w-full border bg-white px-4 py-3 focus:outline-none ${
                  errors.proveedor ? 'border-[#FF5722] focus:border-[#FF5722]' : 'border-[#ddd] focus:border-[#FF5722]'
                }`}
                placeholder="Ej: AutoPartes SA"
              />
              {errors.proveedor && (
                <p className="mt-1 text-[#FF5722]" style={{ fontSize: '0.85rem' }}>
                  {errors.proveedor}
                </p>
              )}
            </div>

            {/* Costo */}
            <div>
              <label className="mb-2 block font-mono uppercase tracking-wider text-[#666]" style={{ fontSize: '0.75rem' }}>
                Costo Unitario ($) *
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={formData.costo}
                onChange={(e) => handleChange('costo', e.target.value)}
                className={`w-full border bg-white px-4 py-3 font-mono focus:outline-none ${
                  errors.costo ? 'border-[#FF5722] focus:border-[#FF5722]' : 'border-[#ddd] focus:border-[#FF5722]'
                }`}
                placeholder="0.00"
              />
              {errors.costo && (
                <p className="mt-1 text-[#FF5722]" style={{ fontSize: '0.85rem' }}>
                  {errors.costo}
                </p>
              )}
            </div>

            {/* Cantidad Inicial */}
            <div>
              <label className="mb-2 block font-mono uppercase tracking-wider text-[#666]" style={{ fontSize: '0.75rem' }}>
                Cantidad Inicial *
              </label>
              <input
                type="number"
                min="0"
                value={formData.cantidad}
                onChange={(e) => handleChange('cantidad', e.target.value)}
                className={`w-full border bg-white px-4 py-3 font-mono focus:outline-none ${
                  errors.cantidad ? 'border-[#FF5722] focus:border-[#FF5722]' : 'border-[#ddd] focus:border-[#FF5722]'
                }`}
                placeholder="0"
              />
              {errors.cantidad && (
                <p className="mt-1 text-[#FF5722]" style={{ fontSize: '0.85rem' }}>
                  {errors.cantidad}
                </p>
              )}
            </div>

            {/* Stock Mínimo */}
            <div>
              <label className="mb-2 block font-mono uppercase tracking-wider text-[#666]" style={{ fontSize: '0.75rem' }}>
                Stock Mínimo (Alerta) *
              </label>
              <input
                type="number"
                min="0"
                value={formData.stockMinimo}
                onChange={(e) => handleChange('stockMinimo', e.target.value)}
                className={`w-full border bg-white px-4 py-3 font-mono focus:outline-none ${
                  errors.stockMinimo ? 'border-[#FF5722] focus:border-[#FF5722]' : 'border-[#ddd] focus:border-[#FF5722]'
                }`}
                placeholder="0"
              />
              {errors.stockMinimo && (
                <p className="mt-1 text-[#FF5722]" style={{ fontSize: '0.85rem' }}>
                  {errors.stockMinimo}
                </p>
              )}
            </div>
          </div>

          {/* Info Box */}
          <div className="border-l-4 border-[#FF5722] bg-[#fafafa] p-4">
            <p className="mb-2 font-mono uppercase tracking-wider text-[#2b2b2b]" style={{ fontSize: '0.75rem' }}>
              Información Importante:
            </p>
            <ul className="space-y-1 text-[#666]" style={{ fontSize: '0.9rem' }}>
              <li>• Todos los campos marcados con * son obligatorios</li>
              <li>• El código del producto debe ser único en el sistema</li>
              <li>• El stock mínimo se usa para generar alertas automáticas</li>
              <li>• La cantidad inicial puede ser 0 si aún no hay inventario</li>
            </ul>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 border-t border-[#e0e0e0] pt-6">
            <button
              type="submit"
              className="flex items-center gap-2 bg-[#FF5722] px-8 py-4 text-white transition-all hover:bg-[#e64a19]"
              style={{ fontWeight: 600 }}
            >
              <Save size={20} />
              REGISTRAR REFACCIÓN
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center gap-2 border border-[#ddd] bg-white px-8 py-4 text-[#666] transition-all hover:bg-[#f5f5f5]"
              style={{ fontWeight: 600 }}
            >
              <X size={20} />
              Limpiar Formulario
            </button>
            <button
              type="button"
              onClick={() => navigate('/inventario')}
              className="flex items-center gap-2 border border-[#ddd] bg-white px-8 py-4 text-[#666] transition-all hover:bg-[#f5f5f5]"
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
