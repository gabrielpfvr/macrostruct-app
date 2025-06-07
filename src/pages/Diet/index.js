import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  CircularProgress,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import MainLayout from '../../layouts/MainLayout';
import { useNavigate } from 'react-router-dom';
import { listDiets } from '../../services/diet';
import { ROUTES } from '../../config/constants';

export default function Diet() {
  const navigate = useNavigate();
  const [diets, setDiets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDiets();
  }, []);

  const fetchDiets = async () => {
    try {
      const response = await listDiets();
      setDiets(response.content);
    } catch (error) {
      console.error('Error fetching diets:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateDiet = () => {
    navigate(ROUTES.DIET_CREATE);
  };

  const handleViewDiet = (id) => {
    navigate(`/diet/${id}`);
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

  return (
    <MainLayout>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1">
          Minhas Dietas
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleCreateDiet}
        >
          Nova Dieta
        </Button>
      </Box>

      <Grid container spacing={3}>
        {diets.map((diet) => (
          <Grid item xs={12} md={6} lg={4} key={diet.id}>
            <Card>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                  <Typography variant="h6" gutterBottom>
                    {diet.description}
                  </Typography>
                  <Box>
                    <IconButton
                      size="small"
                      onClick={() => handleViewDiet(diet.id)}
                    >
                      <EditIcon />
                    </IconButton>
                  </Box>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Peso: {diet.weight}kg
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Altura: {diet.height}m
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  TDEE: {diet.tdeee} kcal
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {diet.meals?.length || 0} refeições
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </MainLayout>
  );
} 