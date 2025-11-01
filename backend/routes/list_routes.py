from flask import request, session
from flask_restful import Resource
from config import db, api
from models import TodoList, User

# helper function
def get_current_user():
    user_id = session.get("user_id")
    return User.query.get(user_id) if user_id else None


class TodoListsResource(Resource):
    def get(self):
        user = get_current_user()
        if not user:
            return {"error": "Unauthorized"}, 401
        lists = TodoList.query.filter_by(user_id=user.id).all()
        return [l.to_dict() for l in lists], 200

    def post(self):
        user = get_current_user()
        if not user:
            return {"error": "Unauthorized"}, 401
        data = request.get_json()
        new_list = TodoList(name=data.get("name"), user_id=user.id)
        db.session.add(new_list)
        db.session.commit()
        return new_list.to_dict(), 201


# Register route
api.add_resource(TodoListsResource, "/lists")