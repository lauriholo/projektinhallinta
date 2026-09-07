import React, { useState } from 'react';
import { STATUSES } from '../services/projectData';
import './ProjectView.css';

export default function ProjectView({
  project,
  tasks,
  users,
  onAddTask,
  onEditTask,
  onDeleteTask,
  onEditProject,
  onArchive,
}) {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('');
  const [assignee, setAssignee] = useState('');
  const ownTasks = tasks.filter((task) => task.projectId === project.id);
  const filtered = ownTasks.filter(
    (task) =>
      task.title
        .toLocaleLowerCase('fi')
        .includes(query.trim().toLocaleLowerCase('fi')) &&
      (!status || task.status === status) &&
      (!assignee ||
        (assignee === 'none'
          ? task.assigneeId == null
          : task.assigneeId === Number(assignee))),
  );
  return (
    <div className="project-view">
      <div className="project-header">
        <div>
          <h2>{project.name}</h2>
          <p>{project.description}</p>
          {project.archived && <p>Arkistoitu projekti</p>}
        </div>
        <div className="project-controls">
          <button className="btn-cancel" onClick={onEditProject}>
            Muokkaa projektia
          </button>
          <button className="btn-cancel" onClick={onArchive}>
            {project.archived ? 'Palauta aktiiviseksi' : 'Arkistoi projekti'}
          </button>
          <button className="btn-primary" onClick={onAddTask}>
            + Lisää uusi tehtävä
          </button>
        </div>
      </div>
      <div className="filters">
        <label>
          Hae tehtäviä
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
        <label>
          Suodata tilan mukaan
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">Kaikki tilat</option>
            {Object.entries(STATUSES).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>
        <label>
          Suodata vastuuhenkilön mukaan
          <select
            value={assignee}
            onChange={(e) => setAssignee(e.target.value)}
          >
            <option value="">Kaikki vastuuhenkilöt</option>
            <option value="none">Ei määritetty</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </label>
      </div>
      <p role="status">
        Näytetään {filtered.length} / {ownTasks.length} tehtävää
      </p>
      <div
        className="task-list"
        role="region"
        aria-label="Projektin tehtävät"
        tabIndex={0}
      >
        <table>
          <thead>
            <tr>
              <th scope="col">Tehtävä</th>
              <th scope="col">Vastuuhenkilö</th>
              <th scope="col">Tila</th>
              <th scope="col">Toiminnot</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((task) => (
              <tr key={task.id}>
                <td>{task.title}</td>
                <td>
                  {users.find((user) => user.id === task.assigneeId)?.name ||
                    'Ei määritetty'}
                </td>
                <td>
                  <span className={`status status-${task.status}`}>
                    {STATUSES[task.status]}
                  </span>
                </td>
                <td>
                  <div className="task-actions">
                    <button
                      className="btn-icon"
                      aria-label={`Muokkaa tehtävää: ${task.title}`}
                      onClick={() => onEditTask(task)}
                    >
                      Muokkaa
                    </button>
                    <button
                      className="btn-icon btn-delete"
                      aria-label={`Poista tehtävä: ${task.title}`}
                      onClick={() => onDeleteTask(task.id)}
                    >
                      Poista
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {!filtered.length && (
              <tr>
                <td colSpan={4}>
                  {ownTasks.length
                    ? 'Hakuehdoilla ei löytynyt tehtäviä.'
                    : 'Ei tehtäviä vielä. Aloita lisäämällä uusi tehtävä!'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
