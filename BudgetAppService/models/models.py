from typing import Optional
from pydantic import BaseModel
from datetime import date

class User(BaseModel):
    name: str
    email: str
    password: str

    class Config:
        orm_mode = True


class Category(BaseModel):
    name: str
    limit: float

    class Config:
        orm_mode = True

class SourceIncome(BaseModel):
    name: str
    pay: float
    pay_date: date
    isActive: bool
    
    class Config:
        orm_mode = True


class Accounts(BaseModel):
    name: str
    limit: float

    class Config:
        orm_mode = True
