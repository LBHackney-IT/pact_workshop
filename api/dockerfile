FROM node:14
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3001
ENV HOST="0.0.0.0"
ENV DB="mongo"
CMD [ "node", "index.js" ]