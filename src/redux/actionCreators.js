import { ADD_TASK, EDIT_TASK, DELETE_TASK, TOGGLE_STATUS } from './actions';

export const addTask = (task) => ({
  type: ADD_TASK,
  payload: task,
});

export const editTask = (taskId, updatedTask) => ({
  type: EDIT_TASK,
  payload: { taskId, updatedTask },
});

export const deleteTask = (taskId) => ({
  type: DELETE_TASK,
  payload: taskId,
});

export const toggleStatus = (taskId) => ({
  type: TOGGLE_STATUS,
  payload: taskId,
});
