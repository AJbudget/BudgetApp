from fastapi import FastAPI
from .database import engine, Base
from .auth import router as auth_router
from .budget import router as budget_router

app = FastAPI()

Base.metadata.create_all(bind=engine)

app.include_router(auth_router, prefix="/auth", tags=["auth"])
app.include_router(budget_router, prefix="/budget", tags=["budget"])