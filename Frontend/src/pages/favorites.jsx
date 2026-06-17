import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Navigate, Link } from 'react-router-dom';

export function Favorites() {
  const { user, favorites } = useContext(AuthContext);

  // CONCEITO EXIGIDO: ROTA PROTEGIDA! Se não há usuário logado no contexto, expulsa para o login.
  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container" style={{ maxWidth: '600px' }}>
      <h2>Meus Livros Favoritos ❤️</h2>
      <p style={{ fontSize: '0.9rem', opacity: 0.7, marginBottom: '25px' }}>
        Olá, {user.name || user.email}! Aqui estão as leituras que você salvou.
      </p>

      {favorites.length === 0 ? (
        /* Estado Vazio Minimalista */
        <div style={{
          padding: '30px 20px',
          borderRadius: '16px',
          background: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          marginTop: '20px'
        }}>
          <p style={{ opacity: 0.6, fontSize: '0.95rem' }}>
            Sua lista está vazia por enquanto. 🤔
          </p>
          <Link to="/livros" style={{ display: 'inline-block', marginTop: '15px', fontSize: '0.9rem' }}>
            Explorar catálogo e adicionar livros
          </Link>
        </div>
      ) : (
        /* Grid de Cards Individuais de Vidro com Efeito de Sombra 3D */
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '14px', 
          marginTop: '20px',
          textAlign: 'left' 
        }}>
          {favorites.map((book) => (
            <div 
              key={book.id}
              style={{
                padding: '16px 20px',
                borderRadius: '16px',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                cursor: 'default'
              }}
              // Pequeno efeito de elevação individual ao passar o mouse
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
              }}
            >
              <div>
                <h4 style={{ fontSize: '1.05rem', fontWeight: '600', marginBottom: '4px' }}>
                  {book.title}
                </h4>
                <p style={{ fontSize: '0.8rem', opacity: 0.5 }}>Código do item: #{book.id}</p>
              </div>

              {/* Botão de navegação rápida com clique afundado 3D */}
              <Link to={`/livros/${book.id}`} style={{ marginTop: 0 }}>
                <button style={{
                  width: 'auto',
                  margin: 0,
                  padding: '8px 14px',
                  fontSize: '0.85rem',
                  borderRadius: '8px',
                  background: 'rgba(255, 255, 255, 0.08)',
                  color: 'inherit',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: 'none'
                }}>
                  Detalhes 🔍
                </button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}