import { use, useState } from 'react';
import { TodoContext } from '../../contexts/TodoContext';
import TodoForm from '../../components/Forms/TodoForm';
import ConfirmDialog from '../../components/Dialogs/ConfirmDialog';
import { formatDate } from '../../utils/format';

import './ListView.css';

export default function ListView() {
  const { todos, deleteTodo, changeStatus } = use(TodoContext);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);

  const handleStatusChange = (todo) => {
    const statusOrder = ['To do', 'Doing', 'Done'];
    const currentIndex = statusOrder.indexOf(todo.status);
    const nextIndex = (currentIndex + 1) % statusOrder.length;
    changeStatus(todo.id, statusOrder[nextIndex]);
  };

  const handleEdit = (todo) => {
    setCurrentTodo(todo);
    setShowEditForm(true);
  };

  const handleDelete = (todo) => {
    setCurrentTodo(todo);
    setShowConfirmDialog(true);
  };

  const confirmDelete = () => {
    deleteTodo(currentTodo.id);
    setShowConfirmDialog(false);
  };

  return (
    <div className="list-view">
      <div className="list-header">
        <h2>Todo List</h2>
        <button className="add-button" onClick={() => setShowAddForm(true)}>
          Add Todo
        </button>
      </div>

      <div className="todo-list">
        {todos.length === 0 ? (
          <p className="empty-state">No todos yet. Add one to get started!</p>
        ) : (
          todos.map((todo) => (
            <div key={todo.id} className={`todo-item status-${todo.status.toLowerCase().replace(' ', '-')}`}>
              <div className="todo-content">
                <h3>{todo.title}</h3>
                <p className="description">{todo.description}</p>
                <div className="todo-meta">
                  <span>Due: {formatDate(todo.dateEnd)}</span>
                  <span>Created: {formatDate(todo.dateCreate)}</span>
                  {todo.dateFinish && <span>Finished: {formatDate(todo.dateFinish)}</span>}
                </div>
              </div>
              <div className="todo-actions">
                <button
                  className={`status-toggle status-${todo.status.toLowerCase().replace(' ', '-')}`}
                  onClick={() => handleStatusChange(todo)}
                >
                  {todo.status}
                </button>
                <div className="action-buttons">
                  <button className="edit-button" onClick={() => handleEdit(todo)}>
                    Edit
                  </button>
                  <button className="delete-button" onClick={() => handleDelete(todo)}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Todo Dialog */}
      {showAddForm && (
        <TodoForm onClose={() => setShowAddForm(false)} onSave={() => setShowAddForm(false)} mode="add" />
      )}

      {/* Edit Todo Dialog */}
      {showEditForm && (
        <TodoForm
          todo={currentTodo}
          onClose={() => setShowEditForm(false)}
          onSave={() => setShowEditForm(false)}
          mode="edit"
        />
      )}

      {/* Confirm Delete Dialog */}
      {showConfirmDialog && (
        <ConfirmDialog
          message={`Are you sure you want to delete "${currentTodo.title}"?`}
          onConfirm={confirmDelete}
          onCancel={() => setShowConfirmDialog(false)}
        />
      )}
    </div>
  );
}
