from fastapi import APIRouter, UploadFile, File
from services.classification import classifier

router = APIRouter(
    prefix="/classification",
    tags=["Classification"]
)

@router.post("")
async def classify(file: UploadFile = File(...)):
    return await classifier.classify(file)