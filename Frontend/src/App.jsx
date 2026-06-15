import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider, AuthContext } from './contexts/AuthContext';
import { ThemeProvider, ThemeContext } from './contexts/ThemeContext'; // Importa o tema

import { Home } from './pages/Home';
import { Books } from './pages/Books';
import { BookDetails } from './pages/BookDetails';
import { Favorites } from './pages/Favorites';
import { Login } from './pages/Login';
import { Register } from './pages/Register';

import './App.css';

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  // COLA: Consumindo o contexto de tema
  const { theme, toggleTheme } = useContext(ThemeContext); 

  return (
    <nav style={{ 
      padding: '15px', 
      background: theme === 'dark' ? '#222' : '#e4e4e4', // Ajuste dinâmico simples inline
      marginBottom: '20px', 
      display: 'flex', 
      gap: '15px',
      alignItems: 'center'
    }}>
      <Link to="/">Home</Link>
      <Link to="/livros">Todos os Livros</Link>
      
      {user ? (
        <>
          <Link to="/favoritos">Meus Favoritos</Link>
          <button onClick={logout} style={{ marginLeft: 'auto', padding: '5px' }}>Sair ({user.email})</button>
        </>
      ) : (
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '10px' }}>
          <Link to="/login">Login</Link>
          <Link to="/cadastro">Cadastro</Link>
        </div>
      )}

      {/* COLA: Botão de alternar tema usando o clique do contexto */}
      <button 
        onClick={toggleTheme} 
        style={{ 
          padding: '5px 10px', 
          cursor: 'pointer',
          background: theme === 'dark' ? '#fff' : '#333',
          color: theme === 'dark' ? '#333' : '#fff',
          border: 'none',
          borderRadius: '4px',
          marginLeft: user ? '10px' : 'auto' // Ajusta a posição se estiver logado ou não
        }}
      >
        {theme === 'dark' ? '☀️ Modo Claro' : '🌙 Modo Escuro'}
      </button>
    </nav>
  );
}

function App() {
  return (
    // COLA: Alinhamento de múltiplos Providers (Muito comum em projetos reais)
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/livros" element={<Books />} />
            <Route path="/livros/:id" element={<BookDetails />} />
            <Route path="/favoritos" element={<Favorites />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Register />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;