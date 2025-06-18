# Use a Debian-based Node image instead of Alpine
FROM node:18-slim

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy rest of the app
COPY . .

# Build the production app
RUN npm run build

# Expose and run the app
EXPOSE 3000
CMD ["npm", "start"]
