from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import sqlite3
from pydantic import BaseModel

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins = ["*"],
    allow_methods = ["*"],
    allow_headers = ["*"]
    )

class Event(BaseModel):
    title: str
    date: str
    description: str = ""

@app.get("/")
def root():
    return {"message": "ok"}

@app.get("/events")
def get_all_events():
    return {"message": "return all event objects"}

@app.post("/events")
def create_event(event: Event):
    return {"message": "add the event to the database"}