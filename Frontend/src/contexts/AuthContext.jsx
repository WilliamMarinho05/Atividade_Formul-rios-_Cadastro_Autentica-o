import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // CONCEITO: useState para dados globais
  const [user, setUser] = useState(null); 
  const [favorites, setFavorites] = useState([]); // Lista global de favoritos

  const login = (userData) => setUser(userData);
  const logout = () => {
    setUser(null);
    setFavorites([]); // Limpa os favoritos ao sair
  };

  // Função para adicionar ou remover dos favoritos
  const toggleFavorite = (book) => {
    const isAlreadyFavorite = favorites.find(fav => fav.id === book.id);
    if (isAlreadyFavorite) {
      setFavorites(favorites.filter(fav => fav.id !== book.id)); // Remove
    } else {
      setFavorites([...favorites, book]); // Adiciona
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, favorites, toggleFavorite }}>
      {children}
    </AuthContext.Provider>
  );
};