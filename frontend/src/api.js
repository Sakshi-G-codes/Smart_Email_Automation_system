import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000'; // Hardcoded for Day 1, can be env var later

const api = axios.create({
    baseURL: API_BASE_URL,
});

export const checkHealth = async () => {
    try {
        const response = await api.get('/health');
        return response.data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};

export const sendEmailTest = async (to, subject, text) => {
    try {
        const response = await api.get('/test/email/send', {
            params: { to, subject, text }
        });
        return response.data;
    } catch (error) {
        console.error('Send Email Error:', error);
        throw error;
    }
};

export const fetchEmailsTest = async () => {
    try {
        const response = await api.get('/test/email/fetch');
        return response.data;
    } catch (error) {
        console.error('Fetch Emails Error:', error);
        throw error;
    }
};

export const syncEmailsTest = async () => {
    try {
        const response = await api.get('/test/email/sync');
        return response.data;
    } catch (error) {
        console.error('Sync Emails Error:', error);
        throw error;
    }
};

export default api;
