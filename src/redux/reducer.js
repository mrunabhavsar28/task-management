import { ADD_TASK, EDIT_TASK, DELETE_TASK, TOGGLE_STATUS } from './actions';

const initialState = {
  tasks: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK:
      return {
        tasks: [...state.tasks, action.payload],
      };

    case EDIT_TASK:
      return {
        tasks: state.tasks.map((task, index) =>
          index === parseInt(action.payload.taskId) ? action.payload.updatedTask : task
        ),
      };

    case DELETE_TASK:
      return {
        tasks: state.tasks.filter((task, index) => index !== action.payload),
      };

    case TOGGLE_STATUS:
      console.log("SDfdsf");
      return {
        tasks: state.tasks.map((task, index) =>
          index === action.payload ? { ...task, status: task.status === 'Completed' ? 'Pending' : 'Completed' } : task
        ),
      };

    default:
      return state;
  }
};

export default reducer;
