import { render, screen, fireEvent } from '@testing-library/react';
import ConfirmDialog from '../../src/components/Dialogs/ConfirmDialog';

describe('ConfirmDialog', () => {
  test('renders message and buttons', () => {
    render(<ConfirmDialog message="Are you sure?" onConfirm={jest.fn()} onCancel={jest.fn()} />);

    expect(screen.getByText('Are you sure?')).toBeInTheDocument();
    expect(screen.getByText('Confirm')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  test('calls onConfirm when confirm button is clicked', () => {
    const mockOnConfirm = jest.fn();

    render(<ConfirmDialog message="Are you sure?" onConfirm={mockOnConfirm} onCancel={jest.fn()} />);

    fireEvent.click(screen.getByText('Confirm'));
    expect(mockOnConfirm).toHaveBeenCalled();
  });

  test('calls onCancel when cancel button is clicked', () => {
    const mockOnCancel = jest.fn();

    render(<ConfirmDialog message="Are you sure?" onConfirm={jest.fn()} onCancel={mockOnCancel} />);

    fireEvent.click(screen.getByText('Cancel'));
    expect(mockOnCancel).toHaveBeenCalled();
  });
});
