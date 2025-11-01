from config import app, db
from models import User, TodoList, Task

# import routes so they register automatically
from routes import auth_routes, list_routes, task_routes

@app.route('/')
def index():
    return '<h1>Server Home</h1>'

# --- create tables automatically ---
with app.app_context():
    db.create_all()  # creates all tables if they don't exist

if __name__ == '__main__':
    app.run(port=5555, debug=True)