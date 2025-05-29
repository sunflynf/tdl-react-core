import "./Navigation.css";

const NavigationItem = ({ isCurrentRoute = false, onClick, title }) => {
  return (
    <li
      className={`nav-item ${isCurrentRoute ? "active" : ""}`}
      onClick={onClick}
    >
      {title}
    </li>
  );
};

function Navigation({ currentRoute, setCurrentRoute, routes }) {
  const items = [
    {
      title: "List View",
      route: routes.LIST,
    },
    {
      title: "Table View",
      route: routes.TABLE,
    },
    {
      title: "Kanban View",
      route: routes.CARD,
    },
  ];

  return (
    <nav className="navigation">
      <h1 className="nav-title">Todo App</h1>
      <ul className="nav-links">
        {items.map((item) => (
          <NavigationItem
            key={item.title}
            isCurrentRoute={currentRoute === item.route}
            onClick={() => setCurrentRoute(item.route)}
            title={item.title}
          />
        ))}
      </ul>
    </nav>
  );
}

export default Navigation;
