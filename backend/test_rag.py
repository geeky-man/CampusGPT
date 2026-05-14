from app.rag.rag_pipeline import (
    ask_question
)

query = "What is the health insurance policy policy?"

response = ask_question(query)

print("\nANSWER:\n")

print(response["answer"])

print("\nSOURCES:\n")

for source in response["sources"]:

    print(source["source"])

    print(source["score"])