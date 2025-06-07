import { TodoProvider } from './contexts/TodoContext';
import { RouterProvider } from './contexts/RouterContext';
import { routes } from './routes';

import './App.css';

function App() {
  return (
    <TodoProvider>
      <RouterProvider routes={routes} />
    </TodoProvider>
  );
}

export default App;
