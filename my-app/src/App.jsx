import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import './App.css';
import { MainLayout } from './layouts/MainLayout';
import { HomePage } from './pages/HomePage';
import { AlbumPage } from './pages/AlbumPage';
import { SheetsPage } from './pages/SheetsPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<HomePage />} />
      <Route path="/mi-album" element={<AlbumPage />} />
      <Route path="/obtener-laminas" element={<SheetsPage />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
