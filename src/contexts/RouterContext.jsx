import { createContext, useContext, useEffect, useState } from "react";
import { Outlet } from "../routes/Outlet";

export const RouterContext = createContext({
  routes: [],
  currentPath: "",
  navigate: () => {},
});

export const RouterProvider = ({ children, routes = [] }) => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handler = () => setCurrentPath(window.location.pathname);
    window.addEventListener("popstate", handler);
    return () => window.removeEventListener("popstate", handler);
  }, []);

  const navigate = (to) => {
    window.history.pushState({}, "", to);
    setCurrentPath(to);
  };

  return (
    <RouterContext.Provider value={{ routes, currentPath, navigate }}>
      {children}
      <Outlet />
    </RouterContext.Provider>
  );
};

export const useRouterContext = () => useContext(RouterContext);
