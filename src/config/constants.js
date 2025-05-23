export const APP_NAME = 'MacroStruct';

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
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