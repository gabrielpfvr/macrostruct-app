import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from './theme/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import Login from './pages/auth/Login';
import SignUp from './pages/auth/SignUp';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Food from './pages/Food';
import FoodCreate from './pages/Food/Create';
import { ROUTES } from './config/constants';

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const token = document.cookie.includes('jwt=');
  return token ? children : <Navigate to={ROUTES.LOGIN} replace />;
};

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <CssBaseline />
          <Routes>
            <Route path={ROUTES.LOGIN} element={<Login />} />
            <Route path={ROUTES.SIGNUP} element={<SignUp />} />
            <Route
              path={ROUTES.HOME}
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path={ROUTES.PROFILE}
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path={ROUTES.FOOD}
              element={
                <ProtectedRoute>
                  <Food />
                </ProtectedRoute>
              }
            />
            <Route
              path={ROUTES.FOOD_CREATE}
              element={
                <ProtectedRoute>
                  <FoodCreate />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to={ROUTES.LOGIN} replace />} />
          </Routes>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
