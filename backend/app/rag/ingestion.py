from app.loaders.pdf_loader import (
    extract_text_from_pdf
)

from app.rag.chunking import (
    chunk_text
)

from app.rag.embeddings import (
    generate_embedding
)

from app.rag.vector_store import (
    create_collection,
    store_chunks
)


def ingest_document(
    pdf_path,
    filename
):

    print("Extracting text...")

    text = extract_text_from_pdf(
        pdf_path
    )

    print("Chunking text...")

    chunks = chunk_text(text)

    print(f"Total chunks: {len(chunks)}")

    print("Generating embeddings...")

    embeddings = []

    for chunk in chunks:

        embedding = generate_embedding(
            chunk
        )

        embeddings.append(embedding)

    print("Storing in Qdrant...")

    create_collection()

    store_chunks(
        chunks,
        embeddings,
        filename
    )

    print("Ingestion complete")