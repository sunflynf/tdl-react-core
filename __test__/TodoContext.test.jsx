import { use } from 'react';
import { render, screen, act } from '@testing-library/react';
import { TodoContext, TodoProvider } from '../src/contexts/TodoContext';

// Mock component to test context
const TestComponent = () => {
  const { todos, addTodo, updateTodo, deleteTodo, changeStatus } = use(TodoContext);

  return (
    <div>
      <div data-testid="todo-count">{todos.length}</div>
      <button
        onClick={() =>
          addTodo({
            title: 'Test Todo',
            description: 'Test description',
            dateEnd: '2023-12-31',
            status: 'To do',
          })
        }
      >
        Add Todo
      </button>
      {todos.map((todo) => (
        <div key={todo.id} data-testid={`todo-${todo.id}`}>
          <span>{todo.title}</span>
          <button onClick={() => updateTodo(todo.id, { ...todo, title: 'Updated Todo' })}>Update</button>
          <button onClick={() => changeStatus(todo.id, 'Done')}>Mark Done</button>
          <button onClick={() => deleteTodo(todo.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

describe('TodoContext', () => {
  beforeEach(() => {
    // Clear local storage before each test
    localStorage.clear();
  });

  test('provides initial empty todos array', () => {
    render(
      <TodoProvider>
        <TestComponent />
      </TodoProvider>
    );

    expect(screen.getByTestId('todo-count').textContent).toBe('0');
  });

  test('can add a new todo', async () => {
    render(
      <TodoProvider>
        <TestComponent />
      </TodoProvider>
    );

    // Initial state
    expect(screen.getByTestId('todo-count').textContent).toBe('0');

    // Add a todo
    await act(async () => {
      screen.getByText('Add Todo').click();
    });

    // Should have one todo now
    expect(screen.getByTestId('todo-count').textContent).toBe('1');
    expect(screen.getByText('Test Todo')).toBeInTheDocument();
  });

  test('can update an existing todo', async () => {
    render(
      <TodoProvider>
        <TestComponent />
      </TodoProvider>
    );

    // Add a todo first
    await act(async () => {
      screen.getByText('Add Todo').click();
    });

    // Verify it's added
    expect(screen.getByText('Test Todo')).toBeInTheDocument();

    // Update the todo
    const todoElement = screen.getByText('Test Todo').closest('[data-testid^="todo-"]');
    await act(async () => {
      todoElement.querySelector('button:nth-child(2)').click(); // Update button
    });

    // Verify it's updated
    expect(screen.getByText('Updated Todo')).toBeInTheDocument();
    expect(screen.queryByText('Test Todo')).not.toBeInTheDocument();
  });

  test('can change status of a todo', async () => {
    const { container } = render(
      <TodoProvider>
        <TestComponent />
      </TodoProvider>
    );

    // Add a todo first
    await act(async () => {
      screen.getByText('Add Todo').click();
    });

    // Change status to Done
    const todoElement = screen.getByText('Test Todo').closest('[data-testid^="todo-"]');
    await act(async () => {
      todoElement.querySelector('button:nth-child(3)').click(); // Mark Done button
    });

    // The test component doesn't show status, but we can check
    // that the context change was processed (via localStorage inspection)
    const storedTodos = JSON.parse(localStorage.getItem('todos'));
    expect(storedTodos[0].status).toBe('Done');
    expect(storedTodos[0].dateFinish).not.toBeNull();
  });

  test('can delete a todo', async () => {
    render(
      <TodoProvider>
        <TestComponent />
      </TodoProvider>
    );

    // Add a todo first
    await act(async () => {
      screen.getByText('Add Todo').click();
    });

    // Initial state
    expect(screen.getByTestId('todo-count').textContent).toBe('1');

    // Delete the todo
    const todoElement = screen.getByText('Test Todo').closest('[data-testid^="todo-"]');
    await act(async () => {
      todoElement.querySelector('button:nth-child(4)').click(); // Delete button
    });

    // Should have no todos now
    expect(screen.getByTestId('todo-count').textContent).toBe('0');
    expect(screen.queryByText('Test Todo')).not.toBeInTheDocument();
  });
});
