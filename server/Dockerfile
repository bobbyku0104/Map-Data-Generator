# ---- Builder Stage ----
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including devDependencies like nodemon)
RUN npm install

# Copy source code
COPY . .

# ---- Production Stage ----
FROM node:20-alpine

WORKDIR /app

# Copy installed node_modules and source from builder
COPY --from=builder /app /app

EXPOSE 5000

CMD ["node", "server.js"]
