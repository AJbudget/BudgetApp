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
    amount: float

class BudgetUpdate(BaseModel):
    amount: float

class BudgetResponse(BaseModel):
    id: int
    user_id: int
    amount: float

    class Config:
        orm_mode = True