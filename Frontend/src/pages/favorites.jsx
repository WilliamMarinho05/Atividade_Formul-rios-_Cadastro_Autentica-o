import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

export function Favorites() {
  const { user, favorites } = useContext(AuthContext);

  // CONCEITO: ROTA PROTEGIDA! Se não tem usuário, expulsa pro login.
  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container">
      <h2>Meus Favoritos ❤️</h2>
      {favorites.length === 0 ? (
        <p>Você ainda não tem livros favoritos.</p>
      ) : (
        <ul>
          {favorites.map((book) => (
            <li key={book.id}>{book.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}