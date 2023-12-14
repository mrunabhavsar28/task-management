import { editTask } from "../redux/actionCreators";
import React, { useState , useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { Link, useNavigate, useParams } from 'react-router-dom';

const EditTaskForm = () => {

    const { taskId } = useParams();
    const tasks = useSelector((state) => state.tasks);
    const [task, setTask] = useState({ title: '', description: '', dueDate: '', status: 'Pending' });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const selectedTask = tasks.find((task, index) => index === parseInt(taskId, 10));
        setTask(selectedTask);
    }, []);



    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTask({ ...task, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(task)
        dispatch(editTask(taskId, task));
        setTask({ title: '', description: '', dueDate: '', status: 'Pending' });
        navigate('/');
    };


    return (
        <div className="main-container">
            <div className="background-container" style={{ backgroundImage: 'url("6530.jpg")' }}>
                <header className="mb-4 text-center task-manager-header">
                    <h1 className="font-weight-bold">Task Manager</h1>
                </header>
                <div className="container mt-4" style={{ background: '#87CEEB', padding: '20px', borderRadius: '8px' }}>
                    <h1 className="mb-4 text-center">Edit Task</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label" for = "title">Title:</label>
                            <input
                                name="title"
                                type="text"
                                id="title"
                                className="form-control"
                                value={task.title}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label" for = "description">Description:</label>
                            <input
                                name="description"
                                type="text"
                                id="description"
                                className="form-control"
                                value={task.description}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label" for = "dueDate">Due Date:</label>
                            <input
                                name="dueDate"
                                type="date"
                                id="dueDate"
                                className="form-control"
                                value={task.dueDate}
                                onChange={handleInputChange}
                                min={moment().format("YYYY-MM-DD")}
                            />
                        </div>
                        <div className="d-flex justify-content-center mt-3">
                            <button type="submit" className="btn btn-primary mx-2">Save Changes</button>
                            <Link to="/" className="btn btn-secondary mx-2">Back to Task List</Link>
                        </div>
                    </form>
                </div>
                <footer className="mt-4 text-center task-manager-footer">
                    <p>&copy; 2023 @Mrunalini Bhavsar</p>
                </footer>
            </div>
        </div>
    );
};


export default EditTaskForm;