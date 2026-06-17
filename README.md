# 📚 Plataforma de Biblioteca Digital: Autenticação, Contextos e Paginação

Este repositório contém a documentação e o código-fonte de uma aplicação fullstack voltada para o gerenciamento de acervos literários e autenticação de usuários. O ecossistema integra uma interface modular em **React (Vite)** com uma API desenvolvida em **Node.js (Express)** e persistência em banco de dados relacional **SQLite**.

---

## 🔗 Link para Acesso (Deploy)

A interface do usuário foi implantada em ambiente de produção e pode ser acessada através do link abaixo:

👉 **[CLIQUE AQUI PARA ACESSAR A APLICAÇÃO NO VERCEL]([https://SEU-LINK-DO-VERCEL-AQUI.vercel.app](https://atividade-formul-rios-cadastro-aute-gray.vercel.app))**

---

## 🗂️ Estrutura de Diretórios

O projeto segue uma arquitetura desacoplada, separando as responsabilidades de cliente e servidor em diretórios distintamente organizados:

```text
/AtividadeAula12 (Raiz do Projeto)
├── README.md
├── Backend
│   ├── database.sqlite
│   ├── package.json
│   └── server.js
└── Frontend
    ├── package.json
    ├── vite.config.js
    ├── index.html
    └── src
        ├── App.css
        ├── App.jsx
        ├── main.jsx
        ├── contexts
        │   ├── AuthContext.jsx
        │   └── ThemeContext.jsx
        └── pages
            ├── BookDetails.jsx
            ├── Books.jsx
            ├── Favorites.jsx
            ├── Home.jsx
            ├── Login.jsx
            └── Register.jsx
```

---

# 🛠️ Engenharia do Projeto: Inicialização e Dependências

Para fins de auditoria ou reconstrução do ambiente de desenvolvimento do zero, utilize o roteiro de comandos abaixo.

---

## 1️⃣ Camada de Servidor e Banco de Dados (`/Backend`)

Responsável pelo fornecimento dos endpoints REST, processamento das regras de negócio de autenticação e persistência dos dados.

### Acessar o diretório

```bash
cd Backend
```

### Inicializar o projeto

```bash
npm init -y
```

### Instalar dependências

```bash
npm install express cors sqlite3
```

### Dependências utilizadas

| Pacote  | Função                                                                                |
| ------- | ------------------------------------------------------------------------------------- |
| express | Framework HTTP responsável pelo gerenciamento das rotas `/register` e `/login`.       |
| cors    | Middleware de segurança para permitir requisições entre diferentes origens.           |
| sqlite3 | Banco de dados relacional leve que armazena os dados localmente em `database.sqlite`. |

---

## 2️⃣ Camada de Interface do Usuário (`/Frontend`)

Interface cliente baseada em componentes React e renderização dinâmica controlada por estados.

### Acessar o diretório

```bash
cd ../Frontend
```

### Criar projeto React com Vite

```bash
npm create vite@latest . -- --template react
```

### Instalar dependências padrão

```bash
npm install
```

### Instalar bibliotecas adicionais

```bash
npm install react-hook-form axios zod @hookform/resolvers react-router-dom
```

### Dependências utilizadas

| Biblioteca          | Finalidade                                                   |
| ------------------- | ------------------------------------------------------------ |
| react-router-dom    | Gerenciamento de rotas e navegação entre páginas.            |
| react-hook-form     | Controle otimizado de formulários utilizando hooks.          |
| zod                 | Validação estrutural dos dados em runtime.                   |
| @hookform/resolvers | Integração entre React Hook Form e Zod.                      |
| axios               | Cliente HTTP baseado em Promises para comunicação com a API. |

---

# 💎 Implementações Técnicas e Diferenciais

A aplicação adota padrões modernos de desenvolvimento React para gerenciamento de estado, experiência do usuário e organização arquitetural.

---

## 🧩 Gerenciamento Global de Estado com Context API

A aplicação utiliza múltiplos contextos para evitar *prop drilling* e centralizar informações compartilhadas.

### 🔐 AuthContext

Responsável por:

* Controle da sessão do usuário autenticado;
* Armazenamento dos livros favoritados;
* Compartilhamento global das informações do usuário.

### 🎨 ThemeContext

Responsável por:

* Alternância entre temas;
* Controle de preferências visuais;
* Aplicação dinâmica de classes CSS através de `useEffect`;
* Manipulação direta da tag `<body>` para atualização global da interface.

---

## 📄 Algoritmo de Paginação (Client-Side)

A paginação foi implementada inteiramente no frontend para proporcionar navegação fluida.

### Página Home (`Home.jsx`)

* Exibição paginada dos lançamentos;
* Controle dinâmico através de fatiamento de arrays.

### Página Books (`Books.jsx`)

Implementação baseada em:

```javascript
const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;

const currentBooks = books.slice(
  indexOfFirstItem,
  indexOfLastItem
);
```

Características:

* Cálculo matemático dos índices;
* Atualização dinâmica dos registros exibidos;
* Desativação automática dos botões de navegação quando necessário.

---

## 🎨 Design System Minimalista com Glassmorphism

A identidade visual da plataforma utiliza conceitos modernos de design.

### Recursos aplicados

✅ Efeito de vidro fosco (*Glassmorphism*)

```css
backdrop-filter: blur();
```

✅ Profundidade tridimensional através de sombras e animações.

✅ Microinterações em botões

```css
transform: scale(0.98);
```

✅ Feedback visual integrado sem uso de `alert()` nativo.

✅ Cards informativos para exibição de mensagens de sucesso e erro.

---

# 🚀 Execução da Aplicação Localmente

Para executar a aplicação, utilize dois terminais simultaneamente.

---

## Terminal 1 — Backend

```bash
cd Backend
node server.js
```

### Saída esperada

```text
Conectado ao banco de dados SQLite.
Servidor Backend rodando na porta 3000.
```

---

## Terminal 2 — Frontend

```bash
cd Frontend
npm run dev
```
---

# 📌 Tecnologias Utilizadas

### Frontend

* React
* Vite
* React Router DOM
* React Hook Form
* Zod
* Axios
* Context API

### Backend

* Node.js
* Express
* SQLite
* CORS

---
