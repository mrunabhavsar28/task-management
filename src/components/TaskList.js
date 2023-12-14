import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTask, toggleStatus } from '../redux/actionCreators';
import { Link, useNavigate } from 'react-router-dom';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import { FilterMatchMode } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import { useState } from 'react';
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import {bounce} from 'react-animations';
import styled, {keyframes} from 'styled-components';
import {motion} from "framer-motion";

const TaskList = () => {
  const Bounce = styled.div`animation: 2s ${keyframes`${bounce}`} infinite`;
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  const [filters, setFilters] = useState({
    global : {value: null, matchMode: FilterMatchMode.CONTAINS},
    status : {value: null, matchMode: FilterMatchMode.CONTAINS}
  })

  return (
    <motion.div className="main-container" initial={{width: 0}} animate={{width: "100%"}} exit={{x : window.innerWidth, transition : {duration: 0.1}}}>
      <div className="background-container" style={{ backgroundImage: 'url("6530.jpg")' }}>
        <header className="mb-4 text-center task-manager-header">
          <Bounce><h1 className="font-weight-bold">Task Manager</h1></Bounce>
        </header>
        <div className="container mt-4" style={{ background: '#C38D9E', padding: '20px', borderRadius: '8px' }}>
          <h1 className="mb-4 text-center">Tasks List</h1>
          <label className="form-label font-weight-bold">Global Filter: </label>
          &nbsp;&nbsp;
          <InputText 
           onInput={(e) => setFilters({global : {value: e.target.value, matchMode: FilterMatchMode.CONTAINS}})}
          />
          &nbsp;&nbsp;&nbsp;&nbsp;
          <label  className="form-label font-weight-bold">Status Filter: </label>
          &nbsp;&nbsp;
          <InputText 
           onInput={(e) => setFilters({status : {value: e.target.value, matchMode: FilterMatchMode.CONTAINS}})}
          />
          <br></br><br></br>
          <DataTable value={tasks} sortMode='multiple' filters={filters}>
          <Column body={(data, props) => 
                <div>
                <input
                  type="checkbox"
                  placeholder='Click to mark task as Completed'
                  checked={data.status === 'Completed'}
                  onChange={() => {
                    dispatch(toggleStatus(props.rowIndex));
                  }}
                  className="me-3"
                />
              </div> }>
            </Column>
            <Column field="title" header="Title" sortable/>
            <Column field="description" header="Description"sortable/>
            <Column field="dueDate" header="Due Date"sortable/>
            <Column field="status" header="Status" sortable/>
            <Column header="Actions" body={(data, props) => 
                <div>
                  <button onClick={() => dispatch(deleteTask(props.rowIndex))} className="btn btn-danger me-2">Delete</button>
                  <Link to={`/edit/${props.rowIndex}`} className="btn btn-primary">Edit</Link>
                </div> }>
            </Column>
          </DataTable>
          
          <div className="text-center mt-3">
            <Link to="/add" className="btn btn-success">Add Task</Link>
          </div>
        </div>
        <footer className="mt-4 text-center task-manager-footer">
          <p>&copy; 2023 @Mrunalini Bhavsar</p>
        </footer>
      </div>
    </motion.div>
  );
};

export default TaskList;
