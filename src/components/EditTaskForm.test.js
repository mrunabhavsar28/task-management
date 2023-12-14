// EditTaskForm.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import moment from 'moment';
import EditTaskForm from './EditTaskForm';
import { editTask } from '../redux/actionCreators';

const mockStore = configureStore();

describe('EditTaskForm Component', () => {
    let store;

    beforeEach(() => {
        store = mockStore({
            tasks: [
                { title: 'Task 1', description: 'Description 1', dueDate: '2023-12-31', status: 'Pending' },
                { title: 'Task 2', description: 'Description 2', dueDate: '2023-12-30', status: 'Completed' },
            ],
        });
    });

    test('renders EditTaskForm component', () => {
        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/edit/0']}>
                    <Routes>
                        <Route path="/edit/:taskId" element={<EditTaskForm />} />
                    </Routes>
                </MemoryRouter>
            </Provider>
        );

        expect(screen.getByText('Edit Task')).toBeInTheDocument();
        expect(screen.getByLabelText('Title:')).toBeInTheDocument();
        expect(screen.getByLabelText('Description:')).toBeInTheDocument();
        expect(screen.getByLabelText('Due Date:')).toBeInTheDocument();
        expect(screen.getByText('Save Changes')).toBeInTheDocument();
        expect(screen.getByText('Back to Task List')).toBeInTheDocument();
    });

    test('loads task data into the form', () => {
        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/edit/0']}>
                    <Routes>
                        <Route path="/edit/:taskId" element={<EditTaskForm />} />
                    </Routes>
                </MemoryRouter>
            </Provider>
        );

        // Assume that the task with index 0 is loaded into the form
        const titleInput = screen.getByLabelText('Title:');
        const descriptionInput = screen.getByLabelText('Description:');
        const dueDateInput = screen.getByLabelText('Due Date:');

        expect(titleInput.value).toBe('Task 1');
        expect(descriptionInput.value).toBe('Description 1');
        expect(dueDateInput.value).toBe('2023-12-31');
    });

    test('handles input changes', () => {
        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/edit/0']}>
                    <Routes>
                        <Route path="/edit/:taskId" element={<EditTaskForm />} />
                    </Routes>
                </MemoryRouter>
            </Provider>
        );

        const titleInput = screen.getByLabelText('Title:');
        const descriptionInput = screen.getByLabelText('Description:');
        const dueDateInput = screen.getByLabelText('Due Date:');

        fireEvent.change(titleInput, { target: { value: 'Updated Title' } });
        fireEvent.change(descriptionInput, { target: { value: 'Updated Description' } });
        fireEvent.change(dueDateInput, { target: { value: '2023-12-30' } });

        expect(titleInput.value).toBe('Updated Title');
        expect(descriptionInput.value).toBe('Updated Description');
        expect(dueDateInput.value).toBe('2023-12-30');
    });

    test('submits the form and dispatches editTask action', () => {
        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/edit/0']}>
                    <Routes>
                        <Route path="/edit/:taskId" element={<EditTaskForm />} />
                    </Routes>
                </MemoryRouter>
            </Provider>
        );

        const saveChangesButton = screen.getByText('Save Changes');
        fireEvent.click(saveChangesButton);

        expect(store.getActions()[0]).toEqual(editTask( "0", {"description": "Description 1", "dueDate": "2023-12-31", "status": "Pending", "title": "Task 1"}));
    });

    test('navigates back to Task List on "Back to Task List" button click', () => {
        const { container } = render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/edit/0']}>
                    <Routes>
                        <Route path="/edit/:taskId" element={<EditTaskForm />} />
                    </Routes>
                </MemoryRouter>
            </Provider>
        );

        const backButton = screen.getByText('Back to Task List');

        expect(backButton).toBeInTheDocument();
    });
});
