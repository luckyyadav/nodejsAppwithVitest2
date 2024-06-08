FROM node:18-alpine3.19
WORKDIR /APP/
COPY package.json /APP/
COPY src /APP/
RUN npm install

CMD ["node", "server.js"]