from sqlalchemy.orm import Session
from . import models, schemas

def create_budget(db: Session, budget: schemas.BudgetCreate):
    db_budget = models.Budget(amount=budget.amount)
    db.add(db_budget)
    db.commit()
    db.refresh(db_budget)
    return db_budget

def get_budget(db: Session, budget_id: int):
    return db.query(models.Budget).filter(models.Budget.id == budget_id).first()

def update_budget(db: Session, budget_id: int, budget: schemas.BudgetUpdate):
    db_budget = db.query(models.Budget).filter(models.Budget.id == budget_id).first()
    if db_budget:
        db_budget.amount = budget.amount
        db.commit()
        db.refresh(db_budget)
    return db_budget
