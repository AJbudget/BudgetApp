from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import Item, Budget, User
from ..schemas import ItemCreate, ItemUpdate, ItemResponse
from ..utils import get_current_user
from typing import List

router = APIRouter()

@router.post("/budget/{budget_id}/items/", response_model=ItemResponse)
def create_item(budget_id: int, item: ItemCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    budget = db.query(Budget).filter(Budget.id == budget_id, Budget.user_id == current_user.id).first()
    if not budget:
        raise HTTPException(status_code=404, detail="Budget not found")

    new_item = Item(
        budget_id=budget_id,
        name=item.name,
        price=item.price,
        date=item.date
    )
    db.add(new_item)
    db.commit()
    db.refresh(new_item)
    return new_item

@router.put("/items/{item_id}", response_model=ItemResponse)
def update_item(item_id: int, item: ItemUpdate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    db_item = db.query(Item).join(Budget).filter(Item.id == item_id, Budget.user_id == current_user.id).first()
    if not db_item:
        raise HTTPException(status_code=404, detail="Item not found")

    db_item.name = item.name
    db_item.price = item.price
    db_item.date = item.date
    db.commit()
    db.refresh(db_item)
    return db_item

@router.delete("/items/{item_id}")
def delete_item(item_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    db_item = db.query(Item).join(Budget).filter(Item.id == item_id, Budget.user_id == current_user.id).first()
    if not db_item:
        raise HTTPException(status_code=404, detail="Item not found")

    db.delete(db_item)
    db.commit()
    return {"detail": "Item deleted"}

@router.get("/budget/{budget_id}/items/", response_model=List[ItemResponse])
def get_items(budget_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    budget = db.query(Budget).filter(Budget.id == budget_id, Budget.user_id == current_user.id).first()
    if not budget:
        raise HTTPException(status_code=404, detail="Budget not found")

    items = db.query(Item).filter(Item.budget_id == budget_id).all()
    return items