from fastapi import APIRouter, HTTPException
from typing import List
from models.models import Category  # Import your Pydantic models

router = APIRouter()

# Example in-memory database for demonstration purposes
db_categories = []

@router.post("/", response_model=Category)
def create_category(category: Category):
    db_categories.append(category)
    return category

@router.get("/", response_model=List[Category])
def read_categories():
    return db_categories

@router.get("/{category_id}", response_model=Category)
def read_category(category_id: int):
    if category_id <= 0 or category_id > len(db_categories):
        raise HTTPException(status_code=404, detail="Category not found")
    return db_categories[category_id - 1]

@router.put("/{category_id}", response_model=Category)
def update_category(category_id: int, category: Category):
    if category_id <= 0 or category_id > len(db_categories):
        raise HTTPException(status_code=404, detail="Category not found")
    db_categories[category_id - 1] = category
    return category

@router.delete("/{category_id}", response_model=Category)
def delete_category(category_id: int):
    if category_id <= 0 or category_id > len(db_categories):
        raise HTTPException(status_code=404, detail="Category not found")
    deleted_category = db_categories.pop(category_id - 1)
    return deleted_category
