export const APP_NAME = 'MacroStruct';

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  PROFILE: '/profile',
  FOOD: '/food',
  FOOD_CREATE: '/food/create',
  DIET: '/diet',
  DIET_CREATE: '/diet/create',
  DIET_DETAIL: '/diet/:id',
  DIET_EDIT: '/diet/:id/edit'
};

export const API = {
  BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:3000',
  ENDPOINTS: {
    LOGIN: '/auth/login',
    SIGNUP: '/auth/signup',
  },
};

export const THEME = {
  STORAGE_KEY: 'theme_mode',
}; 