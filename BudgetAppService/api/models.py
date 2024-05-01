from typing import Optional
from pydantic import BaseModel

class User(BaseModel):
    id: str
    username: str
    email: str
    full_name: Optional[str] = None

    class Config:
        orm_mode = True