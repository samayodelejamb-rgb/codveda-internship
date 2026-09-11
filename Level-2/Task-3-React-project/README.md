# TaskTracker

A small React + Vite project — an add/edit/delete/filter task tracker —
built for Task 3 (Level 2, Intermediate): components, props, and state.

Open the local URL Vite prints (usually `http://localhost:5173`).

## Project structure

task-tracker/
├── index.html
├── package.json
├── vite.config.js
├── src/
│   ├── main.jsx
│   ├── App.jsx              # owns all state
│   ├── App.css
│   ├── index.css
│   └── components/
│       ├── Sidebar.jsx       # nav + branding
│       ├── Header.jsx        # greeting
│       ├── TaskForm.jsx      # add-task input + date + button
│       ├── FilterButtons.jsx # All / Pending / Completed pills
│       ├── TaskList.jsx      # filters + maps tasks
│       └── TaskCard.jsx      # one task: toggle, edit, delete

## State (all lives in `App`)

- `tasks` — array of `{ id, title, date, completed }`
- `newTask` — controlled value of the add-task input
- `newDate` — controlled value of the date select
- `filter` — `"All" | "Pending" | "Completed"`

Everything below `App` is a function of props derived from this state —
no other component calls `useState` for shared data. `TaskCard` keeps one
small local state value (`editing`) because that's private UI state, not
something the rest of the app needs to know about.

## Functionality

- Add a task (title + optional due label)
- Mark a task complete / pending (toggle)
- Edit a task's title inline
- Delete a task
- Filter by All / Pending / Completed, from either the sidebar or the
  filter pills — both control the same `filter` state in `App`

## Note

This was hand-built to run as a normal Vite project — `npm install` +
`npm run dev` should bring it straight up. It hasn't been run through
that exact install/dev cycle in the environment that generated it (no
network access there), so if you hit anything odd on first run, it's
most likely a small typo rather than a structural issue — happy to
debug it with you.
