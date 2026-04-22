# Build Environment
FROM node:24-alpine AS builder

# Ensure reliable package paths
WORKDIR /app

# Enable pnpm via corepack integration
RUN corepack enable pnpm

# Copy workspace structural files first to cache dependency installations
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/webapp/package.json ./apps/webapp/
COPY packages/types/package.json ./packages/types/
# Note: Add COPY instructions for other internal monorepo packages here if they expand

# Install dependencies using freezing
RUN pnpm install --frozen-lockfile  --ignore-scripts

# Copy the entire workspace code
COPY . .

# Build the Webapp React frontend
RUN pnpm --filter webapp build

# Execution Environment (Nginx static serving)
FROM nginx:alpine AS runner

# Overwrite default nginx config with our SPA config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Remove Nginx default index
RUN rm -rf /usr/share/nginx/html/*

# Copy Vite bundled assets from the builder stage
COPY --from=builder /app/apps/webapp/dist /usr/share/nginx/html

# Expose standard web port
EXPOSE 80

# Run Nginx process in foreground
CMD ["nginx", "-g", "daemon off;"]
