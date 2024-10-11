from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import datetime
from enum import Enum

class Recurrence(str, Enum):
    NONE = "none"
    DAILY = "daily"
    WEEKLY = "weekly"
    MONTHLY = "monthly"
    YEARLY = "yearly"

class SignupRequest(BaseModel):
    username: str
    password: str
    email: EmailStr

class UserResponse(BaseModel):
    id: int
    username: str
    email: EmailStr

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: str | None = None

class BudgetCreate(BaseModel):
    name: str
    amount: float
    start_date: Optional[datetime]
    end_date: Optional[datetime]
    recurrence: Recurrence = Recurrence.NONE

class BudgetUpdate(BaseModel):
    name: str
    amount: float
    start_date: Optional[datetime]
    end_date: Optional[datetime]
    recurrence: Recurrence = Recurrence.NONE

class BudgetResponse(BaseModel):
    id: int
    user_id: int
    name: str
    amount: float
    start_date: Optional[datetime]
    end_date: Optional[datetime]
    recurrence: Recurrence

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