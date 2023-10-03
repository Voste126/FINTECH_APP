from app import app, db  # Import the app and db instance from your app
from models import User, Workout, Exercise  # Import your SQLAlchemy models
from faker import Faker
import re
import random

fake = Faker()

# No need to create another instance of db, use the one from app.py

def generate_fake_password():
    # Generate a fake password meeting your validation criteria
    while True:
        password = fake.password(length=12)
        if (
            len(password) >= 12 and
            len(password) <= 60 and
            re.search(r'[A-Z]', password) and
            re.search(r'[a-z]', password) and
            re.search(r'[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]', password)
        ):
            return password

def seed():
    # Create the application context
    with app.app_context():
        # Create tables if they don't exist (usually done during app initialization)
        db.create_all()

        # Create and insert sample data using Faker
        for _ in range(5):  # Create 5 fake users
            fake_username = fake.user_name()
            fake_password = generate_fake_password()
            user = User(username=fake_username, password=fake_password)
            db.session.add(user)

            for _ in range(3):  # Create 3 fake workouts for each user
                fake_date = fake.date_this_decade()
                workout = Workout(date=fake_date, user=user)
                db.session.add(workout)

                for _ in range(4):  # Create 4 fake exercises for each workout
                    fake_name = fake.word()
                    fake_duration = fake.random_int(min=10, max=120)
                    fake_distance = random.uniform(1.0, 10.0)  # Generate a random float between 1.0 and 10.0
                    fake_sets = fake.random_int(min=1, max=5)
                    fake_reps = fake.random_int(min=5, max=20)
                    fake_weight = fake.random_int(min=5, max=50)
                    fake_category = fake.random_element(elements=('Upper Body', 'Lower Body'))
                    exercise = Exercise(
                        name=fake_name,
                        duration_minutes=fake_duration,
                        distance_km=fake_distance,
                        sets=fake_sets,
                        reps=fake_reps,
                        weight_kg=fake_weight,
                        category=fake_category,
                        workout=workout
                    )
                    db.session.add(exercise)

        # Commit the changes to the database
        db.session.commit()

if __name__ == '__main__':
    seed()


