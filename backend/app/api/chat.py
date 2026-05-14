from fastapi import APIRouter

from pydantic import BaseModel

from app.rag.rag_pipeline import (
    ask_question
)

router = APIRouter()


class ChatRequest(BaseModel):

    query: str


@router.post("/ask")
def chat(
    request: ChatRequest
):

    response = ask_question(
        request.query
    )

    return response