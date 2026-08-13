import React, { useState } from 'react';
import './ProjectModal.css';

const ProjectModal = ({ isOpen, onClose, onSave }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ name, description });
    // Tyhjennä tallennuksen jälkeen
    setName('');
    setDescription('');
  };

  const handleClose = () => {
    // Tyhjennä jos ei tallenneta
    setName('');
    setDescription('');
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Luo uusi projekti</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Projektin nimi</label>
            <input
              type="text"
              id="name"
              placeholder=""
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Kuvaus</label>
            <textarea
              id="description"
              placeholder="Kuvaile projektin tavoitteita..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="modal-actions">
            <button type="button" onClick={handleClose} className="btn-cancel">Peruuta</button>
            <button type="submit" className="btn-save">Tallenna projekti</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectModal;
