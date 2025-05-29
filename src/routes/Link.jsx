import { useRouterContext } from "../contexts/RouterContext";

export const Link = ({ to, children, disabled = false, style }) => {
  const { navigate, currentPath } = useRouterContext();

  const onClick = (e) => {
    if (disabled) return;
    if (e.metaKey || e.ctrlKey) return;
    e.preventDefault();
    navigate(to);
  };

  return (
    <li
      onClick={onClick}
      className={`nav-item ${currentPath === to ? "active" : ""}`}
      style={style}
    >
      {children}
    </li>
  );
};
