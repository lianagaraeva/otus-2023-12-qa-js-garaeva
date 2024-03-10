FROM node:20.11
WORKDIR /app
COPY package.json package-lock.json
RUN npm ci
COPY . .
