# Atividade Prática: Desenvolvimento de Formulários de Cadastro e Autenticação

Este repositório contém a entrega da atividade prática da disciplina. O projeto consiste no desenvolvimento de um sistema fullstack de cadastro e login de usuários, integrando uma interface em React com um servidor Node.js e banco de dados relacional SQLite.

---

## 🗂️ Estrutura de Diretórios do Projeto

O código-fonte está estruturado de forma modular em dois diretórios distintos localizados na raiz do repositório, atendendo rigorosamente às diretrizes de entrega:

```text
/AtividadeAula12 (Raiz do Projeto)
├── .gitignore
├── README.md
├── /Backend
│   ├── database.sqlite (Gerado automaticamente pelo código)
│   ├── node_modules/   (Ignorado no Git)
│   ├── package.json
│   └── server.js
└── /Frontend
    ├── node_modules/   (Ignorado no Git)
    ├── package.json
    ├── vite.config.js
    ├── index.html
    └── /src
        ├── App.css
        ├── App.jsx
        └── main.jsx
🛠️ Guia de Construção: Ordem Cronológica e Comandos Utilizados
Abaixo está o histórico detalhado e na ordem exata de todos os comandos que foram executados para criar, configurar e instalar as dependências de cada camada do projeto.

Passo 1: Configuração e Proteção da Raiz (/AtividadeAula12)
Antes de inicializar as pastas, criamos a regra para impedir o envio de arquivos locais temporários ou pastas pesadas para o GitHub.

Onde fazer: Diretamente na pasta raiz do projeto.

Ação realizada: Criação manual do arquivo .gitignore contendo:

Plaintext
node_modules/
/Backend/node_modules/
database.sqlite
Passo 2: Construção da Camada de Servidor e Banco de Dados (/Backend)
Nesta etapa, isolamos o ambiente do backend para tratar a API e persistência com JavaScript no lado do servidor.

Acessar o diretório do Backend:

Onde fazer: Terminal aberto na raiz do projeto.

Comando:

Bash
cd Backend
Inicializar o ecossistema Node.js:

Onde fazer: Terminal apontando para ...\Backend>.

Comando:

Bash
npm init -y
Uso: Cria o arquivo package.json limpo para gerenciar os metadados do backend.

Instalar as dependências do servidor:

Onde fazer: Terminal apontando para ...\Backend>.

Comando:

Bash
npm install express cors sqlite3
Explicação das bibliotecas instaladas:

express: Framework minimalista que gerencia as requisições HTTP e cria os endpoints de rota (/register para cadastro e /login para autenticação).

cors: Middleware de segurança que permite que o frontend (rodando em uma porta) acesse a API do backend (rodando em outra porta) sem bloqueios do navegador.

sqlite3: Driver do banco de dados SQLite. Ele cria e interage com um banco de dados relacional leve salvo em um arquivo de texto local (database.sqlite), sem requerer instalação externa de servidores de banco.

Passo 3: Construção da Interface do Usuário (/Frontend)
Nesta etapa, configuramos a aplicação visual com React, utilizando ferramentas modernas de validação e comunicação assíncrona.

Acessar o diretório do Frontend:

Onde fazer: Terminal (se estiver no Backend, digite cd .. primeiro e depois entre na pasta do Frontend).

Comando:

Bash
cd Frontend
Criar a estrutura base do React com Vite:

Onde fazer: Terminal apontando para ...\Frontend>.

Comando:

Bash
npm create vite@latest . -- --template react
Uso: Configura o esqueleto do React na pasta atual (.) utilizando o Vite para otimizar o tempo de inicialização e build do app.

Instalar as dependências nativas e iniciais do projeto:

Onde fazer: Terminal apontando para ...\Frontend>.

Comando:

Bash
npm install
Uso: Lê o arquivo criado pelo Vite e monta a pasta node_modules com as bases do React.

Instalar as ferramentas exigidas e complementares para formulários:

Onde fazer: Terminal apontando para ...\Frontend>.

Comando:

Bash
npm install react-hook-form axios zod @hookform/resolvers
Explicação das bibliotecas instaladas:

react-hook-form: Biblioteca de alta performance para gerenciar o estado dos inputs de forma não controlada, reduzindo re-renderizações desnecessárias da tela.

zod: Biblioteca de declaração e validação de esquemas de dados. Usada para aplicar regras rígidas (como e-mail válido, senhas com tamanhos mínimos e checagem se duas senhas batem).

@hookform/resolvers: Ponte de comunicação que integra nativamente as validações estruturadas do Zod dentro do ciclo de vida do React Hook Form.

axios: Cliente HTTP baseado em Promessas usado para disparar as requisições assíncronas do tipo POST com os dados do formulário até o nosso servidor Node.js.

🚀 Como Executar o Projeto Localmente
Para rodar a aplicação em ambiente de desenvolvimento, você precisará abrir dois terminais distintos em seu computador:

Terminal 1: Inicializando o Backend
Navegue até a pasta do servidor e inicie o interpretador Node:

Bash
cd Backend
node server.js
O console exibirá as mensagens: "Conectado ao banco de dados SQLite." e "Servidor Backend rodando na porta 3000".

Terminal 2: Inicializando o Frontend
Navegue até a pasta da interface e inicialize o servidor de desenvolvimento do Vite:

Bash
cd Frontend
npm run dev
O console gerará um link local (ex: http://localhost:5173). Abra essa URL em seu navegador de preferência.

✅ Checklist de Requisitos Técnicos Atendidos
Banco de Dados: Persistência robusta com SQLite configurada no backend.

Interface de Formulários: React Hook Form estruturado em componentes performáticos.

Campos Obrigatórios: Nome, E-mail, Senha e Confirmação de Senha presentes e devidamente linkados.

Validação de Dados: Camada dupla de proteção (Frontend via Zod e Servidor com validações lógicas condicionais).

Tratamento de Exceções: Mensagens amigáveis de erro e alertas de falha de conexão renderizados dinamicamente na UI.

Requisições HTTP: Uso explícito do Axios encapsulado em blocos estruturados try/catch para monitoramento de falhas.

Diretrizes de Entrega: Código modular em pastas limpas (/Frontend e /Backend).

📦 Comandos de Versionamento (Subindo para o GitHub)
Comandos executados na raiz do projeto (/AtividadeAula12) para enviar o código para o repositório remoto pela primeira vez:

Bash
# 1. Inicializa o Git localmente na pasta
git init

# 2. Adiciona todos os arquivos monitorados (respeitando o .gitignore)
git add .

# 3. Cria o ponto de salvamento oficial com descrição clara da entrega
git commit -m "feat: entrega da atividade pratica de formularios e autenticacao"

# 4. Define a branch principal do projeto como 'main'
git branch -M main

# 5. Conecta o repositório local com o link do seu GitHub
git remote add origin <URL_DO_SEU_REPOSITORIO_AQUI>

# 6. Envia o código de forma definitiva para a nuvem
git push -u origin main

***

### Passo final para o seu Git:
Agora que o seu README está atualizado e completo com cada detalhe do que foi feito, execute estes últimos comandos no terminal da raiz do seu projeto para salvar o README no seu GitHub:

```bash
git add README.md
git commit -m "docs: adiciona readme completo com guia detalhado de comandos"
git push
