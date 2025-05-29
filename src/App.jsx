import { useState } from "react";
import Navigation from "./components/Navigation";
import ListView from "./views/ListView";
import TableView from "./views/TableView";
import KanbanView from "./views/KanbanView";
import { TodoProvider } from "./contexts/TodoContext";
import "./App.css";

const ROUTES = {
  LIST: "list",
  TABLE: "table",
  CARD: "card",
};

function App() {
  const [currentRoute, setCurrentRoute] = useState(ROUTES.LIST);

  const renderView = () => {
    switch (currentRoute) {
      case ROUTES.LIST:
        return <ListView />;
      case ROUTES.TABLE:
        return <TableView />;
      case ROUTES.CARD:
        return <KanbanView />;
      default:
        return <ListView />;
    }
  };

  return (
    <TodoProvider>
      <div className="app-container">
        <Navigation
          currentRoute={currentRoute}
          setCurrentRoute={setCurrentRoute}
          routes={ROUTES}
        />
        <main className="content">{renderView()}</main>
      </div>
    </TodoProvider>
  );
}

export default App;
