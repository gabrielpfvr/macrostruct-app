import { API_ENDPOINTS } from '../config/api';
import { getAuthToken } from './auth';

export const getUserProfile = async () => {
  try {
    const token = getAuthToken();
    const response = await fetch(API_ENDPOINTS.users.profile, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch user profile');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}; 