FROM ubuntu:22.04 AS deps

# install JRE for dynamo-offline (required for tests)
RUN apt-get update \
    && apt-get install -y default-jre \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

FROM node:16-alpine AS build
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package-*.json ./
# Install serverless globally
RUN npm i -g serverless@2.72.2
