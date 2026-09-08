FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY src ./src

ENV NODE_ENV=production
EXPOSE 8081

RUN addgroup -S app && adduser -S app -G app
USER app

CMD ["node", "src/index.js"]
