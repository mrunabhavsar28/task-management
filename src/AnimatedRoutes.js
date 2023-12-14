import { useLocation } from "react-router-dom";
import TaskList from './components/TaskList';
import AddTaskForm from './components/AddTaskForm';
import EditTaskForm from './components/EditTaskForm';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {AnimatePresence} from 'framer-motion';

export function AnimatedRoutes() {
    const location = useLocation();
    return (
      <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<TaskList />} />
        <Route path="/add" element={<AddTaskForm />} />
        <Route path="/edit/:taskId" element={<EditTaskForm />} />
      </Routes>
      </AnimatePresence> 
    );
}