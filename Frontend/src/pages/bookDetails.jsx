import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { mockBooks } from './Books';

export function BookDetails() {
  // CONCEITO: useParams pega o ID que está na URL (/livros/1)
  const { id } = useParams(); 
  const navigate = useNavigate();
  const { user, favorites, toggleFavorite } = useContext(AuthContext);
  
  const [book, setBook] = useState(null);

  useEffect(() => {
    // Busca o livro específico pelo ID
    const foundBook = mockBooks.find(b => b.id === parseInt(id));
    setBook(foundBook);
  }, [id]);

  if (!book) return <p>Carregando livro...</p>;

  // Verifica se este livro já está na lista de favoritos global
  const isFavorite = favorites.some(fav => fav.id === book.id);

  const handleFavoriteClick = () => {
    if (!user) {
      alert("Você precisa estar logado para favoritar um livro!");
      navigate('/login'); // CONCEITO: Navegação programática (manda pro login)
      return;
    }
    toggleFavorite(book);
  };

  return (
    <div className="container">
      <h2>{book.title}</h2>
      <p>{book.description}</p>
      
      <button 
        onClick={handleFavoriteClick} 
        style={{ background: isFavorite ? 'red' : 'green' }}
      >
        {isFavorite ? '❤️ Remover dos Favoritos' : '🤍 Adicionar aos Favoritos'}
      </button>
      <br /><br />
      <button onClick={() => navigate('/livros')}>Voltar</button>
    </div>
  );
}