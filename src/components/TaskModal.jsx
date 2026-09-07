import React, { useState } from 'react';
import Modal from './Modal';
import { STATUSES } from '../services/projectData';

export default function TaskModal({ onClose, taskToEdit, users, onSave }) {
  const [title, setTitle] = useState(taskToEdit?.title || '');
  const [status, setStatus] = useState(taskToEdit?.status || 'odottaa');
  const [assigneeId, setAssigneeId] = useState(taskToEdit?.assigneeId || '');
  const [error, setError] = useState('');
  function submit(event) {
    event.preventDefault();
    if (!title.trim()) {
      setError('Anna tehtävän nimi.');
      return;
    }
    onSave({
      id: taskToEdit?.id,
      title: title.trim(),
      status,
      assigneeId: assigneeId ? Number(assigneeId) : null,
    });
  }
  return (
    <Modal
      title={taskToEdit ? 'Muokkaa tehtävää' : 'Lisää uusi tehtävä'}
      onClose={onClose}
    >
      <form onSubmit={submit}>
        <div className="form-group">
          <label htmlFor="task-title">Tehtävä</label>
          <input
            id="task-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            maxLength={200}
            aria-invalid={!!error}
            aria-describedby={error ? 'task-error' : undefined}
          />
        </div>
        <div className="form-group">
          <label htmlFor="task-assignee">Vastuuhenkilö</label>
          <select
            id="task-assignee"
            value={assigneeId}
            onChange={(e) => setAssigneeId(e.target.value)}
          >
            <option value="">Ei määritetty</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="task-status">Tila</label>
          <select
            id="task-status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            {Object.entries(STATUSES).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
        {error && (
          <p id="task-error" role="alert">
            {error}
          </p>
        )}
        <div className="modal-actions">
          <button type="button" className="btn-cancel" onClick={onClose}>
            Peruuta
          </button>
          <button className="btn-save">Tallenna</button>
        </div>
      </form>
    </Modal>
  );
}
