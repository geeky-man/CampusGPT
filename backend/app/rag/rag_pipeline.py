from app.rag.retriever import (
    retrieve_chunks
)

from app.rag.prompt_builder import (
    build_prompt
)

from app.rag.generator import (
    generate_response
)


def ask_question(query):

    print("Retrieving chunks...")

    retrieved_chunks = retrieve_chunks(
        query
    )

    print("Building prompt...")

    prompt = build_prompt(
        query,
        retrieved_chunks
    )

    print("Generating answer...")

    answer = generate_response(
        prompt
    )

    return {
        "answer": answer,
        "sources": retrieved_chunks
    }