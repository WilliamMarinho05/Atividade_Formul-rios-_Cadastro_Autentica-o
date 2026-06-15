import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';

// COLA: Validação com Zod (Garante e-mail válido e senhas iguais)
const registerSchema = z.object({
  name: z.string().min(1, 'O nome é obrigatório.'),
  email: z.string().email('E-mail inválido.'),
  password: z.string().min(4, 'A senha deve ter pelo menos 4 caracteres.'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem.",
  path: ["confirmPassword"], // Atribui o erro ao campo de confirmação
});

export function Register() {
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  // COLA: useForm com o 'reset' para limpar os campos
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(registerSchema)
  });

  const onSubmit = async (data) => {
    try {
      // Envia os dados reais para o Backend
      const response = await axios.post('http://localhost:3000/register', {
        name: data.name,
        email: data.email,
        password: data.password
      });

      // Se deu certo: define a mensagem na tela e o status positivo
      setMessage(response.data.message || 'Usuário cadastrado!');
      setIsSuccess(true);
      
      // CONCEITO EXIGIDO: Limpa todos os inputs automaticamente
      reset(); 

    } catch (error) {
      // Se deu erro (ex: e-mail duplicado): mostra o erro em vermelho
      setIsSuccess(false);
      setMessage(error.response?.data?.error || 'Erro ao realizar cadastro.');
    }
  };

  return (
    <div className="container">
      <h2>Cadastrar Novo Usuário</h2>

      {/* COLA: Renderização condicional da mensagem na tela */}
      {message && (
        <p style={{ color: isSuccess ? 'green' : 'red', fontWeight: 'bold' }}>
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" {...register('name')} placeholder="Nome" />
        <p style={{ color: 'red' }}>{errors.name?.message}</p>

        <input type="email" {...register('email')} placeholder="E-mail" />
        <p style={{ color: 'red' }}>{errors.email?.message}</p>

        <input type="password" {...register('password')} placeholder="Senha" />
        <p style={{ color: 'red' }}>{errors.password?.message}</p>

        <input type="password" {...register('confirmPassword')} placeholder="Confirme a Senha" />
        <p style={{ color: 'red' }}>{errors.confirmPassword?.message}</p>

        <button type="submit">Cadastrar</button>
      </form>
      <br />
      <Link to="/login">Já tem conta? Faça login</Link>
    </div>
  );
}