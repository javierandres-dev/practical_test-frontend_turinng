import { Outlet } from 'react-router-dom';
import { NavigationComponent } from '../components/NavigationComponent';

export const MainLayout = () => {
  return (
    <>
      <NavigationComponent />
      <Outlet />
    </>
  );
};
