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
      const response = await axios.post('http://localhost:3000/login', data);
      
      // Salva os dados do usuário vindos do banco no estado global
      login(response.data.user); 
      
      reset(); // Limpa os campos por segurança
      navigate('/favoritos'); // Redireciona o usuário logado
    } catch (error) {
      setErrorMsg(error.response?.data?.error || 'E-mail ou senha incorretos.');
    }
  };

  return (
    <div className="container">
      <h2>Entrar no Sistema</h2>
      
      {/* Mensagem de erro direto na tela */}
      {errorMsg && <p style={{ color: 'red', fontWeight: 'bold' }}>{errorMsg}</p>}
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="email" {...register('email')} placeholder="Digite seu e-mail" />
        <p style={{ color: 'red' }}>{errors.email?.message}</p>
        
        <input type="password" {...register('password')} placeholder="Sua senha" />
        <p style={{ color: 'red' }}>{errors.password?.message}</p>
        
        <button type="submit">Logar</button>
      </form>
      <br />
      <Link to="/cadastro">Não tem conta? Cadastre-se</Link>
    </div>
  );
}