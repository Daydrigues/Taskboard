# 📋 TaskBoard — Gerenciador de Tarefas na AWS

Aplicação web de gerenciamento de tarefas com estilo Kanban, desenvolvida como projeto avaliativo do curso de Computação em Nuvem (SENAC).

## ☁️ Arquitetura

```
Usuário (Browser)
      │
      ▼
   EC2 (Node.js + Express)
      │
      ▼
   RDS (MySQL)
```

**Serviços AWS utilizados:**
- **EC2** — Hospeda a aplicação Node.js
- **RDS (MySQL)** — Banco de dados relacional gerenciado

## 🚀 Como rodar localmente

### Pré-requisitos
- Node.js 18+
- MySQL rodando localmente (ou acesso ao RDS)

### Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/taskboard.git
cd taskboard

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env
# Edite o .env com os dados do seu banco

# Inicie a aplicação
npm start
```

Acesse: `http://localhost:3000`

## 🌐 Deploy na AWS

### 1. Configurar o RDS

1. Acesse o console AWS → RDS → Criar banco de dados
2. Escolha MySQL, tier gratuito (db.t3.micro)
3. Anote o endpoint, usuário e senha
4. Em **Conectividade**, permita acesso da EC2 via Security Group

### 2. Configurar a EC2

```bash
# Conecte via SSH na instância
ssh -i sua-chave.pem ec2-user@seu-ip-publico

# Instale o Node.js
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo yum install -y nodejs

# Clone e configure o projeto
git clone https://github.com/seu-usuario/taskboard.git
cd taskboard
npm install

# Configure o .env com os dados do RDS
nano .env

# Inicie a aplicação
npm start
```

3. No Security Group da EC2, libere a porta **3000** (ou 80 se usar proxy)

## 📁 Estrutura do Projeto

```
taskboard/
├── public/
│   └── index.html      # Frontend (HTML + CSS + JS)
├── src/
│   ├── server.js       # Servidor Express
│   ├── routes.js       # Rotas da API (CRUD)
│   └── db.js           # Conexão com o banco de dados
├── .env.example        # Exemplo de variáveis de ambiente
├── .gitignore
└── package.json
```

## 🔌 Endpoints da API

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/tasks` | Lista todas as tarefas |
| POST | `/api/tasks` | Cria uma nova tarefa |
| PUT | `/api/tasks/:id` | Atualiza uma tarefa |
| DELETE | `/api/tasks/:id` | Deleta uma tarefa |
| GET | `/health` | Health check da aplicação |

## 🛠 Tecnologias

- **Backend:** Node.js, Express.js
- **Banco de dados:** MySQL (AWS RDS)
- **Frontend:** HTML, CSS, JavaScript (vanilla)
- **Infraestrutura:** AWS EC2, AWS RDS

## 👩‍💻 Autora

Dayanni — Tecnologia em Análise e Desenvolvimento de Sistemas  
SENAC · Computação em Nuvem
