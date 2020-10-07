FROM node:12.18.4 as first

WORKDIR /frontend

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

RUN npm run build

# --------------------------------------------------

FROM nginx:1.12-alpine

COPY --from=first /frontend/build /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
