import { use } from 'react';
import { RouterContext } from '../contexts/RouterContext';
import NotFound from '../pages/NotFound';

export const Outlet = () => {
  const { routes } = use(RouterContext);
  const { pathname } = window.location;

  const current = routes.find((route) => route.to === pathname);
  if (current) {
    const Component = current.component;
    return <Component />;
  }
  return <NotFound />;
};
