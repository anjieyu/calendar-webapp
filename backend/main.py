from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import sqlite3

app = FastAPI()
app.add_middleware(CORSMiddleware)

@app.get("/")
def root():
    return {"message": "ok"}