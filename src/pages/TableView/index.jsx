import { use, useState } from 'react';
import { TodoContext } from '../../contexts/TodoContext';
import ConfirmDialog from '../../components/Dialogs/ConfirmDialog';
import { formatDateForTable as formatDate } from '../../utils/format';
import './TableView.css';

function TableView() {
  const { todos, addTodo, updateTodo, deleteTodo } = use(TodoContext);
  const [isAddingTodo, setIsAddingTodo] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState(null);
  const [editingTodo, setEditingTodo] = useState(null);
  const [newTodo, setNewTodo] = useState({
    title: '',
    description: '',
    dateEnd: '',
    status: 'To do',
  });

  const today = new Date().toISOString().split('T')[0];

  const handleInputChange = (e, id = null) => {
    const { name, value } = e.target;

    if (id) {
      // Editing existing todo
      setEditingTodo({
        ...editingTodo,
        [name]: value,
      });
    } else {
      // Adding new todo
      setNewTodo({
        ...newTodo,
        [name]: value,
      });
    }
  };

  const handleAddSave = () => {
    addTodo(newTodo);
    setNewTodo({
      title: '',
      description: '',
      dateEnd: '',
      status: 'To do',
    });
    setIsAddingTodo(false);
  };

  const handleEditSave = () => {
    updateTodo(editingTodo.id, editingTodo);
    setEditingTodo(null);
  };

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
            <tr key={todo.id} className={`status-${todo.status.toLowerCase().replace(' ', '-')}`}>
              {editingTodo && editingTodo.id === todo.id ? (
                <>
                  <td>
                    <input
                      type="text"
                      name="title"
                      value={editingTodo.title}
                      onChange={(e) => handleInputChange(e, todo.id)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="description"
                      value={editingTodo.description}
                      onChange={(e) => handleInputChange(e, todo.id)}
                    />
                  </td>
                  <td>
                    <input
                      type="date"
                      name="dateEnd"
                      value={formatDate(editingTodo.dateEnd)}
                      onChange={(e) => handleInputChange(e, todo.id)}
                      min={today}
                    />
                  </td>
                  <td>
                    <select name="status" value={editingTodo.status} onChange={(e) => handleInputChange(e, todo.id)}>
                      <option value="To do">To do</option>
                      <option value="Doing">Doing</option>
                      <option value="Done">Done</option>
                    </select>
                  </td>
                  <td className="action-cell">
                    <button className="save-button" onClick={handleEditSave}>
                      Save
                    </button>
                    <button className="cancel-button" onClick={cancelEdit}>
                      Cancel
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td>{todo.title}</td>
                  <td className="description-cell">{todo.description}</td>
                  <td>{todo.dateEnd ? new Date(todo.dateEnd).toLocaleDateString() : 'N/A'}</td>
                  <td>{todo.status}</td>
                  <td className="action-cell">
                    <button className="edit-button" onClick={() => startEdit(todo)}>
                      Edit
                    </button>
                    <button className="delete-button" onClick={() => handleDelete(todo)}>
                      Delete
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
          {isAddingTodo && (
            <tr className="new-todo-row">
              <td>
                <input
                  type="text"
                  name="title"
                  value={newTodo.title}
                  onChange={handleInputChange}
                  placeholder="Title"
                />
              </td>
              <td>
                <input
                  type="text"
                  name="description"
                  value={newTodo.description}
                  onChange={handleInputChange}
                  placeholder="Description"
                />
              </td>
              <td>
                <input type="date" name="dateEnd" value={newTodo.dateEnd} onChange={handleInputChange} />
              </td>
              <td>
                <select name="status" value={newTodo.status} onChange={handleInputChange}>
                  <option value="To do">To do</option>
                  <option value="Doing">Doing</option>
                  <option value="Done">Done</option>
                </select>
              </td>
              <td className="action-cell">
                <button className="save-button" onClick={handleAddSave}>
                  Save
                </button>
                <button className="cancel-button" onClick={() => setIsAddingTodo(false)}>
                  Cancel
                </button>
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {!isAddingTodo && (
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
