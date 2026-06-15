const sqlite3 = require('sqlite3').verbose();

// Inicializa a conexão com o arquivo SQLite
const db = new sqlite3.Database('./database.sqlite', (err) => {
    if (err) {
        console.error('Erro ao conectar ao SQLite:', err.message);
    } else {
        console.log('Conectado ao banco de dados SQLite.');
    }
});

// Configura as tabelas padrão do sistema
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            email TEXT UNIQUE,
            password TEXT
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS books (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            description TEXT
        )
    `);

    // Alimenta o banco com dados iniciais se estiver vazio
    db.get("SELECT COUNT(*) as count FROM books", [], (err, row) => {
        if (row && row.count === 0) {
            const insert = 'INSERT INTO books (title, description) VALUES (?, ?)';
            db.run(insert, ['React para Iniciantes', 'Aprenda os fundamentos do React, hooks e rotas.']);
            db.run(insert, ['Node.js Avançado', 'Crie APIs robustas com Express e SQLite.']);
            db.run(insert, ['Dominando o Vite', 'Tudo sobre o bundler mais rápido da atualidade.']);
        }
    });
});

// Exporta a instância do banco para os outros arquivos usarem
module.exports = db;