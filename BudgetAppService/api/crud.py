from pymongo import MongoClient
from bson import ObjectId

client = MongoClient("mongodb://localhost:27017/")
db = client["your_database_name"]
collection = db["your_collection_name"]

def create_user(user_data: dict):
    result = collection.insert_one(user_data)
    return result.inserted_id

def get_user(user_id: str):
    user = collection.find_one({"_id": ObjectId(user_id)})
    return user

def update_user(user_id: str, updated_data: dict):
    result = collection.update_one({"_id": ObjectId(user_id)}, {"$set": updated_data})
    return result.modified_count

def delete_user(user_id: str):
    result = collection.delete_one({"_id": ObjectId(user_id)})
    return result.deleted_count