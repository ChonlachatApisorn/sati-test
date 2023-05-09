FROM node:14-alpine AS service

WORKDIR /app

RUN npm install

COPY . .

CMD [ "node", "dist/packages/service" ]
