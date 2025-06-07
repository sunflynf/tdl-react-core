import { use, useState } from 'react';
import { TodoContext } from '../../contexts/TodoContext';
import './TodoForm.css';

function TodoForm({ todo, onClose, onSave, mode = 'add' }) {
  const { addTodo, updateTodo } = use(TodoContext);
  const [formData, setFormData] = useState({
    title: todo?.title || '',
    description: todo?.description || '',
    dateEnd: todo?.dateEnd ? todo.dateEnd.split('T')[0] : '',
    status: todo?.status || 'To do',
  });

  const today = new Date().toISOString().split('T')[0];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const todoData = {
      ...formData,
      dateEnd: formData.dateEnd ? new Date(formData.dateEnd).toISOString() : null,
    };

    if (mode === 'add') {
      addTodo(todoData);
    } else {
      updateTodo(todo.id, todoData);
    }

    onSave();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{mode === 'add' ? 'Add New Todo' : 'Edit Todo'}</h2>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              cols="40"
            />
          </div>

          <div className="form-group">
            <label htmlFor="dateEnd">Due Date</label>
            <input
              type="date"
              id="dateEnd"
              name="dateEnd"
              value={formData.dateEnd}
              onChange={handleChange}
              min={today}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select id="status" name="status" value={formData.status} onChange={handleChange}>
              <option value="To do">To do</option>
              <option value="Doing">Doing</option>
              <option value="Done">Done</option>
            </select>
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="save-button">
              {mode === 'add' ? 'Add Todo' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TodoForm;
