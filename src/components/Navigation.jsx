import { Link } from "../routes/Link";
import { SOURCE_PATH } from "../constant/path";
import "./Navigation.css";

function Navigation() {
  return (
    <nav className="navigation">
      <h1 className="nav-title">Todo App</h1>
      <ul className="nav-links">
        <Link to={SOURCE_PATH + "/list"}>List View</Link>
        <Link to={SOURCE_PATH + "/table"}>Table View</Link>
        <Link to={SOURCE_PATH + "/kanban"}>Kanban View</Link>
      </ul>
    </nav>
  );
}

export default Navigation;
