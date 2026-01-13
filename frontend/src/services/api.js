import axios from 'axios';

// Use environment variable or default to localhost:3000
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const api = {
    /**
     * Fetch all analysis areas
     * @param {Object} filters - optional { type, region }
     */
    getAreas: async (filters = {}) => {
        try {
            const response = await apiClient.get('/api/areas', { params: filters });
            // Defensive response handling
            const data = response.data;
            if (Array.isArray(data)) return data;
            if (data && Array.isArray(data.areas)) return data.areas;
            return [];
        } catch (error) {
            console.error('API Error: getAreas', error);
            throw error;
        }
    },

    /**
     * Trigger a new analysis
     * @param {string} type - 'deforestation' | 'mining'
     * @param {string} region 
     */
    triggerAnalysis: async (type, region) => {
        try {
            const response = await apiClient.post('/api/analyze', { type, region });
            return response.data;
        } catch (error) {
            console.error('API Error: triggerAnalysis', error);
            throw error;
        }
    },
};
