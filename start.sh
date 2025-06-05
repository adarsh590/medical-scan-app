#!/bin/bash

# Build frontend
echo "entered start.sh"
cd frontend || { echo "❌ Failed to enter frontend/"; exit 1; }
npm install
npm run build

# Move to backend and run server

echo "🏁 Starting backend..."
cd ../backend || { echo "❌ Failed to enter backend/"; exit 1; }

echo "📦 Installing requirements..."
pip install -r requirements.txt

echo "🌐 Starting FastAPI on port: $PORT"
uvicorn main:app --host 0.0.0.0 --port $PORT

