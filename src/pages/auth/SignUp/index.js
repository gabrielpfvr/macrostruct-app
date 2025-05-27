import React, { useState } from 'react';
import { TextField, Typography, Link, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { PrimaryButton } from '../../../components/common/Button';
import AuthLayout from '../../../layouts/AuthLayout';
import { ROUTES } from '../../../config/constants';
import { FormContainer } from './styles';
import { useAuth } from '../../../contexts/AuthContext';

export default function SignUp() {
  const navigate = useNavigate();
  const { signup, isLoading, error } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    birthDate: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const getErrorMessage = (field) => {
    if (!formData[field]) return 'Campo obrigatório';
    
    switch (field) {
      case 'birthDate':
        if (formData.birthDate) {
          const birthDate = new Date(formData.birthDate);
          const minAgeDate = new Date();
          minAgeDate.setFullYear(minAgeDate.getFullYear() - 18);
          
          if (birthDate > minAgeDate) {
            return 'Você deve ter 18 anos ou mais';
          }
        }
        return '';
      case 'confirmPassword':
        return formData.password !== formData.confirmPassword ? 'As senhas não coincidem' : '';
      default:
        return '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const requestBody = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      birthDate: formData.birthDate
    };

    try {
      await signup(requestBody);
      navigate(ROUTES.LOGIN);
    } catch (error) {
      console.error('Signup error:', error);
    }
  };

  const handleLoginClick = (e) => {
    e.preventDefault();
    navigate(ROUTES.LOGIN);
  };

  return (
    <AuthLayout>
      <Typography variant="h4" component="h2" mb={2}>
        Cadastro
      </Typography>

      <FormContainer onSubmit={handleSubmit}>
        {error && (
          <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
            {error}
          </Alert>
        )}

        <Typography component="label" htmlFor="name">
          Nome completo
        </Typography>
        <TextField
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          error={!!getErrorMessage('name')}
          helperText={getErrorMessage('name')}
          required
        />

        <Typography component="label" htmlFor="email">
          E-mail
        </Typography>
        <TextField
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={!!getErrorMessage('email')}
          helperText={getErrorMessage('email')}
          required
        />

        <Typography component="label" htmlFor="birthDate">
          Data de nascimento
        </Typography>
        <TextField
          id="birthDate"
          name="birthDate"
          type="date"
          value={formData.birthDate}
          onChange={handleChange}
          error={!!getErrorMessage('birthDate')}
          helperText={getErrorMessage('birthDate')}
          required
          InputLabelProps={{
            shrink: true,
          }}
        />

        <Typography component="label" htmlFor="password">
          Senha
        </Typography>
        <TextField
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          error={!!getErrorMessage('password')}
          helperText={getErrorMessage('password')}
          required
        />

        <Typography component="label" htmlFor="confirmPassword">
          Confirmar senha
        </Typography>
        <TextField
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={!!getErrorMessage('confirmPassword')}
          helperText={getErrorMessage('confirmPassword')}
          required
        />

        <PrimaryButton
          type="submit"
          variant="contained"
          color="primary"
          disabled={isLoading || Object.keys(formData).some(key => !formData[key] || !!getErrorMessage(key))}
        >
          {isLoading ? 'Criando conta...' : 'Criar conta'}
        </PrimaryButton>
      </FormContainer>

      <Typography mt={3}>
        Já possui conta?{' '}
        <Link href={ROUTES.LOGIN} onClick={handleLoginClick}>
          Faça login
        </Link>
      </Typography>
    </AuthLayout>
  );
} 