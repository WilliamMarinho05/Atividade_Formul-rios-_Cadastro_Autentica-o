import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import './App.css'; 

// 1. Schemas de Validação (Zod)
// Schema rigoroso para o Cadastro
const registerSchema = z.object({
  name: z.string().min(3, 'O nome deve ter no mínimo 3 caracteres.'),
  email: z.string().email('Insira um formato de e-mail válido.'),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres.'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem.",
  path: ["confirmPassword"], 
});

// Schema mais simples para o Login
const loginSchema = z.object({
  email: z.string().email('Insira um formato de e-mail válido.'),
  password: z.string().min(1, 'A senha é obrigatória.')
});

function App() {
  // Estado para alternar entre as telas de Login e Cadastro
  const [isLogin, setIsLogin] = useState(false);
  const [serverMessage, setServerMessage] = useState({ type: '', text: '' });

  // 2. Configurando o Hook Form para CADASTRO
  const registerForm = useForm({
    resolver: zodResolver(registerSchema)
  });

  // 3. Configurando o Hook Form para LOGIN
  const loginForm = useForm({
    resolver: zodResolver(loginSchema)
  });

  // Função centralizada para tratar exceções
  const handleError = (error) => {
    if (error.response && error.response.data && error.response.data.error) {
      setServerMessage({ type: 'error', text: error.response.data.error });
    } else {
      setServerMessage({ type: 'error', text: 'Falha na comunicação com o servidor. Tente novamente mais tarde.' });
    }
  };

  // 4. Envio do Cadastro (POST)
  const onRegisterSubmit = async (data) => {
    setServerMessage({ type: '', text: '' });
    try {
      const response = await axios.post('http://localhost:3000/register', data);
      setServerMessage({ type: 'success', text: response.data.message });
      registerForm.reset();
      
      // Após 2 segundos, troca automaticamente para a tela de login
      setTimeout(() => {
        setIsLogin(true);
        setServerMessage({ type: '', text: '' });
      }, 2000);
    } catch (error) {
      handleError(error);
    }
  };

  // 5. Envio do Login (POST)
  const onLoginSubmit = async (data) => {
    setServerMessage({ type: '', text: '' });
    try {
      const response = await axios.post('http://localhost:3000/login', data);
      setServerMessage({ type: 'success', text: response.data.message });
      loginForm.reset();
    } catch (error) {
      handleError(error);
    }
  };

  // Função para limpar os erros ao alternar as telas
  const toggleForm = () => {
    setIsLogin(!isLogin);
    setServerMessage({ type: '', text: '' });
    registerForm.reset();
    loginForm.reset();
  };

  return (
    <div className="container">
      <h2>{isLogin ? 'Login de Usuário' : 'Cadastro de Usuário'}</h2>
      
      {/* Exibição de Mensagens do Servidor */}
      {serverMessage.text && (
        <div style={{ color: serverMessage.type === 'error' ? 'red' : 'green', marginBottom: '15px' }}>
          <strong>{serverMessage.text}</strong>
        </div>
      )}

      {/* RENDERIZAÇÃO CONDICIONAL: TELA DE LOGIN */}
      {isLogin ? (
        <form onSubmit={loginForm.handleSubmit(onLoginSubmit)}>
          <div>
            <label>E-mail:</label><br />
            <input type="email" {...loginForm.register('email')} placeholder="Digite seu e-mail" />
            {loginForm.formState.errors.email && <p style={{ color: 'red', margin: 0 }}>{loginForm.formState.errors.email.message}</p>}
          </div>
          <br />

          <div>
            <label>Senha:</label><br />
            <input type="password" {...loginForm.register('password')} placeholder="Digite sua senha" />
            {loginForm.formState.errors.password && <p style={{ color: 'red', margin: 0 }}>{loginForm.formState.errors.password.message}</p>}
          </div>
          <br />

          <button type="submit">Entrar</button>
        </form>
      ) : (
      /* RENDERIZAÇÃO CONDICIONAL: TELA DE CADASTRO */
        <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)}>
          <div>
            <label>Nome:</label><br />
            <input type="text" {...registerForm.register('name')} placeholder="Digite seu nome" />
            {registerForm.formState.errors.name && <p style={{ color: 'red', margin: 0 }}>{registerForm.formState.errors.name.message}</p>}
          </div>
          <br />

          <div>
            <label>E-mail:</label><br />
            <input type="email" {...registerForm.register('email')} placeholder="Digite seu e-mail" />
            {registerForm.formState.errors.email && <p style={{ color: 'red', margin: 0 }}>{registerForm.formState.errors.email.message}</p>}
          </div>
          <br />

          <div>
            <label>Senha:</label><br />
            <input type="password" {...registerForm.register('password')} placeholder="Digite sua senha" />
            {registerForm.formState.errors.password && <p style={{ color: 'red', margin: 0 }}>{registerForm.formState.errors.password.message}</p>}
          </div>
          <br />

          <div>
            <label>Confirmação de Senha:</label><br />
            <input type="password" {...registerForm.register('confirmPassword')} placeholder="Confirme sua senha" />
            {registerForm.formState.errors.confirmPassword && <p style={{ color: 'red', margin: 0 }}>{registerForm.formState.errors.confirmPassword.message}</p>}
          </div>
          <br />

          <button type="submit">Cadastrar</button>
        </form>
      )}

      {/* Botão para alternar entre as telas */}
      <div style={{ marginTop: '20px' }}>
        <button type="button" onClick={toggleForm} style={{ background: 'transparent', color: '#007BFF', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>
          {isLogin ? 'Não tem uma conta? Cadastre-se' : 'Já tem uma conta? Faça Login'}
        </button>
      </div>
    </div>
  );
}

export default App;