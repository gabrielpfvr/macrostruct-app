import { API_ENDPOINTS } from '../config/api';

export const login = async (username, password) => {
  try {
    const response = await fetch(API_ENDPOINTS.auth.login, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Invalid credentials');
    }

    const { token, expiresIn } = await response.json();

    document.cookie = `jwt=${token}; path=/; max-age=${expiresIn}; secure; samesite=strict`;
    return { success: true };
  } catch (error) {
    throw new Error(error.message);
  }
};

export const logout = () => {
  document.cookie = 'jwt=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};

export const getAuthToken = () => {
  const cookies = document.cookie.split(';');
  const jwtCookie = cookies.find(cookie => cookie.trim().startsWith('jwt='));
  return jwtCookie ? jwtCookie.split('=')[1] : null;
};

export const verifyToken = async () => {
  const token = getAuthToken();
  if (!token) return false;

  try {
    const response = await fetch(API_ENDPOINTS.auth.checkToken, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      logout();
      return false;
    }

    return true;
  } catch (error) {
    console.error('Token verification failed:', error);
    return false;
  }
};

export const isAuthenticated = async () => {
  const token = getAuthToken();
  if (!token) return false;
  
  return await verifyToken();
};
