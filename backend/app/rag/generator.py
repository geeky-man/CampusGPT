import requests


OLLAMA_URL = "http://localhost:11434/api/generate"


def generate_response(prompt):

    response = requests.post(

        OLLAMA_URL,

        json={
            "model": "llama3",
            "prompt": prompt,
            "stream": False
        }
    )

    data = response.json()

    return data["response"]