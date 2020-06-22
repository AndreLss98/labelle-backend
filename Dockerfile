FROM node:10.18.0-alpine

WORKDIR /usr/app/

COPY . ./

RUN npm install

CMD npm run dev

EXPOSE 3000