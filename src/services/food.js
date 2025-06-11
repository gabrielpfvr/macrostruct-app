import { API_ENDPOINTS } from '../config/api';
import { getAuthToken } from './auth';

export const createFood = async (foodData) => {
  try {
    const token = getAuthToken();
    const response = await fetch(API_ENDPOINTS.food.create, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(foodData),
    });

    if (response.status === 201) {
      return true;
    }

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create food item');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const importFoodFromFile = async (file) => {
  try {
    const token = getAuthToken();
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(API_ENDPOINTS.food.import, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });

    if (response.status === 200) {
      return true;
    }

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to import food items');
    }

    return true;
  } catch (error) {
    throw error;
  }
};

export const listFood = async (page = 0, size = 10, orderBy = 'calories', orderDirection = 'desc') => {
  try {
    const token = getAuthToken();
    const queryParams = new URLSearchParams({
      page: page.toString(),
      size: size.toString(),
      orderBy,
      orderDirection
    });

    const response = await fetch(`${API_ENDPOINTS.food.list}?${queryParams}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch food items');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const getFoodList = async () => {
  try {
    const response = await fetch(API_ENDPOINTS.food.listAll, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch food list');
    }

    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching food list:', error);
    throw error;
  }
};

export const deleteFoods = async (ids) => {
  const params = new URLSearchParams();
  ids.forEach(id => params.append('ids', id));

  const response = await fetch(`${API_ENDPOINTS.food.delete}?${params.toString()}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getAuthToken()}`
    }
  });

  if (!response.ok) {
    throw new Error('Erro ao excluir os alimentos');
  }

  return response;
};
