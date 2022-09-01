FROM node:16.16.0 as build-stage

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:1.23.1-alpine as production-stage

COPY --from=build-stage /app/dist /app/dist

COPY --from=build-stage /app/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]