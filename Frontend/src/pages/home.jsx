import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Simulação de lançamentos extras para podermos paginar na Home
const RECENT_BOOKS = [
  { id: 1, title: 'React para Iniciantes', tag: 'Destaque' },
  { id: 2, title: 'Node.js Avançado', tag: 'Backend' },
  { id: 3, title: 'Dominando o Vite', tag: 'Ferramentas' },
  { id: 4, title: 'TypeScript Essencial', tag: 'Segurança' },
  { id: 5, title: 'SQL & NoSQL sem Segredos', tag: 'Banco de Dados' },
  { id: 6, title: 'Arquitetura Clean Code', tag: 'Boas Práticas' },
];

export function Home() {
  // COLA EXIGIDA NO ENUNCIADO: Lógica de Paginação Local no Front-end
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2; // Quantidade de itens por página na vitrine

  // Cálculos matemáticos para fatiar o array (Indispensável para a teoria da prova)
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = RECENT_BOOKS.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(RECENT_BOOKS.length / itemsPerPage);

  return (
    <div className="container" style={{ maxWidth: '600px' }}>
      <h1>Bem-vindo à Biblioteca 📚</h1>
      <p style={{ opacity: 0.8, fontSize: '0.95rem', marginBottom: '30px' }}>
        Explore nosso acervo completo e organize suas leituras favoritas em um só lugar.
      </p>

      {/* Seção Minimalista de Lançamentos Modernos */}
      <div style={{ textAlign: 'left', marginTop: '20px' }}>
        <h3 style={{ fontSize: '1.1rem', marginBottom: '15px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '5px' }}>
          ✨ Lançamentos Recentes
        </h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {currentItems.map((book) => (
            <div 
              key={book.id} 
              style={{
                padding: '12px 16px',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <span style={{ fontWeight: '500' }}>{book.title}</span>
              <span style={{
                fontSize: '0.75rem',
                padding: '4px 8px',
                borderRadius: '20px',
                background: 'rgba(99, 102, 241, 0.2)',
                color: '#818cf8',
                fontWeight: 'bold'
              }}>
                {book.tag}
              </span>
            </div>
          ))}
        </div>

        {/* COLA DE PAGINAÇÃO: Controles Minimalistas com cliques 3D */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '15px' }}>
          <button 
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => p - 1)}
            style={{ 
              width: 'auto', padding: '6px 12px', fontSize: '0.85rem', marginTop: 0,
              opacity: currentPage === 1 ? 0.4 : 1, cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
            }}
          >
            ◀ Voltar
          </button>
          
          <span style={{ fontSize: '0.85rem', opacity: 0.7 }}>
            Página {currentPage} de {totalPages}
          </span>

          <button 
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(p => p + 1)}
            style={{ 
              width: 'auto', padding: '6px 12px', fontSize: '0.85rem', marginTop: 0,
              opacity: currentPage === totalPages ? 0.4 : 1, cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
            }}
          >
            Avançar ▶
          </button>
        </div>
      </div>

      <div style={{ marginTop: '35px', display: 'flex', gap: '15px', justifyContent: 'center' }}>
        <Link to="/livros" style={{ textDecoration: 'none' }}>
          <button style={{ marginTop: 0, width: '160px', padding: '10px' }} type="submit">
            Ver Catálogo
          </button>
        </Link>
      </div>
    </div>
  );
}