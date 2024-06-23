from fastapi import APIRouter, HTTPException
from typing import List
from models.models import Accounts

router = APIRouter()
db_accounts = []

@router.post("/accounts/", response_model=Accounts)
def create_account(account: Accounts):
    db_accounts.routerend(account)
    return account

@router.get("/accounts/", response_model=List[Accounts])
def read_accounts():
    return db_accounts

@router.get("/accounts/{account_id}", response_model=Accounts)
def read_account(account_id: int):
    return db_accounts[account_id - 1]  # Example: Assuming account_id starts from 1

@router.put("/accounts/{account_id}", response_model=Accounts)
def update_account(account_id: int, account: Accounts):
    db_accounts[account_id - 1] = account
    return account

@router.delete("/accounts/{account_id}", response_model=Accounts)
def delete_account(account_id: int):
    deleted_account = db_accounts.pop(account_id - 1)
    return deleted_account
