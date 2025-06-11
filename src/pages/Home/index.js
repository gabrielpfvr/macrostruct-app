import React from 'react';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import CalculateIcon from '@mui/icons-material/Calculate';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../layouts/MainLayout';
import { ROUTES } from '../../config/constants';

export default function Home() {
  const navigate = useNavigate();

  const handleFoodCreateClick = () => {
    navigate(ROUTES.FOOD_CREATE);
  };

  const handleDietListClick = () => {
    navigate(ROUTES.DIET);
  };

  return (
    <MainLayout>
      <Typography variant="h4" component="h1" gutterBottom>
        Bem-vindo ao MacroStruct
      </Typography>

      <Grid container spacing={3} mt={2}>
        <Grid item xs={12} md={6}>
          <Card 
            sx={{ 
              cursor: 'pointer',
              '&:hover': {
                boxShadow: 6,
              },
            }}
            onClick={handleFoodCreateClick}
          >
            <CardContent>
              <Box display="flex" alignItems="center" gap={1} mb={2}>
                <RestaurantIcon color="primary" />
                <Typography variant="h6">
                  Cadastro de Alimentos
                </Typography>
              </Box>
              <Typography variant="body1">
                Cadastre e gerencie sua base de alimentos com informações nutricionais detalhadas.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
        <Card 
            sx={{ 
              cursor: 'pointer',
              '&:hover': {
                boxShadow: 6,
              },
            }}
            onClick={handleDietListClick}
          >
            <CardContent>
              <Box display="flex" alignItems="center" gap={1} mb={2}>
                <CalculateIcon color="primary" />
                <Typography variant="h6">
                  Cálculo de Macros
                </Typography>
              </Box>
              <Typography variant="body1">
                Calcule suas necessidades diárias de proteínas, carboidratos e gorduras com base no seu objetivo.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </MainLayout>
  );
} 