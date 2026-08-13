import React, { useState, useEffect } from 'react';
import './TaskModal.css';

const TaskModal = ({ isOpen, onClose, taskToEdit, users, onSave }) => {
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('odottaa');
  const [assigneeId, setAssigneeId] = useState('');

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setStatus(taskToEdit.status);
      setAssigneeId(taskToEdit.assigneeId || '');
    } else {
   
      setTitle('');
      setStatus('odottaa');
      setAssigneeId('');
    }
  }, [taskToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      id: taskToEdit ? taskToEdit.id : null, 
      title,
      status,
      assigneeId: assigneeId ? parseInt(assigneeId) : null
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>{taskToEdit ? 'Muokkaa tehtävää' : 'Lisää uusi tehtävä'}</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Tehtävä:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="assignee">Vastuuhenkilö:</label>
            <select
              id="assignee"
              value={assigneeId}
              onChange={(e) => setAssigneeId(e.target.value)}
            >
              <option value="">-- Valitse --</option>
              {users.map(user => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="status">Tila:</label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="odottaa">Odottaa</option>
              <option value="työn_alla">Työn alla</option>
              <option value="valmis">Valmis</option>
            </select>
          </div>

          <div className="modal-actions">
            <button type="button" onClick={onClose} className="btn-cancel">Peruuta</button>
            <button type="submit" className="btn-save">Tallenna</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
