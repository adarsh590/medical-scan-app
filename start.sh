#!/bin/bash

echo "🏁 Starting backend only..."
cd backend || { echo "❌ Failed to enter backend/"; exit 1; }

echo "📦 Installing requirements..."
pip install -r requirements.txt

echo "🌐 Starting FastAPI on port: $PORT"
uvicorn main:app --host 0.0.0.0 --port $PORT
