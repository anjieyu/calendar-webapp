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

def connect_db():
    connection = sqlite3.connect("events.db")
    connection.row_factory = sqlite3.Row
    return connection

def start_db():
    connection = connect_db()
    connection.execute("""
        CREATE TABLE IF NOT EXISTS events (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            date TEXT NOT NULL,
            description TEXT DEFAULT ''    
        )
    """)
    connection.commit()
    connection.close()

start_db()

@app.get("/")
def root():
    return {"message": "ok"}

@app.get("/events")
def get_all_events():
    return {"message": "return all event objects"}

@app.post("/events")
def create_event(event: Event):
    return {"message": "add the event to the database"}

@app.get("/events/{date}")
def get_events_by_date(date: str):
    return {"message": "get all events on a specific day"}

@app.delete("/events/{event_id}")
def delete_event(event_id: int):
    return {"message": "delete an event by a specific id"}