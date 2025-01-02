FROM node:22.9.0
# This is the latest available LTS version. Newer versions might be available
# at https://hub.docker.com/_/node Version last checked on 10 Oct 2022.

# node may come with an older version of npm. Ensure we have a specific npm.
RUN npm install -g npm@9.8.1
# To check if newer versions are available, see https://www.npmjs.com/package/npm


################################################################################
# Install prerequisites
RUN apt-get update
RUN apt-get install -y \
    lsb-release \
    curl


################################################################################
# Install TypeScript
RUN npm install -g typescript@5.1.6
# More recent version may be available at https://www.npmjs.com/package/typescript


################################################################################
# Install Expo Client
# RUN npm install -g expo-cli@6.0.1
# Newer version may be available at https://www.npmjs.com/package/expo-cli
