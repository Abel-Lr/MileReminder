FROM node:24-alpine

RUN mkdir -p /discord
WORKDIR /discord

COPY package*.json ./

RUN npm install

COPY . .

CMD ["sh", "-c", "npm run deploy && npm run start"]