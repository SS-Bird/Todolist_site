from config import db, api
from models import User, TodoList, Task
from flask import request, session
from flask_restful import Resource

def get_current_user():
    user_id = session.get("user_id")
    return User.query.get(user_id) if user_id else None


class TasksResource(Resource):
    def post(self):
        user = get_current_user()
        if not user:
            return {"error": "Unauthorized"}, 401
        data = request.get_json()
        task = Task(
            title=data["title"],
            list_id=data["list_id"],
            parent_id=data.get("parent_id")
        )
        db.session.add(task)
        db.session.commit()
        return task.to_dict(), 201

    def patch(self, id):
        user = get_current_user()
        if not user:
            return {"error": "Unauthorized"}, 401
        task = Task.query.get(id)
        if not task:
            return {"error": "Task not found"}, 404
        data = request.get_json()
        task.completed = data.get("completed", task.completed)
        db.session.commit()
        return task.to_dict(), 200

    def delete(self, id):
        user = get_current_user()
        if not user:
            return {"error": "Unauthorized"}, 401
        task = Task.query.get(id)
        if not task:
            return {"error": "Not found"}, 404
        db.session.delete(task)
        db.session.commit()
        return {}, 204
    
    # routes/task_routes.py
    class TasksResource(Resource):
        def get(self):
            list_id = request.args.get("list_id")
            user = get_current_user()
            if not user:
                return {"error": "Unauthorized"}, 401
            if not list_id:
                return {"error": "Missing list_id"}, 400

            tasks = Task.query.filter_by(list_id=list_id).all()
            return [t.to_dict() for t in tasks], 200


# Register route
api.add_resource(TasksResource, "/tasks", "/tasks/<int:id>")