import { Formik } from 'formik';
import * as Yup from 'yup';

export function TodoEditRow({ todo, onSave, onCancel, mode = 'edit' }) {
  return (
    <Formik
      initialValues={{
        title: todo.title,
        description: todo.description,
        dateEnd: todo.dateEnd ? todo.dateEnd.split('T')[0] : '',
        status: todo.status,
      }}
      validationSchema={Yup.object({
        title: Yup.string().required('Title is required'),
        description: Yup.string(),
        dateEnd: Yup.string()
          .required('Due date is required')
          .test('is-today-or-later', 'Due date cannot be in the past', (value) => {
            if (!value) return false;
            const today = new Date().toISOString().split('T')[0];
            return value >= today;
          }),
        status: Yup.string().oneOf(['To do', 'Doing', 'Done']),
      })}
      onSubmit={(values, { resetForm }) => {
        onSave({
          ...todo,
          ...values,
          dateEnd: values.dateEnd ? new Date(values.dateEnd).toISOString() : null,
        });
        if (mode === 'add') resetForm();
      }}
      validateOnBlur={false}
      validateOnChange={false}
    >
      {({ isSubmitting, errors, submitCount, handleChange, values, handleSubmit }) => (
        <tr style={{ background: mode === 'add' ? '#eaf6ff' : '#f7fbff' }}>
          <td>
            <input
              type="text"
              name="title"
              value={values.title}
              onChange={handleChange}
              className={`form-input${errors.title && submitCount > 0 ? ' has-error' : ''}`}
              placeholder="Title"
              autoFocus
              style={{ width: '100%' }}
            />
            {errors.title && submitCount > 0 && <div className="error">{errors.title}</div>}
          </td>
          <td>
            <input
              type="text"
              name="description"
              value={values.description}
              onChange={handleChange}
              className="form-input"
              placeholder="Description"
              style={{ width: '100%' }}
            />
          </td>
          <td>
            <input
              type="date"
              name="dateEnd"
              value={values.dateEnd}
              onChange={handleChange}
              min={new Date().toISOString().split('T')[0]}
              className={`form-input${errors.dateEnd && submitCount > 0 ? ' has-error' : ''}`}
              style={{ width: '100%' }}
            />
            {errors.dateEnd && submitCount > 0 && <div className="error">{errors.dateEnd}</div>}
          </td>
          <td>
            <select
              name="status"
              value={values.status}
              onChange={handleChange}
              className="form-input"
              style={{ width: '100%' }}
            >
              <option value="To do">To do</option>
              <option value="Doing">Doing</option>
              <option value="Done">Done</option>
            </select>
          </td>
          <td className="action-cell">
            <form onSubmit={handleSubmit} style={{ display: 'flex' }}>
              <button type="submit" className="save-button" disabled={isSubmitting}>
                {mode === 'add' ? 'Add' : 'Save'}
              </button>
              <button type="button" className="cancel-button" onClick={onCancel}>
                Cancel
              </button>
            </form>
          </td>
        </tr>
      )}
    </Formik>
  );
}
