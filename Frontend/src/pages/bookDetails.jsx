import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { mockBooks } from './books';

export function BookDetails() {
  // CONCEITO IMPORTANTE: useParams captura o parâmetro dinâmico da URL (/livros/:id)
  const { id } = useParams(); 
  const navigate = useNavigate();
  const { user, favorites, toggleFavorite } = useContext(AuthContext);
  
  const [book, setBook] = useState(null);
  const [alertMsg, setAlertMsg] = useState('');

  useEffect(() => {
    // Procura o livro correspondente dentro do array simulado convertido para Inteiro
    const foundBook = mockBooks.find(b => b.id === parseInt(id));
    setBook(foundBook);
  }, [id]);

  if (!book) {
    return (
      <div className="container">
        <p style={{ opacity: 0.6, fontSize: '0.95rem' }}>Carregando dados do livro...</p>
      </div>
    );
  }

  // Compara se o livro atual está presente na lista global de favoritos do contexto
  const isFavorite = favorites.some(fav => fav.id === book.id);

  const handleFavoriteClick = () => {
    if (!user) {
      setAlertMsg("Você precisa estar logado para favoritar um livro!");
      // Pequeno atraso para o usuário ler o card de aviso antes de ser redirecionado
      setTimeout(() => {
        navigate('/login'); // CONCEITO: Navegação programática via código
      }, 2000);
      return;
    }
    toggleFavorite(book);
  };

  return (
    <div className="container" style={{ maxWidth: '550px' }}>
      {/* Cabeçalho do Card de Detalhes */}
      <span style={{ fontSize: '2.5rem' }}>📘</span>
      <h2 style={{ marginTop: '10px', marginBottom: '12px' }}>{book.title}</h2>
      
      <p style={{ 
        fontSize: '1rem', 
        opacity: 0.8, 
        lineHeight: '1.6', 
        marginBottom: '30px',
        padding: '0 10px'
      }}>
        {book.description}
      </p>
      
      {/* COLA VISUAL: Card de aviso minimalista substituto do alert() */}
      {alertMsg && (
        <div style={{
          padding: '12px',
          borderRadius: '12px',
          marginBottom: '20px',
          fontSize: '0.9rem',
          fontWeight: '500',
          background: 'rgba(239, 68, 68, 0.12)',
          border: '1px solid rgba(239, 68, 68, 0.25)',
          color: '#f87171',
          animation: 'floatIn 0.3s ease'
        }}>
          ⚠️ {alertMsg}
        </div>
      )}
      
      {/* Botões de Ação com cliques 3D e cores baseadas no tema/estado */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <button 
          onClick={handleFavoriteClick} 
          style={{ 
            marginTop: 0,
            background: isFavorite ? 'rgba(239, 68, 68, 0.2)' : 'rgba(34, 197, 94, 0.2)',
            color: isFavorite ? '#f87171' : '#4ade80',
            border: isFavorite ? '1px solid rgba(239, 68, 68, 0.4)' : '1px solid rgba(34, 197, 94, 0.4)',
            boxShadow: 'none'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = isFavorite ? 'rgba(239, 68, 68, 0.3)' : 'rgba(34, 197, 94, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = isFavorite ? 'rgba(239, 68, 68, 0.2)' : 'rgba(34, 197, 94, 0.2)';
          }}
        >
          {isFavorite ? '❤️ Remover dos Favoritos' : '🤍 Adicionar aos Favoritos'}
        </button>

        <button 
          onClick={() => navigate('/livros')}
          style={{ 
            marginTop: 0,
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            color: 'inherit',
            boxShadow: 'none'
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'}
        >
          ◀ Voltar para o Catálogo
        </button>
      </div>
    </div>
  );
}