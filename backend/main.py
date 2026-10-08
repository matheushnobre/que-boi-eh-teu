from fastapi import FastAPI

from fastapi import FastAPI
from routes.classification import router as classification_router

app = FastAPI(
    title="Que Boi É Teu? API",
    version="1.0.0"
)

app.include_router(
    classification_router,
    prefix="/api"
)