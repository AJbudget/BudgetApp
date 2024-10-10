from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import datetime

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
    start_date: Optional[datetime]
    end_date: Optional[datetime]

class BudgetUpdate(BaseModel):
    name: str
    amount: float
    start_date: Optional[datetime]
    end_date: Optional[datetime]

class BudgetResponse(BaseModel):
    id: int
    user_id: int
    name: str
    amount: float
    start_date: Optional[datetime]
    end_date: Optional[datetime]

    class Config:
        from_attributes = True

class ItemCreate(BaseModel):
    name: str
    price: float
    date: datetime
    budget_id: int

class ItemUpdate(BaseModel):
    name: str
    price: float
    date: datetime
    budget_id: int

class ItemResponse(BaseModel):
    id: int
    budget_id: int
    name: str
    price: float
    date: datetime

    class Config:
        from_attributes = True