import os
import re
import faiss
import numpy as np
import pandas as pd
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from Sastrawi.StopWordRemover.StopWordRemoverFactory import \
    StopWordRemoverFactory
from sentence_transformers import SentenceTransformer


os.environ["TF_ENABLE_ONEDNN_OPTS"] = "0"

app = FastAPI(title="Game Recommendation & Chatbot API")

# Tambahkan CORS agar frontend bisa akses API dari browser
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # atau ganti dengan ["http://localhost:3000"] untuk lebih aman
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Inisialisasi data/model untuk recommendation ---
names = pd.read_csv('./name2.csv')['name'].tolist()
embeddings = np.load('./embeddings.npy')
embeddings_faiss = np.array(embeddings, dtype=np.float32)
index_rec = faiss.read_index('./faiss_index2.idx')

# --- Inisialisasi data/model untuk chatbot ---
model = SentenceTransformer('all-MiniLM-L6-v2')
index_chat = faiss.read_index('./faiss_index2.idx')
df_chat = pd.read_csv('./data_chatbot.csv')
factory = StopWordRemoverFactory()
stopwords = set(factory.get_stop_words())

# --- Model request ---
class GameRequest(BaseModel):
    game_name: str
    k: int = 6

class ChatRequest(BaseModel):
    text: str
    k: int = 5

# --- Fungsi utilitas chatbot ---
def clean_game_text(text, remove_duplicates=True):
    text = re.sub(r'[^a-zA-Z\s]', '', text)
    kamus = ['game', 'bermain']
    text = text.lower()
    words = text.split()
    filtered_words = [word for word in words if word not in kamus]
    filtered_words = [word for word in filtered_words if word not in stopwords]
    if remove_duplicates:
        seen = set()
        filtered_words = [x for x in filtered_words if not (x in seen or seen.add(x))]
    return ' '.join(filtered_words)

def retrieve_similar_products(query, k=5):
    query_vec = model.encode([query])
    distances, indices = index_chat.search(query_vec, k)
    results = []
    for idx, dist in zip(indices[0], distances[0]):
        if 0 <= idx < len(df_chat):
            results.append({
                "name": df_chat.iloc[idx]['name'],
                "distance": float(dist)
            })
    return results

# --- Endpoint Recommendation ---
@app.post("/similar_games/")
def find_similar_games_api(request: GameRequest):
    game_name = request.game_name.lower()
    k = request.k
    try:
        game_referensi_index = names.index(game_name)
        query_embedding = embeddings_faiss[game_referensi_index].reshape(1, -1)
        D, I = index_rec.search(query_embedding, k)
        results = []
        for i in range(1, k):
            similar_game_index = I[0][i]
            similarity_distance = float(D[0][i])
            if 0 <= similar_game_index < len(names):
                results.append({
                    "game": names[similar_game_index],
                    "distance": similarity_distance
                })
            else:
                results.append({
                    "game": f"Index {similar_game_index} out of range",
                    "distance": similarity_distance
                })
        results.sort(key=lambda x: x["distance"], reverse=True)
        return {
            "query": game_name,
            "recommendations": results
        }
    except ValueError:
        raise HTTPException(status_code=404, detail=f"Game dengan nama '{request.game_name}' tidak ditemukan. Pastikan penulisan sudah benar.")

# --- Endpoint Chatbot ---
@app.post("/chatbot/")
def chatbot_api(request: ChatRequest):
    cleaned = clean_game_text(request.text)
    results = retrieve_similar_products(cleaned, request.k)
    return {
        "query": request.text,
        "cleaned": cleaned,
        "recommendations": results
    }
