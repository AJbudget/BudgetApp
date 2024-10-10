from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from .database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)

class Budget(Base):
    __tablename__ = "budgets"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, index=True)
    name = Column(String, index=True)
    amount = Column(Float)
    start_date = Column(DateTime)
    end_date = Column(DateTime)
    items = relationship("Item", back_populates="budget")

class Item(Base):
    __tablename__ = "items"

    id = Column(Integer, primary_key=True, index=True)
    budget_id = Column(Integer, ForeignKey('budgets.id'))
    name = Column(String, index=True)
    price = Column(Float)
    date = Column(DateTime)
    budget = relationship("Budget", back_populates="items")