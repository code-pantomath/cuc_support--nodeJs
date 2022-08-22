FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
COPY Procfile ./

RUN npm install

COPY src/ src/
RUN npm run build

USER node

CMD [ "npm", "start" ]

EXPOSE 40001