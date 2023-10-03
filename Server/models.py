from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import validates
db = SQLAlchemy()
import re

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(60), unique=True, nullable = False)
    workouts = db.relationship('Workout', backref='user', lazy=True)

    @validates
    def validate_password(self, password):
        if len(password) < 12 or len(password) > 60:
            raise ValueError("Password must be between 12 and 60 characters")

        if not re.search(r'[A-Z]', password):
            raise ValueError("Password must contain at least one capital letter")

        if not re.search(r'[a-z]', password):
            raise ValueError("Password must contain at least one small letter")

        if not re.search(r'[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]', password):
            raise ValueError("Password must contain at least one special character")


class Workout(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Date, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    exercises = db.relationship('Exercise', backref='workout', lazy=True)


# Each workout can have multiple exercises.
class Exercise(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    duration_minutes = db.Column(db.Integer, nullable=True)
    distance_km = db.Column(db.Float, nullable=True)
    sets = db.Column(db.Integer, nullable=True)
    reps = db.Column(db.Integer, nullable=True)
    weight_kg = db.Column(db.Float, nullable=True)
    category = db.Column(db.String(50), nullable=False) 
    workout_id = db.Column(db.Integer, db.ForeignKey('workout.id'), nullable=False)
