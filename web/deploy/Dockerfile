FROM node:latest

ENV NODE_ENV production

ARG VITE_API_URL ${VITE_API_URL}
ENV VITE_API_URL ${VITE_API_URL}

ARG VITE_EMBEDS_URL ${VITE_EMBEDS_URL}
ENV VITE_EMBEDS_URL ${VITE_EMBEDS_URL}

WORKDIR /web

COPY --chown=node:node package*.json ./
RUN npm install

COPY --chown=node:node . .

RUN npm run build

USER node
CMD ["npm", "run", "serve:spa" ]