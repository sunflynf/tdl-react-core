import { createContext, useState, useEffect } from "react";

const TodoContextOnline = createContext();

const TodoProviderOnline = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const API_URL = "http://localhost:5000/todos"; // Replace with your API endpoint

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch(API_URL, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
      });
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const addTodo = async (todo) => {
    try {
      const response = await fetch(API_URL, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        data: JSON.stringify({
          ...todo,
          id: Date.now().toString(),
          dateCreate: new Date().toISOString(),
          dateFinish: null,
        }),
      });
      setTodos([...todos, response.data]);
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const updateTodo = async (updatedTodo) => {
    try {
      const response = await fetch(`${API_URL}/${updatedTodo.id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
        data: JSON.stringify(updatedTodo),
      });
      setTodos(
        todos.map((todo) => (todo.id === updatedTodo.id ? response.data : todo))
      );
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  return (
    <TodoContextOnline.Provider
      value={{ todos, addTodo, deleteTodo, updateTodo }}
    >
      {children}
    </TodoContextOnline.Provider>
  );
};

export { TodoContextOnline, TodoProviderOnline };