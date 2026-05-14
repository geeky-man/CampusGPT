from app.rag.embeddings import generate_embedding

text = "Attendance rules for students"

embedding = generate_embedding(text)

print(len(embedding))

print(embedding[:10])