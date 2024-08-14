import 'bootstrap/dist/css/bootstrap.min.css';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { HomePage } from './pages/HomePage';
import { AlbumPage } from './pages/AlbumPage';
import { SheetsPage } from './pages/SheetsPage';
import { GlobalProvider } from './contexts/GlobalProvider';

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
  return (
    <GlobalProvider>
      <RouterProvider router={router} />
    </GlobalProvider>
  );
}

export default App;
