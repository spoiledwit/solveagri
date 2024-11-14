FROM node:18-alpine

# Install dependencies and cleaning up
RUN apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev vips-dev > /dev/null 2>&1

WORKDIR /opt/server

# Copy package files
COPY package*.json ./

# Install dependencies using npm
RUN npm install

# Copy project files
COPY . .

# Build the Strapi app
RUN npm run build

EXPOSE 1337

CMD ["npm", "run", "start"]