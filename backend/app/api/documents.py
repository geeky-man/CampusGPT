from fastapi import APIRouter
from fastapi import UploadFile
from fastapi import File
from fastapi import Depends

from sqlalchemy.orm import Session
from app.rag.ingestion import ingest_document

import shutil
import os

from app.db.database import SessionLocal

from app.models.document import Document

router = APIRouter()


UPLOAD_DIR = "uploads"

os.makedirs(UPLOAD_DIR, exist_ok=True)


def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()


@router.post("/upload")
def upload_document(
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):

    file_path = f"{UPLOAD_DIR}/{file.filename}"

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    new_document = Document(
        filename=file.filename,
        filepath=file_path,
        uploaded_by="admin"
    )

    db.add(new_document)

    db.commit()

    db.refresh(new_document)
    ingest_document(
        file_path,
        file.filename
    )   

    return {
        "message": "File uploaded successfully",
        "filename": file.filename
    }