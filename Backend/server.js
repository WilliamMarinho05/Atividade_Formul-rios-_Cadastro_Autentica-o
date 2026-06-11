const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();

// Middlewares
app.use(cors()); // Permite requisições do frontend
app.use(express.json()); // Permite receber JSON no corpo da requisição

// 1. Configuração do Banco de Dados SQLite
const db = new sqlite3.Database('./database.sqlite', (err) => {
    if (err) {
        console.error('Erro ao conectar ao banco:', err.message);
    } else {
        console.log('Conectado ao banco de dados SQLite.');
    }
});

// Criar tabela de usuários se não existir
db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
)`);

// 2. Rota de Cadastro
app.post('/register', (req, res) => {
    const { name, email, password, confirmPassword } = req.body;

    // 3. Validação de Dados na Camada do Servidor
    if (!name || !email || !password || !confirmPassword) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }
    if (password !== confirmPassword) {
        return res.status(400).json({ error: 'As senhas não coincidem.' });
    }
    if (password.length < 6) {
        return res.status(400).json({ error: 'A senha deve ter pelo menos 6 caracteres.' });
    }

    // 4. Persistência no SQLite
    const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    db.run(sql, [name, email, password], function(err) {
        if (err) {
            // Tratamento de e-mail duplicado (regra UNIQUE do SQLite)
            if (err.message.includes('UNIQUE')) {
                return res.status(400).json({ error: 'Este e-mail já está em uso.' });
            }
            return res.status(500).json({ error: 'Erro interno no servidor ao cadastrar usuário.' });
        }
        res.status(201).json({ message: 'Usuário cadastrado com sucesso!', id: this.lastID });
    });
});

// Rota de Login (Autenticação)
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Validação simples de servidor
    if (!email || !password) {
        return res.status(400).json({ error: 'E-mail e senha são obrigatórios.' });
    }

    // Busca o usuário no banco de dados
    const sql = 'SELECT * FROM users WHERE email = ?';
    db.get(sql, [email], (err, user) => {
        if (err) {
            return res.status(500).json({ error: 'Erro interno no servidor.' });
        }
        
        // Verifica se o usuário existe e se a senha está correta
        if (!user || user.password !== password) {
            return res.status(401).json({ error: 'E-mail ou senha incorretos.' });
        }

        // Se deu tudo certo
        res.status(200).json({ message: `Bem-vindo de volta, ${user.name}!` });
    });
});
// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor Backend rodando na porta ${PORT}`);
});