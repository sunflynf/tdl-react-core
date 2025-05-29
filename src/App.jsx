import { TodoProvider } from "./contexts/TodoContext";
import { RouterProvider } from "./contexts/RouterContext";
import Navigation from "./components/Navigation";
import { Outlet } from "./routes/Outlet";
import { routes } from "./routes";

import "./App.css";

function App() {
  return (
    <TodoProvider>
      <RouterProvider routes={routes}>
        <div className="app-container">
          <Navigation />
          <main className="content">
            <Outlet />
          </main>
        </div>
      </RouterProvider>
    </TodoProvider>
  );
}

export default App;
