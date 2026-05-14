from app.rag.retriever import (
    retrieve_chunks
)

query = "health insurance"

results = retrieve_chunks(query)

for idx, result in enumerate(results):

    print("\n")

    print(f"Result {idx+1}")

    print("-" * 50)

    print("Score:", result["score"])

    print("Source:", result["source"])

    print("Text:")

    print(result["text"][:500])