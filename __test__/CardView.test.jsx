import { render, screen, fireEvent } from "@testing-library/react";
import CardView from "../src/views/CardView";
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

describe("CardView", () => {
  test("renders all three status columns", () => {
    render(
      <TodoProvider>
        <CardView />
      </TodoProvider>
    );

    expect(screen.getByText("To do")).toBeInTheDocument();
    expect(screen.getByText("Doing")).toBeInTheDocument();
    expect(screen.getByText("Done")).toBeInTheDocument();
  });

  test("shows empty state for each column when no todos", () => {
    render(
      <TodoProvider>
        <CardView />
      </TodoProvider>
    );

    // There should be three "No tasks" messages (one for each column)
    const emptyStates = screen.getAllByText("No tasks");
    expect(emptyStates.length).toBe(3);
  });

  test("shows add form when add button is clicked", () => {
    render(
      <TodoProvider>
        <CardView />
      </TodoProvider>
    );

    fireEvent.click(screen.getByText("Add Todo"));
    expect(screen.getByTestId("todo-form")).toBeInTheDocument();
  });
});
