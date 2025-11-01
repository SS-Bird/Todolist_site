from flask import request, session
from flask_restful import Resource
from config import db, api
from models import User

class Signup(Resource):
    def post(self):
        data = request.get_json()
        username = data.get("username")
        password = data.get("password")
        if username and password and not User.query.filter_by(username=username).first():
            new_user = User(username=username)
            new_user.password_hash = password
            db.session.add(new_user)
            db.session.commit()
            session["user_id"] = new_user.id
            return new_user.to_dict(), 201
        return {"error": "422 Unprocessable Entity"}, 422


class Login(Resource):
    def post(self):
        data = request.get_json()
        username = data.get("username")
        password = data.get("password")
        user = User.query.filter_by(username=username).first()
        if user and user.authenticate(password):
            session["user_id"] = user.id
            return user.to_dict(), 200
        return {"error": "Unauthorized"}, 401


class CheckSession(Resource):
    def get(self):
        user_id = session.get("user_id")
        if user_id:
            user = User.query.get(user_id)
            if user:
                return user.to_dict(), 200
        return {"error": "Unauthorized"}, 401


class Logout(Resource):
    def delete(self):
        if session.get("user_id"):
            session["user_id"] = None
            return {}, 204
        return {"error": "Unauthorized"}, 401


# Register routes
api.add_resource(Signup, "/signup")
api.add_resource(Login, "/login")
api.add_resource(CheckSession, "/check_session")
api.add_resource(Logout, "/logout")