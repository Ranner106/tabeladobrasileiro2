FROM node:16.14-alpine
WORKDIR /app-backend

COPY package* ./

RUN npm install

COPY . .

RUN npm install

CMD [ "npm", "run", "dev" ]