from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, FileResponse
from fastapi.staticfiles import StaticFiles
from PIL import Image
import io
import torch
from torchvision import transforms, models
import os

app = FastAPI()

# CORS config (you can tighten this later for production)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change to your frontend domain in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load dummy model (replace with your own model later)
model = models.resnet18(pretrained=True)
model.eval()

# Image preprocessing
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406],
                         std=[0.229, 0.224, 0.225])
])

# ===== Serve React frontend from frontend/build =====
frontend_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '../frontend/build'))

# Mount static files (CSS, JS, etc.)
app.mount("/static", StaticFiles(directory=os.path.join(frontend_path, 'static')), name="static")

@app.get("/")
def serve_root():
    index_path = os.path.join(frontend_path, "index.html")
    return FileResponse(index_path)

@app.get("/{full_path:path}")
def serve_react_app(full_path: str):
    file_path = os.path.join(frontend_path, full_path)
    if os.path.exists(file_path):
        return FileResponse(file_path)
    else:
        # fallback to index.html for React Router support
        return FileResponse(os.path.join(frontend_path, "index.html"))

# ===== Prediction endpoint =====
@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        image = Image.open(io.BytesIO(contents)).convert("RGB")
        input_tensor = transform(image).unsqueeze(0)

        with torch.no_grad():
            outputs = model(input_tensor)
            _, predicted = torch.max(outputs, 1)

        result = {
            "filename": file.filename,
            "predicted_class": int(predicted.item()),
            "message": "Success"
        }
        return JSONResponse(content=result)

    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})
