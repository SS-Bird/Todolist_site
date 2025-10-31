webapp/
├── api/                              # Backend (Flask + SQLAlchemy)
│   ├── instance/
│   │   └── app.db                    # SQLite database
│   ├── migrations/                   # Alembic migration files
│   │   ├── versions/
│   │   ├── alembic.ini
│   │   ├── env.py
│   │   └── script.py.mako
│   ├── __pycache__/
│   ├── app.py                        # Flask entry point
│   ├── config.py                     # Configuration (dev/prod)
│   ├── models.py                     # SQLAlchemy models
│   ├── routes/                       # Organized route blueprints
│   │   ├── __init__.py
│   │   ├── auth_routes.py
│   │   ├── list_routes.py
│   │   └── task_routes.py
│   ├── requirements.txt              # Python dependencies
│   ├── seed.py                       # Database seeding
│   └── README.md
│
├── to-do-app/                        # Frontend (React + Vite)
│   ├── node_modules/
│   ├── public/
│   │   └── favicon.ico
│   ├── src/
│   │   ├── components/               # Reusable components
│   │   │   ├── Nav.jsx
│   │   │   ├── ListCard.jsx
│   │   │   ├── TaskItem.jsx
│   │   │   ├── AddButton.jsx
│   │   │   ├── Breadcrumbs.jsx
│   │   │   └── LoadingSpinner.jsx
│   │   │
│   │   ├── pages/                    # Page-level components
│   │   │   ├── HomePage.jsx          # Displays all lists
│   │   │   ├── ListPage.jsx          # Displays one list and its tasks
│   │   │   ├── TaskPage.jsx          # Displays a task’s subtasks (recursion)
│   │   │   ├── PageTemplate.jsx      # Shared layout for recursive pages
│   │   │   ├── LoginPage.jsx
│   │   │   └── SignupPage.jsx
│   │   │
│   │   ├── App.jsx                   # Main app + routes
│   │   ├── main.jsx                  # Entry file for ReactDOM
│   │   ├── App.css
│   │   ├── index.css
│   │   └── api.js                    # Centralized fetch functions
│   │
│   ├── package.json
│   ├── vite.config.js
│   ├── eslint.config.js
│   ├── index.html
│   └── README.md
│
├── venv/                             # Python virtual environment
│   ├── bin/
│   ├── include/
│   ├── lib/
│   └── pyvenv.cfg
│
├── Pipfile
├── Pipfile.lock
└── README.md
