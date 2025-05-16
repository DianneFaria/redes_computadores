# 🚀 Projeto com Load Balancer (Nginx), Backend e Frontend com Docker

Este projeto utiliza Docker Compose para subir um ambiente com frontend, backend e um balanceador de carga utilizando Nginx.

---

## 🗂️ Estrutura de Pastas do Projeto

```plaintext
projeto/
│
├── docker-compose.yml
├── nginx.conf
├── redes_computadores/
│   ├── frontend/
│   │   └── Dockerfile
│   └── backend/
│       └── Dockerfile
```
## 🐳 Novo Docker Compose
```plaintext
version: "3.8"

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

  nginx-lb:
    image: nginx:latest
    container_name: nginx-load-balancer
    ports:
      - "8080:8080"  # Porta de entrada do Load Balancer
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
    restart: always
    depends_on:
      - backend
      - frontend

```

##📝 Criando o arquivo Nginx

```plaintext
touch nginx.conf
nano nginx.conf
```

##❗ Substituir IPs
Substitua frontend e backend pelos IPs dos colegas que irão ligar a máquina para testar o Load Balancer (ex: 192.168.0.15).

## 🔧 Exemplo de configuração do nginx.conf

```plaintext
events {}

http {
    upstream backend_servers {
        server backend:3333;
        server 192.168.X.X:3333;
    }

    upstream frontend_servers {
        server frontend:80;
        server 192.168.X.X:80;
    }

    server {
        listen 8080;

        location /api/ { 
            proxy_pass http://backend_servers; # Encaminha a requisição para os servidores do backend
            proxy_set_header Host $host; # Nome do host original
            proxy_set_header X-Real-IP $remote_addr; # IP real do cliente que fez a requisição
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for; # Lista de IPs por onde a requisição passou
        }

        location / {
            proxy_pass http://frontend_servers;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        }
    }
}

```

##✅ Lembre-se:
🛑 Para remover os containers criados:
```plaintext
docker-compose down
```
♻️ Para reconstruir e iniciar o projeto com as imagens atualizadas:
```plaintext
docker-compose -f docker-compose.yml up --build -d
```
