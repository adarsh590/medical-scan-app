#!/bin/bash

# Build frontend
echo "🛠 Building frontend..."
cd frontend || { echo "❌ Failed to enter frontend/"; exit 1; }
npm install
npm run build || { echo "❌ React build failed"; exit 1; }

# Start backend
echo "🚀 Starting backend..."
cd ../backend || { echo "❌ Failed to enter backend/"; exit 1; }
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port $PORT
