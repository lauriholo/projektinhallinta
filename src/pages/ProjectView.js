import React from 'react';
import './ProjectView.css';

const ProjectView = ({ projectId, projects, tasks, users, onAddTask, onEditTask, onDeleteTask }) => {
  const project = projects.find(p => p.id === projectId);
  const projectTasks = tasks.filter(t => t.projectId === projectId);

  const getAssigneeName = (assigneeId) => {
    const user = users.find(u => u.id === assigneeId);
    return user ? user.name : 'Ei määritetty';
  };

  if (!project) {
    return <div>Projektia ei löytynyt.</div>;
  }

  return (
    <div className="project-view">
      <div className="project-header">
        <div>
          <h2>{project.name}</h2>
          <p>{project.description}</p>
        </div>
        <button onClick={onAddTask} className="btn-primary">
          + Lisää uusi tehtävä
        </button>
      </div>

      <div className="task-list">
        <table>
          <thead>
            <tr>
              <th>Tehtävä</th>
              <th>Vastuuhenkilö</th>
              <th>Tila</th>
              <th style={{ textAlign: 'right' }}>Toiminnot</th>
            </tr>
          </thead>
          <tbody>
            {projectTasks.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                  Ei tehtäviä vielä. Aloita lisäämällä uusi tehtävä!
                </td>
              </tr>
            ) : (
              projectTasks.map(task => (
                <tr key={task.id}>
                  <td style={{ fontWeight: '600' }}>{task.title}</td>
                  <td>{getAssigneeName(task.assigneeId)}</td>
                  <td>
                    <span className={`status status-${task.status.toLowerCase().replace(' ', '_')}`}>
                      {task.status}
                    </span>
                  </td>
                  <td>
                    <div className="task-actions" style={{ justifyContent: 'flex-end' }}>
                      <button onClick={() => onEditTask(task)} className="btn-icon" title="Muokkaa">
                        ✎
                      </button>
                      <button onClick={() => onDeleteTask(task.id)} className="btn-icon btn-delete" title="Poista">
                        🗑
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectView;
