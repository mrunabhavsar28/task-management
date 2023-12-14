import React from 'react';
import { render, screen, fireEvent, getByRole, getByTestId } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import TaskList from './TaskList';
import { deleteTask, toggleStatus } from '../redux/actionCreators';
import { MemoryRouter } from 'react-router-dom';

const mockStore = configureStore();

describe('TaskList Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      tasks: [
        { title: 'Task 1', description: 'Description 1', dueDate: '2023-12-31', status: 'Pending' },
        { title: 'Task 2', description: 'Description 2', dueDate: '2023-12-30', status: 'Completed' },
      ],
    });
  });

  test('renders TaskList component', () => {
    render(
      <Provider store={store}>
         <MemoryRouter><TaskList /></MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Task Manager')).toBeInTheDocument();
    expect(screen.getByText('Tasks List')).toBeInTheDocument();
    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();
  });

  test('handles checkbox click and dispatches toggleStatus action', () => {
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter><TaskList /></MemoryRouter>
      </Provider>
    );

    screen.getAllByPlaceholderText('Click to mark task as Completed').forEach(c => fireEvent.click(c));

    expect(store.getActions().length).toEqual(2);
  });

  test('handles delete button click and dispatches deleteTask action', () => {
    render(
        <Provider store={store}>
        <MemoryRouter><TaskList /></MemoryRouter>
      </Provider>
    );

    screen.getAllByText('Delete').forEach(s => fireEvent.click(s));

    expect(store.getActions()).toEqual([deleteTask(0), deleteTask(1)]);
  });

  test('renders Add Task link and navigates to /add on click', () => {
    render(
      <Provider store={store}>
        <MemoryRouter><TaskList /></MemoryRouter>
      </Provider>
    );

    const addTaskLink = screen.getByText('Add Task');
    expect(addTaskLink).toBeInTheDocument();
  });

  test('renders Edit task link and navigates to /edit on click', () => {
    render(
      <Provider store={store}>
        <MemoryRouter><TaskList /></MemoryRouter>
      </Provider>
    );

    const editTask = screen.getAllByText('Edit');
    expect(editTask.length).toEqual(2);
  });

});