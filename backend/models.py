from sqlalchemy.orm import validates
from sqlalchemy.ext.hybrid import hybrid_property
from config import db, bcrypt
from sqlalchemy_serializer import SerializerMixin

class User(db.Model, SerializerMixin):
  __tablename__ = 'users'
  serialize_rules = ('-_password_hash',)
  id = db.Column(db.Integer, primary_key = True)
  username = db.Column(db.String, nullable=False)
  _password_hash = db.Column(db.String)

  @hybrid_property
  def password_hash(self):
    raise Exception('Password hashes may not be viewed')
  
  @password_hash.setter
  def password_hash(self, password):
    password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
    self._password_hash = password_hash.decode('utf-8')
  def authenticate(self, password):
    return bcrypt.check_password_hash(
  self._password_hash, password.encode('utf-8')
  )
  @validates('username')
  def validate_username(self, key, name):
    if not name or not isinstance(name, str):
      raise ValueError('Username must be non-empty string.')
    return name
  
class TodoList(db.Model):
    __tablename__ = 'todo_lists'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    tasks = db.relationship('Task', back_populates='todo_list', cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'tasks': [t.to_dict() for t in self.tasks if t.parent_id is None]
        }

class Task(db.Model):
    __tablename__ = 'tasks'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    completed = db.Column(db.Boolean, default=False)
    parent_id = db.Column(db.Integer, db.ForeignKey('tasks.id'), nullable=True)
    list_id = db.Column(db.Integer, db.ForeignKey('todo_lists.id'), nullable=False)

    # relationships
    todo_list = db.relationship('TodoList', back_populates='tasks')
    subtasks = db.relationship('Task', backref=db.backref('parent', remote_side=[id]))

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'completed': self.completed,
            'list_id': self.list_id,
            'parent_id': self.parent_id,
            'subtasks': [s.to_dict() for s in self.subtasks]
        }