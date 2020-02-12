ARG node_version=13.8.0

FROM node:$node_version-alpine

RUN echo "<< Using nodejs version $node_version >>"

ENV NODE_ENV=production
ENV CWD /usr/divide
RUN mkdir -p ${CWD}
WORKDIR ${CWD}

COPY package.json .
RUN yarn install --production=true --no-lockfile
COPY lib ./lib

CMD [ "npm", "start" ]
