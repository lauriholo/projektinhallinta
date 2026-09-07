import React, { useCallback, useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import DashboardView from './pages/DashboardView';
import ProjectView from './pages/ProjectView';
import TaskModal from './components/TaskModal';
import ProjectModal from './components/ProjectModal';
import { users } from './services/mockData';
import {
  initialData,
  nextId,
  readData,
  STORAGE_KEY,
} from './services/projectData';

function App() {
  const [loaded] = useState(readData);
  const [data, setData] = useState(loaded.data);
  const [storageError, setStorageError] = useState(loaded.error);
  const [storageEnabled, setStorageEnabled] = useState(!loaded.error);
  const [route, setRoute] = useState(() => window.location.hash);
  const [taskModal, setTaskModal] = useState(null);
  const [projectModal, setProjectModal] = useState(null);
  const closeTask = useCallback(() => setTaskModal(null), []);
  const closeProject = useCallback(() => setProjectModal(null), []);
  useEffect(() => {
    function navigate() {
      setRoute(window.location.hash);
      closeTask();
      closeProject();
    }
    window.addEventListener('hashchange', navigate);
    return () => window.removeEventListener('hashchange', navigate);
  }, [closeTask, closeProject]);
  useEffect(() => {
    if (!storageEnabled) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      setStorageError('');
    } catch {
      setStorageError(
        'Muutoksia ei voitu tallentaa selaimeen. Ne säilyvät vain tämän sivun ollessa auki.',
      );
    }
  }, [data, storageEnabled]);
  const match = route.match(/^#\/projects\/(\d+)$/);
  const project = match
    ? data.projects.find((p) => p.id === Number(match[1]))
    : null;
  const isDashboard = !route || route === '#' || route === '#/';
  function saveTask(task) {
    setData((previous) => ({
      ...previous,
      tasks:
        task.id != null
          ? previous.tasks.map((t) =>
              t.id === task.id ? { ...t, ...task } : t,
            )
          : [
              ...previous.tasks,
              { ...task, id: nextId(previous.tasks), projectId: project.id },
            ],
    }));
    closeTask();
  }
  function saveProject(values) {
    setData((previous) => ({
      ...previous,
      projects: projectModal.project
        ? previous.projects.map((p) =>
            p.id === projectModal.project.id ? { ...p, ...values } : p,
          )
        : [
            ...previous.projects,
            { ...values, id: nextId(previous.projects), archived: false },
          ],
    }));
    closeProject();
  }
  function reset() {
    if (
      !window.confirm(
        'Palautetaanko esimerkkidata? Kaikki omat projektit ja tehtävät poistetaan tästä selaimesta.',
      )
    )
      return;
    setData(initialData());
    setStorageEnabled(true);
    setStorageError('');
    window.location.hash = '/';
  }
  return (
    <div className="App">
      <Header />
      <main>
        <div className="demo-notice">
          <span>Tiedot tallennetaan tähän selaimeen.</span>
          <button className="btn-cancel" onClick={reset}>
            Palauta esimerkkidata
          </button>
        </div>
        {storageError && <p role="alert">{storageError}</p>}
        {isDashboard ? (
          <DashboardView
            projects={data.projects}
            tasks={data.tasks}
            onAddProject={() => setProjectModal({ project: null })}
          />
        ) : (
          <>
            <a href="#/" className="back-button">
              ← Takaisin projekteihin
            </a>
            {project ? (
              <ProjectView
                key={project.id}
                project={project}
                tasks={data.tasks}
                users={users}
                onAddTask={() => setTaskModal({ task: null })}
                onEditTask={(task) => setTaskModal({ task })}
                onDeleteTask={(id) => {
                  if (
                    window.confirm('Haluatko varmasti poistaa tämän tehtävän?')
                  )
                    setData((previous) => ({
                      ...previous,
                      tasks: previous.tasks.filter((t) => t.id !== id),
                    }));
                }}
                onEditProject={() => setProjectModal({ project })}
                onArchive={() =>
                  setData((previous) => ({
                    ...previous,
                    projects: previous.projects.map((p) =>
                      p.id === project.id ? { ...p, archived: !p.archived } : p,
                    ),
                  }))
                }
              />
            ) : (
              <p>Projektia ei löytynyt.</p>
            )}
          </>
        )}
      </main>
      <Footer />
      {taskModal && (
        <TaskModal
          onClose={closeTask}
          onSave={saveTask}
          taskToEdit={taskModal.task}
          users={users}
        />
      )}
      {projectModal && (
        <ProjectModal
          onClose={closeProject}
          onSave={saveProject}
          project={projectModal.project}
        />
      )}
    </div>
  );
}
export default App;
