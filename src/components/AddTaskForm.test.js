// AddTaskForm.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import AddTaskForm from './AddTaskForm';
import { addTask } from '../redux/actionCreators';

const mockStore = configureStore();

describe('AddTaskForm Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
  });

  test('renders AddTaskForm component', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <AddTaskForm />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getAllByText('Add Task').length).toEqual(2);
    expect(screen.getByLabelText('Title:')).toBeInTheDocument();
    expect(screen.getByLabelText('Description:')).toBeInTheDocument();
    expect(screen.getByLabelText('Due Date:')).toBeInTheDocument();
    expect(screen.getByText('Back to Task List')).toBeInTheDocument();
  });

  test('handles input changes', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <AddTaskForm />
        </MemoryRouter>
      </Provider>
    );

    const titleInput = screen.getByLabelText('Title:');
    const descriptionInput = screen.getByLabelText('Description:');
    const dueDateInput = screen.getByLabelText('Due Date:');

    fireEvent.change(titleInput, { target: { value: 'New Task Title' } });
    fireEvent.change(descriptionInput, { target: { value: 'New Task Description' } });
    fireEvent.change(dueDateInput, { target: { value: '2023-12-31' } });

    expect(titleInput.value).toBe('New Task Title');
    expect(descriptionInput.value).toBe('New Task Description');
    expect(dueDateInput.value).toBe('2023-12-31');
  });

  test('submits the form and dispatches addTask action', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <AddTaskForm />
        </MemoryRouter>
      </Provider>
    );

    const titleInput = screen.getByLabelText('Title:');
    const descriptionInput = screen.getByLabelText('Description:');
    const dueDateInput = screen.getByLabelText('Due Date:');

    fireEvent.change(titleInput, { target: { value: 'New Task Title' } });
    fireEvent.change(descriptionInput, { target: { value: 'New Task Description' } });
    fireEvent.change(dueDateInput, { target: { value: '2023-12-31' } });

    screen.getAllByText('Add Task').forEach(a => fireEvent.click(a));

    expect(store.getActions()).toContainEqual(addTask({"description": "New Task Description", "dueDate": "2023-12-31", "status": "Pending", "title": "New Task Title"}));
  });

  test('navigates back to Task List on "Back to Task List" button click', () => {
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/add']}>
          <AddTaskForm />
        </MemoryRouter>
      </Provider>
    );

    const backButton = screen.getByText('Back to Task List');
    fireEvent.click(backButton);

    expect(container.innerHTML).toContain('Task Manager');
  });
});
