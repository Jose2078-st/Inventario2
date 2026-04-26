import { RouterProvider } from 'react-router';
import { router } from './routes';
import { InventoryProvider } from './contexts/InventoryContext';

export default function App() {
  return (
    <InventoryProvider>
      <RouterProvider router={router} />
    </InventoryProvider>
  );
}