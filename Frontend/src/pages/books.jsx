import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Simulando um "Banco de Dados" de livros
export const mockBooks = [
  { id: 1, title: 'React para Iniciantes', description: 'Aprenda os fundamentos do React, hooks e rotas.' },
  { id: 2, title: 'Node.js Avançado', description: 'Crie APIs robustas com Express e SQLite.' },
  { id: 3, title: 'Dominando o Vite', description: 'Tudo sobre o bundler mais rápido da atualidade.' }
];

export function Books() {
  const [books, setBooks] = useState([]);

  // CONCEITO: useEffect rodando ao carregar a página (Simula busca na API)
  useEffect(() => {
    setBooks(mockBooks);
  }, []);

  return (
    <div className="container">
      <h2>Lista de Livros Disponíveis</h2>
      <ul>
        {books.map((book) => (
          <li key={book.id} style={{ marginBottom: '10px' }}>
            <strong>{book.title}</strong> - 
            {/* CONCEITO: Link passando o ID na URL */}
            <Link to={`/livros/${book.id}`} style={{ marginLeft: '10px' }}>Ver detalhes</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}