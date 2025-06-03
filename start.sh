#!/bin/bash

# Build frontend
cd frontend
npm install
npm run build

# Move to backend and run server
cd ../backend
uvicorn main:app --host 0.0.0.0 --port $PORT

