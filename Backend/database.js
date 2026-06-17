const Database = require('better-sqlite3');

// cria/abre banco
const db = new Database('database.sqlite');

// USERS
db.exec(`
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT UNIQUE,
    password TEXT
);
`);

// BOOKS
db.exec(`
CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    description TEXT
);
`);

// seed inicial
const count = db.prepare("SELECT COUNT(*) AS count FROM books").get();

if (count.count === 0) {
    const insert = db.prepare("INSERT INTO books (title, description) VALUES (?, ?)");

    insert.run("React para Iniciantes", "Aprenda React do zero.");
    insert.run("Node.js Avançado", "APIs com Express.");
    insert.run("Vite Moderno", "Build tool rápido.");
}

module.exports = db;