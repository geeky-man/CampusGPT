from app.loaders.pdf_loader import extract_text_from_pdf
from app.rag.chunking import chunk_text

pdf_path = "uploads/ZS India Bulk Offer Letter_A AC.pdf"

text = extract_text_from_pdf(pdf_path)

chunks = chunk_text(text)

print("Total chunks:", len(chunks))

print("\nFirst chunk:\n")

print(chunks[0])