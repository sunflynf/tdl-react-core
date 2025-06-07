import { use } from 'react';
import { RouterContext } from '../contexts/RouterContext';

export const Link = ({ to, children, disabled = false, style }) => {
  const { navigate, currentPath } = use(RouterContext); // Feature: useRouterContext is replaced with RouterContext from contexts

  const isCurrentPath = currentPath === to || (to.includes('/list') && currentPath.endsWith('/'));

  const onClick = (e) => {
    if (disabled) return;
    if (e.metaKey || e.ctrlKey) return;
    e.preventDefault();
    navigate(to);
  };

  return (
    <li onClick={onClick} className={`nav-item ${isCurrentPath ? 'active' : ''}`} style={style}>
      {children}
    </li>
  );
};
