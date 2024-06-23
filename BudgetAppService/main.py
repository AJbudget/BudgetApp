from fastapi import FastAPI
from views import user_views, category_views, sourceIncome_views, accounts_views  # Import your views

app = FastAPI()

# Include routers from each view file
app.include_router(user_views.router, prefix="/users", tags=["users"])
app.include_router(category_views.router, prefix="/categories", tags=["categories"])
app.include_router(sourceIncome_views.router, prefix="/sourceIncomes", tags=["sourceIncomes"])
app.include_router(accounts_views.router, prefix="/accounts", tags=["accounts"])

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
