
FROM node:latest

WORKDIR /app

RUN npm install pm2 -g

COPY package*.json yarn.lock ./
ENV NODE_OPTIONS=--openssl-legacy-provider

RUN yarn

COPY . .
EXPOSE 3000
RUN pm2 start yarn --name be -- start
# "&&", "pm2","start", "yarn","--name","be", "-start"
CMD ["yarn","--cwd", "./frontend", "start"]
