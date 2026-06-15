const express = require('express');
const router = express.Router();
const db = require('../database'); // Importa a conexão do banco de dados que criamos acima

// COLA: Modelo de rota do tipo POST (Recebe dados)
router.post('/register', (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    db.run(sql, [name, email, password], function (err) {
        if (err) {
            if (err.message.includes('UNIQUE')) {
                return res.status(400).json({ error: 'Este e-mail já está cadastrado.' });
            }
            return res.status(500).json({ error: 'Erro ao salvar o usuário.' });
        }
        res.status(201).json({ message: 'Usuário cadastrado com sucesso!', userId: this.lastID });
    });
});

// COLA: Modelo de rota de autenticação / validação de dados
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'E-mail e senha são obrigatórios.' });
    }

    const sql = 'SELECT * FROM users WHERE email = ?';
    db.get(sql, [email], (err, user) => {
        if (err) return res.status(500).json({ error: 'Erro no servidor.' });
        
        if (!user || user.password !== password) {
            return res.status(401).json({ error: 'E-mail ou senha incorretos.' });
        }

        res.status(200).json({ 
            message: 'Login realizado com sucesso!', 
            user: { id: user.id, name: user.name, email: user.email } 
        });
    });
});

// COLA: Modelo de rota do tipo GET (Busca/Lista dados)
router.get('/books', (req, res) => {
    db.all("SELECT * FROM books", [], (err, rows) => {
        if (err) return res.status(500).json({ error: 'Erro ao buscar livros.' });
        res.status(200).json(rows);
    });
});

// Exporta o roteador configurado
module.exports = router;