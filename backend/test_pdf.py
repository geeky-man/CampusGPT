from app.loaders.pdf_loader import extract_text_from_pdf

pdf_path = "uploads/ZS India Bulk Offer Letter_A AC.pdf"

text = extract_text_from_pdf(pdf_path)

print(text[:500])