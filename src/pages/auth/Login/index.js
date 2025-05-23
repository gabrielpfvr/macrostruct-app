import React, { useState } from 'react';
import { TextField, Typography, Link, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { PrimaryButton } from '../../../components/common/Button';
import AuthLayout from '../../../layouts/AuthLayout';
import { ROUTES } from '../../../config/constants';
import { useAuth } from '../../../contexts/AuthContext';
import { FormContainer } from './styles';

export default function Login() {
  const navigate = useNavigate();
  const { login, isLoading, error } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(formData.email, formData.password);
  };

  const handleSignUpClick = (e) => {
    e.preventDefault();
    navigate(ROUTES.SIGNUP);
  };

  return (
    <AuthLayout>
      <Typography variant="h4" component="h2" mb={2}>
        Login
      </Typography>

      <FormContainer onSubmit={handleSubmit}>
        {error && (
          <Alert severity="error" sx={{ width: '100%' }}>
            {error}
          </Alert>
        )}

        <Typography component="label" htmlFor="email">
          E-mail
        </Typography>
        <TextField
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
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
          required
        />

        <Link href="#" sx={{ alignSelf: 'center' }}>
          Esqueceu a senha?
        </Link>

        <PrimaryButton
          type="submit"
          variant="contained"
          color="primary"
          disabled={isLoading}
        >
          {isLoading ? 'Entrando...' : 'Iniciar sessão'}
        </PrimaryButton>
      </FormContainer>

      <Typography mt={3}>
        Não possui conta?{' '}
        <Link href={ROUTES.SIGNUP} onClick={handleSignUpClick}>
          Cadastre-se
        </Link>
      </Typography>
    </AuthLayout>
  );
} 