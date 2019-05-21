# Use an official Node image
FROM node:12

# Set the working directory to /api
WORKDIR /app

# Copy package.json and install app dependencies
COPY package.json yarn.lock nodemon.json tsconfig.json ./

RUN yarn install --frozen-lockfile --dev

# Copy the current directory contents into the container
COPY src/ .

# Make port available to the world outside this container
EXPOSE 4201

# Run app.py when the container launches
CMD [ "yarn", "start:dev" ]
