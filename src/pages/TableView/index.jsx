import { use, useState } from 'react';
import { TodoContext } from '../../contexts/TodoContext';
import ConfirmDialog from '../../components/Dialogs/ConfirmDialog';

import { TodoEditRow } from './TodoEditRow';
import { TodoRow } from './TodoRow';
import './TableView.css';

function TableView() {
  const { todos, addTodo, updateTodo, deleteTodo } = use(TodoContext);
  const [isAddingTodo, setIsAddingTodo] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState(null);
  const [editingTodo, setEditingTodo] = useState(null);

  const startEdit = (todo) => {
    setEditingTodo({ ...todo });
  };

  const cancelEdit = () => {
    setEditingTodo(null);
  };

  const handleDelete = (todo) => {
    setTodoToDelete(todo);
    setShowConfirmDialog(true);
  };

  const confirmDelete = () => {
    deleteTodo(todoToDelete.id);
    setShowConfirmDialog(false);
    setTodoToDelete(null);
  };

  return (
    <div className="table-view">
      <h2>Todo Table</h2>

      <table className="todo-table">
        <colgroup>
          <col style={{ width: '20%' }} />
          <col style={{ width: '32%' }} />
          <col style={{ width: '18%' }} />
          <col style={{ width: '15%' }} />
          <col style={{ width: '15%' }} />
        </colgroup>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Due Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <>
              {editingTodo && editingTodo.id === todo.id ? (
                <TodoEditRow
                  key={todo.id}
                  todo={editingTodo}
                  onSave={(updated) => {
                    updateTodo(editingTodo.id, updated);
                    setEditingTodo(null);
                  }}
                  onCancel={cancelEdit}
                />
              ) : (
                <TodoRow
                  key={todo.id}
                  todo={todo}
                  onEdit={isAddingTodo ? undefined : startEdit} // Block edit if adding
                  onDelete={isAddingTodo ? undefined : handleDelete}
                />
              )}
            </>
          ))}
          {isAddingTodo && !editingTodo && (
            <TodoEditRow
              todo={{
                title: '',
                description: '',
                dateEnd: '',
                status: 'To do',
              }}
              onSave={(newTodo) => {
                addTodo(newTodo);
                setIsAddingTodo(false);
              }}
              onCancel={() => setIsAddingTodo(false)}
              mode="add"
            />
          )}
        </tbody>
      </table>

      {!isAddingTodo && !editingTodo && (
        <button className="add-button" onClick={() => setIsAddingTodo(true)}>
          Add Todo
        </button>
      )}

      {/* Confirm Delete Dialog */}
      {showConfirmDialog && (
        <ConfirmDialog
          message={`Are you sure you want to delete "${todoToDelete.title}"?`}
          onConfirm={confirmDelete}
          onCancel={() => setShowConfirmDialog(false)}
        />
      )}
    </div>
  );
}

export default TableView;
