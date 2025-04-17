FROM node:23.11.0-alpine

WORKDIR /app

COPY package*.json ./

COPY prisma ./prisma/

RUN npm install

RUN npx prisma generate

COPY . .

RUN npm run build

EXPOSE 4500

CMD ["npm", "start"] 
