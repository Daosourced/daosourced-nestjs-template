FROM node:20.18.1-slim

EXPOSE 3000

WORKDIR /app

CMD [ "yarn", "start:prod" ]

COPY .env* /app/
COPY package.json yarn.lock /app/

COPY node_modules /app/node_modules

COPY dist /app/dist
