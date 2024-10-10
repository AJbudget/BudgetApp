from fastapi import FastAPI
from .database import engine, Base
from .routers.auth import router as auth_router
from .routers.budget import router as budget_router
from .routers.item import router as item_router

app = FastAPI()

Base.metadata.create_all(bind=engine)

app.include_router(auth_router, prefix="/auth", tags=["auth"])
app.include_router(budget_router, prefix="/budget", tags=["budget"])
app.include_router(item_router, prefix="/items", tags=["items"])