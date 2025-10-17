FROM node:24-alpine

# Setup TimeZone
RUN apk add --no-cache tzdata
ARG TZ
RUN cp /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
ENV TZ=$TZ

RUN mkdir -p /discord
WORKDIR /discord

COPY package*.json ./

RUN npm install

COPY . .

CMD ["sh", "-c", "npm run deploy && npm run start"]