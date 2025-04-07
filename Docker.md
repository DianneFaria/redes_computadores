# ☁️ Projeto Redes AWS

Este projeto tem como objetivo a criação de uma instância EC2 na AWS que será utilizada para rodar um ambiente Docker com backend e frontend acessíveis via web.

---

## 🚀 Criando a Instância

Neste passo a passo, vamos criar uma instância que servirá como base para rodar o Docker. A instância será configurada para hospedar o projeto, permitindo que ele seja acessado via web.

### 🔧 Etapas para criar a instância:

1. Criar uma nova instância na nuvem (AWS).
2. Configurar as permissões necessárias (abrir portas para acesso à aplicação web).

📸 Abaixo, algumas imagens ilustrando as etapas:

![Etapa 1](https://github.com/user-attachments/assets/e5dfec1b-4880-4db9-802d-055a9e1f14d0)
![Etapa 2](https://github.com/user-attachments/assets/cbd3a795-aaf9-480a-8413-631eb379fc6a)
![Etapa 3](https://github.com/user-attachments/assets/b7575507-e874-4068-a66d-3b25b058622b)

---

## 🔐 Acessando a Instância

Abra o **PowerShell** como administrador e navegue até o diretório onde sua chave SSH está salva:

```bash
cd C:\Users\pedro\Downloads
```

Execute o seguinte comando para acessar a instância:

```bash
ssh -i <nome-chave> ubuntu@<ip-maquina>
```

---

## 🐳 Instalando o Docker

1. Atualize a instância:

```bash
sudo apt update
```

2. Instale o Docker:

```bash
sudo apt install docker.io -y
```

3. Verifique a instalação:

```bash
docker --version
```

4. Para usar Docker sem `sudo`:

```bash
sudo usermod -aG docker $USER
```

> ⚠️ Após isso, saia e entre novamente na instância para aplicar a mudança.

5. Crie uma pasta para organização:

```bash
mkdir ~/aplicacao
```

6. Clone o repositório do projeto:

```bash
git clone <link do projeto no github>
```

---

## ⚙️ Criando o Docker Compose

1. Instale o Docker Compose:

```bash
sudo apt install docker-compose -y
```

2. Crie o arquivo `compose.yaml`:

```bash
touch compose.yaml
nano compose.yaml
```

3. Adicione o seguinte conteúdo:

```yaml
services:
  backend:
    container_name: backend
    build:
      context: ./redes_computadores/backend
      dockerfile: Dockerfile
    ports:
      - "3333:3333"

  frontend:
    container_name: frontend
    build:
      context: ./redes_computadores/frontend
      dockerfile: Dockerfile
    ports:
      - "80:80"
    depends_on:
      - backend

volumes:
  db_data:
```

---

## 🧱 Dockerfile do Frontend

1. Crie o arquivo `Dockerfile`:

```bash
touch Dockerfile
nano Dockerfile
```

2. Adicione o conteúdo abaixo:

```dockerfile
FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

---

## 🧱 Dockerfile do Backend

1. Crie o arquivo `Dockerfile`:

```bash
touch Dockerfile
nano Dockerfile
```

2. Adicione o conteúdo abaixo:

```dockerfile
FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3333

CMD ["npx", "ts-node-dev", "src/server.ts"]
```

---

## ▶️ Executando o Compose

Execute o seguinte comando para subir os containers:

```bash
docker-compose -f docker-compose.yml up --build -d
```

🔓 **Importante**: Vá até o grupo de segurança da VM na AWS e abra a porta `3333` para acesso ao backend.

![Porta 3333](https://github.com/user-attachments/assets/887dfbfb-a894-413d-8c89-21666bc41d1e)

---

## ⚠️ Atenção!

Toda vez que a VM for reiniciada, ela receberá um novo IP.  
Atualize o IP de acesso no arquivo `api.jsx` do frontend:

![API IP](https://github.com/user-attachments/assets/3cb6f425-184f-4b2c-9a4e-3ca0ea571d92)

---

## ♻️ Atualizando os Containers

Para reconstruir o projeto com as novas imagens:

```bash
docker-compose down
```

```bash
docker-compose -f compose.yaml up --build -d
```

---

✌️ Projeto pronto! Agora sua aplicação está hospedada com Docker em uma instância AWS.
