FROM node:16.13.2-alpine

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

USER root

RUN  npm install -g @angular/cli@12

COPY package*.json ./

RUN npm install || true


CMD ["npm","run" ,"build"]

COPY --chown=node:node . .

