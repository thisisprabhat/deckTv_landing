# Stage 1: Build static Astro site
FROM node:22-alpine AS builder

WORKDIR /app

# Install dependencies with clean cache
COPY package*.json ./
RUN npm ci

# Copy application sources
COPY . .

# Disable telemetry and build static files
ENV ASTRO_TELEMETRY_DISABLED=1
RUN npm run build

# Stage 2: Serve static files with production Nginx
FROM nginx:alpine

# Copy built static distribution
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Standard HTTP port
EXPOSE 80

# Built-in Docker Health Check
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://127.0.0.1:80/health || exit 1

CMD ["nginx", "-g", "daemon off;"]
