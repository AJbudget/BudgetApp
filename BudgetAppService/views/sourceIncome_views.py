from fastapi import APIRouter, HTTPException
from typing import List
from models.models import SourceIncome

router = APIRouter()
db_source_incomes = []

@router.post("/source-incomes/", response_model=SourceIncome)
def create_source_income(source_income: SourceIncome):
    db_source_incomes.routerend(source_income)
    return source_income

@router.get("/source-incomes/", response_model=List[SourceIncome])
def read_source_incomes():
    return db_source_incomes

@router.get("/source-incomes/{source_income_id}", response_model=SourceIncome)
def read_source_income(source_income_id: int):
    return db_source_incomes[source_income_id - 1]  # Example: Assuming source_income_id starts from 1

@router.put("/source-incomes/{source_income_id}", response_model=SourceIncome)
def update_source_income(source_income_id: int, source_income: SourceIncome):
    db_source_incomes[source_income_id - 1] = source_income
    return source_income

@router.delete("/source-incomes/{source_income_id}", response_model=SourceIncome)
def delete_source_income(source_income_id: int):
    deleted_source_income = db_source_incomes.pop(source_income_id - 1)
    return deleted_source_income
