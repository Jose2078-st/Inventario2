import { createBrowserRouter, Navigate } from 'react-router';
import { Login } from './components/inventory/Login';
import { DashboardLayout } from './components/inventory/DashboardLayout';
import { Dashboard } from './components/inventory/Dashboard';
import { Inventory } from './components/inventory/Inventory';
import { Sales } from './components/inventory/Sales';
import { History } from './components/inventory/History';
import { NewProduct } from './components/inventory/NewProduct';
import { Reports } from './components/inventory/Reports';

export const router = createBrowserRouter([
  {
    path: '/login',
    Component: Login
  },
  {
    path: '/',
    Component: DashboardLayout,
    children: [
      { index: true, element: <Navigate to="/inicio" replace /> },
      { path: 'inicio', Component: Dashboard },
      { path: 'inventario', Component: Inventory },
      { path: 'ventas', Component: Sales },
      { path: 'movimientos', Component: History },
      { path: 'agregar-refaccion', Component: NewProduct },
      { path: 'reportes', Component: Reports },
      { path: '*', element: <Navigate to="/inicio" replace /> }
    ]
  }
]);
