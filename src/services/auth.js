const MOCK_CREDENTIALS = {
  email: 'test@example.com',
  password: '123456',
};

// Mock JWT
const MOCK_JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ';

export const login = async (email, password) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));

  if (email === MOCK_CREDENTIALS.email && password === MOCK_CREDENTIALS.password) {
    // Store JWT in cookie
    document.cookie = `jwt=${MOCK_JWT}; path=/; max-age=86400; secure; samesite=strict`;
    return { success: true };
  }

  throw new Error('E-mail ou senha inválidos');
};

export const logout = () => {
  // Remove JWT cookie
  document.cookie = 'jwt=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};

export const getAuthToken = () => {
  const cookies = document.cookie.split(';');
  const jwtCookie = cookies.find(cookie => cookie.trim().startsWith('jwt='));
  return jwtCookie ? jwtCookie.split('=')[1] : null;
};

export const isAuthenticated = () => {
  return !!getAuthToken();
}; 