import React, { useState } from 'react';
import Modal from './Modal';

export default function ProjectModal({ project, onClose, onSave }) {
  const [name, setName] = useState(project?.name || '');
  const [description, setDescription] = useState(project?.description || '');
  const [error, setError] = useState('');
  function submit(event) {
    event.preventDefault();
    if (!name.trim()) {
      setError('Anna projektin nimi.');
      return;
    }
    onSave({ name: name.trim(), description: description.trim() });
  }
  return (
    <Modal
      title={project ? 'Muokkaa projektia' : 'Luo uusi projekti'}
      onClose={onClose}
    >
      <form onSubmit={submit}>
        <div className="form-group">
          <label htmlFor="project-name">Projektin nimi</label>
          <input
            id="project-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            maxLength={160}
            aria-invalid={!!error}
            aria-describedby={error ? 'project-error' : undefined}
          />
        </div>
        <div className="form-group">
          <label htmlFor="project-description">Kuvaus</label>
          <textarea
            id="project-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={2000}
          />
        </div>
        {error && (
          <p id="project-error" role="alert">
            {error}
          </p>
        )}
        <div className="modal-actions">
          <button type="button" className="btn-cancel" onClick={onClose}>
            Peruuta
          </button>
          <button className="btn-save">Tallenna projekti</button>
        </div>
      </form>
    </Modal>
  );
}
