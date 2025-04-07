FROM node:22-alpine

WORKDIR /app

# Copia os arquivos de dependência e instala tudo
COPY package*.json ./
RUN npm install

# Copia o restante do projeto
COPY . .

# Expõe a porta do app
EXPOSE 3333

# Roda o servidor com ts-node-dev
CMD ["npx", "ts-node-dev", "src/server.ts"]
