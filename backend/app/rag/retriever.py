from qdrant_client import QdrantClient

from app.rag.embeddings import (
    generate_embedding
)

COLLECTION_NAME = "campus_documents"

client = QdrantClient(
    host="localhost",
    port=6333
)


def retrieve_chunks(
    query,
    top_k=5
):

    query_embedding = generate_embedding(
        query
    )

    results = client.query_points(
        collection_name=COLLECTION_NAME,

        query=query_embedding,

        limit=top_k
    )

    retrieved_chunks = []

    for point in results.points:

        retrieved_chunks.append({

            "text": point.payload["text"],

            "source": point.payload["source"],

            "score": point.score
        })

    return retrieved_chunks