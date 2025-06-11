import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  CircularProgress,
  Alert,
  Button,
} from '@mui/material';
import MainLayout from '../../layouts/MainLayout';
import { useNavigate, useParams } from 'react-router-dom';
import { getDiet } from '../../services/diet';
import { ROUTES } from '../../config/constants';

export default function DietDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [diet, setDiet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDiet();
  }, [id]);

  const fetchDiet = async () => {
    try {
      const response = await getDiet(id);
      setDiet(response);
    } catch (error) {
      console.error('Error fetching diet:', error);
      setError('Erro ao carregar dieta');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
          <CircularProgress />
        </Box>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
        <Button variant="outlined" onClick={() => navigate(ROUTES.DIET)}>
          Voltar
        </Button>
      </MainLayout>
    );
  }

  if (!diet) {
    return (
      <MainLayout>
        <Alert severity="error" sx={{ mb: 2 }}>
          Dieta não encontrada
        </Alert>
        <Button variant="outlined" onClick={() => navigate(ROUTES.DIET)}>
          Voltar
        </Button>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Box>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h4" component="h1">
            {diet.description}
          </Typography>
          <Button variant="outlined" onClick={() => navigate(ROUTES.DIET)}>
            Voltar
          </Button>
        </Box>

        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Informações Gerais
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography variant="body1">
                  <strong>Peso:</strong> {diet.weight}kg
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="body1">
                  <strong>Altura:</strong> {diet.height}m
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="body1">
                  <strong>TDEE:</strong> {diet.tdee} kcal
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="body1">
                  <strong>Total de Calorias:</strong> {diet.totalCalories.toFixed(2)} kcal
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Typography variant="h5" gutterBottom>
          Refeições
        </Typography>

        {diet.meals.map((meal, index) => (
          <Card key={index} sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {meal.description} - {meal.time}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Total de Calorias: {meal.totalCalories.toFixed(2)} kcal
              </Typography>

              <Grid container spacing={2}>
                {meal.foodList.map((food, foodIndex) => (
                  <Grid item xs={12} md={6} key={foodIndex}>
                    <Card variant="outlined">
                      <CardContent>
                        <Typography variant="subtitle1" gutterBottom>
                          {food.foodDescription}
                        </Typography>
                        <Typography variant="body2">
                          <strong>Porção:</strong> {parseInt(food.portion, 10)}g
                        </Typography>
                        <Typography variant="body2">
                          <strong>Carboidratos:</strong> {food.carbohydrates.toFixed(2)}g
                        </Typography>
                        <Typography variant="body2">
                          <strong>Proteínas:</strong> {food.protein.toFixed(2)}g
                        </Typography>
                        <Typography variant="body2">
                          <strong>Gorduras:</strong> {food.totalFat.toFixed(2)}g
                        </Typography>
                        <Typography variant="body2">
                          <strong>Calorias:</strong> {food.calories.toFixed(2)} kcal
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        ))}
      </Box>
    </MainLayout>
  );
} 