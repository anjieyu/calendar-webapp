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
    connection = connect_db()
    rows = connection.execute("SELECT * FROM events ORDER BY date").fetchall()
    connection.close()
    return [dict(row) for row in rows]

@app.post("/events")
def create_event(event: Event):
    connection = connect_db()
    cursor = connection.execute("INSERT INTO events (title, date, description) VALUES (?, ?, ?)", (event.title, event.date, event.description))
    connection.commit()
    new_id = cursor.lastrowid
    connection.close()
    return {"id": new_id, "message": "event created"}

@app.get("/events/{date}")
def get_events_by_date(date: str):
    connection = connect_db()
    rows = connection.execute("SELECT * FROM events WHERE date = ?", (date,)).fetchall()
    connection.close()
    return [dict(row) for row in rows]

@app.delete("/events/{event_id}")
def delete_event(event_id: int):
    connection = connect_db()
    connection.execute("DELETE FROM events WHERE id = ?", (event_id,))
    connection.commit()
    connection.close()
    return {"message": "event deleted"}
