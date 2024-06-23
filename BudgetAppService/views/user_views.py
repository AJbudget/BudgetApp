from fastapi import APIRouter, HTTPException
from typing import List
from models.models import User

router = APIRouter()
db_users = []

@router.post("/", response_model=User)
def create_user(user: User):
    db_users.append(user)
    return user

@router.get("/", response_model=List[User])
def read_users():
    return db_users

@router.get("/{user_id}", response_model=User)
def read_user(user_id: int):
    if user_id <= 0 or user_id > len(db_users):
        raise HTTPException(status_code=404, detail="User not found")
    return db_users[user_id - 1]

@router.put("/{user_id}", response_model=User)
def update_user(user_id: int, user: User):
    if user_id <= 0 or user_id > len(db_users):
        raise HTTPException(status_code=404, detail="User not found")
    db_users[user_id - 1] = user
    return user

@router.delete("/{user_id}", response_model=User)
def delete_user(user_id: int):
    if user_id <= 0 or user_id > len(db_users):
        raise HTTPException(status_code=404, detail="User not found")
    deleted_user = db_users.pop(user_id - 1)
    return deleted_user
