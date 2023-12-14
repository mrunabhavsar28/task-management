
In the project directory, you can run:

### `npm start`

Steps to run project locally:

Go to task-management folder using cd .\task-managment\

1. Clone GIT repository with command : 
    git clone https://github.com/mrunabhavsar28/Task_Management_App.git
2. Open repository in Visual Studio
3. Run command npm install
4. Run command npm start
5. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.


Features covered under this project:
1. Task List, Add Task, Edit Task, Delete Task and Toggle Task status (Pending / Completed).
2. Task List Sorting : 
    a. You can sort task lists by any of the task fields by clicking on the table header (Incremental / decremental).
    b. You can sort on composite(more than 1) columns together by clicking CTRL button and clicking on headers of column for which  sorting is needed.
3. Filter:
    a. Global Filter: You can search any string in global filter text box. It will search all the table columns from task table.
    b. Status Filter: You can search by status in status filter text box.
4. Routers: I have 3 routes a. TaskList b. Add Tasks c. Edit Tasks
5. Animation: Animation is added for Task Management title and when we route to different URLs.
6. Marking task as complete: You can mark task as complete by clicking on checkbox.
7. Validations: Title and Description fields are mandatory. User can only select future due dates.
8. I have used localstorage to save application state so that refresh wont cause state refresh. Data will be persisted even after browser refresh.
9. I have covered unit testing of all 3 components using react testing library.
10. I have used bootstrap classes for css formatting.

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.