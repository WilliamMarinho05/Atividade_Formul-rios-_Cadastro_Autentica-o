import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// COLA: Banco de dados simulado expandido para demonstrar a paginação exigida
export const mockBooks = [
  { id: 1, title: 'React para Iniciantes', description: 'Aprenda os fundamentos do React, hooks e rotas.' },
  { id: 2, title: 'Node.js Avançado', description: 'Crie APIs robustas com Express e SQLite.' },
  { id: 3, title: 'Dominando o Vite', description: 'Tudo sobre o bundler mais rápido da atualidade.' },
  { id: 4, title: 'TypeScript Essencial', description: 'Adicione tipagem estática e segurança aos seus projetos web.' },
  { id: 5, title: 'SQL & NoSQL sem Segredos', description: 'Domine bancos de dados relacionais e não-relacionais na prática.' },
  { id: 6, title: 'Arquitetura Clean Code', description: 'Aprenda as melhores práticas para escrever códigos limpos e sustentáveis.' }
];

export function Books() {
  const [books, setBooks] = useState([]);
  
  // COLA EXIGIDA: Estados necessários para controlar a Paginação
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // Define quantos livros serão exibidos por página

  // CONCEITO: useEffect simulando a busca inicial dos dados na API
  useEffect(() => {
    setBooks(mockBooks);
  }, []);

  // LÓGICA DE PAGINAÇÃO: Cálculos matemáticos de índice para fatiar o array de livros
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBooks = books.slice(indexOfFirstItem, indexOfLastItem);
  
  // Calcula o total de páginas dinamicamente
  const totalPages = Math.ceil(books.length / itemsPerPage);

  return (
    <div className="container" style={{ maxWidth: '650px' }}>
      <h2>Catálogo de Livros 📖</h2>
      <p style={{ fontSize: '0.9rem', opacity: 0.7, marginBottom: '25px' }}>
        Explore nossa seleção técnica e encontre o seu próximo passo na programação.
      </p>

      {/* Grid contendo os cards individuais em estilo de vidro */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left' }}>
        {currentBooks.map((book) => (
          <div 
            key={book.id}
            style={{
              padding: '18px 20px',
              borderRadius: '16px',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
            }}
          >
            <div style={{ maxWidth: '75%' }}>
              <h4 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '6px' }}>{book.title}</h4>
              <p style={{ fontSize: '0.85rem', opacity: 0.6, lineHeight: '1.4' }}>{book.description}</p>
            </div>

            {/* CONCEITO: Link passando o ID na URL para a rota dinâmica */}
            <Link to={`/livros/${book.id}`} style={{ marginTop: 0 }}>
              <button style={{
                width: 'auto',
                margin: 0,
                padding: '10px 16px',
                fontSize: '0.85rem',
                borderRadius: '10px',
                background: 'rgba(255, 255, 255, 0.08)',
                color: 'inherit',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: 'none',
                whiteSpace: 'nowrap'
              }}>
                Ver mais 🔍
              </button>
            </Link>
          </div>
        ))}
      </div>

      {/* COLA DE PAGINAÇÃO: Controles com efeito 3D e desativação condicional */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginTop: '30px',
        paddingTop: '15px',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)'
      }}>
        <button 
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(p => p - 1)}
          style={{ 
            width: 'auto', padding: '8px 16px', fontSize: '0.85rem', marginTop: 0,
            opacity: currentPage === 1 ? 0.4 : 1, cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
            background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.05)'
          }}
        >
          ◀ Anterior
        </button>
        
        <span style={{ fontSize: '0.9rem', opacity: 0.7, fontWeight: '500' }}>
          Página {currentPage} de {totalPages}
        </span>

        <button 
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(p => p + 1)}
          style={{ 
            width: 'auto', padding: '8px 16px', fontSize: '0.85rem', marginTop: 0,
            opacity: currentPage === totalPages ? 0.4 : 1, cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
            background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.05)'
          }}
        >
          Próxima ▶
        </button>
      </div>
    </div>
  );
}