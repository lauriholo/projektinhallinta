import React, { useState } from 'react';
import './DashboardView.css';

export default function DashboardView({ projects, tasks, onAddProject }) {
  const [archived, setArchived] = useState(false);
  const visible = projects.filter((project) => !!project.archived === archived);
  return (
    <div className="dashboard-view">
      <div className="dashboard-header">
        <h2>Projektit</h2>
        <button onClick={onAddProject} className="btn-primary">
          + Luo uusi projekti
        </button>
      </div>
      <label className="archive-filter">
        <input
          type="checkbox"
          checked={archived}
          onChange={(e) => setArchived(e.target.checked)}
        />{' '}
        Näytä arkistoidut projektit
      </label>
      <div className="project-list">
        {visible.map((project) => {
          const ownTasks = tasks.filter(
            (task) => task.projectId === project.id,
          );
          const completed = ownTasks.filter(
            (task) => task.status === 'valmis',
          ).length;
          const percent = ownTasks.length
            ? Math.round((completed / ownTasks.length) * 100)
            : 0;
          return (
            <a
              key={project.id}
              className="project-card"
              href={`#/projects/${project.id}`}
            >
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              <div className="project-meta">
                <span>
                  {completed} / {ownTasks.length} tehtävää valmiina
                </span>
                <span>{percent} %</span>
              </div>
              <progress
                value={completed}
                max={ownTasks.length || 1}
                aria-label={`${project.name}: valmistumisaste`}
              />
            </a>
          );
        })}
      </div>
      {!visible.length && (
        <p>
          {archived
            ? 'Ei arkistoituja projekteja.'
            : 'Ei projekteja. Aloita luomalla uusi projekti.'}
        </p>
      )}
    </div>
  );
}
