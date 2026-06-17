import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';
import API_URL from '../config/api';

// COLA: Validação com Zod intacta
const registerSchema = z.object({
  name: z.string().min(1, 'O nome é obrigatório.'),
  email: z.string().email('E-mail inválido.'),
  password: z.string().min(4, 'A senha deve ter pelo menos 4 caracteres.'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem.",
  path: ["confirmPassword"],
});

export function Register() {
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  // COLA: useForm com o 'reset'
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(registerSchema)
  });

  /*
  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:3000/register', { //Sem vercel
        name: data.name,
        email: data.email,
        password: data.password
      });

      setMessage(response.data.message || 'Usuário cadastrado com sucesso!');
      setIsSuccess(true);
      reset(); 

    } catch (error) {
      setIsSuccess(false);
      setMessage(error.response?.data?.error || 'Erro ao realizar cadastro.');
    }
  };
  */
 
  const onSubmit = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      name: data.name,
      email: data.email,
      password: data.password
    });

    setMessage(response.data.message || 'Usuário cadastrado com sucesso!');
    setIsSuccess(true);
    reset();

  } catch (error) {
    setIsSuccess(false);
    setMessage(error.response?.data?.error || 'Erro ao realizar cadastro.');
  }
};

  return (
    <div className="container">
      {/* Detalhe Minimalista: Ícone junto ao título */}
      <h2>Criar Conta 👤</h2>
      <p style={{ fontSize: '0.9rem', opacity: 0.7, marginBottom: '20px' }}>
        Preencha os dados abaixo para começar.
      </p>

      {/* COLA: Caixa de mensagem estilizada em formato de "pill" ou card minimalista */}
      {message && (
        <div style={{
          padding: '12px',
          borderRadius: '12px',
          marginBottom: '20px',
          fontSize: '0.95rem',
          fontWeight: '500',
          background: isSuccess ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)',
          border: isSuccess ? '1px solid rgba(34, 197, 94, 0.3)' : '1px solid rgba(239, 68, 68, 0.3)',
          color: isSuccess ? '#4ade80' : '#f87171',
          animation: 'floatIn 0.3s ease'
        }}>
          {isSuccess ? '✅ ' : '❌ '} {message}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input type="text" {...register('name')} placeholder="Nome completo" />
          {errors.name && (
            <p style={{ color: '#f87171', fontSize: '0.8rem', textAlign: 'left', marginLeft: '5px', marginTop: '4px' }}>
              ⚠️ {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <input type="email" {...register('email')} placeholder="E-mail válido" />
          {errors.email && (
            <p style={{ color: '#f87171', fontSize: '0.8rem', textAlign: 'left', marginLeft: '5px', marginTop: '4px' }}>
              ⚠️ {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <input type="password" {...register('password')} placeholder="Senha (mín. 4 caracteres)" />
          {errors.password && (
            <p style={{ color: '#f87171', fontSize: '0.8rem', textAlign: 'left', marginLeft: '5px', marginTop: '4px' }}>
              ⚠️ {errors.password.message}
            </p>
          )}
        </div>

        <div>
          <input type="password" {...register('confirmPassword')} placeholder="Confirme sua senha" />
          {errors.confirmPassword && (
            <p style={{ color: '#f87171', fontSize: '0.8rem', textAlign: 'left', marginLeft: '5px', marginTop: '4px' }}>
              ⚠️ {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <button type="submit">Cadastrar</button>
      </form>
      
      <br />
      <Link to="/login" style={{ fontSize: '0.9rem', fontWeight: '500' }}>
        Já tem uma conta? <span style={{ textDecoration: 'underline' }}>Faça login</span>
      </Link>
    </div>
  );
}