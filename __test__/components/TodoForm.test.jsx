import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoForm from '../../src/components/Forms/TodoForm';
import { TodoProvider } from '../../src/contexts/TodoContext';

describe('TodoForm', () => {
  test('renders form with empty fields in add mode', () => {
    render(
      <TodoProvider>
        <TodoForm mode="add" onClose={jest.fn()} onSave={jest.fn()} />
      </TodoProvider>
    );

    expect(screen.getByText('Add New Todo')).toBeInTheDocument();
    expect(screen.getByLabelText('Title')).toHaveValue('');
    expect(screen.getByLabelText('Description')).toHaveValue('');
    expect(screen.getByLabelText('Due Date')).toHaveValue('');
    expect(screen.getByLabelText('Status')).toHaveValue('To do');
  });

  test('renders form with todo data in edit mode', () => {
    const mockTodo = {
      id: '123',
      title: 'Test Todo',
      description: 'Test Description',
      dateEnd: '2025-12-31',
      status: 'Doing',
      dateCreate: '2025-01-01T00:00:00.000Z',
    };

    render(
      <TodoProvider>
        <TodoForm mode="edit" todo={mockTodo} onClose={jest.fn()} onSave={jest.fn()} />
      </TodoProvider>
    );

    expect(screen.getByText('Edit Todo')).toBeInTheDocument();
    expect(screen.getByLabelText('Title')).toHaveValue('Test Todo');
    expect(screen.getByLabelText('Description')).toHaveValue('Test Description');
    expect(screen.getByLabelText('Due Date')).toHaveValue('2025-12-31');
    expect(screen.getByLabelText('Status')).toHaveValue('Doing');
  });

  test('calls onClose when cancel button is clicked', async () => {
    const mockOnClose = jest.fn();

    render(
      <TodoProvider>
        <TodoForm mode="add" onClose={mockOnClose} onSave={jest.fn()} />
      </TodoProvider>
    );

    await userEvent.click(screen.getByText('Cancel'));
    expect(mockOnClose).toHaveBeenCalled();
  });

  test('calls onSave when form is submitted', async () => {
    const mockOnSave = jest.fn();
    const user = userEvent.setup();

    render(
      <TodoProvider>
        <TodoForm mode="add" onClose={jest.fn()} onSave={mockOnSave} />
      </TodoProvider>
    );

    // Fill in the form
    await user.type(screen.getByLabelText('Title'), 'New Todo');
    await user.type(screen.getByLabelText('Description'), 'New Description');
    await user.type(screen.getByLabelText('Due Date'), '2026-01-01');

    // Submit the form
    // https://stackoverflow.com/questions/62216232/error-not-implemented-htmlformelement-prototype-submit
    fireEvent.click(screen.getByText('Add Todo'));

    await waitFor(() => {
      expect(mockOnSave).toHaveBeenCalled();
    });
  });
});
