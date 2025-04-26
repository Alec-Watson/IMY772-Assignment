# Build the frontend
FROM node:20-alpine AS frontend-build

WORKDIR /app/frontend/calc

COPY frontend/calc/package*.json ./
RUN npm install

COPY frontend/calc . 
RUN npm run build

# Build the backend
FROM node:20-alpine AS backend

WORKDIR /app

COPY backend/package*.json ./
RUN npm install

COPY backend . 
# Copy built frontend into backend folder
COPY --from=frontend-build /app/frontend/calc/dist ./public

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
