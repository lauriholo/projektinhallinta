import React from 'react';
import './DashboardView.css';

const DashboardView = ({ projects, onProjectSelect, onAddProject }) => {
  return (
    <div className="dashboard-view">
      <div className="dashboard-header">
        <h2>Projektit</h2>
        <button onClick={onAddProject} className="btn-primary">
          + Luo uusi projekti
        </button>
      </div>
      <div className="project-list">
        {projects.map(project => (
          <div 
            key={project.id} 
            className="project-card" 
            onClick={() => onProjectSelect(project.id)}
          >
            <h3>{project.name}</h3>
            <p>{project.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardView;
