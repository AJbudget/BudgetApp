from pydantic import BaseModel, EmailStr
from typing import List

class SignupRequest(BaseModel):
    username: str
    password: str
    email: EmailStr

class Token(BaseModel):
    access_token: str
    token_type: str

class BudgetCreate(BaseModel):
    name: str
    amount: float

class BudgetUpdate(BaseModel):
    name: str
    amount: float

class BudgetResponse(BaseModel):
    id: int
    user_id: int
    name: str
    amount: float

    class Config:
        orm_mode = True