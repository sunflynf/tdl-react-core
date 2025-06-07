import { createContext, useState, useEffect } from 'react';

const TodoContext = createContext();

const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (todo) => {
    const newTodo = {
      ...todo,
      id: Date.now().toString(),
      dateCreate: new Date().toISOString(),
      dateFinish: null,
    };
    setTodos([...todos, newTodo]);
  };

  const updateTodo = (id, updatedTodo) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        // Update dateFinish only if status changes to "Done"
        const dateFinish =
          updatedTodo.status === 'Done' && todo.status !== 'Done'
            ? new Date().toISOString()
            : updatedTodo.status !== 'Done'
            ? null
            : todo.dateFinish;

        return {
          ...todo,
          ...updatedTodo,
          dateFinish,
        };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const deleteTodo = (id) => {
    const filteredTodos = todos.filter((todo) => todo.id !== id);
    setTodos(filteredTodos);
  };

  const changeStatus = (id, status) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        const dateFinish = status === 'Done' ? new Date().toISOString() : null;
        return {
          ...todo,
          status,
          dateFinish,
        };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        addTodo,
        updateTodo,
        deleteTodo,
        changeStatus,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export { TodoContext, TodoProvider };
