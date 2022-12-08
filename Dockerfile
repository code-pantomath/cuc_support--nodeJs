FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
COPY Procfile ./

RUN npm install

# COPY src/ src/
COPY dist/ dist/

USER node

CMD [ "npm", "start" ]

EXPOSE 40001
