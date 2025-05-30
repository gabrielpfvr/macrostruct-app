import React, { useState, useEffect } from 'react';
import { Typography, Paper, Box, CircularProgress, Alert } from '@mui/material';
import { format } from 'date-fns';
import MainLayout from '../../layouts/MainLayout';
import { getUserProfile } from '../../services/user';
import { styled } from '@mui/material/styles';

const ProfileContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  maxWidth: 600,
  margin: '0 auto',
  marginTop: theme.spacing(3),
}));

const ProfileField = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const FieldLabel = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(0.5),
}));

const FieldValue = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontWeight: 500,
}));

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getUserProfile();
        setProfile(data);
      } catch (err) {
        setError(err.message || 'Failed to load profile');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (isLoading) {
    return (
      <MainLayout>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
          <CircularProgress />
        </Box>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <ProfileContainer elevation={2}>
        <Typography variant="h4" component="h1" gutterBottom>
          Perfil
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {profile && (
          <>
            <ProfileField>
              <FieldLabel variant="subtitle2">Nome</FieldLabel>
              <FieldValue variant="body1">{profile.name}</FieldValue>
            </ProfileField>

            <ProfileField>
              <FieldLabel variant="subtitle2">E-mail</FieldLabel>
              <FieldValue variant="body1">{profile.email}</FieldValue>
            </ProfileField>

            <ProfileField>
              <FieldLabel variant="subtitle2">Data de Nascimento</FieldLabel>
              <FieldValue variant="body1">
                {format(new Date(profile.birthDate), 'dd/MM/yyyy')}
              </FieldValue>
            </ProfileField>
          </>
        )}
      </ProfileContainer>
    </MainLayout>
  );
} 