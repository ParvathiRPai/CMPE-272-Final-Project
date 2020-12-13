#### Stage 1: Build the react application
FROM node:current-alpine as build
# 15.3.0-alpine3.11
# Configure the main working directory inside the docker image. 
# This is the base directory used in any further RUN, COPY, and ENTRYPOINT 
# commands.
WORKDIR /app
# Copy the package.json as well as the package-lock.json and install 
# the dependencies. This is a separate step so the dependencies 
# will be cached unless changes to one of those two files 
# are made.
COPY package.json package-lock.json ./
RUN npm install
# Copy the main application
COPY . ./
EXPOSE 3000
# EXPOSE 80
CMD ["npm", "start"]
