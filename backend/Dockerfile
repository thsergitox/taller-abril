FROM node:22-slim
WORKDIR /backend

ENV PORT=3000
ENV HOST=0.0.0.0

# Dependencias primero para aprovechar cache
COPY package.json package-lock.json ./
RUN npm ci

# Código y Prisma
COPY tsconfig.json prisma.config.ts ./
COPY prisma ./prisma
COPY src ./src

EXPOSE 3000

CMD ["sh", "-c", "npm run db:init && npm run build && node dist/server.js"]
