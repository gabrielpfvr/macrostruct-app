const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

export const API_ENDPOINTS = {
    auth: {
        login: `${API_BASE_URL}/auth`,
        checkToken: `${API_BASE_URL}/auth/check-token`,
    },
    users: {
        create: `${API_BASE_URL}/users`,
        profile: `${API_BASE_URL}/users/token`
    },
    food: {
        list: `${API_BASE_URL}/food`,
        create: `${API_BASE_URL}/food`,
        import: `${API_BASE_URL}/food/import`,
        listAll: `${API_BASE_URL}/food/list`,
        delete: `${API_BASE_URL}/food/delete-by-ids`
    },
    diet: {
        list: `${API_BASE_URL}/diet`,
        get: `${API_BASE_URL}/diet`,
        create: `${API_BASE_URL}/diet`,
        update: `${API_BASE_URL}/diet`,
        delete: `${API_BASE_URL}/diet/{id}/delete`
    }
}; 