def build_prompt(
    query,
    retrieved_chunks
):

    context = "\n\n".join([
        chunk["text"]
        for chunk in retrieved_chunks
    ])

    prompt = f"""
You are an intelligent college assistant.

Answer the user's question ONLY using the provided context.

If the answer is not found in the context, say:
"I could not find relevant information in the uploaded documents."

Context:
{context}

Question:
{query}

Answer:
"""

    return prompt