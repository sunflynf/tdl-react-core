import { use } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import clsx from 'clsx';
import { TodoContext } from '../../contexts/TodoContext';
import './TodoForm.css';

function TodoForm({ todo, onClose, onSave, mode = 'add' }) {
  const { addTodo, updateTodo } = use(TodoContext);

  const today = new Date().toISOString().split('T')[0];

  const initialValues = {
    title: todo?.title || '',
    description: todo?.description || '',
    dateEnd: todo?.dateEnd ? todo.dateEnd.split('T')[0] : '',
    status: todo?.status || 'To do',
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required').min(5, 'Title must be at least 5 characters'),
    description: Yup.string(),
    dateEnd: Yup.string()
      .required('Due date is required')
      .test('is-today-or-later', 'Due date cannot be in the past', (value) => !value || value >= today),
    status: Yup.string().oneOf(['To do', 'Doing', 'Done']),
  });

  const handleSubmit = (values) => {
    const todoData = {
      ...values,
      dateEnd: values.dateEnd ? new Date(values.dateEnd).toISOString() : null,
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

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          validateOnBlur={false}
          validateOnChange={false}
        >
          {({ isSubmitting, errors, touched, submitCount }) => (
            <Form>
              <div className={clsx('form-group', errors.title && (touched.title || submitCount > 0) && 'has-error')}>
                <label htmlFor="title">Title</label>
                <Field type="text" id="title" name="title" className="form-input" autoFocus />
                {errors.title && (touched.title || submitCount > 0) && <div className="error">{errors.title}</div>}
              </div>

              <div
                className={clsx(
                  'form-group',
                  errors.description && (touched.description || submitCount > 0) && 'has-error'
                )}
              >
                <label htmlFor="description">Description</label>
                <Field as="textarea" id="description" name="description" rows="3" cols="40" className="form-input" />
                {errors.description && (touched.description || submitCount > 0) && (
                  <div className="error">{errors.description}</div>
                )}
              </div>

              <div
                className={clsx('form-group', errors.dateEnd && (touched.dateEnd || submitCount > 0) && 'has-error')}
              >
                <label htmlFor="dateEnd">Due Date</label>
                <Field type="date" id="dateEnd" name="dateEnd" className="form-input" />
                {errors.dateEnd && (touched.dateEnd || submitCount > 0) && (
                  <div className="error">{errors.dateEnd}</div>
                )}
              </div>

              <div className={clsx('form-group', errors.status && (touched.status || submitCount > 0) && 'has-error')}>
                <label htmlFor="status">Status</label>
                <Field as="select" id="status" name="status" className="form-input">
                  <option value="To do">To do</option>
                  <option value="Doing">Doing</option>
                  <option value="Done">Done</option>
                </Field>
                {errors.status && (touched.status || submitCount > 0) && <div className="error">{errors.status}</div>}
              </div>

              <div className="form-actions">
                <button type="button" className="cancel-button" onClick={onClose}>
                  Cancel
                </button>
                <button type="submit" className="save-button" disabled={isSubmitting}>
                  {mode === 'add' ? 'Add Todo' : 'Save Changes'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default TodoForm;
