import { getAuthToken } from './auth';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

export const listDiets = async (page = 0, size = 10) => {
  try {
    const token = getAuthToken();
    const queryParams = new URLSearchParams({
      page: page.toString(),
      size: size.toString(),
    });

    const response = await fetch(`${API_BASE_URL}/diet?${queryParams}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch diets');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const getDiet = async (id) => {
  try {
    const token = getAuthToken();
    const response = await fetch(`${API_BASE_URL}/diet/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch diet');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const createDiet = async (dietData) => {
  try {
    const token = getAuthToken();
    
    // Ensure meals array exists and is properly formatted
    const requestData = {
      description: dietData.description,
      weight: Number(dietData.weight),
      height: Number(dietData.height),
      tdeee: Number(dietData.tdeee),
      meals: dietData.meals.map(meal => ({
        description: meal.description,
        time: meal.time,
        ordination: meal.ordination,
        foodList: meal.foodList.map(food => ({
          foodDescription: food.foodDescription,
          portion: Number(food.portion),
          carbohydrates: Number(food.carbohydrates) || 0,
          protein: Number(food.protein) || 0,
          totalFat: Number(food.totalFat) || 0,
          calories: Number(food.calories) || 0
        }))
      }))
    };

    console.log('Sending diet data:', requestData);

    const response = await fetch(`${API_BASE_URL}/diet`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error response:', errorData);
      throw new Error(errorData.message || 'Failed to create diet');
    }

    return await response.json();
  } catch (error) {
    console.error('Error in createDiet:', error);
    throw error;
  }
}; 