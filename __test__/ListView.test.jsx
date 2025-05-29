import { render, screen, fireEvent } from "@testing-library/react";
import ListView from "../src/views/ListView";
import { TodoProvider } from "../src/contexts/TodoContext";

// Mock the TodoForm and ConfirmDialog components
jest.mock("../src/components/TodoForm", () => {
  return function MockTodoForm({ onSave }) {
    return (
      <div data-testid="todo-form">
        Mock Todo Form
        <button onClick={onSave}>Save</button>
      </div>
    );
  };
});

jest.mock("../src/components/ConfirmDialog", () => {
  return function MockConfirmDialog({ onConfirm, onCancel }) {
    return (
      <div data-testid="confirm-dialog">
        Mock Confirm Dialog
        <button onClick={onConfirm}>Confirm</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    );
  };
});

describe("ListView", () => {
  test("renders empty state when no todos", () => {
    render(
      <TodoProvider>
        <ListView />
      </TodoProvider>
    );

    expect(
      screen.getByText("No todos yet. Add one to get started!")
    ).toBeInTheDocument();
    expect(screen.getByText("Add Todo")).toBeInTheDocument();
  });

  test("shows add form when add button is clicked", () => {
    render(
      <TodoProvider>
        <ListView />
      </TodoProvider>
    );

    fireEvent.click(screen.getByText("Add Todo"));
    expect(screen.getByTestId("todo-form")).toBeInTheDocument();
  });

  test("closes add form when save is clicked", () => {
    render(
      <TodoProvider>
        <ListView />
      </TodoProvider>
    );

    // Open form
    fireEvent.click(screen.getByText("Add Todo"));
    expect(screen.getByTestId("todo-form")).toBeInTheDocument();

    // Save and close form
    fireEvent.click(screen.getByText("Save"));
    expect(screen.queryByTestId("todo-form")).not.toBeInTheDocument();
  });
});
