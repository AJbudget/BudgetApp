from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import Budget, User
from ..schemas import BudgetCreate, BudgetUpdate, BudgetResponse
from ..utils import get_current_user
from typing import List

router = APIRouter()

@router.post("/", response_model=BudgetResponse)
def create_budget(budget: BudgetCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    new_budget = Budget(
        user_id=current_user.id,
        name=budget.name,
        amount=budget.amount,
        start_date=budget.start_date,
        end_date=budget.end_date,
        recurrence=budget.recurrence
    )
    db.add(new_budget)
    db.commit()
    db.refresh(new_budget)
    return new_budget

@router.put("/{budget_id}", response_model=BudgetResponse)
def update_budget(budget_id: int, budget: BudgetUpdate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    db_budget = db.query(Budget).filter(Budget.id == budget_id, Budget.user_id == current_user.id).first()
    if not db_budget:
        raise HTTPException(status_code=404, detail="Budget not found")

    db_budget.name = budget.name
    db_budget.amount = budget.amount
    db_budget.start_date = budget.start_date
    db_budget.end_date = budget.end_date
    db_budget.recurrence = budget.recurrence
    db.commit()
    db.refresh(db_budget)
    return db_budget

@router.delete("/{budget_id}")
def delete_budget(budget_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    db_budget = db.query(Budget).filter(Budget.id == budget_id, Budget.user_id == current_user.id).first()
    if not db_budget:
        raise HTTPException(status_code=404, detail="Budget not found")

    db.delete(db_budget)
    db.commit()
    return {"detail": "Budget deleted"}

@router.get("/", response_model=List[BudgetResponse])
def get_user_budgets(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    budgets = db.query(Budget).filter(Budget.user_id == current_user.id).all()
    return budgets