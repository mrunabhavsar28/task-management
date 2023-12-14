import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../redux/actionCreators';
import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment';

const AddTaskForm = () => {
  const [task, setTask] = useState({ title: '', description: '', dueDate: '', status: 'Pending' });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addTask(task));
    setTask({ title: '', description: '', dueDate: '', status: 'Pending' });
    navigate('/');
  };

  return (
    <div className="main-container">
      <div className="background-container" style={{ backgroundImage: 'url("6530.jpg")' }}>
        <header className="mb-4 text-center task-manager-header">
          <h1 className="font-weight-bold">Task Manager</h1>
        </header>
        <div className="container mt-4" style={{ background: '#F0E68C', padding: '20px', borderRadius: '8px' }}>
          <h1 className="mb-4">Add Task</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label" for="title">Title:</label>
              <input type="text" name="title" id="title" className="form-control" value={task.title} onChange={handleInputChange} required />
            </div>

            <div className="mb-3">
              <label className="form-label" for="description">Description:</label>
              <input type="text" name="description" id="description" className="form-control" value={task.description} onChange={handleInputChange} required />
            </div>

            <div className="mb-3">
              <label className="form-label" for="dueDate">Due Date:</label>
              <input type="date" name="dueDate" id="dueDate" className="form-control" value={task.dueDate} onChange={handleInputChange} min={moment().format("YYYY-MM-DD")} />
            </div>

            <button type="submit" className="btn btn-primary">Add Task</button>
          </form>
          <Link to="/" className="btn btn-secondary mt-3">Back to Task List</Link>
        </div>
        <footer className="mt-4 text-center task-manager-footer">
          <p>&copy; 2023 @Mrunalini Bhavsar</p>
        </footer>
      </div>
    </div>
  );
};

export default AddTaskForm;
