FROM node:16.14.0 AS build
WORKDIR /build

COPY package.json package.json
RUN npm install

COPY public/ public
COPY src/ src
RUN npm run build

FROM httpd:alpine
WORKDIR /var/www/html
COPY --from=build /build/build/ .