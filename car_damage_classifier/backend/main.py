from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from transformers import pipeline
from PIL import Image
import io

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Since it's a local app, allowing all
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

print("Model yükleniyor, bu işlem ilk seferde biraz zaman alabilir...")
model_id = "beingamit99/car_damage_detection"
pipe = pipeline("image-classification", model=model_id)
print("Model başarıyla yüklendi!")

@app.get("/")
def read_root():
    return {"message": "Car Damage Classifier API is running"}

@app.post("/predict")
async def predict_damage(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        image = Image.open(io.BytesIO(contents)).convert("RGB")
        
        # Inference
        results = pipe(image, top_k=6)
        
        # results format: [{'score': 0.99, 'label': 'crack'}, ...]
        return {"success": True, "predictions": results}
    except Exception as e:
        return {"success": False, "error": str(e)}
