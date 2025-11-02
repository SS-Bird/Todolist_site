from flask import Flask, request, session
from flask_restful import Api, Resource
from flask_cors import CORS
from config import app, db, api
from models import User, TodoList, Task

# Import routes so they register automatically
from routes import auth_routes, list_routes, task_routes

@app.route('/')
def index():
    return '<h1>Server Home</h1>'

@app.route('/lists/<int:id>', methods=['GET'])
def get_list(id):
    user_id = session.get('user_id')
    if not user_id:
        return {'error': 'Unauthorized'}, 401
    print("Session user_id:", user_id)
    todo_list = TodoList.query.filter_by(id=id, user_id=user_id).first()
    print("Queried list:", todo_list)
    if not todo_list:
        return {'error': 'Not found'}, 404
    return todo_list.to_dict()

# --- Create all tables if they don't exist ---
with app.app_context():
    db.create_all()
    print("✅ Database tables created/verified.")

# --- Optional: seed sample data ---
#from seed import seed_data
#with app.app_context():
#    seed_data(db)

if __name__ == '__main__':
    app.run(port=5555, debug=True)

