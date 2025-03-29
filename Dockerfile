FROM node:23-alpine3.20 AS builder

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 3004

CMD ["nginx", "-g", "daemon off;"]