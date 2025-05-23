import React from 'react';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import CalculateIcon from '@mui/icons-material/Calculate';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import MainLayout from '../../layouts/MainLayout';

export default function Home() {
  return (
    <MainLayout>
      <Typography variant="h4" component="h1" gutterBottom>
        Bem-vindo ao MacroStruct
      </Typography>

      <Grid container spacing={3} mt={2}>
        <Grid item xs={12} md={4}>
          <Card>
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

        <Grid item xs={12} md={4}>
          <Card>
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

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" gap={1} mb={2}>
                <TrendingUpIcon color="primary" />
                <Typography variant="h6">
                  Acompanhamento
                </Typography>
              </Box>
              <Typography variant="body1">
                Acompanhe sua evolução e mantenha-se no caminho certo para atingir seus objetivos.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </MainLayout>
  );
} 