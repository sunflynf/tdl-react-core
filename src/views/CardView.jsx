import { useState, useRef } from "react";
import { useTodoContext } from "../contexts/TodoContext";
import TodoForm from "../components/TodoForm";
import ConfirmDialog from "../components/ConfirmDialog";
import "./CardView.css";

function CardView() {
  const { todos, changeStatus, deleteTodo } = useTodoContext();
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);
  const [draggedTodo, setDraggedTodo] = useState(null);

  const dragItem = useRef();
  const dragNode = useRef();

  // Filter todos by status
  const todosByStatus = {
    "To do": todos.filter((todo) => todo.status === "To do"),
    Doing: todos.filter((todo) => todo.status === "Doing"),
    Done: todos.filter((todo) => todo.status === "Done"),
  };

  const handleDragStart = (e, todo) => {
    dragItem.current = todo;
    dragNode.current = e.target;
    dragNode.current.addEventListener("dragend", handleDragEnd);

    setTimeout(() => {
      setDraggedTodo(todo);
    }, 0);
  };

  const handleDragEnd = () => {
    dragNode.current.removeEventListener("dragend", handleDragEnd);
    dragItem.current = null;
    dragNode.current = null;
    setDraggedTodo(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, status) => {
    e.preventDefault();
    if (draggedTodo && draggedTodo.status !== status) {
      changeStatus(draggedTodo.id, status);
    }
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

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="card-view">
      <div className="card-header">
        <h2>Todo Cards</h2>
        <button className="add-button" onClick={() => setShowAddForm(true)}>
          Add Todo
        </button>
      </div>

      <div className="card-container">
        {Object.keys(todosByStatus).map((status) => (
          <div
            key={status}
            className={`status-column status-${status
              .toLowerCase()
              .replace(" ", "-")}`}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, status)}
          >
            <h3 className="column-header">{status}</h3>

            <div className="card-list">
              {todosByStatus[status].length === 0 ? (
                <p className="empty-column">No tasks</p>
              ) : (
                todosByStatus[status].map((todo) => (
                  <div
                    key={todo.id}
                    className={`todo-card ${
                      draggedTodo && draggedTodo.id === todo.id
                        ? "dragging"
                        : ""
                    }`}
                    draggable
                    onDragStart={(e) => handleDragStart(e, todo)}
                  >
                    <h4 className="card-title">{todo.title}</h4>
                    <p className="card-description">{todo.description}</p>
                    <div className="card-date">
                      Due: {formatDate(todo.dateEnd)}
                    </div>
                    {todo.dateFinish && (
                      <div className="card-date">
                        Finish: {formatDate(todo.dateFinish)}
                      </div>
                    )}

                    <div className="card-actions">
                      <button
                        className="edit-button"
                        onClick={() => handleEdit(todo)}
                      >
                        Edit
                      </button>
                      <button
                        className="delete-button"
                        onClick={() => handleDelete(todo)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add Todo Dialog */}
      {showAddForm && (
        <TodoForm
          onClose={() => setShowAddForm(false)}
          onSave={() => setShowAddForm(false)}
          mode="add"
        />
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

export default CardView;
