# 🧱 Recursive Todo App – Full Build Checklist

A step-by-step implementation guide with checkboxes so you can track progress.

---

## ✅ PHASE 1 — Foundation (Environment & Backend Skeleton)

- [ ] Confirm environment setup:
  - [ ] Backend runs on **port 5555**
  - [ ] Frontend (Vite) runs on **port 3000**
  - [ ] Proxy `/api → http://127.0.0.1:5555/` confirmed
- [ ] Create backend file structure:
  ```
  backend/
  ├── app.py
  ├── config.py
  ├── models.py
  ├── seed.py
  ├── routes/
  │   ├── auth_routes.py
  │   ├── list_routes.py
  │   └── task_routes.py
  └── __init__.py
  ```
- [ ] Define models in `models.py`:
  - [ ] `User`
  - [ ] `TodoList` (name, user_id)
  - [ ] `Task` (title, list_id, parent_id, completed)
  - [ ] `.to_dict()` methods
- [ ] Configure Flask app in `config.py` (app, db, api, session, CORS)
- [ ] Run migrations  
  ```bash
  flask db init
  flask db migrate -m "init"
  flask db upgrade
  ```
- [ ] Add sample data in `seed.py` and test database in Flask shell

---

## ⚙️ PHASE 2 — Backend Routes (API Logic)

- [ ] Move existing routes from `app.py` into dedicated files:
  - [ ] `auth_routes.py` → `/signup`, `/login`, `/logout`, `/check_session`
  - [ ] `list_routes.py` → `/lists` CRUD
  - [ ] `task_routes.py` → `/tasks` CRUD
- [ ] Import all routes in `app.py`
  ```python
  from routes import auth_routes, list_routes, task_routes
  ```
- [ ] Test endpoints with Postman:
  - [ ] `GET /lists`
  - [ ] `POST /tasks`
  - [ ] `PATCH /tasks/<id>`
  - [ ] Authentication flow

---

## 💻 PHASE 3 — Frontend Setup

- [ ] Verify structure:
  ```
  src/
  ├── api/
  │   └── index.js
  ├── components/
  │   ├── Nav.jsx
  │   ├── AddButton.jsx
  │   ├── ListCard.jsx
  │   ├── TaskItem.jsx
  │   ├── Breadcrumbs.jsx
  │   └── LoadingSpinner.jsx
  ├── pages/
  │   ├── HomePage.jsx
  │   ├── ListPage.jsx
  │   ├── TaskPage.jsx
  │   └── PageTemplate.jsx
  ├── App.jsx
  ├── main.jsx
  └── index.css
  ```
- [ ] Create `api/index.js` with reusable fetchers:
  - [ ] `getLists()`
  - [ ] `getTasks(listId)`
  - [ ] `addList(name)`
  - [ ] `addTask(title, listId)`
- [ ] Simplify `App.jsx`: handle routes, user state, and Nav only

---

## 🧭 PHASE 4 — Pages & Recursive Layout

- [ ] Build `PageTemplate.jsx`
  - [ ] Shared header and breadcrumbs
  - [ ] Accepts props: `title`, `children`, `level`
- [ ] Create `HomePage.jsx`
  - [ ] Show all user lists
  - [ ] “Add list” button → POST `/lists`
  - [ ] Clicking a list navigates to `/lists/:id`
- [ ] Create `ListPage.jsx`
  - [ ] Fetch tasks for a given list
  - [ ] Clicking a task navigates to `/tasks/:id`
- [ ] Create `TaskPage.jsx`
  - [ ] Show subtasks of the given task
  - [ ] Limit recursion to 3 levels
  - [ ] Use `PageTemplate` for layout

---

## 🧩 PHASE 5 — Components

- [ ] Add `Nav.jsx` — logout, login/signup links, and home navigation
- [ ] Add `AddButton.jsx` — reusable “+” action button
- [ ] Add `ListCard.jsx` — displays individual list
- [ ] Add `TaskItem.jsx` — displays a single task
- [ ] Add `Breadcrumbs.jsx` — show current path (Home / List / Task)
- [ ] Add `LoadingSpinner.jsx` — visible while fetching data

---

## 🔁 PHASE 6 — Navigation & Recursion Wiring

- [ ] Update `App.jsx` with routes:
  ```
  / → HomePage
  /lists/:id → ListPage
  /tasks/:id → TaskPage
  ```
- [ ] In `ListPage` and `TaskPage`:
  - [ ] Use `useParams()` to fetch data
  - [ ] Add navigation for child elements
- [ ] Limit recursion:
  - [ ] Track recursion depth (0 = Home, 1 = ListPage, 2 = TaskPage)
  - [ ] Disable further nesting beyond level 2

---

## 🧪 PHASE 7 — Testing & Polish

- [ ] Test login/signup/logout flow
- [ ] Test navigation:
  - [ ] Home → List → Task → Subtask
  - [ ] Breadcrumbs navigate correctly
- [ ] Test CRUD operations:
  - [ ] Add/edit/delete lists
  - [ ] Add/edit/delete tasks
  - [ ] Confirm subtasks capped at 3 levels
- [ ] Add UI polish:
  - [ ] Loading states
  - [ ] Animations
  - [ ] Responsive layout
- [ ] Final cleanup:
  - [ ] Create `.env`
  - [ ] Update `README.md`
  - [ ] Prepare for deployment
