FROM node:latest
WORKDIR /app
COPY dist dist
COPY .env .
COPY package.json .
RUN npm install
EXPOSE 4000
CMD ["node", "dist/main.js"]