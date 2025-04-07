# 📦 Banco de Dados RDS na AWS

Este guia descreve como criar e configurar uma instância de banco de dados **MySQL** no **Amazon RDS**, acessá-la via **MySQL Workbench**, e garantir que esteja disponível para conexões externas.

---

## 🛠️ Etapas para Criação do Banco de Dados

### 1. Acesse o Amazon RDS

1. Pesquise por `RDS` no console da AWS.
2. Clique em **Instâncias de banco de dados**.
3. Clique em **Criar banco de dados**.

### 2. Configuração Inicial

1. Selecione o tipo de banco de dados: **MySQL**.
2. Escolha o **modelo**: `Nível Gratuito`.

### 3. Defina as Configurações

- **Nome do banco de dados**: `database-exemplo`
- **Usuário administrador (default)**: `admin`
- **Senha**: `SenhaExemplo154!`

### 4. Configuração da Instância

- Tipo da instância: `db.t3.micro`

### 5. Armazenamento

- Marque a opção: **Habilitar escalabilidade automática do armazenamento**

### 6. Conectividade

1. Defina **Acesso público** como: `SIM`
2. Em **Grupo de Segurança**, selecione **Criar novo grupo**
   - Nome do grupo: `redes-seguranca`

3. Clique em **Criar banco de dados**

---

## 🔐 Liberação de Acesso

1. Acesse o **grupo de segurança** criado.
2. Adicione a seguinte regra de entrada:
   - IP: `0.0.0.0/0` (libera acesso total — ⚠️ apenas para fins educacionais/demonstração)

---

## 💻 Conectando via MySQL Workbench

1. Abra o **MySQL Workbench**.
2. Insira os dados de conexão:
   ```
   Hostname: (hostname)
   Port: 3306 (coloque a sua porta)
   User: admin (coloque seu user criado)
   Password: SenhaExemplo1234! (coloque a sua senha)
   Database: database-exemplo 
   ```
   
