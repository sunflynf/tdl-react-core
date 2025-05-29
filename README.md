# React with core concepts

A feature-rich Todo application built with React, featuring three different views (List, Table, and Card) for managing tasks.

## Features

- **Multiple Views:**

  - List View: Simple list of todos with status toggle
  - Table View: Tabular view with inline editing
  - Card View: Kanban-style board with drag-and-drop functionality

- **Functionality:**
  - Add, edit, and delete todos
  - Change status (To do, Doing, Done)
  - Drag and drop in Card view
  - Data persistence with localStorage

## Package

- n
- `create-vite`

### Start

```bash
npm create vite tdl-react-core --template react
```

### Update

```bash
npm update
```

### Run

```bash
npm install
npm start
```

## Tech

| Partition        | Technologies            |
| ---------------- | ----------------------- |
| State Management | React Context + Reducer |
| UI               | CSS core + CSS modules  |
| Icons            | react-icons             |
| Router           | Custom with history     |
| Form             | FormMik + Yup           |
| Data fetching    | fetch API               |
| Test             | Jest                    |
| Mock             | json-server             |
| Fake data        | @faker-js/faker         |

## What includes inside

- [x] Wrap by TodoProvider > RouterProvider
- [x] Header as Navbar + Link
- [x] Dialog to add to do
- [x] Dashboard with normal list + edit with dialog
- [x] Table with edit to do inside
- [x] Kanban horizontal
- [ ] Kanban vertical
- [x] Drag & Drop card
- [ ] Kanban edit with drawer (offcanvas)
- [x] Confirm archive dialog
- [ ] Toast notification (Provider + animation)
- [ ] Fetch data with REST Apis
