FROM node:latest
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
# Install app dependencies
COPY package*.json ./
RUN npm install
# separate copying of app files from package to reduce cache
COPY . .

EXPOSE 7777
ENTRYPOINT ["node", "server.js"]