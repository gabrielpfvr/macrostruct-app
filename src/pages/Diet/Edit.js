import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  IconButton,
  MenuItem,
  CircularProgress,
  Alert,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import MainLayout from '../../layouts/MainLayout';
import { useNavigate, useParams } from 'react-router-dom';
import { getDiet, updateDiet } from '../../services/diet';
import { getFoodList } from '../../services/food';
import { ROUTES } from '../../config/constants';

export default function EditDiet() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [foods, setFoods] = useState([]);
  const [diet, setDiet] = useState({
    description: '',
    weight: '',
    height: '',
    tdeee: '',
    meals: [],
  });

  useEffect(() => {
    fetchDiet();
    fetchFoods();
  }, [id]);

  const fetchDiet = async () => {
    try {
      const response = await getDiet(id);
      setDiet({
        description: response.description,
        weight: response.weight,
        height: response.height,
        tdeee: response.tdeee,
        meals: response.meals.map(meal => ({
          description: meal.description,
          time: meal.time,
          ordination: meal.ordination,
          foodList: meal.foodList.map(food => ({
            foodDescription: food.foodDescription,
            portion: food.portion,
            carbohydrates: food.carbohydrates,
            protein: food.protein,
            totalFat: food.totalFat,
            calories: food.calories
          }))
        }))
      });
    } catch (error) {
      console.error('Error fetching diet:', error);
      setError('Erro ao carregar dieta');
    }
  };

  const fetchFoods = async () => {
    try {
      const response = await getFoodList();
      setFoods(Array.isArray(response) ? response : []);
    } catch (error) {
      console.error('Error fetching foods:', error);
      setError('Erro ao carregar lista de alimentos');
      setFoods([]);
    }
  };

  const handleAddMeal = () => {
    setDiet(prev => ({
      ...prev,
      meals: [
        ...prev.meals,
        {
          description: '',
          time: '',
          ordination: prev.meals.length + 1,
          foodList: []
        },
      ],
    }));
  };

  const handleRemoveMeal = (mealIndex) => {
    setDiet(prev => ({
      ...prev,
      meals: prev.meals.filter((_, i) => i !== mealIndex),
    }));
  };

  const handleAddFoodToMeal = (mealIndex) => {
    setDiet(prev => ({
      ...prev,
      meals: prev.meals.map((meal, index) => {
        if (index === mealIndex) {
          return {
            ...meal,
            foodList: [
              ...(meal.foodList || []),
              {
                foodDescription: '',
                portion: 1,
                carbohydrates: 0,
                protein: 0,
                totalFat: 0,
                calories: 0
              },
            ],
          };
        }
        return meal;
      }),
    }));
  };

  const handleRemoveFoodFromMeal = (mealIndex, foodIndex) => {
    setDiet(prev => ({
      ...prev,
      meals: prev.meals.map((meal, index) => {
        if (index === mealIndex) {
          return {
            ...meal,
            foodList: meal.foodList.filter((_, i) => i !== foodIndex),
          };
        }
        return meal;
      }),
    }));
  };

  const handleMealChange = (mealIndex, field, value) => {
    setDiet(prev => ({
      ...prev,
      meals: prev.meals.map((meal, index) => {
        if (index === mealIndex) {
          return { ...meal, [field]: value };
        }
        return meal;
      }),
    }));
  };

  const handleFoodChange = (mealIndex, foodIndex, field, value) => {
    setDiet(prev => ({
      ...prev,
      meals: prev.meals.map((meal, index) => {
        if (index === mealIndex) {
          return {
            ...meal,
            foodList: meal.foodList.map((food, fIndex) => {
              if (fIndex === foodIndex) {
                if (field === 'foodDescription') {
                  const selectedFood = foods.find(f => f.description === value);
                  if (selectedFood) {
                    return {
                      ...food,
                      foodDescription: value,
                      portion: selectedFood.servingSize,
                      carbohydrates: selectedFood.carbohydrates,
                      protein: selectedFood.protein,
                      totalFat: selectedFood.totalFat,
                      calories: selectedFood.calories
                    };
                  }
                } else if (field === 'portion') {
                  const selectedFood = foods.find(f => f.description === food.foodDescription);
                  if (selectedFood) {
                    const portion = Number(value);
                    if (isNaN(portion) || portion < 0) return food;
                    
                    const portionRatio = portion / selectedFood.servingSize;
                    return {
                      ...food,
                      portion,
                      carbohydrates: (selectedFood.carbohydrates * portionRatio).toFixed(2),
                      protein: (selectedFood.protein * portionRatio).toFixed(2),
                      totalFat: (selectedFood.totalFat * portionRatio).toFixed(2),
                      calories: (selectedFood.calories * portionRatio).toFixed(2)
                    };
                  }
                }
                return { ...food, [field]: value };
              }
              return food;
            }),
          };
        }
        return meal;
      }),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!diet.description?.trim()) {
      setError('A descrição é obrigatória');
      setLoading(false);
      return;
    }

    if (!diet.weight || !diet.height || !diet.tdeee) {
      setError('Preencha todos os campos obrigatórios');
      setLoading(false);
      return;
    }

    if (!diet.meals || diet.meals.length === 0) {
      setError('Adicione pelo menos uma refeição');
      setLoading(false);
      return;
    }

    const hasInvalidMeal = diet.meals.some(meal => {
      if (!meal.description?.trim() || !meal.time || !meal.foodList || meal.foodList.length === 0) {
        return true;
      }
      return meal.foodList.some(food => !food.foodDescription?.trim() || !food.portion);
    });

    if (hasInvalidMeal) {
      setError('Preencha todos os campos das refeições e alimentos');
      setLoading(false);
      return;
    }

    try {
      const dietData = {
        description: diet.description.trim(),
        weight: Number(diet.weight),
        height: Number(diet.height),
        tdeee: Number(diet.tdeee),
        meals: diet.meals.map(meal => ({
          description: meal.description.trim(),
          time: meal.time,
          ordination: meal.ordination,
          foodList: meal.foodList.map(food => ({
            foodDescription: food.foodDescription.trim(),
            portion: Math.round(Number(food.portion)),
            carbohydrates: Number(food.carbohydrates),
            protein: Number(food.protein),
            totalFat: Number(food.totalFat),
            calories: Number(food.calories)
          }))
        }))
      };

      console.log('Submitting diet data:', dietData);
      await updateDiet(id, dietData);
      navigate(ROUTES.DIET);
    } catch (error) {
      console.error('Error updating diet:', error);
      setError('Erro ao atualizar dieta');
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <Box component="form" onSubmit={handleSubmit}>
        <Typography variant="h4" component="h1" gutterBottom>
          Editar Dieta
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Descrição"
              value={diet.description}
              onChange={(e) => setDiet(prev => ({ ...prev, description: e.target.value }))}
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Peso (kg)"
              type="number"
              value={diet.weight}
              onChange={(e) => setDiet(prev => ({ ...prev, weight: e.target.value }))}
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Altura (m)"
              type="number"
              value={diet.height}
              onChange={(e) => setDiet(prev => ({ ...prev, height: e.target.value }))}
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="TDEE (kcal)"
              type="number"
              value={diet.tdeee}
              onChange={(e) => setDiet(prev => ({ ...prev, tdeee: e.target.value }))}
              required
            />
          </Grid>
        </Grid>

        <Box mt={4}>
          <Typography variant="h6" gutterBottom>
            Refeições
          </Typography>
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={handleAddMeal}
            sx={{ mb: 2 }}
          >
            Adicionar Refeição
          </Button>

          {diet.meals.map((meal, mealIndex) => (
            <Card key={mealIndex} sx={{ mb: 2 }}>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <Typography variant="h6">
                    Refeição {mealIndex + 1}
                  </Typography>
                  <IconButton
                    color="error"
                    onClick={() => handleRemoveMeal(mealIndex)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>

                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Descrição"
                      value={meal.description}
                      onChange={(e) => handleMealChange(mealIndex, 'description', e.target.value)}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Horário"
                      type="time"
                      value={meal.time}
                      onChange={(e) => handleMealChange(mealIndex, 'time', e.target.value)}
                      required
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                </Grid>

                <Box mt={2}>
                  <Button
                    variant="outlined"
                    startIcon={<AddIcon />}
                    onClick={() => handleAddFoodToMeal(mealIndex)}
                    size="small"
                  >
                    Adicionar Alimento
                  </Button>

                  {meal.foodList.map((food, foodIndex) => (
                    <Card key={foodIndex} sx={{ mt: 2, p: 2 }}>
                      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                        <Typography variant="subtitle1">
                          Alimento {foodIndex + 1}
                        </Typography>
                        <IconButton
                          color="error"
                          size="small"
                          onClick={() => handleRemoveFoodFromMeal(mealIndex, foodIndex)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>

                      <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                          <TextField
                            fullWidth
                            select
                            label="Alimento"
                            value={food.foodDescription}
                            onChange={(e) => handleFoodChange(mealIndex, foodIndex, 'foodDescription', e.target.value)}
                            required
                          >
                            {foods.map((food) => (
                              <MenuItem key={food.id} value={food.description}>
                                {food.description}
                              </MenuItem>
                            ))}
                          </TextField>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <TextField
                            fullWidth
                            label="Porção (g)"
                            type="number"
                            value={food.portion}
                            onChange={(e) => handleFoodChange(mealIndex, foodIndex, 'portion', e.target.value)}
                            required
                            inputProps={{ 
                              min: 1, 
                              step: 1,
                              inputMode: 'numeric',
                              pattern: '[0-9]*'
                            }}
                            helperText="Quantidade em gramas"
                          />
                        </Grid>
                        <Grid item xs={12} md={3}>
                          <TextField
                            fullWidth
                            label="Carboidratos (g)"
                            type="number"
                            value={food.carbohydrates}
                            InputProps={{ readOnly: true }}
                          />
                        </Grid>
                        <Grid item xs={12} md={3}>
                          <TextField
                            fullWidth
                            label="Proteínas (g)"
                            type="number"
                            value={food.protein}
                            InputProps={{ readOnly: true }}
                          />
                        </Grid>
                        <Grid item xs={12} md={3}>
                          <TextField
                            fullWidth
                            label="Gorduras (g)"
                            type="number"
                            value={food.totalFat}
                            InputProps={{ readOnly: true }}
                          />
                        </Grid>
                        <Grid item xs={12} md={3}>
                          <TextField
                            fullWidth
                            label="Calorias (kcal)"
                            type="number"
                            value={food.calories}
                            InputProps={{ readOnly: true }}
                          />
                        </Grid>
                      </Grid>
                    </Card>
                  ))}
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>

        <Box mt={4} display="flex" gap={2}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Salvar Alterações'}
          </Button>
          <Button
            variant="outlined"
            onClick={() => navigate(ROUTES.DIET)}
          >
            Cancelar
          </Button>
        </Box>
      </Box>
    </MainLayout>
  );
} 