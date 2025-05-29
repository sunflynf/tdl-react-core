import NotFound from "../views/NotFound";
import { useRouterContext } from "../contexts/RouterContext";

export const Outlet = () => {
  const { routes } = useRouterContext();
  const { pathname } = window.location;

  const current = routes.find((route) => route.to === pathname);
  if (current) {
    const Component = current.component;
    return <Component />;
  }
  return <NotFound />;
};
