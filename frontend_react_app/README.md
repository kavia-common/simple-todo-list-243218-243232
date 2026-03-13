# Retro Todo (React)

A lightweight, retro-styled todo list application built with React. It supports adding, completing, deleting, filtering, and searching todos, and it persists your list locally in the browser using `localStorage`.

## Features

This app currently implements the following functionality:

- It lets you add new todos using the input form.
- It lets you toggle a todo between complete and incomplete using the checkbox.
- It lets you delete a todo using the delete button.
- It lets you filter the visible list by **All**, **Active**, or **Completed**.
- It lets you search visible todos by text using a search input.
- It persists todos in the browser using `localStorage`, so the list is still there after refresh.
- It includes a small loading/empty-status component to provide user feedback when the list is empty or filtered to no results.

## Requirements

- Node.js and npm (any modern LTS version should work).

## Setup and Run

From the React app directory:

```bash
cd simple-todo-list-243218-243232/frontend_react_app
npm install
npm start
```

Then open:

- http://localhost:3000

## How to Use the UI

When the app loads, you will see the header **Retro Todo** and a badge that shows how many todos are still not completed.

### Add a todo

Type into the "What needs doing?" input and either:

- Press **Enter**, or
- Click **Add**

The input validates that the todo is not empty and is within the maximum length supported by the UI.

### Mark complete / incomplete

Click the checkbox on a todo to toggle its completion state. Completed items are shown with a struck-through style.

### Search todos

Use the search input to filter the currently visible todos by a text query. The search applies on top of the active filter (All/Active/Completed).

### Filter the list

Use the filter chips:

- **All** shows all items
- **Active** shows incomplete items
- **Completed** shows completed items

### Clear completed

Click **Clear completed** to remove all completed todos from the list. The button is disabled when there are no completed items.

### Delete a todo

Click the delete button on the right side of a todo to remove it.

## Data Persistence

Todos are stored locally in the browser via `localStorage` using a fixed storage key:

- `kavia.todos.v1`

If `localStorage` is unavailable (for example, due to browser privacy settings), the app will still function, but your list may not persist across refreshes.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in development mode.

### `npm test`

Runs the test runner (Create React App / `react-scripts test`).

### `npm run build`

Builds the app for production into the `build/` folder.

## Configuration (Environment Variables)

This project may be deployed in an environment that defines React-prefixed environment variables (for example, `REACT_APP_*`). The current todo app implementation runs fully client-side and does not require backend configuration to work.

If you deploy in a platform that injects the following variables, they are safe to leave unset for local development unless you add API integration later:

- `REACT_APP_API_BASE`
- `REACT_APP_BACKEND_URL`
- `REACT_APP_FRONTEND_URL`
- `REACT_APP_WS_URL`
- `REACT_APP_NODE_ENV`
- `REACT_APP_NEXT_TELEMETRY_DISABLED`
- `REACT_APP_ENABLE_SOURCE_MAPS`
- `REACT_APP_PORT`
- `REACT_APP_TRUST_PROXY`
- `REACT_APP_LOG_LEVEL`
- `REACT_APP_HEALTHCHECK_PATH`
- `REACT_APP_FEATURE_FLAGS`
- `REACT_APP_EXPERIMENTS_ENABLED`
