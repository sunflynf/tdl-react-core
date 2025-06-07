import { createContext, useEffect, useState } from 'react';
import Navigation from '../components/Navigation';
import { Outlet } from '../routes/Outlet';

const RouterContext = createContext({
  routes: [],
  currentPath: '',
  navigate: () => {},
});

const RouterProvider = ({ routes = [] }) => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handler = () => setCurrentPath(window.location.pathname);
    window.addEventListener('popstate', handler);
    return () => window.removeEventListener('popstate', handler);
  }, []);

  const navigate = (to) => {
    window.history.pushState({}, '', to);
    setCurrentPath(to);
  };

  return (
    <RouterContext.Provider value={{ routes, currentPath, navigate }}>
      <div className="app-container">
        <Navigation />
        <main className="content">
          <Outlet />
        </main>
      </div>
    </RouterContext.Provider>
  );
};

export { RouterContext, RouterProvider };
