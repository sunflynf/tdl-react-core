export function TodoRow({ todo, onEdit, onDelete }) {
  return (
    <tr className={`status-${todo.status.toLowerCase().replace(' ', '-')}`}>
      <td>{todo.title}</td>
      <td className="description-cell">{todo.description}</td>
      <td>{todo.dateEnd ? new Date(todo.dateEnd).toLocaleDateString() : 'N/A'}</td>
      <td>{todo.status}</td>
      <td className="action-cell">
        <button className="edit-button" onClick={() => onEdit(todo)}>
          Edit
        </button>
        <button className="delete-button" onClick={() => onDelete(todo)}>
          Delete
        </button>
      </td>
    </tr>
  );
}
