const express = require('express');
const router = express.Router();
const db = require('../database'); // Importa a conexão do banco de dados que criamos acima

// COLA: Modelo de rota do tipo POST (Recebe dados)
router.post('/register', (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    try {
        const stmt = db.prepare(
            'INSERT INTO users (name, email, password) VALUES (?, ?, ?)'
        );

        const info = stmt.run(name, email, password);

        res.status(201).json({
            message: 'Usuário cadastrado com sucesso!',
            userId: info.lastInsertRowid
        });

    } catch (err) {
        if (err.message.includes('UNIQUE')) {
            return res.status(400).json({ error: 'Este e-mail já está cadastrado.' });
        }

        return res.status(500).json({ error: 'Erro ao salvar usuário.' });
    }
});

// COLA: Modelo de rota de autenticação / validação de dados
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'E-mail e senha são obrigatórios.' });
    }

    try {
        const stmt = db.prepare('SELECT * FROM users WHERE email = ?');
        const user = stmt.get(email);

        if (!user || user.password !== password) {
            return res.status(401).json({ error: 'E-mail ou senha incorretos.' });
        }

        res.status(200).json({
            message: 'Login realizado com sucesso!',
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });

    } catch (err) {
        return res.status(500).json({ error: 'Erro no servidor.' });
    }
});

// COLA: Modelo de rota do tipo GET (Busca/Lista dados)
router.get('/books', (req, res) => {
    try {
        const stmt = db.prepare("SELECT * FROM books");
        const books = stmt.all();

        res.status(200).json(books);

    } catch (err) {
        res.status(500).json({ error: 'Erro ao buscar livros.' });
    }
});

// Exporta o roteador configurado
module.exports = router;