import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useInventory } from '../../contexts/InventoryContext';
import { AlertCircle, LogIn } from 'lucide-react';

export function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login, isAuthenticated } = useInventory();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/inicio');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError('Por favor complete todos los campos');
      return;
    }

    const success = login(username, password);
    if (success) {
      navigate('/inicio');
    } else {
      setError('Usuario o contraseña incorrectos');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#3a3a3a]">
      <div className="w-full max-w-md border border-[#555] bg-white p-10">
        <div className="mb-8 text-center">
          <h1 className="mb-2" style={{ fontSize: '2rem', fontWeight: 700 }}>
            SISTEMA DE INVENTARIO
          </h1>
          <p className="font-mono uppercase tracking-widest text-[#999]" style={{ fontSize: '0.7rem' }}>
            Refaccionaria
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="flex items-center gap-3 border border-[#FF5722] bg-[#fff5f5] p-4">
              <AlertCircle size={20} className="text-[#FF5722]" />
              <p className="text-[#FF5722]" style={{ fontSize: '0.9rem' }}>
                {error}
              </p>
            </div>
          )}

          <div>
            <label className="mb-2 block font-mono uppercase tracking-wider text-[#2b2b2b]" style={{ fontSize: '0.75rem' }}>
              Usuario
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border border-[#ddd] bg-white px-4 py-3 focus:border-[#FF5722] focus:outline-none"
              placeholder="Ingrese su usuario"
              autoFocus
            />
          </div>

          <div>
            <label className="mb-2 block font-mono uppercase tracking-wider text-[#2b2b2b]" style={{ fontSize: '0.75rem' }}>
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-[#ddd] bg-white px-4 py-3 focus:border-[#FF5722] focus:outline-none"
              placeholder="Ingrese su contraseña"
            />
          </div>

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 bg-[#FF5722] px-6 py-4 text-white transition-all hover:bg-[#e64a19]"
            style={{ fontWeight: 600 }}
          >
            <LogIn size={20} />
            Iniciar Sesión
          </button>
        </form>

        <div className="mt-8 border-t border-[#e0e0e0] pt-6">
          <p className="mb-2 text-center font-mono uppercase tracking-wider text-[#999]" style={{ fontSize: '0.7rem' }}>
            Usuarios de Prueba:
          </p>
          <div className="space-y-1 text-center" style={{ fontSize: '0.85rem' }}>
            <p className="text-[#666]">admin / admin123</p>
            <p className="text-[#666]">usuario / user123</p>
          </div>
        </div>
      </div>
    </div>
  );
}
