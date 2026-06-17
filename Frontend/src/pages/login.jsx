import React, { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';

const loginSchema = z.object({
  email: z.string().email('E-mail inválido.'),
  password: z.string().min(1, 'A senha é obrigatória.')
});

export function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState('');

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data) => {
    try {
      //const response = await axios.post('http://localhost:3000/login', data); //Sem vercel
      const response = await axios.post('/api/login', data);
      
      // Salva os dados do usuário vindos do banco no estado global (useContext)
      login(response.data.user); 
      
      reset(); // Limpa os campos por segurança
      navigate('/favoritos'); // Redireciona o usuário logado
    } catch (error) {
      setErrorMsg(error.response?.data?.error || 'E-mail ou senha incorretos.');
    }
  };

  return (
    <div className="container">
      {/* Detalhe Minimalista: Título alinhado com a proposta visual */}
      <h2>Acessar Conta 🔑</h2>
      <p style={{ fontSize: '0.9rem', opacity: 0.7, marginBottom: '20px' }}>
        Seja bem-vindo de volta! Insira suas credenciais.
      </p>
      
      {/* COLA: Caixa de erro dinâmica e estilizada integrada com o efeito de vidro */}
      {errorMsg && (
        <div style={{
          padding: '12px',
          borderRadius: '12px',
          marginBottom: '20px',
          fontSize: '0.95rem',
          fontWeight: '500',
          background: 'rgba(239, 68, 68, 0.15)',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          color: '#f87171',
          animation: 'floatIn 0.3s ease'
        }}>
          ❌ {errorMsg}
        </div>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input type="email" {...register('email')} placeholder="Seu e-mail cadastrado" />
          {errors.email && (
            <p style={{ color: '#f87171', fontSize: '0.8rem', textAlign: 'left', marginLeft: '5px', marginTop: '4px' }}>
              ⚠️ {errors.email.message}
            </p>
          )}
        </div>
        
        <div>
          <input type="password" {...register('password')} placeholder="Sua senha" />
          {errors.password && (
            <p style={{ color: '#f87171', fontSize: '0.8rem', textAlign: 'left', marginLeft: '5px', marginTop: '4px' }}>
              ⚠️ {errors.password.message}
            </p>
          )}
        </div>
        
        <button type="submit">Entrar</button>
      </form>
      
      <br />
      <Link to="/cadastro" style={{ fontSize: '0.9rem', fontWeight: '500' }}>
        Não tem uma conta? <span style={{ textDecoration: 'underline' }}>Cadastre-se</span>
      </Link>
    </div>
  );
}