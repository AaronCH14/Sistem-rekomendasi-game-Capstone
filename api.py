import pandas as pd
import numpy as np
import faiss
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Game Recommendation API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

names = pd.read_csv('./name2.csv')['name'].fillna('').astype(str).tolist()

embeddings = np.load('./game_embeddings2.npy')
embeddings_faiss = np.array(embeddings, dtype=np.float32)
index = faiss.read_index('./faiss_index2.idx')

name_to_original_index = {name.lower(): i for i, name in enumerate(names)}

class GameRequest(BaseModel):
    game_name: str
    k: int = 6

@app.post("/similar_games/")
def find_similar_games_api(request: GameRequest):
    game_name = request.game_name
    k = request.k

    try:
        game_referensi_index = name_to_original_index[game_name.lower()]

        query_embedding = embeddings_faiss[game_referensi_index].reshape(1, -1)
        D, I = index.search(query_embedding, k + 1) 

        # Hasil rekomendasi (skip indeks pertama kalau itu dirinya sendiri)
        results = []
        for i in range(1, len(I[0])):
            if len(results) >= k: 
                break

            similar_game_index = I[0][i]
            if similar_game_index == game_referensi_index:
                continue

            similarity_distance = float(D[0][i]) # konversi ke float agar JSON serializable
            results.append({
                "game": names[similar_game_index],
                "distance": similarity_distance
            })

        return {
            "query": game_name,
            "recommendations": results
        }

    except KeyError: 
        raise HTTPException(
            status_code=404,
            detail=f"Game dengan nama '{game_name}' tidak ditemukan. Pastikan penulisan sudah benar."
        )
    except Exception as e: 
        raise HTTPException(
            status_code=500,
            detail=f"Terjadi kesalahan internal: {str(e)}"
        )
