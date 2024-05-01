from fastapi import FastAPI
from api import models

app = FastAPI()

@app.post("/users/")
def create_user(user: models.User):
    return {"message": "User created successfully", "user": user}

@app.get("/users/{user_id}")
def read_user(user_id: str):
    user = retrieve_user_from_database(user_id)
    return user