import React from 'react';

const Task = ({ task, user, onEdit, onDelete }) => {
  return (
    <tr>
      <td>{task.title}</td>
      <td>{user ? user.name : 'Ei määritetty'}</td>
      <td>
        <span className={`status status-${task.status}`}>{task.status}</span>
      </td>
      <td>
        <button onClick={() => onEdit(task)} className="btn-edit">Muokkaa</button>
        <button onClick={() => onDelete(task.id)} className="btn-delete">Poista</button>
      </td>
    </tr>
  );
};

export default Task;
