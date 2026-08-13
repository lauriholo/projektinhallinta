import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import DashboardView from './pages/DashboardView';
import ProjectView from './pages/ProjectView';
import TaskModal from './components/TaskModal';
import ProjectModal from './components/ProjectModal';
import { projects as initialProjects, tasks as initialTasks, users as initialUsers } from './services/mockData';

function App() {
  const [projects, setProjects] = useState(initialProjects);
  const [tasks, setTasks] = useState(initialTasks);
  const [users, setUsers] = useState(initialUsers);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

  const handleProjectSelect = (projectId) => {
    setSelectedProjectId(projectId);
  };

  const handleBackToDashboard = () => {
    setSelectedProjectId(null);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTaskToEdit(null);
  };

  const handleAddTask = () => {
    setTaskToEdit(null);
    handleOpenModal();
  };

  const handleEditTask = (task) => {
    setTaskToEdit(task);
    handleOpenModal();
  };

  const handleSaveTask = (taskData) => {
    if (taskData.id) { // Muokkaa tehtävää
      setTasks(tasks.map(t => t.id === taskData.id ? { ...t, ...taskData } : t));
    } else { // Lisää tehtävä
      const newTask = {
        ...taskData,
        id: Math.max(...tasks.map(t => t.id)) + 1, // ID luonti
        projectId: selectedProjectId
      };
      setTasks([...tasks, newTask]);
    }
    handleCloseModal();
  };

  const handleDeleteTask = (taskId) => {
    if (window.confirm('Haluatko varmasti poistaa tämän tehtävän?')) {
      setTasks(tasks.filter(t => t.id !== taskId));
    }
  };

  const handleOpenProjectModal = () => {
    setIsProjectModalOpen(true);
  };

  const handleCloseProjectModal = () => {
    setIsProjectModalOpen(false);
  };

  const handleSaveProject = (projectData) => {
    const newProject = {
      ...projectData,
      id: Math.max(...projects.map(p => p.id)) + 1, // ID luonti
    };
    setProjects([...projects, newProject]);
    handleCloseProjectModal();
  };

  return (
    <div className="App">
      <Header />
      <main>
        {selectedProjectId ? (
          <>
            <button onClick={handleBackToDashboard} className="back-button">
              &larr; Takaisin projekteihin
            </button>
            <ProjectView 
              projectId={selectedProjectId} 
              projects={projects}
              tasks={tasks}
              users={users}
              onAddTask={handleAddTask}
              onEditTask={handleEditTask}
              onDeleteTask={handleDeleteTask}
            />
          </>
        ) : (
          <DashboardView 
            projects={projects} 
            onProjectSelect={handleProjectSelect}
            onAddProject={handleOpenProjectModal}
          />
        )}
      </main>
      <Footer />
      <TaskModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveTask}
        taskToEdit={taskToEdit}
        users={users}
      />
      <ProjectModal
        isOpen={isProjectModalOpen}
        onClose={handleCloseProjectModal}
        onSave={handleSaveProject}
      />
    </div>
  );
}

export default App;
