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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  useTheme,
} from '@mui/material';
import MainLayout from '../../layouts/MainLayout';
import { useNavigate, useParams } from 'react-router-dom';
import { getDiet } from '../../services/diet';
import { ROUTES } from '../../config/constants';

export default function DietDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const theme = useTheme();
  const [diet, setDiet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
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

    fetchDiet();
  }, [id]);

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

        <TableContainer 
          component={Paper} 
          sx={{ 
            mb: 4,
            backgroundColor: theme.palette.background.paper
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ 
                  fontWeight: 'bold', 
                  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : '#f5f5f5',
                  color: theme.palette.text.primary
                }}>Refeição</TableCell>
                <TableCell sx={{ 
                  fontWeight: 'bold', 
                  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : '#f5f5f5',
                  color: theme.palette.text.primary
                }}>Horário</TableCell>
                <TableCell sx={{ 
                  fontWeight: 'bold', 
                  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : '#f5f5f5',
                  color: theme.palette.text.primary
                }}>Alimento</TableCell>
                <TableCell sx={{ 
                  fontWeight: 'bold', 
                  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : '#f5f5f5',
                  color: theme.palette.text.primary
                }} align="right">Porção (g)</TableCell>
                <TableCell sx={{ 
                  fontWeight: 'bold', 
                  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : '#f5f5f5',
                  color: theme.palette.text.primary
                }} align="right">Carboidratos (g)</TableCell>
                <TableCell sx={{ 
                  fontWeight: 'bold', 
                  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : '#f5f5f5',
                  color: theme.palette.text.primary
                }} align="right">Proteínas (g)</TableCell>
                <TableCell sx={{ 
                  fontWeight: 'bold', 
                  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : '#f5f5f5',
                  color: theme.palette.text.primary
                }} align="right">Gorduras (g)</TableCell>
                <TableCell sx={{ 
                  fontWeight: 'bold', 
                  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : '#f5f5f5',
                  color: theme.palette.text.primary
                }} align="right">Calorias (kcal)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {diet.meals.map((meal, mealIndex) => (
                <React.Fragment key={mealIndex}>
                  {meal.foodList.map((food, foodIndex) => (
                    <TableRow 
                      key={`${mealIndex}-${foodIndex}`}
                      sx={{ 
                        '&:nth-of-type(odd)': { 
                          backgroundColor: theme.palette.mode === 'dark' 
                            ? 'rgba(255, 255, 255, 0.04)' 
                            : '#fafafa' 
                        },
                        '&:hover': { 
                          backgroundColor: theme.palette.mode === 'dark' 
                            ? 'rgba(255, 255, 255, 0.08)' 
                            : '#f0f0f0' 
                        }
                      }}
                    >
                      {foodIndex === 0 && (
                        <TableCell 
                          rowSpan={meal.foodList.length}
                          sx={{ 
                            fontWeight: 'bold',
                            backgroundColor: theme.palette.mode === 'dark' 
                              ? 'rgba(25, 118, 210, 0.12)' 
                              : '#e3f2fd',
                            borderRight: `1px solid ${theme.palette.divider}`
                          }}
                        >
                          {meal.description}
                        </TableCell>
                      )}
                      {foodIndex === 0 && (
                        <TableCell 
                          rowSpan={meal.foodList.length}
                          sx={{ 
                            backgroundColor: theme.palette.mode === 'dark' 
                              ? 'rgba(25, 118, 210, 0.12)' 
                              : '#e3f2fd',
                            borderRight: `1px solid ${theme.palette.divider}`
                          }}
                        >
                          {meal.time}
                        </TableCell>
                      )}
                      <TableCell>{food.foodDescription}</TableCell>
                      <TableCell align="right">{parseInt(food.portion, 10)}</TableCell>
                      <TableCell align="right">{food.carbohydrates.toFixed(2)}</TableCell>
                      <TableCell align="right">{food.protein.toFixed(2)}</TableCell>
                      <TableCell align="right">{food.totalFat.toFixed(2)}</TableCell>
                      <TableCell align="right">{food.calories.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell 
                      colSpan={8} 
                      sx={{ 
                        backgroundColor: theme.palette.mode === 'dark' 
                          ? 'rgba(46, 125, 50, 0.12)' 
                          : '#e8f5e9',
                        fontWeight: 'bold',
                        borderTop: `2px solid ${theme.palette.mode === 'dark' ? 'rgba(46, 125, 50, 0.3)' : '#c8e6c9'}`
                      }}
                    >
                      Total da Refeição: {meal.totalCalories.toFixed(2)} kcal
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </MainLayout>
  );
} 