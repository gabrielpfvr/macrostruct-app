import React from 'react';
import { TextField, Typography, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { PrimaryButton } from '../../../components/common/Button';
import AuthLayout from '../../../layouts/AuthLayout';
import { ROUTES } from '../../../config/constants';
import { FormContainer } from './styles';

export default function SignUp() {
  const navigate = useNavigate();

  const handleLoginClick = (e) => {
    e.preventDefault();
    navigate(ROUTES.LOGIN);
  };

  return (
    <AuthLayout>
      <Typography variant="h4" component="h2" mb={2}>
        Cadastro
      </Typography>

      <FormContainer>
        <Typography component="label" htmlFor="name">
          Nome completo
        </Typography>
        <TextField id="name" type="text" />

        <Typography component="label" htmlFor="email">
          E-mail
        </Typography>
        <TextField id="email" type="email" />

        <Typography component="label" htmlFor="password">
          Senha
        </Typography>
        <TextField id="password" type="password" />

        <Typography component="label" htmlFor="confirmPassword">
          Confirmar senha
        </Typography>
        <TextField id="confirmPassword" type="password" />

        <PrimaryButton variant="contained" color="primary">
          Criar conta
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