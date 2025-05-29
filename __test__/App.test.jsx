import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../src/App";

describe("App", () => {
  test("renders navigation with three views", () => {
    render(<App />);

    expect(screen.getByText("List View")).toBeInTheDocument();
    expect(screen.getByText("Table View")).toBeInTheDocument();
    expect(screen.getByText("Card View")).toBeInTheDocument();
  });

  test("navigates between views when clicking on nav items", async () => {
    render(<App />);
    const user = userEvent.setup();

    // Should start with List View
    expect(screen.getByText("Todo List")).toBeInTheDocument();

    // Click on Table View
    await user.click(screen.getByText("Table View"));
    expect(screen.getByText("Todo Table")).toBeInTheDocument();

    // Click on Card View
    await user.click(screen.getByText("Card View"));
    expect(screen.getByText("Todo Cards")).toBeInTheDocument();

    // Back to List View
    await user.click(screen.getByText("List View"));
    expect(screen.getByText("Todo List")).toBeInTheDocument();
  });
});
