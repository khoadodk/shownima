# Set base image
FROM node:13-alpine

# Use app as the working directory
WORKDIR /app

# Copy the files to the current directory to app
COPY . /app

# Install dependencies 
RUN npm install

# Build production app
RUN npm run build

# Listen on the specific port
EXPOSE 3000

# Set node server
ENTRYPOINT npm run start