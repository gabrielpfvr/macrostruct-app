const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

export const API_ENDPOINTS = {
    auth: {
        login: `${API_BASE_URL}/auth`,
        checkToken: `${API_BASE_URL}/auth/check-token`,
    },
    users: {
        create: `${API_BASE_URL}/users`
    }
}; 