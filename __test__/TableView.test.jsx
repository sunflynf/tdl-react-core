import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TableView from "../src/views/TableView";
import { TodoProvider } from "../src/contexts/TodoContext";

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

describe("TableView", () => {
  test("shows add row when add button is clicked", async () => {
    render(
      <TodoProvider>
        <TableView />
      </TodoProvider>
    );

    // Initially there's an add button
    const addButton = screen.getByText("Add Todo");
    expect(addButton).toBeInTheDocument();

    // Click on add button
    await userEvent.click(addButton);

    // Add form should appear with save and cancel buttons
    expect(screen.getByPlaceholderText("Title")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Description")).toBeInTheDocument();
    expect(screen.getByText("Save")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
  });

  test("cancels adding when cancel button is clicked", async () => {
    render(
      <TodoProvider>
        <TableView />
      </TodoProvider>
    );

    // Click add button
    await userEvent.click(screen.getByText("Add Todo"));

    // Cancel adding
    await userEvent.click(screen.getByText("Cancel"));

    // Form should disappear
    expect(screen.queryByPlaceholderText("Title")).not.toBeInTheDocument();
    expect(screen.getByText("Add Todo")).toBeInTheDocument();
  });
});
