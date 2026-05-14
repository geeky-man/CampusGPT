from qdrant_client import QdrantClient

from qdrant_client.models import (
    VectorParams,
    Distance,
    PointStruct
)

import uuid


client = QdrantClient(
    host="localhost",
    port=6333
)

COLLECTION_NAME = "campus_documents"


def create_collection():

    collections = client.get_collections()

    existing = [
        col.name
        for col in collections.collections
    ]

    if COLLECTION_NAME not in existing:

        client.create_collection(
            collection_name=COLLECTION_NAME,

            vectors_config=VectorParams(
                size=384,
                distance=Distance.COSINE
            )
        )

        print("Collection created")

    else:

        print("Collection already exists")


def store_chunks(
    chunks,
    embeddings,
    filename
):

    points = []

    for chunk, embedding in zip(
        chunks,
        embeddings
    ):

        point = PointStruct(

            id=str(uuid.uuid4()),

            vector=embedding,

            payload={
                "text": chunk,
                "source": filename
            }
        )

        points.append(point)

    client.upsert(
        collection_name=COLLECTION_NAME,
        points=points
    )

    print("Chunks stored in Qdrant")